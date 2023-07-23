// server/api/patient.put.ts
import pkg from 'pg'
import { defineEventHandler, readBody } from 'h3'

// Define the database connection
const runtimeConfig = useRuntimeConfig()

const { Pool } = pkg

const pool = new Pool({
  host: runtimeConfig.dbHost,
  user: runtimeConfig.dbUser,
  password: runtimeConfig.dbPassword,
  database: runtimeConfig.dbName,
  port: 5432,
})

export default defineEventHandler(async (event) => {
  try {
    const patient = await readBody(event)

    // Check if patient exists
    const { rows } = await pool.query('SELECT 1 FROM "Patient" WHERE id = $1', [patient.id])

    if (rows.length > 0) {
      // Patient exists, perform update
      const query = `
        UPDATE "Patient" 
        SET 
          firstname = $2, 
          lastname = $3, 
          "dateOfBirth" = $4, 
          gender = $5, 
          phone = $6, 
          email = $7, 
          "streetName" = $8, 
          "streetNumber" = $9, 
          "postalCode" = $10, 
          city = $11, 
          canton = $12
        WHERE 
          id = $1
      `
      const values = [
        patient.id,
        patient.firstname,
        patient.lastname,
        patient.dateOfBirth,
        patient.gender,
        patient.phone,
        patient.email,
        patient.address.streetName,
        patient.address.streetNumber,
        patient.address.postalCode,
        patient.address.city,
        patient.address.canton,
      ]

      await pool.query(query, values)
      console.log('updated existing patient')

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Patient updated successfully!' }),
      }
    }
    else {
      console.log('create new patient instead')
    }
  }
  catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'An error occurred during update.' }),
    }
  }
})
