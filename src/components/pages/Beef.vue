<template>
    <div class="meatAll py-5">
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
        <div class="row justify-content-center py-5">
            <div class="col">
                <img src="https://i.imgur.com/pNhaffj.png" alt="Beef Menu" class="slogan"
                style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)">              
            </div>
        </div>
        <div class="row py-5 cardRow justify-content-center">
        <div class="cardCol" v-for="(item, index) in products" :key="index">
            <div class="col-md-4 card border-0 px-3 productsCard"  v-if="item.category === '牛肉' || item.category === 'BEST牛肉'" style="height: 400px">
                <div class="meatProductsContainer">
                    <div class="meatProductsImg" :style="{backgroundImage: `url(${item.imageUrl})`}">
                        <img v-if="item.category === 'BEST牛肉'" src="https://i.imgur.com/8BEX8vb.png" 
                        alt="BEST SELLER" style="position: absolute; top: -11px; left: -46px; width: 150px; height: 100px">
                    </div>
                    <div class="meatProductsMiddle">
                        <button class="meatProductsText" type="button" @click="getProduct(item.id)">
                            SEE MORE
                        </button>
                    </div>
                </div>
                <div class="card-body card-body-meats" style="color: rgb(240, 236, 216)">
                    <h5 class="card-title">
                        <a href="#" class="font-weight-bold" style="color: rgb(240, 236, 216)" @click.prevent="getProduct(item.id)">{{ item.title }}</a>
                        ------
                        <div class="d-inline-block">
                            <div class="h5" v-if="item.price === item.origin_price" style="color: rgb(240, 236, 216)">
                                {{ item.origin_price | currency }}
                            </div>
                            <div class="h5 text-danger mr-1 d-inline-block" v-if="item.price !== item.origin_price">{{ item.price | currency }}</div>
                            <del class="h6" v-if="item.price !== item.origin_price" style="color: rgb(240, 236, 216)">
                                {{ item.origin_price | currency }}
                            </del>
                        </div>
                        <br><a href="#" class="h6" @click.prevent="getProduct(item.id)" style="color: rgb(240, 236, 216)">
                            {{ item.content }}
                        </a>
                        <button type="button" class="float-right btn btn-outline-light btn-sm"
                        @click="addToCart(item.id)" style="color: rgb(240, 236, 216); border: 1px solid rgb(240, 236, 216)">
                        ADD
                        </button>
                    </h5>                    
                </div>
            <img src="https://i.imgur.com/IYoGZBw.png" class="pb-4 a-line">
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
            products: [],
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
            });
        },
        getProduct(id) {
            this.$router.push(`/meat/${id}`);
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
        this.getProducts();
        this.getCart();
    }
}
</script>

<style scope>
.meatAll {
    background-color: rgb(83, 71, 65);
}

.productsCard {
    background-color:  rgb(83, 71, 65);
}

.meatProductsContainer {
  position: relative;
  width: 365px;
  height: 250px;
}

.card-body-meats {
    width: 375px;
}

.meatProductsImg {
  display: block;
  width: 365px;
  height: 250px;
  transition: .5s ease;
  backface-visibility: hidden;
  background-size: cover; 
  background-position: center;
  position: relative;
}

.meatProductsMiddle {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 365px;
  height: 0;
  transition: .5s ease;
  text-align: center;
}

.meatProductsContainer:hover .meatProductsMiddle {
  height: 250px;
  background-color: rgba(0, 0, 0, .8);
}

.meatProductsContainer:hover .meatProductsText {
  opacity: 1;
}

.meatProductsText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background: 0;
  border: 2.5px solid rgb(240, 236, 216);
  color: rgb(240, 236, 216);
  font-size: 16px;
  padding: 8px 16px;
  opacity: 0;
  transition: .5s ease;
}

.a-line {
    width: 375px;
} 

.slogan {
    width: 500px;
}

@media screen and (max-width: 576px) {
    .meatProductsMiddle {
        width: 250px;
    }
    .meatProductsImg {
        width: 250px;
        height: 150px;
    }
    .meatProductsContainer {
        width: 250px;
        height: 150px;
    }
    .meatProductsContainer:hover .meatProductsMiddle {
        height: 150px;
    }
    .card-body-meats {
        width: 250px;
    }
    .a-line {
        width: 250px;
    }
    .meatProductsText {
        border: 2px solid rgb(240, 236, 216);
        font-size: 11px;
        padding: 5px 10px;
        opacity: 0;
        transition: .5s ease;
    }
    .slogan {
        width: 300px;
    }
}
</style>