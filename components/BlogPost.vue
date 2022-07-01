<template>
  <v-card
    class="mx-auto my-2"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="img"
    ></v-img>

    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0 mb-3"
      >
        <div class="grey--text">
          {{ author }}
        </div>
        <div class="grey--text ml-auto">
          {{ date }}
        </div>
      </v-row>

      <div>
        {{ desc }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        block
        :to="{ name: 'blog-id', params: { id } }"
      >
        Читать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ["img", "author", "date", "desc", "title", "id"],
    data: () => ({
      selection: 1,
    }),

    methods: {
    },
  }
</script>