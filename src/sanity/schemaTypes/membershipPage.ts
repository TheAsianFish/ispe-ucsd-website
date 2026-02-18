import { defineType, defineField } from 'sanity'

export const membershipPage = defineType({
  name: 'membershipPage',
  title: 'Membership Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Membership',
    }),
    defineField({
      name: 'heroHeadline',
      type: 'string',
      title: 'Hero Headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      type: 'text',
      title: 'Hero Subheadline',
    }),
    defineField({
      name: 'primaryCtaLabel',
      type: 'string',
      title: 'Primary CTA Label',
    }),
    defineField({
      name: 'primaryCtaUrl',
      type: 'url',
      title: 'Primary CTA URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCtaLabel',
      type: 'string',
      title: 'Secondary CTA Label',
    }),
    defineField({
      name: 'secondaryCtaUrl',
      type: 'url',
      title: 'Secondary CTA URL',
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      title: 'Highlights',
      description: 'Bullet list e.g. "Free to join", "Access to events"',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'quickLinks',
      type: 'object',
      title: 'Quick Links',
      fields: [
        defineField({
          name: 'discordUrl',
          type: 'url',
          title: 'Discord URL',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'instagramUrl',
          type: 'url',
          title: 'Instagram URL',
        }),
        defineField({
          name: 'emailListUrl',
          type: 'url',
          title: 'Email List URL',
          description: 'Google Form, Mailchimp, or other signup form link',
        }),
        defineField({
          name: 'contactEmail',
          type: 'string',
          title: 'Contact Email',
          description: 'Used for mailto link',
        }),
      ],
    }),
    defineField({
      name: 'chapterVsNational',
      type: 'object',
      title: 'Chapter vs. National',
      fields: [
        defineField({
          name: 'sectionTitle',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Chapter vs. National Membership',
        }),
        defineField({
          name: 'chapterTitle',
          type: 'string',
          title: 'Chapter Title',
          initialValue: 'ISPE UCSD Chapter',
        }),
        defineField({
          name: 'chapterBullets',
          type: 'array',
          title: 'Chapter Bullets',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'nationalTitle',
          type: 'string',
          title: 'National Title',
          initialValue: 'National ISPE',
        }),
        defineField({
          name: 'nationalBullets',
          type: 'array',
          title: 'National Bullets',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'nationalFeeText',
          type: 'string',
          title: 'National Fee Text',
          initialValue: '$29/year (student rate)',
        }),
        defineField({
          name: 'nationalJoinUrl',
          type: 'url',
          title: 'National Join URL',
        }),
      ],
    }),
    defineField({
      name: 'faq',
      type: 'array',
      title: 'FAQ',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', type: 'string', title: 'Question' }),
            defineField({ name: 'answer', type: 'text', title: 'Answer' }),
          ],
          preview: {
            select: { question: 'question' },
            prepare({ question }) {
              return { title: question || 'FAQ item' }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Membership Page' }
    },
  },
})
