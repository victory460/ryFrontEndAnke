<template lang="html">
  <div>
    <mt-header fixed :title="msg">
    <!-- <router-link slot="left">
    </router-link> -->
    <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
    <!-- <mt-button src="../assets/icon_record" slot="right"></mt-button> -->
    <!-- <div class="divparentlarge" slot="right"> -->
      <img src="../assets/icon_record.png" slot="right" style="vertical-align:middle" @click="newRecord" class="imgiconlarge" alt=""></img>
      <img src="../assets/icon_save.png" slot="right" style="vertical-align:middle" @click="saveRecord" class="imgiconlarge" alt=""></img>
      <img src="../assets/icon_trashcan.png" slot="right" style="vertical-align:middle" @click="deleteRecord" class="imgiconlarge" alt=""></img>
    <!-- </div> -->
    <!-- <mt-button icon="more" slot="right" @click="more"></mt-button> -->
  </mt-header>

  <!-- <div class="" style="position:fixed;right:20px;top:20px; width:200px; height:200px;"> -->
    <!-- <mt-popup v-model="popupVisible" position="bottom" style="width:100%"  popup-transition="popup-fade" :modal="true">
      <mt-button style="width:100%; margin-bottom:5px" type="primary">
        <img src="../assets/icon_record.png" height="20" width="20" slot="icon">更新图片
      </mt-button>
      <mt-button style="width:100%; margin-bottom:5px" type="primary">
        <img src="../assets/icon_record.png" height="20" width="20" slot="icon">更新信息
      </mt-button>
      <mt-button style="width:100%;" type="danger">
        <img src="../assets/icon_record.png" height="20" width="20" slot="icon">删除记录
      </mt-button>
    </mt-popup> -->

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">问题反馈照片</p>

    <div class="" v-for="(img, index) in imgs">
      <!-- <img :src="img" @click="showImg(index)" style="width:25%; float: left; height:25vw;"/> -->
      <div class="" style="width:25%; float: left; height:25vw; position: relative; align-items: center; display: flex; justify-content:center;">
        <img :src="img" @click="showImg(index)" style="width:auto; height:auto; max-width:100%; max-height:100%;"/>
        <img @click="deleteImg(index)" src="../assets/icon_delete.png" style="position: absolute; right:0px; top:0px; width:25px; height:25px;"/>
      </div>
    </div>
    <img src="../assets/icon_plus.png" style="width:25%; float: left; height:25vw;" @click="accessPhoneAlbum()"/>

    <p style="float:left; padding:0px; margin:0px; width:100%; text-align:left">问题反馈信息</p>
    <div class="" style="float:left; width:100%">
      <mt-field label="问题名称" v-model="selectedFeedbackRecord.title" placeholder="请输入问题名称"></mt-field>
      <div class="" style="width:100%" @click="popupTypeVisible=true">
        <mt-field label="问题类型" v-model="selectedFeedbackRecord.type" placeholder="点击选择问题类型" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="" @click="popupDeviceVisible=true">
        <mt-field label="设备名称" v-model="selectedFeedbackRecord.device" placeholder="设备名称" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="">
        <mt-field label="问题提交人" v-model="selectedFeedbackRecord.submitter" placeholder="问题提交人" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="" @click="popupEngineerVisible=true">
        <mt-field label="负责人" v-model="selectedFeedbackRecord.engineer" placeholder="负责人" :readonly="readOnlyField" :disableClear="readOnlyField" :disabled="readOnlyField"></mt-field>
      </div>
      <div class="" @click="openPicker()">
        <mt-field label="反馈时间" v-model="selectedFeedbackRecord.date" placeholder="反馈时间" :readonly="readOnlyField"></mt-field>
      </div>
      <mt-field label="备注信息" v-model="selectedFeedbackRecord.description" placeholder="请输入备注信息"></mt-field>
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

    <!-- 全屏展示图片 -->
    <div v-if="bigImgClick" style="position:absolute; top:0px; left:0px; width:100%; height:100%; align-items: center; display: flex; justify-content:center; background-color:#f6f8fa;">
      <img @click="closeBigImg()" :src="bigImgSrc" style="width:auto; height:auto; max-width:100%; max-height:100%;"/>
    </div>

    <mt-popup  v-model="showLoader" class="xxx" :model="true" position="right" style="width:100%; height:100%;background: rgba(0,0,0,0.5); "  popup-transition="popup-fade">
      <vue-loading style="margin-top:50%;" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </mt-popup>

  </div>
