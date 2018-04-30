import axios from 'axios'
// const API_BASE = 'http://localhost:9999'  // 开发环境
// const API_BASE = 'http://120.26.36.48:9999' // 正式环境
const API_BASE = process.env.API_ROOT // 访问/config/文件家内的dev.env.js, prod.env.js获取API_ROOT,系统会根据npm run build或npm run dev自动选择
import {
  INIT_ANKE_TOKEN,
  INIT_ANKE_TOKEN_SUCCESS,
  INIT_DATA,
  INIT_DATA_SUCCESS,
  NEW_TASK,
  NEW_TASK_SUCCESS,
  UNPROCESS_TASK,
  UNPROCESS_TASK_SUCCESS,
  CLOSE_TASK,
  CLOSE_TASK_SUCCESS,
  OPEN_TASK,
  OPEN_TASK_SUCCESS,
  NEW_FIX,
  NEW_FIX_SUCCESS,
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

  TASK_BY_ID,
  TASK_BY_ID_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  REMOVE_TASK,
  REMOVE_TASK_SUCCESS,
  ALL_TASKS,
  ALL_TASKS_SUCCESS,
  ALL_FIXES_BY_ID,
  ALL_FIXES_BY_ID_SUCCESS,
  ALL_OPEN_TASKS,
  ALL_OPEN_TASKS_SUCCESS,
  ALL_ALLOCATED_TASKS,
  ALL_ALLOCATED_TASKS_SUCCESS,
  ALL_PROCESSED_TASKS,
  ALL_PROCESSED_TASKS_SUCCESS,
  ALL_CLOSED_TASKS,
  ALL_CLOSED_TASKS_SUCCESS,
  ALL_DELIVERING_PRODUCTS,
  ALL_DELIVERING_PRODUCTS_SUCCESS,
  ALL_INSTALL_PRODUCTS,
  ALL_INSTALL_PRODUCTS_SUCCESS,
  ALL_TRAIN_PRODUCTS,
  ALL_TRAIN_PRODUCTS_SUCCESS,

  ALL_MY_MENUS,
  ALL_MY_MENUS_SUCCESS,

  SOME_PRODUCTS,
  SOME_PRODUCTS_SUCCESS,

  UPDATE_SELECTED,
  BIND_ANKE,
  BIND_ANKE_SUCCESS,
  UNBIND_ANKE,
  UNBIND_ANKE_SUCCESS,

  WX_PARAMS,
  WX_PARAMS_SUCCESS,
  WX_CHECK_TOKEN,
  WX_CHECK_TOKEN_SUCCESS,
  WX_OPENID_URL,
  WX_OPENID_URL_SUCCESS,
  // WX_OPENID,
  // WX_OPENID_SUCCESS,

// 消息
  MSG_BY_USER,
  MSG_BY_USER_SUCCESS,
  MSG_DELETE,
  MSG_DELETE_SUCCESS,
  MSG_READ,
  MSG_READ_SUCCESS,
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

  OSS_UPLOAD_FILE,
  OSS_UPLOAD_FILE_SUCCESS,
  OSS_DELETE_FILE,
  OSS_DELETE_FILE_SUCCESS,
  OSS_TOKEN,
  OSS_TOKEN_SUCCESS,
  ALL_DEVICES,
  ALL_DEVICES_SUCCESS,
  ALL_ENGINEERS,
  ALL_ENGINEERS_SUCCESS,
  ALL_FEEDBACK_TYPES,
  ALL_FEEDBACK_TYPES_SUCCESS,
  ALL_FIX_TYPES,
  ALL_FIX_TYPES_SUCCESS,
  // ALL_MANUFACTURERS,
  // ALL_MANUFACTURERS_SUCCESS
} from './mutation-types'

