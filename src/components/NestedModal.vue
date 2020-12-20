<template>
    <transition name="block">
        <div class="nested-modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <modal-header
                            :data="getNestedModal.selectedFolder"
                            modalType="nestedModal"/>
                    <div class="modal-body">
                        <file v-for="file in getNestedModal.selectedFolder.children.filter(val => val.type === 'file')"
                              :file="file"
                              :key="file.id"/>
                        <folder v-for="folder in getNestedModal.selectedFolder.children.filter(val => val.type === 'folder')"
                               :folder="folder"
                               :key="folder.id"
                               folderType="childNestedFolder"/>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import File from "./File";
  import Folder from "./Folder";
  import ModalHeader from "./ModalHeader";
  const closeIcon = require('../assets/close-icon.svg');
  const fullScreenIcon = require('../assets/full-screen-icon.svg');
  export default {
    name: "NestedModal",
    components: {ModalHeader, Folder, File},
    computed:{
      ...mapGetters([
        'getNestedModal'
      ])
    },
    data(){
      return{
        closeIcon,
        fullScreenIcon
      }
    }
  }
</script>

<style scoped lang="less">
    .block-enter {
        opacity: 0;
        transition : opacity 0.5s;
    }
    .block-enter-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .block-leave-active {
        transition: opacity 0.5s;
        opacity: 0;
    }
    .nested-modal-mask {
        position: absolute;
        z-index: 9997;
        top: 34px;
        left: 34px;
        max-width: 618px;
        width:100%;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        border-radius: 3px;
    }
    .modal-container {
        background-color: #fff;
        border-radius: 3px 3px 0 0;
        overflow:hidden;
        transition: all 0.3s ease;
    }
    .modal-body {
        display:flex;
        height: 753px;
        &__container{
            display: grid;
            grid-template-columns: 178px 178px 178px;
            grid-template-rows: 1fr 1fr;
            grid-column-gap: 8px;
            grid-row-gap: 8px;
        }
    }

</style>
