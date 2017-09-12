<message-img-alert>
        <div  class="mask maskbox hide" >
            <div class="prompt" onclick={close} style="background-image: url({opts.url})"></div>
            <div class="close" onclick={close}>关闭</div>
        </div>
        <script>
           this.close = function(event) {
	           $('.mask').addClass("hide");
		   };
        </script>
</message-img-alert>