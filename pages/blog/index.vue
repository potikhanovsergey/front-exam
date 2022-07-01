<template>
  <div>
    <h1>Блог</h1>
    <v-container v-if="posts && posts.length">
      <v-row>
        <v-col>
          <filter-form 
            :handleTitleChange="handleTitleChange"
            :filterTitle="filterTitle"
           />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="filteredPosts && filteredPosts.length > 0">
      <v-row justify="space-between" align="center">
        <div class="sort">
          <blog-sort :sortByItem="handleSortByItem" :sortType="sortType" />
          <span>{{ sortType.label }}</span>
        </div>
        <v-pagination
          :value="page"
          @input="handlePaginationInput"
          :length="paginationLength"
        ></v-pagination>
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
            :id="post.id"
          />
        </v-col>
      </v-row>
      <v-row justify="space-between" align="center">
          <div class="sort">
            <blog-sort :sortByItem="handleSortByItem" :sortType="sortType" />
            <span>{{ sortType.label }}</span>
          </div>
          <v-pagination
            :value="page"
            @input="handlePaginationInput"
            :length="paginationLength"
          ></v-pagination>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col>
          <div class="text-center">
            Посты не найдены, попробуйте перезагрузить страницу или изменить фильтр
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>

  </template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BlogPost from '@/components/BlogPost.vue';
import FilterForm from '@/components/FilterForm.vue';
export default {
  components: { BlogPost, FilterForm },
  name: 'IndexPage',
  data() {
    return {
      postsPerPage: 6,
      filterTitle: '',
      sortType: {
        label: "умолчанию",
        value: "default"
      },
    }
  },
  computed: {
    ...mapGetters({
      posts: 'getPosts',
      page: 'getPaginationPage',
    }),
    paginationLength() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage)
    },
    filteredPosts() {
      if (this.posts) {
        return this.posts.filter(post => post.title.toLowerCase().includes(this.filterTitle.toLowerCase()));
      }
      return [];
    },
    sortedPosts() {
      if (this.sortType.value === 'dateIncrease') {
        return [...this.filteredPosts].sort((a, b) => a.date.localeCompare(b.date));
      }
      if (this.sortType.value === 'dateDecrease') {
        return [...this.filteredPosts].sort((a, b) => b.date.localeCompare(a.date));
      }
      return this.filteredPosts;
    },
    currPosts() {
      return this.sortedPosts.slice((this.page - 1) * 6, (this.page) * this.postsPerPage);
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
    },
    handleTitleChange(title) {
      this.filterTitle = title;
    },
    handleSortByItem(item) {
      this.sortType = item;
    }
  },
}
</script>

<style scoped>
  .sort {
    display: flex;
    align-items: center;
  }
</style>
