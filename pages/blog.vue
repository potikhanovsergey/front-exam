<template>
  <div>
    <h1>Блог</h1>
    <v-container v-if="posts && posts.length > 0">
      <v-row>
        <v-col>
          <filter-form title />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-pagination
              :value="page"
              @input="handlePaginationInput"
              :length="paginationLength"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col 
          cols="4"
          v-for="post in currPosts" :key="post.id">
          <blog-post 
            :img="post.img"
            :date="post.date"
            :author="post.author"
            :desc="post.description"
            :title="post.title"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-pagination
              :value="page"
              @input="handlePaginationInput"
              :length="paginationLength"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col>
          Ошибка получения постов, попробуйте перезагрузить страницу
        </v-col>
      </v-row>
    </v-container>
  </div>

  </template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BlogPost from '../components/BlogPost.vue';
import FilterForm from '../components/FilterForm.vue';
export default {
  components: { BlogPost, FilterForm },
  name: 'IndexPage',
  data() {
    return {
      postsPerPage: 6,
    }
  },
  computed: {
    ...mapGetters({
      posts: 'getPosts',
      page: 'getPaginationPage',
      title: '',
    }),
    paginationLength() {
      return Math.ceil(this.posts.length / this.postsPerPage)
    },
    currPosts() {
      return this.posts.slice((this.page - 1) * 6, (this.page) * this.postsPerPage);
    }
  },
  created() {
    this.fetchPosts && this.fetchPosts({ page: 1 });
  },
  methods: {
    ...mapActions([
      'fetchPosts',
      'setPostsPagination'
    ]),
    handlePaginationInput(page) {
      console.log('Page>', page);
      this.setPostsPagination({page});
    }
  },
}
</script>
