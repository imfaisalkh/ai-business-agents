# Code Templates

*Generated on January 28, 2026*

---

## API Route Templates

### Basic CRUD Route (Fastify)

```typescript
// apps/api/src/routes/customers.ts
import { FastifyInstance } from 'fastify';
import { db, customers } from '@app/db';
import { generateId, customerSchema } from '@app/shared';
import { eq, and, like } from 'drizzle-orm';

export async function customerRoutes(app: FastifyInstance) {
  // Auth middleware decorator
  app.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid token' } });
    }
  });

  // GET /api/customers - List all customers
  app.get('/', async (request) => {
    const { businessId } = request.user as { businessId: string };
    const { search, page = '1', limit = '20' } = request.query as Record<string, string>;

    let query = db.select().from(customers).where(eq(customers.businessId, businessId));

    if (search) {
      query = query.where(
        and(
          eq(customers.businessId, businessId),
          like(customers.name, `%${search}%`)
        )
      );
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const items = await query.limit(parseInt(limit)).offset(offset);
    const total = await db.select({ count: sql`count(*)` }).from(customers).where(eq(customers.businessId, businessId));

    return {
      success: true,
      data: {
        items,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total[0].count,
          pages: Math.ceil(total[0].count / parseInt(limit)),
        },
      },
    };
  });

  // GET /api/customers/:id - Get single customer
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { businessId } = request.user as { businessId: string };

    const customer = await db.query.customers.findFirst({
      where: and(eq(customers.id, id), eq(customers.businessId, businessId)),
    });

    if (!customer) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Customer not found' },
      });
    }

    return { success: true, data: customer };
  });

  // POST /api/customers - Create customer
  app.post('/', async (request, reply) => {
    const { businessId } = request.user as { businessId: string };
    const result = customerSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: result.error.message },
      });
    }

    const customer = await db.insert(customers).values({
      id: generateId(),
      businessId,
      ...result.data,
    }).returning();

    return { success: true, data: customer[0] };
  });

  // PATCH /api/customers/:id - Update customer
  app.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { businessId } = request.user as { businessId: string };
    const result = customerSchema.partial().safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: result.error.message },
      });
    }

    const updated = await db.update(customers)
      .set(result.data)
      .where(and(eq(customers.id, id), eq(customers.businessId, businessId)))
      .returning();

    if (updated.length === 0) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Customer not found' },
      });
    }

    return { success: true, data: updated[0] };
  });

  // DELETE /api/customers/:id - Delete customer
  app.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { businessId } = request.user as { businessId: string };

    const deleted = await db.delete(customers)
      .where(and(eq(customers.id, id), eq(customers.businessId, businessId)))
      .returning();

    if (deleted.length === 0) {
      return reply.status(404).send({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Customer not found' },
      });
    }

    return { success: true, data: { deleted: true } };
  });
}
```

---

## Vue Component Templates

### Page Component (Nuxt)

```vue
<!-- apps/admin/pages/customers/index.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Customers</h1>
        <p class="text-muted-foreground">Manage your customer list</p>
      </div>
      <Button @click="showAddModal = true">
        <Plus class="w-4 h-4 mr-2" />
        Add Customer
      </Button>
    </div>

    <!-- Search -->
    <div class="flex gap-4">
      <Input
        v-model="searchQuery"
        placeholder="Search customers..."
        class="max-w-sm"
      />
    </div>

    <!-- Table -->
    <Card>
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
              <NuxtLink
                :to="`/customers/${customer.id}`"
                class="font-medium hover:underline"
              >
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
                  <DropdownMenuItem @click="editCustomer(customer)">
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    class="text-destructive"
                    @click="deleteCustomer(customer.id)"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <!-- Empty State -->
      <div v-if="customers.length === 0" class="p-8 text-center">
        <Users class="w-12 h-12 mx-auto text-muted-foreground" />
        <h3 class="mt-4 text-lg font-medium">No customers yet</h3>
        <p class="text-muted-foreground">Add your first customer to get started</p>
        <Button class="mt-4" @click="showAddModal = true">
          Add Customer
        </Button>
      </div>
    </Card>

    <!-- Add/Edit Modal -->
    <CustomerModal
      v-model:open="showAddModal"
      :customer="editingCustomer"
      @saved="onCustomerSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { Plus, MoreHorizontal, Users } from 'lucide-vue-next';
import type { Customer } from '@app/shared';

const searchQuery = ref('');
const showAddModal = ref(false);
const editingCustomer = ref<Customer | null>(null);

const { data: customersData, refresh } = await useFetch('/api/customers', {
  query: { search: searchQuery },
});

const customers = computed(() => customersData.value?.data?.items || []);

function editCustomer(customer: Customer) {
  editingCustomer.value = customer;
  showAddModal.value = true;
}

async function deleteCustomer(id: string) {
  if (!confirm('Are you sure you want to delete this customer?')) return;

  await $fetch(`/api/customers/${id}`, { method: 'DELETE' });
  refresh();
}

function onCustomerSaved() {
  showAddModal.value = false;
  editingCustomer.value = null;
  refresh();
}
</script>
```

