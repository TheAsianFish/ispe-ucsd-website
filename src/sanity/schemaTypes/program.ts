import { defineType, defineField } from 'sanity'

/**
 * Reusable program document for Programs landing cards and individual detail pages.
 * Supports card preview (title, shortDescription), structured detail sections,
 * and optional homepage featuring/ordering.
 */
export const program = defineType({
  name: 'program',
  title: 'Programs',
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
      name: 'shortDescription',
      type: 'text',
      title: 'Short description',
      description: 'Used on program cards and previews. Keep to 1–2 sentences.',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'overview',
      type: 'text',
      title: 'Overview / intro',
      description: 'Brief intro at the top of the program detail page.',
    }),
    defineField({
      name: 'howItWorks',
      type: 'array',
      title: 'How it works',
      of: [{ type: 'string' }],
      description: 'Bullet points or short steps.',
    }),
    defineField({
      name: 'commitment',
      type: 'array',
      title: 'Commitment / what to expect',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'benefits',
      type: 'array',
      title: 'Benefits',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'whoItsFor',
      type: 'text',
      title: 'Who it’s for / audience',
      description: 'Optional. Short paragraph or bullet summary.',
    }),
    defineField({
      name: 'ctaLabel',
      type: 'string',
      title: 'CTA button label',
      description: 'e.g. "Get involved", "Sign up"',
    }),
    defineField({
      name: 'ctaUrl',
      type: 'url',
      title: 'CTA button URL',
      validation: (rule) => rule.uri({ scheme: ['http', 'https', 'mailto'] }),
    }),
    defineField({
      name: 'featuredOnHome',
      type: 'boolean',
      title: 'Show on homepage',
      initialValue: false,
      description: 'When true, this program can appear in the homepage programs preview.',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display order',
      description: 'Lower numbers appear first. Leave blank for alphabetical.',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      description: 'Optional. Use if the design uses program images.',
    }),
  ],
  preview: {
    select: { title: 'title', order: 'order' },
    prepare({ title, order }) {
      return {
        title: title ?? 'Untitled',
        subtitle: order != null ? `Order: ${order}` : undefined,
      }
    },
  },
})
