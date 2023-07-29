<script setup lang="ts">
import { ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const patientStore = usePatientStore()
const patients = ref([])
const search = ref('')
const selectedPatientId = ref(null)

function editPatient(patient) {
  if (selectedPatientId.value === patient.raw.id) {
    // unset the patient in the store and selectedPatientId
    patientStore.clearPatientData()
    selectedPatientId.value = null
  }
  else {
    // set the patient in the store and update selectedPatientId
    patientStore.setPatientData(patient.selectable)
    selectedPatientId.value = patient.selectable.id
  }
}

const GET_PATIENTS = gql`
  query GetPatients($firstname: String, $lastname: String, $ahvNumber: String, $dateOfBirth: String) {
    getPatients(firstname: $firstname, lastname: $lastname, ahvNumber: $ahvNumber, dateOfBirth: $dateOfBirth) {
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

const { onResult, refetch } = useQuery(GET_PATIENTS)

function parseDate(dateTimestamp) {
  console.log(dateTimestamp)
  const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(dateTimestamp)
  console.log(date)

  return `${date}`
}

onResult(({ data }) => {
  patients.value = data.getPatients.map(patient => ({
    ...patient,
    dateOfBirth: parseDate(patient.dateOfBirth),
    address1: `${patient.streetName} ${patient.streetNumber}, ${patient.postalCode} ${patient.city} (${patient.canton})`,
  }))
})

onMounted(() => {
  refetch()
})

const headers = [
  { title: 'AHV Number', key: 'ahvNumber', sortable: true },
  { title: 'First Name', key: 'firstname', sortable: true },
  { title: 'Last Name', key: 'lastname', sortable: true },
  { title: 'Date Of Birth', key: 'dateOfBirth', sortable: true },
  { title: 'Gender', key: 'gender', sortable: true },
  { title: 'Phone', key: 'phone', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Address', key: 'address1', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <client-only>
    <div m-10>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />

      <v-data-table :headers="headers" :items="patients" :search="search">
        <template #item.actions="{ item }">
          <v-btn
            :text="selectedPatientId === item.raw.id ? 'selected' : 'edit'"
            :color="selectedPatientId === item.raw.id ? 'red' : 'primary'"
            @click="editPatient(item)"
          />
          <v-btn text="add" />
        </template>
      </v-data-table>
    </div>
  </client-only>
</template>
