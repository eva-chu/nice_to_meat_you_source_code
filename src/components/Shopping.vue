<template>
<div>
    <nav class="main-nav">
        <Burger/>
        <router-link :class="{'text-secondary': activity === 'home'}" 
        to="/">
            <div class="logo" @click="activity = 'home'">
                <img src="https://i.imgur.com/kTzDx8b.png" alt="logo">
            </div>
        </router-link>
        <div class="icon">
            <i class="fas fa-clipboard-list" id="dropdownMenuButton" 
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
            <div class="dropdown-menu">
                <form class="px-2">
                    <div class="input-group input-group-sm" style="width: 200px">
                        <input type="text" class="form-control" placeholder="請輸入訂單編號"
                        v-model="orderId" style="background: none; border: 2.5px solid rgba(0, 0, 0, .5)">
                        <div class="input-group-append">
                            <button class="btn order-input-button" type="button" 
                            @click="getOrder(orderId)">查詢訂單</button>
                        </div>
                    </div> 
                </form>
            </div>
            <i class="fas fa-shopping-cart" @click.prevent="cartToggle"></i>
        </div>
    </nav>
        <Sidebar>        
            <ul class="sidebar-panel-nav text-center">
                <li @click="activity = 'beef'">
                    <router-link :class="{'text-secondary': activity === 'beef'}" 
                    to="/beef">
                    牛肉
                    </router-link>
                </li>
                <li @click="activity = 'chicken'">
                    <router-link :class="{'text-secondary': activity === 'chicken'}" 
                    to="/chicken">
                    雞肉
                    </router-link>
                </li>
                <li @click="activity = 'pork'">
                    <router-link :class="{'text-secondary': activity === 'pork'}" 
                    to="/pork">
                    豬肉
                    </router-link>
                </li>
                <li @click="activity = 'seafood'">
                    <router-link :class="{'text-secondary': activity === 'seafood'}" 
                    to="/seafood">
                    海鮮
                    </router-link>
                </li>
                <hr id="sidebarHr">
                <li @click="activity = 'home'">
                    <router-link :class="{'text-secondary': activity === 'home'}" 
                    to="/">
                    首頁
                    </router-link>
                </li>
                <li @click="activity = 'location'">
                    <router-link :class="{'text-secondary': activity === 'location'}" 
                    to="/location">
                    店鋪一覽
                    </router-link>
                </li>
            </ul>
        </Sidebar>
        <main role="main">
            <router-view></router-view>
        </main>
        <Footer/>
<button type="button" id="goTop" class="goTop">
    <img src="https://i.imgur.com/4gPJVel.png" alt="go-top" class="d-block ml-3 my-1">
    <h6 class="mx-1 text-white">go top</h6>
</button>
</div>
</template>

<script>
import $ from 'jquery';
import { store, mutations } from '@/store.js';
import Burger from './ShoppingBurger';
import Sidebar from './ShoppingSidebar';
import Footer from './ShoppingFooter';

export default {
    name: 'Shopping',
    data() {
        return {
            activity: 'home',
            orderId: '' 
        }              
    },
    components: {
        Burger,
        Sidebar,
        Footer
    },
    methods: {
        cartToggle() {
            mutations.toggleCart()
        },
        getOrder(id) {
            this.$router.push(`customer_checkout/${id}`);
            this.orderId = '';
        }
    }
}

$(function(){
	$('#goTop').click(function(){ 
		$('html,body').animate({scrollTop:0}, 333);
    });
    
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 300 ){
            $('#goTop').fadeIn(222);
		} else {
            $('#goTop').stop().fadeOut(222);
		}
    }).scroll();

    $(window).scroll(function() {
		if ( $(this).scrollTop() > 15 ){
            $('.main-nav').fadeIn(222);
		} else {
            $('.main-nav').stop().fadeOut(222);
		}
    }).scroll();
});
</script>

<style scope>

.main-nav {
    position: fixed;
    top: 0;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    height: 130px;
}

.logo, .icon {
    align-self: center;
    color: #fff;
}

.logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.logo img {
    width: 120px;
}

.icon i {
    font-size: 1.5rem;
    margin-right: 1.5rem;
    cursor: pointer;
}

ul.sidebar-panel-nav {
    list-style-type: none;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

ul.sidebar-panel-nav > li > a {
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    padding-bottom: 0.5em;
    transform: translateX(-20%);
}

#sidebarHr {
    border: 1px solid #fff;
    transform: translateX(-20%);
}

.goTop {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    border: none;
}

.order-input-button {
    background-color: rgba(0, 0, 0, .8); 
    color: rgba(180, 166, 156);
}

@media screen and (min-width: 576px) {
    .dropdown-menu {
        margin-right: 95px;
    }
}

@media screen and (max-width: 576px) {
    .dropdown-menu {
        margin-left: -198px;
    }
}
</style>