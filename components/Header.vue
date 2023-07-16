<script setup lang="ts">
const user = useUserStore()
</script>

<template>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"
              :title=user.savedName
              :subtitle="user.savedName+'@iLikeBricks'"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item to="/patients" nuxt prepend-icon="mdi-folder" title="Patients" value="patients"></v-list-item>
            <v-list-item to="/appointments" nuxt prepend-icon="mdi-calendar-check" title="Appointments" value="appointments"></v-list-item>
            <v-list-item to="/history" nuxt prepend-icon="mdi-history" title="Patient History" value="history"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        </v-layout>
  </template>