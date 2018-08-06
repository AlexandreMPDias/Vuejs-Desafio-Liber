import Vuex from 'vuex';
import Vue from 'vue';
import formMethods from '../components/form/formulario';

Vue.use(Vuex);

const state = {
    info: formMethods.generateArrayOfFields(),
    validForm: false,
    ignoreInvalid: false,
    necessaryInputs: [],
};

const getters = {
    getInfo: state => state.info,
    getValidation: state => state.validForm,
    getIgnoreInvalid: state => state.ignoreInvalid,
    getNecessaryValues: state => state.necessaryInputs,
}

const mutations = {
    isFormValid(state) {
        state.validForm = formMethods.allValid(state.info, state.ignoreInvalid);
    },
    resetForm(state){
        formMethods.reset(state.info);
    },
    toggleIgnore(state){
        state.ignoreInvalid = !state.ignoreInvalid;
    }
}
const actions = {
    isFormValid: ({ commit,state }) => {
        commit('isFormValid');
        if(state.validForm){
            state.necessaryInputs = formMethods.getNecessaryValues(state.info);
        }
    },
    resetForm: ({ commit }) => commit('resetForm'),
    toggleIgnore: ({ commit , state }) => {
        commit('toggleIgnore');
        console.log('IgnoreInvalid set to: ' + state.ignoreInvalid);
    },
    restart: ({commit}) => {
        commit('resetForm');
        state.validForm = false;
        state.necessaryInputs = [];
    }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
})