const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const chrome = require('./chrome');
const definePlugins = require('./plugins');
const defineNavigator = require('./navigator');
const defineXMLHttpRequest = require('./XMLHttpRequest');
const defineToString = require('./toString');
const defineCurrentScript = require('./document/currentScript');
const defineLocation = require('./location');
const defineHTMLMediaElement = require('./element/HTMLMediaElement');
const defineScreen = require('./screen');
const defineIndexedDB = require('./indexedDB');
const defineWebGL = require('./webgl');
const definePerformance = require('./performance');
const defineInterval = require('./setInterval');
const defineCookies = require('./cookies');
const defineEvents = require('./events');
const DeviceMotionEvent = require('./DeviceMotionEvent');
const defineWebRTC = require("./webrtc");
const defineSpeechSynthesis = require("./speechSynthesis");
const defineDocument = require("./document");
const defineFile = require("./File");
const defineAddEventListener = require('./eventListener');


const { window } = new JSDOM(`
<!DOCTYPE html>
<html class="layout-v2" lang="en">
<head>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>ASOS | Sign in</title>

    <link rel="preload" href="https://assets.asosservices.com/MasterLayout/WebFonts/FTN75__W/FTN75__W.woff2" as="font" type="font/woff2" crossorigin="anonymous">
<link rel="preload" href="https://assets.asosservices.com/MasterLayout/WebFonts/FTN45__W/FTN45__W.woff2" as="font" type="font/woff2" crossorigin="anonymous">
<link rel="preload" href="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" as="script" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0= sha384-ZvpUoO/+PpLXR1lu4jmpXWu80pZlYUAfxl5NsBMWOEPSjUn/6Z/hRTt8+pR6L4N2 sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous">
    <link rel="preload" href="/Content/dist/styles/bundle.5908ce81c95b7a58eeb6.css" as="style">

    <link rel="stylesheet" href="/Content/dist/styles/bundle.5908ce81c95b7a58eeb6.css" />


    <script>
    function onWindowFullyLoaded(callback) {
        if (document.readyState === 'complete') {
            callback();
        } else {
            window.addEventListener('load', callback);
        }
    }
    
    function onDomLoaded(callback) {
        if (document.readyState !== 'loading') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    }
</script>

<script type="text/javascript">

    var isMobile = false;
    
    window.asos = window.asos || {};
    
    window.asos.context = {
        isIosOidc: false,
        isMobile: false
    };
    
    window.asos.addToViewBag = function (val) {
        window.asos.viewBag = Object.assign(window.asos.viewBag || {}, val);
    }

</script>
    <script type="text/javascript">

    window.asos.routes = {};

    ASOS = typeof (ASOS) == 'undefined' ? {} : ASOS;
    ASOS.Identity = typeof (ASOS.Identity) == 'undefined' ? {} : ASOS.Identity;
    ASOS.Identity.IsTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    var isMobile = false;

    ASOS.Identity.Configuration = function() {
        return {
            isTouch: false,
            isMobileOidcClient: false,
            oidcClientPlatform: 'web'
        };
    }();

    ASOS.Identity.Events = function() {
        return {
            clickEvent: "click"
        };
    }();
</script>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" crossorigin="anonymous" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0= sha384-ZvpUoO/+PpLXR1lu4jmpXWu80pZlYUAfxl5NsBMWOEPSjUn/6Z/hRTt8+pR6L4N2 sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="></script>

    <script>
        window.jQuery || document.write('<script src="/Content/dist/js/jquery.min.c4dccdd9.js"><\/script>');
    </script>

    <script>
        !function(T,l,y){var S=T.location,k="script",D="connectionString",C="ingestionendpoint",I="disableExceptionTracking",E="ai.device.",b="toLowerCase",w="crossOrigin",N="POST",e="appInsightsSDK",t=y.name||"appInsights";(y.name||T[e])&&(T[e]=t);var n=T[t]||function(d){var g=!1,f=!1,m={initialize:!0,queue:[],sv:"5",version:2,config:d};function v(e,t){var n={},a="Browser";return n[E+"id"]=a[b](),n[E+"type"]=a,n["ai.operation.name"]=S&&S.pathname||"_unknown_",n["ai.internal.sdkVersion"]="javascript:snippet_"+(m.sv||m.version),{time:function(){var e=new Date;function t(e){var t=""+e;return 1===t.length&&(t="0"+t),t}return e.getUTCFullYear()+"-"+t(1+e.getUTCMonth())+"-"+t(e.getUTCDate())+"T"+t(e.getUTCHours())+":"+t(e.getUTCMinutes())+":"+t(e.getUTCSeconds())+"."+((e.getUTCMilliseconds()/1e3).toFixed(3)+"").slice(2,5)+"Z"}(),name:"Microsoft.ApplicationInsights."+e.replace(/-/g,"")+"."+t,sampleRate:100,tags:n,data:{baseData:{ver:2}}}}var h=d.url||y.src;if(h){function a(e){var t,n,a,i,r,o,s,c,u,p,l;g=!0,m.queue=[],f||(f=!0,t=h,s=function(){var e={},t=d.connectionString;if(t)for(var n=t.split(";"),a=0;a<n.length;a++){var i=n[a].split("=");2===i.length&&(e[i[0][b]()]=i[1])}if(!e[C]){var r=e.endpointsuffix,o=r?e.location:null;e[C]="https://"+(o?o+".":"")+"dc."+(r||"services.visualstudio.com")}return e}(),c=s[D]||d[D]||"",u=s[C],p=u?u+"/v2/track":d.endpointUrl,(l=[]).push((n="SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details)",a=t,i=p,(o=(r=v(c,"Exception")).data).baseType="ExceptionData",o.baseData.exceptions=[{typeName:"SDKLoadFailed",message:n.replace(/\./g,"-"),hasFullStack:!1,stack:n+"\nSnippet failed to load ["+a+"] -- Telemetry is disabled\nHelp Link: https://go.microsoft.com/fwlink/?linkid=2128109\nHost: "+(S&&S.pathname||"_unknown_")+"\nEndpoint: "+i,parsedStack:[]}],r)),l.push(function(e,t,n,a){var i=v(c,"Message"),r=i.data;r.baseType="MessageData";var o=r.baseData;return o.message='AI (Internal): 99 message:"'+("SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details) ("+n+")").replace(/\"/g,"")+'"',o.properties={endpoint:a},i}(0,0,t,p)),function(e,t){if(JSON){var n=T.fetch;if(n&&!y.useXhr)n(t,{method:N,body:JSON.stringify(e),mode:"cors"});else if(XMLHttpRequest){var a=new XMLHttpRequest;a.open(N,t),a.setRequestHeader("Content-type","application/json"),a.send(JSON.stringify(e))}}}(l,p))}function i(e,t){f||setTimeout(function(){!t&&m.core||a()},500)}var e=function(){var n=l.createElement(k);n.src=h;var e=y[w];return!e&&""!==e||"undefined"==n[w]||(n[w]=e),n.onload=i,n.onerror=a,n.onreadystatechange=function(e,t){"loaded"!==n.readyState&&"complete"!==n.readyState||i(0,t)},n}();y.ld<0?l.getElementsByTagName("head")[0].appendChild(e):setTimeout(function(){l.getElementsByTagName(k)[0].parentNode.appendChild(e)},y.ld||0)}try{m.cookie=l.cookie}catch(p){}function t(e){for(;e.length;)!function(t){m[t]=function(){var e=arguments;g||m.queue.push(function(){m[t].apply(m,e)})}}(e.pop())}var n="track",r="TrackPage",o="TrackEvent";t([n+"Event",n+"PageView",n+"Exception",n+"Trace",n+"DependencyData",n+"Metric",n+"PageViewPerformance","start"+r,"stop"+r,"start"+o,"stop"+o,"addTelemetryInitializer","setAuthenticatedUserContext","clearAuthenticatedUserContext","flush"]),m.SeverityLevel={Verbose:0,Information:1,Warning:2,Error:3,Critical:4};var s=(d.extensionConfig||{}).ApplicationInsightsAnalytics||{};if(!0!==d[I]&&!0!==s[I]){var c="onerror";t(["_"+c]);var u=T[c];T[c]=function(e,t,n,a,i){var r=u&&u(e,t,n,a,i);return!0!==r&&m["_"+c]({message:e,url:t,lineNumber:n,columnNumber:a,error:i}),r},d.autoExceptionInstrumented=!0}return m}(y.cfg);function a(){y.onInit&&y.onInit(n)}(T[t]=n).queue&&0===n.queue.length?(n.queue.push(a),n.trackPageView({})):a()}(window,document,{
        src: "https://js.monitor.azure.com/scripts/b/ai.2.min.js", // The SDK URL Source
        crossOrigin: "anonymous", // When supplied this will add the provided value as the cross origin attribute on the script tag
        onInit: function(appInsights) {
            var serverId = "b4f008c799e4e9720a092b50d3b4cd45";
            if (serverId) {
                appInsights.context.telemetryTrace.parentID = serverId;
            }
            
            appInsights.addTelemetryInitializer((envelope) => {
                
                if (envelope.data.url && envelope.data.url.includes("/Content/")) {
                    return false;
                }
                
                return true;
            });
        },
        cfg: {
            connectionString: "InstrumentationKey=cef16d31-8194-4d9a-bdfd-3de8a10903c5;IngestionEndpoint=https://westeurope-3.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/",
            loggingLevelTelemetry: 0
        }});
    </script>

    <script src="//ci.asosservices.com/core/shared-libs-2.0.4.min.js"></script>

    <script src="/Content/dist/js/jquery.validate.min.4c0cc637.js" defer></script>
    <script src="/Content/dist/js/jquery.modal.min.970d08b0.js" defer></script>
    <script src="/Content/dist/js/jquery.unobtrusive-ajax.min.3c00b4d3.js" defer></script>
    <script src="/Content/dist/js/jquery.validate.unobtrusive.min.1fc39d86.js" defer></script>
    <script src="/Content/dist/js/sha256.min.71575116.js" defer></script>
    
    <script src="/Content/dist/js/global.init.877afe7cf8e36c60fd54.js" defer></script>

    <script src="/Content/dist/js/Asos.Identity.Analytics.Account.8878f13b40b7bd1ca76d.js" defer></script>
    <script src="/Content/dist/js/Asos.Identity.Analytics.Ids.12285accf7757b8ce00d.js" defer></script>
    <script src="/Content/dist/js/Asos.Identity.Form.Submission.e6762cd5741353850512.js" defer></script>
    <script src="/Content/dist/js/Asos.Identity.Helpers.38adf00d310357c6987d.js" defer></script>
    <script src="/Content/dist/js/Asos.Identity.RecaptchaCallbacks.f0b84a8f695088abde35.js" defer></script>
    <script src="/Content/dist/js/Asos.Identity.RecaptchaTracker.4fc5715b8ba0325a303e.js" defer></script>
    <script src="/Content/dist/js/jquery.email-autocomplete.331e11f11061270ef52d.js" defer></script>

    
    

<script src="https://resources.asosservices.com/res/analytics/identity.js" defer></script><script src="/Content/dist/js/adobeTracking.56c3fcf0373322466895.js" defer></script>

<script type="text/javascript">



    window.AdobeGlobalTrackingData = {
        platform: "desktop",
        domainSuffix: "com",
        pageType: "secure",
        breadCrumbs: "sign in",
        dateTime: "",
        currentPageUrl: "",
        visitNumber: "",
        newRepeat: "",
        windowInnerHeight: "",
        windowInnerWidth: "",
        responseStart: "",
        domContentLoadedEvent: "",
        previousSitContent: "",
        countryIsoCode: "ru",
        isCheckout: "False",
        clientPlatform: "desktop web"
    }

    onDomLoaded(function() {

        window.adobeTrackingFile.RaiseEventForLoginError();
        window.adobeTrackingFile.RaiseEventForLinkAccountError();

        onWindowFullyLoaded(function () {
            window.AdobeGlobalTrackingData.isLoginErrorPresent = window.isLoginErrorPresent;
            window.AdobeGlobalTrackingData.isLinkAccountErrorPresent = window.isLinkAccountErrorPresent;
            window.adobeTrackingFile.raiseEvent("signInPageLoaded", window.AdobeGlobalTrackingData);
        });

    });
</script>

    
    
<script type="text/javascript">


    window.asos.optimizely = window.asos.optimizely || {};

    window.asos.optimizely.viewBag = {"sdkKey":"ShK2dzd7JQhz8jETx1Fkb","optimizelyLocation":"https://www.asos.com/assets/optimizely/datafiles/%s.json","browseCountry":"GB","language":"en-GB","browseStore":"COM","platform":"desktop","loggedIn":"true","recognised":"false","geoCountry":null,"identityAppClient":false,"identityRequestOrigin":"self","xSiteOrigin":""};

    if ('False'.toLowerCase() == 'true') {
        window.asos.optimizely.viewBag.forceDisable = 1;
    }

    const safetyNetToAvoidHiddenMvtContainers = function () {
        document.querySelectorAll('.mvt-container').forEach(el => {
            el.style.visibility = "visible";
        });
    }

    setTimeout(safetyNetToAvoidHiddenMvtContainers, 1500);

</script>
    
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NK4DFXV');</script>
    <!-- End Google Tag Manager -->
</head>
<body class="full sign-in-page lang-en region-gb" data-state="isExpanded">
<div id="content" class="">
<div id="header">
    <h1>
            <a href="http://www.asos.com" class="home" id="asos-logo">

        <img src="/Content/images/asos-logo-2022-93x28.png" height="28" width="93" alt="ASOS Logo" loading="lazy" />

            </a>
    </h1>

</div>        <main id="main">
            


<div class="container signin-container">
        <div class="signin-options">
            <div class="title qa-title with-link">
                <div class="qa-header"><a class="qa-join-asos" href="/identity/register?signin=519ed2f4fc21e4de23335b05a4c9c130&amp;forceAuthentication=True" id="new-to-asos-tab">Join</a></div>
            </div>
            <div class="title qa-title active">
                <div class="qa-header" aria-current="page">Sign in</div>
            </div>
            <div class="clear"></div>
        </div>

        <div class="form form-login">

<form action="https://my.asos.com/identity/login?signin=519ed2f4fc21e4de23335b05a4c9c130&amp;showAllOptions=False" data-analytics="signInUsingEmail" id="signInForm" method="post"><input id="idsrv_xsrf" name="idsrv.xsrf" type="hidden" value="c9VUP5VyUeKetobneEINUutR1ocDlm95pR3VZg3s0mo8BwacStZOgONuy4otdV6o9SOa0iUFbd79S9tGXqoawDYnAdg" />                <fieldset>
                    <legend class="screenreader">Sign in with email</legend>
                    <div class="mobile-spacer">
                        <div>
                            
                        </div>
                    </div>
                    <div>
                        <div class="field">
                            <label class="qa-email-label" for="EmailAddress" id="EmailLabel">Email address</label>
                            <div class="input-wrapper" aria-labelledby="EmailLabel">
                                <input Name="Username" class="qa-email-textbox" data-val="true" data-val-email="Email fail! Please type in your correct email address" data-val-length="Oops, that email address is too long - try again, please" data-val-length-max="255" data-val-required="Oops! You need to type your email here" id="EmailAddress" maxlength="255" name="EmailAddress" type="email" value="" />

                                <span class="field-validation-valid qa-email-validation" data-valmsg-for="Username" data-valmsg-replace="true"></span>
                            </div>

                            <div class="clear"></div>
                        </div>
                        <div class="field">
                            <label class="qa-password-label" for="Password" id="PasswordLabel">Password</label>
                            <div class="input-wrapper" aria-labelledby="PasswordLabel">
                                <input autocomplete="off" class="qa-password-textbox" data-val="true" data-val-length="Hold up, that&#39;s too long. Less than 100 characters please" data-val-length-max="100" data-val-required="Hey, we need a password here" id="Password" name="Password" type="password" value="" />
                                <button id="signin-show-me" class="reveal hidden qa-reveal" type="button" role="button">Show</button>
                                <button id="signin-hide-me" class="hide hidden qa-hide" type="button" role="button">Hide</button>
                                <span class="field-validation-valid qa-password-validation" data-valmsg-for="Password" data-valmsg-replace="true"></span>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>


                    <div class="submit">

                        <input data-sitekey=""
                               data-callback=""
                               type="submit"
                               value="Sign in"
                               id="signin"
                               class="g-recaptcha qa-submit adobeTrackedButton"
                               return="false"
                               data-adobe='{"event": "tracking.identity.signIn" ,"data" :{"action":"Sign In","context":"Sign In" ,"signupmethod":"Email","recognised":"","socialPlatform": ""}}' />

                        <div class="clear"></div>
                    </div>
                    <input id="submitting" name="submitting" type="hidden" value="Submitting..." />

                        <div class="forgotten-password">
                            <a class="qa-forgot-password adobeTrackedButton" data-analytics="alreadyRegisteredForgotPassword" href="/identity/password/reset?signin=519ed2f4fc21e4de23335b05a4c9c130" id="forgot-password-link">Forgot password?</a>
                        </div>
                </fieldset>
</form>        </div>

        <div class="info info-centre   ">


                <h2 id="sign-in-header" class="qa-subtitle">Or sign in with...</h2>
                <div class="clear"></div>





<div class="options three-buttons ">
        <p class="banner">
            We are aware that you may not be able to log in to your ASOS account using Facebook. We're working on getting it back up and running as soon as possible, in the meantime please use one of the other available login methods.
        </p>
    <div id="social-links-container" class="social-links-container social-buttons-icon-with-text">
            <ul id="social-signin-list" style="list-style-type: none">


<li class="social-register">
    <a href="https://my.asos.com/identity/external?provider=Google&amp;signin=519ed2f4fc21e4de23335b05a4c9c130" id="signup-google" data-analytics="signInUsingSocial" data-analytics-social="google" class="social-link gplus">
        <div class="connect google qa-sign-up-with-google">
            <div class="icon qa-sign-up-with-google" role="img" aria-label="google"></div>
            <div class="text"><span>Google</span></div>
        </div>
    </a>
</li>



<li class="social-register">
    <a href="https://my.asos.com/identity/external?provider=Apple&amp;signin=519ed2f4fc21e4de23335b05a4c9c130" id="signup-apple" data-analytics="signInUsingSocial" data-analytics-social="apple" class="social-link apple">
        <div class="connect apple qa-sign-up-with-apple">
            <div class="icon qa-sign-up-with-apple" role="img" aria-label="apple"></div>
            <div class="text"><span>Apple</span></div>
        </div>
    </a>
</li>



<li class="social-register">
    <a href="#" id="signup-facebook" data-analytics="signInUsingSocial" data-analytics-social="facebook" class="social-link facebook disabled">
        <div class="connect facebook qa-sign-up-with-facebook">
            <div class="icon qa-sign-up-with-facebook" role="img" aria-label="facebook"></div>
            <div class="text"><span>Facebook</span></div>
        </div>
    </a>
</li>

            </ul>
    </div>
        <div class="twitter-gone">
            <a href="https://www.asos.com/customer-care/technical/im-having-trouble-signing-into-my-account/">Where has Twitter Gone?</a>
        </div>
</div>
            <div class="clear"></div>
        </div>

</div>

<script>
    window.asos.addToViewBag({"IsAllowedBrowser":true,"ForceAuthentication":false,"IsCheckout":false});
</script>
<script src="/Content/dist/js/views/signin/index.ebd8d5d18b50c212a2ca.js" defer></script>

        </main>
    </div>

<div class="terms">
    <label>
        <a target="_blank" href="http://www.asos.com/privacy-policy/" id="privacy-policy" class="qa-privacypolicy-link" rel="noopener">Privacy Policy</a> | <a href="http://www.asos.com/terms-and-conditions/" id="terms-and-conditions" class="qa-tandc-link" target="_blank" rel="noopener">Terms and Conditions</a>
    </label>
</div>


<script type="text/javascript" nonce="57f3824f30c8eedcd701b0e0f61a8374" src="/cPYhw7js-taKj/GV/951_KziztRsQ/f5OEkf5rkY5Qit/fSovAg/WXQ/MOWY5XCs"></script></body>

</html>

`, {
  url: 'http://127.0.0.1:3000',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
  contentType: 'text/html',
});

window.chrome = chrome;
window.DeviceMotionEvent = DeviceMotionEvent;
definePlugins(window);
defineNavigator(window);
defineXMLHttpRequest(window);
defineToString(window);
defineCurrentScript(window);
defineLocation(window);
defineHTMLMediaElement(window);
defineScreen(window);
defineIndexedDB(window);
defineWebGL(window);
definePerformance(window);
defineInterval(window);
defineCookies(window);
defineEvents(window);
defineWebRTC(window);
defineSpeechSynthesis(window);
defineDocument(window);
defineFile(window);
defineAddEventListener(window);

Object.defineProperty(window.HTMLIFrameElement.prototype, 'loading', {
  get() {

  },
  set() {

  }
})

delete window.SharedArrayBuffer;
Object.defineProperties(window, {
  'isSecureContext': {
    get: () => true
  },
  'crossOriginIsolated': {
    get: () => false
  },
});
global.Function.prototype.toString = window.Function.prototype.toString;

module.exports = window;