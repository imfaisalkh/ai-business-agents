# Code Templates

> **Purpose:** Production-ready code patterns for HomeCrew. Copy-paste and customize.

---

## Backend: Authentication

### Auth Service (`apps/api/src/services/auth.service.ts`)

```typescript
import { db } from '../db/index.js';
import { users, businesses, refreshTokens } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

export const authService = {
  async createUser(data: {
    email: string;
    password: string;
    name: string;
    businessName: string;
  }) {
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Create business first
    const businessId = nanoid();
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14); // 14-day trial

    await db.insert(businesses).values({
      id: businessId,
      name: data.businessName,
      trialEndsAt,
    });

    // Create user
    const userId = nanoid();
    await db.insert(users).values({
      id: userId,
      businessId,
      email: data.email.toLowerCase(),
      passwordHash,
      name: data.name,
      role: 'owner',
    });

    return this.findById(userId);
  },

  async validateCredentials(email: string, password: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });
    if (!user) return null;
    return (await bcrypt.compare(password, user.passwordHash)) ? user : null;
  },

  async findById(id: string) {
    return db.query.users.findFirst({ where: eq(users.id, id) });
  },

  async findByEmail(email: string) {
    return db.query.users.findFirst({ where: eq(users.email, email.toLowerCase()) });
  },

  async createRefreshToken(userId: string) {
    const token = nanoid(64);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await db.insert(refreshTokens).values({ id: nanoid(), userId, token, expiresAt });
    return token;
  },

  async validateRefreshToken(token: string) {
    const record = await db.query.refreshTokens.findFirst({
      where: eq(refreshTokens.token, token),
    });
    if (!record || record.expiresAt < new Date()) return null;
    await db.delete(refreshTokens).where(eq(refreshTokens.id, record.id)); // Rotate
    return record.userId;
  },

  async revokeRefreshTokens(userId: string) {
    await db.delete(refreshTokens).where(eq(refreshTokens.userId, userId));
  },

  async getBusinessForUser(userId: string) {
    const user = await this.findById(userId);
    if (!user?.businessId) return null;
    return db.query.businesses.findFirst({ where: eq(businesses.id, user.businessId) });
  },
};
```

### Auth Routes (`apps/api/src/routes/auth.ts`)

```typescript
import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { authService } from '../services/auth.service.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  businessName: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Register
  fastify.post('/register', async (req, reply) => {
    const body = registerSchema.parse(req.body);

    const existing = await authService.findByEmail(body.email);
    if (existing) {
      return reply.status(400).send({
        error: { code: 'EMAIL_EXISTS', message: 'Email already registered' }
      });
    }

    const user = await authService.createUser(body);
    const accessToken = fastify.jwt.sign(
      { userId: user!.id, businessId: user!.businessId, role: user!.role },
      { expiresIn: '15m' }
    );
    const refreshToken = await authService.createRefreshToken(user!.id);

    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return {
      data: {
        user: { id: user!.id, email: user!.email, name: user!.name, role: user!.role },
        accessToken,
      }
    };
  });

  // Login
  fastify.post('/login', async (req, reply) => {
    const body = loginSchema.parse(req.body);

    const user = await authService.validateCredentials(body.email, body.password);
    if (!user) {
      return reply.status(401).send({
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
    }

    const accessToken = fastify.jwt.sign(
      { userId: user.id, businessId: user.businessId, role: user.role },
      { expiresIn: '15m' }
    );
    const refreshToken = await authService.createRefreshToken(user.id);

    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return {
      data: {
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        accessToken,
      }
    };
  });

  // Refresh
  fastify.post('/refresh', async (req, reply) => {
    const token = req.cookies.refreshToken;
    if (!token) {
      return reply.status(401).send({
        error: { code: 'NO_TOKEN', message: 'No refresh token' }
      });
    }

    const userId = await authService.validateRefreshToken(token);
    if (!userId) {
      reply.clearCookie('refreshToken');
      return reply.status(401).send({
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired refresh token' }
      });
    }

    const user = await authService.findById(userId);
    const accessToken = fastify.jwt.sign(
      { userId, businessId: user!.businessId, role: user!.role },
      { expiresIn: '15m' }
    );
    const newRefreshToken = await authService.createRefreshToken(userId);

    reply.setCookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return { data: { accessToken } };
  });

  // Logout
  fastify.post('/logout', { preHandler: [fastify.authenticate] }, async (req, reply) => {
    const { userId } = req.user as { userId: string };
    await authService.revokeRefreshTokens(userId);
    reply.clearCookie('refreshToken');
    return { success: true };
  });

  // Me
  fastify.get('/me', { preHandler: [fastify.authenticate] }, async (req) => {
    const { userId } = req.user as { userId: string };
    const user = await authService.findById(userId);
    const business = await authService.getBusinessForUser(userId);
    return {
      data: {
        user: { id: user!.id, email: user!.email, name: user!.name, role: user!.role },
        business,
      }
    };
  });
};
```

