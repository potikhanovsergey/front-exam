<template>
  <v-container>
    <v-row v-if="post">
      <v-col>
        <h1>{{ post.title }}</h1>
        <div class="post__author-date">
          <p class="post__author">{{ post.author }}</p>
          <p class="post__date">{{ post.date }}</p>
        </div>
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="250"
          max-width="360"
          :src="post.img"
      ></v-img>
      <p class="post__text">
        {{ post.message }}
      </p>
      <div class="post__comments">
        <h2>Комментарии ({{ comments.length }})</h2>
        <v-list three-line class="pl-3">
            <template v-for="(comment) in comments">
              <v-list-item
              :key="comment.id"
              >
              <v-list-item-avatar>
                  <v-img :src="`https://eu.ui-avatars.com/api/?name=${comment.user}`"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                  <v-list-item-title v-html="comment.user"></v-list-item-title>
                  <p>{{ comment.message }}</p>
              </v-list-item-content>
              </v-list-item>
          </template>
          <comment-form @new-comment="handleNewComment" />
        </v-list>
      </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'IndexPage',
  data() {
    return {
      post: null,
      errorOnFetch: null,
      comments: []
    }
  },
  computed: {
    ...mapGetters({
      page: 'getHomePage',
    })
  },
  methods: {
    ...mapActions({
      fetchPost: 'fetchPost',
      fetchPostComments: 'fetchPostComments'
    }),
    handleNewComment(comment) {

    }
  },
  async created() {
    const response = await this.fetchPost({ id: this.$route.params.id });
    if (response.status === 200) {
      this.post = response.data;
      const commentsResponse = await this.fetchPostComments({ id: this.$route.params.id })
      if (commentsResponse.status === 200) {
        this.comments = commentsResponse.data;
      }
    } else {
      this.errorOnFetch = "Не получилось найти пост с таким id. Перезагрузите страницу, или попробуйте найти другой пост."
    }
  }
}
</script>

<style scoped>
  .post__text {
    white-space: pre-line;
    max-width: 75%;
  }

  .post__author-date {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .post__author-date p {
    margin: 0;
  }

  .post__author {
    font-weight: 700;
  }

  .post__date {
    opacity: 0.5;
  }
</style>