import { type SchemaTypeDefinition } from 'sanity'
import { aboutPage } from './aboutPage'
import { announcement } from './announcement'
import { boardTerm } from './boardTerm'
import { person } from './person'
import { boardSeat } from './boardSeat'
import { event } from './event'
import { featuredPhotos } from './featuredPhotos'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutPage, announcement, boardTerm, person, boardSeat, event, featuredPhotos],
}
