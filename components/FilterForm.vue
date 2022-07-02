<template>
  <div>
    <p>Фильтровать по:</p>
    <v-form
      ref="form"
      @submit.prevent
    >
      <v-text-field
        v-for="item in filter"
        :key="item.label"
        :value="filter.title"
        @input="handleInput($event, item)"
        :label="item.label"
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
  export default {
    props: ['filter'],
    data: () => ({

    }),

    methods: {
      handleInput(value, item) {
        console.log(value, item)
        this.$emit('change', {
          property: item.property,
          value,
        })
      }
    },
  }
</script>