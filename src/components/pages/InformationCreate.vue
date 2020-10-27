<template>
    <div class="informationCreate p-5">
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
            <div class="col col-md-11 information-create-border">
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
                        <div class="circle-text circle-text-3">PAYMENT</div>
                    </div>
                </div>
                <div class="information-create-head mb-5">
                    CREATE INFORMATION
                </div> 
                </div>
                </div>
                <ValidationObserver v-slot="{ invalid }">             
                <form @submit.prevent="createOrder" class="information-create-form">
                    
                    <div class="form-group">
                    <label for="useremail">Email</label>
                    <ValidationProvider name="E-mail" rules="required|email"
                    v-slot="{ errors, classes }">
                        <input type="email" class="form-control information-create-line" id="useremail"
                        :class="classes" v-model="form.user.email" placeholder="請輸入 Email"/>            
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                    
                    <div class="form-group">
                    <label for="username">收件人姓名<span style="color: rgba(0, 0, 0, .5)">(中文)</span></label>
                    <ValidationProvider name="姓名" :rules="{ regex: /^[\u4E00-\u9FFF]+$/ }"
                    v-slot="{ errors, classes }">
                        <input type="text" class="form-control information-create-line" id="username" :class="classes"
                            v-model="form.user.name" placeholder="輸入姓名" required/>
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                    
                    <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <ValidationProvider name="電話" :rules="{ regex: /[0-9]{9}/ }"
                    v-slot="{ errors, classes }">
                        <input type="tel" class="form-control information-create-line" id="usertel" :class="classes"
                        v-model="form.user.tel" placeholder="請輸入電話" required/>
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>
                
                    <div class="form-group">
                    <label for="useraddress">收件人地址<span style="color: rgba(0, 0, 0, .5)">(中文)</span></label>
                    <ValidationProvider name="地址" :rules="{ regex: /[\u4E00-\u9FFF][0-9]/ }"
                    v-slot="{ errors, classes }">
                        <input type="text" class="form-control information-create-line" id="useraddress" :class="classes"
                        v-model="form.user.address" placeholder="請輸入地址" required/>
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    </div>

                    <div class="form-group">
                    <label for="comment">備註<span style="color: rgba(0, 0, 0, .5)">(選填)</span></label>
                    <textarea name="" id="comment" class="form-control information-create-box" 
                    cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                    <div class="mt-5">
                        <button type="submit" class="btn py-3 information-create-button information-create-form"
                         :disabled="invalid">
                                Focus and you'll succeed.
                        </button>
                    </div>
                </form>
                </ValidationObserver>
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
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                },
                message: ''
            }
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
        createOrder() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const vm = this;
            vm.isLoading = true;
            const order = vm.form;
            this.$http.post(api, { data: order }).then((response) => {
                vm.isLoading = false;
                if (response.data.success) {
                    console.log('訂單已建立', response.data);
                    vm.$router.push(`customer_checkout/${response.data.orderId}`)
                };               
            }); 
        },
        confirmCart() {
            this.$router.push("/cart_confirm");
        }
    },
    created() {
        this.getCart();
    }
}
</script>

<style scope>
@media screen and (min-width: 992px) {
    .information-create-head {
        font-size: 30pt
    }
    .information-create-border {
        padding: 80px;
    }
    .information-create-form {
        font-size: 20pt
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
    .information-create-head {
        font-size: 22pt
    }
    .information-create-border {
        padding: 60px;
    }
    .information-create-form {
        font-size: 16pt
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
    .information-create-head {
        font-size: 18pt
    }
    .information-create-border {
        padding: 40px;
    }
    .information-create-form {
        font-size: 15pt
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
    .stamp-1, .stamp-2 {
        transform: scale(.8) translate(-9%, -12%);
    }
}

@media screen and (max-width: 576px) {
    .information-create-head {
        font-size: 10pt;
        padding-top: 100px;
    }
    .information-create-border {
        padding: 20px;
    }
    .information-create-form {
        font-size: 13pt
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
    .stamp-2 {
        transform: scale(.5) translate(-33%, -50%);
    }
}

.informationCreate {
    background-image: url("https://i.imgur.com/FktUFBe.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
    width: 100vw;
    font-family: 'Playball', cursive;
    font-weight: bold;
}

.information-create-border {
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

.information-create-button {
    color: rgba(180, 166, 156); 
    background-color: rgba(0, 0, 0, .8); 
    width: 100%;
}
</style>