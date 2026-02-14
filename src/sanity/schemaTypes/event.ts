import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
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
      name: 'startDate',
      type: 'datetime',
      title: 'Start date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'End date',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      description: 'Short description (~200 characters)',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'rsvpUrl',
      type: 'url',
      title: 'RSVP URL',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'flyerImage',
      type: 'image',
      title: 'Flyer image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Optional sort order',
    }),
  ],
  preview: {
    select: { title: 'title', startDate: 'startDate', location: 'location' },
    prepare({ title, startDate, location }) {
      const date = startDate
        ? new Date(startDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'No date'
      return {
        title: title ?? 'Untitled',
        subtitle: [date, location].filter(Boolean).join(' · '),
      }
    },
  },
})
