<template>
    <section class="main">
      <h1 class="main-title">便便检测器</h1>
      <p class="main-desc">请让便便在拍摄的图片中央，并保持光线明亮</p>
      <form class="upload-form" id="uform">
        <div class="upload">
          +
        </div>
        <img id="preview" src="#">
        <input id="image" name="file" type="file" accept="image/*" @change="changepic()" multiple hidden/>
        <button class="button" type="button" @click="submit">识别</button>
        <button class="button" type="reset" id="reset">重置</button>
      </form>
    </section>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import $ from 'jquery'
    export default {
        name: "scan",
        data(){
            return {
              formdata:undefined
            }
        },
        created() {
          if(this.$store.state.patient===undefined){
            MessageBox.alert("请先登录").then(action=>{
              this.$store.state.history_router = "/scan"
              this.$router.push("/account")
            })
          }
        },
        mounted() {
          /**
           * 这是基于html5的前端图片工具，压缩工具。
           */
          $(".upload").click(function () {
            $("#image").click()
          })
          $("#reset").click(function () {
            $(".upload").css("display", "flex");
            $("#preview").css("display", "none");
          })
        },
        methods:{
          changepic() {
            $(".upload").css("display", "none");
            var reads = new FileReader();
            var f = document.getElementById('image').files[0]
            reads.readAsDataURL(f);
            reads.onload = function(e) {
              document.getElementById('preview').src = this.result;
              $("#preview").css("display", "block");
            };
            var form=document.querySelector("#uform");
            this.formdata=new FormData(form);

            var oFile = $('#image')[0].files[0];
            var imgSize = oFile.size;
            if(imgSize > 600*600*3){
              // 图片压缩处理
              var reader   = new FileReader();
              var maxWidth = 600;
              var maxHeight= 600;
              var suffix = oFile.name.substring(oFile.name.lastIndexOf('.') + 1);

              reader.onload = function(e) {
                var base64Img= e.target.result;
                //--执行resize。
                var _ir=this.ImageResizer({
                  resizeMode:"auto",
                  dataSource:base64Img,
                  dataSourceType:"base64",
                  maxWidth:maxWidth, //允许的最大宽度
                  maxHeight:maxHeight, //允许的最大高度。
                  onTmpImgGenerate:function(img){
                  },
                  success:function(resizeImgBase64,canvas){
                    var blob = this.dataURLtoBlob(resizeImgBase64);
                    formdata.delete("file")
                    formdata.set("file", blob, oFile['name']);
                  }
                });
              };
              reader.readAsDataURL(oFile);
            }
          }
          ,ImageResizer(opts){
              var settings={
                resizeMode:"auto"//压缩模式，总共有三种  auto,width,height auto表示自动根据最大的宽度及高度等比压缩，width表示只根据宽度来判断是否需要等比例压缩，height类似。
                ,dataSource:"" //数据源。数据源是指需要压缩的数据源，有三种类型，image图片元素，base64字符串，canvas对象，还有选择文件时候的file对象。。。
                ,dataSourceType:"image" //image  base64 canvas
                ,maxWidth:800 //允许的最大宽度
                ,maxHeight:800 //允许的最大高度。
                ,onTmpImgGenerate:function(img){} //当中间图片生成时候的执行方法。。这个时候请不要乱修改这图片，否则会打乱压缩后的结果。
                ,success:function(resizeImgBase64,canvas){

                }//压缩成功后图片的base64字符串数据。
              };
              var appData={};
              $.extend(settings,opts);

              var innerTools={
                getBase4FromImgFile:function(file,callBack){

                  var reader = new FileReader();
                  reader.onload = function(e) {
                    var base64Img= e.target.result;
                    if(callBack){
                      callBack(base64Img);
                    }
                  };
                  reader.readAsDataURL(file);
                },

                //--处理数据源。。。。将所有数据源都处理成为图片对象，方便处理。
                getImgFromDataSource:function(datasource,dataSourceType,callback){
                  var _me=this;
                  var img1=new Image();
                  if(dataSourceType=="img"||dataSourceType=="image"){
                    img1.src=$(datasource).attr("src");
                    if(callback){
                      callback(img1);
                    }
                  }
                  else if(dataSourceType=="base64"){
                    img1.src=datasource;
                    if(callback){
                      callback(img1);
                    }
                  }
                  else if(dataSourceType=="canvas"){
                    img1.src = datasource.toDataURL("image/jpeg");
                    if(callback){
                      callback(img1);
                    }
                  }
                  else if(dataSourceType=="file"){
                    _me.getBase4FromImgFile(function(base64str){
                      img1.src=base64str;
                      if(callback){
                        callback(img1);
                      }
                    });
                  }
        },

        //计算图片的需要压缩的尺寸。当然，压缩模式，压缩限制直接从setting里面取出来。
        getResizeSizeFromImg:function(img){
          var _img_info={
            w:$(img)[0].naturalWidth,
            h:$(img)[0].naturalHeight
          };

          var _resize_info={
            w:0,
            h:0
          };

          if(_img_info.w <= settings.maxWidth && _img_info.h <= settings.maxHeight){
            return _img_info;
          }
          if(settings.resizeMode=="auto"){
            var _percent_scale=parseFloat(_img_info.w/_img_info.h);
            var _size1={
              w:0,
              h:0
            };
            var _size_by_mw={
              w:settings.maxWidth,
              h:parseInt(settings.maxWidth/_percent_scale)
            };
            var _size_by_mh={
              w:parseInt(settings.maxHeight*_percent_scale),
              h:settings.maxHeight
            };
            if(_size_by_mw.h <= settings.maxHeight){
              return _size_by_mw;
            }
            if(_size_by_mh.w <= settings.maxWidth){
              return _size_by_mh;
            }

            return {
              w:settings.maxWidth,
              h:settings.maxHeight
            };
          }
          if(settings.resizeMode=="width"){
            if(_img_info.w<=settings.maxWidth){
              return _img_info;
            }
            var _size_by_mw={
              w:settings.maxWidth
              ,h:parseInt(settings.maxWidth/_percent_scale)
            };
            return _size_by_mw;
          }
          if(settings.resizeMode=="height"){
            if(_img_info.h<=settings.maxHeight){
              return _img_info;
            }
            var _size_by_mh={
              w:parseInt(settings.maxHeight*_percent_scale)
              ,h:settings.maxHeight
            };
            return _size_by_mh;
          }
        },

        //--将相关图片对象画到canvas里面去。
        drawToCanvas:function(img,theW,theH,realW,realH,callback){

          var canvas = document.createElement("canvas");
          canvas.width=theW;
          canvas.height=theH;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img,
              0,//sourceX,
              0,//sourceY,
              realW,//sourceWidth,
              realH,//sourceHeight,
              0,//destX,
              0,//destY,
              theW,//destWidth,
              theH//destHeight
          );

          //--获取base64字符串及canvas对象传给success函数。
          var base64str=canvas.toDataURL("image/png");
          if(callback){
            callback(base64str,canvas);
          }
        }
      };

      //--开始处理。
      (function(){
        innerTools.getImgFromDataSource(settings.dataSource,settings.dataSourceType,function(_tmp_img){
          var __tmpImg=_tmp_img;
          settings.onTmpImgGenerate(_tmp_img);

          //--计算尺寸。
          var _limitSizeInfo=innerTools.getResizeSizeFromImg(__tmpImg);
          var _img_info={
            w:$(__tmpImg)[0].naturalWidth,
            h:$(__tmpImg)[0].naturalHeight
          };

          innerTools.drawToCanvas(__tmpImg,_limitSizeInfo.w,_limitSizeInfo.h,_img_info.w,_img_info.h,function(base64str,canvas){
            settings.success(base64str,canvas);
          });
        });
      })();

      var returnObject={


      };

      return returnObject;
    }
          ,dataURLtoBlob(dataurl) {
              var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
              while(n--){
                u8arr[n] = bstr.charCodeAt(n);
              }
              return new Blob([u8arr], {type:mime});
            }
          ,submit(){
            if(this.formdata!==undefined){
                this.$axios
                    .post('/api/patient/detect',this.formdata)
                    .then(data=>{
                      MessageBox.alert("识别结果:"+data.data.msg);
                    });
            }else{
              MessageBox.alert("上传失败");
            }
          }
        }
    }
</script>

<style scoped>
    .main{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .main-title{
        font-size: 2em;
    }
    .main-desc{
        font-size: 1em;
    }
    .upload{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: whitesmoke;
        margin: 0 10%;
        width: 80%;
        padding:25% 0 25% 0;
        font-size: 5em;
        opacity: 0.7;
        border-radius: 10px;
        border:none
    }
    .upload:hover{
        background-color: antiquewhite;
        cursor:pointer
    }
    .upload-form{
        text-align: center;
        width: 100%;
        height: 100%;
    }
    .button{
        margin: 100px 30px;
        border: none;
        border-radius: 5px;
        font-size: 1em;
        background-color: lightgreen;
        height:80px;
        width:120px;
    }
    .button:hover{
        background-color: greenyellow;
    }
    #preview{
        display: none;
        max-width: 60%;
        margin: auto;
    }
</style>