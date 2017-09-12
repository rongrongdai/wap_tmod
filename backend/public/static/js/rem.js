/*! layer mobile-v1.6 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
;!function(a){"use strict";var b="";b=b?b:document.scripts[document.scripts.length-1].src.match(/[\s\S]*\//)[0];var c=document,d="querySelectorAll",e="getElementsByClassName",f=function(a){return c[d](a)};var g={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:!0};a.ready={extend:function(a){var b=JSON.parse(JSON.stringify(g));for(var c in a)b[c]=a[c];return b},timer:{},end:{}},ready.touch=function(a,b){var c;a.addEventListener("touchmove",function(){c=!0},!1),a.addEventListener("touchend",function(a){a.preventDefault(),c||b.call(this,a),c=!1},!1)};var h=0,i=["layermbox"],j=function(a){var b=this;b.config=ready.extend(a),b.view()};j.prototype.view=function(){var a=this,b=a.config,d=c.createElement("div");a.id=d.id=i[0]+h,d.setAttribute("class",i[0]+" "+i[0]+(b.type||0)),d.setAttribute("index",h);var g=function(){var a="object"==typeof b.title;return b.title?'<h3 style="'+(a?b.title[1]:"")+'">'+(a?b.title[0]:b.title)+'</h3><button class="layermend"></button>':""}(),j=function(){var a,c=(b.btn||[]).length;return 0!==c&&b.btn?(a='<span type="1">'+b.btn[0]+"</span>",2===c&&(a='<span type="0">'+b.btn[1]+"</span>"+a),'<div class="layermbtn">'+a+"</div>"):""}();if(b.fixed||(b.top=b.hasOwnProperty("top")?b.top:100,b.style=b.style||"",b.style+=" top:"+(c.body.scrollTop+b.top)+"px"),2===b.type&&(b.content='<i></i><i class="laymloadtwo"></i><i></i><div>'+(b.content||"")+"</div>"),d.innerHTML=(b.shade?"<div "+("string"==typeof b.shade?'style="'+b.shade+'"':"")+' class="laymshade"></div>':"")+'<div class="layermmain" '+(b.fixed?"":'style="position:static;"')+'><div class="section"><div class="layermchild '+(b.className?b.className:"")+" "+(b.type||b.shade?"":"layermborder ")+(b.anim?"layermanim":"")+'" '+(b.style?'style="'+b.style+'"':"")+">"+g+'<div class="layermcont">'+b.content+"</div>"+j+"</div></div></div>",!b.type||2===b.type){var l=c[e](i[0]+b.type),m=l.length;m>=1&&k.close(l[0].getAttribute("index"))}document.body.appendChild(d);var n=a.elem=f("#"+a.id)[0];b.success&&b.success(n),a.index=h++,a.action(b,n)},j.prototype.action=function(a,b){var c=this;if(a.time&&(ready.timer[c.index]=setTimeout(function(){k.close(c.index)},1e3*a.time)),a.title){var d=b[e]("layermend")[0],f=function(){a.cancel&&a.cancel(),k.close(c.index)};ready.touch(d,f),d.onclick=f}var g=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),k.close(c.index)):a.yes?a.yes(c.index):k.close(c.index)};if(a.btn)for(var h=b[e]("layermbtn")[0].children,i=h.length,j=0;i>j;j++)ready.touch(h[j],g),h[j].onclick=g;if(a.shade&&a.shadeClose){var l=b[e]("laymshade")[0];ready.touch(l,function(){k.close(c.index,a.end)}),l.onclick=function(){k.close(c.index,a.end)}}a.end&&(ready.end[c.index]=a.end)};var k={v:"1.6",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var b=f("#"+i[0]+a)[0];b&&(b.innerHTML="",c.body.removeChild(b),clearTimeout(ready.timer[a]),delete ready.timer[a],"function"==typeof ready.end[a]&&ready.end[a](),delete ready.end[a])},closeAll:function(){for(var a=c[e](i[0]),b=0,d=a.length;d>b;b++)k.close(0|a[0].getAttribute("index"))}};"function"==typeof define?define(function(){return k}):a.layer=k}(window);

/**
 * 对于7.28积分活动添加功能基于layer插件的弹出层之消息提醒方法，3秒后自动消失；
 * layer http://layer.layui.com/mobile/
 * param{String}    content   提醒的文本内容
 */
var G = {};
G.Imsg = function(content, t) {
    if(!content) return;
    t = arguments[1] ? arguments[1] : 3;
    layer.open({
        shade: false,
        //className: 'popHintBox',
        style: 'background-color:black; color:#fff; border:none; position: fixed; top:4.5rem;  width: 70%; left:0.8rem; text-align: center; ' +
        'border-radius: 8px; text-align: center; line-height: 1.5; padding:0.2rem; font-size: 0.32rem;',
        content: content,
        time: t
    })
}

