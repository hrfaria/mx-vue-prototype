// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPage: {
            assets: [],
            previousPageURL: '',
            nextPageURL: '',
            pagenum: 0
        },
        currentAsset: {}
    },
    getters: {
        getAssets: (state) => { return state.currentPage.assets },
        getPreviousPageURL: (state) => { return state.currentPage.previousPageURL },
        getNextPageURL: (state) => { return state.currentPage.nextPageURL },
        getPagenum: (state) => { return state.currentPage.pagenum },
        getCurrentAsset: (state) => { return state.currentAsset }
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage.assets = page.member;

            var nextPage = page.responseInfo.nextPage;
            state.currentPage.nextPageURL = nextPage != null ? nextPage.href : '';

            var previousPage = page.responseInfo.previousPage;
            state.currentPage.previousPageURL = previousPage != null ? previousPage.href : '';

            state.currentPage.pagenum = page.responseInfo.pagenum;
        },
        setCurrentAsset(state, asset) {
            state.currentAsset = asset;
        }
    },
    actions: {
        queryMXAssetSet(context, url) {
            fetch(url)
                .then(response => response.json())
                .then(json => { context.commit('setCurrentPage', json) })
                .catch(error => {
                    console.log(error);
                });

        },
        queryMXAsset(context, url) {
            fetch(url)
                .then(response => response.json())
                .then(json => { context.commit('setCurrentAsset', json) })
                .catch(error => {
                    console.log(error);
                });
        }
    }
});