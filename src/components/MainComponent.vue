<template>
    <div class="wrapper">
        <div class="wrapper__left-side">

        <ParentModal
                :data="getParentModal"
                v-if="getParentModal.open"/>

        </div>
        {{getDefaultFolders}}
        <div class="wrapper__right-side">
            <draggable :list="getDefaultFolders"
                       group="folders"
                       :sort="false"
                       handle=".draggable"
                       :move="checkMove"
                       class="wrapper__right-side_default-folder-container">

                <Folder v-for="folder in getDefaultFolders"
                        :key="folder.id"
                        :folder="folder"
                        :class="[{ 'draggable': !folder.selected }, `folder-block-${folder.id}`]"/>
            </draggable>
        </div>
        <div class="wrapper__document-modal">
            <document-modal v-if="getDocumentModal.open"/>
        </div>
        <full-screen-modal v-if="getFullScreenModal.open"/>
    </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { mapGetters } from 'vuex'
  import Folder from "./Folder";
  import ParentModal from "./ParentModal";
  import DocumentModal from "./DocumentModal";
  import FullScreenModal from "./FullScreenModal";
  export default {
    name: "MainComponent",
    components: {FullScreenModal, DocumentModal, ParentModal, Folder, draggable},
    computed: {
      ...mapGetters([
        'getDefaultFolders',
        'getParentModal',
        'getDocumentModal',
        'getFullScreenModal'
      ])
    },
    data() {
      return {

      }
    },
    methods:{
      checkMove(e) {
        return this.isDraggable(e.draggedContext);
      },
      isDraggable(context) {
        const { index } = context;
        return !this.getDefaultFolders[index].selected;
      }
    }
  }
</script>

<style scoped lang="less">
    .wrapper {
        background-color: #E2E6E6;
        display:flex;
        height:100%;
        &__left-side{
            flex:1;
        }
        &__right-side{
            flex:1;
            display: flex;
            align-items:center;
            justify-content: flex-start;
            &_default-folder-container {
                display: grid;
                grid-template-columns: 178px 178px 178px;
                grid-template-rows: 1fr 1fr;
                grid-column-gap: 8px;
                grid-row-gap: 8px;
                .folder-block-1{
                    grid-row-start: 1;
                    grid-column-start: 1;
                    grid-row-end: 2;
                    grid-column-end: 2;
                }
                .folder-block-2{
                    grid-row-start: 1;
                    grid-column-start: 2;
                    grid-row-end: 2;
                    grid-column-end: 3;
                }
                .folder-block-3{
                    grid-row-start: 1;
                    grid-column-start: 3;
                    grid-row-end: 2;
                    grid-column-end: 4;
                }
                .folder-block-4{
                    grid-row-start: 2;
                    grid-column-start: 1;
                    grid-row-end: 3;
                    grid-column-end: 2;
                }
                .folder-block-5{
                    grid-row-start: 2;
                    grid-column-start: 2;
                    grid-row-end: 3;
                    grid-column-end: 3;
                }
                .folder-block-6{
                    grid-row-start: 2;
                    grid-column-start: 3;
                    grid-row-end: 3;
                    grid-column-end: 4;
                }
            }
        }
    }
</style>
