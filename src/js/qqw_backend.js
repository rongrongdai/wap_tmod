/**
 * 后台接口文件
 */

const
			BackendApiHomepage = '/main/main',           // 二期首页
			BackendApiTopCategoryList = '/main',                // 页面顶部分类
			BackendApiMinarticle = '/main/rec',				// 首页文章
			BackendApiSpecial = '/butler-article/special',			// 专题精选
			BackendApiSpecialTwo = '/butler-article/specialTwo',			// 专题精选二期
			BackendApiSpecialCategory = '/butler-article/category',			// 专题精选分类
			BackendApiDiscovery = '/find-main',									// 发现 - 发现（达人推荐）
			BackendApiCategory = '/category-main/index',							// 商品分类
			BackendApiSubcategory = '/goods-main/list',			// 商品列表（商品分类二级，cat_id: 分类ID）
			BackendApiBrand = '/goods-brand/list',							// 品牌制造商列表
			BackendApiLike = '/butler-article/like',						// 点赞接口
			BackendApiUnLike = '/butler-article/unlike',					// 取消点赞接口
			BackendApiCollectAdd = '/goods-favorite?a=add',			// 收藏
			BackendApiCollectDel = '/goods-favorite?a=del',			// 收藏
			BackendApiDasan = '/butler-article/reward',				// 文章打赏
			BackendApiDoyenList = '/mockwap/butler-doyen/list',			// 达人列表，doyen_type: 1-采购，2-编辑 3-达人
			BackendApiNavItem =  '/goods-main/newlist',			// 导航菜单商品列表
			BackendApiArticleLikeNum = '/butler-article/likenum',		          // 点赞数量
			BackendApiUserb = '/butler-doyen/detail',	// 体验官信息
			BackendApiArticleList = '/butler-article/list',		// 文章列表
			BackendApiBindButler = '/butler-main/bindButler',	 	// 选择管家
			BackendApiChooseList='/butler-main/butlerChooseList',       //选择管家列表
			BackendApiTagList='/tag-main/showTag' ,      //标签列表
			BackendApiTagChangeList='/tag-main/changeTag',     //标签列表
			BackendApiFocus='/user-follow/addFollow',     //关注管家
	                     BackendApiCancelFocus='/user-follow/cancelFollow',      //取消关注管家
	                     BackendApiBinds=' /butler-main/bind',                       //绑定管家接口
	                     BackendApisaveBind='/butler-main/saveBind',            //保存管家绑定信息
	                     BackendApisendSms='/integral-main/sendSms',          //发送短信接口 
	                     BackendApiGetTopicList='/topic-main/list',        //获取话题列表
	                     BackendApiGetTopicHead='/topic-main/index',         //获取话题头部信息
	                     BackendApiGetTopicDetail='/topic-main/detail',     //获取话题详情
                               BackendApiGetTopicCommentList='/topic-main/commentList',     //获取话题-评论列表
                               BackendApiGetColumnDetails='/butler-article/detail',     //获取专栏详情
                               BackendApiGetColumnComment='/butler-article/commonList',     //获取专栏评论列表
                               BackendApiToplist='/goods-Main/hotlist',     //top20商品列表
                               BackendApiGetZhuanlanList='/butler-article/getCateArticleList',     //获取专栏列表
                               BackendApiTopicmainikeLike='/topic-main/like',                //话题-评论点赞
                               BackendApiTopicmainundLike='/topic-main/unlike',               //话题-评论取消点赞
                               BackendApiunlikeComment='/butler-article/unlikeArticleComment',     //文章（专栏）评论取消点赞
                               BackendApilikeComment='/butler-article/likeArticleComment',            //文章（专栏) 评论点赞
                               BackendApilikeArticle='/butler-article/like',          //文章详情点赞
                               BackendApunlikeArticle='/butler-article/unlike',     //文章详情取消点赞
                               BackendAtopcomment='/topic-main/comment',      //话题
                               BackendApipublishComment='/butler-article/publishComment', //文章发布评论
                               BackendApiSixinList='/user-pm/index',  //消息中心-私信列表
                               BackendApiCommontList='/butler-article/commentList',  //消息中心-评价列表
                               BackendApiXitongList='/user-message/index',//消息中心-系统列表
                               BackendApiprivateLetter='/user-pm/detail' ,//用户私信详情
                               BackendApisendLetter='/user-pm/send' ,   //保存(发送)私信
                               BackendApimessageDetails='/user-message/detail', //系统消息详细信息
                               BackendApiwomenIndex='/marketing-special/getSpecialListByCate', //38专题首页
                               BackendApiwomanCook='/marketing-special/getSpecialGoodsBySpec',   //38-特卖活动信息
                               BackendApiClassCon='/category-main/oneCateGoodsList', //38-二级三级分类
                               BackendApiCateGoodsList='/category-main/cateGoodsList', //38-一级别分类
                               BackendApiRegister='/main/isRegister',  //判断是否注册
                               BackendApiGetIntegral='/integral-main/credits',   //获取积分
                               BackendApiGetSms='/integral-main/sendSms',  //获取积分验证码
                               BackendApiGetentCard='/marketing-anniversary/card' , //实体卡-详情页
                               BackendApiCardList='/user-card/list',  //426 卡片列表
                               BackendApiGetentCardDetail='/user-card/detail',  //卡包-卡片详情页
                               BackendApiShopCelebrationGoodslist='/Integral-main/exchange', //4.26兑礼商品列表
                               BackendApiShopCelebrationIndex='/marketing-anniversary/index', //4.26 店庆首页
                               BackendApiShopCelebrationScore='/Integral-main/getUserScore', //4.26 店庆获取积分信息
                               BackendApiGroupList='/user-groupbuy/list',//个人中心团购列表
							   BackendApiBookingIndex='/marketing-group/index', //拼团首页
							   BackendApiCardAreaList='/user-card/receiveArea',//获取城市区域
							   BackendApiCardShopList='/user-card/receiveAddress',//获取区域店铺地址
			                   BackendApiconfirmOrder='/user-card/confirmOrder',//卡包-确认订单
			 				   BackendApicreateOrder='/user-card/createOrder',//卡包-确认订单
			  				   BackendApisShow='/user-card/showCard',//卡包-炫耀
			   				   BackendApireceive='/user-card/receiveInfo',//领卡
		           		       BackendApireceiveResult='/user-card/receiveResult',//领卡结果
							   BackendApipayResult='/user-card/payResult',//卡包-支付结果
						   	   BackendApishareget='/share/get',//分享朋友圈
							   BackendApigroupBuyDetail='/User-Groupbuy/groupBuyDetail', //我的拼团-拼团详情
							   BackendApinewGift='/user-coupon/newGift',// 4.26新人领礼券
							   BackendApiBabySpecialList='/marketing-special/list',//妈妈宝贝特卖列表
							   BackendApinewGiftGoods='/goods-main/newGiftGoods', // 最优惠
							   BackendApinewGiftQualify ='/user-coupon/newGift', // 判断是否有优惠资格
							   BackendApiChoicegoods ='/user-order/getOrderGoods', // 选择售后商品
							   BackendApiApplyRefund ='/user-order/refundDetail',// 申请退款页面
							   BackendApiRefund ='/user-order/refund',// 提交退款申请
							   BackendApirefundeta ='/user-order/refundAfter',  // 退款详情页面(提交后) 
							   BackendApicurecord ='/user-order/refundConsult',  // 退款协商记录
							   BackendApiseckillIndex='/marketing-seckill/goodsList'  // 秒杀首页
