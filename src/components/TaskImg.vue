<template lang="html">
  <div>
    <div class="" v-for="(img, index) in imgs">
      <div class="" style="width:25%; float: left; height:25vw; position: relative; align-items: center; display: flex; justify-content:center;">
        <img :src="img" @click="showImg(index)" style="width:auto; height:auto; max-width:100%; max-height:100%;"/>
        <img v-if="!imgReadOnly" @click="deleteImg(index)" src="../assets/icon_delete.png" style="position: absolute; right:0px; top:0px; width:25px; height:25px;"/>
      </div>
    </div>
    <img v-if="!imgReadOnly" src="../assets/icon_plus.png" style="width:25%; float: left; height:25vw;" @click="accessPhoneAlbum"/>

    <!-- 全屏展示图片 -->
    <div v-if="bigImgClick" style="position:absolute; top:0px; left:0px; width:100%; height:100%; align-items: center; display: flex; justify-content:center; background-color:#f6f8fa; z-index:999">
      <img @click="closeBigImg()" :src="bigImgSrc" style="width:auto; height:auto; max-width:100%; max-height:100%;"/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'task-img',
  props: ['imgInfos', 'imgReadOnly'],
  created(){
    if(this.imgInfos){
      console.log("imgInfos="+this.imgInfos.length);
    }
    console.log("ossTokenInfo="+this.ossTokenInfo);
    // this.displayImgs();
    this.$options.methods.displayImgs(this);

  },data(){
    return {
      urls: [],
      oldUrls: [],
      imgs: [],
      newImgs: [],
      bigImgClick: false,
      bigImgSrc: "",
      wxUploadedImgs: [],

      imgType: "",
      productName: "",
      recordId: "-1"
    }
  },
  computed: {
    ossTokenInfo() {
      console.log("computed>>>>>ossTokenInfo");
      return this.$store.getters.ossTokenInfo;
    },
    ossClient() {
      return this.$store.getters.ossClient;
    },
    saveRecord() {
      return this.$store.getters.saveRecord;
    },
    task() {
      return this.$store.getters.task;
    },
    selected(){
      return this.$store.getters.selected;
    }
  },
  watch: {
    wxUploadedImgs: function(val){
      if(val.length>0 && val.length == this.newImgs.length){
        // 微信已经全部上传,通知后台可以获取微信图片，然后提交到oss
        this.$store.dispatch("ossUploadFiles", {mediaIds: val, type: this.imgType, recordId: this.recordId, productName: this.productName}).then(response=>{
          console.log("&&&& vue="+response);
          this.$store.commit("SAVE_RECORD_PROCESS");
        }, error=>{
          alert(response.data);
          console.log("&&&&& error ="+response);
          this.$store.commit("SAVE_RECORD_PROCESS");
        });
      }
    },
    ossTokenInfo: function(val){
      console.log("收到ossToken*******"+val);
      // this.displayImgs();
      this.$options.methods.displayImgs(this);
    },
    imgInfos: function(val){
      // this.displayImgs();
      this.$options.methods.displayImgs(this);
    },
    saveRecord: function(val){
      console.log("saveRecord"+val);
      if(val){
        this.$store.commit("SAVE_RECORD", false);
        this.imgType = this.$store.getters.imgType;
        this.productName = this.$store.getters.productName;
        this.recordId = this.$store.getters.recordId;
        console.log(">>>"+this.imgType);
        console.log(">>>"+this.productName);
        console.log(">>>"+this.recordId);

        // 执行保存图片操作
        this.$options.methods.saveRecordImgs(this);
      }
    }
  },
  methods: {
    displayImgs(vm) {
      // 展示图片
      console.log(">>>>"+vm.ossTokenInfo);
      console.log(">>>>"+vm.imgInfos);
      if (vm.ossTokenInfo!=null && vm.ossTokenInfo.region != null && vm.imgInfos != null) {
        var client = new OSS.Wrapper({
          region: vm.ossTokenInfo.region,
          //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
          accessKeyId: vm.ossTokenInfo.keyId,
          accessKeySecret: vm.ossTokenInfo.keySecret,
          stsToken: vm.ossTokenInfo.tsToken,
          bucket: vm.ossTokenInfo.bucket
        });

        console.log("******访问url");
        vm.oldUrls = [];
        vm.urls = [];
        vm.imgs = [];
        for (var i = 0, len = vm.imgInfos.length; i < len; i++) {
          vm.urls.push(vm.imgInfos[i].path);
          vm.oldUrls.push(vm.imgInfos[i].path);
          vm.imgs.push(client.signatureUrl(vm.imgInfos[i].path));
        }

      }
    },
    showImg(index) {
      this.bigImgClick = true;
      this.bigImgSrc = this.imgs[index];
    },
    deleteImg(index) {
      this.imgs.splice(index, 1);
      this.urls.splice(index, 1);
    },
    closeBigImg() {
      this.bigImgClick = false;
    },
    accessPhoneAlbum() {
      console.log("正在访问相册");
      // alert("尝试访问相册");
      var vm = this;
      wx.ready(function(){
        // alert("可以访问相册"+(9-vm.imgs.length));
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
      });
    },
    saveRecordImgs(vm){
      // 保存图片

      // 1 判断图片增删内容
      var newUrlsLen = vm.urls.length;
      var oldUrlsLen = vm.oldUrls.length;
      var deleteImgs = [];
      vm.newImgs = [];
      vm.wxUploadedImgs = [];
      var deleteImgIds = [];

      for(var i=0; i<oldUrlsLen; i++){
        var oldEle = vm.oldUrls[i];
        if(!vm.$options.methods.arrayContaints(vm.urls, oldEle)){
          deleteImgs.push(oldEle);
        }
      }

      var oldImgInfos = vm.imgInfos;
      for(var i=0, deleteLen=deleteImgs.length; i<deleteLen; i++){
        for(var j=0, oldLen=oldImgInfos.length; j<oldLen; j++){
          if(deleteImgs[i] == oldImgInfos[j].path){
            deleteImgIds.push(oldImgInfos[j].id);
          }
        }
      }

      for(var i=0; i<newUrlsLen; i++){
        var newEle = vm.urls[i];
        if(!vm.$options.methods.arrayContaints(vm.oldUrls, newEle)){
          vm.newImgs.push(newEle);
        }
      }

      console.log(vm.oldUrls);
      console.log(vm.newImgs);
      console.log(deleteImgs);

      // 删除
      // alert("删除"+deleteImgs.length+"张");
      if(deleteImgs.length>0){
        vm.$store.dispatch("ossDeleteFiles", {urls: deleteImgs, type: vm.imgType, recordIds: deleteImgIds}).then(response=>{
          console.log("&&&& vue="+response);
          vm.$store.commit("SAVE_RECORD_PROCESS");
          // alert(response.data);
        }, error=>{
          console.log("&&&&& error ="+response);
          vm.$store.commit("SAVE_RECORD_PROCESS");
          alert(response.data);
        });
      }else {
        vm.$store.commit("SAVE_RECORD_PROCESS");
      }

      // alert("上传"+vm.newImgs.length+"张");
      // 上传
      if(vm.newImgs.length >0){
        var vm = vm;
        for(var index in vm.newImgs){
          console.log(vm.newImgs[index]);
          wx.uploadImage({
              localId: vm.newImgs[index], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 0, // 默认为1，显示进度提示
              success: function (res) {
                  var serverId = res.serverId; // 返回图片的服务器端ID
                  // 上传到后台服务器
                  vm.wxUploadedImgs.push(serverId);
              }
          });
        }
      }else {
        vm.$store.commit("SAVE_RECORD_PROCESS");
      }

    },
    arrayContaints(array, ele){
      for(var i=0, len=array.length; i<len; i++){
        if(array[i] == ele){
          return true;
        }
      }
      return false;
    }
  }
}
</script>

<style lang="css">
</style>
