<script setup lang="ts">
import { ref } from 'vue'
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'

const valid = ref(false)

const patientStore = usePatientStore()
const isLoading = ref(false)
const error = ref(null)
const patientInput = { ...patientStore.patient }
// delete patientInput.address1
// delete patientInput.__typename

const UPSERT_PATIENT = gql`
  mutation UpsertPatient($patient: PatientInput!) {
    upsertPatient(patientInput: $patient) {
        id
        firstname
        lastname
        gender
        email
        phone
        ahvNumber
        dateOfBirth
        streetName
        streetNumber
        postalCode
        city
        canton
    }
  }
`

const UPSERT_PATIENT_TEST = gql`
  mutation UpsertPatientTest($patientInput: PatientInput!) {
    upsertPatientTest(patientInput: $patientInput) {
      status
    }
  }
`
const { mutate: upsertPatientTest } = useMutation(UPSERT_PATIENT_TEST)

async function submitTestPatient() {
  console.log('Starting test mutation...')

  const testPatientInput = {
    id: '2bec5fcb-2c88-4c72-b6e2-c32cbf305e18',
    firstname: 'John',
    lastname: 'Doe',
    gender: 'F',
    email: 'john.doe@example.com',
    phone: '+41123456789',
    ahvNumber: '756.1234.1234.12',
    dateOfBirth: '01.01.1990',
    streetName: 'Some Street',
    streetNumber: '123',
    postalCode: '12345',
    city: 'Some City',
    canton: 'Some Canton',
  }

  const result = upsertPatientTest({ patientInput: testPatientInput },
  ).then((result) => {
    console.log('Mutation result:', result)
  }).catch((error) => {
    console.error('Mutation error:', error)
  })

  console.log('Test mutation result:', result)
}

const { mutate: upsertPatient, onDone, onError } = useMutation(UPSERT_PATIENT)

onDone(({ data }) => {
  patientStore.setPatientData(data.upsertPatient)
  isLoading.value = false
})

onError((err) => {
  error.value = err.message
  isLoading.value = false
})

async function submitPatient() {
  console.log(patientInput)
  if (!valid.value || !patientStore.patient)
    return

  isLoading.value = true
  error.value = null
  console.log('upsert')
  const PatientInput = {
    id: patientStore.patient.id,
    firstname: patientStore.patient.firstname,
    lastname: patientStore.patient.lastname,
    gender: patientStore.patient.gender,
    email: patientStore.patient.email,
    phone: patientStore.patient.phone,
    ahvNumber: patientStore.patient.ahvNumber,
    dateOfBirth: patientStore.patient.dateOfBirth,
    streetName: patientStore.patient.streetName,
    streetNumber: patientStore.patient.streetNumber,
    postalCode: patientStore.patient.postalCode,
    city: patientStore.patient.city,
    canton: patientStore.patient.canton,
  }
  console.log(PatientInput)
  const test = upsertPatient({
    patient: PatientInput, // patientStore.patient,
  }).then((result) => {
    console.log('Mutation result:', result)
  }).catch((error) => {
    console.error('Mutation error:', error)
  })
  console.log('finished upserting', test)
}

const nameRules = [
  v => !!v || 'Name is required',
]

const emailRules = [
  v => !!v || 'E-mail is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const phoneRules = [
  v => !!v || 'Phone number is required',
  (v) => {
    const cleanInput = v.replace(/\s/g, '')
    return /(^\+41\s?|0)[1-9]\d{1}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(cleanInput) || 'Phone number must be a valid Swiss phone number (+41 79 123 45 67)'
  },
]

const ahvNumberRules = [
  v => !!v || 'AHV Number is required',
  v => /^756\.?\d{4}\.?\d{4}\.?\d{2}$/.test(v) || 'AHV Number must be valid (756.1234.1234.12)',
]

const dateOfBirthRules = [
  v => !!v || 'Date of birth is required',
  (v) => {
    // Check the format
    if (!/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(v))
      return 'Date of birth must be in the format d.m.yyyy'

    // Check the date is valid
    const [day, month, year] = v.split('.')
    const birthDate = new Date(year, month - 1, day)

    if (
      birthDate.getFullYear() != year
      || birthDate.getMonth() != month - 1
      || birthDate.getDate() != day
    )
      return 'Invalid date'

    // Check the age
    const ageDifMs = Date.now() - birthDate.getTime()
    const ageDate = new Date(ageDifMs)
    const age = Math.abs(ageDate.getUTCFullYear() - 1970)

    if (age > 150)
      return 'Age cannot be more than 150 years'

    if (age < 1)
      return 'Age cannot be less than 1 year'

    return true
  },
]
</script>

<template>
  <client-only>
    <v-card>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <!-- Existing Fields -->
            <v-col cols="12" md="4">
              <v-text-field
                v-model="patientStore.patient.firstname" :rules="nameRules" :counter="10" label="First name"
                required
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="patientStore.patient.lastname" :rules="nameRules" :counter="10" label="Last name"
                required
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-radio-group v-model="patientStore.patient.gender">
                <v-radio label="Male" value="M" />
                <v-radio label="Female" value="F" />
              </v-radio-group>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="patientStore.patient.email" :rules="emailRules" label="E-mail" required />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model.trim="patientStore.patient.phone" :rules="phoneRules" label="Phone" required />
            </v-col>

            <!-- New Fields -->
            <v-col cols="12" md="4">
              <v-text-field
                v-model="patientStore.patient.ahvNumber" :rules="ahvNumberRules" label="AHV Number"
                required
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="patientStore.patient.dateOfBirth" :rules="dateOfBirthRules" label="Date Of Birth"
                required
              />
            </v-col>
            <!-- Address -->
            <v-col cols="12" md="4">
              <v-text-field v-model="patientStore.patient.streetName" label="Street" required />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="patientStore.patient.streetNumber" label="Street Number" required />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="patientStore.patient.postalCode" label="Postal Code" required />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="patientStore.patient.city" label="City" required />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="patientStore.patient.canton" label="Canton" required />
            </v-col>
          </v-row>
        </v-container>
        <v-btn v-if="!patientStore.patient.id" m-4 type="submit" :disabled="isLoading" @click="submitPatient">
          Create New Patient
        </v-btn>
        <v-btn v-if="patientStore.patient.id" m-4 type="submit" :disabled="isLoading" @click="submitPatient">
          Update Patient Information
        </v-btn>
      </v-form>
    </v-card>
  </client-only>
</template>
