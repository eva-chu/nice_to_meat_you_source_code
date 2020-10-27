<template>
    <div class="cartConfirm p-5">
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
            <div class="row my-5 justify-content-center">
                <div class="col col-md-11 cart-confirm-border" v-if="cart.carts && cart.carts.length > 0">
                    <div class="row m-4">
                    <div class="col">
                    <div class="d-flex float-right circle-div row">
                        <div class="circle-div-1">
                            <div class="circle circle-1"></div>
                            <img class="stamp-1" src="https://i.imgur.com/pv6hTsI.png" alt="stamp">
                            <div class="circle-text circle-text-1">CONFIRM</div>
                        </div>
                        <div class="circle-div-2">
                            <div class="circle circle-2"></div>
                            <div class="circle-text circle-text-2">INFORMATION</div>
                        </div>
                        <div class="circle-div-3">
                            <div class="circle circle-3"></div>
                            <div class="circle-text circle-text-3">PAYMENT</div>
                        </div>
                    </div>
                    <div class="cart-confirm-head">
                        CONFIRM CART({{ cart.carts.length }})
                    </div>
                    </div>
                    </div>
                    
                    <table class="table table-borderless cart-confirm-table">
                        <tbody>
                            <tr v-for="item in cart.carts" :key="item.id" class="content-tr cart-confirm-tr">
                                <td class="align-middle cart-confirm-img-div">
                                    <img class="cart-confirm-img" :src="item.product.imageUrl" alt="product">
                                </td>
                                <td class="align-middle text-left">
                                    <div>{{ item.product.title }}</div>
                                    <div>{{ item.product.content }}</div>
                                    <div>X {{ item.qty }}</div>
                                    <div class="text-right">{{ item.total | currency }}</div>
                                    <div class="text-right">
                                        <button type="button" class="btn btn-sm"
                                        @click="removeCartItem(item.id)">
                                            <i class="fas fa-trash-alt" style="color: rgba(0, 0, 0, .8)"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot class="cart-confirm-tfoot">
                            <tr>
                                <td colspan="2">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="請輸入優惠碼"
                                        v-model="coupon_code" style="background: none; border: 2.5px solid rgba(0, 0, 0, .5)">
                                        <div class="input-group-append">
                                            <button class="btn coupon-input-button" type="button" 
                                            @click="addCouponCode">套用優惠碼</button>
                                        </div>
                                    </div> 
                                </td>
                            </tr>
                            <tr>
                                <td class="text-right" colspan="4">
                                    Total {{ cart.total | currency }}
                                </td>
                            </tr>
                            <tr v-if="cart.final_total !== cart.total">                               
                                <td class="text-right text-danger" colspan="4">
                                    Total Discount {{ cart.final_total | currency }}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <button type="button" class="btn py-3 cart-confirm-button"
                                    @click="createInformation">
                                        Click me, you deserve it. Give yourself a treat.
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>                    
                </div>
            </div>
    </div>
</template>

<script>
import $ from 'jquery';
import ShoppingCart from '@/components/ShoppingCartSidebar';

export default {
    data() {
        return {
            isLoading: false,
            cart: {},
            coupon_code: ''
        };
    },
    components: {
        ShoppingCart
    },
    methods: {
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
        addCouponCode() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            const vm = this;
            vm.isLoading = true;
            const coupon = {
                code: vm.coupon_code
            };
            this.$http.post(api, { data: coupon }).then((response) => {
                console.log(response.data);
                vm.getCart();
                vm.isLoading = false;
            }); 
        },
        confirmCart() {
            this.$router.push("/cart_confirm");
        },
        createInformation() {
            this.$router.push("/information_create");
        }
    },
    created() {
        this.getCart();
    }
}
</script>

<style scope>
@media screen and (min-width: 992px) {
    .cart-confirm-head {
        font-size: 30pt
    }
    .content-tr {
        font-size: 16pt;
    }
    .cart-confirm-img-div {
        width: 200px; 
        height: 150px;
    }
    .cart-confirm-tfoot, .cart-confirm-button {
        font-size: 20pt
    }
    .cart-confirm-border {
        padding: 80px;
    }
    .cart-confirm-img { 
        width: 100%;
        height: 100%;
    }
    .circle-div {
        height: 150px;
        width: 400px;
    }
    .circle {
        height: 100px;
        width: 100px;
    } 
    .circle-text {
        font-size: 15pt;
        top: 110px;
    }
}

