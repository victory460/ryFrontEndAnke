<template lang="html">
  <div class="">
    <mt-header fixed :title="msg">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
    </mt-header>

    <ul
      style="margin: 0px; padding: 0px;"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div v-for="(item, index) in records" @click="goDetail(item)" style="width: 100%; margin-bottom:5px; background: #FFFFFF;">
        <record-item :record="item" :type=1 style="width: 100%;"></record-item>
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
import recordItem from '../components/RecordItem';

export default {
  name: 'Record',
  components: {
    vueLoading,
    recordItem,
  },
  created(){
    console.log(this.$route.params);
    var id = this.$route.params.id;
    if(id){
      this.id = id;
    }
    this.$options.methods.loadMore();
  },
  data(){
    return {
      id:1,
      msg: '发货记录',
      hasMore: true,
      page: 1,
      pageSize: 20,
      loading: false,
      records:[],
    }
  },
  computed: {

  },
  watch: {
    id:function(val){
      if(val == 1){
        this.msg = "发货记录";
      }else if(val == 2){
        this.msg = "安装记录";
      }else if(val == 3){
        this.msg = "培训记录";
      }
    }
  },
  methods: {
    goDetail(item){
      var methodName = "NewDeliver";
      if(this.id == 1){
        methodName = "NewDeliver";
      }else if(this.id == 2){
        methodName = "NewInstall";
      }else if(this.id == 3){
        methodName = "NewTrain";
      }

      this.$router.push({
        name: methodName,
        params: {id: item.productId}
      })
    },
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

        var methodName = "deliverByUser"
        if(this.id == 1){
          methodName = "deliverByUser";
        }else if(this.id == 2){
          methodName = "installByUser";
        }else if(this.id === 3){
          methodName = "trainByUser";
        }

        this.$store.dispatch(methodName, params).then(
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

    }
  }

}
</script>

<style lang="css">
  html{
      background: #EAEAEA;
      margin: 0px;
      padding: 0px;
  }
  body{
    margin: 0px;
    padding: 0px;
  }
  html,body{
    overflow:hidden;
    overflow-y:auto;
  }

</style>
