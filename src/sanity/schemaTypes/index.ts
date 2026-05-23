import { type SchemaTypeDefinition } from 'sanity'
import b2bHospital from './b2bHospital'
import diseaseProtocol from './diseaseProtocol' // 1. Import it here
import blogPost from './blogPost' // <-- Add this

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [b2bHospital, diseaseProtocol, blogPost],
}