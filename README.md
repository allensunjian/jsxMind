# jsxMind
基于jsmind 改写的jsxmind插件
### 组织架构插件帮助类说明文档 --- mindHelper
- 本插件二次封装了jsmind，实现了jsmind的全部功能，集中并简化了配置操作，并使参数结构化。暴露了丰富的api接口。

- 依赖
  1、\js\mapping__plugin\jsmind.js
  2、js\mapping__plugin\jsmind.screenshot.js
  3、js\mapping__plugin\jsmind.draggable.js
  4、\js\mapping__plugin\mindHelper.js
- 技术支持： Allen.sun
- 本插件需要重点关注node__add 类型的时间操作。需要多次的前中后台的操作。
说明：本帮助类，可以在不阅读jsmind插件的情况下，轻松的使用和配置自己的mind图。
- 2019/12/3
###### 介绍
```
		1、树形结构渲染
		2、可基本配置的图形要素
		3、观察者模式的自由设置监听和派发事件
		4、插件可配置支持快捷键
		5、可配置右键菜单
		6、可进行升级操作的profileOpts的扩展选项
		7、可切的渲染引擎
		8、简化配置操作，简单的配置可实现基本功能
		9、实现函数的通信通道，任意适应不同的工作和接口环境，调用者决定插件的下一步走向。
		10、插件加入基本的网络通讯能力，可脱离JQ等封装了ajax的插件。
		11、节点加入LOADING配置，编辑节点时可自动渲染
		12、自由引入拖拽系统，并可以设置监听
		13、丰富的外抛API，可以无缝调用流畅操作图形节点
		14、富的接口返回值，可满足大多数场景的应用
		15、实现导出截图
		16、实现拖拽
```


##### 插件的数据格式
```javascript
var mind = {
  "format": "node_tree", //声明数据结构
  "data": {
    "id": "alibaba",   // id
	"topic": " 阿里巴巴", // 节点的名称
	direction: 'right', //对其方式 left or right  default:  right
    "children": [
      {
        "id": "bm1", "topic": "部门1", "direction": "right", "children": [
          { "id": "bm1_1", "topic": "部门1-1" },
          { "id": "bm1_2", "topic": "部门1-2" },
          { "id": "bm1_3", "topic": "部门1-3" },
          { "id": "bm1_4", "topic": "部门1-4" }
        ]
      }
    ]
  }
}

```
##### 基本的图形

```html
  <div id="jsmind_container" style="height: 560px;width: 500px"></div>
```
     var hm = new MindHelper({
            globalOpts: {
              container: 'jsmind_container', // 必选的容器对象
			  theme: 'primary', // 可选，配置主题
              mode: 'full',  //  full or side
            }
            data: mind
          });

