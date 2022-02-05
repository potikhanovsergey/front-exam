<template>
  <v-form
    class="form"
    v-if="fields"
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <div class="form__fields">
        <div v-for="(field, i) in Object.keys(fields)" :key="i">
            <v-text-field
                v-if="fields[field].type === 'string'"
                v-model="formData[field]"
                :rules="[v => !!v || 'Поле обязательно для заполнения']"
                :label="fields[field].title"
                :placeholder="fields[field].title"
                required
            ></v-text-field>
            <v-select
            v-else-if="fields[field].type === 'select'"
            v-model="formData[field]"
            :rules="[v => !!v || 'Поле обязательно для заполнения']"
            :items="fields[field].values"
            :label="fields[field].title"
            :placeholder="fields[field].title"
            required
            ></v-select>
        </div>
    </div>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
     Очистить форму
    </v-btn>
    <v-btn
      color="success"
      class="mr-4"
      @click="add"
    >
        Добавить животное
    </v-btn>

  </v-form>
</template>

<script>
  export default {
    props: ['fields'],
    data: () => ({
      valid: true,
      form: {},
      formData: {},
    }),

    methods: {
      reset () {
        this.$refs.form.reset()
      },
      add() {
          this.valid = this.$refs.form.validate();
          if (this.valid) {
              this.$emit('form-submit', this.formData);
                this.reset();
          }
      }
    },
  }
</script>

<style scoped>
    .form__fields {
        margin-bottom: 30px;
    }
</style>