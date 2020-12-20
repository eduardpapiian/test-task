<template>
    <transition name="block">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <modal-header
                            :data="getDocumentModal.selectedFile"
                            modalType="documentModal"/>
                    <div class="modal-body">
                        <slot name="body">
                            <pdf :src="getDocumentModal.selectedFile.src"></pdf>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  import pdf from 'vue-pdf'
  import { mapGetters } from 'vuex'
  import ModalHeader from "./ModalHeader";
  const closeIcon = require('../assets/close-icon.svg');
  const fullScreenIcon = require('../assets/full-screen-icon.svg');
  export default {
    name: "DocumentModal",
    computed:{
      ...mapGetters([
        'getDocumentModal'
      ])
    },
    components: {
      ModalHeader,
      pdf
    },
    data(){
      return {
        closeIcon,
        fullScreenIcon,
      }
    },
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
    .modal-mask {
        position: absolute;
        z-index: 9997;
        top: 45px;
        right: 45px;
        max-width: 618px;
        width:100%;
    }

    .modal-container {
        background-color: #fff;
        border-radius: 3px 3px 0 0;
        transition: all 0.3s ease;
    }

    .modal-body {
        max-height: 753px;
        overflow:auto;
    }

</style>
