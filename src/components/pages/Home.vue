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
<Modal/>
<div class="background-img1 justify-content-center align-content-center row text-white">
    <div class="col-9 col-md-6 mb-5 pb-5 head">
    <h1>想跟您說聲&ensp;Nice to meat you</h1>
    <h1>我們把最好的肉</h1>
    <h1>給最懂得您</h1>
    </div>
</div>
<div class="py-5 background2 text-center row">
<div class="col py-5">
    <h2 class="mb-5 text-light">今晚，您想來點...</h2>
    <div class="row justify-content-center">
        <div class="col col-md-2 ml-4">
            <router-link to="/beef">
                <img src="https://i.imgur.com/2WcXhin.png" alt="beef steak" class="meat beef">
            </router-link>
        </div>
        <div class="col col-md-2">
            <router-link to="/chicken">
                <img src="https://i.imgur.com/wFDeeZ6.png" alt="chicken legs" class="meat chicken">
            </router-link>
        </div>
        <div class="col col-md-2">
            <router-link to="/pork">
                <img src="https://i.imgur.com/AYTu14U.png" alt="pork ribs" class="meat pork">
            </router-link>
        </div>
        <div class="col col-md-2 mr-4">
            <router-link to="/seafood">
                <img src="https://i.imgur.com/flW1DUw.png" alt="lobster" class="meat seafood">
            </router-link>
        </div>
    </div>
</div>
</div>
<div class="background-img3 justify-content-center align-content-center row p-5 text-white">
    <div class="col-11 col-md-10 text-center about p-4">
    <h1 class="font-italic">OUR STORY</h1>
    <img src="https://i.imgur.com/qfUiz6C.png" alt="our story font" class="our-story-img-1">
    <h6 style="line-height: 2" class="mt-3">『堅持細節，維持品質』是創辦人伊娃女士每日的例行公事，也是NICE TO MEAT YOU品牌的精神。
    對精品情有獨鍾的伊娃女士認為，健康是最可貴的，肉品精品化不但能兼顧味覺，更能讓人吃得安心，是最棒的投資了。
    NICE TO MEAT YOU將伊娃女士的完美主義發揮的淋漓盡致，嚴格控管每一道生產過程，
    堅持有機、農場直銷，也和台灣當地農民合作，將最好的肉獻給最懂得您。</h6>
    <img src="https://i.imgur.com/3DQMKiD.png" alt="logo-icon" class="our-story-img-2">
    </div>
</div>
<div class="py-5 text-center row font-weight-bold justify-content-center align-content-center" 
style="color: black">
<div class="col">
    <div class="row justify-content-center align-items-center">
        <div style="width: 300px; height: 300px" class="m-1" id="bestSellerBox">
            <img src="https://i.imgur.com/HNFgnCz.png" alt="best seller icon" style="width: 250px" id="bestSeller">            
        </div>
        <div style="width: 300px; height: 300px" class="m-1 py-3">
            <router-link to="/meat/-MJxIST8gC4TvfviCr1g">
                <div class="bestContainer">
                    <img src="https://i.imgur.com/5CsmsSy.jpg" alt="beef steak" class="mb-2 bestImg">
                    <div class="bestMiddle"></div>
                </div>                
            </router-link>
            <h6 class="font-weight-bold mt-2">日本頂級A5神戶牛菲力</h6>
            <h6 class="font-weight-bold text-primary text-center">料理口感：取自腰內肉，口感最為軟嫩細緻，是油脂較少的稀有部位，三分熟入口即化。</h6>
        </div>
        <div style="width: 300px; height: 300px" class="m-1 py-3">
            <router-link to="/meat/-MJxJjA23tiEHdkka0NB">
                <div class="bestContainer">
                    <img src="https://i.imgur.com/tt0qTbf.jpg" alt="pork ribs" class="mb-2 bestImg">
                    <div class="bestMiddle"></div>
                </div>  
            </router-link>
            <h6 class="font-weight-bold mt-2">台灣冠軍橄欖六白豬肋排</h6>
            <h6 class="font-weight-bold text-primary text-center">料理口感：富含不飽和脂肪酸， 呈現漂亮的油花分布，肉質細膩且甘口的口感令人印象深刻。</h6>
        </div>
        <div style="width: 300px; height: 300px" class="m-1 py-3">
            <router-link to="/meat/-MJxKtFxrIrGYp0Fi1Fu">
                <div class="bestContainer">
                    <img src="https://i.imgur.com/BQfuVqu.jpg" alt="lobster" class="mb-2 bestImg">
                    <div class="bestMiddle"></div>
                </div> 
            </router-link>
            <h6 class="font-weight-bold mt-2">中華錦繡龍蝦</h6>
            <h6 class="font-weight-bold text-primary text-center">料理口感：錦繡龍蝦身形均勻、殼薄肉飽滿，比起其他龍蝦肉質口感細膩，吃起來鮮甜。</h6>
        </div>
    </div>
