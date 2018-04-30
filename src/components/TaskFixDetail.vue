<template lang="html">
  <div>
    <mt-header fixed :title="msg">
    <!-- <router-link slot="left">
    </router-link> -->
    <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
    </mt-header>

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">设备维修照片</p>

    <task-img :imgInfos="imgInfos" :imgReadOnly="imgReadOnly"></task-img>

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">维修信息</p>
    <div class="" style="float:left; width:100%">
      <div class="" style="width:100%" @click="displayCompleteInfo(selectedFeedbackRecord.title, true)">
        <mt-field label="问题名称" v-model="selectedFeedbackRecord.title" placeholder="请输入问题名称" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <mt-field label="设备名称" v-model="selectedFeedbackRecord.device" placeholder="设备名称" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      <mt-field label="问题提交人" v-model="selectedFeedbackRecord.submitter" placeholder="问题提交人" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      <mt-field label="负责人" v-model="selectedFeedbackRecord.engineer" placeholder="负责人" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      <div class="" style="width:100%" @click="displayTypePop()">
        <mt-field label="维修类型" v-model="fixType" placeholder="点击选择维修类型" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="" @click="openPicker()">
        <mt-field label="维修时间" v-model="fixDateValue" placeholder="反馈时间" :readonly="readOnlyField"></mt-field>
      </div>
      <div class="" style="width:100%" @click="displayCompleteInfo(fixDescription, fixId!=-1)">
        <mt-field label="备注信息" v-model="fixDescription" placeholder="请输入备注信息" :readonly="fixId!=-1" :disableClear="fixId!=-1" :disabled="fixId!=-1"></mt-field>
      </div>

      <mt-button v-if="fixId==-1" type="primary" style="width:100%; margin-top:30px;" @click="saveRecord(false)">暂存</mt-button>
      <mt-button v-if="fixId==-1" type="danger" style="width:100%; margin-top:10px;" @click="saveRecord(true)">提交</mt-button>

    </div>

    <!-- 选择维修类型界面 -->
    <mt-popup v-model="popupTypeVisible" position="right" style="width:100%; height:100%;"  popup-transition="popup-fade" :modal="true">
      <div class="" v-for="type in fixTypes" style="margin:20px;">
        <mt-button type="primary" @click="selectType(type.displayName, type.id)" style="margin:5px; float:left;">{{type.displayName}}</mt-button>
      </div>
    </mt-popup>

    <!-- 选择维修时间界面 -->
    <mt-datetime-picker ref="picker" type="date" :value="fixDate" :startDate="startDate" :endDate="endDate"   year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-on:confirm="selectDate"></mt-datetime-picker>

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
import taskImg from './TaskImg'

