import {
  INIT_DATA,
  INIT_DATA_SUCCESS,
  NEW_TASK,
  NEW_TASK_SUCCESS,
  NEW_DELIVER_RECORD,
  NEW_DELIVER_RECORD_SUCCESS,
  NEW_INSTALL_RECORD,
  NEW_INSTALL_RECORD_SUCCESS,
  NEW_TRAIN_RECORD,
  NEW_TRAIN_RECORD_SUCCESS,

  NEW_CLIENT,
  NEW_CLIENT_SUCCESS,
  REMOVE_CLIENT,
  REMOVE_CLIENT_SUCCESS,

  DELIVER_RECORD_BY_PRODUCT,
  DELIVER_RECORD_BY_PRODUCT_SUCCESS,
  INSTALL_RECORD_BY_PRODUCT,
  INSTALL_RECORD_BY_PRODUCT_SUCCESS,
  TRAIN_RECORD_BY_PRODUCT,
  TRAIN_RECORD_BY_PRODUCT_SUCCESS,

  UNPROCESS_TASK,
  UNPROCESS_TASK_SUCCESS,
  CLOSE_TASK,
  CLOSE_TASK_SUCCESS,
  OPEN_TASK,
  OPEN_TASK_SUCCESS,
  NEW_FIX,
  NEW_FIX_SUCCESS,
  TASK_BY_ID,
  TASK_BY_ID_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  REMOVE_TASK,
  REMOVE_TASK_SUCCESS,
  // ADD_TO_CART,
  // REMOVE_FROM_CART,
  ALL_TASKS,
  ALL_TASKS_SUCCESS,
  ALL_FIXES_BY_ID,
  ALL_FIXES_BY_ID_SUCCESS,

  ALL_FEEDBACK_TYPES,
  ALL_FEEDBACK_TYPES_SUCCESS,
  ALL_DEVICES,
  ALL_DEVICES_SUCCESS,
  ALL_ENGINEERS,
  ALL_ENGINEERS_SUCCESS,
  ALL_DELIVERING_PRODUCTS,
  ALL_DELIVERING_PRODUCTS_SUCCESS,
  ALL_FIX_TYPES,
  ALL_FIX_TYPES_SUCCESS,
  SOME_PRODUCTS,
  SOME_PRODUCTS_SUCCESS,

  ALL_MY_MENUS,
  ALL_MY_MENUS_SUCCESS,

  UPDATE_SELECTED,
  WX_PARAMS,
  WX_PARAMS_SUCCESS,
  WX_CHECK_TOKEN,
  WX_OPENID_URL,
  WX_OPENID_URL_SUCCESS,
  WX_OPENID,
  // WX_OPENID_SUCCESS,

  OSS_UPLOAD_FILE,
  OSS_UPLOAD_FILE_SUCCESS,
  WX_CHECK_TOKEN_SUCCESS,
  OSS_DELETE_FILE,
  OSS_DELETE_FILE_SUCCESS,
  NEW_OSS_CLIENT,
  OSS_TOKEN,
  OSS_TOKEN_SUCCESS,
  INIT_ANKE_TOKEN,
  INIT_ANKE_TOKEN_SUCCESS,
  BIND_ANKE,
  BIND_ANKE_SUCCESS,
  LOGIN_ANKE,
  LOGIN_ANKE_SUCCESS,

// 消息
  MSG_BY_USER,
  MSG_BY_USER_SUCCESS,
  MSG_READ,
  MSG_READ_SUCCESS,
  MSG_DELETE,
  MSG_DELETE_SUCCESS,
// 记录
  DELIVER_RECORDS_BY_USER,
  DELIVER_RECORDS_BY_USER_SUCCESS,
  INSTALL_RECORDS_BY_USER,
  INSTALL_RECORDS_BY_USER_SUCCESS,
  TRAIN_RECORDS_BY_USER,
  TRAIN_RECORDS_BY_USER_SUCCESS,
  CLIENT_RECORDS,
  CLIENT_RECORDS_SUCCESS,
  VALID_SALES_RECORDS,
  VALID_SALES_RECORDS_SUCCESS,

  UPDATE_REGISTER_CODE_DEADLINE,
  UPDATE_REGISTER_CODE_DEADLINE_SUCCESS,

  SAVE_RECORD,
  SAVE_RECORD_PROCESS,
  SAVE_RECORD_PROCESS_RESET,
  RECORD_ID,
  PRODUCT_NAME,
  IMG_TYPE,
  CURRENT_TASK,
  CURRENT_FIX,
  CURRENT_PRODUCT,
  CURRENT_MSG,
  UPDATE_CLOSE_WINDOW,
  CURRENT_AREA,
    // ALL_MANUFACTURERS,
  // ALL_MANUFACTURERS_SUCCESS
} from './mutation-types'

