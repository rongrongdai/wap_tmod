<qqwpicture>
        <div class="pictall">
              <div each={value,index in opts.list}>
              <a href="{value.url}"  if={index==0}><img class="items1" src="{value.bg}"></a>
              <a href="{value.url}"  if={0<index&&index<11}><img class="item" src="{value.bg}"></a>
              <a href="{value.url}"  if={index==11||index==12}><img class="items2" src="{value.bg}"></a>
              </div>
        </div>
</qqwpicture>