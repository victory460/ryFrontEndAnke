<template lang="html">
  <div class="">
    <mt-header fixed :title="msg">
        <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
    </mt-header>

    <div class="" style="width:100%;">
      <mt-button @click="accessDeliver()" size="small">发货记录</mt-button>
      <mt-button @click="accessInstall()" size="small">安装记录</mt-button>
      <mt-button @click="accessTrain()" size="small">培训记录</mt-button>
      <mt-button @click="accessRecord()" size="small">问题记录</mt-button>
    </div>
    <div class="" style="width:96%; margin: 0px 2%; position: relative;" v-for="item in data">
      <text-item :name="item.name" :value="item.value"></text-item>
    </div>

  </div>

</template>

<script>
import TextItem from '@/components/TextItem';
export default {
  name: "device-detail",
  created() {
    // console.log(this.$store.state.product);
    var device = this.$store.getters.product;
    this.device = device;
    console.log(device);
    this.deviceId = device.id;
    this.data.push({name:"名称",value: device.name});
    this.data.push({name:"产品类型",value: device.productType!=null?device.productType.name:""});
    this.data.push({name:"设备ID",value: device.deviceId});
    this.data.push({name:"序列号",value: device.serialId});
    this.data.push({name:"球管序列号",value:  device.tube!=null?device.tube.serialNo:""});
    this.data.push({name:"高压序列号",value: device.hvg!=null?device.hvg.serialNo:""});
    this.data.push({name:"操作系统",value: device.operatingSystemType!=null?device.operatingSystemType.name:""});
    this.data.push({name:"计算机服务编码",value: device.computerSn});
    this.data.push({name:"RC版本",value: device.rcVersion});
    this.data.push({name:"SSC版本",value: device.sscVersion});
    this.data.push({name:"UI版本",value: device.uiVersion});
    this.data.push({name:"描述",value: device.description});
    this.data.push({name:"操作系统激活码",value: device.osActivationCode});
    this.data.push({name:"采集卡类型",value: device.acquisitionCardType});
    this.data.push({name:"密码狗截止日期",value: device.softDogDeadline.substr(0, 10)});
    this.data.push({name:"注册码截止日期",value: device.registrationCodeDeadline.substr(0, 10)});
    this.data.push({name:"生产日期",value: device.manufactureDate.substr(0, 10)});
    this.data.push({name:"产品状态",value: device.productState!=null?device.productState.displayName:""});
  },
  data() {
    return {
      msg: "设备详细信息",
      device: {},
      deviceId: "",
      data: [],
      xx: "xxxxx",
      jj: "xxxxxxxxx",
      // device: {},
    }
  },
  computed: {
    // device() {
    //   return this.$store.getters.product;
    // }
  },
  methods: {
    handleClose() {
      window.history.go(-1);
    },
    accessDeliver(){
      if(this.device.productState.displayName == "使用中" ||this.device.productState.displayName == "待安装"){
        this.$router.push({
         name: 'NewDeliver',
         params: {id: this.deviceId}
        })
      }else {
        alert("设备暂无发货记录");
      }
    },
    accessInstall(){
      if(this.device.productState.displayName == "使用中"){
        this.$router.push({
         name: 'NewInstall',
         params: {id: this.deviceId}
        })
      }else {
        alert("设备暂无安装记录");
      }
    },
    accessTrain(){
      if(this.device.trained){
        this.$router.push({
         name: 'NewTrain',
         params: {id: this.deviceId}
        })
      }else {
        alert("设备暂无培训记录。");
      }
    },
    accessRecord(){
      this.$router.push({
       name: 'Task',
       params: {id: this.deviceId}
      })
    }
  },
  components: {
    'text-item':TextItem
  }
}
</script>

<style lang="css">
body{
  margin: 0px;
  padding: 0px;
}
</style>
