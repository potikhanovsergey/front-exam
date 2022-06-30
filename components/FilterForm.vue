<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="title"
      label="Заголовок"
      required
    ></v-text-field>

    <!-- <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select> -->

    <!-- <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox> -->

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Filter
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      title: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate();
      },
      reset () {
        this.$refs.form.reset();
      },
      resetValidation () {
        this.$refs.form.resetValidation();
      },
    },
  }
</script>