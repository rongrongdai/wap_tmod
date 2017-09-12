<message-alert>
        <div  class="mask maskbox hide" >
            <div class="prompt" onclick={close}></div>
        </div>
        <script>
           this.close = function(event) {
	           $('.mask').addClass("hide");
		   };
        </script>
</message-alert>