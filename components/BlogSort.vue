<template>
  <v-menu
    :rounded="true"
    offset-y
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        color="deep-purple accent-4'"
        class="white--text my-5 mr-5"
        v-bind="attrs"
        v-on="on"
      >
        Сортировать по
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="sortByItem(item)"
        :disabled="sortType.value === item.value"
      >
        <v-list-item-title v-text="item.label"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    props: ['sortByItem', 'sortType'],
    data: () => ({
      items: [
        {
          label: "умолчанию",
          value: "default",
        },
        {
          label: "возрастанию даты",
          value: "dateIncrease",
        },
        {
          label: "убыванию даты",
          value: "dateDecrease",
        },
      ],
    }),
  }
</script>