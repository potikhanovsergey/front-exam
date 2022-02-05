<template>
  <div>
    <h1>Главная</h1>
    <v-row justify="center" v-if="page">
      <v-col>
        <p v-html="page.text" />
      </v-col>
      <v-col>
        <v-img
          :src="page.image"
          lazy-src="https://picsum.photos/id/11/100/60"
          max-width="760"
          max-height="400"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>

  </template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters({
      page: 'getHomePage',
    })
  }
}
</script>
