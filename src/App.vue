<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
const WX_APP_ID = process.env.WX_APP_ID;
export default {
  name: 'app',
  created(){
    this.$store.dispatch('wxTest');

    var currentUrl = location.href;
    var url = currentUrl.split('#')[0];
    this.$store.dispatch('wxParams', url);
    // 如果要获取openid,需要取消下面的注释
    this.$options.methods.wxControl(this, currentUrl);
  },
  computed:{
    wxParams() {
      return this.$store.getters.wxParams
    },
    ossTokenInfo() {
      return this.$store.getters.ossTokenInfo;
    },
    ankeToken(){
      return this.$store.getters.ankeToken;
    }
  },
  watch: {
    ankeToken: function(val){
      console.log(val);
      this.$store.dispatch('ossTokenInfo');
      this.$store.dispatch('allTypes');
      this.$store.dispatch('allDevices');
      this.$store.dispatch('allEngineers');
      this.$store.dispatch("allFixTypes");
    },
    wxParams: function(val) {
      console.log(val);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: val.appId, // 必填，公众号的唯一标识
        timestamp: val.timestamp, // 必填，生成签名的时间戳
        nonceStr: val.nonceStr, // 必填，生成签名的随机串
        signature: val.signature, // 必填，签名，见附录1
        jsApiList: ['chooseImage', 'previewImage', 'uploadImage','downloadImage','getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    },
    ossTokenInfo: function(val) {
      console.log("------------"+val);
      var client = new OSS.Wrapper({
        region: val.region,
        //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
        accessKeyId: val.keyId,
        accessKeySecret: val.keySecret,
        stsToken: val.tsToken,
        bucket: val.bucket
      });
      this.$store.dispatch('ossClient', client)
    },
  },
  methods: {
    wxControl: function(vm, currentUrl){
      wx.ready(function(){
        var openId = vm.$options.methods.getCookie("openid");
        var params = vm.$options.methods.getPramsFromPath(currentUrl);

        if(openId == null || openId.length == 0){ // cookie中不存在openid
          var params2 = params.split("&");

          for(var index in params2){
            var param = params2[index];
            console.log(">>>>>>>param="+param);
            var key = param.split("=")[0];
            var value = param.split("=")[1];
            if(key == "openId"){
              openId = value;
            }
            console.log(">>>>>>>key="+key);
            console.log(">>>>>>>value="+value);
          }

          if(openId == null){
            // 路径中不存在openId,访问url跳转获取code->后台获取openid->访问此界面
            var urlparams = new URLSearchParams();
            urlparams.append("params", params);
            vm.$store.dispatch("wxOpenidUrl", urlparams).then(response=>{
              console.log(response.data);
              self.location=response.data; // 页面跳转
            }, error=>{});
          }else {
            vm.$options.methods.setCookie("openid", openId);
          }
          console.log(">>>>>openId="+openId);
        }

        if(openId!=null){
          // TODO 从url中获得参数name,通过$router访问
          vm.$store.commit("WX_OPENID", openId);
          var urlparams = new URLSearchParams();
          urlparams.append("openid", openId);
          vm.$store.dispatch("ankeToken", urlparams).then(response=>{
            console.log(response.data);
            var result = response.data;
            // router 页面跳转
            var name = null;
            var params2 = params.split("&");
            var routerParams = {};
            for(var index in params2){
              var param = params2[index];
              var key = param.split("=")[0];
              var value = param.split("=")[1];
              if(key == "name"){
                name = value;
              }
              routerParams[key] = value;
            }
            if(result.code == 300){
              if(name != "BindAnke"){
                alert("需要后台返回详细的描述，比如：此微信暂未绑定安科账户or此微信已申请绑定，等待审核。"+result.message);
                return ;
              }
            }
            console.log("路径="+ name);
            wx.ready(function(){
              vm.$router.push({
                name: name,
                params: routerParams
              })
            });
          }, error=>{
            console.log(error);
          });
        }
        // ["http://aaa04156.ngrok.io/index.html?openId=ogWFauGd9EVJaH87L_TbYkTYyP7o#/"]
        // ["http://aaa04156.ngrok.io/index.html?openId=ogWFauGd9EVJaH87L_TbYkTYyP7o#/task"]
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
    },
    setCookie: function(name,value){
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days*24*60*60*1000);
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    getCookie: function(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    },
    getPramsFromPath: function(path){
      var params1 = path.split("?")[1];
      var params2 = params1.split("#")[0];
      // var params3 = params2.split("&");
      // var openid = null;
      // var params=new Array();
      // for(var index in params3){
      //   var param = params3[index];
      //   var keyValue = param.split("=");
      //   var key = keyValue[0];
      //   var value = keyValue[1];
      //   var ele = {key:value};
      //   params.push(ele);
      // }
      return params2;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 45px;
}
</style>
