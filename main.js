!function t(e,i,n){function r(a,s){if(!i[a]){if(!e[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var d=i[a]={exports:{}};e[a][0].call(d.exports,function(t){var i=e[a][1][t];return r(i?i:t)},d,d.exports,t,e,i,n)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)r(n[a]);return r}({1:[function(t){"use strict";var e=function(t){return t&&t.__esModule?t["default"]:t};t("autotrack/lib/plugins/media-query-tracker"),t("autotrack/lib/plugins/outbound-link-tracker"),t("autotrack/lib/plugins/session-duration-tracker"),t("autotrack/lib/plugins/social-tracker");var i=e(t("./supports"));if(!i.flexbox()){var n=document.createElement("div");n.className="Error",n.innerHTML="Your browser does not support Flexbox.\n                   Parts of this site may not appear as expected.",document.body.insertBefore(n,document.body.firstChild)}},{"./supports":2,"autotrack/lib/plugins/media-query-tracker":3,"autotrack/lib/plugins/outbound-link-tracker":4,"autotrack/lib/plugins/session-duration-tracker":5,"autotrack/lib/plugins/social-tracker":6}],2:[function(t,e){"use strict";var i={},n=document.body.style;e.exports={flexbox:function(){return i.flexbox||(i.flexbox="flexBasis"in n||"msFlexAlign"in n||"webkitBoxDirection"in n)}}},{}],3:[function(t){function e(t,i){window.gaplugins=window.gaplugins||{},gaplugins.MediaQueryTracker=e,window.matchMedia&&(this.opts=r(i,{mediaQueryDefinitions:!1,mediaQueryChangeTemplate:this.changeTemplate,mediaQueryChangeTimeout:1e3}),o(this.opts.mediaQueryDefinitions)&&(this.opts.mediaQueryDefinitions=a(this.opts.mediaQueryDefinitions),this.tracker=t,this.timeouts={},this.processMediaQueries()))}function i(t){return u[t]?u[t]:(u[t]=window.matchMedia(t),u[t])}var n=t("debounce"),r=t("../utilities").defaults,o=t("../utilities").isObject,a=t("../utilities").toArray,s=t("../provide"),c="(not set)",u={};e.prototype.processMediaQueries=function(){this.opts.mediaQueryDefinitions.forEach(function(t){if(!t.dimensionIndex)throw new Error("Media query definitions must have a name.");if(!t.dimensionIndex)throw new Error("Media query definitions must have a dimension index.");var e=this.getMatchName(t);this.tracker.set("dimension"+t.dimensionIndex,e),this.addChangeListeners(t)}.bind(this))},e.prototype.getMatchName=function(t){var e;return t.items.forEach(function(t){i(t.media).matches&&(e=t)}),e?e.name:c},e.prototype.addChangeListeners=function(t){t.items.forEach(function(e){var r=i(e.media);r.addListener(n(function(){this.handleChanges(t)}.bind(this),this.opts.mediaQueryChangeTimeout))}.bind(this))},e.prototype.handleChanges=function(t){var e=this.getMatchName(t),i=this.tracker.get("dimension"+t.dimensionIndex);e!==i&&(this.tracker.set("dimension"+t.dimensionIndex,e),this.tracker.send("event",t.name,"change",this.opts.mediaQueryChangeTemplate(i,e)))},e.prototype.changeTemplate=function(t,e){return t+" => "+e},s("mediaQueryTracker",e)},{"../provide":7,"../utilities":8,debounce:11}],4:[function(t){function e(t,r){window.gaplugins=window.gaplugins||{},gaplugins.OutboundLinkTracker=e,window.addEventListener&&(this.opts=i(r),this.tracker=t,this.tracker.set("transport","beacon"),n(document,"a","click",this.handleLinkClicks.bind(this)))}var i=t("../utilities").defaults,n=t("delegate"),r=t("../provide");e.prototype.handleLinkClicks=function(t){var e=t.delegateTarget;e.hostname!=location.hostname&&(navigator.sendBeacon||(e.target="_blank"),this.tracker.send("event","Outbound Link","click",e.href))},r("outboundLinkTracker",e)},{"../provide":7,"../utilities":8,delegate:12}],5:[function(t){function e(t,n){window.gaplugins=window.gaplugins||{},gaplugins.SessionDurationTracker=e,window.addEventListener&&(this.opts=i(n),this.tracker=t,this.tracker.set("transport","beacon"),window.addEventListener("unload",this.handleWindowUnload.bind(this)))}var i=t("../utilities").defaults,n=t("../provide"),r=window.XMLHttpRequest&&!Function("/*@cc_on return document.documentMode<=9@*/")();e.prototype.handleWindowUnload=function(){var t={nonInteraction:!0};window.performance&&performance.timing&&(t.eventValue=+new Date-performance.timing.navigationStart),!navigator.sendBeacon&&r&&(t.sendHitTask=this.sendSyncHit),this.tracker.send("event","Window","unload",t)},e.prototype.sendSyncHit=function(t){var e=new XMLHttpRequest;e.open("POST","https://www.google-analytics.com/collect",!1),e.setRequestHeader("Content-Type","text/plain;charset=UTF-8"),e.send(t.get("hitPayload"))},n("sessionDurationTracker",e)},{"../provide":7,"../utilities":8}],6:[function(t){function e(t,r){if(window.gaplugins=window.gaplugins||{},gaplugins.SocialTracker=e,window.addEventListener){this.opts=i(r,{attributePrefix:"data-"}),this.tracker=t;var o=this.opts.attributePrefix,a="["+o+"social-network]["+o+"social-action]["+o+"social-target]";n(document,a,"click",this.handleSocialClicks.bind(this)),this.detectLibraryLoad("FB","facebook-jssdk",this.addFacebookEventHandlers.bind(this)),this.detectLibraryLoad("twttr","twitter-wjs",this.addTwitterEventHandlers.bind(this))}}var i=t("../utilities").defaults,n=t("delegate"),r=t("../provide");e.prototype.handleSocialClicks=function(t){var e=t.delegateTarget,i=this.opts.attributePrefix;this.tracker.send("social",{socialNetwork:e.getAttribute(i+"social-network"),socialAction:e.getAttribute(i+"social-action"),socialTarget:e.getAttribute(i+"social-target")})},e.prototype.detectLibraryLoad=function(t,e,i){if(window[t])i();else{var n=document.getElementById(e);n&&(n.onload=i)}},e.prototype.addTwitterEventHandlers=function(){try{twttr.ready(function(){twttr.events.bind("tweet",function(t){if("tweet"==t.region){var e=t.data.url||t.target.getAttribute("data-url")||location.href;this.tracker.send("social","Twitter","tweet",e)}}.bind(this)),twttr.events.bind("follow",function(t){if("follow"==t.region){var e=t.data.screen_name||t.target.getAttribute("data-screen-name");this.tracker.send("social","Twitter","follow",e)}}.bind(this))}.bind(this))}catch(t){}},e.prototype.addFacebookEventHandlers=function(){try{FB.Event.subscribe("edge.create",function(t){this.tracker.send("social","Facebook","like",t)}.bind(this)),FB.Event.subscribe("edge.remove",function(t){this.tracker.send("social","Facebook","unlike",t)}.bind(this))}catch(t){}},r("socialTracker",e)},{"../provide":7,"../utilities":8,delegate:12}],7:[function(t,e){e.exports=function(t,e){var i=window[window.GoogleAnalyticsObject||"ga"];"function"==typeof i&&i("provide",t,e)}},{}],8:[function(t,e){var i={withTimeout:function(t,e){var i=!1;return setTimeout(t,e||2e3),function(){i||(i=!0,t())}},defaults:function(t,e){var i={};"object"!=typeof t&&(t={}),"object"!=typeof e&&(e={});for(var n in e)e.hasOwnProperty(n)&&(i[n]=t.hasOwnProperty(n)?t[n]:e[n]);return i},isObject:function(t){return"object"==typeof t&&null!==t},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},toArray:function(t){return i.isArray(t)?t:[t]}};e.exports=i},{}],9:[function(t,e){var i=t("matches-selector");e.exports=function(t,e,n){for(var r=n?t:t.parentNode;r&&r!==document;){if(i(r,e))return r;r=r.parentNode}}},{"matches-selector":13}],10:[function(t,e){function i(){return(new Date).getTime()}e.exports=Date.now||i},{}],11:[function(t,e){var i=t("date-now");e.exports=function(t,e,n){function r(){var d=i()-c;e>d&&d>0?o=setTimeout(r,e-d):(o=null,n||(u=t.apply(s,a),o||(s=a=null)))}var o,a,s,c,u;return null==e&&(e=100),function(){s=this,a=arguments,c=i();var d=n&&!o;return o||(o=setTimeout(r,e)),d&&(u=t.apply(s,a),s=a=null),u}}},{"date-now":10}],12:[function(t,e){function i(t,e,i){var r=n.apply(this,arguments);return t.addEventListener(i,r),{destroy:function(){t.removeEventListener(i,r)}}}function n(t,e,i,n){return function(i){i.delegateTarget=r(i.target,e,!0),i.delegateTarget&&n.call(t,i)}}var r=t("closest");e.exports=i},{closest:9}],13:[function(t,e){function i(t,e){if(r)return r.call(t,e);for(var i=t.parentNode.querySelectorAll(e),n=0;n<i.length;++n)if(i[n]==t)return!0;return!1}var n=Element.prototype,r=n.matchesSelector||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector;e.exports=i},{}]},{},[1]);
//# sourceMappingURL=main.js.map