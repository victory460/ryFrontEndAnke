<template>
<div>
  <mt-header fixed :title="msg">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
  </mt-header>

  <div class="" style="position: relative; width: 100%; height: 35px; display: flex; align-items: center; margin-bottom: 10px;">
    <input v-model="searchValue" type="text" placeholder="请输入搜索内容" style="width: 100%; height: 25px; text-align: left; float: left; padding-left: 10px;" />
    <img @click="search" src="../assets/icon_search.png" style="width: 20px; height: 20px; position: absolute; right: 10px;"/>
  </div>

  <ul
    style="margin: 0px; padding: 0px;"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
    <div v-for="item in products" @click="goDetail(item)" style="width: 100%; margin-bottom:5px; background: #FFFFFF;">
      <device-item :device="item" style="width: 100%;"></device-item>
    </div>
  </ul>
  <p v-show="loading" style="display: flex; align-items: center; justify-content: center;">
    <mt-spinner type="fading-circle"></mt-spinner>
    加载中...
  </p>
  <mt-popup  v-model="showLoader" class="xxx" :model="true" position="right" style="width:100%; height:100%;background: rgba(0,0,0,0.5); "  popup-transition="popup-fade">
    <vue-loading style="margin-top:50%;" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
  </mt-popup>
</div>
</template>

<style>
html body {
  height: 100%;
  background: #f2f2f2;
  margin: 0px;
  padding: 0px;
}

</style>

<style>
</style>

<script type="text/javascript">
import vueLoading from 'vue-loading-template'
import { InfiniteScroll } from 'mint-ui';

import { MessageBox } from 'mint-ui'
import deviceItem from '@/components/DeviceItem'

export default {
  name: 'TaskList',
  props: [],
  components: {
     vueLoading,
     'device-item': deviceItem
   },
  data() {
    return {
      hasMore: true,
      loading: false,
      showLoader: false,
      page: 1,
      pageSize: 20,
      msg: "设备",
      products:[],
      searchValue: "",
    };
  },
  created() {
    // 从其他页面返回到此界面，也会执行created()方法
    this.$store.dispatch('ossTokenInfo');
    this.$options.methods.loadMore();
  },
  computed: {

  },
  watch: {

  },
  methods: {
    search(){
      this.page = 1;
      this.hasMore = true;
      this.products = [];
      this.$options.methods.loadMore(this);
    },
    keyPress(ev){
      alert(ev.keyCode);
    },
    goDetail(device){
      this.$store.commit("CURRENT_PRODUCT", device);
      this.$router.push({
        name: 'DeviceDetail'
      })
    },
    loadMore(vm) {
      if(!vm){
        vm = this;
      }
      if(vm.hasMore){
        vm.loading = true;
        vm.showLoader = true;
        var params = new URLSearchParams();
        params.append("page",vm.page);
        params.append("pageSize",vm.pageSize);
        params.append("search", vm.searchValue);
        vm.$store.dispatch("someProducts",params).then(response=>{
          console.log("&&&& vue="+response);
          vm.loading = false;
          vm.showLoader = false;
          vm.page = vm.page + 1;
          if(response.data){
            if(response.data.length != vm.pageSize){
              vm.hasMore = false;
            }
            // 存在有效数据
            var length=response.data.length;
            for(var index=0; index<length; index++){
              vm.products.push(response.data[index]);
            }
          }else {
            vm.showLoader = false;
            vm.loading = false;
            vm.hasMore = false;
          }
        }, error=>{

        });
      }
    },
    handleClose() {
      // this.$router.go(-1);
        wx.closeWindow();
        window.close();
      // wx.closeWindow();
      // window.close();
      // window.history.go(-100);
      // this.$router.push({
      //   name: 'Index'
      // })
    },
  },
  mounted() {
    // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    // console.log("mounted");
  }
}
</script>
