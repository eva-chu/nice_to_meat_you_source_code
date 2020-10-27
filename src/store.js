import Vue from "vue";

export const store = Vue.observable({
    isNavOpen: false,
    isCartOpen: false
});

// We call toggleNav anywhere we need it in our app
export const mutations = {
    toggleNav() {
        store.isNavOpen = !store.isNavOpen;
    },
    toggleCart() {
        store.isCartOpen = !store.isCartOpen;
    }
};