![](http://192.168.30.10:8888/Public/Uploads/2019-12-03/5de5c7d159cf1.png)

##### 编辑一个节点并对globalOpts做完整说明

```javascript
 var hm = new MindHelper({
        globalOpts: {
          container: 'jsmind_container', // 容器元素
          editable: false,   //  打开编辑，双击节点开始编辑
          theme: 'primary', // 主题元素
          mode: 'full', // 模式
          support_html: true, // 是否支持html 节点中可插入html标签
          direction: 1, // 对新增节点进行方向约束，1 左边 -1 右边
        },
        data: mind // 图形数据
      });
```
![](http://192.168.30.10:8888/Public/Uploads/2019-12-03/5de5cc7799c37.png)
##### 完成的视图 布局和快捷键设置
```javascript
 var mind = new MindHelper({ 
        globalOpts: {},
        view: {
          hmargin: 20,        // 容器外框的最小水平距离
          vmargin: 20,         // 距容器外框的最小垂直距离
          line_width: 2,       // 图线条的粗细
          line_color: '#555',   // 图线条的颜色
          engine: 'svg' //默认canvas 当面积巨大的时候会带来性能的显著提升
        },
        layout: {
          hspace: 100,          // 节点之间的水平间距
          vspace: 30,          // 节点之间的垂直间距
          pspace: 13           // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
        shortcut: {
          enable: true,        // 是否启用快捷键
          mapping: {           // 快捷键映射
            addchild: jsMind.key.ctrl + 65,     // 添加子节点映射
            addbrother: jsMind.key.ctrl + 66,   // 添加兄弟节点映射  
            editnode: jsMind.key.ctrl + 69,     // 编辑节点映射
            delnode: jsMind.key.ctrl + 68,      // 删除节点映射
            toggle: jsMind.key.ctrl + 84,       // 打开关闭节点
            left: 37,    // <Left>              // 向左切换节点
            up: 38,    // <Up>                  // 向上切换节点 
            right: 39,    // <Right> 			// 向右切换节点
            down: 40,    // <Down> 				// 向下切换节点
          }
        },
        menu: {
          injectionList: ['edit', 'addChild', 'addBrother', 'delete'],  // 右键配置，目前支持： edit, addChild addBrother, delete 功能。后续会逐渐增加
          alert: "", // 可配置传入 提示函数，默认系统alert
        },
        profileOpts: {
          showMenu: true, // 是否开启右键
        },
        data: mind
      });
```
###### 右键功能：
![](http://192.168.30.10:8888/Public/Uploads/2019-12-03/5de5d27914e68.png)

**注意：使用右键功能之前需要先选中要操作的元素，之后单机右键选中功能才可以实现操作 否则：
给与提示:**
![](http://192.168.30.10:8888/Public/Uploads/2019-12-03/5de5d2f81ae5b.png)

###### 节点视图配置：
![](http://192.168.30.10:8888/Public/Uploads/2019-12-03/5de5d68df0724.png)

##### 注册事件与监听事件

```javascript
 this.mind = new MindHelper({
        globalOpts: {},
        view: {},
        layout: {},
        shortcut: {},
        menu: {},
        profileOpts: {useDefaultId： false },
        tirrgerList: [ // 注册事件，目前支持四种事件 分别是
          { name: 'selected_trigger', type: 'node__pos' }, // 选中
          { name: 'del_trigger', type: 'node__del' },      // 删除
          { name: 'drag_trigger', type: 'node__drag' },    // 拖动
          { name: 'add_trigger', type: 'node__add' },      // 添加（子节点， 兄弟节点）
        ],
        register_on: function () { // 注册监听事件函数
          MindHelper.on('selected_trigger', fn);  // 监听选中
          MindHelper.on('del_trigger', fn);		  // 监听删除
          MindHelper.on('drag_trigger', fn);      // 监听拖动
          MindHelper.on('add_trigger', fn);       // 监听添加
        },
        data: mind
      });
```
###### 监听选中函数详解：
```javascript
// 选中监听
 MindHelper.on('selected_trigger', function (node) {
	 // 当插件中的节点被选中时这立即调用，无论是手动点击触发还是调用API触发都可以被监听到，返回节点实体类
	 // node.id // 节点的id
	 // node.children 节点的子元素集合，没有为[]
	 // node.direction 节点的对其方式，没有为undefined
	 // node.index  节点的数据位置
	 // node.isroot 节点是否是根节点
	 // node.parent 节点的父节点
	 // node.topic 节点的名称
	 
 }); 
```

```javascript
// 删除监听
 MindHelper.on('del_trigger', function (node) {
	 // 当插件中的节点被删除，无论是手动点击触发还是调用API触发都可以被监听到，返回节点实体类
	 // node.id // 节点的id
	 // node.children 节点的子元素集合，没有为[]
	 // node.direction 节点的对其方式，没有为undefined
	 // node.index  节点的数据位置
	 // node.isroot 节点是否是根节点
	 // node.parent 节点的父节点
	 // node.topic 节点的名称
	 
 }); 
```

```javascript
// 拖动成功的监听
 MindHelper.on('drag_trigger', function (arr) {
	 // 页面拖动 结束时发生的动作,返回一个数组 arr
	 // arr[0]  当前被拖动元素的ID
	 // arr[2]  当前被拖动元素目标父元素的ID
 }); 
```

```javascript
// 添加和编辑的监听
 MindHelper.on('add_trigger', function (scope， formatRetEvent) {
	 // scope 当前插件的作用域
	 // formatRetEvent 类型 Function  内部函数的控制通道
	 // formatRetEvent 详解
	  formatRetEvent({
	 	 formatAsnc: true, //开启编辑时的异步请求
    	 editUrl: '/TalentMapping/UpdateMappingOrganization', //编辑时发送HTTP请求的地址配置在这里
   	 	 addUrl: '/TalentMapping/AddMappingOrganization', //添加时发送Http请求的地址配置在这里
   		 retFunc(ret) { //formatAsnc： fasle 时会 ，节点名称修改完毕会在这个函数中返回修改结果
    		  console.log(ret);
 	     },  // 直接修改
 	     ajaxReName(sendEdit, node, next, prev) { 
		 // formatAsnc： true 时，会在这个函数中返回，
		 //三个参数：sendEdit，类型： Function  ，执行该函数会发送请求到指定的url地址：addUrl；
// node： 新的节点信息
// next: 类型Function 执行该函数则会添加节点
// prev: 类型Function 执行该函数则取消添加操作

// 使用示例：
//首先发起请求：sendEdit（query,fn）到 addUrl，并且带上query 参数，成功则执行next()
		 
   	     sendEdit(
   		     { Id: node.id , OrganizationName: node.topic},
     	     function (res) { 
     		     if (res.Success) {
      	   	      r_Layout_BeautAlert.done('修改成功');
        	      next();
        	  }
     	   }
   	   )
 	   },  // 异步修改名字
	    checkVal(val) { // reIdFunc的前置方法，profileOpts: {useDefaultId： false } 如果这里是这样配置滴，那么 会首先通过该方法，截获添加时输入框的信息，并返回给调用者，调用者自行验证值是否正确，正确返回true,继续程序，错误返回false 中断程序
   	   if (!val) {
   	     r_Layout_BeautAlert.done('请输入名称')
  	      return false
  		    }
      if (val.length >50) {
        r_Layout_BeautAlert.done('名称不能大于50个字符')
        return false
      }
      return true
    },
	
    reIdFunc(addNode, val, node, next, prev) { //通过checkVal之后异步添加节点信息的函数
     //四个参数： addNode 添加节点函数；val节点的名称信息，node未渲染的节点类,next 继续执行函数,prev 返回上一步函数
	 
	 // 示例流程：addNode(query, fn) --->发送query添加节点请求到 addUrl--->请求会通过fn返回一个res参数，这里是请求的结果 ------>成功之后 通过next()函数 把id嵌入到 插件中形成一个完整的节点并渲染---->失败 调用 prev 返回上一个操作，丢弃节点
	 addNode(
        { OrganizationName: val, MappingCompanyId: app.id, PId: window.id == node.id ? null : node.id},
        function (res) {
          if (!res.Success) {
            r_Layout_BeautAlert.done(res.Message);
            app.reload();
            prev();
            return;
          }
          app.get_org();
          r_Layout_BeautAlert.done('添加成功');
          next(res.Data)
        }
      )
    }
	
	 })
 }); 
```
#### 导出截图
依赖： js\mapping__plugin\jsmind.screenshot.js
#### 拖拽节点
依赖：D:js\mapping__plugin\jsmind.draggable.js

抛出的API接口：
showAll（） 展开全部
hideAll()   全部收起
getMindData（） 获取当前图的全部数据
screenShot（）  屏幕截图
searchNode（id） 搜索节点, 需要传一个节点ID
getSelectedNode（） 通过调用获取当前被选中的节点
selectNode（id） 传入节点ID来选中节点
hideNode（id） 收起指定ID的节点
showNode（ID） 展开指定ID的节点

更多接口陆续完善


--------------------------END?----------------------------
1. 由于本插件是在执行开发任务的时候进行的改写，时间十分有限，虽然完成了很多功能，也满足了大多数场景的应用，但是大多数功能是在实际的需求中临时进行修改的。难免有部分逻辑层面上有很大的耦合并未解耦。
2、由于时间的原因，本插件难免有一些隐蔽的BUG，使用时需要注意。（暂未发现影响业务的BUG）
3、本插件开发时并未遵循开源的规范，而是直接对源码进行了修改，并进行了强制的扩展，本人在这里并不推荐这种做法。本人已经做好了，重新编写一个规范插件的准备。敬请期待下一个版本。

