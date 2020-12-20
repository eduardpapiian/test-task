<template>
    <div class="file-block">
        <div :class="{'selected' : file.selected, 'file-block__icon' : true}" @click="clickOnFile(file)">
            <img :src="fileIcon" alt="file">
        </div>
        <div class="file-block__text">
            {{file.name}}
        </div>
    </div>
</template>

<script>
  const fileIcon = require('../assets/file-icon.svg');

  export default {
    name: "File",
    props:{
      file: {
        type: Object,
        required: true,
        default: () => {}
      },
      fileType: {
        type: String,
        required: false,
        default: 'default'
      },
    },
    data(){
      return{
        fileIcon
      }
    },
    methods:{
      clickOnFile(file) {
        if (this.fileType === 'fullScreenModalFile') return this.$store.dispatch('openFullScreenModal', file);

        if (file.selected) {
          file.selected = !file.selected;
          this.$store.dispatch('closeDocumentModal');
        } else {
          file.selected = !file.selected;
          this.$store.dispatch('openDocumentModal', file)
        }

      }
    }
  }
</script>

<style scoped lang="less">
    .file-block{
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
                transform: scale(1.1);
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
