/*! Built with http://stenciljs.com */
const{h:t}=window.App;class e{constructor(){this.src="",this.hasError=!1,this.hasPlaceholder=!1,this.content=!1}componentWillLoad(){this.fetchNewContent()}componentDidLoad(){this.placeholderElement=this.element.querySelector("async-placeholder"),this.errorElement=this.element.querySelector("async-error")}fetchNewContent(){let t=this.src;(t=t.trim()).endsWith("html")?fetch(this.src).then(t=>{if(t.status>=200&&t.status<300)return t;{const e=new Error(t.statusText);throw e.name=`${t.status}`,e}}).then(t=>t.text()).then(t=>{this.content=t,this.placeholderElement&&this.placeholderElement.cancel(),this.errorElement&&this.errorElement.cancel()}).catch(t=>{this.hasError=!0,this.errorElement&&this.errorElement.setStatus(t.name,t.message)}):(this.hasError=!0,this.errorElement&&this.errorElement.setStatus(415,"Refusing to fetch non-HTML content"))}handleHasPlaceholder(){this.hasPlaceholder=!0}handleHasError(){this.content||(this.hasError=!0)}hostData(){return{class:{"is-loading":this.hasPlaceholder&&!this.content&&!this.hasError,"has-loaded":!!this.content,"has-error":this.hasError&&!this.content}}}render(){return this.content?t("div",{innerHTML:this.content}):this.hasError?t("slot",{name:"error"}):this.hasPlaceholder?t("slot",{name:"placeholder"}):null}static get is(){return"async-content"}static get encapsulation(){return"shadow"}static get properties(){return{content:{state:!0},element:{elementRef:!0},hasError:{state:!0},hasPlaceholder:{state:!0},src:{type:String,attr:"src",watchCallbacks:["fetchNewContent"]}}}static get listeners(){return[{name:"hasPlaceholder",method:"handleHasPlaceholder"},{name:"hasError",method:"handleHasError"}]}static get style(){return":host{display:block;overflow:hidden}:host(.is-loading){display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}"}}class r{constructor(){this.ms=1e4,this.errorRender=null,this.timeout=!1,this.timer=null}componentWillLoad(){this.startTimer()}componentWillUnload(){this.clearTimer()}startTimer(){this.timer=setTimeout(()=>{this.timeout=!0,this.status=408,this.message="The server took too long to respond",this.hasError.emit()},this.ms)}clearTimer(){this.timer&&clearTimeout(this.timer)}setStatus(t,e){this.status=t,this.message=e||""}cancel(){this.clearTimer()}render(){return this.errorRender?this.errorRender({status:this.status,message:this.message}):t("slot",null)}static get is(){return"async-error"}static get encapsulation(){return"shadow"}static get host(){return{slot:"error"}}static get properties(){return{cancel:{method:!0},errorRender:{type:"Any",attr:"error-render"},message:{state:!0},ms:{type:Number,attr:"ms"},setStatus:{method:!0},status:{state:!0},timeout:{state:!0}}}static get events(){return[{name:"hasError",method:"hasError",bubbles:!0,cancelable:!0,composed:!0}]}}class s{constructor(){this.ms=600,this.component=null,this.componentProps={},this.timeout=!1,this.timer=null}componentWillLoad(){this.startTimer()}componentWillUnload(){this.clearTimer()}startTimer(){this.timer=setTimeout(()=>{this.timeout=!0,this.hasPlaceholder.emit()},this.ms)}clearTimer(){this.timer&&clearTimeout(this.timer)}cancel(){this.clearTimer()}render(){if(this.component){const e=this.component;return t(e,Object.assign({},this.componentProps))}return t("slot",null)}static get is(){return"async-placeholder"}static get encapsulation(){return"shadow"}static get host(){return{slot:"placeholder"}}static get properties(){return{cancel:{method:!0},component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},ms:{type:Number,attr:"ms"},timeout:{state:!0}}}static get events(){return[{name:"hasPlaceholder",method:"hasPlaceholder",bubbles:!0,cancelable:!0,composed:!0}]}}export{e as AsyncContent,r as AsyncError,s as AsyncPlaceholder};