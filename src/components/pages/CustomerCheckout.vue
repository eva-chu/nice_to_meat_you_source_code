<template>
    <div class="customerCheckout p-5">
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
            <div class="col col-md-11 customer-checkout-border">
                <div class="row">
                <div class="col">
                <div class="d-flex float-right circle-div my-5">
                    <div class="circle-div-1">
                        <div class="circle circle-1"></div>
                        <img class="stamp-1" src="https://i.imgur.com/pv6hTsI.png" alt="stamp">
                        <div class="circle-text circle-text-1">CONFIRM</div>
                    </div>
                    <div class="circle-div-2">
                        <div class="circle circle-2"></div>
                        <img class="stamp-2" src="https://i.imgur.com/pv6hTsI.png" alt="stamp">
                        <div class="circle-text circle-text-2">INFORMATION</div>
                    </div>
                    <div class="circle-div-3">
                        <div class="circle circle-3"></div>
                        <img class="stamp-3" src="https://i.imgur.com/pv6hTsI.png" alt="stamp">
                        <div class="circle-text circle-text-3">PAYMENT</div>
                    </div>
                </div>
                <div class="customer-checkout-head mb-5">
                    COMPLETE PAYMENT
                </div>
                </div>
                </div>

                <form @submit.prevent="payOrder" class="customer-checkout-form">
                <div class="row">
                <div class="col-12 col-md-6"> 
                    <table class="table">
                    <thead>
                        <tr>
                        <th class="text-center">訂單內容(含折扣)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.products" :key="item.id">
                        <td class="align-middle">
                            <div>{{ item.product.title }}</div>
                            <div>{{ item.qty }}{{ item.product.unit }}</div>
                            <div class="text-right">{{ item.final_total | currency }}</div>
                        </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <td class="text-right">總計{{ order.total | currency }}</td>
                        </tr>
                    </tfoot>
                    </table>
                    </div>

                    <div class="col-12 col-md-6">
                    <table class="table widthtable">
                    <thead>
                        <tr>
                        <th class="text-center">訂購資料</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>
                            <div>下單日期:</div><br>
                            <div>{{ order.create_at | date }}</div>                            
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <div>訂單編號:</div><br>
                            <div>{{ order.id }}</div>                            
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <div>Email:</div><br>
                            <div>{{ order.user.email }}</div>                           
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <div>姓名:</div><br>
                            <div>{{ order.user.name }}</div>                            
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <div>收件人電話:</div><br>
                            <div>{{ order.user.tel }}</div>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <div>收件人地址:</div><br>
                            <div>{{ order.user.address }}</div>                           
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <div>付款狀態:</div><br>
                            <div>
                                <span v-if="!order.is_paid">尚未付款</span>
                                <span v-else class="text-success">付款完成</span>
                            </div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <div class="text-right" v-if="order.is_paid === false">
                        <button type="submit" class="btn py-3 
                        customer-checkout-button customer-checkout-form">
                                確認付款去
                        </button>
                    </div>
                    </div>
                    </div>
                </form>
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
            cart: {},
            orderId: '',
            order: {
                user: {}
            },
            create_at: new Date(),
            isLoading: false,
        }
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
        confirmCart() {
            this.$router.push("/cart_confirm");
        },
        getOrder() {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`; 
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.isLoading = false;
                console.log(response.data);
                vm.order = response.data.order;
            });
        },
        payOrder() {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`; 
            vm.isLoading = true;
            this.$http.post(api).then((response) => {
                vm.isLoading = false;
                console.log(response.data);
                if (response.data.success) {
                    this.getOrder();
                }
            });
        }
    },
    watch: {
        create_at() {
            const vm = this;
            const timestamp = Math.floor(new Date(vm.create_at) / 1000);
            vm.tempOrder.create_at = timestamp;
        }
    },
    created() {
        const vm = this;
        vm.orderId = vm.$route.params.orderId;
        vm.getOrder(vm.orderId);
        vm.getCart();
    }
}
</script>

<style scope>
@media screen and (min-width: 992px) {
    .customer-checkout-head {
        font-size: 30pt
    }
    .customer-checkout-border {
        padding: 80px;
    }
    .customer-checkout-form {
        font-size: 12pt
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
    .customer-checkout-head {
        font-size: 22pt
    }
    .customer-checkout-border {
        padding: 60px;
    }
    .customer-checkout-form {
        font-size: 11pt
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
    .customer-checkout-head {
        font-size: 18pt
    }
    .customer-checkout-border {
        padding: 40px;
    }
    .customer-checkout-form {
        font-size: 11pt
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
    .stamp-1, .stamp-2, .stamp-3 {
        transform: scale(.8) translate(-9%, -12%);
    }
}

@media screen and (max-width: 576px) {
    .customer-checkout-head {
        font-size: 10pt;
        padding-top: 100px;
    }
    .customer-checkout-border {
        padding: 20px;
    }
    .customer-checkout-form {
        font-size: 11pt
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
    .stamp-1, .stamp-2, .stamp-3 {
        transform: scale(.5) translate(-33%, -50%);
    }
}

.customerCheckout {
    background-image: url("https://i.imgur.com/FktUFBe.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
    width: 100vw;
    font-family: 'Playball', cursive;
    font-weight: bold;
}

.customer-checkout-border {
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
    position: absolute;
    font-weight: bold;
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

.stamp-2 {
    position: absolute;
    height: 100px;
    left: -20px;
}

.circle-div-3 {
    position: absolute;
    right: 25%;
}

.circle-3 {
    position: absolute;
} 

.stamp-3 {
    position: absolute;
    height: 100px;
    left: -20px;
}

.information-create-line {
    background: none; 
    border-top: none; 
    border-left: none; 
    border-right: none; 
    border-bottom: 2.5px solid rgba(0, 0, 0, .5);
}

.information-create-box {
    background: none; 
    border: 2.5px solid rgba(0, 0, 0, .5);
}

.customer-checkout-button {
    color: rgba(180, 166, 156); 
    background-color: rgba(0, 0, 0, .8); 
    width: 100%;
}
</style>