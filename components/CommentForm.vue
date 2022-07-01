<template>
    <v-list class="commentForm">
        <v-list-item>
            <v-textarea
                v-model="comment"
                label="Комментарий"
                no-resize
                rows="1"
            ></v-textarea>
            <v-spacer/>
            <v-btn 
            @click="sendComment">
            Отправить</v-btn>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    data() {
        return {
            comment: '',
            user_name: ''
        }
    },
    methods: {
        // async sendComment() {
        //     let url = `https://demo-api.vsdev.space/api/articles/${this.$route.params.id}/comments`;
        //     let obj = {
        //         user_name: this.user_name,
        //         comment: this.comment
        //     }
        //     this.$axios.post(url, obj);
        //     this.comment = '';
        //     this.$emit('new-comment', {...obj, id: (new Date()).getTime(), article_id: this.$route.params.id})
        // }
    }
}
</script>

<style scoped>
    .commentForm {
        max-width: 720px;
    }
</style>