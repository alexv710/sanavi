<script setup lang="ts">
import { onMounted, ref } from 'vue'

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
    patientStore.setPatientData(patient.raw)
    selectedPatientId.value = patient.raw.id
  }
}

onMounted(async () => {
  try {
    const response = await fetch('/api/patients')

    if (!response.ok)
      throw new Error('Network response was not ok')

    const data = await response.json()
    console.log(data)
    patients.value = data.body.patients.map(patient => ({
      ...patient,
      address1: `${patient.streetName} ${patient.streetNumber}, ${patient.postalCode} ${patient.city} (${patient.canton})`,
    }))
  }

  catch (err) {
    console.error(err)
  }
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
  <div m-10>
    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />

    <v-data-table :headers="headers" :items="patients" :search="search">
      <template #item.actions="{ item }">
        <v-btn
          :text="selectedPatientId === item.raw.id ? 'selected' : 'edit'"
          :color="selectedPatientId === item.raw.id ? 'red' : 'primary'"
          @click="editPatient(item)"
        />
      </template>
    </v-data-table>
  </div>
</template>
