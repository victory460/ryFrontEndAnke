<template lang="html">
  <div class="" style="position: relative">
    <mt-header fixed :title="msg">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
    </mt-header>

    <div class="" style="padding: 1vw">
      <div v-if="deliverStatus" class="item" @click="accessDeliver" style="margin: 1vw;" >
        <div class="">
          <div class="" style="width: 100%; position: relative; float: left;">
            <img src="../assets/icon_fahuo.png" style="width: 50px; height: 50px;"/>
          </div>
          <div>
            发货管理
          </div>
        </div>
      </div>
      <div v-if="installStatus" class="item" @click="accessInstall"  style="margin: 1vw;">
        <div class="">
          <div class="" style="width: 100%; position: relative; float: left;">
            <img src="../assets/icon_anzhuang.png" style="width: 50px; height: 50px;"/>
          </div>
          <div>
            安装管理
          </div>
        </div>
      </div>
      <div v-if="trainStatus" class="item" @click="accessTrain"  style="margin: 1vw;">
        <div class="">
          <div class="" style="width: 100%; position: relative; float: left;">
            <img src="../assets/icon_peixun.png" style="width: 50px; height: 50px;"/>
          </div>
          <div>
            培训管理
          </div>
        </div>
      </div>

      <div v-if="clientStatus" class="item" @click="accessClient"  style="margin: 1vw;">
        <div class="">
          <div class="" style="width: 100%; position: relative; float: left;">
            <img src="../assets/icon_kehu.png" style="width: 50px; height: 50px;"/>
          </div>
          <div>
            客户管理
          </div>
        </div>
      </div>
      <div v-if="registerCodeStatus" class="item" @click="accessSale" style="margin: 1vw;">
        <div class="">
          <div class="" style="width: 100%; position: relative; float: left;">
            <img src="../assets/icon_zhucema.png" style="width: 50px; height: 50px;"/>
          </div>
          <div>
            注册码管理
          </div>
        </div>
      </div>
    </div>

    <!-- <mt-button type="primary" style="width: 100%; height: 50px; margin-top: 30px;" @click="accessDeliver">发货管理</mt-button>
    <mt-button type="primary" style="width: 100%; height: 50px; margin-top: 30px;" @click="accessInstall">安装管理</mt-button>
    <mt-button type="primary" style="width: 100%; height: 50px; margin-top: 30px;" @click="accessTrain">培训管理</mt-button>
    <mt-button type="primary" style="width: 100%; height: 50px; margin-top: 30px;" @click="accessClient">客户管理</mt-button>
    <mt-button type="primary" style="width: 100%; height: 50px; margin-top: 30px;" @click="accessSale">注册码管理</mt-button> -->

  </div>
</template>


<style lang="css">
html{
  background: #F1F1F1;
}

.item {
        width: 31%;
        height: 31vw;
        background: #FFFFFF;
        float: left;
        margin: 3vw 0px;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: center; /*定义body的里的元素水平居中*/
    }

</style>

<script>

export default {
  name: 'myMenu',
  created(){

    var params = new URLSearchParams();
    var vm = this;
    this.$store.dispatch("allMyMenus", params).then(response=>{
      console.log("&&&& vue="+response.data);
      var result = response.data;

      if(result && result.length>0){
        for(var i=0, len = result.length; i < len; i++){
          console.log(result[i].menuOrder);
            // vm.status[result[i].menuOrder] = true;
          if(result[i].menuOrder == 0){
            vm.registerCodeStatus = true;
          }
          if(result[i].menuOrder == 1){
            vm.clientStatus = true;
          }
          if(result[i].menuOrder == 2){
            // vm.registerCodeStatus = true;
          }
          if(result[i].menuOrder == 3){
            vm.deliverStatus = true;
          }
          if(result[i].menuOrder == 4){
            vm.installStatus = true;
          }
          if(result[i].menuOrder == 5){
            vm.trainStatus = true;
          }
        }
      }

    }, error=>{
    });

    this.$store.dispatch('ossTokenInfo');
  },
  data(){
    return {
      msg: '我的菜单',
      deliverStatus: false,
      installStatus: false,
      trainStatus: false,
      clientStatus: false,
      registerCodeStatus: false,
      // status: [registerCodeStatus, clientStatus, false, deliverStatus, installStatus, trainStatus],
    }
  },
  computed: {

  },
  watch: {
    // status: function(){
    //   this.deliverStatus = this.status[3];
    //   this.installStatus = this.status[4];
    //   this.trainStatus = this.status[5];
    //   this.clientStatus = this.status[1];
    //   this.registerCodeStatus = this.status[0];
    // }
  },
  methods: {
    handleClose(){
        wx.closeWindow();
        window.close();
    },
    accessDeliver(){
      this.$router.push({name: 'Records', params: {id: 1}});
      // this.$router.push({path: 'records/1'});
    },
    accessInstall(){
      this.$router.push({name: 'Records', params: {id: 2}});
      // this.$router.push({path: 'records/2'});
    },
    accessTrain(){
      this.$router.push({name: 'Records', params: {id: 3}});
      // this.$router.push({path: 'records/3'});
    },
    accessClient(){
      this.$router.push({name: 'ClientRecord'});
    },
    accessSale(){
      this.$router.push({name: 'SaleRecord'});
    }
  }

}
</script>
