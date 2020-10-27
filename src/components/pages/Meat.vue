<template>
    <div>
        <loading :active.sync="isLoading"></loading>
         <ShoppingCart>
            <div class="row my-2 justify-content-center meats-background">
                <div class="col mb-4" v-if="cart.carts && cart.carts.length > 0">
                    <table class="table table-borderless font-weight-bold cart">
                        <thead>
                            <tr style="border-bottom: 2.5px solid rgb(83, 71, 65); font-size: 16pt">
                                <th class="text-center" colspan="2">Wish List</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in cart.carts" :key="index" style="border-bottom: 2.5px solid rgba(83, 71, 65, .5)">
                                <td class="align-middle">
                                    <div style="width: 100px; height: 80px; background-size: cover; background-position: center"
                                    :style="{backgroundImage: `url(${item.product.imageUrl})`}">
                                    </div>
                                </td>
                                <td class="align-middle">
                                    <div>{{ item.product.title }}</div>
                                    <div>{{ item.qty }}{{ item.product.unit }}</div>
                                    <div class="text-right">{{ item.total | currency }}</div>
                                    <div class="text-right"><button type="button" class="btn btn-sm"
                                    @click="removeCartItem(item.id)">
                                        <i class="fas fa-trash-alt" style="color: rgb(83, 71, 65)"></i>
                                    </button></div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot style="font-size: 13pt">
                            <tr>
                                <td class="text-left">Total</td>
                                <td class="text-right">{{ cart.total | currency }}</td>
                            </tr>
                            <tr v-if="cart.final_total !== cart.total" class="text-danger">
                                <td class="text-left">Total Discount</td>
                                <td class="text-right">{{ cart.final_total | currency }}</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <button type="button" class="btn" @click="confirmCart"
                                    style="color: rgb(202, 180, 142); background-color: rgb(83, 71, 65); 
                                    width: 100%">
                                        Yesterday You Said Tomorrow
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>                    
                </div>
            </div>
        </ShoppingCart>
        <div class="row justify-content-center wall-background-2">
            <div class="col-lg-4 m-5 py-1">  
                <div class="poster-1 pt-5">              
                    <h1 class="poster-text-1">Please Don't</h1>
                    <h1 class="poster-text-1">Lick The Screen,</h1>
                    <div :style="{backgroundImage: `url(${product.imageUrl})`}" alt="product image" class="meatProduct">               
                    <!-- <img :src="product.imageUrl" alt="product image" class="meatProduct"> -->
                    <img v-if="product.category === 'BEST牛肉' || product.category === 'BEST雞肉' 
                    || product.category === 'BEST豬肉' || product.category === 'BEST海鮮'" 
                    src="https://i.imgur.com/f8ccXkD.png" alt="BEST SELLER" class="meatProductBest">
                    </div> 
                    <div class="poster-text-2">
                        <h3>MAMA WILL</h3>
                        <h3>HIT YOU.</h3>
                    </div>
                    <img src="https://i.imgur.com/DypxOqG.png?1" alt="poster icon" class="poster-icon-1">
                </div>
                <div class="poster-3 mt-5">
                    <div class="poster-dark" v-for="(item, index) in recommended" :key="index">
                        <a href="#" @click.prevent="goRecommended(item.id)">
                            <img :src="item.imageUrl" alt="recommended"
                            class="poster-recommended">
                        </a>
                    </div>
                    <div class="poster-red text-center py-3">
                        <h5 style="-webkit-text-stroke: 1.5px black">RESIST & YOU'LL REGRET</h5>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 m-5 py-5 poster-2">
                <div class="card border-0 productCard text-center">
                    <div class="card-header" style="background: none; border: none">
                        <h1 style="font-family: 'Noto Sans TC', sans-serif">
                            {{ product.title }}
                        </h1>
                        <h4 style="font-family: 'Diplomata', cursive">
                            {{ product.content }}
                        </h4>
                        <hr  style="border-top: 15px double rgb(193, 39, 45)">
                    </div>                    
                    <div class="card-body">
                        <h4 class="card-title" style="font-family: 'Noto Sans TC', sans-serif">
                            <div v-for="(item, index) in product.description" :key="index"
                            class="text-left">
                                <h5>{{ item }}</h5>
                            </div>
                            <hr  style="border-top: 15px double rgb(193, 39, 45)" class="mt-5">
                            <div class="d-inline-block mt-5" style="font-family: 'Diplomata', cursive">
                                <div class="h1" v-if="product.price === product.origin_price">
                                    {{ product.origin_price | currency }}
                                </div>
                                <div class="h1 mr-1 d-inline-block" v-if="product.price !== product.origin_price">
                                    {{ product.price | currency }}
                                </div>
                                <del class="h3" v-if="product.price !== product.origin_price">
                                    {{ product.origin_price | currency }}
                                </del>
                            </div><br>
                            <div class="d-inline-block" style="width: 100%">
                                <select class="form-control mt-3 poster-select d-inline-block" v-model="product.num">
                                    <option :value="num" v-for="num in 10" :key="num">
                                        {{num}} {{product.unit}}
                                    </option>
                                </select>
                                <h5 v-if="product.origin_price === product.price"
                                 style="font-family: 'Diplomata', cursive" class="d-inline-block">
                                    Total{{ product.num * product.origin_price | currency }}
                                </h5>
                                <h6 v-else style="font-family: 'Diplomata', cursive"
                                 class="d-inline-block">
                                    Discount{{ product.num * product.price | currency }}
                                </h6>
                            </div>
                            <button type="button" class="btn poster-btn mt-5"
                                @click="addToCart(product.id, product.num)">
                                ENJOY IT
                            </button>
                        </h4>                    
                    </div>
                </div>            
            </div>
        </div>  
    </div>