### Modal Component

```vue
<!-- apps/admin/components/CustomerModal.vue -->
<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          {{ customer ? 'Edit Customer' : 'Add Customer' }}
        </DialogTitle>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Name *</Label>
          <Input
            id="name"
            v-model="form.name"
            placeholder="Customer name"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="phone">Phone</Label>
          <Input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="(555) 123-4567"
          />
        </div>

        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="customer@example.com"
          />
        </div>

        <div class="space-y-2">
          <Label for="address">Address</Label>
          <Input
            id="address"
            v-model="form.address"
            placeholder="123 Main St, City, State"
          />
        </div>

        <div class="space-y-2">
          <Label for="notes">Notes</Label>
          <Textarea
            id="notes"
            v-model="form.notes"
            placeholder="Internal notes about this customer..."
            rows="3"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="open = false">
            Cancel
          </Button>
          <Button type="submit" :disabled="loading">
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            {{ customer ? 'Save Changes' : 'Add Customer' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import type { Customer } from '@app/shared';

const props = defineProps<{
  customer?: Customer | null;
}>();

const emit = defineEmits<{
  saved: [];
}>();

const open = defineModel<boolean>('open', { default: false });
const loading = ref(false);

const form = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
});

// Reset form when modal opens
watch(open, (isOpen) => {
  if (isOpen && props.customer) {
    Object.assign(form, props.customer);
  } else if (isOpen) {
    Object.assign(form, { name: '', phone: '', email: '', address: '', notes: '' });
  }
});

async function handleSubmit() {
  loading.value = true;
  try {
    if (props.customer) {
      await $fetch(`/api/customers/${props.customer.id}`, {
        method: 'PATCH',
        body: form,
      });
    } else {
      await $fetch('/api/customers', {
        method: 'POST',
        body: form,
      });
    }
    emit('saved');
  } catch (error) {
    console.error('Failed to save customer:', error);
    // TODO: Show toast error
  } finally {
    loading.value = false;
  }
}
</script>
```

---

## Composables

### useApi Composable

```typescript
// apps/admin/composables/useApi.ts
export function useApi() {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const api = $fetch.create({
    baseURL: config.public.apiUrl,

    async onRequest({ options }) {
      const token = authStore.accessToken;
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        // Try to refresh token
        const refreshed = await authStore.refreshToken();
        if (!refreshed) {
          navigateTo('/login');
        }
      }
    },
  });

  return { api };
}
```

### useAuth Composable

```typescript
// apps/admin/composables/useAuth.ts
export function useAuth() {
  const user = useState<User | null>('user', () => null);
  const accessToken = useState<string | null>('accessToken', () => null);

  async function login(email: string, password: string) {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });

    if (response.success) {
      user.value = response.data.user;
      accessToken.value = response.data.accessToken;
      return true;
    }
    return false;
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' });
    user.value = null;
    accessToken.value = null;
    navigateTo('/login');
  }

  async function refreshToken() {
    try {
      const response = await $fetch('/api/auth/refresh', { method: 'POST' });
      if (response.success) {
        accessToken.value = response.data.accessToken;
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }

  return {
    user: readonly(user),
    accessToken: readonly(accessToken),
    isAuthenticated: computed(() => !!user.value),
    login,
    logout,
    refreshToken,
  };
}
```

---

## Service Templates

### External Service Integration (Stripe)

