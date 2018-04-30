<template lang="html">

  <div class="" style="width: 100%;">
    <mt-header fixed :title="msg">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
      <div class=""  slot="right" >
        <img v-if="!readonly" src="../assets/icon_read.png"style="vertical-align:middle" @click="exchangeReadModel" class="imgiconlarge" alt=""></img>
        <img v-if="readonly" src="../assets/icon_edit.png"style="vertical-align:middle" @click="exchangeReadModel" class="imgiconlarge" alt=""></img>
        <img v-if="!readonly" src="../assets/icon_save.png"style="vertical-align:middle" @click="saveRecord" class="imgiconlarge" alt=""></img>
        <img v-if="!readonly" src="../assets/icon_trashcan.png"style="vertical-align:middle" @click="deleteRecord" class="imgiconlarge" alt=""></img>
      </div>

    </mt-header>

    <mt-field label="名称" v-model="name" placeholder="请输入名称" :readonly="readonly" :disableClear="readonly" :disabled="readonly"></mt-field>
    <mt-field label="负责人" v-model="principal" placeholder="请输入负责人" :readonly="readonly" :disableClear="readonly" :disabled="readonly"></mt-field>
    <mt-field label="联系方式" v-model="phone" placeholder="请输联系方式" :readonly="readonly" :disableClear="readonly" :disabled="readonly"></mt-field>
    <mt-field label="技师" v-model="technician" placeholder="请输入技师" :readonly="readonly" :disableClear="readonly" :disabled="readonly"></mt-field>

    <div class="" @click="accessCountries">
      <mt-field label="国家" placeholder="" v-model="selectedCountry" :readonly="readonly" :disableClear="readonly" :disabled="readonly"></mt-field>
    </div>

    <CitySelect v-if="selectedCountry == '中国'" style="width: 100%; position: relative;" :prov2="province" :city2="city" :district2="district" :readonly="readonly"></CitySelect>
    <mt-field label="地址" placeholder="请输入详细地址" v-model="address" :readonly="readonly" :disableClear="readonly" :disabled="readonly"></mt-field>

    <mt-popup v-model="popupContriesVisible" position="right" style="width:100%; height:100%; overflow:auto;"  popup-transition="popup-fade" :modal="true">
      <div class="" v-for="country in contries" style="margin:20px;">
        <mt-button v-if="country['name'] != selectedCountry" type="primary" @click="selectCountry(country['name'])" style="margin:5px; float:left;">{{country['code']+country['name']}}</mt-button>
        <mt-button v-if="country['name'] == selectedCountry" type="danger" @click="selectCountry(country['name'])" style="margin:5px; float:left;">{{country['code']+country['name']}}</mt-button>
      </div>
    </mt-popup>

  </div>

</template>

