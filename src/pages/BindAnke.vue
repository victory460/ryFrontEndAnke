<template lang="html">

  <div class="">
    <mt-header fixed :title="msg">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
    </mt-header>


    <mt-field label="邮箱" v-model="email" placeholder="邮箱" :readonly="binded" :disableClear="binded" :disabled="binded"></mt-field>
    <!-- <mt-field label="问题名称" v-model="title" placeholder="请输入问题名称"></mt-field> -->

    <mt-button v-if="!binded" @click="bindAnke()" type="primary" style="margin-top:20px; width:100%;">绑定账户</mt-button>
    <mt-button v-if="binded" @click="unbindAnke()" type="primary" style="margin-top:20px; width:100%;">解除绑定</mt-button>

  </div>
</template>

<style media="screen">

</style>

<script>

export default {
  name: 'bind-anke',
  components: {
  },
  created() {
    console.log(">>>>>>created");

    this.openid = this.$store.getters.openId;
    this.email = this.$store.getters.email;
    this.ankeToken = this.$store.getters.ankeToken;
    this.$options.methods.updateBindStatus(this, this.ankeToken);

    // console.log(">>>>>openid="+openid);
    // var params = new URLSearchParams();
    // params.append("openid", openid);
    // var vm = this;
    // this.$store.dispatch("ankeToken", params).then(response=>{
    //   console.log(">>>>>>ankeToken="+response.data);
    //   var result = response.data;
    //   if(result.code == 200){
    //     vm.email = result.data.email;
    //     vm.ankeToken = result.data.ankeToken;
    //     vm.binded = true;
    //   }
    // }, error=>{
    //   console.log(">>>>>>>"+error);
    // });

  },
  data() {
    return {
      msg: '安科账户绑定',
      title: '',
      email: '',
      ankeToken: '',
      openid: '',
      // email: '',
      // email: this.$store.getters.email,
      // ankeToken: this.$store.getters.ankeToken,
      // openid: this.$store.getters.openId,
      binded: false, // 1:未绑定，2:等待确认，3:已成功绑定
    }
  },
  computed: {
    // openid(){
    //   return this.$store.getters.openId;
    // },
    // email(){
    //   return this.$store.getters.email;
    // },
    // ankeToken(){
    //   return this.$store.getters.ankeToken;
    // }
  },
  watch: {
    openid: function(val){

    },
    ankeToken: function(val){
      this.$options.methods.updateBindStatus(this, val);
    }
  },
  methods: {
    updateBindStatus(vm,val){
      if(val && val.length>0){
        vm.binded = true;
      }else {
        vm.binded = false;
      }
    },
    handleClose(){
      wx.closeWindow();
      window.close();
    },
    bindAnke(){
      console.log(">>>>>>"+this.email);
      var params = new URLSearchParams();
      params.append("email",this.email);
      params.append("openid",this.openid);
      var vm = this;
      this.$store.dispatch("bindAnke", params).then(response=>{
        console.log("&&&& vue="+response);
        var result = response.data;
        if(result.code == 200){
          alert(result.message);
        }else {
          alert(result.message);
        }
      }, error=>{
      });
    },
    unbindAnke(){
      alert("请联系安科系统管理员进行解绑操作");
    }
  },
  watch: {

  }
}
</script>
