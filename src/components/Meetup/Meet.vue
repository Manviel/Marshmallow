<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2>{{ meet.title }}</h2>
          </v-card-title>
          <v-card-media
            :src="meet.src"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div>{{ meet.date }}</div>
            <div>A full-day, two-track conference on all things React, gathering Front-end and Full-stack developers across the globe in the tech heart of Europe. Mark your calendars for the biggest React community event.</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red" dark>Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meet () {
      return this.$store.getters.loadedMeet(this.id)
    }
  }
}
</script>

