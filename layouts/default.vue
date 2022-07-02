<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >

      <v-list> 
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-row justify="space-between" align="center" class="px-5">
        <v-toolbar-title v-text="title" />
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      fixed
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { uuid } from 'vue-uuid';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Главная',
          to: '/'
        },
        {
          icon: 'mdi-account-group',
          title: 'О нас',
          to: '/about'
        },
        {
          icon: 'mdi-hand-heart',
          title: 'Услуги',
          to: '/services'
        },
        {
          icon: 'mdi-post',
          title: 'Блог',
          to: '/blog'
        },
        {
          icon: 'mdi-cellphone',
          title: 'Контакты',
          to: '/contacts'
        },      ],
      miniVariant: false,
      title: 'Салон красоты Beauty. Потиханов 201-327 Экзамен'
    }
  },
  computed: {
    ...mapGetters({ // todo убрать лишние геттеры 
      userUuid: 'getUserUuid',
    })
  },
  methods: {
    ...mapActions({
      generateUuid: 'generateUuid',
    })
  },
  mounted() {
    if (!localStorage.userUuid) {
      this.generateUuid();
    } else {
      this.$store.commit('SET_UUID', {id: localStorage.userUuid})
    }
  }
}
</script>

<style scoped>
  .animal {
    display: flex;
    gap: 10px;
    align-items: center;
  }

</style>