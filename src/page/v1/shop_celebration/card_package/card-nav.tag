<card-nav>
	<section class="card-nav" >
		<ul class="state_nav">
		        <li class="state_btn state_active" onclick={navbtn}>
		           <span>送给自己</span> 
		        </li>
		        <li class="state_btn" onclick={navbtn}>
		            <span class="state_txt">送给朋友</span>
		        </li>
		        <li class="state_btn" onclick={navbtn}>
		            <span>朋友送我</span>
		        </li>
		  </ul>
	</section>
	<script>
		this.mixin('util');
		let self =this; 
		this.on('updated', () => {
			let self = this;
		});
		this.navbtn = function(event) {
			         let navbtn=$(".state_btn");
			         navbtn.removeClass("state_active");
			         $(event.currentTarget).addClass("state_active");
			          let index=$(event.currentTarget).index();
			         self.trigger('switch_change',{'index':index})
		};
	</script>
</card-nav> 