</div>
</div>
<div class="row p-0 text-white">
    <div class="col-12 col-lg-7 p-0" id="video-div">
        <video controls id="video" class="p-0">
            <source src="./video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
    <div class="col-5 p-5" id="video-introduction">
        <div class="row justify-content-center align-items-center text-center">
            <div class="col-md-8" id="video-col">
                <img src="https://i.imgur.com/cNuEnJx.png" alt="demo video"
                 width="100%" class="mb-3" height="auto">
                <h3 font-size="10%">Preparing Nicest Meat To You</h3>
                <h3 font-size="10%" style="color: #ddd">From fram to table,</h3>
                <h3 font-size="10%" style="color: #ddd">獻給最有品味的您</h3>
                <img src="https://i.imgur.com/3DQMKiD.png" alt="logo-icon" 
                width="80%" height="auto">
            </div>     
        </div>   
    </div>
</div>
<div class="text-center row justify-content-center align-content-center background-img4 pt-5 pb-3">
    <div class="col-11 mb-4 mx-4" style="border: 3px solid rgb(51, 51, 51)">
        <div class="row mx-4 my-3 pt-1 pb-5" style="border-bottom: 2.5px solid rgb(51, 51, 51)">
            <div class="col dNone text-right">
                <h2 style="font-size: 6vw; font-family: 'UnifrakturCook', cursive" class="mt-5">MEAT</h2>
            </div>
            <div class="col">
                <h1 class="font-weight-bold mt-5">肉品小知識</h1>
                <img src="https://i.imgur.com/xiWgfQr.png" alt="logo icon" class="little-knowledge-icon">
            </div>
            <div class="col dNone text-left">
                <h2 style="font-size: 6vw; font-family: 'UnifrakturCook', cursive" class="mt-5">NEWS</h2>
            </div>
        </div>
        <div class="text-justify row justify-content-center align-items-center mx-4 py-3 mb-5 mt-4" style="border-top: 2.5px solid rgb(51, 51, 51)">
            <div class="my-2 newsBorder justify-content-center">
                <a href="https://blog.icook.tw/posts/141910" target="_blank">
                    <img src="https://i.imgur.com/04BDHvW.jpg" class="news">
                </a>
                <h4 class="my-2 font-weight-bold">如何挑選口感好的肉品？</h4>
                <p class="dNone">2020/03/27愛料理 精選輯</p>
                <h6 class="dNone font-weight-bold">雞肉、豬肉、牛肉以及魚肉等，採買時如何挑選
                    出口感好的肉品?挑部位?看外觀?一塊肉好不好吃，不能只從一個
                    面向做挑選，鑽研肉品資歷豐富的專家要告訴你，影響肉品的美味
                    與口感的關鍵
                    <a href="https://blog.icook.tw/posts/141910" target="_blank">
                        (詳見全文)
                    </a>              
                </h6>
            </div>
            <div class="m-2 newsBorder justify-content-center">
                <a href="https://food.ltn.com.tw/article/8265" target="_blank">
                    <img src="https://i.imgur.com/k5CWLw6.jpg" class="news">
                </a>
                <h4 class="my-2 font-weight-bold">冷藏肉、冷凍肉差在哪？</h4>
                <p class="dNone">記者／盧意2020/10/13 15:00</p>
                <h6 class="dNone font-weight-bold">台灣各地都在瘋「溫體牛」，
                    尤其最知名的台南美食「溫體牛肉湯」更是夯到不行，每天都有人清
                    晨就到場排隊，究竟溫體肉有什麼魅力？真的比一般肉品新鮮
                    美味？與冷藏肉、冷凍肉差在哪？
                    <a href="https://food.ltn.com.tw/article/8265" target="_blank">
                        (詳見全文)
                    </a>
                </h6>
            </div>
            <div class="my-2 newsBorder justify-content-center">
                <a href="https://www.luxurywatcher.com/zh-Hant/article/23355" target="_blank">
                    <img src="https://i.imgur.com/3fvmVGf.jpg" class="news">
                </a>
                <h4 class="my-2 font-weight-bold">一次看懂各國牛肉分級制度</h4>
                <p class="dNone">SEPT 30, 2019 by 世界高級品</p>
                <h6 class="dNone font-weight-bold">經常聽牛排愛好者提到「XX級牛
                    肉」，對牛排的種類和吃法如數家珍；然而對不懂牛肉分級的人來說，
                    可能連上牛排館點菜都有困難，因為相關的名詞和種類實在太多，容易
                    讓人挑得頭昏眼花。
                    <a href="https://www.luxurywatcher.com/zh-Hant/article/23355" target="_blank">
                        (詳見全文)
                    </a>
                </h6>
            </div>
        </div>
    </div>
