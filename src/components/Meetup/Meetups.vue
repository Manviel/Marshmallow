<template>
  <v-container>
    <v-layout row wrap v-for="meet in meetups" :key="meet.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="light-blue">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="meet.src"
                  height="125px">
                </v-card-media>
              </v-flex>
              <v-flex xs7>
                <v-card-title>
                  <div>
                    <h2 class="white--text">{{ meet.title }}</h2>
                    <p class="mb-0">{{ meet.date }}</p>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/meetups/' + meet.id">View Meetup</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
