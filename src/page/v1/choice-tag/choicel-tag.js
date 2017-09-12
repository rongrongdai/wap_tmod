import './choicel-tag.scss';
import './choicel-tag.tag';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { BackendApiTagList,BackendApiTagChangeList } from 'BackendApi';		// 后台api接口文件

		// should be call before app start

function qqwOpMixin() {
	this.ajaxData = QqwUtil.ajaxData;
	this.msg = QqwUtil.msg;
}
let choicelInstance
    ,choicelReflectData = {};
 
var ParamMixin = {
  param:{
           sex:null,
           age:null,
           groups:null,
           category:null,
            hobby:null
        },
 
  getOpts: function() {
      return this.param
  },

  setOpts: function(id, name) {
  	         let self =this;
                  switch(name){
                    case 'sex':
                          self.param.sex=parseInt(id);
                          break;
                    case 'age':
                          self.param.age=parseInt(id);
                          break;
                    case 'groups':
                          self.param.groups=self.operateAddOpts(self.param.groups,id);
                          break;
                    case 'category':
                          self.param.category=self.operateAddOpts(self.param.category,id);
                          break;
                    case 'hobby':
                          self.param.hobby=self.operateAddOpts(self.param.hobby,id);
                          break;     
                    default:
                    break;
              }
    },

  removeOpts: function(id, name) {
  	         let self =this;
                  switch(name){
                    case 'sex':
                          self.param.sex=null;
                          break;
                    case 'age':
                          self.param.age=null;
                          break;
                    case 'groups':
                          self.param.groups=self.operateOpts(self.param.groups,id);
                          break;
                    case 'category':
                          self.param.category=self.operateOpts(self.param.category,id);
                          break;
                    case 'hobby':
                          self.param.hobby=self.operateOpts(self.param.hobby,id);
                          break;     
                    default:
                    break;
              }
    },
  operateOpts: function(str,id) {
          str=str.replace(id,'').replace(',,',',');
          if(str[0]==','){
          	  str=str.substring(1)
          }else if(str[str.length-1]==','){
          	  str=str.slice(0, -1);
          }
          return str;
    },
  operateAddOpts:function(str,id){
  	         if(str){
                    str=str+','+id;
                     }
                 else{
                 str=id;
                     }
              return str;       
  }  

}

QqwUtil.main(function*(){
	// 后台数据
	QqwUtil.ajaxData('get', BackendApiTagList, null, (data) => {

		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		choicelReflectData = getReflectData(data);
		data = null;
		choicelInstance= riot.mount('choicel-tag', choicelReflectData)[0];
		choicelInstance.on('changeData',(object)=>{
			let index=parseInt(object.buttonIndex);
			let param=
			{
		       position:index
			}
			QqwUtil.ajaxData('get', BackendApiTagChangeList, param, (data) => {

				let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测

				getReflectChangeData(data,index);
				data = null;
				choicelInstance.update('choicel-tag', choicelReflectData);
				console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
					', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));

			});
		})

		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));

	});

  console.log('白屏时间 = ' + (new Date().getTime() - window.startTime));

	FastClick.attach(document.body);			// 移动端点击事件 hack
	riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
	riot.mixin('param', ParamMixin);
});




// ===========================================================
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getReflectData(data) {
	let urlGoodTogo = '/app-goods/detail?id=';
   let reflectData={};
	reflectData.groups = [];
	reflectData.category = [];
	reflectData.hobby = [];
	let idx = 0;
	Array.from(data.groups || []).map((nativeitem) => {
		       let item = {};
			item = {
				name: nativeitem.tagname,
				picture:nativeitem.picture,
				tagid: nativeitem.tagid
			   }
			reflectData.groups.push(item);
	});
	Array.from(data.category || []).map((nativeitem) => {
		       let item = {};
			item= {
				name: nativeitem.tagname,
				picture:nativeitem.picture,
				tagid: nativeitem.tagid
			   }
			reflectData.category.push(item);
	});
	Array.from(data.hobby || []).map((nativeitem) => {
		       let item = {};
			item= {
				name: nativeitem.tagname,
				picture:nativeitem.picture,
				tagid: nativeitem.tagid
			   }
			reflectData.hobby.push(item);
	});
	return reflectData;
}

// ===========================================================
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getReflectChangeData(data,index) {
	 let list=[];
    if(index==1){
    	data.list=data.list.slice(0, 4);
    }
	Array.from(data.list || []).map((nativeitem) => {
		       let item = {};
			item = {
				name: nativeitem.tagname,
				picture:nativeitem.picture,
				tagid: nativeitem.tagid
			   }
			   list.push(item);
	});
   
	switch(index){
		case 1:
		choicelReflectData.groups=list;
		break;
	    case 2:
		choicelReflectData.category=list;
		break;
		case 3:
		choicelReflectData.hobby=list;
		break;

	}
}




