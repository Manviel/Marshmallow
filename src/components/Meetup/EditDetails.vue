<template>
  <v-dialog persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title" label="Title"
                v-model="editedTitle"
                id="title" required>
              </v-text-field>
              <v-text-field
                name="description" label="Description"
                v-model="editedDescription"
                id="description" multi-line required>
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat
                @click="editDialog = false">Close
              </v-btn>
              <v-btn flat class="blue--text"
                @click="onSaveChanges">Save
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
  props: ['meet'],
  data () {
    return {
      editDialog: false,
      editedTitle: this.meet.title,
      editedDescription: this.meet.description
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meet.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
}
</script>

