import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const ideaName = query.idea as string

  if (!ideaName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Idea parameter is required',
    })
  }

  // Sanitize to prevent directory traversal
  const sanitizedIdea = ideaName.replace(/\.\./g, '').replace(/[/\\]/g, '')

  const fullPath = path.resolve(process.cwd(), '../ideas', sanitizedIdea, '00-LAUNCH-SUMMARY.md')

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
      idea: ideaName,
      content,
    }
  } catch (error) {
    console.error('Error reading launch summary:', error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Launch summary not found',
    })
  }
})