</template>

<script>
import $ from 'jquery';
import { store, mutations } from '@/store.js';
import ShoppingCart from '@/components/ShoppingCartSidebar';

export default {
    data() {
        return {
            productId: '',
            product: {},
            recommended: [],
            isLoading: false,
            cart: {}
        };
    },
    components: {
        ShoppingCart
    },
    methods: {
        getProducts() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.isLoading = false;
                console.log(response.data);
                vm.products = response.data.products;
                return vm.products;
            });
        },
        getProduct(id) {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;            
            vm.isLoading = true;
            vm.product = {};
            this.$http.get(api).then((response) => {
                vm.product = response.data.product;
                vm.product.num = 1;
                vm.product.description = vm.product.description.split('|');
                vm.isLoading = false;
                console.log(vm.product);
            });
        },
        getRecommended() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            const vm = this;
            vm.isLoading = true;
            vm.recommended = [];
            this.$http.get(api).then((response) => {
                let products = response.data.products;                                            
                let n = Math.floor(Math.random() * products.length);
                vm.recommended.push(products[n]);
                vm.isLoading = false;
                console.log('products', products);
            });
        },
        // getRecommended() {
        //     const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
        //     const vm = this;
        //     vm.isLoading = true;
        //     vm.recommended = [];
        //     this.$http.get(api).then((response) => {
        //         let products = response.data.products;                
        //         products = products.filter(function(item) {
        //             return item.category === vm.product.category;
        //         });               
        //         const filterProTitle = [];
        //         products.forEach(function(item) {
        //             filterProTitle.push(item.title);
        //         });
        //         const key = filterProTitle.indexOf(vm.product.title);                               
        //         products.splice(key, 1);
        //         const n = Math.floor(Math.random() * products.length);
        //         vm.recommended.push(products[n]);
        //         vm.isLoading = false;
        //         console.log('products', products); 
        //     });
        // },
        goRecommended(id) {
            const vm = this;
            vm.$router.push(`/meat/${id}`);
            vm.getProduct(id);
            vm.getRecommended();
        },
        addToCart(id, qty = 1) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            const cart = {
                product_id: id,
                qty
            }; 
            vm.isLoading = true;
            this.$http.post(api, { data: cart }).then((response) => {                
                $('#productModal').modal('hide');
                console.log(response.data);                
                vm.getCart();
                vm.isLoading = false;
                mutations.toggleCart();
            });                        
        },
        getCart() {
           const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.isLoading = false;
                console.log(response.data);
                vm.cart = response.data.data;
            }); 
        },
        removeCartItem(id) {
           const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.delete(api).then((response) => {
                console.log(response.data);
                vm.getCart();
                vm.isLoading = false;
            }); 
        },
        confirmCart() {
            this.$router.push("/cart_confirm");
        }
    },
    created() {
        const vm = this;
        vm.productId = vm.$route.params.productId;
        vm.getCart();
        vm.getProduct(vm.productId);
        vm.getRecommended();
    }
}
</script>

