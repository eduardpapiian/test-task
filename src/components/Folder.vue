<template>
    <div class="folder-block">
        <div :class="{'selected' : folder.selected, 'folder-block__icon' : true}" @click="clickOnFolder(folder)">
            <img :src="folderIcon" alt="folder">
        </div>
        <div class="folder-block__text">
            {{folder.name}}
        </div>
    </div>
</template>

<script>
  const folderIcon = require('../assets/folder.svg');
  import { mapGetters } from 'vuex'

  export default {
    name: "Folder",
    props:{
      folder: {
        type: Object,
        required: true,
        default: () => {}
      },
      folderType: {
        type: String,
        required: false,
        default: 'default'
      },
    },
    computed: {
      ...mapGetters([
        'getParentModal', 'getNestedModal'
      ])
    },
    data(){
      return{
        folderIcon
      }
    },
    methods:{
      clickOnFolder(folder) {
        switch (this.folderType) {
          case 'default':
            if (this.getParentModal.open && this.getParentModal.selectedFolder.id === folder.id) return;
            this.$store.dispatch('openFolder', folder);
            break;
          case 'childFolder':
          case 'childNestedFolder':
            this.$store.dispatch('openNestedModal', folder);
            break;
          case 'fullScreenModalFolder':
            this.$store.dispatch('openFullScreenModal', folder);
            break;
        }
      }
    }
  }
</script>

<style scoped lang="less">
    .folder-block{
        width: 178px;
        height: 214px;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction: column;
        .selected{
            transform: scale(1.2);
        }
        &__icon{
            width:110px;
            height:110px;
            cursor:pointer;
            transition: transform .2s;
            &:hover{
                transform: scale(1.2);
            }
        }
        &__text{
            margin-top:14px;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #000000;
        }
    }
</style>