### Auth Middleware (`apps/api/src/plugins/authenticate.ts`)

```typescript
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireOwner: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireWorker: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  // Generic auth
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch {
      reply.status(401).send({ error: { code: 'UNAUTHORIZED', message: 'Invalid token' } });
    }
  });

  // Owner/admin only
  fastify.decorate('requireOwner', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      const { role } = request.user as { role: string };
      if (role !== 'owner' && role !== 'admin') {
        reply.status(403).send({ error: { code: 'FORBIDDEN', message: 'Owner access required' } });
      }
    } catch {
      reply.status(401).send({ error: { code: 'UNAUTHORIZED', message: 'Invalid token' } });
    }
  });

  // Worker access
  fastify.decorate('requireWorker', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      const { role } = request.user as { role: string };
      if (role !== 'worker' && role !== 'owner' && role !== 'admin') {
        reply.status(403).send({ error: { code: 'FORBIDDEN', message: 'Worker access required' } });
      }
    } catch {
      reply.status(401).send({ error: { code: 'UNAUTHORIZED', message: 'Invalid token' } });
    }
  });
});
```

---

## Backend: CRUD Pattern

### Customer Routes (`apps/api/src/routes/customers.ts`)

```typescript
import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { customers } from '../db/schema.js';
import { eq, and, like, desc, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const customerRoutes: FastifyPluginAsync = async (fastify) => {
  // All routes require authentication
  fastify.addHook('preHandler', fastify.authenticate);

  // List with search and pagination
  fastify.get('/', async (req) => {
    const { businessId } = req.user as { businessId: string };
    const { page = '1', limit = '20', search } = req.query as Record<string, string>;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = eq(customers.businessId, businessId);
    if (search) {
      whereClause = and(whereClause, like(customers.name, `%${search}%`))!;
    }

    const items = await db
      .select()
      .from(customers)
      .where(whereClause)
      .orderBy(desc(customers.createdAt))
      .limit(parseInt(limit))
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(customers)
      .where(whereClause);

    return {
      data: items,
      meta: { total: count, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(count / parseInt(limit)) },
    };
  });

  // Get one
  fastify.get('/:id', async (req, reply) => {
    const { businessId } = req.user as { businessId: string };
    const { id } = req.params as { id: string };

    const customer = await db.query.customers.findFirst({
      where: and(eq(customers.id, id), eq(customers.businessId, businessId)),
    });

    if (!customer) {
      return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Customer not found' } });
    }

    return { data: customer };
  });

  // Create
  fastify.post('/', async (req) => {
    const { businessId } = req.user as { businessId: string };
    const body = createSchema.parse(req.body);

    const customer = { id: nanoid(), businessId, ...body };
    await db.insert(customers).values(customer);
    return { data: customer };
  });

  // Update
  fastify.put('/:id', async (req, reply) => {
    const { businessId } = req.user as { businessId: string };
    const { id } = req.params as { id: string };
    const body = createSchema.partial().parse(req.body);

    const existing = await db.query.customers.findFirst({
      where: and(eq(customers.id, id), eq(customers.businessId, businessId)),
    });
    if (!existing) {
      return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Customer not found' } });
    }

    await db.update(customers).set({ ...body, updatedAt: new Date() }).where(eq(customers.id, id));
    return { data: { ...existing, ...body } };
  });

  // Delete
  fastify.delete('/:id', async (req, reply) => {
    const { businessId } = req.user as { businessId: string };
    const { id } = req.params as { id: string };

    const existing = await db.query.customers.findFirst({
      where: and(eq(customers.id, id), eq(customers.businessId, businessId)),
    });
    if (!existing) {
      return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Customer not found' } });
    }

    await db.delete(customers).where(eq(customers.id, id));
    return { success: true };
  });
};
```

