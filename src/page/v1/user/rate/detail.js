// import './evaluate.scss'






//
//var detail = {
//	    options:{
//	        isLock:!1
//	    },
//	    order_sn: '',
//	    goods_id:0,
//        maxnum : 5,
//        goodId : [],
//        upload : [],
//        picList : {},
//        flag : true,
//	    init:function(order_sn, goods_id) {
//	        var i = this;
//	        i.loading = new G.loading(),
//	        i.order_sn = order_sn, i.goods_id = goods_id;
//	        i.goodId.push(goods_id);
//	        i.bind();
//	    },
//	    bind:function() {
//	        var i = this;
//	        i.getDetail();
//	        i.initUpload();
//	        $("#J-btnComment").click(function() { //detail.js
//	        	i.doUpload();
//			});
//	    },
//	    getDetail:function() {
//	        var i = this;
//	        ajaxData('get', '/user-order/orderGoods?client=web',
//	                {order_sn: i.order_sn, goods_id: i.goods_id},
//	                function(data){
//	                	i.renderDetailData(data);
//	        });
//	    },
//	    renderDetailData: function(data){
//	        var json = {};
//	        json.data = data;
//	        //renderTemplate.html('U-orderDetail', 'U-orderDetailData', json);
//	        $("#J-orderGooodsImg").attr('src', data.goods_thumb);
//	        this.bindBtn();
//	     },
//	     bindBtn:function(){
//	    	 var btnEl = $("#J-starList").find('dd');
//	    	 var o = this;
//	    	 for(var i = 0; i < btnEl.length; i++){
//	    		 $(btnEl[i]).click(function(){
//	    			 o.doEvaluation($(this));
//	    		 });
//	    	 }
//	     },
//
//	    doEvaluation : function(el) {
//	 		var list = $("#J-starList").find('dd');
//	 		var value = $(el).data("star");
//	 		var info = value.split("_");
//	 		var num = parseInt(info[1]);
//	 		for (var i = 0; i < list.length; i++){
//	 			var val = $(list[i]).data("star");
//	 			var arr = val.split("_");
//	 			list[i].className = parseInt(arr[1]) <= num ? "curr" : "";
//	 		}
//	 		$("#J-msgtitle-" + info[0]).html(info[2]);
//	 		$("#J-hiddenId-" + info[0]).val(num);
//	 		$("#J-content-" + info[0]).attr('placeholder', info[3]);
//	 	},
//	 	initUpload : function() {
//	    	for (var i = 0; i < this.goodId.length; i++)
//	 	    {
//
//	 			var option = {
//	 				"file" : "file_" + this.goodId[i], "gid" : 	this.goodId[i]
//	 			};
//	 			option.back = this.backUpload;
//	 			option.num = i;
//	 			this.upload.push(new Upload(option));
//	 	    }
//	    	//console.log(this.upload[0].gid);
//	 	},
//	 	backUpload : function(picList, num) {
//	 		var o = this;
//
//	 		detail.picList = picList;
//	 		detail.addComment();
//	 		return;
//			var upload = this.upload[num];
//			if (picList.length > 0){
//				this.picList[upload.gid] = picList;
//			}
//			upload.picnum = 0;
//			if (num + 1 != this.upload.length){
//				this.doUpload(num + 1);
//		    }
//			else{
//				//console.log(this.options.picList, '11');
//				this.addComment();
//			}
//		},
//		doUpload : function(n) {
//
//			if (!n){
//				var hasPic = false;
//				for (var i = 0; i < this.upload.length; i++){
//				    if (this.upload[i].picnum > 0){
//				    	hasPic = true;
//				    	break;
//				    }
//				}
//				if (!hasPic){
//					this.addComment();
//					//console.log(this.options.picList, '22');
//					return true;
//				}
//				n = 0;
//				if (!this.flag){
//					return false;
//				}
//
//			}
//			var file = this.upload[n];
//			if (file.picnum > 0 ){
//				file.upload();
//			}
//		},
//		addComment : function() {
//			var i = this;
//            var isHide=0;
//			i.flag = false;
//            if($(".or_item1").prop("checked")){
//                isHide=1
//            }
//			$.post("/goods-comment/add?client=web", {
//				order_sn:i.order_sn,
//				goods_id:i.goods_id,
//				content:$("#J-content-"+i.goods_id).val(),
//				comment_rank:$("#J-hiddenId-"+i.goods_id).val(),
//                ishide:isHide,
//				//img_list:i.picList,
//	            client_flag:'web',
//	        }, function(t) {
//	        	i.loading.hide(), 0 == t.ret ? location.href = '/mobile-user-order/detail?order_sn=' + i.order_sn :G.msg(t.msg);
//
//	        }, "json");
//		}
//},goods = {
//	    options:{
//	        isLock:!1
//	    },
//	    init:function() {
//	        var e = this;
//	        e.loading = new G.loading(),
//	        e.bind();
//	    },
//	    bind:function() {
//	        var e = this;
//	        e.getData();
//
//	    },
//	    getData:function() {
//	    	var e = this;
//	        ajaxData('get', '/user-order/detail?client=web',
//	                {
//		        	order_sn:G.getUrlParam('order_sn'),
//	                },
//	                function(data){
//	                	 e.orderDetailData(data);
//	        });
//	    },
//	    orderDetailData: function(data){
//	    	var e = this;
//	        var json = {};
//	        json.list = data.goods_list;
//	        renderTemplate.html('R-goodsList', 'R-goodsListData', json);
//	     },
//};
//var Upload = function(option) {
//	this.option = option;
//    this.webupload = "";
//    this.picnum = 0;
//    this.gid = option.gid;
//    this.num = option.num;
//    this.back = option.back ? option.back : function() {};
//    this.cur = 1;
//    this.picList = [];
//    this.init();
//}
//
//$.extend(Upload.prototype, {
//	uploadnum : 5,
//	init : function() {
//		var id = "file_" + this.gid;
//		var uploader = WebUploader.create({
//
//		    // 选完文件后，是否自动上传。
//		    auto: false,
//
//		    // swf文件路径
//		    swf: '/static/js/webuploader/Uploader.swf',
//
//		    // 文件接收服务端。
//		    server: '/upload/binary',
//
//		    // 选择文件的按钮。可选。
//		    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
//
//		    pick: {
//	            id: "#" + id,
//	            label: ''
//	        },
//
//		    // 只允许选择图片文件。
//		    accept: {
//		        title: 'Images',
//		        extensions: 'jpg,jpeg,bmp,png',
//		        mimeTypes: 'image/*'
//		    },
//		    compress  : {
//                width : 640,
//
//		        // 图片质量，只有type为`image/jpeg`的时候才有效。
//		        quality: 80,
//		        // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
//		        allowMagnify: false,
//
//		        // 是否允许裁剪。
//		        crop: false,
//
//		        // 是否保留头部meta信息。
//		        preserveHeaders: true,
//
//		        // 如果发现压缩后文件大小比原来还大，则使用原来图片
//		        // 此属性可能会影响图片自动纠正功能
//		        noCompressIfLarger: false,
//
//		        // 单位字节，如果图片大小小于此值，不会采用压缩。
//		        compressSize: 0
//		    },
//		    formData : {},
//		    fileNumLimit : this.uploadnum,
//		    sendAsBinary : true
//
//		});
//		var self = this;
//		// 当有文件添加进来的时候
//		uploader.on( 'fileQueued', function( file ) {
//            self.picnum++;
//		    // 创建缩略图
//		    // 如果为非图片文件，可以不用调用此方法。
//		    // thumbnailWidth x thumbnailHeight 为 100 x 100
//		    uploader.makeThumb( file, function( error, src ) {
//		         self.doThumb(src, file);
//		    }, 38, 38 );
//
//		});
//
//		uploader.on( 'uploadSuccess', function( file, str ) {
//			var json = eval("(" + str["_raw"] + ")");
//
//
//			//self.back(str);
//			//self.back(str["_raw"], self.num);
//			$("#picmsg_" + self.gid).innerHTML = "上传中" + self.cur + "/" + self.picnum;
//			if (json.ret == 0)
//			{
//				self.picList.push(json.data.pic);
//			}
//			self.cur++;
//		})
//
//		uploader.on('uploadFinished', function() {
//			self.back(self.picList, self.num);
//		});
//
//		this.webupload = uploader;
//	},
//	doThumb : function(src, file) {
//		var self = this;
//		var div = document.createElement("div");
//		div.className = "list";
//		div.innerHTML = '<img width="38" src="'+ src +'">';
//		div.onclick = function() {
//			self.webupload.removeFile(file);
//			div.parentNode.removeChild(div);
//			self.picnum--;
//			self.doShowAdd();
//		}
//
//		//var choose = $("#file_info_" + this.gid);
//		$("#file_info_" + this.gid).before(div);
//		this.doShowAdd();
//	},
//	doShowAdd : function() {
//		var state = this.picnum >= this.uploadnum ? 'none' : '';
//		//$("#file_info_" + this.gid).style.display = state;
//		$("#file_info_" + this.gid).css('display', state);
//	},
//	upload : function() {
//		this.webupload.upload();
//	}
//});