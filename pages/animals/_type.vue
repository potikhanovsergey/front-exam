<template>
  <div>
    <h1>{{$route.params.type}}</h1>
    <v-row justify="center">
        <v-col cols="12">
            <h2 v-html="'Список животных'" />
        </v-col>
        <v-col cols="4" v-for="(baby, i) in babies($route.params.type.slice(0, -1))" :key="i">
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
import { mapGetters } from 'vuex';
export default {
    name: 'AnimalsPage',
    computed: {
        ...mapGetters({babies: 'getCertainAnimalsByType'})
    },
    data() {
        return {
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
    created() {
        if (!['cow', 'rabbit', 'sheep'].includes(this.$route.params.type.slice(0, -1))) this.$router.push('/');
    }
}
</script>
