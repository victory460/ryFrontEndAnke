<template lang="html">
  <div class="">
    <mt-header fixed :title="msg">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
      <img slot="right"  src="../assets/icon_add.png"style="vertical-align:middle" @click="newClient" class="imgiconlarge" alt=""></img>
    </mt-header>

    <ul
      style="margin: 0px; padding: 0px;"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div v-for="(record, index) in records" @click="accessDetail(record)" style="width: 100%; margin-bottom:5px; background: #FFFFFF;">

        <div class="" style="width: 98%; margin: 1%;">
          <div class="" style="width: 100%;">
            <div class="textchildlarge" style="width: 60%; float: left;text-align:left;"> {{record.name}}</div>
            <div class="textchildlarge" style="width: 40%; float: left;text-align:right;">{{record.status}}</div>
          </div>
          <div class="textchildsmall" style="width: 100%;">
              {{record.principal}}
          </div>
          <div class="textchildsmall" style="width: 100%;">
              {{record.state}}
          </div>
          <div class="textchildsmall" style="width:100%;">
            {{record.address}}
          </div>
        </div>

      </div>
    </ul>
    <p v-show="loading" style="display: flex; align-items: center; justify-content: center;">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>

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
      msg: '客户信息管理',
      page: 1,
      pageSize: 20,
      records: [],
      loading: false,
      hasMore: true,
    }
  },
  methods: {
    handleClose(){
      this.$router.go(-1);
    },
    loadMore(){
      if(this.hasMore){
        this.loading = true;
        var params = new URLSearchParams();
        params.append("page",this.page);
        params.append("size", this.pageSize);
        var vm = this;

        this.$store.dispatch("client", params).then(
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
              vm.loading = false;
              vm.page = vm.page + 1;
              if(vm.pageSize != len){
                vm.hasMore = false;
              }
            }else {
              vm.loading = false;
              vm.hasMore = false;
            }

          },
          error=>{

          }
        );
      }
    },
    accessDetail(val){
      var vm = this;
      this.$router.push({
        name: 'NewClient',
        params: {
          name: val.name,
          status: val.status,
          principal: val.principal,
          state: val.state,
          address: val.address,
          technician: val.technician,
          phone: val.phone,
          countryId: val.countryId,
          provinceId: val.provinceId,
          cityId: val.cityId,
          districtId: val.districtId,
          technician: val.technician,
          id: val.id,
        }
      })
    },
    newClient(){
      this.$router.push({
        name: 'NewClient'
      })
    },
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

.imgiconlarge {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

html,body{
  overflow:hidden;
  overflow-y:auto;
}
</style>
