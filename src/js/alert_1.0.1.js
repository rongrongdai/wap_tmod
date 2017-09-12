
(function(win) {

	$.fn.petrus_alert = function(options) {
		var defaults = {
			speed: 400,		// 显示速度
            zIndex: 99999,
            title: "title",	// 标题
            content: 'It is message !',	// 内容
            closeIcon: true,	// 关闭图标
            $el: null,			// 自定义内容
            allowClose: true,	// 允许关闭
            // 自定义遮罩层
            overlay: {
            	speed: 200,		// 显示速度
            	fadeTo: 0.6, 	//背景透明
            	fadeOut: 0.1,
            	css: null	// 遮罩层样式
            },
			
            callbacks: {
            	init: null,
            	show: null,
            	close: null
            },
			// drag:true,
            html: ''//wBox内容
        },
        _this = this;

        options = $.extend(defaults, options);

        if(!options.$el) options.$el = $(this);

        /**
         * 创建遮罩层
         */
        var createOverlay = function() {
        	var overlay = _this.overlay = $('<div class="petrus_alert_overlay"></div>');

        	if(options.zIndex) overlay.css('z-index', options.zIndex);

        	overlay.height($(window).width());
        	overlay.height($(window).height());

        	if(options.overlay.css) overlay.css(options.overlay.css);

        	$('body').append(overlay);

        	overlay.fadeTo(options.overlay.speed, options.overlay.fadeTo);

        	// 允许关闭添加点击关闭
        	if(options.allowClose) {
        		overlay.click(function(event) {
        			_this.close();
        		});
        	}
        }

        /**
         * 销毁遮罩层
         */
        var destoryOverlay = function() {
        	_this.overlay.fadeOut(options.overlay.speed, function() {
        		_this.overlay.remove();
        		if(options.callbacks.close) options.callbacks.close();
        	});
        }

        /**
         * 弹出
         */
        var petrusAlert = function() {
        	if(options.callbacks.init) options.callbacks.init();
        	createOverlay();
        	create$el();
        }

        /**
         * 创建弹出元素
         */
        var create$el = function() {
        	if(options.$el) {
        		_this.$el = options.$el;
        	}
        	// else {
        	// 	var $el = this.$el = '<div class="petrus_alert_warp"></div>';
        	// 	var $title = this.$title = create$title();
        	// 	var $content = this.$content = create$content();
        	// }

        	_this.$el.css({
        		display: 'block',
        		position: 'fixed',
        		zIndex: options.zIndex+1
        	});

        	var left = $(window).width()/2 - _this.$el.width()/2;
        	var top = $(window).height()/2 - _this.$el.height()/2;

        	_this.$el.css({
        		left: left,
        		top: top
        	})

        	_this.$el.delegate('.petrus_alert_close', 'click', function(event) {
        		_this.close();
        	});
        }

        /**
         * 创建标题
         */
        var create$title = function(){

        }

        /**
         * 创建内容
         */
        var create$content = function(){

        }

        /**
         * 关闭弹出元素
         */
        var close$el = function(){
        	_this.$el.css('display', 'none');
        }

        /**
         * 关闭
         */
        this.close = function() {
        	destoryOverlay();
        	close$el();
        }

        petrusAlert();

        return this;
	}

})(window)
export default PetrusAlert;