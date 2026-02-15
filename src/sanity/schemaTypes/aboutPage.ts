import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'About the ISPE UCSD Student Chapter.',
    }),
    defineField({
      name: 'intro',
      type: 'text',
      title: 'Intro',
    }),
    defineField({
      name: 'missionHeading',
      type: 'string',
      title: 'Mission Heading',
      initialValue: 'Supporting students interested in pharmaceutical engineering.',
    }),
    defineField({
      name: 'missionBody',
      type: 'text',
      title: 'Mission Body',
    }),
    defineField({
      name: 'whatIsHeading',
      type: 'string',
      title: 'What is ISPE Heading',
      initialValue: 'International Society for Pharmaceutical Engineering (placeholder copy).',
    }),
    defineField({
      name: 'whatIsBody',
      type: 'text',
      title: 'What is ISPE Body',
      description: 'Plain text; use line breaks for paragraphs.',
    }),
    defineField({
      name: 'contactCtaHeading',
      type: 'string',
      title: 'Contact CTA Heading',
      initialValue: 'Questions about the chapter?',
    }),
    defineField({
      name: 'contactCtaBody',
      type: 'text',
      title: 'Contact CTA Body',
    }),
    defineField({
      name: 'contactPrimaryLabel',
      type: 'string',
      title: 'Contact Primary Button Label',
      initialValue: 'Contact page',
    }),
    defineField({
      name: 'contactPrimaryHref',
      type: 'string',
      title: 'Contact Primary Button Link',
      initialValue: '/contact',
    }),
    defineField({
      name: 'contactSecondaryLabel',
      type: 'string',
      title: 'Contact Secondary Link Label',
      initialValue: 'Email the board',
    }),
    defineField({
      name: 'contactSecondaryHref',
      type: 'string',
      title: 'Contact Secondary Link URL',
      initialValue: 'mailto:YOUR_EMAIL',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
