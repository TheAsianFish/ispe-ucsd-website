import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About Page')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage'),
        ),
      S.listItem()
        .title('Membership Page')
        .child(
          S.document()
            .schemaType('membershipPage')
            .documentId('membershipPage'),
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'aboutPage' && item.getId() !== 'membershipPage',
      ),
    ])
