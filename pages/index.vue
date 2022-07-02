<template>
  <v-container>
    <h1>Блог</h1>
      <v-row v-if="posts && posts.length">
        <v-col>
          <filter-form 
            :filter="filter"
            @change="handleFilterChange"
           />
        </v-col>
      </v-row>
      <v-row justify="space-between" align="center" v-if="filteredPosts && filteredPosts.length > 0">
        <v-col>
          <div class="sort">
            <blog-sort :sortByItem="handleSortByItem" :sortType="sortType" />
            <span>{{ sortType.label }}</span>
          </div>
          <v-pagination
            :value="page"
            @input="handlePaginationInput"
            :length="paginationLength"
          ></v-pagination>
        </v-col>
      </v-row>
      <v-row v-if="filteredPosts && filteredPosts.length > 0">
        <v-col 
          cols="12"
          md="6"
          lg="4"
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
      <v-row justify="space-between" align="center" v-if="filteredPosts && filteredPosts.length > 0">
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
      <v-row v-else>
        <v-col>
          <div class="text-center">
            Посты не найдены, попробуйте перезагрузить страницу или изменить фильтр
          </div>
        </v-col>
      </v-row>
  </v-container>

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
      sortType: {
        label: "умолчанию",
        value: "default"
      },
      filter: [
        {
          label: 'Заголовок',
          property: 'title',
          value: ''
        },
        {
          label: 'Автор',
          property: 'author',
          value: ''
        }
      ],
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
        return this.posts.filter(post => {
          let shouldStay = true;
          for (let i = 0; i < this.filter.length; i++) {
            let postValue = post[this.filter[i].property].toLowerCase(); // Что-то с поста
            let filterValue = this.filter[i].value.toLowerCase(); // Строка в фильтре
            if (!postValue.includes(filterValue)) {
              shouldStay = false;
              break;
            }
          }
          return shouldStay;
        });
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
      this.setPostsPagination({page});
    },
    handleFilterChange({property, value}) {
      this.filter.find(item => item.property === property).value = value;
    },
    handleSortByItem(item) {
      this.sortType = item;
    },
  },
}
</script>

<style scoped>
  .sort {
    display: flex;
    align-items: center;
  }
</style>
