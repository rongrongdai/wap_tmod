<topic-item>

        <div class="bg-topic-item" style="background: url({picurl1}) center center no-repeat" each='{opts.topiclist}'>
          <a href="{url}"> 
              <div class="content">
              	<p class="title">{title}</p>
              	<p class="describe tidItem{tid}" data-count='{joinsCount}'>{joins}</p>
              	<button class="btn-go-show" style="background-color:{btncolor}">{btnDestribe}</button>
              </div>
          </a>
        </div>
    <script>
      this.mixin('util');
      this.mixin('event');
      console.log('opts.topicList:'+opts.topicList);
    </script> 
</topic-item>