export const ossMutations = {
  [NEW_OSS_CLIENT]:(state, payload) => {
    state.ossClient = payload
  },
  [OSS_TOKEN]:(state) => {
    state.showLoader = true
  },
  [OSS_TOKEN_SUCCESS]:(state, payload) => {
    state.showLoader = false
    state.ossTokenInfo.region = payload.region;
    state.ossTokenInfo.keyId = payload.accessKeyId;
    state.ossTokenInfo.keySecret = payload.accessKeySecret;
    state.ossTokenInfo.tsToken = payload.securityToken;
    state.ossTokenInfo.bucket = payload.bucket;
  },
  [OSS_UPLOAD_FILE]: (state, payload) => {
    state.showLoader = true
  },
  [OSS_UPLOAD_FILE_SUCCESS]: (state, payload) => {
    state.showLoader = false
    state.wxUploadStatus = payload
  },
  [OSS_DELETE_FILE]: (state, payload) => {
    state.showLoader = true
  },
  [OSS_DELETE_FILE_SUCCESS]: (state, payload) => {
    state.showLoader = false;
  }
}

export const wxMutations = {
  [WX_PARAMS]: (state, payload) => {
    state.showLoader = true
  },
  [WX_PARAMS_SUCCESS]: (state, payload) => {
    state.showLoader = false
    state.wxparams = payload
    console.log(state.wxparams);
  },
  [WX_CHECK_TOKEN]: (state, payload) => {
    state.showLoader = true
  },
  [WX_CHECK_TOKEN_SUCCESS]: (state, payload) => {
    state.showLoader = false
    state.wxCheckToken = payload
  },
  [WX_OPENID_URL]: (state) => {
    state.showLoader = true
  },
  [WX_OPENID_URL_SUCCESS]: (state, payload) => {
    state.showLoader = false
    state.openIdUrl = payload
  },
  [WX_OPENID]: (state, payload) => {
    state.openId = payload
  },
  // [WX_OPENID_SUCCESS]: (state, payload) => {
  //   state.showLoader = false
  //   state.openId = payload
  // }
}

export const valuesMutations = {
  [SAVE_RECORD]: (state, payload) => {
    state.saveRecord = payload
  },
  [SAVE_RECORD_PROCESS]: (state) => {
    state.saveRecordProcess = state.saveRecordProcess + 1;
  },
  [SAVE_RECORD_PROCESS_RESET]: (state) => {
    state.saveRecordProcess = 0;
  },
  [IMG_TYPE]: (state, payload) => {
    state.imgType = payload
  },
  [PRODUCT_NAME]: (state, payload) => {
    state.productName = payload
  },
  [RECORD_ID]: (state, payload) => {
    state.recordId = payload
  },
  [CURRENT_TASK]: (state, payload) => {
    state.task = payload;
  },
  [CURRENT_FIX]: (state, payload) => {
    state.fix = payload;
  },
  [CURRENT_PRODUCT]: (state, payload) => {
    state.product = payload;
  },
  [CURRENT_MSG]: (state, payload) => {
    state.msg = payload;
  },
  [CURRENT_AREA]: (state, payload) => {
    state.areaInfo = payload;
  },
}

