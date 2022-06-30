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

      <!-- <v-list v-if="leftWidget">
        <v-list-item
        v-for="(item, i) in Object.keys(leftWidget)"
        :key="i"
        >
        <v-list-item-action>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item" />
        </v-list-item-content>
        </v-list-item>
      </v-list> -->
<!-- 
    <v-card
    v-if="leftWidget"
    class="mx-auto"
    max-width="500"
    >
    <v-list shaped>
      <v-list-item-group
        multiple
      >
        <template v-for="(item, i) in Object.keys(leftWidget)">
          <v-divider
            v-if="!item"
            :key="`divider-${i}`"
          ></v-divider>

          <v-list-item
            v-else
            :key="`item-${i}`"
            :value="item"
            :to="{name: 'animals-type', params: {type: item}}"
            active-class="deep-purple--text text--accent-4"
          >
            <template>
              <v-list-item-content>
                <v-list-item-title class="animal">
                  <v-img
                  class="animal__img"
                  :src="require(`~/assets/img/${item.slice(0, -1)}_img.jpg`)"
                  height="20px"
                  width="20px"
                  max-width="20px"
                  ></v-img>
                  {{ item }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-title v-text="leftWidget[item]"></v-list-item-title>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card> -->

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
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

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
      homePage: 'getHomePage',
      aboutPage: 'getAboutPage',
      leftWidget: 'getLeftWidget',
      babies: 'getBabies',
      formData: 'getFormData'
    })
  },
  methods: {
    ...mapActions([
      'fetchHomePage',
      'fetchAboutPage',
      'fetchLeftWidget',
      'fetchBabies',
      'fetchFormData',
      'fetchPosts'
    ])
  },
  created() {
    // this.fetchHomePage && this.fetchHomePage();
    // this.fetchAboutPage && this.fetchAboutPage();
    // this.fetchLeftWidget && this.fetchLeftWidget();
    // this.fetchBabies && this.fetchBabies();
    // this.fetchFormData && this.fetchFormData();
    // this.fetchPosts && this.fetchPosts({page: 1});
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