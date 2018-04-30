<template lang="html">
  <div class="" style="text-align:left">
    <mt-header fixed :title="msgTitle">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
    </mt-header>

    <p class="label">标题</p>
    <p class="content">{{msg.title}}</p>
    <p class="label">类型</p>
    <p class="content">{{msg.type}}</p>
    <p class="label">发送人</p>
    <p class="content">{{msg.from}}</p>
    <p class="label">内容</p>
    <p class="content">{{msg.content}}</p>
    <p class="label">时间</p>
    <p class="content">{{msg.time}}</p>

  </div>
</template>

<script>
export default {
  name: 'msgDetail',
  created(){
    this.msg = this.$store.getters.msg;
    if(this.msg.unread){
      // 未读
      var vm = this;
      var params = new URLSearchParams();
      params.append("messageId",vm.msg.id);
      vm.$store.dispatch("messagesRead",params).then(response=>{
        console.log("&&&& vue="+response);
        var result = response.data;
        if(result){
            console.log(result);
        }
      }, error=>{

      });
    }
  },
  data(){
    return {
      msgTitle: '我的消息',
      msg: {},
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    handleClose(){
      window.history.go(-1);
    }
  }
}
</script>

<style lang="css">
.label{
  font-size: 12px;
  color: #26a2ff;
  margin: 0px
}
.content{
  font-size: 12px;
  margin: 0px;
}
</style>
