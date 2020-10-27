// 引入 Vue
import Vue from 'vue';
// 引入 vee-validate - 需要的 Function
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure,
} from 'vee-validate';
// 引入 套件隨身包 vue-i18n zh_TW
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
// 引入預設驗證規則
import * as rules from 'vee-validate/dist/rules';

// 元件啟用 ValidationProvider // 驗證輸入字段
Vue.component('ValidationProvider', ValidationProvider);
// 元件啟用 ValidationObserver // 觀察 ValidationProvider 的驗證狀態
Vue.component('ValidationObserver', ValidationObserver);

// 把預設的驗證規則，配置到 rules 屬性使用
// https://logaretm.github.io/vee-validate/guide/rules.html#installing-all-rules
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// 設定語言環境
// https://logaretm.github.io/vee-validate/guide/localization.html#using-the-default-i18n
localize('zh_TW', zhTW);

// 設定驗證狀態的Class
// https://logaretm.github.io/vee-validate/guide/state.html#css-classes
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});