/**
 * 固定Loading效果，简版；
 * 只支持固定loading效果，效果通过通过CSS控制
 * HTML结构：
 * <div class="u-loading-fixed">
    <div class="u-loading-mask"></div>
    <div class="u-loading-icon"></div>
   </div>
 */ 
G.loading = (function(){
  
  var Loading = function(){
    this.el = null;

    return this.init();
  }

  Loading.prototype = { 
    // 生成id key
    guid: function () {
        return Math.floor(Math.random() * 1000);
    },
    init: function(){
      var self = this;

      self.el = $('<div>', {
          'id': 'ui-loading' + self.guid(),
          'class': 'u-loading-fixed'
      });
      
      self.hide();

      self.render();
    },
    render: function () {
      var self = this;
      var html = '<div class="u-loading-mask"></div>' +
                  '<div class="u-loading-icon"></div>';

      self.el.html(html);

      $('body').append(self.el);

      return self;
    },
    show: function () {
        this.el.show();

        return this;
    },
    hide: function () {
      this.el.hide();

      return this;
    },
    close: function () {
      this.el.remove();
      Loadding = null;
    }
  } 

  return Loading;
})();

/**
 * Created by Paul.Ren on 2015/11/20.
 */
/**
 * MobileWeb 通用功能助手，包含常用的 UA 判断、页面适配、search 参数转 键值对。
 * 该 JS 应在 head 中尽可能早的引入，减少重绘。
 *
 * fixScreen 方法根据两种情况适配，该方法自动执行。
 *      1. 定宽： 对应 meta 标签写法 -- <meta name="viewport" content="target-densitydpi=device-dpi,width=750">
 *          该方法会提取 width 值，主动添加 scale 相关属性值。
 *          注意： 如果 meta 标签中指定了 initial-scale， 该方法将不做处理（即不执行）。
 *      2. REM: 不用写 meta 标签，该方法根据 dpr 自动生成，并在 html 标签中加上 data-dpr 和 font-size 两个属性值。
 *          该方法约束：IOS 系统最大 dpr = 3，其它系统 dpr = 1，页面每 dpr 最大宽度（即页面宽度/dpr） = 750，REM 换算比值为 16。
 *          对应 css 开发，任何弹性尺寸均使用 rem 单位，rem 默认宽度为 视觉稿宽度 / 16;
 *              scss 中 $ppr(pixel per rem) 变量写法 -- $ppr: 750px/16/1rem;
 *                      元素尺寸写法 -- html { font-size: $ppr*1rem; } body { width: 750px/$ppr; }。
 */
window.mobileUtil = (function(win, doc) {
    console.log("rem");
    var UA = navigator.userAgent,
        isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid, // 据说某些国产机的UA会同时包含 android iphone 字符
        isMobile = isAndroid || isIos;  // 粗略的判断
    var designWidth = 750,
        factor = 1/7.5; // rem = idealLayoutWidth * device pix ratio * factor

    return {
        isAndroid: isAndroid,
        isIos: isIos,
        isMobile: isMobile,

        isNewsApp: /NewsApp\/[\d\.]+/gi.test(UA),
        isWeixin: /MicroMessenger/gi.test(UA),
        isQQ: /QQ\/\d/gi.test(UA),
        isYixin: /YiXin/gi.test(UA),
        isWeibo: /Weibo/gi.test(UA),
        isTXWeibo: /T(?:X|encent)MicroBlog/gi.test(UA),

        tapEvent: isMobile ? 'tap' : 'click',

        /**
         * 缩放页面
         */
        fixScreen: function() {
            var metaEl = doc.querySelector('meta[name="viewport"]'),
                metaCtt = metaEl ? metaEl.content : '',
                matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
                matchWidth = metaCtt.match(/width=([^,\s]+)/);

            if ( !metaEl ) { // REM
                var docEl = doc.documentElement,
                    maxwidth = docEl.dataset.mw || designWidth, // 每 dpr 最大页面宽度
                    dpr = isIos ? Math.min(win.devicePixelRatio, 3) : 1,
                    scale = 1 / dpr,
                    tid;
                // TODO do not to scale here, maybe set available later
                scale = 1;

                docEl.removeAttribute('data-mw');
                docEl.dataset.dpr = dpr;
                metaEl = doc.createElement('meta');
                metaEl.name = 'viewport';
                metaEl.content = fillScale(scale);
                docEl.firstElementChild.appendChild(metaEl);

                var refreshRem = function() {
                    var width = docEl.getBoundingClientRect().width;
                    if (width / dpr > maxwidth) {
                        width = maxwidth * dpr;
                    }
                    var rem = width * factor;
                    docEl.style.fontSize = rem + 'px';
                };

                win.addEventListener('resize', function() {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }, false);
                win.addEventListener('pageshow', function(e) {
                    if (e.persisted) {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, 300);
                    }
                }, false);

                refreshRem();
            } else if ( isMobile && !matchScale && ( matchWidth && matchWidth[1] != 'device-width' ) ) { // 定宽
                var	width = parseInt(matchWidth[1]),
                    iw = win.innerWidth || width,
                    ow = win.outerWidth || iw,
                    sw = win.screen.width || iw,
                    saw = win.screen.availWidth || iw,
                    ih = win.innerHeight || width,
                    oh = win.outerHeight || ih,
                    ish = win.screen.height || ih,
                    sah = win.screen.availHeight || ih,
                    w = Math.min(iw,ow,sw,saw,ih,oh,ish,sah),
                    scale = w / width;

                if ( scale < 1 ) {
                    metaEl.content = metaCtt + ',' + fillScale(scale);
                }
            }

            function fillScale(scale) {
                return 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
            }
        },

        /**
         * 转href参数成键值对
         * @param href {string} 指定的href，默认为当前页href
         * @returns {object} 键值对
         */
        getSearch: function(href) {
            href = href || win.location.search;
            var data = {},reg = new RegExp( "([^?=&]+)(=([^&]*))?", "g" );
            href && href.replace(reg,function( $0, $1, $2, $3 ){
                data[ $1 ] = $3;
            });
            return data;
        }
    };
})(window, document);

