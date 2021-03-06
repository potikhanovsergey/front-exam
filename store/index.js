// const BASE_URL = 'https://demo-api.vsdev.space';
const BASE_URL = 'https://potikhanovsergey.pythonanywhere.com/api';

import { uuid } from "vue-uuid";

export const state = () => ({
    posts: [],
    page: 1,
    userUuid: "Аноним"
})


export const mutations = {
    SET_POSTS(state, payload) {
      if (payload?.data) {
        state.posts = payload.data;
      }
    },
    SET_POSTS_PAGINATION(state, payload) {
      state.page = payload.page;
    },
    SET_UUID(state, payload) {
      state.userUuid = payload.id;
      localStorage.setItem('userUuid', payload.id);
    }
}

export const actions = {
    setPostsPagination({ commit }, data) {
      commit('SET_POSTS_PAGINATION', data);
    },
    async fetchPosts({ commit, dispatch, }, data) {
      const response = await this.$axios.get(`${BASE_URL}/posts/`);
      if (response) {
        dispatch('setPostsPagination', {page: data.page});
        commit('SET_POSTS', response);
      }
    },
    async fetchPost({ commit, dispatch, }, { id }) {
      const response = await this.$axios.get(`${BASE_URL}/posts/${id}/`,);
      return response;
    },
    async fetchPostComments({ commit, dispatch }, { id }) {
      const response = await this.$axios.get(`${BASE_URL}/posts/${id}/comments/`)
      return response;
    },
    async postComment({ commit, dispatch }, { comment, post, user }) {
      const response = await this.$axios.post(`${BASE_URL}/posts/${post}/new_comment/`, {
        message: comment,
        post: +post,
        user_id: user
      })
      return response;
    },
    async generateUuid({ commit }) {
      const id = uuid.v1();
      commit('SET_UUID', {id});
    },
    async deleteComment({ commit, dispatch }, { id }) {
      const response = await this.$axios.delete(`${BASE_URL}/comments/${id}/`);
      return response;
    },
    async editComment({ commit, dispatch }, { comment, id, post }) {
      const response = await this.$axios.put(`${BASE_URL}/comments/${id}/`, {
        message: comment,
        post
      });
      return response;
    }
  }

export const getters = {
    getPosts(state) {
      return state.posts;
    },
    getPaginationPage(state) {
      return state.page;
    },
    getUserUuid(state) {
      return state.userUuid;
    }
}