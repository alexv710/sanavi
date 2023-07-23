// server/api/patient.post.js
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

    // more validation here? - maybe later

    const query = `
      INSERT INTO "Patient" 
        ("ahvNumber", firstname, lastname, "dateOfBirth", gender, phone, email, "streetName", "streetNumber", "postalCode", city, canton) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `
    const values = [
      patient.ahvNumber,
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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Patient added successfully!' }),
    }
  }
  catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'An error occurred during insertion.' }),
    }
  }
})
