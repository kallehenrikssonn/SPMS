(this.webpackJsonpspms=this.webpackJsonpspms||[]).push([[0],{14:function(t,e,a){},16:function(t,e,a){},23:function(t,e,a){t.exports=a(34)},34:function(t,e,a){"use strict";a.r(e);var o=a(3),n=a(4),r=a(5),s=a(7),c=a(6),i=a(2),l=a(8),u=a(0),p=a.n(u),d=a(10),h=a.n(d);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(16);var m=a(17),f=function(t){function e(){return Object(n.a)(this,e),Object(s.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(l.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){if(!this.props.show)return null;return p.a.createElement("div",{className:"backdrop",style:{backdropStyle:{position:"fixed",top:0,bottom:0,left:5,right:0,backgroundColor:"rgba(0,0,0,0.3)",padding:50}}},p.a.createElement("div",{className:"modal",style:{modalStyle:{backgroundColor:"#fff",borderRadius:5,maxWidth:500,minHeight:300,margin:"0 auto",padding:30}}},this.props.children,p.a.createElement("div",{className:"footer"},p.a.createElement("button",{onClick:this.props.onClose},"Close"))))}}]),e}(p.a.Component),k=a(9),b=a.n(k),v=a(12),y=a(18),O=a(21),S=a(14),g=a.n(S),E=function(t){function e(t){var a;return Object(n.a)(this,e),(a=Object(s.a)(this,Object(c.a)(e).call(this,t))).closeModal=function(){a.setState({open:!1}),a.props.onCloseModal()},a.state={stocks:a.props.stocks,chartData:[],stockData:[],open:a.props.open},a.drawStockValueChart=a.drawStockValueChart.bind(Object(i.a)(a)),a.drawStockValueChart(),a}return Object(l.a)(e,t),Object(r.a)(e,[{key:"getStockData",value:function(){var t=Object(v.a)(b.a.mark((function t(e){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+e+"&apikey=XDNRE3YNSC6MJXBQ").then((function(t){return t.json()})).then((function(t){if("Note"!==Object.keys(t)[0]&&"Error Message"!==Object.keys(t)[0]){var e=t["Time Series (Daily)"],a=Object.keys(e).reverse(),o=[];return[o=a.map((function(t){return o.concat(e[t])[0]})),a]}alert("Only 5 requests are allowed in one minute (by API)")}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"addToList",value:function(t,e){for(var a=0;a<e.length;a++)for(var o=document.getElementById(e[a]),n=0;n<t.length;n++){var r=document.createElement("option");r.text=t[n],o.add(r)}}},{key:"drawGraph",value:function(t,e){var a=Object.assign([],this.state.stockData),n=a[0][1].indexOf(t),r=a[0][1].indexOf(e);if(n<=r){var s=["Time"],c=Object(o.a)(this.state.stocks).map((function(t){return t.name}));s=s.concat(c);var i=!1,l=[];l.push(s);try{for(var u=n;u<r+1;u++){var p=[];p=[a[0][1][u]];for(var d=0;d<a.length;d++)p=p.concat(parseFloat(Object.values(a[d][0][u])[0]));if(!Array.isArray(p)){i=!0;break}l.push(p)}}catch(h){}!1===i?this.setState({chartData:l}):alert("Only 5 request are allowed in one minute (by API)")}else alert("Time invalid")}},{key:"drawStockValueChart",value:function(){var t=Object(v.a)(b.a.mark((function t(){var e,a,n,r,s,c=this;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.state.stocks,a=e.map((function(t){return t.name})),n=[],t.next=5,Promise.all(a.map(function(){var t=Object(v.a)(b.a.mark((function t(e){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",c.getStockData(e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())).then((function(t){n=Object(o.a)(t),c.setState({stockData:Object.assign([],t)})}));case 5:0!==n.length&&(r=n[0][1][n[0][1].length-16],s=n[0][1][n[0][1].length-1],this.addToList(n[0][1],["startDate","endDate"]),this.drawGraph(r,s));case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;return p.a.createElement(O.a,{open:this.state.open,onClose:this.closeModal,center:!0,classNames:{overlay:g.a.customOverlay,modal:g.a.customModal}},p.a.createElement("div",null,p.a.createElement("h2",null,"Graph"),"Select by date",p.a.createElement("select",{id:"startDate"},p.a.createElement("option",null,"Select starting date")),p.a.createElement("select",{id:"endDate"},p.a.createElement("option",null,"Select ending date")),p.a.createElement("button",{onClick:function(e){t.drawGraph(document.getElementById("startDate").value,document.getElementById("endDate").value)}},"Search"),p.a.createElement(y.a,{chartType:"LineChart",width:"800px",height:"550px",loader:p.a.createElement("div",null,"Loading chart..."),data:this.state.chartData,options:{title:"Stock value",curveType:"function",legend:{position:"bottom"}}})))}}]),e}(p.a.Component);function j(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,o)}return a}function w(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?j(a,!0).forEach((function(e){Object(m.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):j(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var P=function(t){function e(t){return Object(n.a)(this,e),Object(s.a)(this,Object(c.a)(e).call(this,t))}return Object(l.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this;return p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,this.props.stock.name)),p.a.createElement("td",null,p.a.createElement("p",null,this.props.stock.unitValue,this.props.currencySymbol)),p.a.createElement("td",null,p.a.createElement("p",null,this.props.stock.quantity)),p.a.createElement("td",null,p.a.createElement("p",null,this.props.stock.totalValue,this.props.currencySymbol)),p.a.createElement("td",null,p.a.createElement("input",{onChange:function(e){t.props.setChecked(e,t.props.stock.id)},id:"check-"+this.props.stock.id,defaultChecked:this.props.stock.checked,type:"checkbox"})))}}]),e}(p.a.Component),C=function(t){function e(t){var a;return Object(n.a)(this,e),(a=Object(s.a)(this,Object(c.a)(e).call(this,t))).popUpModal=function(){a.setState({isOpen:!a.state.isOpen})},a.countTotal=function(){for(var t=Object(o.a)(a.state.stocks),e=0,n=0;n<t.length;n++)e=parseFloat(t[n].totalValue)+e;e=e.toFixed(2),a.setState({totalValuOfStocks:e})},a.saveStock=function(){if(a.state.newStock.name.length>0&&a.state.newStock.quantity>0){var t=w({},a.state.newStock),e=t.name.toUpperCase().trim();e.trim().length<1?alert("Insert proper name"):t.quantity%1!==0?alert("Quantity has to be a whole number"):a.state.stocks.length>=40?alert("Maximum number of stocks in a portfolio is 40"):fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+e+"&apikey=XDNRE3YNSC6MJXBQ").then((function(t){return t.json()})).then((function(o){if("Note"===Object.keys(o)[0]||"Error Message"===Object.keys(o)[0])alert(Object.values(o)[0]);else{var n=o["Time Series (Daily)"],r=Object.keys(n)[0],s=parseFloat(Object.values(n[r])[0]);t.name=e,t.unitValue=s.toFixed(2);var c=t.unitValue*t.quantity;t.totalValue=c.toFixed(2),t.checked=!1;var i=a.state.stocks.length+1;t.id="stock"+a.state.id+i;var l=a.state.stocks.concat(t);a.setState({stocks:l,isOpen:!a.state.isOpen},(function(){a.props.updatePortfolio(a.state.id,a.state.stocks,a.state.name),a.countTotal()}))}}))}else alert("Invalid input")},a.onOpenModal=function(t){t.stopPropagation(),a.setState({open:!0})},a.onCloseModal=function(){a.setState({open:!1})},a.state={stocks:a.props.stocks,totalValuOfStocks:a.props.total,currency:"EUR",newName:"",name:a.props.name,id:a.props.id,isOpen:!1,open:!1,newStock:{name:"",unitValue:0,quantity:0,totalValue:0},chartData:[],stockData:[],currencySymbol:"\u20ac"},a.changePortfolioName=a.changePortfolioName.bind(Object(i.a)(a)),a.savePortfolioName=a.savePortfolioName.bind(Object(i.a)(a)),a.cancelPortfolioNameChange=a.cancelPortfolioNameChange.bind(Object(i.a)(a)),a.saveStock=a.saveStock.bind(Object(i.a)(a)),a.newStock=a.newStock.bind(Object(i.a)(a)),a.removeSelectedStock=a.removeSelectedStock.bind(Object(i.a)(a)),a.setChecked=a.setChecked.bind(Object(i.a)(a)),a.onOpenModal=a.onOpenModal.bind(Object(i.a)(a)),a}return Object(l.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){for(var t=this,e=Object(o.a)(this.props.stocks),a=0,n=0;n<e.length;n++){var r=e[n].unitValue*e[n].quantity;e[n].totalValue=r.toFixed(2),e[n].checked=!1,a=r+a}a=a.toFixed(2),this.setState({stocks:e,totalValuOfStocks:a},(function(){t.props.updatePortfolio(t.state.id,t.state.stocks,t.state.name)}))}},{key:"hideTextShowInput",value:function(t){t.stopPropagation();var e=t.target,a=e.parentElement.firstChild;e.hasAttribute("hidden")?e.removeAttribute("hidden"):e.setAttribute("hidden",!0),a.removeAttribute("hidden")}},{key:"changePortfolioName",value:function(t){t.stopPropagation(),this.setState({newName:t.target.value})}},{key:"savePortfolioName",value:function(t){var e=this;t.stopPropagation(),this.state.newName.trim().length>0?this.setState({name:this.state.newName.trim()},(function(){e.props.updatePortfolio(e.state.id,e.state.stocks,e.state.name)})):alert("Insert proper name");var a=t.target.parentElement,o=a.nextSibling;a.setAttribute("hidden",!0),o.removeAttribute("hidden")}},{key:"cancelPortfolioNameChange",value:function(t){var e=t.target.parentElement,a=e.nextSibling;e.setAttribute("hidden",!0),a.removeAttribute("hidden")}},{key:"newStock",value:function(t){var e=this;t.stopPropagation();var a=t.target.id.split("-")[0],o=w({},this.state.newStock);o[a]=t.target.value,this.setState({newStock:o},(function(){e.props.updatePortfolio(e.state.id,e.state.stocks,e.state.name)}))}},{key:"removeSelectedStock",value:function(t){var e=this,a=Object(o.a)(this.state.stocks).filter((function(t){return!1===t.checked}));this.setState({stocks:a},(function(){e.props.updatePortfolio(e.state.id,e.state.stocks,e.state.name),e.countTotal();for(var t=document.getElementsByTagName("input"),a=0;a<t.length;++a)t[a].checked=!1}))}},{key:"setChecked",value:function(t,e){var a=this;t.stopPropagation();var o=Object.assign([],this.state.stocks),n=o.filter((function(t){return t.id===e}))[0];n.checked?n.checked=!1:n.checked=!0,this.setState({stocks:o},(function(){a.props.updatePortfolio(a.state.id,a.state.stocks,a.state.name)}))}},{key:"render",value:function(){var t=this,e=this.state.stocks.map((function(e,a){return p.a.createElement(P,{stock:e,key:a,setChecked:t.setChecked,currencySymbol:t.state.currencySymbol})})),a=!0===this.state.open?p.a.createElement(E,{stocks:this.state.stocks,onCloseModal:this.onCloseModal,open:this.state.open}):"";return p.a.createElement("div",{className:"card"},p.a.createElement("script",{type:"text/javascript",src:"https://www.gstatic.com/charts/loader.js"}),p.a.createElement("button",{onClick:function(e){t.props.closePortfolio(e,t.state.id)},className:"close"}),p.a.createElement("div",null,p.a.createElement("div",{hidden:!0},p.a.createElement("input",{onChange:this.changePortfolioName,id:this.props.name}),p.a.createElement("button",{onClick:this.savePortfolioName},"Save"),p.a.createElement("button",{onClick:this.cancelPortfolioNameChange},"Cancel")),p.a.createElement("p",{onClick:this.hideTextShowInput},this.state.name)),p.a.createElement("div",{className:"datasheet-wrapper"},p.a.createElement("table",{className:"dataSheet"},p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("th",null,"Name"),p.a.createElement("th",null,"Unit value"),p.a.createElement("th",null,"Quantity"),p.a.createElement("th",null,"Total value"),p.a.createElement("th",null,"Select")),e))),p.a.createElement("div",{className:"button-group"},p.a.createElement("button",{onClick:this.popUpModal,className:"button",id:"desktop"},"Add stock"),p.a.createElement("button",{onClick:this.onOpenModal,className:"button",id:"desktop"},"Show performance graph"),p.a.createElement("button",{onClick:this.removeSelectedStock,className:"button",id:"desktop"},"Remove selected")),p.a.createElement("div",null,"Total stock value of ",this.state.name,": ",this.state.totalValuOfStocks,this.state.currencySymbol),p.a.createElement(f,{show:this.state.isOpen,onClose:this.popUpModal},p.a.createElement("form",{onChange:this.newStock},"Name: ",p.a.createElement("input",{id:"name-"+this.state.id,type:"text"}),"Quantity:",p.a.createElement("input",{id:"quantity-"+this.state.id,type:"number"}),p.a.createElement("button",{onClick:this.saveStock,type:"button"},"Save"))),a)}}]),e}(p.a.Component),N=function(t){function e(){var t;Object(n.a)(this,e),(t=Object(s.a)(this,Object(c.a)(e).call(this))).onSetResult=function(e,a){localStorage.setItem(a,JSON.stringify(e)),t.setState({portfolio:e})};var a=localStorage.getItem("portfolio");return a=null!==a?JSON.parse(a):[],t.state={portfolio:a},t.addPortfolio=t.addPortfolio.bind(Object(i.a)(t)),t.closePortfolio=t.closePortfolio.bind(Object(i.a)(t)),t.updatePortfolio=t.updatePortfolio.bind(Object(i.a)(t)),t}return Object(l.a)(e,t),Object(r.a)(e,[{key:"updatePortfolio",value:function(t,e,a){for(var o=Object.assign([],this.state.portfolio),n=0;n<o.length;n++)o[n].id===t&&(o[n].name=a,o[n].stocks=e);this.setState({portfolio:o}),this.onSetResult(o,"portfolio")}},{key:"setId",value:function(){var t=Object(o.a)(this.state.portfolio),e=[];return e=e.concat(0),t.map((function(t){return t.id})).map((function(t){return e=e.concat(t)})),Math.max.apply(Math,Object(o.a)(e))+1}},{key:"addPortfolio",value:function(t){t.stopPropagation();var e=this.state.portfolio.length+1,a=this.setId();if(e<=6){var o={name:"Portfolio "+e,id:a,stocks:[]};this.setState({portfolio:this.state.portfolio.concat([o])}),this.onSetResult(this.state.portfolio.concat([o]),"portfolio")}else alert("Too many portfolios. Max amount of portfolios is 6.")}},{key:"closePortfolio",value:function(t,e){t.stopPropagation();var a=Object(o.a)(this.state.portfolio).filter((function(t){return t.id!==e}));this.setState({portfolio:a}),this.onSetResult(a,"portfolio")}},{key:"render",value:function(){var t=this,e=this.state.portfolio.map((function(e,a){return p.a.createElement(C,{name:e.name,total:e.totalValue,updatePortfolio:t.updatePortfolio,stocks:e.stocks,closePortfolio:t.closePortfolio,key:e.id,id:e.id})}));return p.a.createElement("div",{className:"App"},p.a.createElement("header",null),p.a.createElement("body",null,p.a.createElement("div",{className:"addPortfolio"}," ",p.a.createElement("button",{onClick:this.addPortfolio},"Add new portfolio")),p.a.createElement("div",{className:"row"},e)))}}]),e}(p.a.Component);h.a.render(p.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[23,1,2]]]);
//# sourceMappingURL=main.22457391.chunk.js.map