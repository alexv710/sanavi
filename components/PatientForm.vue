<script setup lang="ts">
import { reactive, ref } from 'vue';

let valid = ref(false);

const patientStore = usePatientStore();

let nameRules = [
  (v) => !!v || 'Name is required',
];

let emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

let ahvNumberRules = [
  (v) => !!v || 'AHV Number is required',
  (v) => /^756\.?\d{4}\.?\d{4}\.?\d{2}$/.test(v) || 'AHV Number must be valid (756.1234.1234.12)',
];
</script>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <!-- Existing Fields -->
        <v-col cols="12" md="4">
          <v-text-field v-model="patientStore.patient.firstname" :rules="nameRules" :counter="10" label="First name"
            required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="patientStore.patient.lastname" :rules="nameRules" :counter="10" label="Last name"
            required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="patientStore.patient.email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-col>

        <!-- New Fields -->
        <v-col cols="12" md="4">
          <v-text-field v-model="patientStore.patient.ahvNumber" :rules="ahvNumberRules" label="AHV Number"
            required></v-text-field>
        </v-col>

        <!-- Address -->
        <v-col cols="12" md="4">
          <v-text-field v-model="patientStore.patient.address.streetName" label="Street" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="patientStore.patient.address.streetNumber" label="Street Number" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="patientStore.patient.address.postalCode" label="Postal Code" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="patientStore.patient.address.city" label="City" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="patientStore.patient.address.canton" label="Canton" required></v-text-field>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>