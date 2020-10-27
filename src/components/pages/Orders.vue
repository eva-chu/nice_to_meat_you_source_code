<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="150">購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th width="150">應付金額</th>
                <th width="130">是否付款</th>
                <th width="80">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in sortOrders" :key="index" 
            :class="{'text-secondary': !item.is_paid}">
                <td>{{ item.create_at | date }}</td>
                <td><span v-text="item.user.email" v-if="item.user"></span></td>
                <td>
                    <ul class="list-unstyled">
                        <li v-for="(product, i) in item.products" :key="i">
                            {{ product.product.title }} 數量:{{ product.qty }}
                            {{ product.product.unit }}
                        </li>
                    </ul>
                </td>
                <td class="text-right">{{ item.total | currency }}</td>
                <td>
                    <span v-if="item.is_paid" class="text-success">已付款</span>
                    <span v-else class="text-muted">尚未付款</span>
                </td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-outline-primary btn-sm"
                        @click="openModal(item)">編輯</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Pagination :pagesData="pagination" @current-page="getOrders"/>
    <!-- Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span>修改訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    <label for="create_at">購買時間</label>
                    <input type="date" class="form-control" id="create_at"
                        placeholder="請輸入購買時間"
                        v-model="create_at">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" id="email"
                        placeholder="請輸入Email"
                        v-model="tempOrder.user">
                </div>
                <div class="form-group">
                    <label for="total">應付金額</label>
                        <input type="number" class="form-control" id="total"
                        placeholder="請輸入折扣百分比"
                        v-model="tempOrder.total">
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                        id="is_paid" v-model="tempOrder.is_paid">
                        <label class="form-check-label" for="is_paid">
                        是否付款
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="form-group">
                    <label for="products">購買款項</label>
                    <ul class="list-unstyled">
                        <li v-for="(product, i) in tempOrder.products" :key="i">
                            <input type="text" class="form-control" id="products"
                            placeholder="請輸入標題"
                            v-model="product.product.title"> 數量:
                            <input type="number" class="form-control" id="products"
                            placeholder="請輸入數量"
                            v-model="product.qty">
                            <input type="text" class="form-control" id="products"
                            placeholder="請輸入單位"
                            v-model="product.product.unit">
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"
            @click="updateOrders()">確認</button>
        </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from './Pagination';

export default {
    data() {
        return {
            orders: [],
            tempOrder: {},
            create_at: new Date(),
            pagination: {},
            isLoading: false,
        };
    },
    components: {
        Pagination
    },
    watch: {
        create_at() {
            const vm = this;
            const timestamp = Math.floor(new Date(vm.create_at) / 1000);
            vm.tempOrder.create_at = timestamp;
        }
    },
    methods: {
        getOrders(page = 1) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.isLoading = false;
                console.log(response.data);
                vm.orders = response.data.orders;
                vm.pagination = response.data.pagination;
            });
        },
        updateOrders() {
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
            const vm = this;
            this.$http.put(api, { data: vm.tempOrder }).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                   $('#orderModal').modal('hide');
                   vm.getOrders(); 
                } else {
                   $('#orderModal').modal('hide');
                   vm.getOrders(); 
                   console.log('新增失敗');
                }
            });
        },
        openModal(item) {
            const vm = this;
            vm.tempOrder = Object.assign({}, item);
            const dateAndTime = new Date(vm.tempOrder.create_at * 1000).toISOString().split("T");
            vm.create_at = dateAndTime[0]; 
            $('#orderModal').modal('show');
        }
    },
    computed: {
        sortOrders() {
            const vm = this;
            let newOrders = [];
            if(vm.orders.length) {
                newOrders = vm.orders.sort((a, b) => {
                    const aIsPaid = a.is_paid ? 1 : 0;
                    const bIsPaid = b.is_paid ? 1 : 0;
                    return bIsPaid - aIsPaid;
                });
            };
            return newOrders;
        }
    },
    created() {
        this.getOrders();
    }
}
</script>