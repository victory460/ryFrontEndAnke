<template lang="html">
  <div>
    <mt-header fixed :title="msg">
    <!-- <router-link slot="left">
    </router-link> -->
        <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
        <!-- 未处理 -->
        <img v-if="select == 1" src="../assets/icon_record.png" slot="right" style="vertical-align:middle" @click="fixRecords" class="imgiconlarge" alt=""></img>
        <img v-if="select == 1" src="../assets/icon_save.png" slot="right" style="vertical-align:middle" @click="saveRecord" class="imgiconlarge" alt=""></img>
        <img v-if="select == 1 && !task.reOpen" src="../assets/icon_trashcan.png" slot="right" style="vertical-align:middle" @click="deleteRecord" class="imgiconlarge" alt=""></img>
        <!-- 已分配 -->
        <img v-if="select == 2" src="../assets/icon_record.png" slot="right" style="vertical-align:middle" @click="fixRecords" class="imgiconlarge" alt=""></img>
        <img v-if="select == 2" src="../assets/icon_add.png" slot="right" style="vertical-align:middle" @click="newFixRecord" class="imgiconlarge" alt=""></img>
        <!-- 已处理 -->
        <img v-if="select == 3" src="../assets/icon_record.png" slot="right" style="vertical-align:middle" @click="fixRecords" class="imgiconlarge" alt=""></img>
        <img v-if="select == 3" src="../assets/icon_withdraw.png" slot="right" style="vertical-align:middle" @click="withdrawRecord" class="imgiconlarge" alt=""></img>
        <img v-if="select == 3" src="../assets/icon_close.png" slot="right" style="vertical-align:middle" @click="closeRecord" class="imgiconlarge" alt=""></img>
        <!-- 已关闭 -->
        <img v-if="select == 4" src="../assets/icon_record.png" slot="right" style="vertical-align:middle" @click="fixRecords" class="imgiconlarge" alt=""></img>
        <img v-if="select == 4" src="../assets/icon_reopen.png" slot="right" style="vertical-align:middle" @click="reopenRecord" class="imgiconlarge" alt=""></img>

    </mt-header>

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">问题反馈照片</p>

    <task-img :imgInfos="imgInfos" :imgReadOnly="imgReadOnly"></task-img>

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">问题反馈信息</p>
    <div class="" style="float:left; width:100%">
      <div class="" style="width:100%" @click="displayCompleteInfo(selectedFeedbackRecord.title)">
        <mt-field label="问题名称" v-model="selectedFeedbackRecord.title" placeholder="请输入问题名称" :readonly="select != 1" :disableClear="select != 1" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="" style="width:100%" @click="displayTypePop()">
        <mt-field label="问题类型" v-model="selectedFeedbackRecord.type" placeholder="点击选择问题类型" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="" @click="displayDevicePop()">
        <mt-field label="设备名称" v-model="selectedFeedbackRecord.device" placeholder="设备名称" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="">
        <mt-field label="问题提交人" v-model="selectedFeedbackRecord.submitter" placeholder="问题提交人" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="" @click="displayEngineerPop()">
        <mt-field label="负责人" v-model="selectedFeedbackRecord.engineer" placeholder="负责人" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="" @click="openPicker()">
        <mt-field label="反馈时间" v-model="selectedFeedbackRecord.date" placeholder="反馈时间" :readonly="readOnlyField"></mt-field>
      </div>
      <div class="" style="width:100%" @click="displayCompleteInfo(selectedFeedbackRecord.description)">
        <mt-field label="备注信息" v-model="selectedFeedbackRecord.description" placeholder="请输入备注信息" :readonly="select != 1" :disableClear="select != 1" :disabled="readOnlyField"></mt-field>
      </div>
    </div>

    <!-- 选择问题类型界面 -->
    <mt-popup v-model="popupTypeVisible" position="right" style="width:100%; height:100%;"  popup-transition="popup-fade" :modal="true">
      <div class="" v-for="type in types" style="margin:20px;">
        <mt-button type="primary" @click="selectType(type.displayName, type.id)" style="margin:5px; float:left;">{{type.displayName}}</mt-button>
      </div>
    </mt-popup>

    <!-- 选择负责人界面 -->
    <mt-popup v-model="popupEngineerVisible" position="right" style="width:100%; height:100%; overflow:auto;"  popup-transition="popup-fade" :modal="true">
      <div class="" v-for="engineer in engineers" style="margin:20px;">
        <mt-button type="primary" @click="selectEngineer(engineer.name, engineer.id)" style="margin:5px; float:left;">{{engineer.name}}</mt-button>
      </div>
    </mt-popup>

    <!-- 选择设备界面 -->
    <mt-popup v-model="popupDeviceVisible" position="right" style="width:100%; height:100%; overflow:auto;"  popup-transition="popup-fade" :modal="true">
      <div class="" v-for="device in devices" style="margin:20px;">
        <mt-button type="primary" @click="selectDevice(device.name, device.id)" style="margin:5px; float:left;">{{device.name}}</mt-button>
      </div>
    </mt-popup>

    <!-- 选择反馈时间界面 -->
    <mt-datetime-picker ref="picker" type="date" :value="selectedFeedbackRecord.date" :startDate="startDate" :endDate="endDate"   year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-on:confirm="selectDate"></mt-datetime-picker>

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
  name: 'task-detail',
  created() {
    var id = this.$route.params['id'];
    console.log(id);
    this.$store.dispatch('taskById', id);
  },
  data() {
    return {
      select: this.$store.getters.selected,
      imgInfos: [],
      msg: '查看问题反馈',
      textCompleteInfo: '',
      showLoader: false,
      popupVisible: false,
      popupTextVisible: false,
      popupDeviceVisible: false,
      popupTypeVisible: false,
      popupEngineerVisible: false,
      readOnlyField: true,
      startDate: new Date('2000-01-01'),
      endDate: new Date(),
      selectedDate: "",
      selectedFeedbackRecord: {
        reOpen: false,
        id: "",
        device: "",
        deviceId: "",
        engineer: "",
        engineerId: "",
        submitter: "",
        submitterId: "",
        date: "",
        type: "",
        typeId: "",
        title: "",
        description: "",
        imgs: []
      }
    };
  },
  computed: {
    imgReadOnly(){
      if(this.select == 1){
        return false;
      }else if(this.select == 2){
        return true;
      }else if(this.select == 3){
        return true;
      }else {
        return true;
      }
    },
    task() {
      return this.$store.getters.task;
    },
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

      if(val == 2){
        // 删除和上传 执行结束，可以 文字保存
        this.$options.methods.saveRecordText(this);
      }

      if(val == 3){
        this.showLoader = false;
      }
    },
    task: function(val) {
      console.log("*********"+val);
      this.selectedFeedbackRecord.id = val.id;
      this.selectedFeedbackRecord.title = val.title;
      this.selectedFeedbackRecord.description = val.description;
      this.selectedFeedbackRecord.date = val.feedbackDate;
      this.selectedFeedbackRecord.type = val.type;
      this.selectedFeedbackRecord.typeId = val.typeId;
      this.selectedFeedbackRecord.engineerId = val.principleId;
      this.selectedFeedbackRecord.engineer = val.principleName;
      this.selectedFeedbackRecord.deviceId = val.productId;
      this.selectedFeedbackRecord.device = val.productName;
      this.selectedFeedbackRecord.submitter = val.submiterName;
      this.selectedFeedbackRecord.submitterId = val.submiterId;
      this.selectedFeedbackRecord.imgs = val.feedbackRecordReportsModels;
      this.selectedFeedbackRecord.reOpen = val.reOpen;

      this.imgInfos = val.feedbackRecordReportsModels;

      // 设置参数TaskImg保存参数
      this.$store.commit("IMG_TYPE", this.$store.getters.feedbackType);
      this.$store.commit("PRODUCT_NAME", this.selectedFeedbackRecord.device);
      this.$store.commit("RECORD_ID", this.selectedFeedbackRecord.id);
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
    displayCompleteInfo(val){
      this.popupTextVisible = true;
      this.textCompleteInfo = val;
    },
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
    selectEngineer(name, id) {
      this.popupEngineerVisible = false;
      this.selectedFeedbackRecord.engineer = name;
      this.selectedFeedbackRecord.engineerId = id;
    },
    selectDate(val) {
      // var date = new Date(Date.parse(val));
      this.selectedFeedbackRecord.date = val.getFullYear() + "年" + (val.getMonth() + 1) + "月" + val.getDate() + "日";
    },
    handleClose() {
      // window.history.go(-1);
      this.$router.go(-1);
    },
    fixRecords() {
      var id = this.$route.params['id'];
      this.$router.push({
        name: 'FixRecords',
        params: {id: id}
      })
    },
    newFixRecord() {
      var id = this.$route.params['id'];
      this.$store.commit("CURRENT_FIX", null);
      this.$router.push({
        name: 'TaskFixDetail',
        params: {id: id, fixId: -1}
      })
    },
    withdrawRecord(){
      var vm = this;
      MessageBox.confirm('确定退回此记录吗?').then(action => {

        var params = new URLSearchParams();
        params.append("FeedbackRecordId",this.selectedFeedbackRecord.id);
        params.append("ProductId",this.selectedFeedbackRecord.deviceId);
        params.append("FeedbackTypeId",this.selectedFeedbackRecord.typeId);
        params.append("FeedbackDate",this.selectedFeedbackRecord.date);
        params.append("PrincipalId",this.selectedFeedbackRecord.engineerId);
        params.append("Title",this.selectedFeedbackRecord.title);
        params.append("Description",this.selectedFeedbackRecord.description);

        vm.$store.dispatch("unProcessFeedbackRecord",params).then(response=>{
          console.log("&&&& vue="+response);
          vm.$store.commit("SAVE_RECORD_PROCESS"); //重置保存步骤
          // alert(response.data);
          vm.$router.go(-1);
          // window.location.replace(document.referrer);
          // window.history.go(-1);
        }, error=>{
          this.$store.commit("SAVE_RECORD_PROCESS"); //重置保存步骤
        });

      });
    },
    closeRecord(){
      var vm = this;
      MessageBox.confirm('确定关闭此记录吗?').then(action => {

        var params = new URLSearchParams();
        params.append("FeedbackRecordId",this.selectedFeedbackRecord.id);
        params.append("ProductId",this.selectedFeedbackRecord.deviceId);
        params.append("FeedbackTypeId",this.selectedFeedbackRecord.typeId);
        params.append("FeedbackDate",this.selectedFeedbackRecord.date);
        params.append("PrincipalId",this.selectedFeedbackRecord.engineerId);
        params.append("Title",this.selectedFeedbackRecord.title);
        params.append("Description",this.selectedFeedbackRecord.description);

        vm.$store.dispatch("closeFeedbackRecord",params).then(response=>{
          console.log("&&&& vue="+response);
          vm.$store.commit("SAVE_RECORD_PROCESS"); //重置保存步骤
          // alert(response.data);
          vm.$router.go(-1);
          // window.location.replace(document.referrer);
          // window.history.go(-1);
        }, error=>{
          this.$store.commit("SAVE_RECORD_PROCESS"); //重置保存步骤
        });
      });
    },
    reopenRecord(){
      var vm = this;
      MessageBox.confirm('确定重新打开此记录吗?').then(action => {

        var params = new URLSearchParams();
        params.append("FeedbackRecordId",this.selectedFeedbackRecord.id);
        params.append("ProductId",this.selectedFeedbackRecord.deviceId);
        params.append("FeedbackTypeId",this.selectedFeedbackRecord.typeId);
        params.append("FeedbackDate",this.selectedFeedbackRecord.date);
        params.append("PrincipalId",this.selectedFeedbackRecord.engineerId);
        params.append("Title",this.selectedFeedbackRecord.title);
        params.append("Description",this.selectedFeedbackRecord.description);

        vm.$store.dispatch("openFeedbackRecord",params).then(response=>{
          console.log("&&&& vue="+response);
          vm.$store.commit("SAVE_RECORD_PROCESS"); //重置保存步骤
          // alert(response.data);
          vm.$router.go(-1);
          // window.location.replace(document.referrer);
          // window.history.go(-1);
        }, error=>{
          this.$store.commit("SAVE_RECORD_PROCESS"); //重置保存步骤
        });
      });
    },
    saveRecord(){

      MessageBox.confirm('确定执行保存操作?').then(action => {
        this.$store.commit("SAVE_RECORD_PROCESS_RESET"); //重置保存步骤
        this.$store.commit("SAVE_RECORD", true); // 通知TaskImg执行保存操作
        // 先保存图片，再保存文字，否则，图片不能删除、增加。
      });

    },
    saveRecordText(vm){
      // 保存文字
      var params = new URLSearchParams();
      params.append("FeedbackRecordId",vm.selectedFeedbackRecord.id);
      params.append("ProductId",vm.selectedFeedbackRecord.deviceId);
      params.append("FeedbackTypeId",vm.selectedFeedbackRecord.typeId);
      params.append("FeedbackDate",vm.selectedFeedbackRecord.date);
      params.append("PrincipalId",vm.selectedFeedbackRecord.engineerId);
      params.append("Title",vm.selectedFeedbackRecord.title);
      params.append("Description",vm.selectedFeedbackRecord.description);

      vm.$store.dispatch("allocateFeedbackRecord",params).then(response=>{
        console.log("&&&& vue="+response);
        vm.$store.commit("SAVE_RECORD_PROCESS"); //重置保存步骤
        // alert(response.data);
        vm.$router.go(-1);
        // window.history.go(-1);
        // window.location.replace(document.referrer);
        // window.history.go(-1);
      }, error=>{
        vm.$store.commit("SAVE_RECORD_PROCESS"); //重置保存步骤
      });
    },
    deleteRecord(){
      // 执行删除操作
      var vm = this;
      if(vm.selectedFeedbackRecord.reOpen){
        alert("重开记录不允许删除");
      }else {
        MessageBox.confirm('确定执行删除操作?').then(action => {
          var params = new URLSearchParams();
          params.append("id", vm.selectedFeedbackRecord.id);
          vm.$store.dispatch("removeTask",params).then(response=>{
            // alert(response.data);
            vm.$router.go(-1);
            // window.location.replace(document.referrer);
            // window.history.go(-1);
          }, error=>{
          });
        });

      }
    },
    displayTypePop(){
      if(this.select == 1){
        this.popupTypeVisible=true;
      }
    },
    displayDevicePop(){
      if(this.select == 1){
        this.popupDeviceVisible=true;
      }
    },
    displayEngineerPop(){
      if(this.select == 1){
        this.popupEngineerVisible=true;
      }
    },
    openPicker() {
      if(this.select == 1){
        this.$refs.picker.open();
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
