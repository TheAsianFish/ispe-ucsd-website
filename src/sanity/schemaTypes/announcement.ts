import { defineType, defineField } from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'text',
      title: 'Body',
      description: 'Short text for the banner.',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'href',
      type: 'url',
      title: 'Link URL',
    }),
    defineField({
      name: 'hrefLabel',
      type: 'string',
      title: 'Link Label',
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      initialValue: true,
    }),
    defineField({
      name: 'startAt',
      type: 'datetime',
      title: 'Start (optional)',
    }),
    defineField({
      name: 'endAt',
      type: 'datetime',
      title: 'End (optional)',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: { title: 'title', isActive: 'isActive' },
    prepare({ title, isActive }) {
      return {
        title: title ?? 'Untitled',
        subtitle: isActive ? 'Active' : 'Inactive',
      }
    },
  },
})
