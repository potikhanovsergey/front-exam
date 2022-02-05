<template>
  <div>
    <h1>О нас</h1>
    <v-row justify="center" v-if="page">
      <v-col>
        <p v-html="page.text" />
      </v-col>
    </v-row>
    <v-row>
        <div class="text-center">
            <v-dialog
            v-model="dialog"
            max-width="900"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="red lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
                >
                Добавить животное
                </v-btn>
            </template>
            <v-stepper v-model="step">
                <v-stepper-header>
                <v-stepper-step
                    :complete="step > 1"
                    step="1"
                >
                    1
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                    :complete="step > 2"
                    step="2"
                >
                    2
                </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card class="card" v-if="formData">
                        <animals-form :fields="formData.fields" @form-submit="handleFormSubmit" />
                    </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card class="card text-center">
                        <v-list-item
                        >
                            <v-list-item-content>
                                <v-list-item-title>Животное успешно добавлено!</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-btn
                            color="primary"
                            text
                            @click="closeDialog"
                        >
                            Отлично
                        </v-btn>
                    </v-card>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
            </v-dialog>
        </div>
    </v-row>
    <v-row justify="center" v-if="babies">
        <v-col cols="12">
            <h2 v-html="'Список животных'" />
        </v-col>
        <v-col cols="4" v-for="(baby, i) in babies" :key="i">
            <v-card
                class="mx-auto"
                max-width="344"
            >
                <v-img
                :src="require(`~/assets/img/${baby.type}_img.jpg`)"
                height="200px"
                ></v-img>

                <v-card-title>
                    {{ ANIMAL_TYPE_MAPPER[baby.type][ANIMAL_SEX_MAPPER[baby.sex]]}} - {{ baby.name }}
                </v-card-title>

                <v-card-text>
                    Цвет - {{ baby.color }}
                </v-card-text>
                <v-card-text>
                    Пол - {{ baby.sex }}
                </v-card-text>
                <v-card-text>
                    Вес - {{ baby.weight }} кг.
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                        color="orange lighten-2"
                        text
                        :to="{name: 'animal-id', params: {id: baby.id}}">
                        Перейти к животному
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>

                </v-card>
        </v-col>
    </v-row>
  </div>

  </template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'IndexPage',
  data() {
    return {
        dialog: false,
        step: 1,
        ANIMAL_SEX_MAPPER: {
                "Мальчик": "male",
                "Девочка": "female"
        },
        ANIMAL_TYPE_MAPPER: {
            cow: {
                male: "Бык",
                female: "Корова"
            },
            rabbit: {
                male: "Кролик",
                female: "Крольчиха"
            },
            sheep: {
                male: "Баран",
                female: "Овца"
            },
        }
      }
  },
  computed: {
    ...mapGetters({
      page: 'getAboutPage',
      babies: 'getBabies',
      formData: 'getFormData'
    }),
  },
  methods: {
      ...mapActions(['addAnimal']),
      handleFormSubmit(data) {
          this.addAnimal(data);
          this.step = 2;
      },
      closeDialog() {
          this.dialog = false;
          this.step = 1;
      }
  },
}
</script>


<style scoped>
    .card {
        padding: 30px;
    }
</style>