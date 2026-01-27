import { promises as fs } from 'fs'
import path from 'path'

interface Artifact {
  name: string
  filename: string
  path: string
  category: string
}

interface Category {
  name: string
  artifacts: Artifact[]
}

interface Idea {
  name: string
  displayName: string
  categories: Category[]
  hasBusinessContext: boolean
  hasLaunchSummary: boolean
}

const CATEGORIES = ['marketing', 'product', 'sales', 'engineering', 'finance'] as const

function formatArtifactName(filename: string): string {
  // Remove number prefix and .md extension, then format
  const nameWithoutExtension = filename.replace(/\.md$/, '')
  const nameWithoutNumber = nameWithoutExtension.replace(/^\d+-/, '')

  // Convert kebab-case to Title Case
  return nameWithoutNumber
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatIdeaName(folder: string): string {
  // Convert kebab-case to Title Case
  return folder
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default defineEventHandler(async () => {
  const ideasPath = path.resolve(process.cwd(), '../ideas')

  try {
    const entries = await fs.readdir(ideasPath, { withFileTypes: true })
    const ideaFolders = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('_'))
      .map(entry => entry.name)

    const ideas: Idea[] = []

    for (const ideaFolder of ideaFolders) {
      const ideaPath = path.join(ideasPath, ideaFolder)
      const categories: Category[] = []

      // Check for business-context.md
      let hasBusinessContext = false
      try {
        await fs.access(path.join(ideaPath, 'business-context.md'))
        hasBusinessContext = true
      } catch {
        hasBusinessContext = false
      }

      // Check for launch summary
      let hasLaunchSummary = false
      try {
        await fs.access(path.join(ideaPath, '00-LAUNCH-SUMMARY.md'))
        hasLaunchSummary = true
      } catch {
        hasLaunchSummary = false
      }

      // Read each category folder
      for (const categoryName of CATEGORIES) {
        const categoryPath = path.join(ideaPath, categoryName)
        const artifacts: Artifact[] = []

        try {
          const files = await fs.readdir(categoryPath)
          const mdFiles = files
            .filter(file => file.endsWith('.md') || (file.endsWith('.gitkeep') === false && file !== '.gitkeep'))
            .filter(file => file.endsWith('.md'))
            .sort()

          for (const file of mdFiles) {
            artifacts.push({
              name: formatArtifactName(file),
              filename: file,
              path: `${ideaFolder}/${categoryName}/${file}`,
              category: categoryName,
            })
          }
        } catch {
          // Category folder doesn't exist or is empty
        }

        categories.push({
          name: categoryName,
          artifacts,
        })
      }

      ideas.push({
        name: ideaFolder,
        displayName: formatIdeaName(ideaFolder),
        categories,
        hasBusinessContext,
        hasLaunchSummary,
      })
    }

    return ideas
  } catch (error) {
    console.error('Error reading ideas:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read ideas directory',
    })
  }
})
