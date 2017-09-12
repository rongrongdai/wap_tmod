import { BackendAtopcomment} from 'BackendApi';   // 后台api接口文件
<commentarea>
     <header>
     <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>{title}</div>
     <div class="top_as"></div>
     </header>
     <textarea placeholder="我也来晒" contenteditable="true" class="con  textAreaCon" id="textAreaCons"></textarea>
    
     <div class="upload_box">
                       <input class="hide" id="js-upload-input-1" type="file" autocomplete="off"  onchange={jupload}>
                        <div id="js-upload-btn-1" class="upload_btn fl" onclick={jsupload}>
                                 <img class="tsimg" src="/static/css/product_funding/funding/app_img/icontt.png" >                      
                        </div>

                        <div id="dd"> 
                    </div>
                       
    </div>
     <div id="UploadBox" style="display:none"></div>
     <div class="w_all">
                <input type="button" value="发布" class="btn_con " onclick={releaseall}>
     </div>


<script>
         // 手动触发file点击效果
         this.mixin('util');
         this.mixin('event');
         this.mixin('valiatorReg');
         let self=this;
         let  j=0;
         let tid;
         let bp;
         let imgHttpSrcFirList=[];
         let imgNativeSrcFirList=[];
         let imgObjPreviewsrc;
         this.title='话题·晒一晒'

     
     
     function upload(e){
            var docObj = document.getElementById("js-upload-input-1");
            var dd = document.getElementById("dd");
            var UploadBox = document.getElementById("UploadBox");
            var fileList = docObj.files;
          
        for (var i = 0; i < fileList.length; i++) { 
            dd.innerHTML += "<div class='removeimg' style='float:left' ><img class='deleteImg' style='position: relative ; left:160px;  top: 35px; z-index: 1222 ; width:35px; height:35px' src='/static/css/product_funding/funding/app_img/funding_close.png'  data-id="+ j +"> <img  style='margin:20px 20px 20px 0;' id='img" + i + ""+j+ "'  /> </div>";
            UploadBox.innerHTML += "<div  style='float:left' > <img style='margin:20px 20px 20px 0;' id='imgUpload" + i + ""+j+ "'  /> </div>";
            var  imgObjPreview = document.getElementById("img"+i+j); 
            var  imgUploadObjPreview = document.getElementById("imgUpload"+i+j); 
            if (docObj.files && docObj.files[i]) {
                //火狐下，直接设img属性
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '180px';
                imgObjPreview.style.height = '180px';
                //imgObjPreview.src = docObj.files[0].getAsDataURL();
                //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
                imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
                imgUploadObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
                

                imgUploadObjPreview.addEventListener("load", function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = imgUploadObjPreview.width;
                canvas.height = imgUploadObjPreview.height;
                ctx.drawImage(imgUploadObjPreview, 0, 0, imgUploadObjPreview.width, imgUploadObjPreview.height);
                imgObjPreviewsrc = canvas.toDataURL("image/jpeg");
                imgNativeSrcFirList.push(imgObjPreviewsrc); 
               }, false);
                
             }
         }  

          $(".deleteImg").click(function() {
              $(this).closest(".removeimg").remove();
               $(this).closest("#UploadBox").remove();
               var Id=$(this).data('id');
               imgNativeSrcFirList.splice(Id);
            });
      
         j++;
        return true;
    };
   

   self.jsupload=function(event){
             $('#js-upload-input-1').trigger('click');

         };
        
       self.jupload=function(event){
           upload(this);
       }
    

 //传id
function  getQueryStrings(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}




 //点击发布调用
function  summitParam(param){
         self.ajaxData('POST', BackendAtopcomment, param,(data) => {
                  window.history.go(-1);
         });
}

tid=getQueryStrings("id");

bp=getQueryStrings("bp");

if (bp==1) {
   this.title='话题·晒一晒';
}else {
   this.title='话题·说一说';
}

       
    //发布
    let textAreaCons;
    self.releaseall=function(event){
           textAreaCons =document.getElementById("textAreaCons").value;
           if(self.isEmpty(textAreaCons)){
               self.msg('请输入内容',1);
               return;
           }
            var  param={};
            param.tid=tid;
            param.content=textAreaCons;
           var length= imgNativeSrcFirList.length;
           if(length==0){
             summitParam(param);
             return;
           }

           for(var i=0;i<length;i++){
                    $.ajax({
                            type: "POST",
                            url: '/upload/binary',
                            data: '{src1: '+ imgNativeSrcFirList[i]+'}',
                            dataType: "json",
                            success: function (json) {
                                if (json.ret == 0) {
                                      var imgHttpSrcFir=json.data.pic;
                                       imgHttpSrcFirList.push( imgHttpSrcFir);
                                       if( imgHttpSrcFirList.length== length){
                                                        var imgHttpSrcing= imgHttpSrcFirList.toString();
                                                        param.picture=imgHttpSrcing;
                                                        summitParam(param);
                                       }
                                }
                            },
                            fail: function (json) {
                                console.log("img summit fail"+JSON.parse(json))
                            }
                        });
                   }
       
    }
    
      
 
</script>
</commentarea>