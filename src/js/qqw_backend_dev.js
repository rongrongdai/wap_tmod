/**
 * 后台接口文件
 */
const
			BackendApiHomepage = '/mock/main/main',           // 二期首页
			BackendApiTopCategoryList = '/mock/main',                // 页面顶部分类
			BackendApiMinarticle = '/mock/main/rec',				// 首页文章
			BackendApiSpecial = '/mock/butler-article/special',			// 专题精选
			BackendApiSpecialTwo = '/mock/butler-article/specialTwo',			// 专题精选二期
			BackendApiSpecialCategory = '/mock/butler-article/category',			// 专题精选分类
			BackendApiDiscovery = '/find-main',									// 发现 - 发现（达人推荐）
			BackendApiCategory = '/category-main/index',							// 商品分类
			BackendApiSubcategory = '/goods-main/list',			// 商品列表（商品分类二级，cat_id: 分类ID）
			BackendApiBrand = '/goods-brand/list',							// 品牌制造商列表
			BackendApiLike = '/mock/butler-article/like',						// 点赞接口
			BackendApiUnLike = '/butler-article/unlike',					// 取消点赞接口
			BackendApiCollectAdd = '/goods-favorite?a=add',			// 收藏
			BackendApiCollectDel = '/goods-favorite?a=del',			// 收藏
			BackendApiDasan = '/butler-article/reward',				// 文章打赏
			BackendApiDoyenList = '/mockwap/butler-doyen/list',			// 达人列表，doyen_type: 1-采购，2-编辑 3-达人
			BackendApiNavItem =  '/mock/goods-main/newlist',			// 导航菜单商品列表
			BackendApiArticleLikeNum = '/butler-article/likenum',		          // 点赞数量
			BackendApiUserb = '/mock/butler-doyen/detail',		// 体验官信息
			BackendApiArticleList = '/mock/butler-article/list',		// 文章列表
			BackendApiBindButler = '/mock/butler-main/bindButler',		// 选择管家
			BackendApiChooseList='/mock/butler-main/butlerChooseList',       //选择管家列表
			BackendApiTagList='/mock/tag-main/showTag',      //标签列表
                               BackendApiTagChangeList='/mock/tag-main/changeTag',    //标签列表
                               BackendApiFocus='/mock/user-follow/addFollow',     //关注管家
                               BackendApiCancelFocus='/mock/user-follow/cancelFollow' ,    //取消关注管家
                               BackendApiBinds='/mock/butler-main/bind',                       //绑定管家接口
                               BackendApisaveBind='/mock/butler-main/saveBind',            //保存管家绑定信息
                               BackendApisendSms='/mock/integral-main/sendSms' ,
                               BackendApiGetTopicList='/mock/topic-main/list',         //获取话题列表
                               BackendApiGetTopicHead='/mock/topic-main/index',         //获取话题头部信息
                               BackendApiGetTopicDetail='/mock/topic-main/detail',    //获取话题详情
                               BackendApiGetTopicCommentList='/mock/topic-main/commentList',    //获取话题-评论列表
                               BackendApiGetColumnDetails='/mock/butler-article/detail',     //获取专栏详情
                               BackendApiGetColumnComment='/mock/butler-article/commonList',     //获取专栏评论列表
                               BackendApiGetZhuanlanList='/mock/butler-article/getCateArticleList',     //获取专栏列表
                               BackendApiTopicmainikeLike='/mock/topic-main/like',                //话题-评论点赞
                               BackendApiTopicmainundLike='/mock/topic-main/unlike',                //话题-评论取消点赞
                               BackendApiunlikeComment='/mock/butler-article/unlikeArticleComment',     //文章（专栏）取消点赞
                               BackendApilikeComment='/mock/butler-article/likeArticleComment',          //文章（专栏)点赞
                               BackendApilikeArticle='/mock/butler-article/like',          //文章详情点赞
                               BackendApunlikeArticle='/mock/butler-article/unlike',      //文章详情取消点赞
                               BackendAtopcomment='/mock/topic-main/comment',      //话题
                               BackendApipublishComment='/mock/butler-article/publishComment', //文章发布评论
                               BackendApiSixinList='/mock/user-pm/index', //消息中心-私信列表
                               BackendApiCommontList='/mock/butler-article/commentList', //消息中心-评价列表
                               BackendApiXitongList='/mock/user-message/index', //消息中心-系统列表
                               BackendApiprivateLetter='/mock/user-pm/detail' , //用户私信详情
                               BackendApisendLetter='/mock/user-pm/send',    //保存(发送)私信
                               BackendApimessageDetails='/mock/user-message/detail', //系统消息详细信息
                               BackendApiwomenIndex='/mock/marketing-special/getSpecialListByCate',   //38专题首页
                               BackendApiwomanCook='/mock/marketing-special/getSpecialGoodsBySpec',   //38-特卖活动信息
                               BackendApiClassCon='/mock/category-main/oneCateGoodsList', //38-二级三级分类
                               BackendApiCateGoodsList='/mock/category-main/cateGoodsList', //38-一级别分类
                               BackendApiRegister='/mock/main/isRegister',   //判断是否注册
                               BackendApiGetIntegral='/mock/integral-main/credits',   //获取积分
                               BackendApiGetSms='/mock/integral-main/sendSms',  //获取积分验证码
                               BackendApiGetentCard='/mock/marketing-anniversary/card',  //实体卡-详情页
                               BackendApiCardList='/mock/user-card/list',  //426 卡片列表
                               BackendApiGetentCardDetail='/mock/user-card/detail',  //卡包-卡片详情页
                               BackendApiShopCelebrationIndex='/mock/marketing-anniversary/index', //4.26 店庆首页
                               BackendApiShopCelebrationScore='/mock/Integral-main/getUserScore',
                               BackendApiShopCelebrationGoodslist='/mock/Integral-main/exchange', //4.26兑礼商品列表
                               BackendApiGroupList='/mock/user-groupbuy/list',//个人中心团购列表
		   BackendApiconfirmOrder='/mock/user-card/confirmOrder',//卡包-确认订单
		   BackendApicreateOrder='/mock/user-card/createOrder',//卡包-确认订单
		   BackendApiBookingIndex='/mock/marketing-group/index', //拼团首页
		   BackendApiCardAreaList='/mock/user-card/receiveArea',//获取城市区域
		   BackendApiCardShopList='/mock/user-card/receiveAddress',//获取区域店铺地址
		   BackendApisShow='/mock/user-card/showCard',//卡包-炫耀
		   BackendApireceive='/mock/user-card/receiveInfo',//领卡
		   BackendApireceiveResult='/mock/user-card/receiveResult',//领卡结果
		   BackendApipayResult='/mock/user-card/payResult',//卡包-支付结果
		   BackendApishareget='/mock/share/get',//分享朋友圈
		   BackendApigroupBuyDetail='/mock/User-Groupbuy/groupBuyDetail',//我的拼团-拼团详情
		   BackendApinewGift='/mock/user-coupon/newGift',// 4.26新人领礼券
		   BackendApiBabySpecialList='/mock/marketing-special/list', //妈妈宝贝特卖列表
		   BackendApinewGiftGoods='/mock/goods-main/newGiftGoods', // 最优惠
		   BackendApinewGiftQualify ='/mock/user-coupon/newGift',// 判断是否有优惠资格
		   BackendApiChoicegoods ='/mock/user-order/getOrderGoods',// 选择售后商品
		   BackendApiApplyRefund ='/mock/user-order/refundDetail',// 申请退款页面
		   BackendApiRefund ='/mock/user-order/refund',// 提交退款申请
		   BackendApirefundeta ='/mock/user-order/refundAfter',  // 退款详情页面(提交后) 
		   BackendApicurecord ='/mock/user-order/refundConsult',  // 退款协商记录
		   BackendApiseckillIndex='/mock/marketing-seckill/goodsList'  // 秒杀首页
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
	BackendApiShopCelebrationGoodslist,
	BackendApiGroupList,
	BackendApiconfirmOrder,
	BackendApicreateOrder,
    BackendApiBookingIndex,
    BackendApiCardAreaList,
	BackendApiCardShopList,
	BackendApiShopCelebrationScore,
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