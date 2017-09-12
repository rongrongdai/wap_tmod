import '../component/button/countdown.tag';
import '../component/card/wm_goods-list.tag';
<womanCook>
  <!--    <header>
      <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>{opts.spec_name}
           <span class="header_right" onclick={he_click}></span>
      </div>
      <div class="top_as"></div>
  </header> -->

   <div class="woc_bg"  style="background: url({opts.head_img}) center center no-repeat"></div>
   <countdown  countdow={opts}></countdown>

   <!--  美丽厨娘 -->
   <div class="wm_classification"  style="background: url({opts.goods_img}) center center no-repeat">
         <a href="{opts.os}{cationa[ opts.label ][0]}" class="cation_1"></a>
         <a href="{opts.os}{cationa[ opts.label ][1]}" class="cation_2"></a>
         <a href="{opts.os}{cationa[ opts.label ][2]}" class="cation_3"></a>
         <a href="{opts.os}{cationa[ opts.label ][3]}" class="cation_4"></a>
         <a href="{opts.os}{cationa[ opts.label ][4]}" class="cation_5"></a>
         <a href="{opts.os}{cationa[ opts.label ][5]}" class="cation_6"></a>
         <a href="{opts.os}{cationa[ opts.label ][6]}" class="cation_7"></a>
         <a href="{opts.os}{cationa[ opts.label ][7]}" class="cation_8"></a>
         <a href="{opts.os}{cationa[ opts.label ][8]}" class="cation_9"></a>
         <a href="{opts.os}{cationa[ opts.label ][9]}" class="cation_10"></a>
         <a href="{opts.os}{cationa[ opts.label ][10]}" class="cation_11"></a>
         <a href="{opts.os}{cationa[ opts.label ][11]}" class="cation_12"></a>
         <a href="{opts.os}{cationa[ opts.label ][12]}" class="cation_13"></a>
         <a href="{opts.os}{cationa[ opts.label ][13]}" class="cation_14"></a>
         <a href="{opts.os}{cationa[ opts.label ][14]}" class="cation_15"></a>
         <a href="{opts.os}{cationa[ opts.label ][15]}" class="cation_16"></a>
         <a href="{opts.os}{cationa[ opts.label ][16]}" class="cation_17"></a>
         <a href="{opts.os}{cationa[ opts.label ][17]}" class="cation_18"></a>
         <a href="{opts.os}{cationa[ opts.label ][18]}" class="cation_19"></a>
         <a href="{opts.os}{cationa[ opts.label ][19]}" class="cation_20"></a>
   </div>



  

   <goods-list class="goodslist" goodslist="{ opts.goodslist }"></goods-list>

   <div class="tail_web">
        <!--  美丽厨娘 -->
        <a if="{ opts.label == 5}"  href="{ opts.WomenTogo }" class="bannerwrap"><img src="/static/css/product_funding/funding/app_img/back3.8_1cn.png" /></a>
        <!--  社交女神 -->
        <a if="{ opts.label == 2}"  href="{ opts.WomenTogo }" class="bannerwrap"><img src="/static/css/product_funding/funding/app_img/back3.8_3shj.png" /></a>
        <!--  时尚辣妈 -->
        <a if="{ opts.label == 3}" href="{ opts.WomenTogo }" class="bannerwrap"><img src="/static/css/product_funding/funding/app_img/back3.8_4sx.png" /></a> 
        <!--  知性女人 -->
        <a if="{ opts.label == 4}"  href="{ opts.WomenTogo }" class="bannerwrap"><img src="/static/css/product_funding/funding/app_img/back3.8_5zx.png" /></a> 
        <!--  职场女王 -->
        <a if="{ opts.label == 1}"  href="{ opts.WomenTogo }" class="bannerwrap"><img src="/static/css/product_funding/funding/app_img/back3.8_6zye.png" /></a> 
       <!--  青春萌妹 -->
        <a if="{ opts.label == 0}"  href="{ opts.WomenTogo }" class="bannerwrap"><img src="/static/css/product_funding/funding/app_img/back3.8_2qc.png" /></a>
   </div>
    
    <!--点击返回顶部-->
    <div class="return_head" id='rtt'  onclick={jumptop}></div>

<script>
      this.mixin('util');
      this.mixin('event');
      let self = this;

   
      self.he_click=function(){
             var u = navigator.userAgent;
             var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
             var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
             var isweixin=u.indexOf('MicroMessenger') > -1;//微信终端
             if(isweixin){
                 location.href="/mobile-main";
             }else {
                location.href="/app-main";
             }
        
      };

    self.on('update',()=>{
        let self = this;
        if(self.getOptTopicList()){
            self.opts.goodslist = self.opts.goodslist.concat(self.getOptTopicList());  
            self.update();
        }
        // this.opts.goodslist = this.opts.goodslist.concat(this.qqwPageState.get('items'));
      });
      self.cationa=[
          [3134,3136,3135,3141,3115,3146,3156,3179,3157,3124,3178,3102,3072,3098,3086,3083,3105,3074,3078,3122],     //青春萌妹
          [3062,3150,3173,3170,3184,3138,3183,3137,3114,3123,3111,3119,3177,3071,3113,3030,3092,3116,3121,2752],    //职场女王
          [3162,3166,3164,3065,3167,3064,3159,3070,3160,3129,3133,3132,3131,3182,3180,2946,3181,3093,3077,3038],    //社交女神
          [3161,3061,3152,3053,3063,3171,3046,3066,3067,3139,3143,3050,3051,3172,3169,3048,3047,3058,3057,3148],    //时尚辣妈
          [3168,3144,2923,3165,3145,3163,3059,3174,3060,3176,3175,3112,3099,3110,3120,3118,3140,2731,2945,3091],    //知性女人
          [3127,3090,3100,3080,3088,3117,3081,3087,3097,3076,3073,3095,3085,3126,3125,3154,3128,3107,3153,3106]   //美丽厨娘
          
          ]
           
     //cationa[0][1]

//点击回到顶部
  self.jumptop = function(event) {
        window.scrollTo(1,0);
  };

</script>
</womanCook>