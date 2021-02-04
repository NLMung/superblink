define(function()
{
	"use strict";

	// Native can trigger
	// messenger.event.trigger('eventName', {/* args */})

	// JS can listen
	// messenger.event.on('eventName', function(args) { })

	// JS can tell native
	// messenger.bridge.trigger('log', {/* args */})

	// JS can tell native
	// messenger.bridge.triggerWithCallbacks('getDeviceInfo', {/* args */}, function(args) {
	//    console.log(args);
	// }, function(error) {
	//    console.log(error);
	// });

	/*
	It is required that you set
	messenger.iframes = $('iframe').get();
	messenger.namespace = 'app.messenger';

	*/

	var messenger = {
		initialize: function () {
			this.listenersForCallbacks = {};
			this.iframes = [];
			this.frameIndex = 0;
			this.namespace = null;
			this.anonymousCallBackIndex = 0;
			this.anonymousCallBacks = {};
		},

		/*
		 Used for native-to-js communication
		*/
		event: {

			/*
			@return identifier which can be used for removing the callback
			*/
			on: function(eventName, callback) {
				if(typeof callback != 'function') {
					throw "You must register a function";
				}
				if(typeof(messenger.listenersForCallbacks[eventName]) == 'undefined') {
					messenger.listenersForCallbacks[eventName] = [];
				}

				messenger.listenersForCallbacks[eventName].push(callback);
				var identifier = callback;
				return identifier;
			},

			off: function(eventName, identifier) {
				var index = messenger.listenersForCallbacks[eventName].indexOf(identifier);
				messenger.listenersForCallbacks[eventName].splice(index, 1);
			},

			trigger: function(eventName, args) {
				if(typeof(messenger.listenersForCallbacks[eventName]) == 'undefined') {
					messenger.listenersForCallbacks[eventName] = [];
				}
				var callbacks = messenger.listenersForCallbacks[eventName];
				var count = callbacks.length;
				for(var i = 0; i < count; i++) {
					var callback = callbacks[i];
					callback(args);
				}
			}
		},

		/*
		 Used for js-to-native-communication
		*/
		bridge: {

			trigger: function(eventName, args) {
				// console.log([].slice.call(arguments));
				messenger.frameIndex = (messenger.frameIndex + 1) % messenger.iframes.length;
				var eventInfo = JSON.stringify([].slice.call(arguments));
				var iframe = messenger.iframes[messenger.frameIndex];
				if(typeof iframe == 'undefined') {
					throw "No iframes setup to use for communication";
				} else {
					iframe.src = 'event://' + escape(eventInfo);
				}
			},

			triggerWithCallback: function(eventName, args, onDone, onFail) {
				var anonymousCallback = this._createAnonymousCallbacks(onDone, onFail);
				args.doneEvent = anonymousCallback.doneEvent;
				args.failEvent = anonymousCallback.failEvent;
				messenger.bridge.trigger(eventName, args);
			},

			/*
			Automatically removed once either 'onDone' or 'onFail' is called
			*/
			_createAnonymousCallbacks: function(onDone, onFail) {

				if(!messenger.namespace) {
					throw "No namespace is configured";
				}

				var index = messenger.anonymousCallBackIndex++;
				var entryIdentifier = "anonymous_" + index;
				var functionName = messenger.namespace + ".anonymousCallBacks." + entryIdentifier;

				messenger.anonymousCallBacks[entryIdentifier] = function(eventName, args) {
					delete messenger.anonymousCallBacks[entryIdentifier];
					if(eventName == "done") {
						onDone(args);
					}
					else {
						onFail(args);
					}
				};

				return {
					doneEvent: {
						"function": functionName,
						"event": "done"
					},
					failEvent: {
						"function": functionName,
						"event": "fail"
					}
				};
			}
		}
	};

	messenger.initialize();
	return messenger;
});
