<template>
  <v-container>
    <v-layout row-wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate color="red"
          :width="6" :size="70"
          v-if="loading">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2>{{ meet.title }}</h2>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-dialog :meet="meet"></app-edit-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meet.src"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div>{{ meet.date | date }} - {{ meet.location }}</div>
            <div>
              <app-edit-date :meet="meet" v-if="userIsCreator"></app-edit-date>
            </div>
            <div>{{ meet.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register :meetId="meet.id"></app-register>
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
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meet.creatorId
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

