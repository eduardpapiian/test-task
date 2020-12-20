<template>
    <div class="modal-header">
        <div class="modal-header__close-icon-block" @click="closeModal">
            <img :src="closeIcon" alt="close-icon">
        </div>
        <div class="modal-header__text-block">
            {{data.name}}
        </div>
        <div class="modal-header__fullscreen-icon-block" @click="openFullScreenModal(data)">
            <img :src="fullScreenIcon" alt="fullscreen-icon">
        </div>
    </div>
</template>

<script>
  const closeIcon = require('../assets/close-icon.svg');
  const fullScreenIcon = require('../assets/full-screen-icon.svg');
  export default {
    name: "ModalHeader",
    props:['modalType', 'data'],
    data(){
      return {
        closeIcon,
        fullScreenIcon
      }
    },
    methods:{
      closeModal(){
        switch (this.modalType) {
          case 'parentModal' :
            this.$store.dispatch('closeParentModal');
            break;
          case 'nestedModal' :
            this.$store.dispatch('closeNestedModal');
            break;
          case 'documentModal' :
            this.$store.dispatch('closeDocumentModal');
            break;
        }
      },
      openFullScreenModal(data){
        this.$store.dispatch('openFullScreenModal', data);
      }
    }
  }
</script>

<style scoped lang="less">
    .modal-header{
        display:flex;
        align-items:center;
        justify-content: space-between;
        height:34px;
        background: #FFFFFF;
        border-bottom: 1px solid #EDF0F0;
        &__close-icon-block{
            width:34px;
            cursor: pointer;
            img{
                width: 8px;
                transition: transform .2s;
            }
            &:hover{
                img{
                    transform: scale(1.1);
                }
            }
        }
        &__text-block{
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 14px;
            display: flex;
            align-items: center;
            text-align: center;
            color: #919696
        }
        &__fullscreen-icon-block{
            width:34px;
            cursor: pointer;
            img{
                width: 10px;
                transition: transform .2s;
            }
            &:hover{
                img{
                    transform: scale(1.1);
                }
            }
        }
    }
</style>
