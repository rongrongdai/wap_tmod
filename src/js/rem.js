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

    function sendToCategory(){
        if (isAndroid){
            window.JSInterface.toCategory ();
        }else if(isIphon){ 
            toCategory();
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
    function sendToArtSpecial(){
        if (isAndroid){
            window.JSInterface.toArtSpecial();
        }else if(isIphon){
            toArtSpecial();
        }
    }
    function sendToDoyen(){
        if (isAndroid){
            if (arguments.length === 2) {
                window.JSInterface.toDoyen(arguments[0], arguments[1]);
                return ;
            }
            window.JSInterface.toDoyen();
        }else if(isIphon){
            if (arguments.length === 2) {
                toDoyen(arguments[0], arguments[1]);
                return ;
            }
            toDoyen();
        }
    }
    function sendRedirectTo(url){
        if (isAndroid){
            window.JSInterface.redirectTo(url)
        }else if(isIphon){
            redirectTo(url)
        }
    }
    function sendAddPullToRefersh(){
        if (isAndroid){
            window.JSInterface.addPullToRefersh();
        }else if(isIphon){
            addPullToRefersh();
        }
    }
    function sendEvent(eventId){
        if (isAndroid){
            window.JSInterface.event(eventId);
        }else if(isIphon){
            event(eventId);
        }
    }
    function sendSelectedTag(str){
        if (isAndroid){
            window.JSInterface.selectedTag(str);
        }else if(isIphon){
            selectedTag(str);
        }
    }
  function sendToPrivateMsg(uid,name){
        if (isAndroid){
            window.JSInterface.sendPrivateMsg(uid,name);
        }else if(isIphon){
            sendPrivateMsg(uid,name);
        }
    }
 function sendToShow(tid){
        if (isAndroid){
            console.log('isAndroid tid+:'+tid);
            window.JSInterface.toShow(tid);
        }else if(isIphon){
            toShow(tid);
        }
    } 
 function sendToSay(cid){
        if (isAndroid){
            console.log('isAndroid tid+:'+cid);
            window.JSInterface.toSay(cid);
        }else if(isIphon){
            toSay(cid);
        }
    }   
    return{
        sendToSupport: sendToSupport,
        sendBack: sendBack,
        sendShare: sendShare,
        sendToShopCart: sendToShopCart,
        sendToCategory: sendToCategory,
        sendToQuickPay: sendToQuickPay,
        sendToGoLogin:sendToGoLogin,
        sendToArtSpecial:sendToArtSpecial,
        sendToDoyen:sendToDoyen,
        sendRedirectTo:sendRedirectTo,
        sendAddPullToRefersh:sendAddPullToRefersh,
        sendEvent:sendEvent,
        sendSelectedTag:sendSelectedTag,
        sendToPrivateMsg:sendToPrivateMsg,
        sendToShow:sendToShow,
        sendToSay:sendToSay

    };
})();