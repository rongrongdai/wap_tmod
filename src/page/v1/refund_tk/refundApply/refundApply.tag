import { QqwUtil } from '../../../../js/qqw_ultilities';
import { BackendApiRefund } from 'BackendApi';	
<refundApply> 
	<div class="refundbox">
		<div class="goodsbox" data-goods_num="{ opts.goods_num }" data-goods_id="{ opts.goods_id }" data-order_sn="{ opts.order_sn }"  >
			<p class="tit">商品</p>
			<div class="imgbox">
				<ul class="imglist fl">
					<li class="goodsphoto fl" each="{ opts.goodslist }">
					   <img src="{ Product.pic }">
					</li>
				</ul>
				<div class="select_more fl"></div>
		            </div>
		</div>
		<div class="applybox">
			<div class="options" onclick={applyWhy}>
				<div class="why fl">
				   <span>*</span>
				   退款原因
				</div>
				<div class="reason fl applyreson">请选择退款原因</div>
				<div class="arrowup arrowicon fr">
				</div>
			</div>
			<div class="options" onclick={applyType}>
				<div class="why fl">
				   <span>*</span>
				   退款类型
				</div>
				<div class="reason fl resontype">请选择退款类型</div>
				<div class="arrowup arrowicon fr">
				</div>
			</div>
			<div class="options amout">
				<div class="why fl">
				   <span>*</span>
				   退款金额
				</div>
				<div class="reason fl reasonprice" data-refund_total="{ opts.return_money }">
				   { opts.return_money }
				</div>
				<div class="arrowup fr intext">
				(最多{ opts.max_return }元)
				</div>
			</div>
			<div class="options text">
				<div class="why instructions">
				   <span>*</span>
				   退款说明（可不填写）
				</div>
				<div class="textarea">
					<textarea class="textcon" name="neirong" style=" height:100%;"></textarea>
				</div>
				<p class="morenum">最多200字</p>
				
			</div>
			<div class="pz_img">
			           <input class="hide" id="js-upload-input-1" type="file" autocomplete="off"  onchange={jupload}>
				<div class="options proof_picture"  id="js-upload-btn-1" class="upload_btn fl" onclick={jsupload}>
	                                    	<div class="why fl">
					   <span>*</span>
					   上传凭证
					</div>
					<div class="arrowup intext fr">
					(最多5张)
					</div>
	                                    </div>
	                                    <div class="picbox hide" id="dd">
	                                    </div>
	                                     <div id="UploadBox" style="display:none"></div>
			</div>
		</div>
	</div>
	<div class="fixed_bg hide" id="refund_reason" onclick={closebg}>
		<div class="reason_list">
			<p class="tit">选择退款原因</p>
			<ul class="listbox">
				<li class="listcon" each="{ opts.reasonlist }">
					<div class="fl con">{ refundReason.type_name}</div>
					<input type="radio" name="reason fr" class="checkedbtn fr" data-type_id="{ refundReason.type_id}" data-type_name="{ refundReason.type_name}" onclick={resonbtn}/>
				</li>
			</ul>
		</div>
	</div>
	<div class="fixed_bg hide"  id="refund_type" onclick={closebg}>
		<div class="reason_list">
			<p class="tit">选择退款类型</p>
			<ul class="listbox">
				<li class="listcon" each="{ opts.reasontype }">
					<div class="fl con">{ typeReason.value}</div>
					<input type="radio" name="reason fr" class="checkedbtn fr" data-key="{ typeReason.key}" data-value="{ typeReason.value}" onclick={typebtn}/>
				</li>
			</ul>
		</div>
	</div>
	<div class="fotbar" onclick={submitRefund}>提交申请</div>
  	  <script>
	  	this.mixin('util');
	  	this.mixin('event');
	  	let self = this;
	         let  j=0;
	         let tid;
	         let bp;
	         let imgHttpSrcFirList=[];
	         let imgNativeSrcFirList=[];
	         let imgObjPreviewsrc;
	  	let ordersn="";
	  	let goodsid="";
	  	let goodsnumber="";
	  	let refundtotal="";
	  	let descs="";
	  	this.on('updated', () => {
         	  	 	ordersn=$(".goodsbox").data("order_sn");
         	  	 	goodsid=$(".goodsbox").data("goods_id");
	  	            goodsnumber=$(".goodsbox").data("goods_num");
	  	            refundtotal=$(".reasonprice").data("refund_total");
	  	             descs=$(".textcon").val();
		});
	  	let reasontype="";
	  	let receivestatus="";
	  	//上传图片控件
		     function upload(e){
			            var docObj = document.getElementById("js-upload-input-1");
			            var dd = document.getElementById("dd");
			            var UploadBox = document.getElementById("UploadBox");
			            var fileList = docObj.files;
			          
			        for (var i = 0; i < fileList.length; i++) { 
			            dd.innerHTML += "<div class='removeimg'><img class='deleteImg' src='/static/css/product_funding/funding/app_img/funding_close.png'  data-id="+ j +"> <img class='img' id='img" + i + ""+j+ "'  /> </div>";
			            UploadBox.innerHTML += "<div  style='float:left' > <img style='margin:0px 10px;' id='imgUpload" + i + ""+j+ "'  /> </div>";
			            var  imgObjPreview = document.getElementById("img"+i+j); 
			            var  imgUploadObjPreview = document.getElementById("imgUpload"+i+j); 
			            if (docObj.files && docObj.files[i]) {
			                //火狐下，直接设img属性
			                imgObjPreview.style.display = 'block';
			                imgObjPreview.style.width = '120px';
			                imgObjPreview.style.height = '120px';
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
		this.applyWhy= function(event) {
			$("#refund_reason").removeClass("hide");
		};
		this.applyType= function(event) {
			$("#refund_type").removeClass("hide");
		};
		//选择退款原因
		this.resonbtn= function(event) {
			// event.preventDefault();
			let  refund=$(".applyreson");
			let  resontext=event.currentTarget.dataset.type_name;
			 refund.html(resontext);
			 $(".fixed_bg").addClass("hide");
			 reasontype=event.currentTarget.dataset.type_id;
		};
		//选择退款类型
		this.typebtn= function(event) {
			let  rtype=$(".resontype");
			let  rtypetext=event.currentTarget.dataset.value;
			 rtype.html(rtypetext);
			 $(".fixed_bg").addClass("hide"); 
			 receivestatus=event.currentTarget.dataset.key;
		};
		//上传图片
		   this.jsupload=function(event){
		       if($(".removeimg").length>=5){
                                    QqwUtil.msg("最多可上传5张图片！",true);
		       }else{
		       	$('#js-upload-input-1').trigger('click');
		       }
		       $(".picbox").removeClass("hide");
		   }
		     self.jupload=function(event){
		           upload(this);
		       }
	            //判断参数是否为空
		this.submitRefund= function(event) {
			            let param={order_sn:ordersn,goods_id:goodsid,goods_number:goodsnumber,reason_type:reasontype,receive_status:receivestatus,refund_total:refundtotal,desc:descs,picture:""};
			            let resoncon=$(".applyreson").html();
				let typecon=$(".resontype").html();
				if(resoncon=="请选择退款原因"){
				           QqwUtil.msg("请选择退款原因！",true);
				           return;
			            }
			            else if(typecon=="请选择退款类型"){
					QqwUtil.msg("选择退款类型！",true);
					return;
			            }
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
			             
		};
		 //提交申请
		function  summitParam(param){ 
		         self.ajaxData('POST', BackendApiRefund, param,(data) => {
				 window.location.href= '/mobile-user-order/refund?order_sn='+ordersn;
		         });
		}	
	  </script>	
</refundApply>