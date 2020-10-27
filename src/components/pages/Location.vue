<template>
<div id="wall-background-1">
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
<div class="background justify-content-center align-content-center text-center row p-5">
    <div style="width: 100vw" class="shop-div">
        <img src="https://i.imgur.com/rVTwgku.png?1" alt="our shop" class="pl-2 shop">
    </div>
    <div style="width: 100vw" class="shop-div">
        <img src="https://i.imgur.com/I51bNCH.png" alt="店鋪一覽" class="pr-1 mt-3 shop">
    </div>
</div>
<div class="row justify-content-center align-content-center text-center" style="color: rgb(83, 71, 65)">
    <div class="col col-sm-10 py-5">        
        <div class="row justify-content-center align-content-center text-center">
            <div class="col my-5">
                <img src="https://i.imgur.com/FktUFBe.jpg" alt="paper background" class="outside-border">
                <div class="img-border">
                    <img src="https://i.imgur.com/AdZfayI.jpg" alt="天母店" class="store">
                </div>               
            </div>
            <div class="col my-5">
                <img src="https://i.imgur.com/rXNrrg6.jpg" alt="paper background" class="paper-background">
                <img src="https://i.imgur.com/9eYeLII.png" alt="logo" class="location-logo">
                <hr class="frame">
                <div class="info mt-5">
                    <h6>Tel/(02)5266-5201&emsp;Fax/(02)5266-0001</h6>
                    <h6>地址/111台北市士林區福國路72號<br>（捷運芝山站2號出口旁）</h6>
                    <h6>營業時間/週一至週日 8:30～22:00 (春節&災防假公休)
                    <a href="https://www.google.com.tw/maps/place/111台北市士林區福國路72號" target="_blank"> 
                        <i class="fas fa-map-marker-alt"></i> 
                    </a>
                    </h6>
                </div>
            </div>
        </div>
        <div class="row justify-content-center align-content-center text-center">
            <div class="col my-5">
                <img src="https://i.imgur.com/FktUFBe.jpg" alt="paper background" class="outside-border">
                <div class="img-border">
                    <img src="https://i.imgur.com/UJidzH1.jpg" alt="信義店" class="store">
                </div>              
            </div>
            <div class="col my-5">
                <img src="https://i.imgur.com/rXNrrg6.jpg" alt="paper background" class="paper-background">
                <img src="https://i.imgur.com/yYpR5xg.png" alt="logo" class="location-logo">
                <hr class="frame">
                <div class="info mt-5">
                    <h6>Tel/(02)5266-5202&emsp;Fax/(02)5266-0002</h6>
                    <h6>地址/110台北市信義區忠孝東路五段4號<br>（捷運市府站2號出口旁）</h6>
                    <h6>營業時間/週一至週日 8:30～22:00 (春節&災防假公休)
                    <a href="https://www.google.com.tw/maps/place/110台北市信義區忠孝東路五段4號" target="_blank"> 
                        <i class="fas fa-map-marker-alt"></i> 
                    </a>
                    </h6>
                </div>
            </div>
        </div>
        <div class="row justify-content-center align-content-center text-center">
            <div class="col my-5">
                <img src="https://i.imgur.com/FktUFBe.jpg" alt="paper background" class="outside-border">
                <div class="img-border">
                    <img src="https://i.imgur.com/stGPHZF.jpg" alt="羅斯福店" class="store">
                </div>
            </div>
            <div class="col my-5">
                <img src="https://i.imgur.com/rXNrrg6.jpg" alt="paper background" class="paper-background">
                <img src="https://i.imgur.com/3SM1VOO.png" alt="logo" class="location-logo">
                <hr class="frame">
                <div class="info mt-5">
                    <h6>Tel/(02)5266-5203&emsp;Fax/(02)5266-0003</h6>
                    <h6>地址/100台北市中正區羅斯福路一段22號<br>（捷運中正紀念堂站2號出口旁）</h6>
                    <h6>營業時間/週一至週日 8:30～22:00 (春節&災防假公休)
                    <a href="https://www.google.com.tw/maps/place/100台北市中正區羅斯福路一段22號" target="_blank"> 
                        <i class="fas fa-map-marker-alt"></i> 
                    </a>
                    </h6>
                </div>
            </div>
        </div>
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
            cart: {}
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
@media screen and (min-width: 768px) {
    .store {
        width: 500px;
        height: 300px;
    }
    .img-border {
        width: 515px;
        height: 315px;
    }
    .outside-border {
        width: 530px;
        height: 330px;
    }
    .paper-background {
        width: 530px;
        height: 330px;
    }
    .location-logo {
        width: 150px;
    }
    .frame {
        width: 450px;
    }
    .info {
        width: 530px;
    }
}

@media screen and (max-width: 768px) and (min-width: 576px) {
    .store {
        width: 400px;
        height: 240px;
    }
    .img-border {
        width: 415px;
        height: 255px;
    }
    .outside-border {
        width: 430px;
        height: 270px;
    }
    .paper-background {
        width: 430px;
        height: 270px;
    }
    .location-logo {
        width: 120px;
    }
    .frame {
        width: 350px;
    }
    .info {
        width: 430px;
    }
    h6 {
        font-size: 10pt;
    }
    a {
        font-size: 10pt;
    }
}

@media screen and (max-width: 576px) {
    .store {
        width: 285px;
        height: 195px;
    }
    .img-border {
        width: 300px;
        height: 210px;
    }
    .outside-border {
        width: 315px;
        height: 225px;
    }
    .paper-background {
        width: 315px;
        height: 225px;
    }
    .location-logo {
        width: 90px;
    }
    .frame {
        width: 235px;
    }
    .info {
        width: 315px;
    }
    h6 {
        font-size: 7pt;
    }
    a {
        font-size: 7pt;
    }
}


@media screen and (max-width: 992px) {
    .shop {
        transform: scale(.6, 1);
    }
    .shop-div {
        transform: scale(1, .6);
        margin: -2.5rem 0 -2.5rem 0;
    }
}

#wall-background-1 {
    background-image: url("https://i.imgur.com/7zq3aWX.jpg");
    /* width: 100vw; */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -999;
}

.background {
    background-image: url("https://i.imgur.com/S6pnXNZ.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -999;
    box-shadow: 3px 11px 5px rgba(15, 7, 1, .9);
}

.store {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.img-border {
    border: 4.5px solid rgb(83, 71, 65);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.outside-border {
    position: relative;
    box-shadow: 3px 11px 5px rgba(15, 7, 1, .9);
    background-color: rgb(240, 236, 216);
}

.paper-background {
    position: relative;
    z-index: 0;
    box-shadow: 3px 11px 5px rgba(15, 7, 1, .9);
}

.location-logo {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -20%);
}

.frame {
    position: absolute;
    left: 50%;
    top: 38%;
    transform: translate(-50%, -38%);
    border: 1px solid rgb(83, 71, 65);
}

.info {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}


</style>