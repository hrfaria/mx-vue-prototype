// store/index.js

import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPage: {
            assets: [],
            pagenum: 1
        },
        totalCount: 0,
        currentAsset: {}
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) =>
                    Cookies.set(key, value, { expires: 3, secure: false }),
                removeItem: key => Cookies.remove(key)
            }
        })
    ],
    getters: {
        getAssets: (state) => { return state.currentPage.assets },
        getPagenum: (state) => { return state.currentPage.pagenum },
        getCurrentAsset: (state) => { return state.currentAsset },
        getTotalCount: (state) => { return state.totalCount }
    },
    mutations: {
        updateCurrentPage(state, page) {
            state.currentPage.assets = page.member;
            state.currentPage.pagenum = page.responseInfo.pagenum;
            state.totalCount = page.responseInfo.totalCount;
        },
        updateCurrentAsset(state, asset) {
            state.currentAsset = asset;
        },
        updatePagenum(state, pagenum) {
            state.currentPage.pagenum = pagenum;
        }
    },
    actions: {
        updateCurrentPage(context, page) {
            context.commit('updateCurrentPage', page);
        },
        updateCurrentAsset(context, asset) {
            context.commit('updateCurrentAsset', asset);
        },
        updatePagenum(context, pagenum) {
            context.commit('updatePagenum', pagenum)
        }
    }
});