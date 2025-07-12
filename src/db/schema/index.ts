// src/schema/index.ts

export { rooms } from './rooms.ts'
export { questions } from './questions.ts'
export { audioChunks } from './audio-chunks.ts'

// Exporta tudo junto como um objeto também
import { rooms } from './rooms.ts'
import { questions } from './questions.ts'
import { audioChunks } from './audio-chunks.ts'

export const schema = {
  rooms,
  questions,
  audioChunks,
}