### Job Routes (`apps/api/src/routes/jobs.ts`)

```typescript
import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { jobs, customers, users } from '../db/schema.js';
import { eq, and, between, desc, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

const createSchema = z.object({
  customerId: z.string().min(1),
  workerId: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  scheduledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  scheduledTime: z.string().regex(/^\d{2}:\d{2}$/),
  durationMinutes: z.number().min(15).max(480).default(60),
  price: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export const jobRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('preHandler', fastify.authenticate);

  // List with filters
  fastify.get('/', async (req) => {
    const { businessId } = req.user as { businessId: string };
    const { page = '1', limit = '20', status, workerId, startDate, endDate } = req.query as Record<string, string>;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = eq(jobs.businessId, businessId);
    if (status) whereClause = and(whereClause, eq(jobs.status, status as any))!;
    if (workerId) whereClause = and(whereClause, eq(jobs.workerId, workerId))!;
    if (startDate && endDate) {
      whereClause = and(whereClause, between(jobs.scheduledDate, startDate, endDate))!;
    }

    const items = await db
      .select()
      .from(jobs)
      .where(whereClause)
      .orderBy(desc(jobs.scheduledDate))
      .limit(parseInt(limit))
      .offset(offset);

    const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(jobs).where(whereClause);

    return {
      data: items,
      meta: { total: count, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(count / parseInt(limit)) },
    };
  });

  // Calendar view (jobs grouped by date)
  fastify.get('/calendar', async (req) => {
    const { businessId } = req.user as { businessId: string };
    const { startDate, endDate } = req.query as { startDate: string; endDate: string };

    const items = await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.businessId, businessId), between(jobs.scheduledDate, startDate, endDate)))
      .orderBy(jobs.scheduledDate, jobs.scheduledTime);

    // Group by date
    const grouped: Record<string, typeof items> = {};
    items.forEach((job) => {
      if (!grouped[job.scheduledDate]) grouped[job.scheduledDate] = [];
      grouped[job.scheduledDate].push(job);
    });

    return { data: grouped };
  });

  // Today's jobs (for worker app)
  fastify.get('/today', async (req) => {
    const { userId, businessId } = req.user as { userId: string; businessId: string };
    const today = new Date().toISOString().split('T')[0];

    const items = await db
      .select()
      .from(jobs)
      .where(and(
        eq(jobs.businessId, businessId),
        eq(jobs.workerId, userId),
        eq(jobs.scheduledDate, today)
      ))
      .orderBy(jobs.scheduledTime);

    return { data: items };
  });

  // Create
  fastify.post('/', async (req) => {
    const { businessId } = req.user as { businessId: string };
    const body = createSchema.parse(req.body);

    const job = { id: nanoid(), businessId, ...body, status: 'scheduled' as const };
    await db.insert(jobs).values(job);
    return { data: job };
  });

  // Get one
  fastify.get('/:id', async (req, reply) => {
    const { businessId } = req.user as { businessId: string };
    const { id } = req.params as { id: string };

    const job = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, id), eq(jobs.businessId, businessId)),
    });
    if (!job) return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Job not found' } });
    return { data: job };
  });

  // Update
  fastify.put('/:id', async (req, reply) => {
    const { businessId } = req.user as { businessId: string };
    const { id } = req.params as { id: string };
    const body = createSchema.partial().parse(req.body);

    const existing = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, id), eq(jobs.businessId, businessId)),
    });
    if (!existing) return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Job not found' } });

    await db.update(jobs).set({ ...body, updatedAt: new Date() }).where(eq(jobs.id, id));
    return { data: { ...existing, ...body } };
  });

  // Start job
  fastify.post('/:id/start', async (req, reply) => {
    const { businessId } = req.user as { businessId: string };
    const { id } = req.params as { id: string };

    const existing = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, id), eq(jobs.businessId, businessId)),
    });
    if (!existing) return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Job not found' } });

    await db.update(jobs).set({ status: 'in_progress', startedAt: new Date(), updatedAt: new Date() }).where(eq(jobs.id, id));
    return { data: { ...existing, status: 'in_progress', startedAt: new Date() } };
  });

  // Complete job
  fastify.post('/:id/complete', async (req, reply) => {
    const { businessId } = req.user as { businessId: string };
    const { id } = req.params as { id: string };

    const existing = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, id), eq(jobs.businessId, businessId)),
    });
    if (!existing) return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Job not found' } });

    await db.update(jobs).set({ status: 'completed', completedAt: new Date(), updatedAt: new Date() }).where(eq(jobs.id, id));
    return { data: { ...existing, status: 'completed', completedAt: new Date() } };
  });

  // Delete
  fastify.delete('/:id', async (req, reply) => {
    const { businessId } = req.user as { businessId: string };
    const { id } = req.params as { id: string };

    const existing = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, id), eq(jobs.businessId, businessId)),
    });
    if (!existing) return reply.status(404).send({ error: { code: 'NOT_FOUND', message: 'Job not found' } });

    await db.delete(jobs).where(eq(jobs.id, id));
    return { success: true };
  });
};
```

