<qqwgood-goods>
<div class="qqw_goods_{opts.type}"   if={opts.type  !=  'specialty'}>
      <div class="box">
          <!-- <a href="{opts.goodlist[0].url}"><img class="item" src={opts.goodlist[0].pic} if={opts.type=='specialty'}></a> -->
          <div class='right-box'>
              <a  href="{value.url}" each={value, index in opts.goodlist} if={index < 2 } ><img class="item" src={value.pic} ></a>
          </div>
      </div>
      <div class="box">
              <a href="{value.url}" each={value, index in opts.goodlist} if={index > 1}><img class="item" src={value.pic} ></a>

      </div>
<!--       <div class="box" style="background-image: url({opts.mainMessage.goodsBg})">
           <a class="item" href='item'></a>
           <a class="item" href='item'></a>
      </div>  -->     
<!--     <div class="box" style="background-image: url({opts.goodsbg.pic})">
           <a href="{opts.url}{opts.goodsbg.goods_id1}" class="item" ></a>
           <a href="{opts.url}{opts.goodsbg.goods_id2}" class="item" ></a>
      </div> -->
</div>


<div class="qqw_goods_{opts.type} "  if = {opts.type == 'specialty'}>
      <div class="boxe">
         <div class="box_left">
             <a  href="{opts.goodlist[0].url}" ><img class="item" src={opts.goodlist[0].pic} ></a>
          </div>
         <div class="box_right">
            <div class="cont">
                 <a href="{opts.goodlist[1].url}" ><img class="item" src={opts.goodlist[1].pic} ></a>
            </div>
            <div class="conts">
                 <a href="{opts.goodlist[2].url}" ><img class="item" src={opts.goodlist[2].pic} ></a>
            </div>
         </div>
      </div>
      <div class="box">
           <div class='right-box'>
                <a  href="{value.url}" each={value, index in opts.goodlist}  if={index > 2 } ><img class="item" src={value.pic} ></a>
          </div>
      </div>
</div>
    <script>    
    this.on('update',()=>{
      console.log('....');
    })
    </script>
</qqwgood-goods>