import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    consultant: [],
    datamain: [],
    step: 0
    
  },
  mutations: {
    PUT_CONSULTANT_DATA(state,data) {
      state.consultant = data
    },
    PUT_DATAMAIN_DATA(state,data) {
      state.datamain = data
    },
    NEXT_STEP(state) {
      console.log(`state step = ${state.step}`)
      state.step++
    },
    PREV_STEP(state) {
      console.log(`state step = ${state.step}`)
      state.step--
    },
  },
  actions: {
    GET_CONSULTANT_DATA({ commit }) {
        axios.get('/consultant.json')
            .then(response => {
                commit('PUT_CONSULTANT_DATA', response.data)
            })
    },
    GET_DATAMAIN_DATA({ commit }) {
        axios.get('/data.json')
            .then(response => {
                commit('PUT_DATAMAIN_DATA', response.data)
            })
    }
  },
  getters: {
    CONSULTANT: function(state) {
      return state.consultant
    },
    DATAMAIN: function(state) {
      return state.datamain
    },
    STEP_COUNTER: function(state) {
      return state.step
    }
  }
})