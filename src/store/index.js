import Vue from 'vue'
import Vuex from 'vuex'
import {
  taskGetters,
  wxGetters,
  ossGetters,
  valuesGetters
  // manufacturerGetters
} from './getters'
import {
  taskMutations,
  wxMutations,
  ossMutations,
  valuesMutations
  // cartMutations,
  // manufacturerMutations
} from './mutations'
import {
  taskActions,
  wxActions,
  ossActions
} from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    oneObj: "Hello World from Store",
    selected: 1,
    imgType: 1, // train  install   deliver   feedback  fix
    productName: "",
    recordId: "",
    // bought items
    cart: [],
    // ajax loader
    showLoader: false,
    task: {}, // 当前问题记录
    fix:{}, // 当前问题记录的维修记录
    msg:{}, // 当前消息记录
    tasks: [],  // 未处理任务or未分配任务or已处理任务or已关闭任务,每次切换tabbar,都会重新从服务器获取
    fixes: [], // 反馈记录id对应的所有维修记录
    wxparams: {}, // 微信配置参数
    openIdUrl: "",
    openId: "",
    wxCheckToken: {},

    ossClient: Object,
    ossTokenInfo: {}, // ossTokenInfo读token
    saveRecord: false, // 是否触发保存操作，保存图片修改，保存文字修改
    saveRecordProcess: 0, // 上传图片+1，删除图片+1，上传文字+1，如果==3，则是说明全部已上传，可以展示loading
    initData:{}, // 初始化数据包括：feedbackTypes, engineers, devices，太耗时，已弃用

    engineers: [],
    types: [],
    devices: [],
    fixTypes: [],
    wxUploadStatus: {},
    product: {}, // 当前选择的设备信息
    ankeToken: "", // anke 售后服务器的token
    email: "",
    responseOssDeleteFiles: {},
    closeWindow: false,
    areaInfo: {}, // 当前的城市信息
    // all manufacturers
    // manufacturers: []
  },
  getters: Object.assign({}, taskGetters, wxGetters, ossGetters, valuesGetters),
  mutations: Object.assign({}, taskMutations, wxMutations, ossMutations, valuesMutations),
  actions: Object.assign({}, taskActions, wxActions, ossActions)
})