export const ossActions = {
  ossTokenInfo({commit}) {
    commit(OSS_TOKEN)
    axios.post(`${API_BASE}/img/ossToken`).then(response => {
      commit(OSS_TOKEN_SUCCESS, response.data)
    })
  },
  ossClient({
    commit
  }, ossClient) {
    commit(NEW_OSS_CLIENT, ossClient)
  },
  ossUploadFiles({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(OSS_UPLOAD_FILE)
      axios.get(`${API_BASE}/img/upload`, {
        params
      }).then(response => {
        commit(OSS_UPLOAD_FILE_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  ossDeleteFiles({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(OSS_DELETE_FILE)
      axios.get(`${API_BASE}/img/delete`, {params}).then(response => {
        console.log("&&&&& action=" + response);
        commit(OSS_DELETE_FILE_SUCCESS, response.data);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  }
}

export const wxActions = {
  wxParams({
    commit
  }, url) {
    commit(WX_PARAMS)
    axios.get(`${API_BASE}/wx/wxparams`, {
      params: {
        url: url
      }
    }).then(response => {
      commit(WX_PARAMS_SUCCESS, response.data)
    })
  },
  wxCheckToken({commit}, signature, timestamp, nonce, echostr) {
    commit(WX_CHECK_TOKEN)
    axios.get(`${API_BASE}/wx/token`, {
      params: {
        signature: signature,
        timestamp: timestamp,
        nonce: nonce,
        echostr: echostr
      }
    }).then(response => {
      commit(WX_CHECK_TOKEN_SUCCESS, response.data)
    })
  },
  wxOpenidUrl({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(WX_OPENID_URL)
      axios.get(`${API_BASE}/wx/openIdUrl`, {params}).then(response => {
        console.log("&&&&& action=" + response);
        commit(WX_OPENID_URL_SUCCESS, response.data);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  wxTest(){
    axios.post(`${API_BASE}/wx/test`).then(response => {

    },error => {

    })
  }
  // wxOpenid({commit}, url) {
  //   return new Promise((resolve, reject) => {
  //     commit(WX_OPENID)
  //     axios.get(url).then(response => {
  //       console.log("&&&&& action=" + response);
  //       commit(WX_OPENID_SUCCESS, response.data.openid);
  //       resolve(response);
  //     }, error => {
  //       // http failed, let the calling function know that action did not work out
  //       reject(error);
  //     })
  //   })
  // },
}

export const taskActions = {
  ankeToken({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(INIT_ANKE_TOKEN)
      axios.post(`${API_BASE}/anke/loginAnke`, params).then(response => {
        commit(INIT_ANKE_TOKEN_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  bindAnke({commit}, params){
    return new Promise((resolve, reject) => {
      commit(BIND_ANKE)
      axios.post(`${API_BASE}/anke/bindAnke`, params).then(response => {
        commit(BIND_ANKE_SUCCESS);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  initData({commit}) {
    commit(INIT_DATA)
    axios.get(`${API_BASE}/task/initData`).then(response => {
      console.log(response);
      commit(INIT_DATA_SUCCESS, response.data)
    })
  },
  allOpenTasks({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(ALL_TASKS)
      axios.post(`${API_BASE}/task/tasks/1`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(ALL_TASKS_SUCCESS);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  allAllocatedTasks({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(ALL_TASKS)
      axios.post(`${API_BASE}/task/tasks/2`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(ALL_TASKS_SUCCESS);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  allProcessedTasks({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(ALL_TASKS)
      axios.post(`${API_BASE}/task/tasks/3`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(ALL_TASKS_SUCCESS);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  allClosedTasks({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(ALL_TASKS)
      axios.post(`${API_BASE}/task/tasks/4`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(ALL_TASKS_SUCCESS);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  allFixesById({commit}, params){
    commit(ALL_FIXES_BY_ID)
    axios.post(`${API_BASE}/task/fixes`, params).then(response => {
      commit(ALL_FIXES_BY_ID_SUCCESS, response.data)
    })
  },
  allDeliveringProducts({commit}){
    return new Promise((resolve, reject) => {
      commit(ALL_DELIVERING_PRODUCTS)
      axios.post(`${API_BASE}/task/deliveringProducts`).then(response => {
        console.log("&&&&& action=" + response);
        commit(ALL_DELIVERING_PRODUCTS_SUCCESS);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  allInstallProducts({commit}){
    return new Promise((resolve, reject) => {
      commit(ALL_INSTALL_PRODUCTS)
      axios.post(`${API_BASE}/task/installProducts`).then(response => {
        console.log("&&&&& action=" + response);
        commit(ALL_INSTALL_PRODUCTS_SUCCESS);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  allTrainProducts({commit}){
    return new Promise((resolve, reject) => {
      commit(ALL_TRAIN_PRODUCTS)
      axios.post(`${API_BASE}/task/trainProducts`).then(response => {
        console.log("&&&&& action=" + response);
        commit(ALL_TRAIN_PRODUCTS_SUCCESS);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  allMyMenus({commit}){
    return new Promise((resolve, reject) => {
      commit(ALL_MY_MENUS)
      axios.post(`${API_BASE}/task/menus`).then(response => {
        console.log("&&&&& action=" + response);
        commit(ALL_MY_MENUS_SUCCESS);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  taskById({commit}, id) {
    commit(TASK_BY_ID)
    axios.post(`${API_BASE}/task/task/${id}`).then(response => {
      commit(TASK_BY_ID_SUCCESS, response.data)
    })
  },
  allocateFeedbackRecord({commit}, params){
    return new Promise((resolve, reject) => {
      commit(UPDATE_TASK)
      axios.post(`${API_BASE}/task/editTask`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(UPDATE_TASK_SUCCESS, response.data);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  unProcessFeedbackRecord({commit}, params){
    return new Promise((resolve, reject) => {
      commit(UNPROCESS_TASK)
      axios.post(`${API_BASE}/task/unProcessTask`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(UNPROCESS_TASK_SUCCESS, response.data);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  closeFeedbackRecord({commit}, params){
    return new Promise((resolve, reject) => {
      commit(CLOSE_TASK)
      axios.post(`${API_BASE}/task/closeTask`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(CLOSE_TASK_SUCCESS, response.data);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  openFeedbackRecord({commit}, params){
    return new Promise((resolve, reject) => {
      commit(OPEN_TASK)
      axios.post(`${API_BASE}/task/openTask`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(OPEN_TASK_SUCCESS, response.data);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  newTask({commit}, params){
    return new Promise((resolve, reject) => {
      commit(NEW_TASK)
      axios.post(`${API_BASE}/task/newTask`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(NEW_TASK_SUCCESS, response.data);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  removeTask({commit}, params){
    return new Promise((resolve, reject) => {
      commit(REMOVE_TASK)
      axios.post(`${API_BASE}/task/removeTask`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(REMOVE_TASK_SUCCESS, response.data);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  newFix({commit}, params){
    return new Promise((resolve, reject) => {
      commit(NEW_FIX)
      axios.post(`${API_BASE}/task/newFix`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(NEW_FIX_SUCCESS, response.data);
        resolve(response);
      }, error => {
        // http failed, let the calling function know that action did not work out
        reject(error);
      })
    })
  },
  newDeliver({commit}, params){
    return new Promise((resolve, reject) => {
      commit(NEW_DELIVER_RECORD)
      axios.post(`${API_BASE}/task/newDeliver`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(NEW_DELIVER_RECORD_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  newIntall({commit}, params){
    return new Promise((resolve, reject) => {
      commit(NEW_INSTALL_RECORD)
      axios.post(`${API_BASE}/task/newInstall`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(NEW_INSTALL_RECORD_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  newTrain({commit}, params){
    return new Promise((resolve, reject) => {
      commit(NEW_TRAIN_RECORD)
      axios.post(`${API_BASE}/task/newTrain`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(NEW_TRAIN_RECORD_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  newClient({commit}, params){
    return new Promise((resolve, reject) => {
      commit(NEW_CLIENT)
      axios.post(`${API_BASE}/task/newClient`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(NEW_CLIENT_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  removeClient({commit}, params){
    return new Promise((resolve, reject) => {
      commit(REMOVE_CLIENT)
      axios.post(`${API_BASE}/task/removeClient`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(REMOVE_CLIENT_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  deliverByProduct({commit}, params){
    return new Promise((resolve, reject) => {
      commit(DELIVER_RECORD_BY_PRODUCT)
      axios.post(`${API_BASE}/task/deliver`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(DELIVER_RECORD_BY_PRODUCT_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  installByProduct({commit}, params){
    return new Promise((resolve, reject) => {
      commit(INSTALL_RECORD_BY_PRODUCT)
      axios.post(`${API_BASE}/task/install`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(INSTALL_RECORD_BY_PRODUCT_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  trainByProduct({commit}, params){
    return new Promise((resolve, reject) => {
      commit(TRAIN_RECORD_BY_PRODUCT)
      axios.post(`${API_BASE}/task/train`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(TRAIN_RECORD_BY_PRODUCT_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  deliverByUser({commit}, params){
    return new Promise((resolve, reject) => {
      commit(DELIVER_RECORDS_BY_USER)
      axios.post(`${API_BASE}/task/deliverRecordByUser`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(DELIVER_RECORDS_BY_USER_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  installByUser({commit}, params){
    return new Promise((resolve, reject) => {
      commit(INSTALL_RECORDS_BY_USER)
      axios.post(`${API_BASE}/task/installRecordByUser`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(INSTALL_RECORDS_BY_USER_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  trainByUser({commit}, params){
    return new Promise((resolve, reject) => {
      commit(TRAIN_RECORDS_BY_USER)
      axios.post(`${API_BASE}/task/trainRecordByUser`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(TRAIN_RECORDS_BY_USER_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  client({commit}, params){
    return new Promise((resolve, reject) => {
      commit(CLIENT_RECORDS)
      axios.post(`${API_BASE}/task/clientRecord`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(CLIENT_RECORDS_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  sales({commit}, params){
    return new Promise((resolve, reject) => {
      commit(VALID_SALES_RECORDS)
      axios.post(`${API_BASE}/task/validSales`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(VALID_SALES_RECORDS_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  updateRegisterCodeDeadline({commit}, params){
    return new Promise((resolve, reject) => {
      commit(UPDATE_REGISTER_CODE_DEADLINE)
      axios.post(`${API_BASE}/task/registerCodeDeadline`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(UPDATE_REGISTER_CODE_DEADLINE_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },






  allTypes({
    commit
  }) {
    commit(ALL_FEEDBACK_TYPES)
    axios.get(`${API_BASE}/task/types`).then(response => {
      commit(ALL_FEEDBACK_TYPES_SUCCESS, response.data)
    })
  },
  allEngineers({
    commit
  }) {
    commit(ALL_ENGINEERS)
    axios.get(`${API_BASE}/task/engineers`).then(response => {
      commit(ALL_ENGINEERS_SUCCESS, response.data)
    })
  },
  allDevices({
    commit
  }) {
    commit(ALL_DEVICES)
    axios.get(`${API_BASE}/task/devices`).then(response => {
      commit(ALL_DEVICES_SUCCESS, response.data)
    })
  },
  allFixTypes({commit}){
    commit(ALL_FIX_TYPES)
    axios.get(`${API_BASE}/task/fixTypes`).then(response => {
      commit(ALL_FIX_TYPES_SUCCESS, response.data)
    })
  },
  someProducts({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(SOME_PRODUCTS)
      axios.post(`${API_BASE}/task/products`, params).then(response => {
        console.log("&&&&& action=" + response);
        commit(SOME_PRODUCTS_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  messagesByUser({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(MSG_BY_USER)
      axios.post(`${API_BASE}/msg/msgByUser`, params).then(response => {
        commit(MSG_BY_USER_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  messagesDelete({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(MSG_DELETE)
      axios.post(`${API_BASE}/msg/msgDelete`, params).then(response => {
        commit(MSG_DELETE_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },
  messagesRead({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(MSG_READ)
      axios.post(`${API_BASE}/msg/msgRead`, params).then(response => {
        commit(MSG_READ_SUCCESS, response.data);
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  },

  // productById({commit}, payload) {
  //   commit(PRODUCT_BY_ID)
  //   // Fetch product by ID from API
  //   axios.get(`${API_BASE}/tasks/${payload}`).then(response => {
  //     commit(PRODUCT_BY_ID_SUCCESS, response.data)
  //   })
  // },
  // addProduct({commit}, payload) {
  //   commit(ADD_TASK)
  //   // Create a new product via API
  //   axios.post(`${API_BASE}/addTask`, payload).then(response => {
  //     commit(ADD_TASK_SUCCESS, response.data)
  //   })
  // },
  // updateProduct({commit}, payload) {
  //   commit(UPDATE_TASK)
  //   // Update product via API
  //   axios.put(`${API_BASE}/tasks/${payload._id}`, payload).then(response => {
  //     commit(UPDATE_TASK_SUCCESS, response.data)
  //   })
  // },
  // removeProduct({commit}, payload) {
  //   commit(REMOVE_TASK)
  //   // Delete product via API
  //   axios.delete(`${API_BASE}/tasks/${payload}`, payload).then(response => {
  //     console.debug('response', response.data)
  //     commit(REMOVE_TASK_SUCCESS, response.data)
  //   })
  // },
}

// export const manufacturerActions = {
//   allManufacturers({commit}) {
//     commit(ALL_MANUFACTURERS)
//     // Fetch all manufacturers from API
//     axios.get(`${API_BASE}/manufacturers`).then(response => {
//       commit(ALL_MANUFACTURERS_SUCCESS, response.data)
//     })
//   }
// }
