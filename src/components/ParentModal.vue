<template>
    <transition name="block">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <modal-header
                            :data="data.selectedFolder"
                            modalType="parentModal"/>
                    <div class="modal-body">
                            <draggable
                                    :list="data.selectedFolder.children"
                                    group="folders"
                                    :sort="false"
                                    class="modal-body__container">

                                <div v-for="child in data.selectedFolder.children"
                                     :key="child.id">

                                    <file v-if="child.type === 'file'" :file="child"/>
                                    <folder v-if="child.type === 'folder'" :folder="child" folderType="childFolder"/>

                                </div>
                            </draggable>
                    </div>
                </div>
            </div>
            <nested-modal v-if="getNestedModal.open"/>
        </div>
    </transition>
</template>

<script>
  import File from "./File";
  const closeIcon = require('../assets/close-icon.svg');
  const fullScreenIcon = require('../assets/full-screen-icon.svg');
  import draggable from 'vuedraggable'
  import Folder from "./Folder";
  import NestedModal from "./NestedModal";
  import { mapGetters } from 'vuex'
  import ModalHeader from "./ModalHeader";

  export default {
    name: "ParentModal",
    components: {ModalHeader, NestedModal, Folder, File, draggable},
    props:{
      data: {
        type: Object,
        required: true,
        default: () => {}
      }
    },
    computed:{
      ...mapGetters([
        'getNestedModal'
      ])
    },
    data(){
      return {
        closeIcon,
        fullScreenIcon
      }
    }
  }
</script>

<style lang="less" scoped>
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
    .modal-mask {
        position: absolute;
        z-index: 9997;
        top: 45px;
        left: 45px;
        max-width: 618px;
        width:100%;
    }
    .modal-container {
        background-color: #fff;
        border-radius: 3px 3px 0 0;
        overflow:hidden;
        transition: all 0.3s ease;
    }
    .modal-body {
        height: 753px;
        display:flex;
        justify-content: center;
        &__container{
            display: grid;
            grid-template-columns: 178px 178px 178px;
            grid-template-rows: 214px 214px;
            grid-column-gap: 8px;
            grid-row-gap: 8px;
        }
    }
</style>
