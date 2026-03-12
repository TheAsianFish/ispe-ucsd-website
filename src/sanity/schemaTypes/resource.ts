import { defineType, defineField } from 'sanity'

const resourceCategories: Array<{ title: string; value: string }> = [
  { title: 'UCSD Academic & Campus Resources', value: 'ucsd' },
  { title: 'Industry Learning & Knowledge', value: 'industry-learning' },
  { title: 'Career Exploration Tools', value: 'career-exploration' },
  { title: 'San Diego Biotech Ecosystem', value: 'san-diego-biotech' },
  { title: 'Other', value: 'other' },
]

export const resource = defineType({
  name: 'resource',
  title: 'Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short description',
      description: 'One sentence explaining why this is useful.',
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: resourceCategories,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display order',
      description: 'Lower numbers appear first within a category.',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      initialValue: false,
      description: 'Optional — useful for future homepage previews.',
    }),
    defineField({
      name: 'showOnHomepage',
      type: 'boolean',
      title: 'Show on homepage',
      initialValue: false,
      description: 'Optional — enable when a homepage resources preview is CMS-driven.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      featured: 'featured',
    },
    prepare({ title, category, featured }) {
      const categoryLabel =
        resourceCategories.find((c) => c.value === category)?.title ??
        category ??
        'Uncategorized'
      return {
        title: title ?? 'Untitled',
        subtitle: [categoryLabel, featured ? 'Featured' : null]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})

