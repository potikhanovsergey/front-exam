<template>
  <v-form class="mt-8" @submit.prevent v-model="isFormValid" v-if="dialog">
    <v-dialog
      @click:outside="$emit('close')"
      @keydown.esc="$emit('close')"
      :value="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="commentModal.type === 'create'">Новый комментарий</span>
          <span class="text-h5" v-if="commentModal.type === 'edit'">Редактировать комментарий</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-textarea
                  filled
                  required
                  v-model="comment"
                  :rules="rules"
                  label="Комментарий"
                  no-resize
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('close')"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!isFormValid"
            @click="sendComment"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
export default {
  props: ['commentModal', 'dialog'],
  data() {
      return {
        isFormValid: true,
        comment: '',
        createRules: [
          v => !!v || 'Это поле обязательно',
        ],
        editRules: [
          v => !!v || 'Это поле обязательно',
          v => (v && v !== this.commentModal?.comment?.message) || 'Новый комментарий не должен совпадать с редактируемым',
        ]
      }
  },
  computed: {
    rules() {
      return this.commentModal.type === 'create' ? this.createRules : this.editRules;
    }
  },
  methods: {
    sendComment() {
      if (this.commentModal.type === 'create') {
        this.$emit('new-comment', {
          comment: this.comment
        });
      } else if (this.commentModal.type === 'edit') {
        this.$emit('edit-comment', {
          comment: this.comment,
          id: this.commentModal.comment.id
        })
      }
    }
  },
  mounted() {
    if (this.commentModal.type === 'edit') {
      console.log(this.commentModal);
      this.comment = this.commentModal?.comment?.message;
    }
  },
}
</script>

<style scoped>
    .commentForm {
        max-width: 720px;
    }
</style>