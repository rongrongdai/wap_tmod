<group-nav>
	<section class="card-nav">
		<ul class="state_nav">
		        <li class="state_btn state_active" onclick={navbtn}>
		           <span>全部</span> 
		        </li>
		        <li class="state_btn" onclick={navbtn}>
		            <span>待成团</span>
		        </li>
		        <li class="state_btn" onclick={navbtn}>
		            <span>已成团</span>
		        </li>
		        <li class="state_btn" onclick={navbtn}>
		            <span>拼团失败</span>
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
</group-nav> 