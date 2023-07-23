// server/api/patients.get.ts
import { defineEventHandler, getQuery } from 'h3'
import knex from 'knex'

// Define the database connection
const runtimeConfig = useRuntimeConfig()

const db = knex({
  client: 'pg',
  connection: {
    host: runtimeConfig.dbHost,
    user: runtimeConfig.dbUser,
    password: runtimeConfig.dbPassword,
    database: runtimeConfig.dbName,
  },
})

// Define the request's query parameters
export interface Filter {
  firstname?: string
  lastname?: string
  ahvNumber?: string
  dateOfBirth?: string
}

export default defineEventHandler(async (event) => {
  try {
    // Retrieve the query parameters
    const params: Filter = getQuery(event)

    // Start building the query
    let query = db('Patient')
      .select('*', db.raw('TO_CHAR("dateOfBirth", \'DD.MM.YYYY\') as "dateOfBirth"'))

    // Apply the filtering and sorting conditions
    if (params.firstname)
      query = query.where('firstname', 'like', `%${params.firstname}%`)

    if (params.lastname)
      query = query.where('lastname', 'like', `%${params.lastname}%`)

    if (params.ahvNumber)
      query = query.where('ahvNumber', params.ahvNumber)

    if (params.dateOfBirth)
      query = query.where('dateOfBirth', params.dateOfBirth)

    // Execute the query
    let patients = await query

    // Reformat the patients data
    patients = patients.map(patient => ({
      ...patient,
      address: {
        streetName: patient.streetName,
        streetNumber: patient.streetNumber,
        postalCode: patient.postalCode,
        city: patient.city,
        canton: patient.canton,
      },
    }))

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { patients },
    }
  }
  catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'An error occurred during data retrieval.' }),
    }
  }
})
