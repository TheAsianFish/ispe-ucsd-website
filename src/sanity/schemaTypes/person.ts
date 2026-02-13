import { defineType, defineField } from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headshot',
      type: 'image',
      title: 'Headshot',
      options: { hotspot: true },
    }),
    defineField({
      name: 'major',
      type: 'string',
      title: 'Major',
    }),
    defineField({
      name: 'classYear',
      type: 'string',
      title: 'Class Year',
      description: 'e.g. "Class of 2026"',
    }),
    defineField({
      name: 'linkedin',
      type: 'url',
      title: 'LinkedIn',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { name: 'name', media: 'headshot' },
    prepare({ name, media }) {
      return {
        title: name ?? 'Untitled',
        media,
      }
    },
  },
})
