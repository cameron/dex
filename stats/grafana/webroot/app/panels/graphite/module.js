/*! grafana - v1.5.2 - 2014-03-24
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define("panels/graphite/timeSeries",["underscore","kbn"],function(a,b){var c={};return c.ZeroFilled=function(a){this.datapoints=a.datapoints,this.info=a.info,this.label=a.info.alias},c.ZeroFilled.prototype.getFlotPairs=function(c,d){var e=[];if(this.color=this.info.color,this.yaxis=this.info.yaxis,this.info.total=0,this.info.max=null,this.info.min=212312321312,a.each(this.datapoints,function(b){var d=b[1],f=b[0];if(null===f){if("connected"===c)return;"null as zero"===c&&(f=0)}a.isNumber(f)&&(this.info.total+=f),f>this.info.max&&(this.info.max=f),f<this.info.min&&(this.info.min=f),e.push([1e3*d,f])},this),e.length>2&&(this.info.timeStep=e[1][0]-e[0][0]),e.length){this.info.avg=this.info.total/e.length,this.info.current=e[e.length-1][1];var f=b.getFormatFunction(d[this.yaxis-1],2);this.info.avg=this.info.avg?f(this.info.avg):null,this.info.current=this.info.current?f(this.info.current):null,this.info.min=this.info.min?f(this.info.min):null,this.info.max=this.info.max?f(this.info.max):null,this.info.total=this.info.total?f(this.info.total):null}return e},c}),function(a){function b(b){var f,g={icon:"icon-caret-up",size:20,width:19,height:10},h=[],i=!1;b.getEvents=function(){return h},b.hideEvents=function(b){a.each(h,function(a,c){k(c.level(),b)&&c.visual().getObject().hide()})},b.showEvents=function(c){b.hideEvents(),a.each(h,function(a,b){k(b.level(),c)||b.hide()}),j()},b.hooks.processOptions.push(function(a,b){null!=b.events.data&&(i=!0)}),b.hooks.draw.push(function(a){var b=a.getOptions(),c=a.getXAxes()[b.events.xaxis-1];if(i)if(h.length<1)if(_lastRange=c.max-c.min,b.events.clustering){var d=s(b.events.types,b.events.data,c.max-c.min);f=d.types,n(d.data)}else f=b.events.types,n(b.events.data);else l();j()});var j=function(){{var c=b.getPlotOffset();c.left,b.width()-c.right}a.each(h,function(a,b){r(b.getOptions().min)&&!b.isHidden()?b.visual().draw():b.visual().getObject().hide()}),o(),p()},k=function(a,b){var c={};return b?(c.start=void 0==b.min?0:b.min,c.end=void 0==b.max?h.length-1:b.max):(c.start=0,c.end=h.length-1),a>=c.start&&a<=c.end?!0:!1},l=function(){var c,d,e=b.getPlotOffset(),f=b.getXAxes()[b.getOptions().events.xaxis-1];a.each(h,function(a,g){d=e.top+b.height()-g.visual().height(),c=f.p2c(g.getOptions().min)+e.left-g.visual().width()/2,g.visual().moveTo({top:d,left:c})})},m=function(b,c,d){var e=a('<div id="tooltip">');d?e.html(d.description).place_tt(b,c,{offset:10}):e.remove()},n=function(c){a.each(c,function(a,c){var e=null!=b.getOptions().events.levels&&f&&f[c.eventType]?f[c.eventType].level:0;if(e>b.getOptions().events.levels)throw"A type's level has exceeded the maximum. Level="+e+", Max levels:"+b.getOptions().events.levels;h.push(new d(c,q(c),e))}),h.sort(e)},o=function(){var b,c=[],d={},e=0;a.each(h,function(a,e){b&&(e.getOptions().min==b.getOptions().min?(d.min||(d.min=a),d.max=a):d.min&&(c.push(d),d={})),b=e}),d.min&&c.push(d),a.each(c,function(b,c){var d=h.splice(c.min-e,c.max-c.min+1);a.each(d,function(a,b){b.visual().clear()}),e+=c.max-c.min+1})},p=function(){var a,c,d=b.getXAxes()[b.getOptions().events.xaxis-1],e=0,f=-1;pright=b.width()-b.getPlotOffset().right;if(d.min&&d.max){a=d.max-d.min;for(var g=1;g<h.length;g++)c=h[g].getOptions().min-h[g-1].getOptions().min,c/a>.007?(f=-1,e=g):(f=g,g==h.length-1)}},q=function(d){var e,h,i,j,k,l,n,o=b.getPlaceholder(),p=b.getPlotOffset(),q=b.getXAxes()[b.getOptions().events.xaxis-1],r=b.getAxes();return r.yaxis&&r.yaxis.used&&(e=r.yaxis),r.yaxis2&&r.yaxis2.used&&(e=r.yaxis2),null!=f&&f[d.eventType]&&f[d.eventType].icon?(k=f[d.eventType].icon,l=f[d.eventType].level):(k=g,l=0),j=a('<i style="position:absolute" class="'+k.icon+'"></i>').appendTo(o),h=p.top+b.height()-k.size+1,i=q.p2c(d.min)+p.left-k.size/2,j.css({left:i+"px",top:h,color:k.color,"text-shadow":"1px 1px "+k.outline+", -1px -1px "+k.outline+", -1px 1px "+k.outline+", 1px -1px "+k.outline,"font-size":k.size+"px"}),j.hide(),j.data({event:d}),j.hover(function(){var b=a(this).offset();m(b.left+a(this).width()/2,b.top,a(this).data("event"))},function(){a("#tooltip").remove(),b.clearSelection()}),n=new c(j,function(a){a.show()},function(a){a.remove()},function(a,b){a.css({top:b.top,left:b.left})},i,h,j.width(),j.height())},r=function(a){var c=b.getXAxes()[b.getOptions().events.xaxis-1],d=c.p2c(a);return d>0&&d<c.p2c(c.max)},s=function(b,c,d){var e,f=[],g=[];return e=t(c),a.each(e.eventTypes,function(a,b){f.push(u(e.groupedEvents[b],1,d))}),a.each(f,function(b,c){a.each(c,function(a,b){var c={min:b[0].min,max:b[b.length-1].min,eventType:b[0].eventType+",cluster",title:"Cluster of: "+b[0].title,description:b[0].description+", Number of events in the cluster: "+b.length};g.push(c)})}),{types:b,data:g}},t=function(b){var c=[],d={};return a.each(b,function(a,b){d[b.eventType]||(d[b.eventType]=[],c.push(b.eventType)),d[b.eventType].push(b)}),{eventTypes:c,groupedEvents:d}},u=function(a,b,c){for(var d,e,f,g=[],h=0,i=1;i<a.length-1;i++)h+=a[i].min-a[i-1].min;e=h/(a.length-2),d=[a[0]];for(var i=1;i<a.length;i++){var j=a[i].min-a[i-1].min;f=j/c,j>e*b&&f>.05?(g.push(d),d=[a[i]]):d.push(a[i])}return g.push(d),g}}function c(a,b,c,d,e,f,g,h){var i=a,j=b,k=c,l=d,m={left:e,top:f},n=g,o=h;this.width=function(){return n},this.height=function(){return o},this.position=function(){return m},this.draw=function(){j(i)},this.clear=function(){k(i)},this.getObject=function(){return i},this.moveTo=function(a){m=a,l(i,m)}}function d(a,b,c){var d,e=a,f=b,g=c,h=!1;this.visual=function(){return f},this.level=function(){return g},this.getOptions=function(){return e},this.getParent=function(){return d},this.isHidden=function(){return h},this.hide=function(){h=!0},this.unhide=function(){h=!1}}function e(a,b){var c=a.getOptions(),d=b.getOptions();return c.min>d.min?1:c.min<d.min?-1:0}var f={events:{levels:null,data:null,types:null,xaxis:1,clustering:!1}};a.plot.plugins.push({init:b,options:f,name:"events",version:"0.20"})}(jQuery),define("jquery.flot.events",function(){}),function(a){function b(b){function c(a){o.active&&(j(a),b.getPlaceholder().trigger("plotselecting",[f()]))}function d(b){1==b.which&&(document.body.focus(),void 0!==document.onselectstart&&null==p.onselectstart&&(p.onselectstart=document.onselectstart,document.onselectstart=function(){return!1}),void 0!==document.ondrag&&null==p.ondrag&&(p.ondrag=document.ondrag,document.ondrag=function(){return!1}),i(o.first,b),o.active=!0,q=function(a){e(a)},a(document).one("mouseup",q))}function e(a){return q=null,void 0!==document.onselectstart&&(document.onselectstart=p.onselectstart),void 0!==document.ondrag&&(document.ondrag=p.ondrag),o.active=!1,j(a),n()?g():(b.getPlaceholder().trigger("plotunselected",[]),b.getPlaceholder().trigger("plotselecting",[null])),!1}function f(){if(!n())return null;if(!o.show)return null;var c={},d=o.first,e=o.second;return a.each(b.getAxes(),function(a,b){if(b.used){var f=b.c2p(d[b.direction]),g=b.c2p(e[b.direction]);c[a]={from:Math.min(f,g),to:Math.max(f,g)}}}),c}function g(){var a=f();b.getPlaceholder().trigger("plotselected",[a]),a.xaxis&&a.yaxis&&b.getPlaceholder().trigger("selected",[{x1:a.xaxis.from,y1:a.yaxis.from,x2:a.xaxis.to,y2:a.yaxis.to}])}function h(a,b,c){return a>b?a:b>c?c:b}function i(a,c){var d=b.getOptions(),e=b.getPlaceholder().offset(),f=b.getPlotOffset();a.x=h(0,c.pageX-e.left-f.left,b.width()),a.y=h(0,c.pageY-e.top-f.top,b.height()),"y"==d.selection.mode&&(a.x=a==o.first?0:b.width()),"x"==d.selection.mode&&(a.y=a==o.first?0:b.height())}function j(a){null!=a.pageX&&(i(o.second,a),n()?(o.show=!0,b.triggerRedrawOverlay()):k(!0))}function k(a){o.show&&(o.show=!1,b.triggerRedrawOverlay(),a||b.getPlaceholder().trigger("plotunselected",[]))}function l(a,c){var d,e,f,g,h=b.getAxes();for(var i in h)if(d=h[i],d.direction==c&&(g=c+d.n+"axis",a[g]||1!=d.n||(g=c+"axis"),a[g])){e=a[g].from,f=a[g].to;break}if(a[g]||(d="x"==c?b.getXAxes()[0]:b.getYAxes()[0],e=a[c+"1"],f=a[c+"2"]),null!=e&&null!=f&&e>f){var j=e;e=f,f=j}return{from:e,to:f,axis:d}}function m(a,c){var d,e=b.getOptions();"y"==e.selection.mode?(o.first.x=0,o.second.x=b.width()):(d=l(a,"x"),o.first.x=d.axis.p2c(d.from),o.second.x=d.axis.p2c(d.to)),"x"==e.selection.mode?(o.first.y=0,o.second.y=b.height()):(d=l(a,"y"),o.first.y=d.axis.p2c(d.from),o.second.y=d.axis.p2c(d.to)),o.show=!0,b.triggerRedrawOverlay(),!c&&n()&&g()}function n(){var a=b.getOptions().selection.minSize;return Math.abs(o.second.x-o.first.x)>=a&&Math.abs(o.second.y-o.first.y)>=a}var o={first:{x:-1,y:-1},second:{x:-1,y:-1},show:!1,active:!1},p={},q=null;b.clearSelection=k,b.setSelection=m,b.getSelection=f,b.hooks.bindEvents.push(function(a,b){var e=a.getOptions();null!=e.selection.mode&&(b.mousemove(c),b.mousedown(d))}),b.hooks.drawOverlay.push(function(b,c){if(o.show&&n()){var d=b.getPlotOffset(),e=b.getOptions();c.save(),c.translate(d.left,d.top);var f=a.color.parse(e.selection.color);c.strokeStyle=f.scale("a",.8).toString(),c.lineWidth=1,c.lineJoin=e.selection.shape,c.fillStyle=f.scale("a",.4).toString();var g=Math.min(o.first.x,o.second.x)+.5,h=Math.min(o.first.y,o.second.y)+.5,i=Math.abs(o.second.x-o.first.x)-1,j=Math.abs(o.second.y-o.first.y)-1;c.fillRect(g,h,i,j),c.strokeRect(g,h,i,j),c.restore()}}),b.hooks.shutdown.push(function(b,e){e.unbind("mousemove",c),e.unbind("mousedown",d),q&&a(document).unbind("mouseup",q)})}a.plot.plugins.push({init:b,options:{selection:{mode:null,color:"#e8cfac",shape:"round",minSize:5}},name:"selection",version:"1.1"})}(jQuery),define("jquery.flot.selection",function(){}),function(a){function b(a,b){return b*Math.floor(a/b)}function c(a,b,c,d){if("function"==typeof a.strftime)return a.strftime(b);var e=function(a,b){return a=""+a,b=""+(null==b?"0":b),1==a.length?b+a:a},f=[],g=!1,h=a.getHours(),i=12>h;null==c&&(c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),null==d&&(d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]);var j;j=h>12?h-12:0==h?12:h;for(var k=0;k<b.length;++k){var l=b.charAt(k);if(g){switch(l){case"a":l=""+d[a.getDay()];break;case"b":l=""+c[a.getMonth()];break;case"d":l=e(a.getDate(),"");break;case"e":l=e(a.getDate()," ");break;case"h":case"H":l=e(h);break;case"I":l=e(j);break;case"l":l=e(j," ");break;case"m":l=e(a.getMonth()+1,"");break;case"M":l=e(a.getMinutes());break;case"q":l=""+(Math.floor(a.getMonth()/3)+1);break;case"S":l=e(a.getSeconds());break;case"y":l=e(a.getFullYear()%100);break;case"Y":l=""+a.getFullYear();break;case"p":l=i?"am":"pm";break;case"P":l=i?"AM":"PM";break;case"w":l=""+a.getDay()}f.push(l),g=!1}else"%"==l?g=!0:f.push(l)}return f.join("")}function d(a){function b(a,b,c,d){a[b]=function(){return c[d].apply(c,arguments)}}var c={date:a};void 0!=a.strftime&&b(c,"strftime",a,"strftime"),b(c,"getTime",a,"getTime"),b(c,"setTime",a,"setTime");for(var d=["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"],e=0;e<d.length;e++)b(c,"get"+d[e],a,"getUTC"+d[e]),b(c,"set"+d[e],a,"setUTC"+d[e]);return c}function e(a,b){if("browser"==b.timezone)return new Date(a);if(b.timezone&&"utc"!=b.timezone){if("undefined"!=typeof timezoneJS&&"undefined"!=typeof timezoneJS.Date){var c=new timezoneJS.Date;return c.setTimezone(b.timezone),c.setTime(a),c}return d(new Date(a))}return d(new Date(a))}function f(d){d.hooks.processOptions.push(function(d){a.each(d.getAxes(),function(a,d){var f=d.options;"time"==f.mode&&(d.tickGenerator=function(a){var c=[],d=e(a.min,f),g=0,i=f.tickSize&&"quarter"===f.tickSize[1]||f.minTickSize&&"quarter"===f.minTickSize[1]?k:j;null!=f.minTickSize&&(g="number"==typeof f.tickSize?f.tickSize:f.minTickSize[0]*h[f.minTickSize[1]]);for(var l=0;l<i.length-1&&!(a.delta<(i[l][0]*h[i[l][1]]+i[l+1][0]*h[i[l+1][1]])/2&&i[l][0]*h[i[l][1]]>=g);++l);var m=i[l][0],n=i[l][1];if("year"==n){if(null!=f.minTickSize&&"year"==f.minTickSize[1])m=Math.floor(f.minTickSize[0]);else{var o=Math.pow(10,Math.floor(Math.log(a.delta/h.year)/Math.LN10)),p=a.delta/h.year/o;m=1.5>p?1:3>p?2:7.5>p?5:10,m*=o}1>m&&(m=1)}a.tickSize=f.tickSize||[m,n];var q=a.tickSize[0];n=a.tickSize[1];var r=q*h[n];"second"==n?d.setSeconds(b(d.getSeconds(),q)):"minute"==n?d.setMinutes(b(d.getMinutes(),q)):"hour"==n?d.setHours(b(d.getHours(),q)):"month"==n?d.setMonth(b(d.getMonth(),q)):"quarter"==n?d.setMonth(3*b(d.getMonth()/3,q)):"year"==n&&d.setFullYear(b(d.getFullYear(),q)),d.setMilliseconds(0),r>=h.minute&&d.setSeconds(0),r>=h.hour&&d.setMinutes(0),r>=h.day&&d.setHours(0),r>=4*h.day&&d.setDate(1),r>=2*h.month&&d.setMonth(b(d.getMonth(),3)),r>=2*h.quarter&&d.setMonth(b(d.getMonth(),6)),r>=h.year&&d.setMonth(0);var s,t=0,u=Number.NaN;do if(s=u,u=d.getTime(),c.push(u),"month"==n||"quarter"==n)if(1>q){d.setDate(1);var v=d.getTime();d.setMonth(d.getMonth()+("quarter"==n?3:1));var w=d.getTime();d.setTime(u+t*h.hour+(w-v)*q),t=d.getHours(),d.setHours(0)}else d.setMonth(d.getMonth()+q*("quarter"==n?3:1));else"year"==n?d.setFullYear(d.getFullYear()+q):d.setTime(u+r);while(u<a.max&&u!=s);return c},d.tickFormatter=function(a,b){var d=e(a,b.options);if(null!=f.timeformat)return c(d,f.timeformat,f.monthNames,f.dayNames);var g,i=b.options.tickSize&&"quarter"==b.options.tickSize[1]||b.options.minTickSize&&"quarter"==b.options.minTickSize[1],j=b.tickSize[0]*h[b.tickSize[1]],k=b.max-b.min,l=f.twelveHourClock?" %p":"",m=f.twelveHourClock?"%I":"%H";g=j<h.minute?m+":%M:%S"+l:j<h.day?k<2*h.day?m+":%M"+l:"%b %d "+m+":%M"+l:j<h.month?"%b %d":i&&j<h.quarter||!i&&j<h.year?k<h.year?"%b":"%b %Y":i&&j<h.year?k<h.year?"Q%q":"Q%q %Y":"%Y";var n=c(d,g,f.monthNames,f.dayNames);return n})})})}var g={xaxis:{timezone:null,timeformat:null,twelveHourClock:!1,monthNames:null}},h={second:1e3,minute:6e4,hour:36e5,day:864e5,month:2592e6,quarter:7776e6,year:525949.2*60*1e3},i=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"]],j=i.concat([[3,"month"],[6,"month"],[1,"year"]]),k=i.concat([[1,"quarter"],[2,"quarter"],[1,"year"]]);a.plot.plugins.push({init:f,options:g,name:"time",version:"1.0"}),a.plot.formatDate=c}(jQuery),define("jquery.flot.time",function(){}),function(a){function b(a,b){return b*Math.floor(a/b)}function c(c){c.hooks.processDatapoints.push(function(c){a.each(c.getAxes(),function(a,c){var d=c.options;("byte"===d.mode||"byteRate"===d.mode)&&(c.tickGenerator=function(a){var c,e=[],f=2,g=a.delta,h=0,i=0,j=0;for("byteRate"===d.mode&&(a.rate=!0),a.tickDecimals="number"==typeof d.tickDecimals?d.tickDecimals:2;Math.abs(g)>=1024;)h++,g/=1024;for(;1024>=f&&!(f>=g);)f*=2;a.tickSize="undefined"!=typeof d.minTickSize&&f<d.minTickSize?d.minTickSize:f*Math.pow(1024,h),i=b(a.min,a.tickSize);do c=i+j++*a.tickSize,e.push(c);while(c<a.max);return e},c.tickFormatter=function(a,b){for(var c,d=0;Math.abs(a)>=1024;)d++,a/=1024;switch(d){case 0:c=" B";break;case 1:c=" KB";break;case 2:c=" MB";break;case 3:c=" GB";break;case 4:c=" TB";break;case 5:c=" PB";break;case 6:c=" EB";break;case 7:c=" ZB";break;case 8:c=" YB"}return"undefined"!=typeof b.rate&&(c+="/s"),a.toFixed(b.tickDecimals)+c})})})}var d={};a.plot.plugins.push({init:c,options:d,name:"byte",version:"0.1"})}(jQuery),define("jquery.flot.byte",function(){}),function(a){function b(a){function b(a,b){for(var c=null,d=0;d<b.length&&a!=b[d];++d)b[d].stack==a.stack&&(c=b[d]);return c}function c(a,c,d){if(null!=c.stack&&c.stack!==!1){var e=b(c,a.getData());if(e){for(var f,g,h,i,j,k,l,m,n=d.pointsize,o=d.points,p=e.datapoints.pointsize,q=e.datapoints.points,r=[],s=c.lines.show,t=c.bars.horizontal,u=n>2&&(t?d.format[2].x:d.format[2].y),v=s&&c.lines.steps,w=!0,x=t?1:0,y=t?0:1,z=0,A=0;;){if(z>=o.length)break;if(l=r.length,null==o[z]){for(m=0;n>m;++m)r.push(o[z+m]);z+=n}else if(A>=q.length){if(!s)for(m=0;n>m;++m)r.push(o[z+m]);z+=n}else if(null==q[A]){for(m=0;n>m;++m)r.push(null);w=!0,A+=p}else{if(f=o[z+x],g=o[z+y],i=q[A+x],j=q[A+y],k=0,f==i){for(m=0;n>m;++m)r.push(o[z+m]);r[l+y]+=j,k=j,z+=n,A+=p}else if(f>i){if(s&&z>0&&null!=o[z-n]){for(h=g+(o[z-n+y]-g)*(i-f)/(o[z-n+x]-f),r.push(i),r.push(h+j),m=2;n>m;++m)r.push(o[z+m]);k=j}A+=p}else{if(w&&s){z+=n;continue}for(m=0;n>m;++m)r.push(o[z+m]);s&&A>0&&null!=q[A-p]&&(k=j+(q[A-p+y]-j)*(f-i)/(q[A-p+x]-i)),r[l+y]+=k,z+=n}w=!1,l!=r.length&&u&&(r[l+2]+=k)}if(v&&l!=r.length&&l>0&&null!=r[l]&&r[l]!=r[l-n]&&r[l+1]!=r[l-n+1]){for(m=0;n>m;++m)r[l+n+m]=r[l+m];r[l+1]=r[l-n+1]}}d.points=r}}}a.hooks.processDatapoints.push(c)}var c={series:{stack:null}};a.plot.plugins.push({init:b,options:c,name:"stack",version:"1.2"})}(jQuery),define("jquery.flot.stack",function(){}),function(a){function b(a){function b(a,b,d){if(f||(f=!0,g=c(a.getData())),1==b.stackpercent){var e=d.length;b.percents=[];var h=0,i=1;b.bars&&b.bars.horizontal&&b.bars.horizontal===!0&&(h=1,i=0);for(var j=0;e>j;j++){var k=g[d[j][h]+""];b.percents.push(k>0?100*d[j][i]/k:0)}}}function c(a){var b=a.length,c={};if(b>0)for(var d=0;b>d;d++)if(a[d].stackpercent){var e=0,f=1;a[d].bars&&a[d].bars.horizontal&&a[d].bars.horizontal===!0&&(e=1,f=0);for(var g=a[d].data.length,h=0;g>h;h++){var i=0;null!=a[d].data[h][1]&&(i=a[d].data[h][f]),c[a[d].data[h][e]+""]?c[a[d].data[h][e]+""]+=i:c[a[d].data[h][e]+""]=i}}return c}function d(a,b,d){if(b.stackpercent){f||(g=c(a.getData()));var h=[],i=0,j=1;b.bars&&b.bars.horizontal&&b.bars.horizontal===!0&&(i=1,j=0);for(var k=0;k<d.points.length;k+=3)e[d.points[k+i]]||(e[d.points[k+i]]=0),h[k+i]=d.points[k+i],h[k+j]=d.points[k+j]+e[d.points[k+i]],h[k+2]=e[d.points[k+i]],e[d.points[k+i]]+=d.points[k+j],g[h[k+i]+""]>0?(h[k+j]=100*h[k+j]/g[h[k+i]+""],h[k+2]=100*h[k+2]/g[h[k+i]+""]):(h[k+j]=0,h[k+2]=0);d.points=h}}var e={},f=!1,g={};a.hooks.processRawData.push(b),a.hooks.processDatapoints.push(d)}var c={series:{stackpercent:null}};a.plot.plugins.push({init:b,options:c,name:"stackpercent",version:"0.1"})}(jQuery),define("jquery.flot.stackpercent",function(){}),define("panels/graphite/module",["angular","app","jquery","underscore","kbn","moment","./timeSeries","jquery.flot","jquery.flot.events","jquery.flot.selection","jquery.flot.time","jquery.flot.byte","jquery.flot.stack","jquery.flot.stackpercent"],function(a,b,c,d,e,f,g){var h=a.module("kibana.panels.graphite",[]);b.useModule(h),h.controller("graphite",["$scope","$rootScope","filterSrv","datasourceSrv","$timeout","annotationsSrv",function(a,b,h,i,j,k){a.panelMeta={modals:[],editorTabs:[],fullEditorTabs:[{title:"General",src:"app/partials/panelgeneral.html"},{title:"Metrics",src:"app/partials/metrics.html"},{title:"Axes & Grid",src:"app/panels/graphite/axisEditor.html"},{title:"Display Styles",src:"app/panels/graphite/styleEditor.html"}],fullscreenEdit:!0,fullscreenView:!0,description:"Graphing"};var l={datasource:null,renderer:"flot","x-axis":!0,"y-axis":!0,scale:1,y_formats:["short","short"],grid:{max:null,min:0,threshold1:null,threshold2:null,threshold1Color:"rgba(216, 200, 27, 0.27)",threshold2Color:"rgba(234, 112, 112, 0.22)"},annotate:{enable:!1},resolution:100,lines:!0,fill:0,linewidth:1,points:!1,pointradius:5,bars:!1,stack:!1,legend:{show:!0,values:!1,min:!1,max:!1,current:!1,total:!1,avg:!1},percentage:!1,zerofill:!0,nullPointMode:"connected",steppedLine:!1,tooltip:{value_type:"cumulative",query_as_alias:!0},targets:[],aliasColors:{},aliasYAxis:{}};d.defaults(a.panel,l),d.defaults(a.panel.tooltip,l.tooltip),d.defaults(a.panel.annotate,l.annotate),d.defaults(a.panel.grid,l.grid),d.isBoolean(a.panel.legend)&&(a.panel.legend={show:a.panel.legend},d.defaults(a.panel.legend,l.legend)),a.panel.y_format&&(a.panel.y_formats[0]=a.panel.y_format,delete a.panel.y_format),a.panel.y2_format&&(a.panel.y_formats[1]=a.panel.y2_format,delete a.panel.y2_format),a.init=function(){a.initPanel(a),a.fullscreen=!1,a.editor={index:1},a.editorTabs=d.pluck(a.panelMeta.fullEditorTabs,"title"),a.hiddenSeries={},a.datasources=i.listOptions(),a.setDatasource(a.panel.datasource)},a.setDatasource=function(b){return a.panel.datasource=b,a.datasource=i.get(b),a.datasource?void a.get_data():void(a.panel.error="Cannot find datasource "+b)},a.removeTarget=function(b){a.panel.targets=d.without(a.panel.targets,b),a.get_data()},a.updateTimeRange=function(){a.range=h.timeRange(),a.rangeUnparsed=h.timeRange(!1),a.resolution=Math.ceil(c(window).width()*(a.panel.span/12)/2),a.interval="10m",a.range&&(a.interval=e.secondsToHms(e.calculate_interval(a.range.from,a.range.to,a.resolution,0)/1e3))},a.get_data=function(){delete a.panel.error,a.panelMeta.loading=!0,a.updateTimeRange();var b={range:a.rangeUnparsed,interval:a.interval,targets:a.panel.targets,format:"png"===a.panel.renderer?"png":"json",maxDataPoints:a.resolution,datasource:a.panel.datasource};return a.annotationsPromise=k.getAnnotations(a.rangeUnparsed),a.datasource.query(b).then(a.dataHandler).then(null,function(b){a.panel.error=b.message||"Graphite HTTP Request Error"})},a.dataHandler=function(b){if(a.panelMeta.loading=!1,a.legend=[],d.isString(b))return void a.render(b);a.datapointsWarning=!1,a.datapointsCount=0,a.datapointsOutside=!1;var c=d.map(b.data,a.seriesHandler);a.datapointsWarning=a.datapointsCount||!a.datapointsOutside,a.annotationsPromise.then(function(b){c.annotations=b,a.render(c)},function(){a.render(c)})},a.seriesHandler=function(b,c){var d=b.datapoints,e=b.target,h=a.panel.aliasColors[e]||a.colors[c],i=a.panel.aliasYAxis[e]||1,j={alias:e,color:h,enable:!0,yaxis:i};a.legend.push(j);var k=new g.ZeroFilled({datapoints:d,info:j});if(d&&d.length>0){var l=f.utc(1e3*d[d.length-1][1]),m=f.utc(a.range.from);-1e4>l-m&&(a.datapointsOutside=!0)}return a.datapointsCount+=d.length,k},a.add_target=function(){a.panel.targets.push({target:""})},a.otherPanelInFullscreenMode=function(){return b.fullscreen&&!a.fullscreen},a.render=function(b){a.$emit("render",b)},a.changeSeriesColor=function(b,c){b.color=c,a.panel.aliasColors[b.alias]=b.color,a.render()},a.toggleSeries=function(b){a.hiddenSeries[b.alias]?delete a.hiddenSeries[b.alias]:a.hiddenSeries[b.alias]=!0,a.$emit("toggleLegend",b.alias)},a.toggleYAxis=function(b){b.yaxis=2===b.yaxis?1:2,a.panel.aliasYAxis[b.alias]=b.yaxis,a.render()},a.toggleGridMinMax=function(b){a.panel.grid[b]=d.toggle(a.panel.grid[b],null,0),a.render()}}])});