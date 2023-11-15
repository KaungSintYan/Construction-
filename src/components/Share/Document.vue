<template>
     <div class="form-group mb-5">
                        <p><small><b>{{ $t('appendix') }}</b></small></p>    
                            <div class="mb-1 designer_upload-image-list-container">
                                <!-- <div class="d-flex" v-for="obj of oldappendixImages" :key="obj.file_id">
                                    <div class="j-box" v-show="obj.isSelected">
                                        <font-awesome-icon icon="fa-solid fa-file" class="file_icon" />
                                        <font-awesome-icon icon="fa-solid fa-circle-xmark" class="xmark ml-1" @click="removeoldappendixImages(obj.file_id,!obj.isSelected)" /><br>
                                    </div>                              
                                </div> -->

                                <ul class="file_card">
                                    <li v-for="(obj, i) in appendixImages" :key="i">
                                      <img class="img__thumbnail" src="../../assets/images/file-icon.jpg" alt="" > 
                                      <label class="check__label">
                                       <font-awesome-icon icon="fa-solid fa-check" class="fa__check" />
                                      </label>
                                      <span class="item__actions">
                                        <!-- <span class="item__preview">
                                         <font-awesome-icon icon="fa-solid fa-search-plus" class="icon__action" @click="showPreview(obj.file ==null ? obj.preview_url : obj.url)"  />
                                        </span> -->
                                        <span class="item__delete">
                                          <font-awesome-icon icon="fa-solid fa-trash" class="icon__action"  @click="removeFile(obj.file_id, obj.file_id ==null ? obj.preview_url : obj.url)" />
                                        </span>
                                      </span>
                                    </li>                                    
                                 </ul>     
                                <div class="_designer-upload-btn">
                                    <div class="add-icon">
                                        <label for="appendix">
                                            <div class="iconfont text-center">
                                                <font-awesome-icon icon="fa-solid fa-plus fa-2xl" />
                                            </div>
                                        </label>
                                    </div>                                    
                                    <input type="file" ref="appendix" id="appendix" accept="images/*"  multiple class="designer-upload-images-input" 
                                    v-on:change="appendixUpload">
                                </div>                                
                            </div>
                            <div class="">
                                <p class="text-danger"> {{ $t('note-2') }} </p>
                            </div>
                    </div>

</template>
<script>
export default {
   data() {
        return{         
            appendixImages: [],
        }
    },
    props: ['oldappendixImages'],
    emits :{
        appendix: null, 
    },
    created() {       
        if(this.oldappendixImages != null && this.oldappendixImages != undefined) {
            this.changeFiles();
        } 

    },
    methods:{
       
        removeFile(id, url){
            if(id != null){
                this.appendixImages = this.appendixImages.filter(x=> x.url != url);
            }
            else{
                this.appendixImages = this.appendixImages.filter(x=> x.preview_url != url); 
            }
            this.$emit("appendix", this.appendixImages);  
        },        
        changeFiles(){            
           for(let i=0; i<this.oldappendixImages.length; i++){
            // let file= {
            //         url: this.oldappendixImages[i].url,
            //         file_id: this.oldappendixImages[i].file_id,                   
            // }
            this.appendixImages.push(this.oldappendixImages[i]);                
           }
           this.$emit("appendix", this.appendixImages); 
        },        
        appendixUpload(){         
          let imgs = this.$refs.appendix.files;  
            for(let i=0; i< imgs.length; i++){
                    let newImg= {
                        url: imgs[i],
                        file_id: null                      
                    }
                    this.appendixImages.push(newImg);    
            }              
            this.$emit("appendix", this.appendixImages); 
        },
    }
    
}
</script>
<style lang="scss" scoped>

.file_card {
    display: inline-flex;
    flex-wrap: wrap;
    margin: 0;
    li {
        padding: 0;
        list-style: none;
        position: relative;
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 6px;
        box-sizing: border-box;
        width: 80px;
        height: 80px;
        margin: 0 8px 8px 0;
        padding: 0;
        display: inline-flex;
        &:hover{
            .check__label {
                opacity: 0;
                display: block;
            }
        }
        .img__thumbnail {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .check__label {
            position: absolute;           
            line-height: inherit;           
            justify-content: center;
            align-items: center;           
            display: inline-flex;
            right: -15px;
            top: -6px;
            width: 40px;
            height: 24px;
            background: var(--el-color-success);
            text-align: center;
            transform: rotate(45deg);            
            .fa__check {
                font-size: 12px;
                color: #fff;
                margin-top: 11px;
                transform: rotate(-45deg);
                }

        }
        .item__actions {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            cursor: default;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: var(--el-overlay-color-lighter);
            transition: opacity var(--el-transition-duration);
            &:hover {
                opacity: 1;
            }
            .item__preview, .item__delete {
                font-size: 18px;
                padding: 5px;
            }          

        }
    }
}
.j-box{
    position: relative;
    width: 100px;
    // height: 150px;
    .img-employee{
    width: 35px;
    height: 35px;
    }
    .file_icon {
       width: 35px;
       height: 35px;
       color: lightseagreen;
    }
    .xmark{
        top: 0;
        right: 0;
        cursor: pointer;
     }
 }
.designer_upload-image-list-container{
    display: flex;
    flex-wrap: wrap;
    vertical-align: baseline;
}
._designer-upload-btn{
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    border: 1px dashed #c0ccda;
    background-color: #fbfdff;
    cursor: pointer;
    transition: all .15s;
}
.iconfont{
    font-family: "iconfont";
    font-size: 16px;
    font-style: normal;
    cursor: pointer;
}
.icontext{
    font-size: 14px;
    cursor: pointer;
}
.designer-upload-images-input{
    display: none;
}
</style>