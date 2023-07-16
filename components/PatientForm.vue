<script setup lang="ts">
import { ref } from 'vue'

const valid = ref(false)

const patientStore = usePatientStore()
const menu = ref()
const date = ref()
const isLoading = ref(false)
const serverResponse = ref(null)
const error = ref(null)

async function submitPatient() {
  isLoading.value = true
  error.value = null

  try {
    if (!patientStore.patient)
      return

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientStore.patient),
    })

    if (!response.ok)
      throw new Error('Network response was not ok')

    serverResponse.value = await response.json()
  }
  catch (err) {
    error.value = err.message
  }
  finally {
    isLoading.value = false
  }
}

const nameRules = [
  v => !!v || 'Name is required',
]

const emailRules = [
  v => !!v || 'E-mail is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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
            <v-text-field v-model="patientStore.patient.email" :rules="emailRules" label="E-mail" required />
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
            <v-text-field v-model="patientStore.patient.address.streetName" label="Street" required />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="patientStore.patient.address.streetNumber" label="Street Number" required />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="patientStore.patient.address.postalCode" label="Postal Code" required />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="patientStore.patient.address.city" label="City" required />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="patientStore.patient.address.canton" label="Canton" required />
          </v-col>
        </v-row>
      </v-container>
      <v-btn type="submit" :disabled="isLoading" @click="submitPatient">
        Submit
      </v-btn>
    </v-form>
  </client-only>
</template>
