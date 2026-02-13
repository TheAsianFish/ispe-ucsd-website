import { type SchemaTypeDefinition } from 'sanity'
import { boardTerm } from './boardTerm'
import { person } from './person'
import { boardSeat } from './boardSeat'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [boardTerm, person, boardSeat],
}
