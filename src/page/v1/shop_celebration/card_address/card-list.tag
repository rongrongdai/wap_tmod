import { BackendApiCardAreaList,BackendApiCardShopList } from 'BackendApi'; 
<card-list>
	<section class="card-list">
		<section class="card-nav">
			<ul class="state_nav">
			        <li class="state_btn line" onclick={showCity}>
			            <span>{navName.city_name}</span>
			            <img  class="img" src='/static/css/wap/img/order/my/icon_more2@3x.png'>
			        </li>
			        <li class="state_btn" onclick={showArea}>
			            <span>{navName.area_name}</span>
			            <img  class="img" src='/static/css/wap/img/order/my/icon_more2@3x.png'>
			        </li>
			  </ul>
		</section>
	    <section class="sub-card-nav turn-left" if={state.city_flag}>
			<ul class="state_nav">
			        <li class="state_btn"  onclick={chooseCity} each={cityList}>
			            <span class="state_txt" data-city-code='{code}' data-city-name='{name}' >{name}</span>
			        </li>
			</ul>
		</section>
	    <section class="sub-card-nav turn-right" if={state.area_flag}>
			<ul class="state_nav">
			        <li class="state_btn"  data-area-code='{code}' onclick={chooseArea} each={areaList}>
			            <span class="state_txt"  data-area-code='{code}' data-area-name='{name}'>{name}</span>
			        </li>
			 </ul>
		</section>
		<a class="cardlist" each="{shopList}">
			<p class="cardid">{ name }</p>
			<p class="cardid">地址：{address}</p>
<!-- 			<div class="cardcon">
				<div class="card fl">MEBER CARD</div>
				<div class="instructions fr">
					<p>
						<span class="fl">实体卡</span>
						<span class="fr">共{ cardinfo.buy_num }张</span>
					</p>	
					<p>
						<span class="fl">面值：{ cardinfo.card_amount }元</span>
						<span class="fr get_address">领取地址></span>
					</p>	
				</div>
		             </div> -->
		</a>
	</section> 
	   <script>
			   this.mixin('util');
			   let self=this;
			   this.state={city_flag:false,area_flag:false};
			   this.navName={city_code:'',city_name:'太原市',area_code:'',area_name:'全部区域'};
			   let firstGetData=true;
			   this.one('update', function(event) {
			     	getCardAreaList(1);
			   });
			function getCardShopList(city_code,district_code){
		      let param={city_code:city_code,district_code:district_code};
		       self.ajaxData('get', BackendApiCardShopList, param, (data) => {
		        let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
		        let reflectData = getShopListReflectData(data);
		        self.shopList=reflectData.shopList;
		        self.update({shopList:self.shopList});
		        console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
		          ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
		      });
		    }

		   function getCardAreaList(city_code){
		   	  let param={};
		   	  if(city_code==1){
		   	  	 param={city_code:''};
		   	  }else{
		   	     param={city_code:city_code};	
		   	  	   }
		      self.ajaxData('get', BackendApiCardAreaList, param, (data) => {
		        let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
		        let reflectData = getAreaReflectData(data,city_code);
		        if(firstGetData){
		        	firstGetData=false;
		        	self.cityList=reflectData.areaList;
		        	getCardAreaList(self.cityList[0].code);
		        	getCardShopList(self.cityList[0].code,'');
		        }else{
		        	self.areaList=reflectData.areaList;
		        	self.update({areaList:self.areaList});
		        }
		        console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
		          ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
		      });
		    }

		   function getAreaReflectData(data,city_code) {
		      let reflectData = {};
		      reflectData.areaList = [];
		      let idx = 0;
		      Array.from(data.list || []).map((cardlist) => {
		      	  if(idx==0 && city_code!=1){
			      	  let item = {
			            name:'全部区域',
			            code:'',
			           }
                    reflectData.areaList.push(item);
		      	  }
		          let item = {
		            name:cardlist.area_name,
		            code:cardlist.code,
		          }
		          reflectData.areaList.push(item);
		                 ++idx;
		      });
		      return reflectData;
		    }

		     function getShopListReflectData(data) {
		      let reflectData = {};
		      reflectData.shopList = [];
		      let idx = 0;
		      Array.from(data.list || []).map((cardlist) => {
		          let item= {
		            name:cardlist.name,
		            address:cardlist.details
		          }
		          reflectData.shopList.push(item);
		      });
		      return reflectData;
		    }

		    this.chooseCity=function(event){
		    	  let city_code=event.target.dataset.cityCode;
		    	  let city_name=event.target.dataset.cityName;
                  getCardAreaList(city_code);
                  getCardShopList(city_code,'');
                  self.update({state:{city_flag:false,area_flag:false}});
                  self.update({navName:{city_code:city_code,city_name:city_name,area_code:'',area_name:'全部区域'}});
		    }

		    this.chooseArea=function(event){
                  self.navName.area_code=event.target.dataset.areaCode;
		    	  self.navName.area_name=event.target.dataset.areaName;
		    	  self.update({naveName:self.navName});
                  getCardShopList(self.navName.city_code,self.navName.area_code);
                  self.update({state:{city_flag:false,area_flag:false}});
		    }

		    this.showCity=function(event){
		          self.update({state:{city_flag:true,area_flag:false}});
		    }

		    this.showArea=function(event){
		          self.update({state:{city_flag:false,area_flag:true}});
		    }
    </script>
</card-list>