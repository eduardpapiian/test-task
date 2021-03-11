<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="close-button" @click="closeFullScreenWrapper">
                    <img :src="closeIconCircle" alt="close-icon">
                </div>
                <div class="modal-container">
                    <div v-if="getFullScreenModal.data.type === 'folder'" class="modal-container__folders">
                        <file v-for="file in getFullScreenModal.data.children.filter(val => val.type === 'file')"
                              :file="file"
                              :key="file.id"
                              fileType="fullScreenModalFile"/>
                        <folder v-for="folder in getFullScreenModal.data.children.filter(val => val.type === 'folder')"
                                :folder="folder"
                                :key="folder.id"
                                folderType="fullScreenModalFolder"/>
                    </div>
                    <div v-else class="modal-container__file">
                        <pdf :src="getFullScreenModal.data.src"/>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import pdf from 'vue-pdf'
  import File from "./File";
  import Folder from "./Folder";
  const closeIconCircle = require('../assets/close-icon-circle.svg');
  export default {
    name: "FullScreenModal",
    components: {Folder, File, pdf},
    computed:{
      ...mapGetters([
        'getFullScreenModal'
      ])
    },
    data(){
      return {
        closeIconCircle
      }
    },
    methods:{
      closeFullScreenWrapper(){
        this.$store.dispatch('closeFullScreenModal')
      }
    }
  }
</script>

<style scoped lang="less">
    .modal-enter {
        opacity: 0;
        transition : opacity 0.5s;
    }
    .modal-enter-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .modal-leave-active {
        transition: opacity 0.5s;
        opacity: 0;
    }
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #E2E6E6;
        transition: opacity 0.3s ease;
        overflow:hidden;
        animation: expand 0.5s;
    }

    @-webkit-keyframes expand{
        0% {
            width:0;
            height:0;
        }
        100% {
            width:100%;
            height:100;
        }
    }

    .modal-wrapper {
        position: relative;
        .close-button{
            position:absolute;
            right:56px;
            top:56px;
            width:56px;
            cursor:pointer;
        }
    }

    .modal-container {
        &__folders{
            display:flex;
        }
        &__file{
            margin: 0 auto;
            max-width:700px;
        }
    }

    .modal-enter {
        opacity: 0;
    }
</style>
