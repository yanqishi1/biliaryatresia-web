import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patient:undefined,
    detects:undefined,
    reserves:undefined,
    history_router:'',
    doctor:{
      doc_id:1,
      name:'王医生',
      tel:'135646454',
      photo:'',
      dept:'儿科'
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