@media screen and (max-width: 992px) and (min-width: 768px) {
    .cart-confirm-head {
        font-size: 22pt
    }
    .content-tr {
        font-size: 14pt;
    }
    .cart-confirm-img-div {
        width: 160px; 
        height: 120px;
    }
    .cart-confirm-tfoot, .cart-confirm-button {
        font-size: 16pt
    }
    .cart-confirm-border {
        padding: 60px;
    }
    .cart-confirm-img { 
        width: 100%;
        height: 100%;
    }
    .circle-div {
        height: 150px;
        width: 400px;
    }
    .circle {
        height: 100px;
        width: 100px;
    } 
    .circle-text {
        font-size: 15pt;
        top: 110px;
    }
}

@media screen and (max-width: 768px) and (min-width: 576px) {
    .cart-confirm-head {
        font-size: 18pt
    }
    .content-tr {
        font-size: 13pt;
    }
    .cart-confirm-img-div {
        width: 150px; 
        height: 115px;
    }
    .cart-confirm-tfoot, .cart-confirm-button {
        font-size: 15pt
    }
    .cart-confirm-border {
        padding: 40px;
    }
    .cart-confirm-img { 
        width: 100%;
        height: 100%;
    }
    .circle-div {
        height: 112.5px;
        width: 300px;
    }
    .circle {
        height: 80px;
        width: 80px;
    } 
    .circle-text {
        font-size: 12pt;
        top: 110px;
    }
    .stamp-1 {
        transform: scale(.8) translate(-9%, -12%);
    }
}

@media screen and (max-width: 576px) {
    .cart-confirm-head {
        font-size: 10pt;
        padding-top: 100px;
    }
    .content-tr {
        font-size: 10pt;
    }
    .cart-confirm-img-div {
        width: 145px; 
        height: 110px;
    }
    .cart-confirm-tfoot, .cart-confirm-button {
        font-size: 13pt
    }
    .cart-confirm-border {
        padding: 0;
    }
    .cart-confirm-img { 
        width: 100px;
        height: 80px;
    }
    .circle-div {
        height: 75px;
        width: 200px;
    }
    .circle {
        height: 50px;
        width: 50px;
    } 
    .circle-text {
        font-size: 8pt;
        top: 70px;
    }
    .stamp-1 {
        transform: scale(.5) translate(-33%, -50%);
    }
}

.cartConfirm {
    background-image: url("https://i.imgur.com/FktUFBe.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
    width: 100vw;
    font-family: 'Playball', cursive;
    font-weight: bold;
}

.cart-confirm-border {
    border: 4px solid rgba(0, 0, 0, .5);
}

.circle-div {
    position: relative;
}

.circle {
    border: 2.5px dashed rgba(0, 0, 0, .5);
    border-radius: 50%;
} 

.circle-text {
    color: rgba(0, 0, 0, .8);
    font-weight: bold;
    position: absolute;
}


.circle-div-1 {
    position: absolute;
}

.circle-1 {
    position: absolute;
} 

.stamp-1 {
    position: absolute;
    height: 100px;
    left: -20px;
}

.circle-div-2 {
    position: absolute;
    left: 38%;
}

.circle-2 {
    position: absolute;
} 

.circle-text-2 {
    left: -20px; 
}

.circle-div-3 {
    position: absolute;
    right: 25%;
}

.circle-3 {
    position: absolute;
} 

.cart-confirm-table {
    color: rgba(0, 0, 0, .8); 
    width: 100%;
}

.cart-confirm-tr {
    border-bottom: 2.5px solid rgba(0, 0, 0, .5);
}

.cart-confirm-img { 
    filter: sepia(100%);
}

.cart-confirm-img:hover {
    filter: none;
    transition: all .3s;
}

.coupon-input-button {
    background-color: rgba(0, 0, 0, .8); 
    color: rgba(180, 166, 156);
}

.cart-confirm-button {
    color: rgba(180, 166, 156); 
    background-color: rgba(0, 0, 0, .8); 
    width: 100%;
}
</style>