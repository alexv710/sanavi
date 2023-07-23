<script setup lang="ts">
import { ref } from 'vue'

const user = useUserStore()
const patientStore = usePatientStore()
const dialog = ref(false)

function newPatient() {
  patientStore.clearPatientData()
  dialog.value = true
}
</script>

<template>
  <div>
    <div i-twemoji:waving-hand inline-block animate-shake-x animate-duration-5000 text-4xl />
    <h3 text-2xl font-500>
      Hi, {{ user.savedName }}
    </h3>
    <div m-4 text-xl>
      Please add a new Patient
    </div>

    <v-btn color="primary" @click="newPatient">
      New Patient
    </v-btn>

    <div m-4 text-xl>
      Or search and edit an existing one
    </div>

    <v-dialog v-model="dialog" max-width="600px">
      <PatientForm v-if="patientStore.patient.id || dialog" />
    </v-dialog>

    <PatientList />
    <PatientForm v-if="patientStore.patient.id" />
    <div>
      <NuxtLink
        class="m-3 text-sm btn"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
