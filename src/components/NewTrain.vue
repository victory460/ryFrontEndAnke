<template lang="html">
  <div>
    <mt-header fixed :title="msg">
    <!-- <router-link slot="left">
    </router-link> -->
        <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
        <img v-if="!readOnly" src="../assets/icon_save.png" slot="right" style="vertical-align:middle" @click="saveRecord" class="imgiconlarge" alt=""></img>
    </mt-header>

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">培训照片</p>

    <task-img :imgInfos="imgInfos" :imgReadOnly="readOnly"></task-img>

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">培训信息</p>
    <div class="" style="float:left; width:100%">

      <div class="" @click="displayDevicePop()">
        <mt-field label="设备名称" v-model="selectedTrainRecord.productName" placeholder="设备名称" :readonly="true" :disableClear="true" :disabled="true"></mt-field>
      </div>
      <mt-field label="客户" v-model="selectedTrainRecord.clientName" placeholder="请输入问题名称" :readonly="true" :disableClear="true" :disabled="true"></mt-field>

      <div class="" @click="openPicker(1)">
        <mt-field label="开始时间" v-model="startDateValue" placeholder="开始时间" :readonly="true"></mt-field>
      </div>

      <div class="" @click="openPicker(2)">
        <mt-field label="结束时间" v-model="endDateValue" placeholder="结束时间" :readonly="true"></mt-field>
      </div>
      <mt-field label="培训内容" v-model="selectedTrainRecord.content" placeholder="请输入培训内容" :readonly="readOnly" :disableClear="readOnly" :disabled="readOnly"></mt-field>
      <mt-field label="培训师" v-model="selectedTrainRecord.trainer" placeholder="培训师" :readonly="readOnly" :disableClear="readOnly" :disabled="readOnly"></mt-field>

      <div class="" style="width: 100%;" @click="displayCompleteInfo(selectedTrainRecord.description)">
        <mt-field label="备注信息" v-model="selectedTrainRecord.description" placeholder="请输入备注信息" :readonly="readOnly" :disableClear="readOnly" :disabled="readOnly"></mt-field>
      </div>
    </div>

    <!-- 选择可发货设备界面 -->
    <mt-popup v-model="popupDeviceVisible" position="right" style="width:100%; height:100%; overflow:auto;"  popup-transition="popup-fade" :modal="true">
      <div class="" v-for="device in devices" style="margin:20px;">
        <mt-button type="primary" @click="selectDevice(device.productName, device.productId, device.saleId, device.clientName)" style="margin:5px; float:left;">{{device.productName}}</mt-button>
      </div>
    </mt-popup>

    <!-- 选择反馈时间界面 -->
    <mt-datetime-picker ref="installPicker" type="date" :value="startDate" :startDate="fixStartDate" :endDate="fixEndDate"   year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-on:confirm="selectInstallDate"></mt-datetime-picker>
    <mt-datetime-picker ref="deadlinePicker" type="date" :value="endDate" :startDate="fixStartDate" :endDate="fixEndDate"   year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-on:confirm="selectDeadlineDate"></mt-datetime-picker>

    <mt-popup  v-model="showLoader" class="xxx" :model="true" position="right" style="width:100%; height:100%;background: rgba(0,0,0,0.5); "  popup-transition="popup-fade">
      <vue-loading style="margin-top:50%;" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </mt-popup>

    <!-- 展示更多信息 -->
    <mt-popup v-model="popupTextVisible" position="right" style="width:100%; height:100%; overflow:auto;"  popup-transition="popup-fade" :modal="true">
      <div class="" @click="popupTextVisible=false" style="width:100%; height:100%; text-align:left;">
        {{textCompleteInfo}}
      </div>
    </mt-popup>


  </div>
</template>

<script>
import vueLoading from 'vue-loading-template'
import { MessageBox } from 'mint-ui'
import taskImg from './TaskImg'

