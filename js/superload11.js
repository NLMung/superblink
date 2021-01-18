/**
* PreloadJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
**/(function(){var c=this.createjs=this.createjs||{},c=c.PreloadJS=c.PreloadJS||{};c.version="0.3.0";c.buildDate="Tue, 12 Feb 2013 21:12:02 GMT"})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},a=c.prototype;c.initialize=function(d){d.addEventListener=a.addEventListener;d.removeEventListener=a.removeEventListener;d.removeAllEventListeners=a.removeAllEventListeners;d.hasEventListener=a.hasEventListener;d.dispatchEvent=a.dispatchEvent};a._listeners=null;a.initialize=function(){};a.addEventListener=function(a,b){var g=this._listeners;g?this.removeEventListener(a,b):g=this._listeners={};var f=g[a];f||(f=g[a]=[]);f.push(b);return b};a.removeEventListener=
function(a,b){var g=this._listeners;if(g){var f=g[a];if(f)for(var e=0,c=f.length;e<c;e++)if(f[e]==b){c==1?delete g[a]:f.splice(e,1);break}}};a.removeAllEventListeners=function(a){a?this._listeners&&delete this._listeners[a]:this._listeners=null};a.dispatchEvent=function(a,b){var g=false,f=this._listeners;if(a&&f){typeof a=="string"&&(a={type:a});a.target=b||this;f=f[a.type];if(!f)return g;for(var f=f.slice(),e=0,c=f.length;e<c;e++){var h=f[e];h instanceof Function?g=g||h.apply(null,[a]):h.handleEvent&&
(g=g||h.handleEvent(a))}}return!!g};a.hasEventListener=function(a){var b=this._listeners;return!(!b||!b[a])};a.toString=function(){return"[EventDispatcher]"};createjs.EventDispatcher=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.init()};c.prototype={};var a=c.prototype;c.FILE_PATTERN=/(\w+:\/{2})?((?:\w+\.){2}\w+)?(\/?[\S]+\/|\/)?([\w\-%\.]+)(?:\.)(\w+)?(\?\S+)?/i;a.loaded=false;a.canceled=false;a.progress=0;a._item=null;a.onProgress=null;a.onLoadStart=null;a.onComplete=null;a.onError=null;a.addEventListener=null;a.removeEventListener=null;a.removeAllEventListeners=null;a.dispatchEvent=null;a.hasEventListener=null;a._listeners=null;createjs.EventDispatcher.initialize(a);a.getItem=function(){return this._item};
a.init=function(){};a.load=function(){};a.close=function(){};a._sendLoadStart=function(){this._isCanceled()||(this.onLoadStart&&this.onLoadStart({target:this}),this.dispatchEvent("loadStart"))};a._sendProgress=function(a){if(!this._isCanceled()){var b=null;if(typeof a=="number")this.progress=a,b={loaded:this.progress,total:1};else if(b=a,this.progress=a.loaded/a.total,isNaN(this.progress)||this.progress==Infinity)this.progress=0;b.target=this;b.type="progress";this.onProgress&&this.onProgress(b);
this.dispatchEvent(b)}};a._sendComplete=function(){this._isCanceled()||(this.onComplete&&this.onComplete({target:this}),this.dispatchEvent("complete"))};a._sendError=function(a){if(!this._isCanceled())a==null&&(a={}),a.target=this,a.type="error",this.onError&&this.onError(a),this.dispatchEvent(a)};a._isCanceled=function(){return window.createjs==null||this.canceled?true:false};a._parseURI=function(a){return!a?null:a.match(c.FILE_PATTERN)};a.toString=function(){return"[PreloadJS AbstractLoader]"};
createjs.AbstractLoader=c})();this.createjs=this.createjs||{};
(function(){var c=function(b){this.init(b)},a=c.prototype=new createjs.AbstractLoader;c.LOAD_TIMEOUT=8E3;c.BINARY="binary";c.CSS="css";c.IMAGE="image";c.JAVASCRIPT="javascript";c.JSON="json";c.SOUND="sound";c.SVG="svg";c.TEXT="text";c.XML="xml";a.useXHR=true;a.stopOnError=false;a.maintainScriptOrder=true;a.next=null;a.onFileLoad=null;a.onFileProgress=null;a._typeCallbacks=null;a._extensionCallbacks=null;a._loadStartWasDispatched=false;a._maxConnections=1;a._currentlyLoadingScript=null;a._currentLoads=
null;a._loadQueue=null;a._loadQueueBackup=null;a._loadItemsById=null;a._loadItemsBySrc=null;a._loadedResults=null;a._loadedRawResults=null;a._numItems=0;a._numItemsLoaded=0;a._scriptOrder=null;a._loadedScripts=null;a.init=function(b){this._numItems=this._numItemsLoaded=0;this._loadStartWasDispatched=this._paused=false;this._currentLoads=[];this._loadQueue=[];this._loadQueueBackup=[];this._scriptOrder=[];this._loadedScripts=[];this._loadItemsById={};this._loadItemsBySrc={};this._loadedResults={};this._loadedRawResults=
{};this._typeCallbacks={};this._extensionCallbacks={};this.setUseXHR(b)};a.setUseXHR=function(b){return this.useXHR=b!=false&&window.XMLHttpRequest!=null};a.removeAll=function(){this.remove()};a.remove=function(b){var a=null;b&&!(b instanceof Array)?a=[b]:b&&(a=b);b=false;if(a){for(;a.length;){for(var d=a.pop(),e=this.getResult(d),c=this._loadQueue.length-1;c>=0;c--)if(h=this._loadQueue[c].getItem(),h.id==d||h.src==d){this._loadQueue.splice(c,1)[0].cancel();break}for(c=this._loadQueueBackup.length-
1;c>=0;c--)if(h=this._loadQueueBackup[c].getItem(),h.id==d||h.src==d){this._loadQueueBackup.splice(c,1)[0].cancel();break}if(e)delete this._loadItemsById[e.id],delete this._loadItemsBySrc[e.src],this._disposeItem(e);else for(var c=this._currentLoads.length-1;c>=0;c--){var h=this._currentLoads[c].getItem();if(h.id==d||h.src==d){this._currentLoads.splice(c,1)[0].cancel();b=true;break}}}b&&this._loadNext()}else{this.close();for(d in this._loadItemsById)this._disposeItem(this._loadItemsById[d]);this.initialize(this.useXHR)}};
a.reset=function(){this.close();for(var b in this._loadItemsById)this._disposeItem(this._loadItemsById[b]);b=[];for(i=0,l=this._loadQueueBackup.length;i<l;i++)b.push(this._loadQueueBackup[i].getItem());this.loadManifest(b,false)};c.isBinary=function(b){switch(b){case createjs.LoadQueue.IMAGE:case createjs.LoadQueue.BINARY:return true;default:return false}};a.installPlugin=function(b){if(!(b==null||b.getPreloadHandlers==null)){b=b.getPreloadHandlers();if(b.types!=null)for(var a=0,d=b.types.length;a<
d;a++)this._typeCallbacks[b.types[a]]=b.callback;if(b.extensions!=null)for(a=0,d=b.extensions.length;a<d;a++)this._extensionCallbacks[b.extensions[a]]=b.callback}};a.setMaxConnections=function(b){this._maxConnections=b;this._paused||this._loadNext()};a.loadFile=function(b,a){b==null?this._sendError({text:"PRELOAD_NO_FILE"}):(this._addItem(b),a!==false&&this.setPaused(false))};a.loadManifest=function(b,a){var d=null;if(b instanceof Array){if(b.length==0){this._sendError({text:"PRELOAD_MANIFEST_EMPTY"});
return}d=b}else{if(b==null){this._sendError({text:"PRELOAD_MANIFEST_NULL"});return}d=[b]}for(var c=0,o=d.length;c<o;c++)this._addItem(d[c]);a!==false&&this.setPaused(false)};a.load=function(){this.setPaused(false)};a.getItem=function(b){return this._loadItemsById[b]||this._loadItemsBySrc[b]};a.getResult=function(b,a){var d=this._loadItemsById[b]||this._loadItemsBySrc[b];if(d==null)return null;d=d.id;return a&&this._loadedRawResults[d]?this._loadedRawResults[d]:this._loadedResults[d]};a.setPaused=
function(b){(this._paused=b)||this._loadNext()};a.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();this._scriptOrder.length=0;this._loadedScripts.length=0;this.loadStartWasDispatched=false};a._addItem=function(b){b=this._createLoadItem(b);if(b!=null){var a=this._createLoader(b);a!=null&&(this._loadQueue.push(a),this._loadQueueBackup.push(a),this._numItems++,this._updateProgress(),this.maintainScriptOrder&&b.type==createjs.LoadQueue.JAVASCRIPT&&a instanceof createjs.XHRLoader&&
(this._scriptOrder.push(b),this._loadedScripts.push(null)))}};a._createLoadItem=function(b){var a=null;switch(typeof b){case "string":a={src:b};break;case "object":a=window.HTMLAudioElement&&b instanceof HTMLAudioElement?{tag:b,src:a.tag.src,type:createjs.LoadQueue.SOUND}:b}b=this._parseURI(a.src);if(b!=null)a.ext=b[5];if(a.type==null)a.type=this._getTypeByExtension(a.ext);if(a.tag==null)a.tag=this._createTag(a.type);if(a.id==null||a.id=="")a.id=a.src;if(b=this._typeCallbacks[a.type]||this._extensionCallbacks[a.ext]){b=
b(a.src,a.type,a.id,a.data);if(b===false)return null;else if(b!==true){if(b.src!=null)a.src=b.src;if(b.id!=null)a.id=b.id;if(b.tag!=null&&b.tag.load instanceof Function)a.tag=b.tag;if(b.completeHandler!=null)a.completeHandler=b.completeHandler}if(b.type)a.type=b.type;b=this._parseURI(a.src);if(b!=null)a.ext=b[5]}this._loadItemsById[a.id]=a;return this._loadItemsBySrc[a.src]=a};a._createLoader=function(a){var d=this.useXHR;switch(a.type){case createjs.LoadQueue.JSON:case createjs.LoadQueue.XML:case createjs.LoadQueue.TEXT:d=
true;break;case createjs.LoadQueue.SOUND:d=false}return d?new createjs.XHRLoader(a):new createjs.TagLoader(a)};a._loadNext=function(){if(!this._paused){if(!this._loadStartWasDispatched)this._sendLoadStart(),this._loadStartWasDispatched=true;if(this._numItems==this._numItemsLoaded)this.loaded=true,this._sendComplete(),this.next&&this.next.load&&this.next.load();for(var a=0,d=this._loadQueue.length;a<d;a++){if(this._currentLoads.length>=this._maxConnections)break;var c=this._loadQueue[a];if(this.maintainScriptOrder&&
c instanceof createjs.TagLoader&&c.getItem().type==createjs.LoadQueue.JAVASCRIPT){if(this._currentlyLoadingScript)continue;this._currentlyLoadingScript=true}this._loadQueue.splice(a,1);this._loadItem(c);a--;d--}}};a._loadItem=function(a){a.addEventListener("progress",createjs.proxy(this._handleProgress,this));a.addEventListener("complete",createjs.proxy(this._handleFileComplete,this));a.addEventListener("error",createjs.proxy(this._handleFileError,this));this._currentLoads.push(a);a.load()};a._handleFileError=
function(a){var d=a.target;this._numItemsLoaded++;this._updateProgress();a={item:d.getItem()};this._sendError(a);this.stopOnError||(this._removeLoadItem(d),this._loadNext())};a._handleFileComplete=function(a){var a=a.target,d=a.getItem();this._loadedResults[d.id]=a.getResult();a instanceof createjs.XHRLoader&&(this._loadedRawResults[d.id]=a.getResult(true));this._removeLoadItem(a);if(this.maintainScriptOrder&&d.type==createjs.LoadQueue.JAVASCRIPT)if(a instanceof createjs.TagLoader)this._currentlyLoadingScript=
false;else{this._loadedScripts[this._scriptOrder.indexOf(d)]=d;this._checkScriptLoadOrder(a);return}this._processFinishedLoad(d)};a._processFinishedLoad=function(a){this._numItemsLoaded++;this._updateProgress();this._sendFileComplete(a);this._loadNext()};a._checkScriptLoadOrder=function(){for(var a=this._loadedScripts.length,d=0;d<a;d++){var c=this._loadedScripts[d];if(c===null)break;c!==true&&(this._processFinishedLoad(c),this._loadedScripts[d]=true,d--,a--)}};a._removeLoadItem=function(a){for(var d=
this._currentLoads.length,c=0;c<d;c++)if(this._currentLoads[c]==a){this._currentLoads.splice(c,1);break}};a._handleProgress=function(a){a=a.target;this._sendFileProgress(a.getItem(),a.progress);this._updateProgress()};a._updateProgress=function(){var a=this._numItemsLoaded/this._numItems,d=this._numItems-this._numItemsLoaded;if(d>0){for(var c=0,e=0,o=this._currentLoads.length;e<o;e++)c+=this._currentLoads[e].progress;a+=c/d*(d/this._numItems)}this._sendProgress(a)};a._disposeItem=function(a){delete this._loadedResults[a.id];
delete this._loadedRawResults[a.id];delete this._loadItemsById[a.id];delete this._loadItemsBySrc[a.src]};a._createTag=function(a){var d=null;switch(a){case createjs.LoadQueue.IMAGE:return document.createElement("img");case createjs.LoadQueue.SOUND:return d=document.createElement("audio"),d.autoplay=false,d;case createjs.LoadQueue.JAVASCRIPT:return d=document.createElement("script"),d.type="text/javascript",d;case createjs.LoadQueue.CSS:return d=this.useXHR?document.createElement("style"):document.createElement("link"),
d.rel="stylesheet",d.type="text/css",d;case createjs.LoadQueue.SVG:return this.useXHR?d=document.createElement("svg"):(d=document.createElement("object"),d.type="image/svg+xml"),d}return null};a._getTypeByExtension=function(a){switch(a){case "jpeg":case "jpg":case "gif":case "png":case "webp":case "bmp":return createjs.LoadQueue.IMAGE;case "ogg":case "mp3":case "wav":return createjs.LoadQueue.SOUND;case "json":return createjs.LoadQueue.JSON;case "xml":return createjs.LoadQueue.XML;case "css":return createjs.LoadQueue.CSS;
case "js":return createjs.LoadQueue.JAVASCRIPT;case "svg":return createjs.LoadQueue.SVG;default:return createjs.LoadQueue.TEXT}};a._sendFileProgress=function(a,d){if(this._isCanceled())this._cleanUp();else{var c={target:this,type:"fileprogress",progress:d,loaded:d,total:1,item:a};this.onFileProgress&&this.onFileProgress(c);this.dispatchEvent(c)}};a._sendFileComplete=function(a){if(!this._isCanceled()){var d={target:this,type:"fileload",item:a,result:this._loadedResults[a.id],rawResult:this._loadedRawResults[a.id]};
a.completeHandler&&a.completeHandler(d);this.onFileLoad&&this.onFileLoad(d);this.dispatchEvent(d)}};a.toString=function(){return"[PreloadJS LoadQueue]"};createjs.proxy=function(a,d){return function(){return a.apply(d,arguments)}};createjs.LoadQueue=c;if(!createjs.proxy)createjs.proxy=function(a,d){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(d,Array.prototype.slice.call(arguments,0).concat(c))}};var d=function(){};d.init=function(){var a=navigator.userAgent;d.isFirefox=
a.indexOf("Firefox")>-1;d.isOpera=window.opera!=null;d.isChrome=a.indexOf("Chrome")>-1;d.isIOS=a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1};d.init();createjs.LoadQueue.BrowserDetect=d;if(!Array.prototype.indexOf)Array.prototype.indexOf=function(a){if(this==null)throw new TypeError;var d=Object(this),c=d.length>>>0;if(c===0)return-1;var e=0;arguments.length>1&&(e=Number(arguments[1]),e!=e?e=0:e!=0&&e!=Infinity&&e!=-Infinity&&(e=(e>0||-1)*Math.floor(Math.abs(e))));if(e>=c)return-1;
for(e=e>=0?e:Math.max(c-Math.abs(e),0);e<c;e++)if(e in d&&d[e]===a)return e;return-1}})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.init(a)},a=c.prototype=new createjs.AbstractLoader;a._loadTimeout=null;a._tagCompleteProxy=null;a._isAudio=false;a._tag=null;a.init=function(a){this._item=a;this._tag=a.tag;this._isAudio=window.HTMLAudioElement&&a.tag instanceof HTMLAudioElement;this._tagCompleteProxy=createjs.proxy(this._handleLoad,this)};a.getResult=function(){return this._tag};a.cancel=function(){this.canceled=true;this._clean();this.getItem()};a.load=function(){var a=this._item,b=this._tag;clearTimeout(this._loadTimeout);
this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),createjs.LoadQueue.LOAD_TIMEOUT);if(this._isAudio)b.src=null,b.preload="auto";b.onerror=createjs.proxy(this._handleError,this);this._isAudio?(b.onstalled=createjs.proxy(this._handleStalled,this),b.addEventListener("canplaythrough",this._tagCompleteProxy,false)):(b.onload=createjs.proxy(this._handleLoad,this),b.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this));switch(a.type){case createjs.LoadQueue.CSS:b.href=
a.src;break;case createjs.LoadQueue.SVG:b.data=a.src;break;default:b.src=a.src}if(a.type==createjs.LoadQueue.SVG||a.type==createjs.LoadQueue.JAVASCRIPT||a.type==createjs.LoadQueue.CSS)(document.body||document.getElementsByTagName("body")[0]).appendChild(b);b.load!=null&&b.load()};a._handleTimeout=function(){this._clean();this._sendError({reason:"PRELOAD_TIMEOUT"})};a._handleStalled=function(){};a._handleError=function(){this._clean();this._sendError()};a._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);
this.getItem().tag.readyState=="loaded"&&this._handleLoad()};a._handleLoad=function(){if(!this._isCanceled()){var a=this.getItem(),b=a.tag;if(!(this.loaded||this.isAudio&&b.readyState!==4))this.loaded=true,a.type==createjs.LoadQueue.SVG&&(document.body||document.getElementsByTagName("body")[0]).removeChild(b),this._clean(),this._sendComplete()}};a._clean=function(){clearTimeout(this._loadTimeout);var a=this.getItem().tag;a.onload=null;a.removeEventListener&&a.removeEventListener("canplaythrough",
this._tagCompleteProxy,false);a.onstalled=null;a.onprogress=null;a.onerror=null;a.parentNode&&a.parentNode.removeChild(a)};a.toString=function(){return"[PreloadJS TagLoader]"};createjs.TagLoader=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.init(a)},a=c.prototype=new createjs.AbstractLoader;a._request=null;a._loadTimeout=null;a._xhrLevel=1;a._response=null;a._rawResponse=null;a.init=function(a){this._item=a;this._createXHR(a)};a.getResult=function(a){return a&&this._rawResponse?this._rawResponse:this._response};a.cancel=function(){this.canceled=true;this._clean();this._request.abort()};a.load=function(){if(this._request==null)this._handleError();else{this._request.onloadstart=createjs.proxy(this._handleLoadStart,
this);this._request.onprogress=createjs.proxy(this._handleProgress,this);this._request.onabort=createjs.proxy(this._handleAbort,this);this._request.onerror=createjs.proxy(this._handleError,this);this._request.ontimeout=createjs.proxy(this._handleTimeout,this);if(this._xhrLevel==1)this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),createjs.LoadQueue.LOAD_TIMEOUT);this._request.onload=createjs.proxy(this._handleLoad,this);if(this._request.onreadystatechange)this._request.onreadystatechange=
this._handleReadyStateChange(this);try{this._request.send()}catch(a){this._sendError({source:a})}}};a._handleProgress=function(a){a.loaded>0&&a.total==0||this._sendProgress({loaded:a.loaded,total:a.total})};a._handleLoadStart=function(){clearTimeout(this._loadTimeout);this._sendLoadStart()};a._handleAbort=function(){this._clean();this._sendError()};a._handleError=function(){this._clean();this._sendError()};a._handleReadyStateChange=function(){this._request.readyState==4&&this._handleLoad()};a._handleLoad=
function(){if(!this.loaded)this.loaded=true,this._checkError()?(this._response=this._getResponse(),this._clean(),this._generateTag()&&this._sendComplete()):this._handleError()};a._handleTimeout=function(){this._clean();this._sendError({reason:"PRELOAD_TIMEOUT"})};a._checkError=function(){switch(parseInt(this._request.status)){case 404:case 0:return false}return true};a._getResponse=function(){if(this._response!=null)return this._response;if(this._request.response!=null)return this._request.response;
try{if(this._request.responseText!=null)return this._request.responseText}catch(a){}try{if(this._request.responseXML!=null)return this._request.responseXML}catch(b){}return null};a._createXHR=function(a){var b=document.createElement("a");b.href=a.src;var c=document.createElement("a");c.href=location.href;b=b.hostname!=""&&(b.port!=c.port||b.protocol!=c.protocol||b.hostname!=c.hostname);c=null;if(b&&window.XDomainRequest)c=new XDomainRequest;else if(window.XMLHttpRequest)c=new XMLHttpRequest;else try{c=
new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(f){try{c=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){try{c=new ActiveXObject("Msxml2.XMLHTTP")}catch(o){return false}}}a.type==createjs.LoadQueue.TEXT&&c.overrideMimeType&&c.overrideMimeType("text/plain; charset=x-user-defined");this._xhrLevel=typeof c.responseType==="string"?2:1;c.open("GET",a.src,true);b&&c instanceof XMLHttpRequest&&this._xhrLevel==1&&c.setRequestHeader("Origin",location.origin);if(createjs.LoadQueue.isBinary(a.type))c.responseType=
"arraybuffer";this._request=c;return true};a._clean=function(){clearTimeout(this._loadTimeout);var a=this._request;a.onloadstart=null;a.onprogress=null;a.onabort=null;a.onerror=null;a.onload=null;a.ontimeout=null;a.onloadend=null;a.onreadystatechange=null};a._generateTag=function(){var a=this._item.tag;switch(this._item.type){case createjs.LoadQueue.IMAGE:return a.onload=createjs.proxy(this._handleTagReady,this),a.src=this._item.src,this._rawResponse=this._response,this._response=a,false;case createjs.LoadQueue.JAVASCRIPT:a=
document.createElement("script");this._rawResponse=a.text=this._response;this._response=a;break;case createjs.LoadQueue.CSS:document.getElementsByTagName("head")[0].appendChild(a);if(a.styleSheet)a.styleSheet.cssText=this._response;else{var b=document.createTextNode(this._response);a.appendChild(b)}this._rawResponse=this._response;this._response=a;break;case createjs.LoadQueue.XML:this._response=b=this._parseXML(this._response,"text/xml");break;case createjs.LoadQueue.SVG:b=this._parseXML(this._response,
"image/svg+xml");this._rawResponse=this._response;a.appendChild(b.documentElement);this._response=a;break;case createjs.LoadQueue.JSON:a={};try{a=JSON.parse(this._response)}catch(c){a=null}this._rawResponse=this._response;this._response=a}return true};a._parseXML=function(a,b){var c=null;window.DOMParser?c=(new DOMParser).parseFromString(a,b):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async=false,c.loadXML(a));return c};a._handleTagReady=function(){this._sendComplete()};a.toString=function(){return"[PreloadJS XHRLoader]"};
createjs.XHRLoader=c})();typeof JSON!=="object"&&(JSON={});
(function(){function c(a){return a<10?"0"+a:a}function a(a){g.lastIndex=0;return g.test(a)?'"'+a.replace(g,function(a){var b=o[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function d(b,c){var g,n,m,p,q=f,k,j=c[b];j&&typeof j==="object"&&typeof j.toJSON==="function"&&(j=j.toJSON(b));typeof h==="function"&&(j=h.call(c,b,j));switch(typeof j){case "string":return a(j);case "number":return isFinite(j)?String(j):"null";case "boolean":case "null":return String(j);
case "object":if(!j)return"null";f+=e;k=[];if(Object.prototype.toString.apply(j)==="[object Array]"){p=j.length;for(g=0;g<p;g+=1)k[g]=d(g,j)||"null";m=k.length===0?"[]":f?"[\n"+f+k.join(",\n"+f)+"\n"+q+"]":"["+k.join(",")+"]";f=q;return m}if(h&&typeof h==="object"){p=h.length;for(g=0;g<p;g+=1)typeof h[g]==="string"&&(n=h[g],(m=d(n,j))&&k.push(a(n)+(f?": ":":")+m))}else for(n in j)Object.prototype.hasOwnProperty.call(j,n)&&(m=d(n,j))&&k.push(a(n)+(f?": ":":")+m);m=k.length===0?"{}":f?"{\n"+f+k.join(",\n"+
f)+"\n"+q+"}":"{"+k.join(",")+"}";f=q;return m}}if(typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+c(this.getUTCMonth()+1)+"-"+c(this.getUTCDate())+"T"+c(this.getUTCHours())+":"+c(this.getUTCMinutes())+":"+c(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var b=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
g=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,f,e,o={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},h;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,b,c){var g;e=f="";if(typeof c==="number")for(g=0;g<c;g+=1)e+=" ";else typeof c==="string"&&(e=c);if((h=b)&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number"))throw Error("JSON.stringify");return d("",
{"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,c){function d(a,b){var e,g,f=a[b];if(f&&typeof f==="object")for(e in f)Object.prototype.hasOwnProperty.call(f,e)&&(g=d(f,e),g!==void 0?f[e]=g:delete f[e]);return c.call(a,b,f)}var e,a=String(a);b.lastIndex=0;b.test(a)&&(a=a.replace(b,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),typeof c==="function"?d({"":e},""):e;throw new SyntaxError("JSON.parse");}})();

/**
* Superstars - Superblink preloaderanimasjon
* (c) 2013 Agens AS
**/
SUPERSTARS=function(){function a(a,b,d){k=b||"red",l=d||"rgba(0,0,0,0.3)",f=document.getElementById(a),g=f.getContext("2d"),i=.5*f.width,j=.5*f.height,h=setInterval(c,30)}function b(){clearInterval(h)}function c(){m++,g.clearRect(0,0,f.width,f.height),g.fillStyle=k,g.beginPath(),g.rect(0,0,f.width,f.height),g.fill();var a=25,b=5,c=d(m,0,1,a);m>a&&(c=1-.1*(m-a)),c=Math.max(0,c);var h=d(m-b,0,1,a);m>a+b&&(h=1-.1*(m-a-b)),h=Math.max(0,h);var l=d(m-2*b,0,1,a);m>a+2*b&&(l=1-.1*(m-a-2*b)),l=Math.max(0,l),e(i-80,j,c),e(i,j,h),e(i+80,j,l),m>a+3*b&&(m=0)}function d(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(72.8925*f*e+-218.58*e*e+238.88*f+-113.59*e+21.3975*a)}function e(a,b,c){g.fillStyle=l,g.beginPath(),g.moveTo(a,b-20*c),g.lineTo(a+7*c,b-5*c),g.lineTo(a+21*c,b-5*c),g.lineTo(a+10*c,b+6*c),g.lineTo(a+13*c,b+20*c),g.lineTo(a-2*c,b+12*c),g.lineTo(a-13*c,b+20*c),g.lineTo(a-12*c,b+3*c),g.lineTo(a-21*c,b-5*c),g.lineTo(a-8*c,b-6*c),g.lineTo(a,b-20*c),g.fill()}var f,g,h,i,j,k,l,m=0;return{init:a,destroy:b}}();

/**
* Superload
* Superblink preloader som bruker superstars (visuals), preloadjs (grafikk) og howlerjs (lyd)
* (c) 2013 Agens AS
**/
SUPERLOAD = (function () {
	var queue;
	var manifest;
	var sounds;
	var soundIndex;
	var howls;
	var onComplete;
	var noSound = false;
	// manifest [{id:string, src:string}, ...]
	// sounds [{id:string, mp3:string, ogg:string}, ...]
	function init(canvasIdString, bgstyle, starstyle, manifestArray,soundsArray,onCompleteFunction) {
		manifest = manifestArray;
		sounds = soundsArray;
		soundIndex = 0;
		howls = {};
		onComplete = onCompleteFunction;
		SUPERSTARS.init(canvasIdString, bgstyle,starstyle);
		loadGraphics(manifest);
	}
	function loadGraphics() {
		if (manifest.length>0) {
			queue = new createjs.LoadQueue();
			queue.addEventListener("complete", loadSounds);
			queue.loadManifest(manifest);
		} else {
			loadSounds();
		}
	}
	function loadSounds() {
		if (sounds.length>0) {
			var iOS = parseFloat(
	('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
	.replace('undefined', '3_2').replace('_', '.').replace('_', '')
) || false;

		if (iOS) {
			if (iOS<6) {
				console.log("iOS "+iOS+ " : no sound");
				noSound=true;
				loadComplete();
			}
		}
			loadSound();
		} else {
			loadComplete();
		}
	}
	function loadSound() {
		howls[sounds[soundIndex].id] = new Howl({
			urls: [sounds[soundIndex].mp3, sounds[soundIndex].ogg],
			onload: function () {
				soundIndex +=1;
				if (soundIndex<sounds.length) {
					loadSound();
				} else {
					loadComplete();
				}
			}
		});
	}
	function loadComplete() {
		SUPERSTARS.destroy();
		onComplete();
	}
	function getGraphic(id) {
		return queue.getResult(id);
	}
	function getSound(id) {
		if (noSound) {
			return {play: function () {
			}};
		}
		return howls[id];
	}
	
	function lagre(game_id, score) {
		console.log("lagre..."+game_id+" "+score);
	    var log = md5(game_id.toString()+score.toString()+SCRT.game_id);
	    var xmlhttp;
	    if (window.XMLHttpRequest) {
	      xmlhttp = new XMLHttpRequest();
	    } else {
	      // code for IE6, IE5
	      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xmlhttp.open("POST","/wp-content/themes/superblink2/scores.php",true);
	    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	    xmlhttp.onreadystatechange = function () {

	      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	        console.log("response: "+xmlhttp.responseText);
	      }
	    }
	    xmlhttp.send("log="+log+"&game_id="+game_id+"&score="+score);
	}
function md5 (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // + namespaced by: Michael White (http://getsprink.com)
  // +    tweaked by: Jack
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: utf8_encode
  // *     example 1: md5('Kevin van Zonneveld');
  // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
  var xl;

  var rotateLeft = function (lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  };

  var addUnsigned = function (lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  };

  var _F = function (x, y, z) {
    return (x & y) | ((~x) & z);
  };
  var _G = function (x, y, z) {
    return (x & z) | (y & (~z));
  };
  var _H = function (x, y, z) {
    return (x ^ y ^ z);
  };
  var _I = function (x, y, z) {
    return (y ^ (x | (~z)));
  };

  var _FF = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _GG = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _HH = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var _II = function (a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  };

  var convertToWordArray = function (str) {
    var lWordCount;
    var lMessageLength = str.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = new Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };

  var wordToHex = function (lValue) {
    var wordToHexValue = "",
      wordToHexValue_temp = "",
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = "0" + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  };

  var x = [],
    k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22,
    S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20,
    S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23,
    S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;

  // str = this.utf8_encode(str); Utkommentert av Peter
  x = convertToWordArray(str);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;

  xl = x.length;
  for (k = 0; k < xl; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

  return temp.toLowerCase();
}
	return {
   		init:init,
   		getGraphic:getGraphic,
   		getSound:getSound,
   		lagre:lagre
	};
})();


/*!
 *  howler.js v1.1.11
 *  howlerjs.com
 *
 *  (c) 2013, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
 
 /*
!function(){var e={},t=null,n=!0,r=!1;if("undefined"!=typeof AudioContext?t=new AudioContext:"undefined"!=typeof webkitAudioContext?t=new webkitAudioContext:"undefined"!=typeof Audio?n=!1:(n=!1,r=!0),n){var i=void 0===t.createGain?t.createGainNode():t.createGain();i.gain.value=1,i.connect(t.destination)}var s=function(){this._volume=1,this._muted=!1,this.usingWebAudio=n,this._howls=[]};s.prototype={volume:function(e){var t=this;if(e=parseFloat(e),e&&e>=0&&1>=e){t._volume=e,n&&(i.gain.value=e);for(var r in t._howls)if(t._howls.hasOwnProperty(r)&&t._howls[r]._webAudio===!1)for(var s=0;s<t._howls[r]._audioNode.length;s++)t._howls[r]._audioNode[s].volume=t._howls[r]._volume*t._volume;return t}return n?i.gain.value:t._volume},mute:function(){return this._setMuted(!0),this},unmute:function(){return this._setMuted(!1),this},_setMuted:function(e){var t=this;t._muted=e,n&&(i.gain.value=e?0:t._volume);for(var r in t._howls)if(t._howls.hasOwnProperty(r)&&t._howls[r]._webAudio===!1)for(var s=0;s<t._howls[r]._audioNode.length;s++)t._howls[r]._audioNode[s].muted=e}};var o=new s,u=null;if(!r){u=new Audio;var a={mp3:!!u.canPlayType("audio/mpeg;").replace(/^no$/,""),opus:!!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),m4a:!!(u.canPlayType("audio/x-m4a;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),webm:!!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")}}var f=function(e){var t=this;t._autoplay=e.autoplay||!1,t._buffer=e.buffer||!1,t._duration=e.duration||0,t._format=e.format||null,t._loop=e.loop||!1,t._loaded=!1,t._sprite=e.sprite||{},t._src=e.src||"",t._pos3d=e.pos3d||[0,0,-.5],t._volume=e.volume||1,t._urls=e.urls||[],t._onload=[e.onload||function(){}],t._onloaderror=[e.onloaderror||function(){}],t._onend=[e.onend||function(){}],t._onpause=[e.onpause||function(){}],t._onplay=[e.onplay||function(){}],t._onendTimer=[],t._webAudio=n&&!t._buffer,t._audioNode=[],t._webAudio&&t._setupAudioNode(),o._howls.push(t),t.load()};if(f.prototype={load:function(){var t=this,n=null;if(r)return t.on("loaderror"),void 0;for(var i={mp3:a.mp3,opus:a.opus,ogg:a.ogg,wav:a.wav,m4a:a.m4a,weba:a.webm},s=0;s<t._urls.length;s++){var u;if(t._format?u=t._format:(u=t._urls[s].toLowerCase().match(/.+\.([^?]+)(\?|$)/),u=u&&u.length>=2?u[1]:t._urls[s].toLowerCase().match(/data\:audio\/([^?]+);/)[1]),i[u]){n=t._urls[s];break}}if(!n)return t.on("loaderror"),void 0;if(t._src=n,t._webAudio)l(t,n);else{var f=new Audio;t._audioNode.push(f),f.src=n,f._pos=0,f.preload="auto",f.volume=o._muted?0:t._volume*o.volume(),e[n]=t;var c=function(){t._duration=f.duration,0===Object.getOwnPropertyNames(t._sprite).length&&(t._sprite={_default:[0,1e3*t._duration]}),t._loaded||(t._loaded=!0,t.on("load")),t._autoplay&&t.play(),f.removeEventListener("canplaythrough",c,!1)};f.addEventListener("canplaythrough",c,!1),f.load()}return t},urls:function(e){var t=this;return e?(t.stop(),t._urls="string"==typeof e?[e]:e,t._loaded=!1,t.load(),t):t._urls},play:function(e,n){var r=this;return"function"==typeof e&&(n=e),e&&"function"!=typeof e||(e="_default"),r._loaded?r._sprite[e]?(r._inactiveNode(function(i){i._sprite=e;var s,u=i._pos>0?i._pos:r._sprite[e][0]/1e3,a=r._sprite[e][1]/1e3-i._pos,f=!(!r._loop&&!r._sprite[e][2]),l="string"==typeof n?n:Math.round(Date.now()*Math.random())+"";if(function(){var t={id:l,sprite:e,loop:f};s=setTimeout(function(){!r._webAudio&&f&&r.stop(t.id,t.timer).play(e,t.id),r._webAudio&&!f&&(r._nodeById(t.id).paused=!0),r._webAudio||f||r.stop(t.id,t.timer),r.on("end",l)},1e3*a),r._onendTimer.push(s),t.timer=r._onendTimer[r._onendTimer.length-1]}(),r._webAudio){var c=r._sprite[e][0]/1e3,p=r._sprite[e][1]/1e3;i.id=l,i.paused=!1,h(r,[f,c,p],l),r._playStart=t.currentTime,i.gain.value=r._volume,void 0===i.bufferSource.start?i.bufferSource.noteGrainOn(0,u,a):i.bufferSource.start(0,u,a)}else{if(4!==i.readyState)return r._clearEndTimer(s),function(){var t=r,s=e,o=n,u=i,a=function(){t.play(s,o),u.removeEventListener("canplaythrough",a,!1)};u.addEventListener("canplaythrough",a,!1)}(),r;i.id=l,i.currentTime=u,i.muted=o._muted,i.volume=r._volume*o.volume(),setTimeout(function(){i.play()},0)}return r.on("play"),"function"==typeof n&&n(l),r}),r):("function"==typeof n&&n(),r):(r.on("load",function(){r.play(e,n)}),r)},pause:function(e,t){var n=this;if(!n._loaded)return n.on("play",function(){n.pause(e)}),n;n._clearEndTimer(t||0);var r=e?n._nodeById(e):n._activeNode();if(r)if(r._pos=n.pos(null,e),n._webAudio){if(!r.bufferSource)return n;r.paused=!0,void 0===r.bufferSource.stop?r.bufferSource.noteOff(0):r.bufferSource.stop(0)}else r.pause();return n.on("pause"),n},stop:function(e,t){var n=this;if(!n._loaded)return n.on("play",function(){n.stop(e)}),n;n._clearEndTimer(t||0);var r=e?n._nodeById(e):n._activeNode();if(r)if(r._pos=0,n._webAudio){if(!r.bufferSource)return n;r.paused=!0,void 0===r.bufferSource.stop?r.bufferSource.noteOff(0):r.bufferSource.stop(0)}else r.pause(),r.currentTime=0;return n},mute:function(e){var t=this;if(!t._loaded)return t.on("play",function(){t.mute(e)}),t;var n=e?t._nodeById(e):t._activeNode();return n&&(t._webAudio?n.gain.value=0:n.volume=0),t},unmute:function(e){var t=this;if(!t._loaded)return t.on("play",function(){t.unmute(e)}),t;var n=e?t._nodeById(e):t._activeNode();return n&&(t._webAudio?n.gain.value=t._volume:n.volume=t._volume),t},volume:function(e,t){var n=this;if(e=parseFloat(e),e>=0&&1>=e){if(n._volume=e,!n._loaded)return n.on("play",function(){n.volume(e,t)}),n;var r=t?n._nodeById(t):n._activeNode();return r&&(n._webAudio?r.gain.value=e:r.volume=e*o.volume()),n}return n._volume},loop:function(e){var t=this;return"boolean"==typeof e?(t._loop=e,t):t._loop},sprite:function(e){var t=this;return"object"==typeof e?(t._sprite=e,t):t._sprite},pos:function(e,n){var r=this;if(!r._loaded)return r.on("load",function(){r.pos(e)}),"number"==typeof e?r:r._pos||0;e=parseFloat(e);var i=n?r._nodeById(n):r._activeNode();if(i)return r._webAudio?e>=0?(i._pos=e,r.pause(n).play(i._sprite,n),r):i._pos+(t.currentTime-r._playStart):e>=0?(i.currentTime=e,r):i.currentTime;if(e>=0)return r;for(var s=0;s<r._audioNode.length;s++)if(r._audioNode[s].paused&&4===r._audioNode[s].readyState)return r._webAudio?r._audioNode[s]._pos:r._audioNode[s].currentTime},pos3d:function(e,t,n,r){var i=this;if(t=void 0!==t&&t?t:0,n=void 0!==n&&n?n:-.5,!i._loaded)return i.on("play",function(){i.pos3d(e,t,n,r)}),i;if(!(e>=0||0>e))return i._pos3d;if(i._webAudio){var s=r?i._nodeById(r):i._activeNode();s&&(i._pos3d=[e,t,n],s.panner.setPosition(e,t,n))}return i},fade:function(e,t,n,r,i){var s=this,o=Math.abs(e-t),u=e>t?"down":"up",a=o/.01,f=n/a;if(!s._loaded)return s.on("load",function(){s.fade(e,t,n,r,i)}),s;s.volume(e,i);for(var l=1;a>=l;l++)!function(){var e=s._volume+("up"===u?.01:-.01)*l,n=Math.round(1e3*e)/1e3,o=t;setTimeout(function(){s.volume(n,i),n===o&&r&&r()},f*l)}()},fadeIn:function(e,t,n){return this.volume(0).play().fade(0,e,t,n)},fadeOut:function(e,t,n,r){var i=this;return i.fade(i._volume,e,t,function(){n&&n(),i.pause(r),i.on("end")},r)},_nodeById:function(e){for(var t=this,n=t._audioNode[0],r=0;r<t._audioNode.length;r++)if(t._audioNode[r].id===e){n=t._audioNode[r];break}return n},_activeNode:function(){for(var e=this,t=null,n=0;n<e._audioNode.length;n++)if(!e._audioNode[n].paused){t=e._audioNode[n];break}return e._drainPool(),t},_inactiveNode:function(e){for(var t=this,n=null,r=0;r<t._audioNode.length;r++)if(t._audioNode[r].paused&&4===t._audioNode[r].readyState){e(t._audioNode[r]),n=!0;break}if(t._drainPool(),!n){var i;t._webAudio?(i=t._setupAudioNode(),e(i)):(t.load(),i=t._audioNode[t._audioNode.length-1],i.addEventListener("loadedmetadata",function(){e(i)}))}},_drainPool:function(){var e,t=this,n=0;for(e=0;e<t._audioNode.length;e++)t._audioNode[e].paused&&n++;for(e=t._audioNode.length-1;e>=0&&!(5>=n);e--)t._audioNode[e].paused&&(t._webAudio&&t._audioNode[e].disconnect(0),n--,t._audioNode.splice(e,1))},_clearEndTimer:function(e){var t=this,n=t._onendTimer.indexOf(e);n=n>=0?n:0,t._onendTimer[n]&&(clearTimeout(t._onendTimer[n]),t._onendTimer.splice(n,1))},_setupAudioNode:function(){var e=this,n=e._audioNode,r=e._audioNode.length;return n[r]=void 0===t.createGain?t.createGainNode():t.createGain(),n[r].gain.value=e._volume,n[r].paused=!0,n[r]._pos=0,n[r].readyState=4,n[r].connect(i),n[r].panner=t.createPanner(),n[r].panner.setPosition(e._pos3d[0],e._pos3d[1],e._pos3d[2]),n[r].panner.connect(n[r]),n[r]},on:function(e,t){var n=this,r=n["_on"+e];if("function"==typeof t)r.push(t);else for(var i=0;i<r.length;i++)t?r[i].call(n,t):r[i].call(n);return n},off:function(e,t){for(var n=this,r=n["_on"+e],i=""+t,s=0;s<r.length;s++)if(i===""+r[s]){r.splice(s,1);break}return n},unload:function(){for(var t=this,n=t._audioNode,r=0;r<t._audioNode.length;r++)t.stop(n[r].id),t._webAudio?n[r].disconnect(0):n[r].src="";var i=o._howls.indexOf(t);i&&o._howls.splice(i,1),delete e[t._src],t=null}},n)var l=function(n,r){if(r in e)n._duration=e[r].duration,c(n);else{var i=new XMLHttpRequest;i.open("GET",r,!0),i.responseType="arraybuffer",i.onload=function(){t.decodeAudioData(i.response,function(t){t&&(e[r]=t,c(n,t))})},i.onerror=function(){n._webAudio&&(n._buffer=!0,n._webAudio=!1,n._audioNode=[],delete n._gainNode,n.load())};try{i.send()}catch(s){i.onerror()}}},c=function(e,t){e._duration=t?t.duration:e._duration,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play()},h=function(n,r,i){var s=n._nodeById(i);s.bufferSource=t.createBufferSource(),s.bufferSource.buffer=e[n._src],s.bufferSource.connect(s.panner),s.bufferSource.loop=r[0],r[0]&&(s.bufferSource.loopStart=r[1],s.bufferSource.loopEnd=r[1]+r[2])};"function"==typeof define&&define.amd?define("Howler",function(){return{Howler:o,Howl:f}}):(window.Howler=o,window.Howl=f)}()
*/
/*!
 *  howler.js v1.1.26
 *  howlerjs.com
 *
 *  (c) 2013-2015, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
!function(){var e={},o=null,n=!0,t=!1;try{"undefined"!=typeof AudioContext?o=new AudioContext:"undefined"!=typeof webkitAudioContext?o=new webkitAudioContext:n=!1}catch(r){n=!1}if(!n)if("undefined"!=typeof Audio)try{new Audio}catch(r){t=!0}else t=!0;if(n){var a="undefined"==typeof o.createGain?o.createGainNode():o.createGain();a.gain.value=1,a.connect(o.destination)}var i=function(e){this._volume=1,this._muted=!1,this.usingWebAudio=n,this.ctx=o,this.noAudio=t,this._howls=[],this._codecs=e,this.iOSAutoEnable=!0};i.prototype={volume:function(e){var o=this;if(e=parseFloat(e),e>=0&&1>=e){o._volume=e,n&&(a.gain.value=e);for(var t in o._howls)if(o._howls.hasOwnProperty(t)&&o._howls[t]._webAudio===!1)for(var r=0;r<o._howls[t]._audioNode.length;r++)o._howls[t]._audioNode[r].volume=o._howls[t]._volume*o._volume;return o}return n?a.gain.value:o._volume},mute:function(){return this._setMuted(!0),this},unmute:function(){return this._setMuted(!1),this},_setMuted:function(e){var o=this;o._muted=e,n&&(a.gain.value=e?0:o._volume);for(var t in o._howls)if(o._howls.hasOwnProperty(t)&&o._howls[t]._webAudio===!1)for(var r=0;r<o._howls[t]._audioNode.length;r++)o._howls[t]._audioNode[r].muted=e},codecs:function(e){return this._codecs[e]},_enableiOSAudio:function(){var e=this;if(!o||!e._iOSEnabled&&/iPhone|iPad|iPod/i.test(navigator.userAgent)){e._iOSEnabled=!1;var n=function(){var t=o.createBuffer(1,1,22050),r=o.createBufferSource();r.buffer=t,r.connect(o.destination),"undefined"==typeof r.start?r.noteOn(0):r.start(0),setTimeout(function(){(r.playbackState===r.PLAYING_STATE||r.playbackState===r.FINISHED_STATE)&&(e._iOSEnabled=!0,e.iOSAutoEnable=!1,window.removeEventListener("touchstart",n,!1))},0)};return window.addEventListener("touchstart",n,!1),e}}};var u=null,d={};t||(u=new Audio,d={mp3:!!u.canPlayType("audio/mpeg;").replace(/^no$/,""),opus:!!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!u.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(u.canPlayType("audio/x-m4a;")||u.canPlayType("audio/m4a;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(u.canPlayType("audio/x-mp4;")||u.canPlayType("audio/mp4;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")});var l=new i(d),f=function(e){var t=this;t._autoplay=e.autoplay||!1,t._buffer=e.buffer||!1,t._duration=e.duration||0,t._format=e.format||null,t._loop=e.loop||!1,t._loaded=!1,t._sprite=e.sprite||{},t._src=e.src||"",t._pos3d=e.pos3d||[0,0,-.5],t._volume=void 0!==e.volume?e.volume:1,t._urls=e.urls||[],t._rate=e.rate||1,t._model=e.model||null,t._onload=[e.onload||function(){}],t._onloaderror=[e.onloaderror||function(){}],t._onend=[e.onend||function(){}],t._onpause=[e.onpause||function(){}],t._onplay=[e.onplay||function(){}],t._onendTimer=[],t._webAudio=n&&!t._buffer,t._audioNode=[],t._webAudio&&t._setupAudioNode(),"undefined"!=typeof o&&o&&l.iOSAutoEnable&&l._enableiOSAudio(),l._howls.push(t),t.load()};if(f.prototype={load:function(){var e=this,o=null;if(t)return void e.on("loaderror");for(var n=0;n<e._urls.length;n++){var r,a;if(e._format)r=e._format;else{if(a=e._urls[n],r=/^data:audio\/([^;,]+);/i.exec(a),r||(r=/\.([^.]+)$/.exec(a.split("?",1)[0])),!r)return void e.on("loaderror");r=r[1].toLowerCase()}if(d[r]){o=e._urls[n];break}}if(!o)return void e.on("loaderror");if(e._src=o,e._webAudio)_(e,o);else{var u=new Audio;u.addEventListener("error",function(){u.error&&4===u.error.code&&(i.noAudio=!0),e.on("loaderror",{type:u.error?u.error.code:0})},!1),e._audioNode.push(u),u.src=o,u._pos=0,u.preload="auto",u.volume=l._muted?0:e._volume*l.volume();var f=function(){e._duration=Math.ceil(10*u.duration)/10,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play(),u.removeEventListener("canplaythrough",f,!1)};u.addEventListener("canplaythrough",f,!1),u.load()}return e},urls:function(e){var o=this;return e?(o.stop(),o._urls="string"==typeof e?[e]:e,o._loaded=!1,o.load(),o):o._urls},play:function(e,n){var t=this;return"function"==typeof e&&(n=e),e&&"function"!=typeof e||(e="_default"),t._loaded?t._sprite[e]?(t._inactiveNode(function(r){r._sprite=e;var a=r._pos>0?r._pos:t._sprite[e][0]/1e3,i=0;t._webAudio?(i=t._sprite[e][1]/1e3-r._pos,r._pos>0&&(a=t._sprite[e][0]/1e3+a)):i=t._sprite[e][1]/1e3-(a-t._sprite[e][0]/1e3);var u,d=!(!t._loop&&!t._sprite[e][2]),f="string"==typeof n?n:Math.round(Date.now()*Math.random())+"";if(function(){var o={id:f,sprite:e,loop:d};u=setTimeout(function(){!t._webAudio&&d&&t.stop(o.id).play(e,o.id),t._webAudio&&!d&&(t._nodeById(o.id).paused=!0,t._nodeById(o.id)._pos=0,t._clearEndTimer(o.id)),t._webAudio||d||t.stop(o.id),t.on("end",f)},1e3*i),t._onendTimer.push({timer:u,id:o.id})}(),t._webAudio){var _=t._sprite[e][0]/1e3,s=t._sprite[e][1]/1e3;r.id=f,r.paused=!1,p(t,[d,_,s],f),t._playStart=o.currentTime,r.gain.value=t._volume,"undefined"==typeof r.bufferSource.start?d?r.bufferSource.noteGrainOn(0,a,86400):r.bufferSource.noteGrainOn(0,a,i):d?r.bufferSource.start(0,a,86400):r.bufferSource.start(0,a,i)}else{if(4!==r.readyState&&(r.readyState||!navigator.isCocoonJS))return t._clearEndTimer(f),function(){var o=t,a=e,i=n,u=r,d=function(){o.play(a,i),u.removeEventListener("canplaythrough",d,!1)};u.addEventListener("canplaythrough",d,!1)}(),t;r.readyState=4,r.id=f,r.currentTime=a,r.muted=l._muted||r.muted,r.volume=t._volume*l.volume(),setTimeout(function(){r.play()},0)}return t.on("play"),"function"==typeof n&&n(f),t}),t):("function"==typeof n&&n(),t):(t.on("load",function(){t.play(e,n)}),t)},pause:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.pause(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=o.pos(null,e),o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else n.pause();return o.on("pause"),o},stop:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.stop(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=0,o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else isNaN(n.duration)||(n.pause(),n.currentTime=0);return o},mute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.mute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=0:n.muted=!0),o},unmute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.unmute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=o._volume:n.muted=!1),o},volume:function(e,o){var n=this;if(e=parseFloat(e),e>=0&&1>=e){if(n._volume=e,!n._loaded)return n.on("play",function(){n.volume(e,o)}),n;var t=o?n._nodeById(o):n._activeNode();return t&&(n._webAudio?t.gain.value=e:t.volume=e*l.volume()),n}return n._volume},loop:function(e){var o=this;return"boolean"==typeof e?(o._loop=e,o):o._loop},sprite:function(e){var o=this;return"object"==typeof e?(o._sprite=e,o):o._sprite},pos:function(e,n){var t=this;if(!t._loaded)return t.on("load",function(){t.pos(e)}),"number"==typeof e?t:t._pos||0;e=parseFloat(e);var r=n?t._nodeById(n):t._activeNode();if(r)return e>=0?(t.pause(n),r._pos=e,t.play(r._sprite,n),t):t._webAudio?r._pos+(o.currentTime-t._playStart):r.currentTime;if(e>=0)return t;for(var a=0;a<t._audioNode.length;a++)if(t._audioNode[a].paused&&4===t._audioNode[a].readyState)return t._webAudio?t._audioNode[a]._pos:t._audioNode[a].currentTime},pos3d:function(e,o,n,t){var r=this;if(o="undefined"!=typeof o&&o?o:0,n="undefined"!=typeof n&&n?n:-.5,!r._loaded)return r.on("play",function(){r.pos3d(e,o,n,t)}),r;if(!(e>=0||0>e))return r._pos3d;if(r._webAudio){var a=t?r._nodeById(t):r._activeNode();a&&(r._pos3d=[e,o,n],a.panner.setPosition(e,o,n),a.panner.panningModel=r._model||"HRTF")}return r},fade:function(e,o,n,t,r){var a=this,i=Math.abs(e-o),u=e>o?"down":"up",d=i/.01,l=n/d;if(!a._loaded)return a.on("load",function(){a.fade(e,o,n,t,r)}),a;a.volume(e,r);for(var f=1;d>=f;f++)!function(){var e=a._volume+("up"===u?.01:-.01)*f,n=Math.round(1e3*e)/1e3,i=o;setTimeout(function(){a.volume(n,r),n===i&&t&&t()},l*f)}()},fadeIn:function(e,o,n){return this.volume(0).play().fade(0,e,o,n)},fadeOut:function(e,o,n,t){var r=this;return r.fade(r._volume,e,o,function(){n&&n(),r.pause(t),r.on("end")},t)},_nodeById:function(e){for(var o=this,n=o._audioNode[0],t=0;t<o._audioNode.length;t++)if(o._audioNode[t].id===e){n=o._audioNode[t];break}return n},_activeNode:function(){for(var e=this,o=null,n=0;n<e._audioNode.length;n++)if(!e._audioNode[n].paused){o=e._audioNode[n];break}return e._drainPool(),o},_inactiveNode:function(e){for(var o=this,n=null,t=0;t<o._audioNode.length;t++)if(o._audioNode[t].paused&&4===o._audioNode[t].readyState){e(o._audioNode[t]),n=!0;break}if(o._drainPool(),!n){var r;if(o._webAudio)r=o._setupAudioNode(),e(r);else{o.load(),r=o._audioNode[o._audioNode.length-1];var a=navigator.isCocoonJS?"canplaythrough":"loadedmetadata",i=function(){r.removeEventListener(a,i,!1),e(r)};r.addEventListener(a,i,!1)}}},_drainPool:function(){var e,o=this,n=0;for(e=0;e<o._audioNode.length;e++)o._audioNode[e].paused&&n++;for(e=o._audioNode.length-1;e>=0&&!(5>=n);e--)o._audioNode[e].paused&&(o._webAudio&&o._audioNode[e].disconnect(0),n--,o._audioNode.splice(e,1))},_clearEndTimer:function(e){for(var o=this,n=0,t=0;t<o._onendTimer.length;t++)if(o._onendTimer[t].id===e){n=t;break}var r=o._onendTimer[n];r&&(clearTimeout(r.timer),o._onendTimer.splice(n,1))},_setupAudioNode:function(){var e=this,n=e._audioNode,t=e._audioNode.length;return n[t]="undefined"==typeof o.createGain?o.createGainNode():o.createGain(),n[t].gain.value=e._volume,n[t].paused=!0,n[t]._pos=0,n[t].readyState=4,n[t].connect(a),n[t].panner=o.createPanner(),n[t].panner.panningModel=e._model||"equalpower",n[t].panner.setPosition(e._pos3d[0],e._pos3d[1],e._pos3d[2]),n[t].panner.connect(n[t]),n[t]},on:function(e,o){var n=this,t=n["_on"+e];if("function"==typeof o)t.push(o);else for(var r=0;r<t.length;r++)o?t[r].call(n,o):t[r].call(n);return n},off:function(e,o){var n=this,t=n["_on"+e],r=o?o.toString():null;if(r){for(var a=0;a<t.length;a++)if(r===t[a].toString()){t.splice(a,1);break}}else n["_on"+e]=[];return n},unload:function(){for(var o=this,n=o._audioNode,t=0;t<o._audioNode.length;t++)n[t].paused||(o.stop(n[t].id),o.on("end",n[t].id)),o._webAudio?n[t].disconnect(0):n[t].src="";for(t=0;t<o._onendTimer.length;t++)clearTimeout(o._onendTimer[t].timer);var r=l._howls.indexOf(o);null!==r&&r>=0&&l._howls.splice(r,1),delete e[o._src],o=null}},n)var _=function(o,n){if(n in e)return o._duration=e[n].duration,void c(o);if(/^data:[^;]+;base64,/.test(n)){for(var t=atob(n.split(",")[1]),r=new Uint8Array(t.length),a=0;a<t.length;++a)r[a]=t.charCodeAt(a);s(r.buffer,o,n)}else{var i=new XMLHttpRequest;i.open("GET",n,!0),i.responseType="arraybuffer",i.onload=function(){s(i.response,o,n)},i.onerror=function(){o._webAudio&&(o._buffer=!0,o._webAudio=!1,o._audioNode=[],delete o._gainNode,delete e[n],o.load())};try{i.send()}catch(u){i.onerror()}}},s=function(n,t,r){o.decodeAudioData(n,function(o){o&&(e[r]=o,c(t,o))},function(e){t.on("loaderror")})},c=function(e,o){e._duration=o?o.duration:e._duration,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play()},p=function(n,t,r){var a=n._nodeById(r);a.bufferSource=o.createBufferSource(),a.bufferSource.buffer=e[n._src],a.bufferSource.connect(a.panner),a.bufferSource.loop=t[0],t[0]&&(a.bufferSource.loopStart=t[1],a.bufferSource.loopEnd=t[1]+t[2]),a.bufferSource.playbackRate.value=n._rate};"function"==typeof define&&define.amd&&define(function(){return{Howler:l,Howl:f}}),"undefined"!=typeof exports&&(exports.Howler=l,exports.Howl=f),"undefined"!=typeof window&&(window.Howler=l,window.Howl=f)}();
