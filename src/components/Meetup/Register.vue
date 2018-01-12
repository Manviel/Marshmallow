<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn class="red" dark accent slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">
              Unregister from Meetup?
            </v-card-title>
            <v-card-title v-else>
              Register for Meetup?
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>Your decision</v-card-text>
          </v-flex>
        </v-layout>
         <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat
                @click="registerDialog = false">Cancel
              </v-btn>
              <v-btn flat class="blue--text"
                @click="onAgree">Confirm
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetId'],
  data () {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registerMeetups.findIndex(meetId => {
        return meetId === this.meetId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeet', this.meetId)
      } else {
        this.$store.dispatch('registerUserForMeet', this.meetId)
      }
    }
  }
}
</script>