<style lang="css">
  html{
    margin: 0px;
    padding: 0px;
  }
  body{
    margin: 0px;
    padding: 0px;
  }
  .imgiconlarge {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
</style>


<script>
import CitySelect from '../components/CitySelect'
import { MessageBox } from 'mint-ui'

export default {
  name: 'NewClient',
  components: {CitySelect},
  created(){
    var state = this.$route.params.state;
    console.log(state);
    if(state){
      var states = state.split(",");
      var country = states[0];
      var province = states[1];
      var city = states[2];
      var district = states[3];
      if(country){
        this.selectedCountry = country;
      }
      if(province){
        this.province = province;
      }
      if(city){
        this.city = city;
      }
      if(district){
        this.district = district;
      }
    }else {
      this.readonly = false;
    }
  },
  data(){
    return {
      readonly: true,
      province: '',
      city: '',
      district: '',
      name: this.$route.params.name,
      principal: this.$route.params.principal,
      address: this.$route.params.address,
      phone: this.$route.params.phone,
      technician: this.$route.params.technician,
      countryId: this.$route.params.countryId,
      provinceId: this.$route.params.provinceId,
      cityId: this.$route.params.cityId,
      districtId: this.$route.params.districtId,
      clientId: this.$route.params.id,

      popupContriesVisible: false,
      selectedCountry: '中国',
      msg: '客户编辑',
      contries: dataContries2,
    }
  },
  methods: {
    exchangeReadModel(){
      if(this.readonly){
        this.readonly = false;
      }else {
        this.readonly = true;
      }
    },
    handleClose(){
      this.$router.go(-1);
    },
    accessCountries(){
      if(!this.readonly){
        this.popupContriesVisible = true;
      }
    },
    selectCountry(val){
      this.selectedCountry = val;
      this.popupContriesVisible = false;
    },
    deleteRecord(){
      console.log(this.clientId);
      var vm = this;
      MessageBox.confirm('确定执行删除操作?').then(action => {
        var params = new URLSearchParams();
        params.append("id", vm.clientId);

        vm.showLoader = true;

        vm.$store.dispatch("removeClient", params).then(response=>{
          vm.showLoader = false;
          console.log(response.data);
          if(response.data.ReturnStatus){
            var msg = response.data.ReturnMessage[0];
            if(msg){
              alert(msg);
            }
            window.history.go(-1);
          }
        }, error=>{
          vm.showLoader = false;
        });
      });

    },
    saveRecord(){
      var vm = this;

      var areaInfo = this.$store.getters.areaInfo;
      console.log(areaInfo);

      MessageBox.confirm('确定执行保存操作?').then(action => {
        var params = new URLSearchParams();
        params.append("address", vm.address);
        params.append("district", areaInfo.district);
        params.append("city", areaInfo.city);
        params.append("province", areaInfo.prov);
        params.append("country", vm.selectedCountry);
        params.append("name", vm.name);
        params.append("principal", vm.principal);
        params.append("phone", vm.phone);
        params.append("technician", vm.technician);
        if(vm.clientId){
          params.append("id", vm.clientId);
        }else {
          params.append("id", "0");
        }

        vm.showLoader = true;

        vm.$store.dispatch("newClient", params).then(response=>{
          vm.showLoader = false;
          console.log(response.data);
          if(response.data.ReturnStatus){
            var msg = response.data.ReturnMessage[0];
            if(msg){
              alert(msg);
            }
            window.history.go(-1);
          }
        }, error=>{
          vm.showLoader = false;
        });
      });
    }
  }
}
var dataContries2 = [{"name":"中国","code":"CN"},{"name":"阿尔巴尼亚","code":"AL"},{"name":"阿尔及利亚","code":"DZ"},{"name":"萨摩亚","code":"AS"},{"name":"安道尔共和国","code":"AD"},{"name":"安哥拉","code":"AO"},{"name":"安圭拉","code":"AI"},{"name":"南极洲","code":"AQ"},{"name":"安提瓜和巴布达","code":"AG"},{"name":"阿根廷","code":"AR"},{"name":"亚美尼亚","code":"AM"},{"name":"阿鲁巴","code":"AW"},{"name":"澳大利亚","code":"AU"},{"name":"奥地利","code":"AT"},{"name":"阿塞拜疆","code":"AZ"},{"name":"巴哈马","code":"BS"},{"name":"巴林","code":"BH"},{"name":"孟加拉国","code":"BD"},{"name":"巴巴多斯","code":"BB"},{"name":"白俄罗斯","code":"BY"},{"name":"比利时","code":"BE"},{"name":"伯利兹城","code":"BZ"},{"name":"贝宁","code":"BJ"},{"name":"百慕大","code":"BM"},{"name":"不丹","code":"BT"},{"name":"玻利维亚","code":"BO"},{"name":"波斯尼亚和黑塞哥维那","code":"BA"},{"name":"博茨瓦纳","code":"BW"},{"name":"布维岛","code":"BV"},{"name":"巴西","code":"BR"},{"name":"英属印度洋领地","code":"IO"},{"name":"文莱达鲁萨兰国","code":"BN"},{"name":"保加利亚","code":"BG"},{"name":"布基纳法索","code":"BF"},{"name":"布隆迪","code":"BI"},{"name":"柬埔寨","code":"KH"},{"name":"喀麦隆","code":"CM"},{"name":"佛得角","code":"CV"},{"name":"开曼群岛","code":"KY"},{"name":"中非共和国","code":"CF"},{"name":"乍得","code":"TD"},{"name":"智利","code":"CL"},{"name":"阿富汗","code":"AF"},{"name":"圣延岛","code":"CX"},{"name":"科科斯群岛","code":"CC"},{"name":"哥伦比亚","code":"CO"},{"name":"科摩罗","code":"KM"},{"name":"刚果","code":"CG"},{"name":"刚果民主共和国","code":"ZR"},{"name":"库克群岛","code":"CK"},{"name":"哥斯达黎加","code":"CR"},{"name":"科特迪瓦","code":"CI"},{"name":"克罗地亚","code":"HR"},{"name":"古巴","code":"CU"},{"name":"塞浦路斯","code":"CY"},{"name":"捷克","code":"CZ"},{"name":"丹麦","code":"DK"},{"name":"吉布提","code":"DJ"},{"name":"多米尼克国","code":"DM"},{"name":"多米尼加共和国","code":"DO"},{"name":"东帝汶","code":"TP"},{"name":"厄瓜多尔","code":"EC"},{"name":"埃及","code":"EG"},{"name":"萨尔瓦多","code":"SV"},{"name":"赤道几内亚","code":"GQ"},{"name":"厄立特里亚国","code":"ER"},{"name":"爱沙尼亚","code":"EE"},{"name":"埃塞俄比亚","code":"ET"},{"name":"福克兰群岛","code":"FK"},{"name":"法罗群岛","code":"FO"},{"name":"斐济","code":"FJ"},{"name":"芬兰","code":"FI"},{"name":"法国","code":"FR"},{"name":"法国大都会","code":"FX"},{"name":"法属圭亚那","code":"GF"},{"name":"法属玻里尼西亚","code":"PF"},{"name":"法国南部地区","code":"TF"},{"name":"加蓬","code":"GA"},{"name":"冈比亚","code":"GM"},{"name":"格鲁吉亚","code":"GE"},{"name":"德国","code":"DE"},{"name":"加纳","code":"GH"},{"name":"直布罗陀","code":"GI"},{"name":"希腊","code":"GR"},{"name":"格陵兰","code":"GL"},{"name":"格林纳达","code":"GD"},{"name":"瓜德罗普岛","code":"GP"},{"name":"关岛","code":"GU"},{"name":"危地马拉","code":"GT"},{"name":"几内亚","code":"GN"},{"name":"几内亚比绍","code":"GW"},{"name":"圭亚那","code":"GY"},{"name":"海地","code":"HT"},{"name":"赫德岛和麦克唐纳群岛","code":"HM"},{"name":"洪都拉斯","code":"HN"},{"name":"香港","code":"HK"},{"name":"匈牙利","code":"HU"},{"name":"冰岛","code":"IS"},{"name":"印度","code":"IN"},{"name":"印度尼西亚","code":"ID"},{"name":"伊朗","code":"IR"},{"name":"伊拉克","code":"IQ"},{"name":"爱尔兰","code":"IE"},{"name":"英国属地曼岛","code":"IM"},{"name":"以色列","code":"IL"},{"name":"意大利","code":"IT"},{"name":"牙买加","code":"JM"},{"name":"日本","code":"JP"},{"name":"约旦","code":"JO"},{"name":"哈萨克","code":"KZ"},{"name":"肯尼亚","code":"KE"},{"name":"吉尔巴斯","code":"KI"},{"name":"科威特","code":"KW"},{"name":"吉尔吉斯","code":"KG"},{"name":"老挝","code":"LA"},{"name":"拉脱维亚","code":"LV"},{"name":"黎巴嫩","code":"LB"},{"name":"莱索托","code":"LS"},{"name":"利比里亚","code":"LR"},{"name":"利比亚","code":"LY"},{"name":"列支敦士登","code":"LI"},{"name":"立陶宛","code":"LT"},{"name":"卢森堡","code":"LU"},{"name":"澳门地区","code":"MO"},{"name":"马达加斯加","code":"MG"},{"name":"马拉维","code":"MW"},{"name":"马来西亚","code":"MY"},{"name":"马尔代夫","code":"MV"},{"name":"马里","code":"ML"},{"name":"马尔他","code":"MT"},{"name":"马绍尔群岛","code":"MH"},{"name":"马提尼克岛","code":"MQ"},{"name":"毛里塔尼亚","code":"MR"},{"name":"毛里求斯","code":"MU"},{"name":"马约特","code":"YT"},{"name":"墨西哥","code":"MX"},{"name":"密克罗尼西亚","code":"FM"},{"name":"摩尔多瓦","code":"MD"},{"name":"摩纳哥","code":"MC"},{"name":"外蒙古","code":"MN"},{"name":"黑山","code":"MNE"},{"name":"蒙特色纳","code":"MS"},{"name":"摩洛哥","code":"MA"},{"name":"莫桑比克","code":"MZ"},{"name":"缅甸","code":"MM"},{"name":"那米比亚","code":"NA"},{"name":"瑙鲁","code":"NR"},{"name":"尼泊尔","code":"NP"},{"name":"荷兰","code":"NL"},{"name":"荷兰安的列斯群岛","code":"AN"},{"name":"新加勒多尼亚","code":"NC"},{"name":"新西兰","code":"NZ"},{"name":"尼加拉瓜","code":"NI"},{"name":"尼日尔","code":"NE"},{"name":"尼日利亚","code":"NG"},{"name":"纽鄂岛","code":"NU"},{"name":"诺福克岛","code":"NF"},{"name":"朝鲜","code":"KP"},{"name":"北马里亚纳群岛","code":"MP"},{"name":"挪威","code":"NO"},{"name":"阿曼","code":"OM"},{"name":"巴基斯坦","code":"PK"},{"name":"帛琉","code":"PW"},{"name":"巴勒斯坦","code":"PS"},{"name":"巴拿马","code":"PA"},{"name":"巴布亚新几内亚","code":"PG"},{"name":"巴拉圭","code":"PY"},{"name":"秘鲁","code":"PE"},{"name":"菲律宾共和国","code":"PH"},{"name":"皮特凯恩岛","code":"PN"},{"name":"波兰","code":"PL"},{"name":"葡萄牙","code":"PT"},{"name":"波多黎各","code":"PR"},{"name":"卡塔尔","code":"QA"},{"name":"留尼旺","code":"RE"},{"name":"罗马尼亚","code":"RO"},{"name":"俄罗斯联邦","code":"RU"},{"name":"卢旺达","code":"RW"},{"name":"圣吉斯和尼维斯","code":"KN"},{"name":"圣卢西亚","code":"LC"},{"name":"圣文森和格林纳丁斯","code":"VC"},{"name":"美属萨摩亚","code":"WS"},{"name":"圣马力诺","code":"SM"},{"name":"圣多美和普林西比","code":"ST"},{"name":"沙特阿拉伯","code":"SA"},{"name":"塞内加尔","code":"SN"},{"name":"塞尔维亚共和国","code":"SRB"},{"name":"塞锡尔群岛","code":"SC"},{"name":"塞拉利昂","code":"SL"},{"name":"新加坡","code":"SG"},{"name":"斯洛伐克（斯洛伐克人的共和国）","code":"SK"},{"name":"斯洛文尼亚","code":"SI"},{"name":"索罗门群岛","code":"SB"},{"name":"索马里","code":"SO"},{"name":"南非","code":"ZA"},{"name":"韩国","code":"KR"},{"name":"西班牙","code":"ES"},{"name":"斯里兰卡","code":"LK"},{"name":"圣海伦娜","code":"SH"},{"name":"圣皮埃尔和密克罗","code":"PM"},{"name":"苏丹","code":"SD"},{"name":"苏里南","code":"SR"},{"name":"冷岸和央麦恩群岛","code":"SJ"},{"name":"斯威士兰","code":"SZ"},{"name":"瑞典","code":"SE"},{"name":"瑞士","code":"CH"},{"name":"叙利亚","code":"SY"},{"name":"台湾地区","code":"TW"},{"name":"塔吉克","code":"TJ"},{"name":"坦桑尼亚","code":"TZ"},{"name":"泰国","code":"TH"},{"name":"前马其顿南斯拉夫共和国","code":"MK"},{"name":"多哥","code":"TG"},{"name":"托克劳","code":"TK"},{"name":"汤加","code":"TO"},{"name":"千里达托贝哥共和国","code":"TT"},{"name":"北非共和国","code":"TN"},{"name":"土耳其","code":"TR"},{"name":"土库曼","code":"TM"},{"name":"土克斯和开科斯群岛","code":"TC"},{"name":"图瓦卢","code":"TV"},{"name":"乌干达","code":"UG"},{"name":"乌克兰","code":"UA"},{"name":"阿拉伯联合酋长国","code":"AE"},{"name":"英国","code":"UK"},{"name":"美国小离岛","code":"UM"},{"name":"乌拉圭","code":"UY"},{"name":"乌兹别克斯坦","code":"UZ"},{"name":"瓦努阿图","code":"VU"},{"name":"梵蒂冈(罗马教廷)","code":"VA"},{"name":"委内瑞拉","code":"VE"},{"name":"越南","code":"VN"},{"name":"维尔京群岛(英国)","code":"VG"},{"name":"维尔京群岛(美国)","code":"VI"},{"name":"沃利斯和富图纳群岛","code":"WF"},{"name":"西撒哈拉","code":"EH"},{"name":"也门","code":"YE"},{"name":"南斯拉夫","code":"YU"},{"name":"赞比亚","code":"ZM"},{"name":"津巴布韦","code":"ZW"}]

var dataContries= [
["AO", "安哥拉"],
["AF", "阿富汗"],
["AL", "阿尔巴尼亚"],
["DZ", "阿尔及利亚"],
["AD", "安道尔共和国"],
["AI", "安圭拉岛"],
["AG", "安提瓜和巴布达"],
["AR", "阿根廷"],
["AM", "亚美尼亚"],
["AU", "澳大利亚"],
["AT", "奥地利"],
["AZ", "阿塞拜疆"],
["BS", "巴哈马"],
["BH", "巴林"],
["BD", "孟加拉国"],
["BB", "巴巴多斯"],
["BY", "白俄罗斯"],
["BE", "比利时"],
["BZ", "伯利兹"],
["BJ", "贝宁"],
["BM", "百慕大群岛"],
["BO", "玻利维亚"],
["BW", "博茨瓦纳"],
["BR", "巴西"],
["BN", "文莱"],
["BG", "保加利亚"],
["BF", "布基纳法索"],
["MM", "缅甸"],
["BI", "布隆迪"],
["CM", "喀麦隆"],
["CA", "加拿大"],
["CF", "中非共和国"],
["TD", "乍得"],
["CL", "智利"],
["CN", "中国"],
["CO", "哥伦比亚"],
["CG", "刚果"],
["CK", "库克群岛"],
["CR", "哥斯达黎加"],
["CU", "古巴"],
["CY", "塞浦路斯"],
["CZ", "捷克"],
["DK", "丹麦"],
["DJ", "吉布提"],
["DO", "多米尼加共和国"],
["EC", "厄瓜多尔"],
["EG", "埃及"],
["SV", "萨尔瓦多"],
["EE", "爱沙尼亚"],
["ET", "埃塞俄比亚"],
["FJ", "斐济"],
["FI", "芬兰"],
["FR", "法国"],
["GF", "法属圭亚那"],
["GA", "加蓬"],
["GM", "冈比亚"],
["GE", "格鲁吉亚"],
["DE", "德国"],
["GH", "加纳"],
["GI", "直布罗陀"],
["GR", "希腊"],
["GD", "格林纳达"],
["GU", "关岛"],
["GT", "危地马拉"],
["GN", "几内亚"],
["GY", "圭亚那"],
["HT", "海地"],
["HN", "洪都拉斯"],
["HK", "香港"],
["HU", "匈牙利"],
["IS", "冰岛"],
["IN", "印度"],
["ID", "印度尼西亚"],
["IR", "伊朗"],
["IQ", "伊拉克"],
["IE", "爱尔兰"],
["IL", "以色列"],
["IT", "意大利"],
["JM", "牙买加"],
["JP", "日本"],
["JO", "约旦"],
["KH", "柬埔寨"],
["KZ", "哈萨克斯坦"],
["KE", "肯尼亚"],
["KR", "韩国"],
["KW", "科威特"],
["KG", "吉尔吉斯坦"],
["LA", "老挝"],
["LV", "拉脱维亚"],
["LB", "黎巴嫩"],
["LS", "莱索托"],
["LR", "利比里亚"],
["LY", "利比亚"],
["LI", "列支敦士登"],
["LT", "立陶宛"],
["LU", "卢森堡"],
["MO", "澳门"],
["MG", "马达加斯加"],
["MW", "马拉维"],
["MY", "马来西亚"],
["MV", "马尔代夫"],
["ML", "马里"],
["MT", "马耳他"],
["MU", "毛里求斯"],
["MX", "墨西哥"],
["MD", "摩尔多瓦"],
["MC", "摩纳哥"],
["MN", "蒙古"],
["MS", "蒙特塞拉特岛"],
["MA", "摩洛哥"],
["MZ", "莫桑比克"],
["NA", "纳米比亚"],
["NR", "瑙鲁"],
["NP", "尼泊尔"],
["NL", "荷兰"],
["NZ", "新西兰"],
["NI", "尼加拉瓜"],
["NE", "尼日尔"],
["NG", "尼日利亚"],
["KP", "朝鲜"],
["NO", "挪威"],
["OM", "阿曼"],
["PK", "巴基斯坦"],
["PA", "巴拿马"],
["PG", "巴布亚新几内亚"],
["PY", "巴拉圭"],
["PE", "秘鲁"],
["PH", "菲律宾"],
["PL", "波兰"],
["PF", "法属玻利尼西亚"],
["PT", "葡萄牙"],
["PR", "波多黎各"],
["QA", "卡塔尔"],
["RO", "罗马尼亚"],
["RU", "俄罗斯"],
["LC", "圣卢西亚"],
["VC", "圣文森特岛"],
["SM", "圣马力诺"],
["ST", "圣多美和普林西比"],
["SA", "沙特阿拉伯"],
["SN", "塞内加尔"],
["SC", "塞舌尔"],
["SL", "塞拉利昂"],
["SG", "新加坡"],
["SK", "斯洛伐克"],
["SI", "斯洛文尼亚"],
["SB", "所罗门群岛"],
["SO", "索马里"],
["ZA", "南非"],
["ES", "西班牙"],
["LK", "斯里兰卡"],
["SD", "苏丹"],
["SR", "苏里南"],
["SZ", "斯威士兰"],
["SE", "瑞典"],
["CH", "瑞士"],
["SY", "叙利亚"],
["TW", "台湾省"],
["TJ", "塔吉克斯坦"],
["TZ", "坦桑尼亚"],
["TH", "泰国"],
["TG", "多哥"],
["TO", "汤加"],
["TT", "特立尼达和多巴哥"],
["TN", "突尼斯"],
["TR", "土耳其"],
["TM", "土库曼斯坦"],
["UG", "乌干达"],
["UA", "乌克兰"],
["AE", "阿拉伯联合酋长国"],
["GB", "英国"],
["US", "美国"],
["UY", "乌拉圭"],
["UZ", "乌兹别克斯坦"],
["VE", "委内瑞拉"],
["VN", "越南"],
["YE", "也门"],
["YU", "南斯拉夫"],
["ZW", "津巴布韦"],
["ZR", "扎伊尔"],
["ZM", "赞比亚"]
];
</script>