// 默认直接适配页面
mobileUtil.fixScreen();

function ajaxButlerData(type, url, data, callbackSucc,callbackFail) {
    if(!type || !url || !callbackSucc||!callbackFail) return;

    if(typeof callbackSucc != 'function') return;

    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        success: function(json){
            if (!json){
                return false;
            }
            if (json.ret != 0){
                if(json.ret == 100001) {
                    location.href = (location.protocol + '//' + location.hostname + '/mobile-user-main/login?return_uri=' + location.href);
                }else{
                    G.msg(json.msg);
                }
                callbackFail(json);
                return false;
            }

            callbackSucc(json.data);
        },
        error: function(err){
            callbackFail(err);
            G.msg('数据获取失败，请刷新页面重试!');
        }
    });
}

function ajaxAppData(type, url, data, callbackSucc,callbackFail) {
    if(!type || !url || !callbackSucc||!callbackFail) return;

    if(typeof callbackSucc != 'function') return;

    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        success: function(json){
            if (!json){
                return false;
            }
            if (json.ret != 0){
                if(json.ret == 100001) {
                    //location.href = (location.protocol + '//' + location.hostname + '/mobile-user-main/login?return_uri=' + location.href);
                }else{
                    G.msg(json.msg);
                }
                callbackFail(json);
                return false;
            }

            callbackSucc(json.data);
        },
        error: function(err){
            callbackFail(err);
            G.Imsg('数据获取失败，请刷新页面重试!');
        }
    });
}
var Global = (function demo(){
    var isAndroid = navigator.userAgent.toLowerCase().match(/Android/i)=="android";
    var isIphon = navigator.userAgent.toLowerCase().match(/iPhone/i)=="iphone"||navigator.userAgent.toLowerCase().match(/Ipad/i)=="ipad";
    function sendToSupport(goods_id,goods_number,sku_id){
        if (isAndroid ){
            window.JSInterface.toSupport(goods_id,goods_number,sku_id);
        }else if(isIphon){ 
            toSupport(goods_id,goods_number,sku_id)
        }

    }
    function sendBack(){
        if (isAndroid){
            window.JSInterface.back();
        }else if(isIphon){ 
            back();
        }

    }
    function sendShare(shareId,type){
        if (isAndroid){
            window.JSInterface.share(shareId,type);
        }else if(isIphon){ 
            share(shareId,type);
        }

    }
    function sendToShopCart(){
        if (isAndroid){
            window.JSInterface.toShopCart();
        }else if(isIphon){ 
            toShopCart();
        }
    }
    function sendToQuickPay(goods_id,count,sku_id){
        if (isAndroid){
            window.JSInterface.toQuickPay(goods_id,count,sku_id);
        }else if(isIphon){ 
            toQuickPay(goods_id,count,sku_id)
        }
       ;
    }
    function sendToGoLogin(){
        if (isAndroid){
            window.JSInterface.login();
        }else if(isIphon){ 
            login();
        }
    }
    return{
        sendToSupport: sendToSupport,
        sendBack: sendBack,
        sendShare: sendShare,
        sendToShopCart: sendToShopCart,
        sendToQuickPay: sendToQuickPay,
        sendToGoLogin:sendToGoLogin
    };
})();