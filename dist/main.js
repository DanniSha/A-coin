!function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);class n{constructor(e={}){this.parameters=e,this.TerminalApp=e.TerminalApp,this.data={},this.slides={}}async preloadSlides(){return Promise.all(Object.values(this.slides).map(this.slideLoader.bind(this)))}async slideLoader(e){const t=this.TerminalApp.parameters.htmlPath+e.html+".html",i=await fetch(t);return e.source=await i.text()}async init(e=null,t=!0){return await this.slide(e||this.data.entrySlide,void 0,t)}async slide(e,t=!0,i=!0){if(this.TerminalApp.changingSlide)return await!1;if(this.TerminalApp.changingSlide=!0,!this.slides[e])throw delete this.TerminalApp.changingSlide,new Error(`Slide ${e} not exist!`);await this.TerminalApp.unloadPage(t),this.TerminalApp.currentPresentation=this;const n=this.slides[e];return this.TerminalApp.currentSlide=n,this.TerminalApp.currentSlideId=e,!i||history.state&&history.state.slide===n&&history.state.presentation===this.data.id||history.pushState({slide:e,presentation:this.data.id},this.data.title,`?${this.data.id}#${e}`),n.source&&(this.TerminalApp.root.innerHTML=n.source),document.body.querySelectorAll("[data-bind]").forEach(e=>{this.data[e.dataset.bind]&&(e.innerHTML=this.data[e.dataset.bind])}),n.init?await n.init().finally(e=>(delete this.TerminalApp.changingSlide,e)):delete this.TerminalApp.changingSlide}sleep(e){return new Promise(t=>setTimeout(t,e))}animateValueDelay(e,t,i,n,a){return setTimeout(function(){this.animateValue(e,t,i,n)}.bind(this),a)}animateValue(e,t,i,n){var a=i-t,s=t,r=i>t?1:-1,l=Math.abs(Math.floor(n/a)),c=document.querySelector(e),o=setInterval(function(){s+=r,c.innerHTML=s,s==i&&clearInterval(o)},l)}}class a extends n{constructor(e={}){super(e),Object.assign(this.data,{title:"А-коины",index:"01",header:"Каждое действие на сайте приносит деньги",entrySlide:"intro"}),this.slides={intro:{html:"rating/intro",init:async()=>await document.querySelector(".switch").addEventListener("click",async()=>this.sleep(2e3).then(async()=>await this.slide("cover"))),exit:async()=>(document.querySelectorAll("section").forEach(e=>e.classList.add("unload")),await this.sleep(1500))},cover:{html:"a-coin/cover",init:async()=>await document.querySelector("#whatIs").addEventListener("click",async()=>this.slide("whatIs")),exit:async()=>(document.querySelectorAll("section").forEach(e=>e.classList.add("unload")),await this.sleep(1e3))},whatIs:{html:"a-coin/whatIs",init:async()=>await document.querySelector("#howToGet").addEventListener("click",async()=>this.slide("likes")),exit:async()=>(document.querySelectorAll("section").forEach(e=>e.classList.add("unload")),await this.sleep(1e3))},likes:{html:"a-coin/likes",init:async()=>await document.querySelector("#toggle-heart").addEventListener("click",async()=>{document.querySelector("#toggle-heart").parentNode.parentNode.classList.toggle("active"),this.animateValueDelay(".wallet",0,100,500,500),this.sleep(3e3).then(async()=>await this.slide("comments"))}),exit:async()=>(document.querySelectorAll("section").forEach(e=>e.classList.add("unload")),await this.sleep(1e3))},comments:{html:"a-coin/comments",init:async()=>await document.querySelector("#sendComment").addEventListener("click",async()=>{document.querySelector("#sendComment").parentNode.parentNode.classList.toggle("active"),this.animateValueDelay(".wallet",100,300,500,600),this.sleep(3e3).then(async()=>await this.slide("services"))}),exit:async()=>(document.querySelectorAll("section").forEach(e=>e.classList.add("unload")),await this.sleep(1e3))},services:{html:"a-coin/services",init:async()=>await document.querySelector("#signUp").addEventListener("click",async()=>{document.querySelector("#signUp").parentNode.parentNode.classList.toggle("active"),this.animateValueDelay(".wallet",300,500,500,1e3),this.sleep(3e3).then(async()=>await this.slide("collected"))}),exit:async()=>(document.querySelectorAll("section").forEach(e=>e.classList.add("unload")),await this.sleep(1e3))},collected:{html:"a-coin/collected",init:async()=>await document.querySelector("#whatToSpend").addEventListener("click",async()=>this.slide("spend")),exit:async()=>(document.querySelectorAll("section").forEach(e=>e.classList.add("unload")),await this.sleep(1e3))},spend:{html:"a-coin/spend",init:async()=>await document.querySelector("#more").addEventListener("click",async()=>this.slide("more")),exit:async()=>(document.querySelectorAll("section").forEach(e=>e.classList.add("unload")),await this.sleep(1e3))},more:{html:"a-coin/more",exit:async()=>(document.querySelectorAll("section").forEach(e=>e.classList.add("unload")),await this.sleep(1e3))}}}}i.d(t,"default",function(){return s});class s{constructor({htmlPath:e="assets/html/",idleTimeout:t=2e7}={}){this.TerminalApp=this,this.parameters={htmlPath:e,idleTimeout:t},this.presentations={"a-coin":new a({TerminalApp:this})},this.preparePresentations(),window.addEventListener("popstate",async e=>e.state?await this.initPresentation(e.state.presentation,e.state.slide,!1):await this.showTerminalMenu(!1)),document.addEventListener("click",this.resetIdleTimer.bind(this))}async init(){return history.state&&history.state.slide&&history.state.presentation?await this.initPresentation(history.state.presentation,history.state.slide,!1):location.search.length>1&&location.hash>1?await this.initPresentation(location.search.substr(1),location.hash.substr(1),!1):await this.showTerminalMenu(!1)}async prepareWrapper(){const e=document.createElement("main");this.root=e;const t=document.createElement("footer"),i=document.createElement("button");i.classList.toggle("fullscreen",!0),i.onclick=this.toggleFullScreen,t.appendChild(i),document.body.innerHTML="",document.body.appendChild(e),document.body.appendChild(t)}async preparePresentations(){await Promise.all(Object.entries(this.presentations).map(async e=>(e[1].data.id=e[0],await e[1].preloadSlides())));return await this.prepareWrapper(),await this.init()}async showTerminalMenu(e=!0){const t=document.createElement("section");t.classList.add("title"),t.style.marginTop="400rem",t.setAttribute("data-slide-swith",""),t.innerText="Сервисное меню";const i=document.createElement("section");i.classList.add("buttons"),i.style.marginTop="223rem",i.setAttribute("data-slide-swith",""),Object.entries(this.presentations).forEach(e=>{const t=document.createElement("button");t.innerText=e[1].data.title,t.onclick=this.initPresentation.bind(this,e[0],null,!0),i.appendChild(t)}),await this.unloadPage(),e&&history.pushState(null,this.data.title,""),this.root.appendChild(t),this.root.appendChild(i)}initPresentation(e,t,i=!0){return this.resetIdleTimer(),this.presentations[e].init(t,i)}resetIdleTimer(){clearTimeout(this.idleTimeout),this.idleTimeout=setTimeout(this.triggerIdleTimer.bind(this),this.parameters.idleTimeout)}triggerIdleTimer(){this.TerminalApp.currentSlideId&&this.TerminalApp.currentPresentation&&this.TerminalApp.currentPresentation.data.entrySlide!==this.TerminalApp.currentSlideId&&this.initPresentation(this.TerminalApp.currentPresentation.data.id),this.resetIdleTimer()}async unloadPage(e=!0){return this.TerminalApp.currentSlide&&this.TerminalApp.currentSlide.exit&&await this.TerminalApp.currentSlide.exit(),e&&(this.root.innerHTML=""),this.currentSlide=!1,this.currentSlideId=!1,await!0}toggleFullScreen(){document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement?document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen&&document.webkitCancelFullScreen():document.documentElement.requestFullscreen?document.documentElement.requestFullscreen():document.documentElement.mozRequestFullScreen?document.documentElement.mozRequestFullScreen():document.documentElement.webkitRequestFullscreen&&document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)}}window.App=new s}]);