---

## Frontend: Core Patterns

### API Composable (`apps/web/composables/useApi.ts`)

```typescript
export function useApi() {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  async function $api<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: any = { 'Content-Type': 'application/json', ...options.headers };
    if (authStore.accessToken) headers['Authorization'] = `Bearer ${authStore.accessToken}`;

    const response = await fetch(`${config.public.apiUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    // Handle 401 - try refresh
    if (response.status === 401 && authStore.accessToken) {
      if (await authStore.refresh()) {
        headers['Authorization'] = `Bearer ${authStore.accessToken}`;
        const retry = await fetch(`${config.public.apiUrl}${endpoint}`, {
          ...options,
          headers,
          credentials: 'include',
        });
        if (!retry.ok) throw await retry.json();
        return retry.json();
      } else {
        navigateTo('/login');
      }
    }

    if (!response.ok) throw await response.json();
    return response.json();
  }

  return { $api };
}
```

### Auth Store (`apps/web/stores/auth.ts`)

```typescript
import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'worker';
}

interface Business {
  id: string;
  name: string;
  subscriptionStatus: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    business: null as Business | null,
    accessToken: null as string | null,
    loading: true,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isOwner: (state) => state.user?.role === 'owner' || state.user?.role === 'admin',
    isWorker: (state) => state.user?.role === 'worker',
  },

  actions: {
    async login(email: string, password: string) {
      const config = useRuntimeConfig();
      const res = await fetch(`${config.public.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw await res.json();
      const { data } = await res.json();
      this.user = data.user;
      this.accessToken = data.accessToken;
    },

    async register(email: string, password: string, name: string, businessName: string) {
      const config = useRuntimeConfig();
      const res = await fetch(`${config.public.apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, name, businessName }),
      });
      if (!res.ok) throw await res.json();
      const { data } = await res.json();
      this.user = data.user;
      this.accessToken = data.accessToken;
    },

    async logout() {
      const config = useRuntimeConfig();
      await fetch(`${config.public.apiUrl}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.accessToken}` },
        credentials: 'include',
      }).catch(() => {});
      this.user = null;
      this.business = null;
      this.accessToken = null;
      navigateTo('/login');
    },

    async refresh(): Promise<boolean> {
      const config = useRuntimeConfig();
      try {
        const res = await fetch(`${config.public.apiUrl}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!res.ok) return false;
        const { data } = await res.json();
        this.accessToken = data.accessToken;
        return true;
      } catch {
        return false;
      }
    },

    async fetchUser() {
      if (!this.accessToken) {
        const refreshed = await this.refresh();
        if (!refreshed) {
          this.loading = false;
          return;
        }
      }

      const config = useRuntimeConfig();
      try {
        const res = await fetch(`${config.public.apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
          credentials: 'include',
        });
        if (res.ok) {
          const { data } = await res.json();
          this.user = data.user;
          this.business = data.business;
        }
      } catch {
        this.user = null;
        this.accessToken = null;
      } finally {
        this.loading = false;
      }
    },
  },
});
```

### Auth Middleware (`apps/web/middleware/auth.ts`)

```typescript
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  if (authStore.loading) await authStore.fetchUser();
  if (!authStore.isAuthenticated) return navigateTo('/login');
});
```

### Owner Middleware (`apps/web/middleware/owner.ts`)

```typescript
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  if (authStore.loading) await authStore.fetchUser();
  if (!authStore.isAuthenticated) return navigateTo('/login');
  if (!authStore.isOwner) return navigateTo('/worker/today');
});
```

### Entity Composable (`apps/web/composables/useCustomers.ts`)

```typescript
interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
}

