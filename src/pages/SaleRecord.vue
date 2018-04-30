<template lang="html">
  <div class="">
    <mt-header fixed :title="msg">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
      <div class="" slot="right" style="width: 100%; display: flex; align-items: center;">
        <select v-model='expireValue' class='form-control' style="width:100%; float: left; font-size:10px; color: #ffffff;">
             <option v-for="option in options" v-bind:value="option.value">
               {{ option.text }}
             </option>
        </select>
        <img src="../assets/icon_dropdown_white.png" style="width: 20px; height: 20px; position: absolute; right: 10px;"/>
      </div>
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
      <div v-for="(record, index) in records" @click="goDetail(record)" style="width: 100%; margin-bottom:5px; background: #FFFFFF;">

        <div class="" style="width: 98%; margin: 1%;">
          <div class="" style="width: 100%;">
            <div class="textchildlarge" style="width: 50%; float: left;text-align:left;"> {{record.name}}</div>
            <div class="textchildlarge" style="width: 50%; float: left;text-align:right;">{{record.type}}</div>
          </div>
          <div class="textchildsmall" style="width: 100%;">
              序列号：{{record.serialId}}
          </div>
          <div class="textchildsmall" style="width: 100%;">
              设备号：{{record.deviceId}}
          </div>
          <div class="textchildsmall" style="width:100%;">
            注册码截止日期：{{record.deadlineDate}}
          </div>
          <div class="textchildsmall" style="width: 100%;">
            客户：{{record.client}}
          </div>
        </div>

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

<script>
import vueLoading from 'vue-loading-template'
import { MessageBox } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui';

export default {
  name: 'client-record',
  components: {
    vueLoading,
  },
  created(){
    this.$options.methods.loadMore();
  },
  data(){
    return{
      msg: '注册码管理',
      page: 1,
      pageSize: 20,
      records: [],
      loading: false,
      hasMore: true,
      searchValue: "",
      showLoader: false,
      options: [
                { text: '全部', value: '' , selected:false },
                { text: '已过期', value: '0', selected:true },
                { text: '3天后过期', value: '3', selected:false },
                { text: '7天后过期', value: '7', selected:false },
                { text: '15天后过期', value: '15', selected:false }
              ],
      expireValue: '',
    }
  },
  watch:{
    expireValue: function(val){
      console.log(val);
      this.page = 1;
      this.hasMore = true;
      this.records = [];
      this.$options.methods.loadMore(this);
    }
  },
  methods: {
    search(){
      this.page = 1;
      this.hasMore = true;
      this.records = [];
      this.$options.methods.loadMore(this);
    },
    handleClose(){
      this.$router.go(-1);
    },
    goDetail(record){
      this.$router.push({
        name: 'SaleRegisterDateDetail',
        params: {name: record.name, type: record.type, serialId: record.serialId, deviceId: record.deviceId, deadlineDate: record.deadlineDate, client: record.client}
      })
    },
    loadMore(vm){
      if(!vm){
        vm = this;
      }
      if(vm.hasMore){
        vm.loading = true;
        vm.showLoader = true;
        var params = new URLSearchParams();
        params.append("page",vm.page);
        params.append("size", vm.pageSize);
        params.append("expire", vm.expireValue);
        params.append("search", vm.searchValue);

        vm.$store.dispatch("sales", params).then(
          response=>{
            console.log(response.data);
            var data = response.data;
            if(data){
              var len = data.length;
              for(var i=0; i<len; i++){
                var record = data[i];
                console.log(record);
                vm.records.push(record);
              }
              vm.showLoader = false;
              vm.loading = false;
              vm.page = vm.page + 1;
              if(vm.pageSize != len){
                vm.hasMore = false;
              }
            }else {
              vm.showLoader = false;
              vm.loading = false;
              vm.hasMore = false;
            }

          },
          error=>{

          }
        );
      }

    }
  }
}
</script>

<style lang="css">
html{
    background: #EAEAEA;
}
body{
  margin: 0px;
}
.textchildsmall {
  margin: 0;
  font-size: 12px;
  color: #4A4A4A;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}


.textchildlarge {
  margin: 0;
  font-size: 15px;
  color: #4A4A4A;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}

html,body{
  overflow:hidden;
  overflow-y:auto;
}
</style>
