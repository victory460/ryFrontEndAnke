export const taskGetters = {
  ankeToken:(state, getters) => {
    return state.ankeToken;
  },
  email: (state, getters) => {
    return state.email;
  },
  initData:(state, getters) => {
    return state.initData;
  },
  // All products
  allTasks: (state, getters) => {
    return state.tasks;
  },
  allFixesById: (state, getters) => {
    return state.fixes;
  },
  types: (state, getters) => {
    return state.types;
  },
  engineers: (state, getters) => {
    return state.engineers;
  },
  devices: (state, getters) => {
    return state.devices;
  },
  fixTypes: (state, getters) => {
    return state.fixTypes;
  },
  task: (state, getters) => {
    return state.task
  },
  fix: (state, getters) => {
    return state.fix
  },
  imgType: (state, getters) => {
    return state.imgType
  },
  productName: (state, getters) => {
    return state.productName
  },
  recordId: (state, getters) => {
    return state.recordId
  },
  trainType: (state, getters) => {
    return 45;
  },
  installType: (state, getters) => {
    return 44;
  },
  deliverType: (state, getters) => {
    return 43;
  },
  feedbackType: (state, getters) => {
    return 46;
  },
  fixType: (state, getters) => {
    return 47;
  },
  // taskById: (state, getters) => id => {
  //   if (getters.tasks.length > 0) {
  //     return getters.tasks.filter(p => p.id === id)[0]
  //   } else {
  //     return state.task
  //   }
  // },
  selected: (state, getters) => {
    return state.selected;
  }
}

export const wxGetters = {
  wxParams: (state, getters) => {
    return state.wxparams
  },
  wxCheckToken: (state, getters) => {
    return state.wxCheckToken;
  },
  wxUploadStatus: (state, getters) => {
    return state.wxUploadStatus;
  },
  openIdUrl: (state, getters) => {
    return state.openIdUrl;
  },
  openId: (state, getters) => {
    return state.openId;
  }
}

export const ossGetters = {
  ossClient:(state, getters) => {
    return state.ossClient;
  },
  ossTokenInfo:(state, getters) => {
    return state.ossTokenInfo;
  }
}

export const valuesGetters = {
  saveRecord:(state, getters) => {
    return state.saveRecord;
  },
  saveRecordProcess:(state, getters) => {
    return state.saveRecordProcess;
  },
  product:(state, getters) => {
    return state.product;
  },
  msg: (state, getters) => {
    return state.msg;
  },
  closeWindow:(state, getters) => {
    return state.closeWindow;
  },
  areaInfo: (state, getters) => {
    return state.areaInfo;
  }
}

// export const manufacturerGetters = {
//   // All manufacturers
//   allManufacturers: state => state.manufacturers
// }
