<message-img-alert-tip>
        <div  class="mask maskbox hide" >
            <div class="prompt" onclick={close} style="background-image: url({opts.url})"></div>
        </div>
        <script>
           this.close = function(event) {
	           $('.mask').addClass("hide");
		   };
        </script>
</message-img-alert-tip>