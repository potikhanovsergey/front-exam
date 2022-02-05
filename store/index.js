const BASE_URL = 'https://demo-api.vsdev.space';

export const state = () => ({
    homePage: null,
    aboutPage: null,
    leftWidget: null,
    babies: null,
    formData: null
})


export const mutations = {
    SET_HOME_PAGE(state, payload) {
        state.homePage = payload;
    },
    SET_ABOUT_PAGE(state, payload) {
        state.aboutPage = payload;
    },
    SET_LEFT_WIDGET(state, payload) {
        state.leftWidget = payload;
    },
    SET_BABIES(state, payload) {
        state.babies = payload;
    },
    SET_FORM_DATA(state, payload) {
        state.formData = payload;
    },
}

export const actions = {
    async fetchHomePage({ commit }) {
        const response = await this.$axios.$get(`${BASE_URL}/api/farm/home_page`);
        commit('SET_HOME_PAGE', response);
    },
    async fetchAboutPage({ commit }) {
        const response = await this.$axios.$get(`${BASE_URL}/api/farm/about_page`);
        commit('SET_ABOUT_PAGE', response);
    },
    async fetchLeftWidget({ commit }) {
        const response = await this.$axios.$get(`${BASE_URL}/api/farm/left_widget`);
        console.log(response);
        commit('SET_LEFT_WIDGET', response);
    },
    async fetchBabies({ commit, state }) {
        const response = await this.$axios.$get(`${BASE_URL}/api/farm/baby`);
        commit('SET_BABIES', response);
    },
    async fetchFormData({ commit }) {
        const response = await this.$axios.$get(`${BASE_URL}/api/farm/baby/form`);
        commit('SET_FORM_DATA', response); 
    },
    async addAnimal({ commit, dispatch }, data) {
        console.log(data);
        const response = await this.$axios.$post(`${BASE_URL}/api/farm/baby`, data);
        if (response === 1) {
            dispatch('fetchBabies');
            dispatch('fetchLeftWidget');
        }
    }
}

export const getters = {
    getHomePage(state) {
        return state.homePage;
    },
    getAboutPage(state) {
        return state.aboutPage;
    },
    getLeftWidget(state) {
        return state.leftWidget;
    },
    getBabies(state) {
        return state.babies;
    },
    getFormData(state) {
        return state.formData;
    },
    getCertainAnimalsByType: (state) => (type) => {
        const filtered = state.babies?.filter(baby => baby.type === type);
        return filtered;
    },

}