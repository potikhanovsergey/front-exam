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
        <p :style="{ maxWidth: '666px' }">Комментарии анонимны для других пользователей, однакого для Вас Вы выделены цветом и жирным шрифтом за счет уникального айди. <br />
        Вы можете редактировать и удалять свои комментарии.</p>
        <div>
            <template v-for="(comment) in comments">
              <v-sheet 
              class="grey darken-3 mt-9"
              :key="comment.id">
                <v-row>
                  <v-col cols="11">
                    <v-list-item class="align-start"
                    >
                      <v-list-item-avatar class="align-self-start mt-3">
                          <v-img :src="`https://eu.ui-avatars.com/api/?name=${comment.user}`"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                          <v-list-item-title v-html="comment.user" 
                          :style="{ 
                            fontWeight: uuid === comment.user_id ? 'bold' : 'regular',
                            color: uuid === comment.user_id ? '#facafa' : '#fff'
                          }"></v-list-item-title>
                          <p>{{ comment.message }}</p>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="1" v-if="uuid === comment.user_id">
                    <v-btn
                      class="mx-2 mb-4"
                      fab
                      dark
                      x-small
                      color="orange"
                      @click="openEditCommentModal(comment)"
                    >
                      <v-icon dark>
                        mdi-pen
                      </v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      x-small
                      color="error"
                      @click="handleDeleteComment(comment.id)"
                    >
                      <v-icon dark>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-sheet>  
            </template>
            <v-btn
              color="primary"
              class="mt-9"
              dark
              @click="openNewCommentModal"
            >
              Оставить комментариий
            </v-btn>
            <comment-modal
              :dialog="commentModal.visible" 
              :type="commentModal.type" 
              @new-comment="handleNewComment"
              @edit-comment="handleEditComment"
              @close="commentModal.visible = false"
              :propComment="commentModal.comment"
            />
        </div>
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
      errorOnAddComment: null,
      comments: [],
      commentModal: {
        type: 'create',
        visible: false,
        comment: null
      },
    }
  },
  computed: {
    ...mapGetters({
      uuid: 'getUserUuid',
    })
  },
  methods: {
    ...mapActions({
      fetchPost: 'fetchPost',
      fetchPostComments: 'fetchPostComments',
      postComment: 'postComment',
      deleteComment: 'deleteComment',
      editComment: 'editComment',
    }),
    async handleNewComment({comment}) {
      const response = await this.postComment({
        comment,
        post: this.$route.params.id,
        user: this.uuid || "Аноним"
      });
      if (response.status === 200) {
        this.comments.push({
          message: comment,
          post: this.$route.params.id,
          user: "Аноним",
          user_id: this.uuid,
          id: response.data,
        });
        this.errorOnAddComment = null;
        this.commentModal.visible = false;
      } else {
        this.errorOnAddComment = "Что то пошло не так, попробуйте добавить комментарий снова"
      }
    },
    async handleEditComment({ comment, id }) {
      const response = await this.editComment({ comment, id, post: this.$route.params.id });
      if (response.status === 200) {
        this.comments.find(c => c.id === id).message = comment;
      }
      this.commentModal.visible = false;
    },
    async handleDeleteComment(id) {
      await this.deleteComment({id});
      this.comments = this.comments.filter(comment => comment.id !== id);
    },
    openNewCommentModal() {
      this.commentModal.type = 'create';
      this.commentModal.visible = true;
    },
    openEditCommentModal(comment) {
      this.commentModal.type = 'edit';
      this.commentModal.visible = true;
      this.commentModal.comment = comment;
    }
  },
  async created() {
    const response = await this.fetchPost({ id: this.$route.params.id });
    if (response.status === 200) {
      this.post = response.data;
      const commentsResponse = await this.fetchPostComments({ id: this.$route.params.id })
      if (commentsResponse.status === 200) {
        this.comments = commentsResponse.data;
        this.errorOnFetch = null;
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