<style scope>
.wall-background-2 {
    background-image: url("https://i.imgur.com/7zq3aWX.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -999;
}

.poster-1 {
    position: relative; 
    height: 550px;
    background-image: url("https://i.imgur.com/HVrVh2b.jpg?1");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
    color: black;
    box-shadow: 3px 11px 5px rgba(15, 7, 1, .9);
    font-family: 'Bowlby One SC', cursive;
}

.poster-text-1 {
    -webkit-text-stroke: 1.5px white;
    margin-left: 7.5%;    
}

.poster-text-2 {
    -webkit-text-stroke: 2.5px black;
    color: rgb(193, 39, 45); 
    position: absolute; 
    bottom: 40px;
    margin-left: 7.5%;
} 

.poster-icon-1 {
    position: absolute; 
    bottom: 0;
    right: 0;
    z-index: 60;
    width: 50%;
}

.meatProduct {
    position: relative; 
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 250px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border: 4px solid black;
    z-index: 50;
}   

.meatProductBest {
    position: absolute; 
    width: 30%;
    left: -4.5%;
    bottom: -3.5%;
    transform: translate(4.5%, 3.5%);
    z-index: 100;   
}

.productCard {
    background: none;    
}

.poster-2 {
    background-image: url("https://i.imgur.com/cwRYVow.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
    color: rgb(193, 39, 45); 
    box-shadow: 3px 11px 5px rgba(15, 7, 1, .9);
}

.poster-select {
    width: 12%;
    padding: 0;
    background: none;
    border: none;
    color: rgb(193, 39, 45);
    font-family: 'Noto Sans TC', sans-serif;
}

.poster-btn {
    background-color: rgb(193, 39, 45);
    color: rgba(221, 220, 214, 0.842);
    font-family: 'Diplomata', cursive;
    width: 100%; 
    height: 50px;
}

.poster-3 {
    position: relative;
    background-image: url("https://i.imgur.com/FktUFBe.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
    color: rgb(193, 39, 45); 
    box-shadow: 3px 11px 5px rgba(15, 7, 1, .9);
    height: 300px;
}

.poster-recommended {
    width: 280px;
    height: 90%;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    filter: grayscale(100%);
}

.poster-dark {
    background-color: rgb(40, 40, 40);
    width: 90%;
    height: 76%;
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
}

.poster-red {
    background-color: rgb(193, 39, 45);
    width: 90%;
    margin: 0;
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Corben', cursive;
    color: rgba(240, 236, 216, 0.89);
}

@media screen and (max-width: 576px) {
    .meatProduct {
        height: 30%;
    }
    .poster-1 h1 {
        font-size: 24pt;
    } 
    .poster-1 h3 {
        font-size: 20pt;
    } 
    .poster-text-1 {
        margin-bottom: 10%;    
    }
    .poster-select {
        width: 30%;
    }
    .poster-recommended {
        height: 60%;
        width: 100%;
    }
}
</style>