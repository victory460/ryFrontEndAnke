<template lang="html">

  <div class="">

  </div>


</template>

<script>
export default {
  name: 'empty',
  created(){
    console.log("********"+window.history.length);
    console.log("********"+window.history);

    if(this.$store.getters.closeWindow){
      window.history.go(-1);
    }else {
      this.$store.commit("UPDATE_CLOSE_WINDOW", true);
    }

    // if(this.$store.getters.closeWindow == true){
    //   console.log("xxxxxxxx");
    //   // WeixinJSBridge.call('closeWindow');
    //   wx.closeWindow();
    //   wx.closeWindow();
    //   wx.closeWindow();
    //   wx.closeWindow();
    //   wx.closeWindow();
    //   // window.history.go(-100);
    // }
  }
}
</script>

<style lang="css">
</style>
