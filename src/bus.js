import Vue from 'vue';

const bus = new Vue();
Object.defineProperties(Vue.prototype, {
    $bus: {
      get() {
        return bus;
      },
    },
});
//Message
//vm.$bus.$emit('message:push', message, status);
//message(String): 訊息內容;
//status(String): Alert 的樣式;