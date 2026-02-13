import { defineType, defineField } from 'sanity'

export const boardTerm = defineType({
  name: 'boardTerm',
  title: 'Board Term',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isCurrent',
      type: 'boolean',
      title: 'Current Term',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Used for sorting newest first',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title ?? 'Untitled Term',
      }
    },
  },
})