export default {
  name: 'new-train',
  created() {
    console.log(">>>>>>>NewTrain");
    var vm = this;

    var id = this.$route.params.id;
    console.log(">>>>>>installId="+id);
    if(id!=null && id.length>3){
      this.id = id;
      this.readOnly = true;
      // 通过id获取数据，且不不可读
      var params = new URLSearchParams();
      params.append("productId", id);
      this.$store.dispatch("trainByProduct", params).then(response=>{
        var trainModel = response.data;
        console.log(trainModel);
        vm.imgInfos = trainModel.trainingRecordReports;
        vm.selectedTrainRecord = {
          startDate: "",
          endDate: "",
          description: trainModel.description,
          trainer: trainModel.trainer,
          content: trainModel.title,
          productId: trainModel.sale.product.id,
          productName: trainModel.sale.product.name,
          saleId: trainModel.sale.id,
          clientId: trainModel.sale.clientId,
          clientName: trainModel.sale.client.name
        }
        vm.startDateValue = trainModel.trainingBeginDate.substr(0, 4)+"年"+trainModel.trainingBeginDate.substr(5,2)+"月"+trainModel.trainingBeginDate.substr(8, 2)+"日";
        vm.endDateValue = trainModel.trainingEndDate.substr(0, 4)+"年"+trainModel.trainingEndDate.substr(5,2)+"月"+trainModel.trainingEndDate.substr(8, 2)+"日";
      }, error=>{
      });
    }else {
      this.$store.dispatch("allTrainProducts").then(response=>{
        console.log("&&&& vue="+response);
        vm.devices = response.data;
      }, error=>{
        console.log("&&&& error="+error);
      });
    }


  },
  data() {
    return {
      id: "",
      devices: [],
      imgInfos: [],
      msg: '上传培训信息',
      showLoader: false,
      popupDeviceVisible: false,

      startDateValue: "",
      startDate: new Date(),
      endDateValue: "",
      endDate: new Date(),

      fixStartDate: new Date('2000-01-01'),
      fixEndDate: new Date(),

      readOnly: false,

      popupTextVisible: false,
      textCompleteInfo: '',

      selectedTrainRecord: {
        startDate: "",
        endDate: "",
        description: "",
        trainer: "",
        content: "",
        productId: "",
        productName: "",
        saleId: "",
        clientId: "",
        clientName: ""
      }
    };
  },
  computed: {
    saveRecordProcess() {
      return this.$store.getters.saveRecordProcess;
    }
  },
  watch: {
    saveRecordProcess: function(val){
      console.log("showLoader="+val);
      this.showLoader = true;
      if(val == 3){
        this.showLoader = false;
        this.$options.methods.handleClose();
      }
    },
    devices: function(val) {
      console.log(val);
    }
  },
  methods: {
    displayCompleteInfo(val){
      if(this.readOnly){
        this.popupTextVisible = true;
        this.textCompleteInfo = val;
      }
    },
    selectDevice(name, id, saleId, clientName) {
      this.popupDeviceVisible = false;
      this.selectedTrainRecord.productName = name;
      this.selectedTrainRecord.productId = id;
      this.selectedTrainRecord.saleId = saleId;
      this.selectedTrainRecord.clientName = clientName;
    },
    selectInstallDate(val) {
      // var date = new Date(Date.parse(val));
      this.startDateValue = val.getFullYear() + "年" + (val.getMonth() + 1) + "月" + val.getDate() + "日";
      this.selectedTrainRecord.startDate = val.getFullYear() + "年" + (val.getMonth() + 1) + "月" + val.getDate() + "日";
    },
    selectDeadlineDate(val){
      this.endDateValue = val.getFullYear() + "年" + (val.getMonth() + 1) + "月" + val.getDate() + "日";
      this.selectedTrainRecord.endDate = val.getFullYear() + "年" + (val.getMonth() + 1) + "月" + val.getDate() + "日";
    },
    handleClose() {
      if(this.id.length>0){
        window.history.go(-1);
      }else {
        wx.closeWindow();
        window.close();
      }
    },
    saveRecord(){
      this.$store.commit("SAVE_RECORD_PROCESS_RESET"); //重置保存步骤
      // 先保存文字
      this.$options.methods.saveRecordText(this);
    },
    saveRecordText(vm){

      MessageBox.confirm('确定执行保存操作?').then(action => {
        // 保存文字
        vm.$store.commit("IMG_TYPE", vm.$store.getters.trainType);
        vm.$store.commit("PRODUCT_NAME", vm.selectedTrainRecord.productName);
// String departureDate, String description, String trainer, String productId, String saleId
        var params = new URLSearchParams();
        params.append("startDate",vm.selectedTrainRecord.startDate);
        params.append("endDate",vm.selectedTrainRecord.endDate);
        params.append("description",vm.selectedTrainRecord.description);
        params.append("content",vm.selectedTrainRecord.content);
        params.append("trainer",vm.selectedTrainRecord.trainer);
        params.append("productId",vm.selectedTrainRecord.productId);
        params.append("saleId",vm.selectedTrainRecord.saleId);

        vm.$store.dispatch("newTrain",params).then(response=>{
          console.log("&&&& vue="+response);
          vm.$store.commit("RECORD_ID", response.data);
          vm.$store.commit("SAVE_RECORD_PROCESS");
          vm.$store.commit("SAVE_RECORD", true); // 通知TaskImg执行保存操作
        }, error=>{
          vm.$store.commit("SAVE_RECORD_PROCESS");
        });
      });
    },
    displayTypePop(){
      if(!this.readOnly){
        this.popupTypeVisible=true;
      }
    },
    displayDevicePop(){
      if(!this.readOnly){
        this.popupDeviceVisible=true;
      }
    },
    displayEngineerPop(){
      if(!this.readOnly){
        this.popupEngineerVisible=true;
      }
    },
    openPicker(val){
      if(!this.readOnly){
        if(val == 1){
          this.$refs.installPicker.open();
        }else {
          this.$refs.deadlinePicker.open();
        }
      }
    }
  },
  components: {
     vueLoading,
     'task-img':taskImg
   }
}

wx.ready(function() {
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

});

wx.error(function(res) {
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});

wx.checkJsApi({
  jsApiList: ['chooseImage', 'previewImage', 'uploadImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  success: function(res) {

    // 以键值对的形式返回，可用的api值true，不可用为false

    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}

  }

});
</script>

<style lang="css">
.divparentlarge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
}

.imgiconlarge {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

</style>
