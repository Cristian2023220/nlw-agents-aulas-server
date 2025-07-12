import { db, sql } from './connection.ts'
import { reset } from 'drizzle-seed'
import { rooms, questions, audioChunks } from './schema/index.ts'

// 🔄 Resetar banco de dados (tabelas + relacionamentos)
await reset(db, [rooms, questions, audioChunks])

// 🏢 Inserir salas e capturar seus IDs
const insertedRooms = await db
  .insert(rooms)
  .values([
    { name: 'Sala 01', description: 'Sala de discussão geral' },
    { name: 'Sala 02', description: 'Agentes inteligentes' },
    { name: 'Sala 03', description: 'Curiosidades e perguntas' },
  ])
  .returning({ id: rooms.id })

// 👇 Selecionar os IDs das salas
const roomIds = insertedRooms.map((room) => room.id)

// ❓ Inserir perguntas com `roomId` válido
await db.insert(questions).values([
  {
    roomId: roomIds[0],
    question: 'Qual é a capital do Brasil?',
    answer: 'Brasília',
  },
  {
    roomId: roomIds[1],
    question: 'O que são agentes conversacionais?',
    answer:
      'São interfaces que permitem comunicação por linguagem natural entre humanos e sistemas.',
  },
  {
    roomId: roomIds[2],
    question: 'Qual é a função do Copilot?',
    answer:
      'Ajudar pessoas com conhecimento, criatividade, produtividade e humor na vida digital!',
  },
])

// ✅ Finalizar a conexão com o banco
await sql.end()

// 🎉 Mensagem de confirmação
console.log('Banco de dados semeado com sucesso 🌱')