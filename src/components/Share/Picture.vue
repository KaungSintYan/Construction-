<template>
   <div class="form-group mb-3">
                        <p><small><b>{{ $t('picture') }}</b></small></p>                       
                            <div class="mb-1 designer_upload-image-list-container">
                                <!-- <div class="d-flex" v-for="obj of oldpictureImages" :key="obj.image_id">
                                    <div class="j-box" v-show="obj.isSelected">
                                        <img :src="obj.url" alt="" class="img-employee ml-4"> 
                                        <font-awesome-icon icon="fa-solid fa-circle-xmark" class="xmark ml-1" @click="removeoldpictureImages(obj.image_id,!obj.isSelected)" /><br>
                                    </div>                              
                                </div> -->
                                   
                                 <ul class="image__card">
                                    <li v-for="(obj, i) in pictureImages" :key="i">
                                      <img class="img__thumbnail" :src="obj.image_id == null ? obj.preview_url : obj.url" alt="" > 
                                      <label class="check__label">
                                       <font-awesome-icon icon="fa-solid fa-check" class="fa__check" />
                                      </label>
                                      <span class="item__actions">
                                        <span class="item__preview">
                                         <font-awesome-icon icon="fa-solid fa-search-plus" class="icon__action" @click="showPreview(obj.image_id ==null ? obj.preview_url : obj.url)"  />
                                        </span>
                                        <span class="item__delete">
                                          <font-awesome-icon icon="fa-solid fa-trash" class="icon__action"  @click="removeImage(obj.image_id, obj.image_id ==null ? obj.preview_url : obj.url)" />
                                        </span>
                                      </span>
                                    </li>                                    
                                 </ul>                                
                                <div class="_designer-upload-btn">
                                    <div class="add-icon">
                                        <label for="picture">
                                            <div class="iconfont text-center">
                                                <font-awesome-icon icon="fa-solid fa-circle-plus" />
                                            </div>
                                            <div class="icontext mt-2">
                                                {{ $t('add_file') }}
                                            </div>
                                        </label>
                                    </div>                                    
                                    <input type="file" ref="picture" id="picture" accept="images/*" multiple class="designer-upload-images-input" 
                                    v-on:change="pictureUpload" >
                                </div>
                                <el-dialog v-model="dialogVisible">
                                    <img :src="dialogImageUrl" alt="Preview Image" style="width: 100%" />
                                </el-dialog>                                
                            </div>
                            <div class="">
                                <p class="text-danger"> {{ $t('note-1') }} </p>
                            </div>
                    </div>
</template>
<script>

export default {
    data() {
        return{
             dialogVisible: false,
             dialogImageUrl: "",
             pictureImages: [],
             previewImages: []
        }
    },
    props: ['oldpictureImages'],
    emits :{
        picture: null, 
    },
    created(){      
        if(this.oldpictureImages != null && this.oldpictureImages != undefined) {
            this.changeImages();
        }        
    },
    methods: {  
        showPreview(url) {
            this.dialogImageUrl= url;
            this.dialogVisible= true;
        }, 
        removeImage(id, url){
            if(id != null){
                this.pictureImages = this.pictureImages.filter(x=> x.url != url);
            }
            else{
                this.pictureImages = this.pictureImages.filter(x=> x.preview_url != url);
            } 
           // console.log('remove'+ JSON.stringify(this.pictureImages));
            this.$emit("picture", this.pictureImages);   
            
        },        
        changeImages(){            
           for(let i=0; i<this.oldpictureImages.length; i++){
            let img= {
                    url: this.oldpictureImages[i].url,
                    image_id: this.oldpictureImages[i].image_id,
                    preview_url: null,
            }
            this.pictureImages.push(img);  
            this.$emit("picture", this.pictureImages);              
           }
        },
        pictureUpload(){           
            let img = this.$refs.picture.files;  
            for(let i=0; i< img.length; i++){ 
                let newImg= {
                    url: img[i],
                    image_id: null,
                    preview_url: URL.createObjectURL(img[i])
                }
                 this.pictureImages.push(newImg);    
                }  
               // console.log('list'+ JSON.stringify(this.pictureImages))
                this.$emit("picture", this.pictureImages);             
        },
    }
    
}
</script>
<style lang="scss">
.image__card {
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