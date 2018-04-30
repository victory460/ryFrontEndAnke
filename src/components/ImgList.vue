<template lang="html">
  <div class="">
    <div class="" v-for="(img, index) in imgs">
      <!-- <img :src="img" @click="showImg(index)" style="width:25%; float: left; height:25vw;"/> -->
      <div class="" style="width:25%; float: left; height:25vw; position: relative;">
        <img :src="img" @click="showImg(index)" style="width:auto; height:auto; max-width:100%; max-height:100%;"/>
        <img @click="deleteImg(index)" src="../assets/icon_delete.png" style="position: absolute; right:0px; top:0px; width:25px; height:25px;"/>
      </div>
    </div>
    <img src="../assets/icon_plus.png" style="width:25%; float: left; height:25vw;" @click="accessPhoneAlbum()"/>

    <div v-if="bigImgClick" style="position:absolute; top:0px; left:0px; width:100%; height:100%; align-items: center; display: flex; justify-content:center; background-color:#f6f8fa;">
      <img @click="closeBigImg()" :src="bigImgSrc" style="width:auto; height:auto; max-width:100%; max-height:100%;"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'img-list',
  created(){

  },
  data(){
    return{

    };
  },
  methods:{
    showImg(index) {
      this.bigImgClick = true;
      this.bigImgSrc = this.imgs[index];
    },
    closeBigImg(){
      this.bigImgClick = false;
    },
    deleteImg(index){
      this.imgs.splice(index, 1);
    },
    accessPhoneAlbum() {
      var vm = this;
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          console.log(localIds);
          // vm.imgs = localIds;
          for(var index in localIds){
            vm.imgs.push(localIds[index]);
          }
          // vm.imgs = imgs;
        }
      });
    },
  }
}
</script>

<style lang="css">
</style>