interface ListResponse {
  data: Customer[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export function useCustomers() {
  const { $api } = useApi();

  return {
    list: (page = 1, search?: string) =>
      $api<ListResponse>(`/customers?page=${page}${search ? `&search=${search}` : ''}`),
    get: (id: string) => $api<{ data: Customer }>(`/customers/${id}`),
    create: (data: Partial<Customer>) =>
      $api<{ data: Customer }>('/customers', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Customer>) =>
      $api<{ data: Customer }>(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: string) => $api<{ success: boolean }>(`/customers/${id}`, { method: 'DELETE' }),
  };
}
```

### Jobs Composable (`apps/web/composables/useJobs.ts`)

```typescript
interface Job {
  id: string;
  customerId: string;
  workerId: string | null;
  title: string;
  scheduledDate: string;
  scheduledTime: string;
  durationMinutes: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  price: number | null;
}

export function useJobs() {
  const { $api } = useApi();

  return {
    list: (filters?: { page?: number; status?: string; workerId?: string; startDate?: string; endDate?: string }) => {
      const params = new URLSearchParams();
      if (filters?.page) params.set('page', filters.page.toString());
      if (filters?.status) params.set('status', filters.status);
      if (filters?.workerId) params.set('workerId', filters.workerId);
      if (filters?.startDate) params.set('startDate', filters.startDate);
      if (filters?.endDate) params.set('endDate', filters.endDate);
      return $api<{ data: Job[]; meta: any }>(`/jobs?${params}`);
    },
    calendar: (startDate: string, endDate: string) =>
      $api<{ data: Record<string, Job[]> }>(`/jobs/calendar?startDate=${startDate}&endDate=${endDate}`),
    today: () => $api<{ data: Job[] }>('/jobs/today'),
    get: (id: string) => $api<{ data: Job }>(`/jobs/${id}`),
    create: (data: Partial<Job>) =>
      $api<{ data: Job }>('/jobs', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Job>) =>
      $api<{ data: Job }>(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    start: (id: string) => $api<{ data: Job }>(`/jobs/${id}/start`, { method: 'POST' }),
    complete: (id: string) => $api<{ data: Job }>(`/jobs/${id}/complete`, { method: 'POST' }),
    remove: (id: string) => $api<{ success: boolean }>(`/jobs/${id}`, { method: 'DELETE' }),
  };
}
```

---

## Frontend: Page Template

```vue
<!-- apps/web/pages/customers/index.vue -->
<script setup lang="ts">
definePageMeta({ middleware: 'owner' });

const { list, remove } = useCustomers();
const searchQuery = ref('');
const page = ref(1);

const { data, pending, refresh } = await useAsyncData(
  'customers',
  () => list(page.value, searchQuery.value),
  { watch: [page, searchQuery] }
);

const customers = computed(() => data.value?.data || []);
const meta = computed(() => data.value?.meta);

async function handleDelete(id: string) {
  if (!confirm('Are you sure you want to delete this customer?')) return;
  await remove(id);
  refresh();
}
</script>

<template>
  <div class="container py-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Customers</h1>
        <p class="text-muted-foreground">Manage your customer list</p>
      </div>
      <Button @click="navigateTo('/customers/new')">
        <Plus class="w-4 h-4 mr-2" />
        Add Customer
      </Button>
    </div>

    <!-- Search -->
    <div class="max-w-sm">
      <Input v-model="searchQuery" placeholder="Search customers..." />
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-12">
      <Loader2 class="w-6 h-6 animate-spin" />
    </div>

    <!-- Empty state -->
    <Card v-else-if="!customers.length" class="text-center py-12">
      <CardContent>
        <Users class="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 class="text-lg font-medium mb-2">No customers yet</h3>
        <p class="text-muted-foreground mb-4">Get started by adding your first customer.</p>
        <Button @click="navigateTo('/customers/new')">Add Customer</Button>
      </CardContent>
    </Card>

    <!-- Table -->
    <Card v-else>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="customer in customers" :key="customer.id">
            <TableCell>
              <NuxtLink :to="`/customers/${customer.id}`" class="font-medium hover:underline">
                {{ customer.name }}
              </NuxtLink>
            </TableCell>
            <TableCell>{{ customer.phone || '-' }}</TableCell>
            <TableCell>{{ customer.email || '-' }}</TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="navigateTo(`/customers/${customer.id}`)">
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="navigateTo(`/customers/${customer.id}/edit`)">
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem class="text-destructive" @click="handleDelete(customer.id)">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>

    <!-- Pagination -->
    <div v-if="meta && meta.totalPages > 1" class="flex justify-center gap-2">
      <Button variant="outline" :disabled="page === 1" @click="page--">Previous</Button>
      <span class="py-2 px-4">Page {{ page }} of {{ meta.totalPages }}</span>
      <Button variant="outline" :disabled="page === meta.totalPages" @click="page++">Next</Button>
    </div>
  </div>
</template>
```

---

## Analytics (PostHog)

### Plugin (`apps/web/plugins/posthog.client.ts`)

```typescript
import posthog from 'posthog-js';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  if (config.public.posthogKey) {
    posthog.init(config.public.posthogKey, {
      api_host: config.public.posthogHost || 'https://us.i.posthog.com',
      capture_pageview: true,
      capture_pageleave: true,
    });
  }
  return { provide: { posthog } };
});
```

### Composable (`apps/web/composables/useAnalytics.ts`)

```typescript
import posthog from 'posthog-js';

export function useAnalytics() {
  const authStore = useAuthStore();

  return {
    identify: () => {
      if (authStore.user) {
        posthog.identify(authStore.user.id, {
          email: authStore.user.email,
          name: authStore.user.name,
          role: authStore.user.role,
        });
      }
    },
    reset: () => posthog.reset(),
    track: (event: string, props?: Record<string, any>) => posthog.capture(event, props),
  };
}

// Usage:
// const { track } = useAnalytics();
// track('customer_created', { customerId: 'xxx' });
```

---

## External Services

### Stripe Service (`apps/api/src/services/stripe.service.ts`)

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export const stripeService = {
  async createCustomer(email: string, name: string) {
    return stripe.customers.create({ email, name });
  },

  async createPaymentLink(amount: number, invoiceId: string) {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(amount * 100),
          product_data: { name: `Invoice #${invoiceId}` },
        },
        quantity: 1,
      }],
      metadata: { invoiceId },
      success_url: `${process.env.APP_URL}/invoices/${invoiceId}?paid=true`,
      cancel_url: `${process.env.APP_URL}/invoices/${invoiceId}`,
    });
    return session.url;
  },

  async handleWebhook(body: Buffer, signature: string) {
    return stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  },
};
```

### Twilio Service (`apps/api/src/services/sms.service.ts`)

```typescript
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

export const smsService = {
  async send(to: string, body: string) {
    const digits = to.replace(/\D/g, '');
    const formattedTo = digits.length === 10 ? `+1${digits}` : `+${digits}`;
    return client.messages.create({ body, from: fromNumber, to: formattedTo });
  },

  async sendReminder(to: string, customerName: string, date: string, time: string) {
    return this.send(to, `Hi ${customerName}! Reminder: Your appointment is scheduled for ${date} at ${time}.`);
  },

  async sendOnMyWay(to: string, workerName: string) {
    return this.send(to, `${workerName} is on the way to you now!`);
  },
};
```

---

*Last updated: January 29, 2026*
