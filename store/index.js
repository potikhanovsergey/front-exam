// const BASE_URL = 'https://demo-api.vsdev.space';

export const state = () => ({
    posts: [],
    page: 1,
})


export const mutations = {
    SET_POSTS(state, payload) {
      console.log(payload);
      if (payload?.data) {
        state.posts = payload.data;
      }
    },
    SET_POSTS_PAGINATION(state, payload) {
      state.page = payload.page;
    }
}

export const actions = {
    setPostsPagination({ commit }, data) {
      commit('SET_POSTS_PAGINATION', data);
    },
    async fetchPosts({ commit, dispatch, }, data) {
      const response = await this.$axios.get(`/api/posts/`);
      if (response) {
        dispatch('setPostsPagination', {page: data.page});
        commit('SET_POSTS', response);
      }
    },
    async fetchPost({ commit, dispatch, }, { id }) {
      const response = await this.$axios.get(`/api/posts/${id}`,);
      return response;
    },
    async fetchPostComments({ commit, dispatch }, { id }) {
      const response = await this.$axios.get(`/api/posts/${id}/comments`)
      return response;
    }
  }

export const getters = {
    getPosts(state) {
      return state.posts;
    },
    getPaginationPage(state) {
      return state.page;
    }

}