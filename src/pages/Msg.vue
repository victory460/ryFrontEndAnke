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
      <div v-for="(item, index) in msgs" @click="goDetail(index, item)" style="width: 100%; margin-bottom:5px; background: #FFFFFF;">
        <msg-item :msg="item" :choose="choose" :index="index" :chooseIndex="chooseIndex" style="width: 100%;"></msg-item>
      </div>
    </ul>
    <p v-show="loading" style="display: flex; align-items: center; justify-content: center;">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>

    <div v-if="!choose" @click="deleteMsg()" class="" style="position: fixed; right: 20px; bottom: 20px;">
      <img style="width: 40px; height: 40px;" src="../assets/icon_msg_delete.png" alt="" />
    </div>

    <div v-if="choose" @click="deleteCancel()" class="" style="position: fixed; right: 20px; bottom: 20px;">
      <img style="width: 40px; height: 40px;" src="../assets/icon_cancel.png" alt="" />
    </div>


  </div>
</template>

<style media="screen">
html body {
  height: 100%;
  background: #f2f2f2;
}
</style>

<script>
import vueLoading from 'vue-loading-template'
import { MessageBox } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui';
import msgItem from '@/components/MsgItem'

export default {
  name: 'msg',
  components: {
    vueLoading,
    'msg-item': msgItem,
  },
  created() {
    console.log(">>>>>>created");
    this.$options.methods.loadMore();
  },
  data() {
    return {
      msg: '我的消息',
      choose: false,
      chooseIndex: -1,
      hasMore: true,
      page: 1,
      pageSize: 20,
      loading: false,
      msgs:[]
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    deleteMsg(){
      this.choose = true;
    },
    deleteCancel(){
      this.choose = false;
    },
    goDetail(index, msg){
      if(!this.choose){
        this.$store.commit("CURRENT_MSG", msg);
        this.$router.push({
          name: 'MsgDetail'
        })
      }else {
        this.chooseIndex = index;
        var vm = this;
        var params = new URLSearchParams();
        params.append("messageId", msg.id);
        vm.$store.dispatch("messagesDelete",params).then(response=>{
          console.log("&&&& vue="+response);
          var result = response.data;
          if(result == 200){
              console.log(result);
              vm.msgs.splice(vm.chooseIndex, 1);
              vm.chooseIndex = -1;
          }
        }, error=>{

        });
      }
    },
    loadMore() {
      if(this.hasMore){
        this.loading = true;
        var params = new URLSearchParams();
        params.append("page",this.page);
        var vm = this;
        vm.$store.dispatch("messagesByUser",params).then(response=>{
          console.log("&&&& vue="+response);
          vm.loading = false;
          vm.page = vm.page + 1;
          var result = response.data;
          if(result && result.code == 200){
            if(result.data.length != 10000){
              vm.hasMore = false;
            }
            // 存在有效数据
            var length=result.data.length;
            for(var index=0; index<length; index++){
              vm.msgs.push(result.data[index]);
            }
          }else {
            vm.loading = false;
            vm.hasMore = false;
          }
        }, error=>{

        });
      }
    },
    handleClose(){
        wx.closeWindow();
        window.close();
    }
  },
  watch: {

  }
}
</script>