export {
    BackendApiHomepage,
    BackendApiTopCategoryList,
	BackendApiMinarticle,
	BackendApiSpecial,
	BackendApiSpecialTwo,
	BackendApiSpecialCategory,
	BackendApiDiscovery,
	BackendApiCategory,
	BackendApiSubcategory,
	BackendApiBrand,
	BackendApiLike,
	BackendApiUnLike,
	BackendApiCollectAdd,
	BackendApiCollectDel,
	BackendApiDasan,
	BackendApiDoyenList,
	BackendApiNavItem,
	BackendApiArticleLikeNum,
	BackendApiUserb,
	BackendApiArticleList,
	BackendApiBindButler,
	BackendApiChooseList,
	BackendApiTagList,
	BackendApiTagChangeList,
	BackendApiFocus,
	BackendApiCancelFocus,
	BackendApiBinds,
	BackendApisaveBind,
	BackendApisendSms,
	BackendApiGetTopicList,
	BackendApiGetTopicHead,
	BackendApiGetTopicDetail,
	BackendApiGetTopicCommentList,
	BackendApiGetColumnDetails,
	BackendApiGetColumnComment,
	BackendApiGetZhuanlanList,
	BackendApiToplist,
	BackendApiTopicmainikeLike,
	BackendApiTopicmainundLike,
	BackendApiunlikeComment,
	BackendApilikeComment,
	BackendApilikeArticle,
	BackendApunlikeArticle,
	BackendAtopcomment,
	BackendApipublishComment,
	BackendApiSixinList,
	BackendApiCommontList,
	BackendApiXitongList,
	BackendApiprivateLetter,
	BackendApisendLetter,
	BackendApimessageDetails,
	BackendApiwomenIndex,
	BackendApiwomanCook,
	BackendApiClassCon,
	BackendApiCateGoodsList,
	BackendApiRegister,
	BackendApiGetIntegral,
	BackendApiGetSms,
	BackendApiGetentCard,
	BackendApiCardList,
	BackendApiGetentCardDetail,
	BackendApiShopCelebrationIndex,
	BackendApiShopCelebrationScore,
	BackendApiShopCelebrationGoodslist,
	BackendApiGroupList,
	BackendApiconfirmOrder,
	BackendApiBookingIndex,
	BackendApiCardAreaList,
	BackendApiCardShopList,
	BackendApisShow,
	BackendApireceive,
	BackendApireceiveResult,
	BackendApipayResult,
	BackendApishareget,
	BackendApigroupBuyDetail,
	BackendApinewGift,
	BackendApiBabySpecialList,
	BackendApinewGiftGoods,
	BackendApinewGiftQualify,
	BackendApiChoicegoods,
	BackendApiApplyRefund,
	BackendApiRefund,
	BackendApirefundeta,
	BackendApicurecord,
	BackendApiseckillIndex

};