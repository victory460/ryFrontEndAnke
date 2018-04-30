<template lang="html">
  <div>
    <mt-header fixed :title="msg">
    <!-- <router-link slot="left">
    </router-link> -->
        <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
        <img src="../assets/icon_save.png" slot="right" style="vertical-align:middle" @click="saveRecord" class="imgiconlarge" alt=""></img>
    </mt-header>

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">问题反馈照片</p>

    <task-img :imgInfos="imgInfos" :imgReadOnly="false"></task-img>

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">问题反馈信息</p>
    <div class="" style="float:left; width:100%">
      <mt-field label="问题名称" v-model="selectedFeedbackRecord.title" placeholder="请输入问题名称"></mt-field>
      <div class="" style="width:100%" @click="displayTypePop()">
        <mt-field label="问题类型" v-model="selectedFeedbackRecord.type" placeholder="点击选择问题类型" :readonly="true" :disableClear="true" :disabled="true"></mt-field>
      </div>
      <div class="" @click="displayDevicePop()">
        <mt-field label="设备名称" v-model="selectedFeedbackRecord.device" placeholder="设备名称" :readonly="true" :disableClear="true" :disabled="true"></mt-field>
      </div>
      <div class="" @click="openPicker()">
        <mt-field label="反馈时间" v-model="taskDateValue" placeholder="反馈时间" :readonly="true"></mt-field>
      </div>
      <mt-field label="备注信息" v-model="selectedFeedbackRecord.description" placeholder="请输入备注信息"></mt-field>
    </div>

    <!-- 选择问题类型界面 -->
    <mt-popup v-model="popupTypeVisible" position="right" style="width:100%; height:100%;"  popup-transition="popup-fade" :modal="true">
      <div class="" v-for="type in types" style="margin:20px;">
        <mt-button type="primary" @click="selectType(type.displayName, type.id)" style="margin:5px; float:left;">{{type.displayName}}</mt-button>
      </div>
    </mt-popup>

    <!-- 选择设备界面 -->
    <mt-popup v-model="popupDeviceVisible" position="right" style="width:100%; height:100%; overflow:auto;"  popup-transition="popup-fade" :modal="true">
      <div class="" v-for="device in devices" style="margin:20px;">
        <mt-button type="primary" @click="selectDevice(device.name, device.id)" style="margin:5px; float:left;">{{device.name}}</mt-button>
      </div>
    </mt-popup>

    <!-- 选择反馈时间界面 -->
    <mt-datetime-picker ref="picker" type="date" :value="taskDate" :startDate="startDate" :endDate="endDate"   year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-on:confirm="selectDate"></mt-datetime-picker>

    <mt-popup  v-model="showLoader" class="xxx" :model="true" position="right" style="width:100%; height:100%;background: rgba(0,0,0,0.5); "  popup-transition="popup-fade">
      <vue-loading style="margin-top:50%;" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </mt-popup>

  </div>
</template>

<script>
import vueLoading from 'vue-loading-template'
import { MessageBox } from 'mint-ui'
import taskImg from './TaskImg'

export default {
  name: 'new-task',
  created() {
    if(this.$route.params['fromTask']){
      this.fromTask = true;
    }
  },
  data() {
    return {
      fromTask: false,
      imgInfos: [],
      msg: '上传问题反馈',
      showLoader: false,
      popupDeviceVisible: false,
      popupTypeVisible: false,
      taskDateValue: "",
      taskDate: new Date(),

      startDate: new Date('2000-01-01'),
      endDate: new Date(),
      selectedDate: "",
      selectedFeedbackRecord: {
        device: "",
        deviceId: "",
        date: "",
        type: "",
        typeId: "",
        title: "",
        description: ""
      }
    };
  },
  computed: {
    devices() {
      return this.$store.getters.devices;
    },
    types() {
      return this.$store.getters.types;
    },
    engineers() {
      return this.$store.getters.engineers;
    },
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
    },
    engineers: function(val) {
      console.log(val);
    },
    types: function(val) {
      console.log(val);
    }
  },
  methods: {
    selectDevice(name, id) {
      this.popupDeviceVisible = false;
      this.selectedFeedbackRecord.device = name;
      this.selectedFeedbackRecord.deviceId = id;
    },
    selectType(name, id) {
      this.popupTypeVisible = false;
      this.selectedFeedbackRecord.type = name;
      this.selectedFeedbackRecord.typeId = id;
    },
    selectDate(val) {
      // var date = new Date(Date.parse(val));
      this.taskDateValue = val.getFullYear() + "年" + (val.getMonth() + 1) + "月" + val.getDate() + "日";
      this.selectedFeedbackRecord.date = val.getFullYear() + "年" + (val.getMonth() + 1) + "月" + val.getDate() + "日";
    },
    handleClose() {
      if(this.fromTask){
        window.history.go(-1);
      }else {
        wx.closeWindow();
        window.close();
      }
    },
    saveRecord(){
      // 先保存文字
      this.$options.methods.saveRecordText(this);
    },
    saveRecordText(vm){

      MessageBox.confirm('确定执行保存操作?').then(action => {
        // 保存文字
        vm.$store.commit("SAVE_RECORD_PROCESS_RESET"); //重置保存步骤
        vm.$store.commit("IMG_TYPE", vm.$store.getters.feedbackType);
        vm.$store.commit("PRODUCT_NAME", vm.selectedFeedbackRecord.device);

        var params = new URLSearchParams();
        params.append("ProductId",vm.selectedFeedbackRecord.deviceId);
        params.append("FeedbackTypeId",vm.selectedFeedbackRecord.typeId);
        params.append("FeedbackDate",vm.selectedFeedbackRecord.date);
        params.append("Title",vm.selectedFeedbackRecord.title);
        params.append("Description",vm.selectedFeedbackRecord.description);

        vm.$store.dispatch("newTask",params).then(response=>{
          console.log("&&&& vue="+response);
          vm.$store.commit("RECORD_ID", response.data.id);
          vm.$store.commit("SAVE_RECORD_PROCESS");
          vm.$store.commit("SAVE_RECORD", true); // 通知TaskImg执行保存操作
        }, error=>{
          vm.$store.commit("SAVE_RECORD_PROCESS");
        });
      });
    },
    displayTypePop(){
      this.popupTypeVisible=true;
    },
    displayDevicePop(){
      this.popupDeviceVisible=true;
    },
    displayEngineerPop(){
      this.popupEngineerVisible=true;
    },
    openPicker() {
      this.$refs.picker.open();
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