</div> 
<router-link to="/location">
<div class="background-img5 justify-content-center align-content-center text-center row p-5">
    <div style="width: 100vw" class="shop-div">
        <img src="https://i.imgur.com/rVTwgku.png?1" alt="our shop" class="pl-2 shop">
    </div>
    <div style="width: 100vw" class="shop-div">
        <img src="https://i.imgur.com/I51bNCH.png" alt="店鋪一覽" class="pr-1 mt-3 shop">
    </div>
</div>
</router-link>
</div>
</template>

<script>
import $ from 'jquery';
import ShoppingCart from '@/components/ShoppingCartSidebar';
import Modal from '@/components/ShoppingModal';

export default {
    data() {
        return {
            isLoading: false,
            cart: {}
        };
    },
    components: {
        ShoppingCart,
        Modal
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
h6 {
    line-height: 1.5;
}

@media screen and (min-width: 992px) {
    .our-story-img-1 {
        width: 150px;
    }
    .our-story-img-2 {
        width: 200px
    }
    .little-knowledge-icon {
        width: 200px
    }
    .news {
        width: 380px;
        height: 230px;
    }
    .newsBorder {
        width: 380px; 
    }
}

@media screen and (max-width: 992px) and (min-width: 768px) {
    #video-introduction {
        display: none;
    }
    .shop {
        transform: scale(.6, 1);
    }
    .shop-div {
        transform: scale(1, .6);
        margin: -2.5rem 0 -2.5rem 0;
    }
    .our-story-img-1 {
        width: 140px;
    }
    .our-story-img-2 {
        width: 187px
    }
    .little-knowledge-icon {
        width: 187px
    }
    .news {
        width: 358.5px;
        height: 217px;
    }
    .newsBorder {
        width: 358.5px; 
    }
}

@media screen and (max-width: 768px) and (min-width: 576px) {
    #video-introduction {
        display: none;
    }
    .our-story-img-1 {
        width: 130px;
    }
    .our-story-img-2 {
        width: 173px
    }
    .little-knowledge-icon {
        width: 173px
    }
    .news {
        width: 380px;
        height: 230px;
    }
    .newsBorder {
        width: 380px; 
    }
    h1 {
        font-size: 24pt;
    }
}

@media screen and (max-width: 576px) {
    h1 {
        font-size: 20pt;
    }
    h2 {
        font-size: 16pt;
    }
    h4 {
        font-size: 13pt;
    }
    #video-introduction {
        display: none;
    }
    .dNone {
        display: none;
    }
    .our-story-img-1 {
        width: 100px;
    }
    .our-story-img-2 {
        width: 133px
    }
    .little-knowledge-icon {
        width: 133px
    }
    .news {
        width: 250px;
        height: 165px;
    }
    .newsBorder {
        width: 250px; 
    }
}

.background-img1 {
    background-image: url("https://i.imgur.com/iBUxi7B.jpg");
    height: 100vh;
    /* width: 100vw; */
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -999;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.background2 {
    background-color: black;
    /* width: 100vw; */
}

.meat {
    width: 100%;
}

.beef {
    animation: shine 4s linear infinite;
}

.chicken {
    animation: shine 4s 1s linear infinite;
}

.pork {
    animation:shine 4s 2s linear infinite;
}

.seafood {
    animation: shine 4s 3s linear infinite;
}

@keyframes shine{
  0%{opacity:1;}
  90%{opacity:0;}
  100%{
  color:#232323;}
} 

#video {
    width: 100%;
    height: 100%;
}

#video-introduction {
    background-color: rgb(200, 8, 60);
}

.background-img3 {
    background-image: url("https://i.imgur.com/0FwtUZL.jpg");
    /* width: 100vw; */
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -999;
}

.about {
    background-color: rgba(0, 0, 0, .5);
}

#bestSellerBox {
    position: relative;
}

#bestSeller {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.bestContainer {
    position: relative;
    width: 250px;
    height: 165px;
    left: 50%;
    transform: translateX(-50%);
}

.bestImg {
    display: block;
    width: 250px;
    height: 165px;
    transition: .5s ease;
    backface-visibility: hidden;
}

.bestMiddle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 165px;
    transition: .5s ease;
    border: 2.5px solid rgba(0, 0, 0, 0);
}

.bestContainer:hover .bestMiddle {
  width: 200px;
  height: 115px;
  border: 2.5px solid white;
}

.background-img4 {
    background-color: rgb(210, 210, 210);
    /* width: 100vw; */
    z-index: -999;
    color: rgb(51, 51, 51);
}

.news {
    filter: grayscale(100%);
}

.news:hover {
    filter: grayscale(20%) contrast(50%);
    transition: all .5s;
}

.background-img5 {
    background-image: url("https://i.imgur.com/S6pnXNZ.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -999;
}
</style>