</template>

<script>
import vueLoading from 'vue-loading-template'

export default {
  name: 'task-detail',
  created() {
    var id = this.$route.params['id'];
    console.log(id);
    this.$store.dispatch('taskById', id);
    // var vals = [];
    // vals.push("http://url1");
    // vals.push("http://url2");
    // this.$store.dispatch("wxUploadFiles", vals);
  },
  data() {
    return {
      showLoader: false,
      msg: '查看问题反馈',
      popupVisible: false,
      imgs: [],
      oldUrls: [],
      urls: [],
      newImgs: [],
      deleteImgs: [],
      wxUploadedImgs: [],
      bigImgClick: false,
      bigImgSrc: "",
      popupDeviceVisible: false,
      popupTypeVisible: false,
      popupEngineerVisible: false,
      readOnlyField: true,
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
    ossTokenInfo() {
      return this.$store.getters.ossTokenInfo;
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
    ossClient() {
      return this.$store.getters.ossClient;
    },
  },
  watch: {
    showLoader: function(val){
      console.log("showLoader="+val);
    },
    wxUploadedImgs: function(val){
      if(val.length>0 && val.length == this.newImgs.length){
        // 微信已经全部上传,通知后台可以获取微信图片，然后提交到oss
        this.showLoader = true;
        this.$store.dispatch("ossUploadFiles", {mediaIds: val, type: 46, recordId: this.selectedFeedbackRecord.id, productName: this.selectedFeedbackRecord.device}).then(response=>{
          console.log("&&&& vue="+response);
          alert(response.data);
          this.showLoader = false;
        }, error=>{
          this.showLoader = false;
          alert(response.data);
          console.log("&&&&& error ="+response);
        });
      }
    },
    ossTokenInfo:function(val){
      console.log("收到ossToken*******"+val);
      this.accessImgs();
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

      console.log("*********"+this.selectedFeedbackRecord.imgs.length);
      console.log("accessImgs");
      this.accessImgs();
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
    accessImgs() {
      if (this.ossTokenInfo.region != null && this.selectedFeedbackRecord.imgs.length > 0) {
        var client = new OSS.Wrapper({
          region: this.ossTokenInfo.region,
          //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
          accessKeyId: this.ossTokenInfo.keyId,
          accessKeySecret: this.ossTokenInfo.keySecret,
          stsToken: this.ossTokenInfo.tsToken,
          bucket: this.ossTokenInfo.bucket
        });
        console.log("******访问url");
        this.imgs = [];
        this.urls = [],
        this.oldUrls = [];
        var len = 0;
        console.log(">>>>>"+this.selectedFeedbackRecord.imgs.length);
        for (var i = 0, len = this.selectedFeedbackRecord.imgs.length; i < len; i++) {
          var url = this.selectedFeedbackRecord.imgs[i].path;
          console.log(url);
          this.urls.push(url);
          this.oldUrls.push(url);
          this.imgs.push(client.signatureUrl(url));
        }
      }
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
    openPicker() {
      this.$refs.picker.open();
    },
    handleClose() {
      window.history.go(-1);
    },
    newRecord() {
      this.$router.push({
        path: '/new-record'
      })
    },
    showImg(index) {
      this.bigImgClick = true;
      this.bigImgSrc = this.imgs[index];
    },
    closeBigImg() {
      this.bigImgClick = false;
    },
    deleteImg(index) {
      this.imgs.splice(index, 1);
      this.urls.splice(index, 1);
    },
    accessPhoneAlbum() {
      var vm = this;
      wx.chooseImage({
        count: 9-vm.imgs.length, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          console.log(localIds);
          for (var index in localIds) {
            vm.imgs.push(localIds[index]);
            vm.urls.push(localIds[index]);
          }
        }
      });
    },
    accessTypes() {
      this.popupTypeVisible = true;
    },
    more() {
      this.popupVisible = true
    },
    saveRecord(){

      // 保存图片
      var oldUrlsLen = this.oldUrls.length;
      var newUrlsLen = this.urls.length;
      this.newImgs = [];
      this.deleteImgs = [];
      var deleteImgIds = [];

      for(var i=0; i<oldUrlsLen; i++){
        var oldEle = this.oldUrls[i];
        if(!this.$options.methods.arrayContaints(this.urls, oldEle)){
          this.deleteImgs.push(oldEle);
        }
      }

      for(var i=0; i<newUrlsLen; i++){
        var newEle = this.urls[i];
        if(!this.$options.methods.arrayContaints(this.oldUrls, newEle)){
          this.newImgs.push(newEle);
        }
      }
      var oldImgInfos = this.selectedFeedbackRecord.imgs;
      for(var i=0, deleteLen=this.deleteImgs.length; i<deleteLen; i++){
        for(var j=0, oldLen=oldImgInfos.length; j<oldLen; j++){
          if(this.deleteImgs[i] == oldImgInfos[j].path){
            deleteImgIds.push(oldImgInfos[j].id);
          }
        }
      }

      console.log(this.oldUrls);
      console.log(this.newImgs);
      console.log(this.deleteImgs);

      this.wxUploadedImgs = [];
      var vm = this;

      if(this.deleteImgs.length>0){
        vm.showLoader = true;
        vm.$store.dispatch("ossDeleteFiles", {urls: this.deleteImgs, type: 46, recordIds: deleteImgIds}).then(response=>{
          vm.showLoader = false;
          alert(response.data);
          console.log("&&&& vue="+response);
        }, error=>{
          vm.showLoader = false;
          alert(response.data);
          console.log("&&&&& error ="+response);
        });
      }

      this.showLoader = true;
      for(var index in this.newImgs){
        wx.uploadImage({
            localId: this.newImgs[index], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                // 上传到后台服务器
                vm.wxUploadedImgs.push(serverId);
            }
        });
      }

      // 保存文字
      var updateFeedbackModel = {};
      updateFeedbackModel.FeedbackRecordId = this.selectedFeedbackRecord.id;
      updateFeedbackModel.ProductId = this.selectedFeedbackRecord.deviceId;
      updateFeedbackModel.FeedbackTypeId = this.selectedFeedbackRecord.typeId;
      updateFeedbackModel.FeedbackDate = this.selectedFeedbackRecord.date;
      updateFeedbackModel.PrincipalId = this.selectedFeedbackRecord.engineerId;
      updateFeedbackModel.Title = this.selectedFeedbackRecord.title;
      updateFeedbackModel.Description = this.selectedFeedbackRecord.description;

      console.log(updateFeedbackModel);
      // {FeedbackRecordId: this.selectedFeedbackRecord.id,
      //     ProductId: this.selectedFeedbackRecord.deviceId,
      //     FeedbackTypeId: this.selectedFeedbackRecord.typeId,
      //     FeedbackDate: this.selectedFeedbackRecord.date,
      //     PrincipalId: this.selectedFeedbackRecord.engineerId,
      //     Title: this.selectedFeedbackRecord.title,
      //     Description: this.selectedFeedbackRecord.description}

      var params = new URLSearchParams();
      params.append("FeedbackRecordId",this.selectedFeedbackRecord.id);
      params.append("ProductId",this.selectedFeedbackRecord.deviceId);
      params.append("FeedbackTypeId",this.selectedFeedbackRecord.typeId);
      params.append("FeedbackDate",this.selectedFeedbackRecord.date);
      params.append("PrincipalId",this.selectedFeedbackRecord.engineerId);
      params.append("Title",this.selectedFeedbackRecord.title);
      params.append("Description",this.selectedFeedbackRecord.description);

      this.showLoader = true;
      this.$store.dispatch("allocateFeedbackRecord",params
      ).then(response=>{
        console.log("&&&& vue="+response);
        alert(response.data);
        this.showLoader = false;
      }, error=>{
        this.showLoader = false;
        // console.log("&&&&& error ="+response);
      });


    },
    deleteRecord(){

    },
    arrayContaints(array, ele){
      for(var i=0, len=array.length; i<len; i++){
        if(array[i] == ele){
          return true;
        }
      }
      return false;
    }
  },
  components: {
     vueLoading
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
