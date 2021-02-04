define(['messenger'], function(Messenger) {
IVY = (function () {
	var framepool;
	var poolFrames = 4;
	var storageName;
	var initialized = false;
	var inApp;
	function init(_storageName, _inApp) {
		console.log("IVY.JS initializing... inAPP "+_inApp);
		if (!initialized) {
			storageName = _storageName;
			inApp = _inApp;
			if (inApp) {
				createFramePool();
				Messenger.iframes = framepool;
	    		Messenger.namespace = "IVY";
	    		
			}
			initialized = true;
		}
	}
	function createFramePool() {
		framepool = [];
		// framepoolIndex = 0;
		for (var i=0; i<poolFrames; i++) {
			var iframe = document.createElement('iframe');
			iframe.style.width = 1+"px";
    		iframe.style.height = 1+"px";
    		iframe.style.display = "none";
    		iframe.style.visibility = "hidden";
    		document.body.appendChild(iframe);
    		framepool.push(iframe);
    	}	

	}
	function callBridge(action, parameterString) {
	    Messenger.bridge.trigger(action,JSON.parse("{"+parameterString+"}"));
	}
	function doneAndFail(doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent) {
		doneFunctionName = doneFunctionName || "";
	    doneFunctionEvent = doneFunctionEvent || "";
	    failFunctionName = failFunctionName || "";
	    failFunctionEvent = failFunctionEvent || "";
	    return "\"doneEvent\":{\"function\":\""+doneFunctionName+"\",\"event\":\""+doneFunctionEvent+"\"}, \"failEvent\":{\"function\":\""+failFunctionName+"\",\"event\":\""+failFunctionEvent+"\"}";
	}
	function eventEscaped(ev) {
		return "event://"+escape(ev);
	}
	function Put(key, value, doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent) {
	    if (inApp) {
		    // console.log("put native... "+storageName+" "+key+" "+value);
	    	if (typeof value === 'string') {
    			value = "\""+value+"\"";
			}
			callBridge("storagePut", "\"storage\":\""+storageName+"\", \"key\":\""+key+"\", \"value\": "+value+", "+doneAndFail(doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent));
		} else {
			// console.log("put localStorage... "+key+storageName+" "+value.toString());
			localStorage.setItem(key+storageName,value.toString());
			localStorageDoneFunction(doneFunctionName, doneFunctionEvent, {});
		} 
	}
	function Get(key, doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent) {
		if (inApp) {
			callBridge("storageGet", "\"storage\":\""+storageName+"\", \"key\":\""+key+"\", "+doneAndFail(doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent));
		} else {
			if (localStorage.getItem(key+storageName)===null) {
				localStorageDoneFunction(failFunctionName,failFunctionEvent,{error: {code: 'TBD', description: 'Key does not exist'}});
			} else {
				localStorageDoneFunction(doneFunctionName,doneFunctionEvent,{value: localStorage.getItem(key+storageName)});
			}
		}
	}
	function Del(key, doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent) {
		if (inApp) {
			callBridge("storageDel", "\"storage\":\""+storageName+"\", \"key\":\""+key+"\", "+doneAndFail(doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent));
		} else {
			localStorage.removeItem(key+storageName);
			localStorageDoneFunction(doneFunctionName, doneFunctionEvent, {});
		}
	}
	function GetRefererInfo(doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent) {
		if (inApp) {
			callBridge("getRefererInfo", doneAndFail(doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent));
	    } else {
	    	localStorageDoneFunction(doneFunctionName, doneFunctionEvent, {referer: "dummy_referer", issueId: "dummy_issueId", issueDate: "1977-01-22", issueTitle: "Dummy Issue", articleId: "dummy_id"});
	    }
	}
	function GetDeviceInfo(doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent) {
		if (inApp) {
			callBridge("getDeviceInfo", doneAndFail(doneFunctionName, doneFunctionEvent, failFunctionName, failFunctionEvent));
		} else {
			localStorageDoneFunction(doneFunctionName, doneFunctionEvent, {appId: "dummy_appId", appVersion: "dummy_appVersion", deviceModel: "Commodore Vic20", deviceIdentifier: "dummy_deviceIdentifier", deviceOS: "Vic20 Basic", deviceOSVersion: "1.0",deviceType: "dummy_computer"});
	    }
	}
	function localStorageDoneFunction(doneFunctionName, doneFunctionEvent, valueObject) {
		var splt = doneFunctionName.split(".");
		if (splt.length===2) {
			window[splt[0]][splt[1]](doneFunctionEvent, valueObject);
		} else {
			window[doneFunctionName](doneFunctionEvent, valueObject);
		}
	}
	function isInApp() {
		return inApp;
	}
	return {
        init:init,
        Put: Put,
        Get: Get,
        Del: Del,
        GetRefererInfo: GetRefererInfo,
        GetDeviceInfo: GetDeviceInfo,
        callBridge: callBridge,
        isInApp: isInApp
    };
})();
return IVY;
});