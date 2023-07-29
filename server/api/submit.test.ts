// import { fetch, setup } from '@nuxt/test-utils'
// import { describe, expect, test } from 'vitest'

// describe('submit.post', async () => {
//   await setup()

//   test('should return 200 and success message when valid data is passed', async () => {
//     const patientData = {
//       ahvNumber: '756.1234.1234.12',
//       firstname: 'John',
//       lastname: 'Doe',
//       dateOfBirth: '27.12.1993',
//       gender: 'Male',
//       phone: '1234567890',
//       email: 'john.doe@example.com',
//       address: {
//         streetName: 'Main St',
//         streetNumber: '123',
//         postalCode: '12345',
//         city: 'City',
//         canton: 'Canton',
//       },
//     }

//     const res = await fetch('/api/submit', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(patientData),
//     })
//     const result = await res.json()
//     console.log(result)

//     expect(res.status).toBe(200)
//     expect(result).toEqual({ message: 'Patient added successfully!' })
//   })
// })
