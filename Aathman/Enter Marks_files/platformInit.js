function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}();define("platformInit/utils/appsUtils",["lodash","experiment"],function(e,t){"use strict";function r(t,r,i){if(t){var n=function(t,r){return e(r).map(function(e){return t.getDynamicPageData(e)}).find()}(t,i);if(n){var o=n.routerData,s=n.routerDefinition;if(o&&s){if("wix-code"===s.appDefinitionId)e.forEach(i,function(t){e.forEach(r,function(e){e.id===t&&(e.routerData=o)})});else{var a=e.find(r,{id:s.appDefinitionId});a&&(a.routerData=o)}}}}}function i(t){return e(t).reject({displayName:"siteextension"}).map(function(t){return e.assign({type:l.APPLICATION},t)}).value()}function n(t){return!!e.get(t,["wixCodeModel","appData","codeAppId"])}function o(t,o,s){t=e.without(t,"masterPage");var a=i(s);return function(t,r,i,o,s){if(n(o.rendererModel)&&e.find(t,r)){var a=o.isPlatformAppOnPage("masterPage","wixCode");e.forEach(i,function(t){var r=o.isPlatformAppOnPage(t,"wixCode"),i=o.getDataByQuery(t),n=e.get(i,"isPopup");r&&s.push({id:t,type:n?l.POPUP:l.PAGE,displayName:o.getPageTitle(t)}),!n&&a&&s.push({id:t,type:l.MASTER_PAGE})})}}(s,{displayName:"siteextension"},t,o,a),r(o,a,t),a}function s(){for(var e=arguments[0],t=1;t<arguments.length;++t)e=e.replace(/\/$/,"")+"/"+arguments[t].replace(/^\//,"");return e}function a(t,r,i,o,a){n(a)&&e.find(t,{type:"siteextension"})&&!e.find(r,{id:"dataBinding"})&&r.push({type:l.APPLICATION,id:"dataBinding",url:s(function(e,t,r){var i=s(e.scriptsDomainUrl,"services",t);return r?s(i,r):e.scriptsLocationMap[t]}(i,"dbsm-viewer-app",o.dataBinding),"/app.js"),displayName:"Data Binding"})}function u(r){var i=function(r,i){return e(r).filter(function(r){return!(r.appDefinitionId===d&&!t.isOpen("sv_ecomViewerScriptUrl"))&&(n(i)&&"siteextension"===r.type||e.has(r,"appFields.platform.viewerScriptUrl"))}).map(function(t){var r={id:t.appDefinitionId,displayName:t.type,appInnerId:t.applicationId,instance:t.instance},i=e.get(t,"appFields.platform.viewerScriptUrl");return i&&(r.url=i),r}).value()}(r.clientSpecMap,r.rendererModel),o=function(t){return e(t||"").split(",").invokeMap("split",/:(.+)/).fromPairs().value()}(r.viewerPlatformAppSources);return function(t,r,i){if(e.get(t,"port")&&e.get(t,"path")&&e.get(t,"id")){i=e.endsWith(i,"/")?i.slice(0,-1):i;var n=e.template("<%= santaBase %><%= port %>/<%= path %>"),o=void 0;o=/^(http(s)?:)?\/\//.test(t.path)?t.path:n("80"===t.port?{santaBase:i,port:"",path:t.path}:{santaBase:i,port:":"+t.port,path:t.path}),r.push({type:l.APPLICATION,id:t.id,url:o,displayName:t.id})}}(o,i,r.santaBase),a(r.clientSpecMap,i,r.serviceTopology,o,r.rendererModel),i}function c(t,r,i){return o(r,i,u({clientSpecMap:t,viewerPlatformAppSources:e.get(i,["currentUrl","query","viewerPlatformAppSources"]),serviceTopology:i.serviceTopology,santaBase:i.santaBase,rendererModel:i.rendererModel}))}var d="1380b703-ce81-ff05-f115-39571d94dfcd",l={POPUP:"Popup",PAGE:"Page",MASTER_PAGE:"masterPage",APPLICATION:"Application"};return{getApplications:c,getUserCodeDefinitions:function(t,r,i){return e.reject(c(t,r,i),{type:l.APPLICATION})},getAppsBaseInfo:function(t){var r=u(t);return e.filter(i(r),"url")}}}),define("platformInit/utils/widgetsPreLoader",["platformInit/utils/appsUtils"],function(e){"use strict";function t(e,t,u,c){if(i())return a.push([e,t,u,c]),void requirejs(["utils","widgets","wixCode"],r);var d=c(n);d.currentUrl=n.urlUtils.parseUrl(e);var l=n.wixUrlParser.parseUrl(d,e),p=l&&l.pageId;if(p){var f=t(o,d,p),g=s.wixCodeWidgetService.getWixCodeSpec(d.getClientSpecMap());u(s.messageBuilder.getExtendedMessage(f,d.rendererModel.wixCodeModel||{},g,d))}}function r(e,r,u){i()&&(n=e,o=r,s=u,a.forEach(function(e){return t.apply(void 0,_toConsumableArray(e))}),a.length=0)}function i(){return!n||!o||!s}var n=null,o=null,s=null,a=[];return{asyncGetPreLoadMessage:function(r,i,n){t(i,function(t,i,n){var o=e.getApplications(r.rendererModel.clientSpecMap,[n],i),s=r.routers||{configMap:{}},a=t.globalsBuilder.build(i,!0);return t.messageBuilder.loadWidgetsMessage(o,s.configMap,[n],void 0,_defineProperty({},n,a.toJson()))},n,function(e){return new e.FullSiteData(r,function(){})})},asyncGetPreLoadUserCodeMessage:function(r,i,n){t(i,function(t,i,n){var o=e.getUserCodeDefinitions(r.rendererModel.clientSpecMap,[n],i);return t.messageBuilder.loadUserCodesMessage(o,[n])},n,function(e){return new e.FullSiteData(r,function(){})})},asyncGetPreInitMessage:function(e,r,i){t(r,function(e,t,r){var i={};return i[r]=e.widgetService.getContextInitData(t,r),e.messageBuilder.initWidgetsMessage(i)},i,function(){return e})},registerDeps:r}}),define("platformInit/utils/constants",[],function(){"use strict";return{APPS:{SANTA_MEMBERS:{appDefId:"14cc59bc-f0b7-15b8-e1c7-89ce41d0e0c9"},FORM_BUILDER:{appDefId:"14ce1214-b278-a7e4-1373-00cebd1bef7c"}},ES6_RUNTIME_PATH:"/es6runtime.min.js",WIX_CODE_RUNTIME_PATH:"/all.min.js",DATA_BINDING:"dataBinding",REMOTE_DOM_URL:"//unpkg.parastorage.com/@shimil/remote-dom@3.0.3/dist/remote.min.js",SEMI_NATIVE_SDK_URL:"http://static.parastorage.com/services/semi-native-sdk/1.3.0/lib/wix.min.js",PM_RPC_INTENTS:{INVOKE:"invoke",RPC_RESOLVE:"rpc-resolve",RPC_REJECT:"rpc-reject",API_DESCRIPTION:"api-desc",INVOKE_FUNCTION:"invoke-func",RESOLVE:"resolve",REJECT:"reject",REQUEST_API:"request-api"}}}),define("platformInit/utils/cookieUtils",[],function(){"use strict";return{getCookie:function(e){if("undefined"!=typeof document)return function(e){for(var t={},r=window.document.cookie.split(/;\s*/),i=0,n=r.length;i<n;i++){var o=r[i].split("=");t[o[0]]=o[1]}return t}()[e]}}}),define("platformInit/utils/wixCodeUrlUtils",["lodash","experiment","platformInit/utils/cookieUtils"],function(e,t,r){"use strict";function i(e){var t=e.appConfig.userScript;return{id:e.id,url:t.url,scriptName:t.scriptName,displayName:t.displayName,routerData:e.routerData}}function n(i,n,o,s){var a=function(t){return e(t).map("appConfig").find()}(o);if(a){return{baseUrl:function(r,i){if(r.publicModel)return(t.isOpen("wixCodePublicDispatcherSendFreeSiteName")?e.trimEnd(r.publicModel.externalBaseUrl,"/"):"")+"/_api/wix-code-public-dispatcher/siteview";return"//"+e.find(i,{type:"siteextension"}).instanceId+".dev."+r.serviceTopology.wixCloudBaseDomain}(i,n),queryParameters:function(t){return e.reduce(t,function(t,r,i){return e.isUndefined(r)?t:t.concat([i+"="+r])},[]).join("&")}({scari:a.scari,instance:a.instance,viewMode:s}),options:{headers:{"X-XSRF-TOKEN":r.getCookie("XSRF-TOKEN")}}}}}return{getUserCodeUrlsDetails:function(t,r){var n=[],o=e.find(t,function(e){return e.id===r&&"masterPage"!==e.type}),s=e.find(t,{id:r,type:"masterPage"});return s&&n.push(i(s)),o&&n.push(i(o)),n},getElementoryArguments:n}}),define("platformInit/utils/urlBuilder",["lodash"],function(e){"use strict";function t(e){return e&&e.replace(/^https?\:/,"")}function r(r,i){var n=t(r);if(e.startsWith(n,i)){var o=n.slice(i.length).match(/\/?services\/santa\/([\w.]+)/);return o&&o[1]}}return{buildUrl:function(e,i){var n=i.runtimeSource,o=e.serviceTopology;return"/_partials/santa/"+function(e,i,n,o){if(e)return e;var s=t(o);return r(i,s)||r(n,s)}(n,e.santaBase,o.scriptsLocationMap.santa,o.scriptsDomainUrl)+"/node_modules/santa-wix-code/dist/wixcode-worker.js"}}}),define("platformInit/utils/FallbackStorage",[],function(){"use strict";return function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"setItem",value:function(e,t){this[e]=String(t)}},{key:"getItem",value:function(e){return this[e]||null}},{key:"removeItem",value:function(e){delete this[e]}},{key:"clear",value:function(){var e=this;Object.keys(this).forEach(function(t){return e.removeItem(t)})}},{key:"toJSON",value:function(){return this.storage.toJSON()}}]),e}()}),define("platformInit/utils/storageFacade",["lodash","platformInit/utils/FallbackStorage"],function(e,t){"use strict";function r(t){return e(t).pickBy(function(t,r){return e.startsWith(r,i)}).reduce(function(t,r,n){return e.assign(t,_defineProperty({},n.replace(i,""),r))},{})}var i="platform_app_";return{get:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0]?window:{localStorage:new t,sessionStorage:new t};return{serialize:function(){return JSON.stringify({local:r(e.localStorage),session:r(e.sessionStorage)})},setItem:function(t,r,n){e[t].setItem(i+r,n)}}}}}),define("platformInit/utils/messageBuilder",[],function(){"use strict";return{bootstrapMessage:function(e,t){return{type:"wix_code_worker_bootstrap",bootstrapArguments:e,fetchScriptsCount:t}},loadUserCodeMessage:function(e,t){return{type:"wix_code_worker_load_user_code",workerId:e,wixCode:t}},loadMessage:function(e,t,r,i,n,o,s,a,u){return{type:"wix_code_worker_load",workerId:e,elementoryArguments:t,wixCode:r,applications:i,sdkParameters:n,routersMap:o,lightboxContext:s,storage:a,rgi:u}},initMessage:function(e,t){return{type:"wix_code_worker_init",id:e,apps:t}},startMessage:function(e,t,r){return{type:"wix_code_worker_start",context:e,id:t,siteInfo:r}},storageWasUpdatedMessage:function(e){return{type:"storageWasUpdated",storageValue:e}},updateWixCodeModelDataAfterLoginMessage:function(e,t){return{type:"update_wix_code_model_data_after_login",workerId:e,elementoryArguments:t}},scriptImportMessage:function(e,t){return{type:"script_import_message",url:e,script:t}},stopMessage:function(e){return{contextId:e,type:"stop"}},isStopMessage:function(e){return"stop"===e.type}}}),define("platformInit/api/workerManager",["lodash","platformInit/utils/constants","platformInit/utils/wixCodeUrlUtils","platformInit/utils/urlBuilder","platformInit/utils/storageFacade","platformInit/utils/messageBuilder"],function(e,t,r,i,n,o){"use strict";function s(e){return e.publicModel?"site":"preview"}function a(t,r,i){var n=0;return"undefined"!=typeof window&&(i=i&&window.fetch&&!function(e){return e.navigator&&/Edge|Trident/.test(e.navigator.userAgent)}(window),e.forEach(t,function(t){if(i&&e.includes(t.url,"parastorage"))++n,window.fetch(t.url).then(function(e){return e.arrayBuffer()}).then(function(e){r.postMessage(o.scriptImportMessage(t.url,e),[e])});else{var s="prefetch-"+t.id;if(!window.document.getElementById(s)){var a=window.document.createElement("link");a.setAttribute("rel","prefetch"),a.setAttribute("href",t.url),a.setAttribute("id",s),window.document.head.appendChild(a)}}})),n}function u(e){if(!this._standbyWorker){var r=new Worker(i.buildUrl(this._siteModel,this._options));r.onmessage=this.onmessage,this._standbyWorker=r,function(e){var r=this._options.applications,i=this._siteModel.serviceTopology.scriptsLocationMap["wix-code-platform"],n={id:"es6runtime",url:i+t.ES6_RUNTIME_PATH},u={id:"wixCodeRuntime",url:i+t.WIX_CODE_RUNTIME_PATH},c=this._options.sdkSource,d=this._options.semiNativeSDKSource,l={id:"sdk",url:c},p={id:"semi-native-sdk",url:d},f=this._options.ReactLibSource,g=this._options.ReactDomSource,m=[n,u],h=a(function(e,r,i){var n=[e];return r.some(function(e){return e.id===t.DATA_BINDING})&&(n=n.concat(i)),n.concat(r)}(l,r,m),this._standbyWorker,e);this._standbyWorker.postMessage(o.bootstrapMessage({sdkParameters:function(){var e="undefined"!=typeof window&&!window.clientSideRender,t="undefined"==typeof window||window.isPseudoWindow;return{viewMode:s(this._siteModel),locale:this._siteModel.rendererModel.languageCode,storage:this._storageManager.serialize(),userWarmup:this._siteModel.userWarmup,renderCycle:e&&!t?2:1,renderingEnv:t?"backend":"browser"}}.call(this),debug:window.__WIX_CODE_DEBUG__,sdkSource:l.url,semiNativeSDKSource:p.url,reactDomSource:g,reactSource:f,applications:encodeURIComponent(JSON.stringify(r)),wixCodeScripts:m,initialTimestamp:this._siteModel.wixBiSession.initialTimestamp},h))}.call(this,!!e)}}function c(e){this._workers[e]=this._standbyWorker,this._reportWorkerCreated(e),this._standbyWorker=null}function d(t,i){return t.reduce(function(t,n){return e.assign(t,_defineProperty({},n,r.getUserCodeUrlsDetails(i,n)))},{})}function l(t){var r=this;return function(i){var n=i.data;e.isMatch(n,{intent:"BROWSER_API",type:"setToStorage"})&&function(t){var r=this,i=t.type,n=t.key,s=t.value;this._storageManager.setItem(i,n,s);var a=o.storageWasUpdatedMessage(this._storageManager.serialize());e.forEach(this._workers,function(e,t){r.send(t,a)})}.call(r,n.data),t(i)}}var p=function(){function i(e,t,r,n){_classCallCheck(this,i),this._siteModel=e,this._clientSpecMap=t,this._options=n,this._workers={},this._terminatedWorkers={},this._standbyWorker=null,this._storageManager=r}return _createClass(i,[{key:"has",value:function(e){return Boolean(this._workers[e])}},{key:"initialize",value:function(r,i,n,o){this.onmessage=function(r){return function(i){var n=i.data,o=i.ports;e.includes(t.PM_RPC_INTENTS,n.intent)&&window.postMessage(n,"*",o),r(i)}}.call(this,l.call(this,function(e){var t=e.data;return r(t)})),this._reportWorkerCreated=i,this._reportWorkerTerminated=n,u.call(this,o)}},{key:"send",value:function(e,t,r){var i=o.isStopMessage(t)?this._terminatedWorkers[e]:this._workers[e];i&&(r?i.postMessage(t,r):i.postMessage(t))}},{key:"get",value:function(e){return this._workers[e]}},{key:"handleWidgetsCommand",value:function(t){var i=this;switch(t.type){case"load_user_code":(function(e){var t=this;Object.keys(e).forEach(function(r){var i=e[r];a(i),t.has(r)||(u.call(t),c.call(t,r)),t.send(r,o.loadUserCodeMessage(r,i))})}).call(this,d(t.rootIds,t.widgets));break;case"load_widgets":(function(e){var t=this,r=e.applications,i=e.rootIds,n=e.wixCodeScriptsByRootId,s=e.elementoryArguments,a=e.popupContexts,d=e.routersMap,l=e.sdkParameters,p=e.rgisByRootId;i.forEach(function(e){t.has(e)||(u.call(t),c.call(t,e)),t.send(e,o.loadMessage(e,s,n[e],r,l,d,a[e],t._storageManager.serialize(),p[e]))})}).call(this,{applications:e.reject(t.widgets,e.overSome({type:"Page"},{type:"Popup"},{type:"masterPage"})),rootIds:t.rootIds,wixCodeScriptsByRootId:d(t.rootIds,t.widgets),elementoryArguments:r.getElementoryArguments(this._siteModel,this._clientSpecMap,t.widgets,s(this._siteModel)),popupContexts:t.popupContexts,routersMap:t.routersMap,sdkParameters:t.sdkParameters,rgisByRootId:t.rgisByRootId});break;case"init_widgets":e.forEach(t.contexts,function(e,t){if(!i.has(t))throw new Error("Context id "+t+" is not loaded");i.send(t,o.initMessage(t,e))});break;case"start_widgets":if(!t.contexts)throw new Error("Start message must contain contexts property");e.forEach(t.contexts,function(e,r){if(!i.has(r))throw new Error("Context id "+r+" is not loaded");i.send(r,o.startMessage(e,r,t.siteInfo))});break;case"trigger_onRender":u.call(this),this.send(t.contextId,t);break;case"stop_widgets":e.forEach(t.widgetIds,function(t){(function(t){var r=this,i=this._workers[t];return!!i&&(delete this._workers[t],this._terminatedWorkers[t]=i,e.defer(function(){r.send(t,o.stopMessage(t)),delete r._terminatedWorkers[t]}),!0)}).call(i,t)&&i._reportWorkerTerminated(t)});break;case"update_wix_code_model_data_after_login":e.forEach(t.rootIds,function(e){i.send(e,o.updateWixCodeModelDataAfterLoginMessage(e,r.getElementoryArguments(i._siteModel,i._clientSpecMap,t.widgets,s(i._siteModel))))});break;default:this.has(t.contextId)&&this.send(t.contextId,t)}}},{key:"terminateStandbyWorker",value:function(){this._standbyWorker&&(this._standbyWorker.terminate(),this._standbyWorker=null)}}]),i}();return{getWorkerManager:function(e,t,r,i){return new p(e,t,n.get(r),i)}}}),define("platformInit/utils/messageProxy",[],function(){"use strict";return{get:function(){var e=[],t=null;return{sendOrHoldMessage:function(r){t?t(r):e.push(r)},setMessageHandler:function(r){for(t=r;e.length>0;)t(e.shift())}}}}}),define("platformInit/utils/biUtils",["lodash"],function(e){"use strict";return{reportBiWithWixBiSession:function(e){var t=e.reportDef,r=e.params;t.errorCode?window.wixBiSession.sendError(t,r.p1,r.p2,r.p3,r.p4):window.wixBiSession.sendBI(t.endpoint,t.eventId,t.src,r)},shouldUseFallbackReportBI:function(t,r){return"WIX_CODE_SITE_API"===t.intent&&"reportBI"===t.type&&e.isEmpty(r)&&"undefined"!=typeof window}}}),define("platformInit/bi/events.json",[],function(){return{WORKER_CREATED:{endpoint:"platform-viewer",src:79,eventId:101,params:{worker_id:"worker_id",ts:"ts"}},WORKER_TERMINATED:{endpoint:"platform-viewer",src:79,eventId:102,params:{worker_id:"worker_id",ts:"ts"}}}}),define("platformInit/api/wixCodeAppApi",["lodash","platformInit/utils/widgetsPreLoader","platformInit/api/workerManager","platformInit/utils/messageProxy","platformInit/utils/biUtils","platformInit/bi/events.json"],function(e,t,r,i,n,o){"use strict";function s(t){var r=t.rendererModel.clientSpecMap.toJS?t.rendererModel.clientSpecMap.toJS():t.rendererModel.clientSpecMap;return t.rendererModel.wixCodeModel&&e.some(r,{type:"siteextension"})}function a(){function a(e){n.shouldUseFallbackReportBI(e,l)&&n.reportBiWithWixBiSession(e),l.forEach(function(t){t(e)})}function u(e,t,i,u){if(f)console.warn("Wix code is already initiated");else{_=i.applications.length>0,(s(e)||_)&&((w=r.getWorkerManager(e,t,function(){try{return window.localStorage.setItem("",""),window.localStorage.removeItem(""),!0}catch(e){return!1}}(),i)).initialize(a,function(t){return n.reportBiWithWixBiSession({reportDef:o.WORKER_CREATED,params:{worker_id:t,ts:Date.now()-e.wixBiSession.initialTimestamp}})},function(t){return n.reportBiWithWixBiSession({reportDef:o.WORKER_TERMINATED,params:{worker_id:t,ts:Date.now()-e.wixBiSession.initialTimestamp}})},u),d.setMessageHandler(function(e){return w.handleWidgetsCommand(e)}),f=!0)}}function c(e){e&&d.sendOrHoldMessage(function(e){return p.reduce(function(e,t){return t(e)},e)}(e))}var d=i.get(),l=[],p=[],f=!1,g=!1,m=!1,h=!1,w=void 0,_=void 0;return{init:u,sendMessage:c,registerMessageHandler:function(e){l.push(e)},registerMessageModifier:function(e){p.push(e)},unregisterMessageHandler:function(t){e.pull(l,t)},preLoadWidgets:function(e,r){!g&&s(e)&&t.asyncGetPreLoadMessage(e,r,function(e){g||(g=!0,d.sendOrHoldMessage(e))})},preLoadUserCode:function(e,r){(!m&&s(e)||_)&&t.asyncGetPreLoadUserCodeMessage(e,r,function(e){m||(m=!0,d.sendOrHoldMessage(e))})},preInitWidgets:function(e,r){!h&&s(e)&&t.asyncGetPreInitMessage(e,r,function(e){h||(h=!0,d.sendOrHoldMessage(e))})},isAppInitiated:function(){return f},getWorkerById:function(e){return w&&w.get(e)},destroyAppsContainer:function(){w&&(w.terminateStandbyWorker(),f=!1,d=i.get())}}}return{getApi:a}}),define("platformInit/api/initMainR",["lodash","platformInit/utils/appsUtils"],function(e,t){"use strict";function r(r){function o(t){if(s.init(a,t,_,p),function(t){return e.some(t,{type:"siteextension"})||_.applications.length}(t)){s.preLoadUserCode(a,d);!!a.publicModel&&s.preLoadWidgets(a,d)}}var s=r.appApi,a=r.siteModel,u=r.isMobileView,c=r.queryUtil,d=r.currentUrl,l=r.isBot,p=r.fetchScripts;d=d||window.document.location.href;var f=e.trimEnd(a.serviceTopology.scriptsLocationMap["js-wixcode-sdk"],"/")+"/lib/"+(c.getParameterByName("debug")?"wix.js":"wix.min.js"),g=e.trimEnd(a.serviceTopology.scriptsLocationMap["semi-native-sdk"],"/")+"/lib/wix.min.js",m=function(e){return"false"!==e&&("true"===e||!window.Worker||l)}(c.getParameterByName("useWixCodeFallback")),h=i+(c.getParameterByName("debug")?".development.js":".production.min.js"),w=n+(c.getParameterByName("debug")?".development.js":".production.min.js"),_={isMobileView:u,sdkSource:f,semiNativeSDKSource:g,runtimeSource:c.getParameterByName("WixCodeRuntimeSource"),ReactLibSource:h,ReactDomSource:w,useWixCodeFallback:m},M=c.getParameterByName("viewerPlatformAppSources");_.applications=t.getAppsBaseInfo({rendererModel:a.rendererModel,clientSpecMap:a.rendererModel.clientSpecMap,serviceTopology:a.serviceTopology,viewerPlatformAppSources:M,santaBase:a.santaBase}),o(a.rendererModel.clientSpecMap)}var i="//unpkg.parastorage.com/react@16.0.0/umd/react",n="//unpkg.parastorage.com/react-dom@16.0.0/umd/react-dom";return r}),define("platformInit/utils/specMapUtils",["lodash"],function(e){"use strict";return{getAppSpec:function(t,r){return e.find(t,{appDefinitionId:r})||e.find(t,{type:"siteextension"})}}}),define("platformInit",["platformInit/api/wixCodeAppApi","platformInit/api/initMainR","platformInit/utils/specMapUtils","platformInit/utils/appsUtils","platformInit/utils/widgetsPreLoader","platformInit/utils/messageProxy","platformInit/utils/biUtils"],function(e,t,r,i,n,o,s){"use strict";return{getAppApi:e.getApi,initMainR:t,specMapUtils:r,appsUtils:i,biUtils:s,widgetsPreLoader:n,registerDeps:n.registerDeps,messageProxy:o}});
//# sourceMappingURL=platformInit.min.js.map