export default {
  name: 'task-detail',
  created() {
    var id = this.$route.params['id'];
    var fixId = this.$route.params['fixId'];

    console.log("id="+id);
    console.log("fixId="+fixId);

    this.task = this.$store.getters.task;
    this.fix = this.$store.getters.fix;
    if(this.fix){
        this.imgInfos = this.fix.fixRecordReportsModels;
        this.fixDescription = this.fix.description;
        // this.fixDate = new Data(this.fix.maintenanceDate);
        this.fixDateValue = this.fix.maintenanceDate;
        this.fixType = this.fix.type;
        this.fixTypeId = this.fix.typeId;
        this.fixSubmitter = this.fix.submitter;
        this.fixSubmitterId = this.fix.submiterId;
    }
    if(this.task){
        console.log("*********"+this.task);
        this.selectedFeedbackRecord.id = this.task.id;
        this.selectedFeedbackRecord.title = this.task.title;
        this.selectedFeedbackRecord.date = this.task.feedbackDate;
        this.selectedFeedbackRecord.engineerId = this.task.principleId;
        this.selectedFeedbackRecord.engineer = this.task.principleName;
        this.selectedFeedbackRecord.deviceId = this.task.productId;
        this.selectedFeedbackRecord.device = this.task.productName;
        this.selectedFeedbackRecord.submitter = this.task.submiterName;
        this.selectedFeedbackRecord.submitterId = this.task.submiterId;

        // 设置参数TaskImg保存参数
        this.$store.commit("RECORD_ID", this.fixId);
        this.$store.commit("IMG_TYPE", this.$store.getters.fixType);
        this.$store.commit("PRODUCT_NAME", this.selectedFeedbackRecord.device);
    }


    if(fixId && fixId != -1){
      // 获取fix信息，展示信息,且不可操作
      console.log("fixId="+fixId);
      this.fixId = fixId;
      this.imgReadOnly = true;
    }
  },
  data() {
    return {
      select: this.$store.getters.selected,
      imgReadOnly: false,
      imgInfos: [],
      msg: '维修信息',
      showLoader: false,
      textCompleteInfo: '',
      popupTextVisible: false,
      popupTypeVisible: false,
      readOnlyField: true,
      task: {},
      fix: {},
      fixId: "-1",
      fixType: "",
      fixTypeId: "",
      fixDescription: "",
      fixSubmitter: "",
      fixSubmitterId: "",
      fixDateValue: "",
      fixDate: new Date(),
      startDate: new Date('2000-01-01'),
      endDate: new Date(),
      selectedDate: "",
      selectedFeedbackRecord: {
        id: "",
        device: "",
        deviceId: "",
        engineer: "",
        engineerId: "",
        submitter: "",
        submitterId: "",
        title: "",
      }
    };
  },
  computed: {
    fixTypes() {
      return this.$store.getters.fixTypes;
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
        this.$router.go(-2);
        // window.history.go(-1);
      }
    },
    engineers: function(val) {
      console.log(val);
    },
    fixTypes: function(val) {
      console.log(val);
    }
  },
  methods: {
    displayCompleteInfo(val, show){
      if(show){
        this.popupTextVisible = true;
        this.textCompleteInfo = val;
      }
    },
    selectType(name, id) {
      this.popupTypeVisible = false;
      this.fixType = name;
      this.fixTypeId = id;
    },
    selectDate(val) {
      // var date = new Date(Date.parse(val));
      this.fixDateValue = val.getFullYear() + "年" + (val.getMonth() + 1) + "月" + val.getDate() + "日";
    },
    handleClose() {
      this.$router.go(-1);
      // window.history.go(-1);
    },
    listRecords() {
      this.$router.push({
        path: '/new-record'
      })
    },
    newFixRecord() {

    },
    saveRecord(closed){

      if(this.fixId == -1){
        // 新建，先保存文字，在更新图片
        this.$store.commit("SAVE_RECORD_PROCESS_RESET"); //重置保存步骤
        this.$options.methods.saveRecordText(this, closed);
      }
      // 先保存图片，再保存文字，否则，图片不能删除、增加。
    },
    saveRecordText(vm, closed){
      // 保存文字
      var params = new URLSearchParams();
      params.append("fixId", -1);
      params.append("closed", closed);
      params.append("fixDate",vm.fixDateValue);
      params.append("description",vm.fixDescription);
      params.append("fixTypeId",vm.fixTypeId);
      params.append("feedbackRecordId",vm.selectedFeedbackRecord.id);

      vm.$store.dispatch("newFix",params).then(response=>{
        console.log("&&&&&&&&&"+response.data.id);
        vm.fixId = response.data.id;
        vm.$store.commit("SAVE_RECORD_PROCESS"); //通知文字已上传
        alert("文字上传成功");
        vm.$store.commit("RECORD_ID", vm.fixId);
        vm.$store.commit("PRODUCT_NAME", vm.selectedFeedbackRecord.device);
        vm.$store.commit("IMG_TYPE", vm.$store.getters.fixType);
        vm.$store.commit("SAVE_RECORD", true); // 通知TaskImg执行保存操作
      }, error=>{
        vm.$store.commit("SAVE_RECORD_PROCESS"); //通知文字已上传
        alert(response.data);
      });
    },
    deleteRecord(){
      // 执行删除操作
    },
    displayTypePop(){
      if(this.fixId=="-1")
      {
        this.popupTypeVisible=true;
      }
    },
    openPicker() {
      if(this.fixId=="-1"){
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
