import '../component/card/special-goods-list.tag';
import { BackendApiCateGoodsList} from 'BackendApi';    // 后台api接口文件
<navitem  style='width: 100%;'>
    <h2 class="homepage-headline" id='scrollHereId3'>
        <a class="homepage-headline-title"  href="{opts.param.url}"><span class="line">- </span>{opts.param.cateName}<span class="line"> -</span></a>
    </h2>
    <a  href="{opts.param.url}"><img class="categoryArrbanner img-lazy-upload" data-src='{opts.param.bg}'></a>
    <div class="goodslist-box" each={opts.brandArr}>
        <goods-list class="goodslist" goodslist = {brand}></goods-list>
    </div>
    <script>
       this.mixin('util');
       this.mixin('event');
       let self =this;
       let isWechat;
       self.on('mount',()=>{
         if(self.opts.param.index==0){
            getCateList(self.opts.param.cat_id);
         }
       });
       self.one('startGetData',(object)=>{
            getCateList(self.opts.param.cat_id);
       })
      function getCateList(id){
        self.ajaxOriginalData('get', BackendApiCateGoodsList, {class_id:id}, (json) => {
          let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
            isWechat=json.os=='wechat'?true:false;
          let cateReflectData = getReflectData(json.data);
              self.opts.brandArr=cateReflectData.brandArr;
              self.update();
              self.trigger('startNextGetData',{index:self.opts.param.index});
          console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
            ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
            });
       }
       // ===========================================================
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getReflectData(data) {
  let i=0;
  let reflectData={};
  let idx = 0;
  let urlGoodTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
  let activeUrl='/mobile-special/womenActivity?spec_id=';
  let specialUrl='/mobile-special/womenActivity?cat_id=';
  let secondTypeUrl='/mobile-special/specialSecond?cat_id=';
  reflectData.brandArr=[];
  let seClasslength=data.seClass.length;
  if(seClasslength>0){
          for(let z=0;z<seClasslength;z++){
            if(i==15){
               break;
             }
          let brItem=data.seClass[z];
          let brandItem = {};

        brandItem.brand = [];   // 品牌特供商品
        let length=brItem.goodslist.length;
        if(length>0){
          for(let k=0;k<length;k++){
            i++;
            let goodsItem=brItem.goodslist[k];
            let reflectItem = {
            from_homepage:true,  
            userid: goodsItem.uid,
            goodsid:goodsItem.goods_id,
            pic: goodsItem.goods_thumb,
            url: urlGoodTogo + goodsItem.goods_id,
            goodsname: goodsItem.goods_name,
            face: goodsItem.face,
            nickname: goodsItem.nickname+' '+'推荐',
            price:'￥'+goodsItem.shop_price,
          };
          brandItem.brand.push(reflectItem);
            if(i==15){
              break;
            }
          }
        }
        if(reflectData.brandArr.length==1){
           reflectData.brandArr[0].brand=reflectData.brandArr[0].brand.concat(brandItem.brand);
        }
        else{
          reflectData.brandArr.push(brandItem);
        }

          }
       }   
        let brandArrLength=reflectData.brandArr.length;
        reflectData.brandArr[brandArrLength-1].brand.push({
          url: secondTypeUrl+opts.param.cat_id,
          showStyle: 1,
          more: '查看更多'
           })
  return reflectData;
}
    </script>
</navitem>               