import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const artifactPath = query.path as string

  if (!artifactPath) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Path parameter is required',
    })
  }

  // Sanitize path to prevent directory traversal
  const sanitizedPath = artifactPath.replace(/\.\./g, '')

  const fullPath = path.resolve(process.cwd(), '../ideas', sanitizedPath)

  // Ensure the path is within the ideas directory
  const ideasPath = path.resolve(process.cwd(), '../ideas')
  if (!fullPath.startsWith(ideasPath)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied',
    })
  }

  try {
    const content = await fs.readFile(fullPath, 'utf-8')
    return {
      path: artifactPath,
      content,
    }
  } catch (error) {
    console.error('Error reading artifact:', error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Artifact not found',
    })
  }
})