// 监听action.js中commit出来的内容，然后对state数据进行更新。
export const taskMutations = {
  [INIT_ANKE_TOKEN](state){
    state.showLoader = true;
    state.ankeToken = "";
  },
  [INIT_ANKE_TOKEN_SUCCESS](state, payload){
    state.showLoader = false
    if(payload.code == 200){
      state.ankeToken = payload.data.token;
      state.email = payload.data.email;
    }else {
      state.ankeToken = '';
      state.email = '';
    }
  },
  [INIT_DATA](state){
    state.showLoader = true
  },
  [INIT_DATA_SUCCESS](state, payload){
    state.showLoader = false
    state.initData = payload
  },
  [ALL_FEEDBACK_TYPES](state){
    state.showLoader = true
  },
  [ALL_FEEDBACK_TYPES_SUCCESS](state, payload){
    state.showLoader = false
    state.types = payload
  },
  [ALL_ENGINEERS](state){
    state.showLoader = true
  },
  [ALL_ENGINEERS_SUCCESS](state, payload){
    state.showLoader = false
    state.engineers = payload
  },
  [ALL_DEVICES](state){
    state.showLoader = true
  },
  [ALL_DEVICES_SUCCESS](state, payload){
    state.showLoader = false
    state.devices = payload
  },
  [ALL_FIX_TYPES](state){
    state.showLoader = true;
  },
  [ALL_FIX_TYPES_SUCCESS](state, payload){
    state.showLoader = false;
    state.fixTypes = payload;
  },
  [ALL_TASKS](state, payload) {
    // Called when fetching products
    state.showLoader = true
  },
  [ALL_TASKS_SUCCESS](state, payload) {
    // Called when products have been fetched
    state.showLoader = false
    // Updates state products
    state.tasks = payload
  },
  [ALL_DELIVERING_PRODUCTS](state){
    state.showLoader = true
  },
  [ALL_DELIVERING_PRODUCTS_SUCCESS](state, payload) {
    state.showLoader = false;
  },
  [ALL_FIXES_BY_ID](state, payload){
    state.showLoader = true
  },
  [ALL_FIXES_BY_ID_SUCCESS](state, payload){
    state.showLoader = true;
    state.fixes = payload;
  },
  [TASK_BY_ID](state) {
    // Called when fetching products by ID
    state.showLoader = true
  },
  [TASK_BY_ID_SUCCESS](state, payload) {
    // Called when product is fetched
    state.showLoader = false
    // Updates state product
    state.task = payload
  },
  [NEW_TASK]: (state, payload) => {
    // ...Same pattern
    state.showLoader = true
  },
  [NEW_TASK_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },
  [NEW_DELIVER_RECORD]: (state, payload) => {
    state.showLoader = true
  },
  [NEW_DELIVER_RECORD_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },
  [NEW_INSTALL_RECORD]: (state, payload) => {
    state.showLoader = true
  },
  [NEW_INSTALL_RECORD_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },
  [NEW_TRAIN_RECORD]: (state, payload) => {
    state.showLoader = true
  },
  [NEW_TRAIN_RECORD_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },

  [NEW_CLIENT]: (state, payload) => {
    state.showLoader = true
  },
  [NEW_CLIENT_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },
  [REMOVE_CLIENT]: (state, payload) => {
    state.showLoader = true
  },
  [REMOVE_CLIENT_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },


  [ALL_MY_MENUS]: (state, payload) => {
    state.showLoader = true;
  },
  [ALL_MY_MENUS_SUCCESS]: (state, payload) => {
    state.showLoader = false;
  },


  [DELIVER_RECORD_BY_PRODUCT]: (state, payload) => {
    state.showLoader = true;
  },
  [DELIVER_RECORD_BY_PRODUCT_SUCCESS]: (state, payload) => {
    state.showLoader = false;
  },
  [INSTALL_RECORD_BY_PRODUCT]: (state, payload) => {
    state.showLoader = true;
  },
  [INSTALL_RECORD_BY_PRODUCT_SUCCESS]: (state, payload) => {
    state.showLoader = false;
  },
  [TRAIN_RECORD_BY_PRODUCT]: (state, payload) => {
    state.showLoader = true;
  },
  [TRAIN_RECORD_BY_PRODUCT_SUCCESS]: (state, payload) => {
    state.showLoader = false;
  },
  [DELIVER_RECORDS_BY_USER]: (state) => {
    state.showLoader = true;
  },
  [DELIVER_RECORDS_BY_USER_SUCCESS]: (state, payload) => {
    state.showLoader = false;
  },
  [INSTALL_RECORDS_BY_USER]: (state) => {
    state.showLoader = true;
  },
  [INSTALL_RECORDS_BY_USER_SUCCESS]: (state) => {
    state.showLoader = false;
  },
  [TRAIN_RECORDS_BY_USER]: (state) => {
    state.showLoader = true;
  },
  [TRAIN_RECORDS_BY_USER_SUCCESS]: (state) => {
    state.showLoader = false;
  },
  [CLIENT_RECORDS]: (state) => {
    state.showLoader = true;
  },
  [CLIENT_RECORDS_SUCCESS]: (state) => {
    state.showLoader = false;
  },
  [VALID_SALES_RECORDS]: (state) => {
    state.showLoader = true;
  },
  [VALID_SALES_RECORDS_SUCCESS]: (state) => {
    state.showLoader = false;
  },

  [UPDATE_REGISTER_CODE_DEADLINE]: (state) => {
    state.showLoader = true;
  },
  [UPDATE_REGISTER_CODE_DEADLINE_SUCCESS]: (state) => {
    state.showLoader = false;
  },


  [UNPROCESS_TASK]: (state, payload) => {
    state.showLoader = true
  },
  [UNPROCESS_TASK_SUCCESS]: (state, payload) => {
    state.showLoader = true
  },
  [CLOSE_TASK]: (state, payload) => {
    state.showLoader = true
  },
  [CLOSE_TASK_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },
  [OPEN_TASK]: (state, payload) => {
    state.showLoader = true
  },
  [OPEN_TASK_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },
  [NEW_FIX]: (state, payload) => {
    state.showLoader = true
  },
  [NEW_FIX_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },
  [UPDATE_TASK]: (state, payload) => {
    state.showLoader = true
  },
  [UPDATE_TASK_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },
  [REMOVE_TASK]: (state, payload) => {
    state.showLoader = true
  },
  [REMOVE_TASK_SUCCESS]: (state, payload) => {
    state.showLoader = false
  },
  [UPDATE_SELECTED]: (state, payload) => {
    state.selected = payload
  },
  [BIND_ANKE]: (state, payload) => {
    state.showLoader = true;
  },
  [BIND_ANKE_SUCCESS]: (state) => {
    state.showLoader = false;
  },
  [SOME_PRODUCTS]: (state) => {
    state.showLoader = true;
  },
  [SOME_PRODUCTS_SUCCESS]: (state) => {
    state.showLoader = false;
  },
  [UPDATE_CLOSE_WINDOW]: (state, payload) => {
    state.closeWindow = payload;
  },
  [MSG_BY_USER]: (state) => {
    state.showLoader = true;
  },
  [MSG_BY_USER_SUCCESS]: (state, payload) => {
    state.showLoader = false;
  },
  [MSG_READ]: (state) => {
    state.showLoader = true;
  },
  [MSG_READ_SUCCESS]: (state, payload) => {
    state.showLoader = false;
  },
  [MSG_DELETE]: (state) => {
    state.showLoader = true;
  },
  [MSG_DELETE_SUCCESS]: (state, payload) => {
    state.showLoader = false;
  }
  // [LOGIN_ANKE]: (state, payload) => {
  //   state.showLoader = true;
  // },
  // [LOGIN_ANKE_SUCCESS]: (state, payload) => {
  //   state.showLoader = false;
  //   state.ankeToken = payload.token;
  //   state.email = payload.email;
  // }

}

// export const cartMutations = {
//   [ADD_TO_CART]: (state, payload) => state.cart.push(payload),
//   [REMOVE_FROM_CART]: (state, payload) => {
//     const index = state.cart.findIndex(p => p._id === payload)
//     state.cart.splice(index, 1)
//     console.log(state.cart, state.cart.length, index)
//   }
// }
//
// export const manufacturerMutations = {
//   [ALL_MANUFACTURERS] (state) {
//     state.showLoader = true
//   },
//   [ALL_MANUFACTURERS_SUCCESS] (state, payload) {
//     state.showLoader = false
//     state.manufacturers = payload
//   }
// }
