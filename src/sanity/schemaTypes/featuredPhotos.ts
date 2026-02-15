import { defineType, defineField } from 'sanity'

export const featuredPhotos = defineType({
  name: 'featuredPhotos',
  title: 'Featured Photos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'photos',
      type: 'array',
      title: 'Photos',
      validation: (rule) => rule.required().min(1),
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Describe the image for accessibility.',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title ?? 'Featured Photos',
        subtitle: 'Home page photo slider',
      }
    },
  },
})
