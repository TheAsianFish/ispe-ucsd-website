import { defineType, defineField } from 'sanity'

export const boardSeat = defineType({
  name: 'boardSeat',
  title: 'Board Seat',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      type: 'reference',
      to: [{ type: 'boardTerm' }],
      title: 'Term',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'person',
      type: 'reference',
      to: [{ type: 'person' }],
      title: 'Person',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      description: 'e.g. "President"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Used to order members on the page',
    }),
  ],
  preview: {
    select: {
      role: 'role',
      personName: 'person.name',
      termTitle: 'term.title',
    },
    prepare({ role, personName, termTitle }) {
      const title = role && personName ? `${role} — ${personName}` : 'Untitled Seat'
      return {
        title,
        subtitle: termTitle ?? undefined,
      }
    },
  },
})
