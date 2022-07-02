<template>
  <div class="mt-8">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Оставить комментариий
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Ваш комментарий</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-textarea
                  filled
                  v-model="comment"
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
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="sendComment"
          >
            Отправить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            comment: '',
            dialog: false,
        }
    },
    methods: {
      sendComment() {
        this.$emit('new-comment', {
          comment: this.comment
        });
        this.comment = '';
        this.dialog = false;
      }
    },
}
</script>

<style scoped>
    .commentForm {
        max-width: 720px;
    }
</style>