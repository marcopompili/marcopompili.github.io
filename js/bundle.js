var flickerIn,flickerInToOut,flickerOut,fxFlickeringText,glow,originalText,renderCodes,resizeFulls,subCodes,timer,codeMax=120,codeMin=65;subCodes=function(t){var e,n,i,r,o;for(e=[],n=i=0,r=t.length;i<r;n=++i)t[n],o=Math.floor(Math.random()*(codeMax-codeMin+1))+codeMin,e[n]=o;return e},renderCodes=function(t){var e,n,i,r;for(r="",n=0,i=t.length;n<i;n++)e=t[n],r+=String.fromCharCode(e);return r},fxFlickeringText=function(t,e){return e(renderCodes(subCodes(t)))},timer=null,originalText="",flickerIn=function(t,e){$(this),originalText=t,timer=window.setInterval(fxFlickeringText,50,t,e)},flickerOut=function(t,e){window.clearInterval(timer),e(t)},flickerInToOut=function(t,e,n,i){$(this),flickerIn(originalText=t,e),setTimeout(function(){return flickerOut(originalText,n)},i)},$(document).ready(function(){$(".flicker").mouseenter(function(){var e;e=$(this),flickerIn(e.text(),function(t){return e.text(t)})}),$(".flicker").mouseleave(function(){var e;e=$(this),flickerOut(originalText,function(t){return e.text(t)})}),$("input[type=submit].flicker").mouseenter(function(){var e;e=$(this),flickerIn(e.val(),function(t){return e.val(t)})}),$("input[type=submit].flicker").mouseleave(function(){var e;e=$(this),flickerOut(originalText,function(t){return e.val(t)})})});var leetDict={a:"4",b:"B",c:"(",d:"D",e:"3",f:"F",g:"9",h:"H",i:"l",j:"j",k:"k",l:"1",m:"M",n:"N",o:"0",p:"P",q:"Q",r:"R",s:"$",t:"7",u:"U",v:"V",w:"W",x:"X",y:"Y",z:"2"},l33t3r=function(t){return leetDict[t.toLowerCase()]},mtime=function(t){return Date.parse(t)};$(document).ready(function(){var e,t;(e=$(".deflicker")).hide(),t=e.text(),e.fadeIn({duration:450,step:function(){return fxFlickeringText(e.text(),function(t){return e.text(t)})},complete:function(){flickerOut(t,function(t){e.text(t)})}});var n="",i="";$(".l33t").mouseenter(function(){var t=$(this).parent().siblings(".post-meta");i=t.text();var e=(n=$(this).text()).replace(/[a-zA-Z]/g,l33t3r);$(this).text(e),t.text(mtime(i))}),$(".l33t").mouseleave(function(){$(this).text(n),$(this).parent().siblings(".post-meta").text(i)})});