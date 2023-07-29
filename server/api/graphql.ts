import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import knex from 'knex'
import { schema } from '#graphql/schema'
import type { Resolvers } from '#graphql/resolver'

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

const resolvers: Resolvers = {
  Query: {
    getPatients: async (_parent, args, _context, _info) => {
      // Start building the query
      let query = db('Patient')
        .select('*')

      // Apply the filtering and sorting conditions
      if (args.firstname)
        query = query.where('firstname', 'like', `%${args.firstname}%`)

      if (args.lastname)
        query = query.where('lastname', 'like', `%${args.lastname}%`)

      if (args.ahvNumber)
        query = query.where('ahvNumber', args.ahvNumber)

      if (args.dateOfBirth)
        query = query.where('dateOfBirth', args.dateOfBirth)

      // Execute the query
      const patients = await query

      return patients
    },
  },
  Mutation: {
    upsertPatient: async (_parent, args, _context, _info) => {
      const { patientInput } = args
      if (patientInput.id) {
        // Update existing patient
        await db('Patient')
          .where('id', patientInput.id)
          .update(patientInput)
        // Return updated patient
        const updatedPatient = await db('Patient').select('*').where('id', patientInput.id).first()
        return updatedPatient
      }
      else {
        // Create new patient
        const [newPatient] = await db('Patient').insert(patientInput).returning('*')
        return newPatient
      }
    },
  },
}

const apollo = new ApolloServer({ typeDefs: schema, resolvers })

export default startServerAndCreateH3Handler(apollo)
