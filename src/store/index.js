import Vue from 'vue'
import Vuex from 'vuex'
const FOLDERS = require('../../folders.json');
Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    folders: [],
    parentModal: {
      open: false,
      selectedFolder: null
    },
    nestedModal: {
      open: false,
      selectedFolder: null
    },
    documentModal: {
      open: false,
      selectedFile: null
    },
    fullScreenModal: {
      open: false,
      data: null
    }
  },
  mutations: {
    setDefaultFolders(state, payload) {
      state.folders = payload
    },
    openParentModal(state, payload) {
      state.parentModal.selectedFolder = payload;
      state.parentModal.selectedFolder.children.filter(val => val.selected = false);
      state.parentModal.open = true;
      state.folders.forEach((val) => {
        val.selected = val.id === payload.id;
      });
    },
    closeParentModal(state){
      state.parentModal.selectedFolder = null;
      state.parentModal.open = false;
      state.folders.filter(val=> val.selected = false)
    },
    openNestedModal(state, payload) {
      state.nestedModal.open = true;
      state.nestedModal.selectedFolder = payload;
      state.parentModal.selectedFolder.children.forEach((val) => {
        val.selected = val.id === payload.id;
      });
    },
    uncheckParentFolder(state){
      state.parentModal.selectedFolder.children.filter(val=> val.selected = false);
    },
    openDocumentModal(state, payload) {
      state.documentModal.open = true;
      state.documentModal.selectedFile = payload;

    },
    closeDocumentModal(state) {
      state.documentModal.open = false;
      state.documentModal.selectedFile = null;
    },
    uncheckSelectedFile(state){
      if (state.parentModal.selectedFolder) {
        state.parentModal.selectedFolder.children.forEach(val => {
          if (val.type === 'file') val.selected = false
        })
      }
      if (state.nestedModal.selectedFolder) {
        state.nestedModal.selectedFolder.children.forEach(val => {
          if (val.type === 'file') val.selected = false
        })
      }
    },
    resetNestedModal(state) {
      state.nestedModal.open = false;
      state.nestedModal.selectedFolder.children.filter(val => val.selected = false);
      state.nestedModal.selectedFolder = null
    },
    openFullScreenModal(state, payload) {
      state.fullScreenModal.open = true;
      state.fullScreenModal.data = payload
    },
    closeFullScreenModal(state){
      state.fullScreenModal.open = false;
      state.fullScreenModal.data = null
    }
  },
  getters: {
    getDefaultFolders: state => {
      return state.folders
    },
    getParentModal: state => {
      return state.parentModal
    },
    getNestedModal: state => {
      return state.nestedModal
    },
    getDocumentModal: state  => {
      return state.documentModal
    },
    getFullScreenModal: state  => {
      return state.fullScreenModal
    }
  },
  actions: {
    setDefaultFolders(context) {
      return new Promise(resolve => {
        context.commit('setDefaultFolders', FOLDERS.folders);
        resolve(FOLDERS.folders)
      })
    },
    openFolder({ commit, state }, payload) {
      commit('openParentModal', payload);
      if (state.documentModal.open) commit('closeDocumentModal');
      if (state.nestedModal.open) commit('resetNestedModal');
    },
    closeParentModal({state, commit}){
      commit('closeParentModal');
      if (state.documentModal.open) commit('closeDocumentModal');
    },
    openNestedModal({ state, commit }, payload) {
      commit('openNestedModal', payload);
      if (state.documentModal.open) commit('closeDocumentModal');
    },
    closeNestedModal(context){
      context.commit('resetNestedModal');
      context.commit('uncheckParentFolder');
      context.commit('closeDocumentModal');
    },
    openDocumentModal(context, payload) {
      context.commit('openDocumentModal', payload);
    },
    closeDocumentModal(context) {
      context.commit('closeDocumentModal');
      context.commit('uncheckSelectedFile');
    },
    openFullScreenModal(context, payload) {
      context.commit('openFullScreenModal', payload);
    },
    closeFullScreenModal(context){
      context.commit('closeFullScreenModal');
    }
  }
})
