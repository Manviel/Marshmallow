<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="light-blue">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  src="https://cdn-images-1.medium.com/max/1600/1*rZlNowT1EIcDay1uV8nzQw.jpeg"
                  height="125px">
                </v-card-media>
              </v-flex>
              <v-flex xs7>
                <v-card-title>
                  <div>
                    <h2 class="white--text">React Amsterdam</h2>
                    <p class="mb-0">13 April 2018</p>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat to="/meetups/1">View Meetup</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>