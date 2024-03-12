import { Sequelize } from 'sequelize'

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DATABASE
const host = process.env.DB_HOST
const port = process.env.DB_PORT !== undefined ? parseInt(process.env.DB_PORT, 10) : 3306

const sequelize = new Sequelize({
  dialect: 'mysql',
  database,
  username,
  password,
  host,
  port,
  logging: false
})

export async function syncTables (): Promise<void> {
  try {
    await sequelize.sync()
    console.log(">> Tablas sincronizadas")
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Ocurrió un error: ${error.message}`)
    } else {
      throw new Error('Ocurrió un error desconocido.')
    }
  }
}

export default sequelize