```typescript
// apps/api/src/services/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createCustomer(email: string, name: string) {
  return stripe.customers.create({ email, name });
}

export async function createSubscriptionCheckout(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

export async function createPaymentLink(amount: number, invoiceId: string) {
  const product = await stripe.products.create({
    name: `Invoice #${invoiceId}`,
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: Math.round(amount * 100),
    currency: 'usd',
  });

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    metadata: { invoiceId },
  });

  return paymentLink.url;
}

export async function handleWebhook(
  body: Buffer,
  signature: string
) {
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful subscription
      break;
    case 'invoice.paid':
      // Handle invoice payment
      break;
    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      break;
  }

  return event;
}
```

### SMS Service (Twilio)

```typescript
// apps/api/src/services/twilio.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const fromNumber = process.env.TWILIO_PHONE_NUMBER;

export async function sendSMS(to: string, body: string) {
  return client.messages.create({
    body,
    from: fromNumber,
    to: formatPhoneNumber(to),
  });
}

export async function sendAppointmentReminder(
  to: string,
  customerName: string,
  date: string,
  time: string
) {
  const body = `Hi ${customerName}! Just a reminder that you have an appointment scheduled for ${date} at ${time}. Reply CONFIRM to confirm or RESCHEDULE to reschedule.`;
  return sendSMS(to, body);
}

export async function sendOnMyWay(to: string, workerName: string, eta: string) {
  const body = `${workerName} is on the way! Estimated arrival: ${eta}`;
  return sendSMS(to, body);
}

function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  // Add US country code if not present
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  return `+${digits}`;
}
```

### Email Service (Resend)

```typescript
// apps/api/src/services/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvoiceEmail(
  to: string,
  customerName: string,
  invoiceNumber: string,
  amount: number,
  paymentLink: string
) {
  return resend.emails.send({
    from: 'invoices@yourdomain.com',
    to,
    subject: `Invoice #${invoiceNumber} from [Your Business Name]`,
    html: `
      <h1>Invoice #${invoiceNumber}</h1>
      <p>Hi ${customerName},</p>
      <p>Here's your invoice for recent services:</p>
      <p><strong>Amount Due: $${amount.toFixed(2)}</strong></p>
      <p><a href="${paymentLink}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Pay Now</a></p>
      <p>Thank you for your business!</p>
    `,
  });
}

export async function sendWorkerInvite(
  to: string,
  businessName: string,
  inviteLink: string
) {
  return resend.emails.send({
    from: 'noreply@yourdomain.com',
    to,
    subject: `You've been invited to join ${businessName}`,
    html: `
      <h1>Welcome to ${businessName}!</h1>
      <p>You've been invited to join the team. Click below to set up your account:</p>
      <p><a href="${inviteLink}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Accept Invitation</a></p>
      <p>This link expires in 7 days.</p>
    `,
  });
}
```

---

## Utility Functions

### Date/Time Helpers

```typescript
// packages/shared/date-utils.ts
import { format, parseISO, addDays, startOfWeek, endOfWeek } from 'date-fns';

export function formatJobDate(date: string): string {
  return format(parseISO(date), 'EEE, MMM d');
}

export function formatJobTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function getWeekRange(date: Date) {
  return {
    start: startOfWeek(date, { weekStartsOn: 0 }),
    end: endOfWeek(date, { weekStartsOn: 0 }),
  };
}

export function getWeekDays(date: Date): Date[] {
  const { start } = getWeekRange(date);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
```

### Validation Helpers

```typescript
// packages/shared/validation-utils.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}
```

---

## Error Handling

### API Error Handler

```typescript
// apps/api/src/middleware/error-handler.ts
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.error(error);

  // Validation errors
  if (error.validation) {
    return reply.status(400).send({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: error.validation,
      },
    });
  }

  // JWT errors
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
    return reply.status(401).send({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      },
    });
  }

  // Default error
  return reply.status(error.statusCode || 500).send({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error.message,
    },
  });
}
```

### Frontend Error Toast

```typescript
// apps/admin/composables/useToast.ts
export function useToast() {
  const toasts = useState<Toast[]>('toasts', () => []);

  function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = Date.now().toString();
    toasts.value.push({ id, message, type });

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 5000);
  }

  function showError(error: unknown) {
    const message = error instanceof Error
      ? error.message
      : 'An unexpected error occurred';
    showToast(message, 'error');
  }

  function showSuccess(message: string) {
    showToast(message, 'success');
  }

  return { toasts, showToast, showError, showSuccess };
}
```

---

*Next artifact: 05-engineering-metrics.md*
