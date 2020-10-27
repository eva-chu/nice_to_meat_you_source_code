<template>
    <div>
        <div class="cart-backdrop" @click="closeCartPanel" v-if="isCartOpen"></div>   
        <transition name="slideRight">
            <div v-if="isCartOpen" class="cart-panel" @click="closeCartPanel">                
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
import { store, mutations } from '@/store.js'

export default {
    methods: {
        closeCartPanel: mutations.toggleCart
    },
    computed: {
        isCartOpen() {
            return store.isCartOpen
        }
    }
}
</script>

<style scope>
    .cart {
        color: rgb(83, 71, 65); 
    }

    .slideRight-enter-active,
    .slideRight-leave-active
    {
        transition: transform 0.2s ease;
    }

    .slideRight-enter,
    .slideRight-leave-to {
        transform: translateX(100%);
        transition: all 150ms ease-in 0s
    }

    .cart-backdrop {
        background-color: rgba(0,0,0,.7);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 200;
    }

    .cart-panel {
        overflow-y: auto;
        background-image: url("https://i.imgur.com/Aqu8yBd.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: fixed;
        right: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        padding: 3rem 20px 2rem 20px;
        cursor: pointer;
    }

    @media screen and (min-width: 500px) {
        .cart-panel {
            width: 500px;
        }
    }

    @media screen and (max-width: 500px) {
        .cart-panel {
            width: 100vw;
        }
    }
</style>