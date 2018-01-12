<template>
  <v-dialog persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate"
              style="width: 100%" actions>
              <template slot-scope="{save, cancel}">
                <v-btn flat
                  @click.native="editDialog = false">Close
                </v-btn>
                <v-btn flat class="blue--text"
                  @click.native="onSaveChanges">Save
                </v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meet'],
  data () {
    return {
      editDialog: false,
      editableDate: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.meet.date)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.$store.dispatch('updateMeetupData', {
        id: this.meet.id,
        date: newDate
      })
    },
    created () {
      this.editableDate = new Date(this.meet.date)
    }
  }
}
</script>
