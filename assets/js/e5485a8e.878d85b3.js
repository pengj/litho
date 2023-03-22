"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6561,1534,5701,2586,2793,2138,5425,3156,2875],{3905:(e,t,n)=>{n.r(t),n.d(t,{MDXContext:()=>c,MDXProvider:()=>d,mdx:()=>h,useMDXComponents:()=>p,withMDXComponents:()=>u});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(){return a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a.apply(this,arguments)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),u=function(e){return function(t){var n=p(t.components);return o.createElement(e,a({},t,{components:n}))}},p=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return o.createElement(c.Provider,{value:t},e.children)},m="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},y=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,m=u["".concat(i,".").concat(d)]||u[d]||f[d]||a;return n?o.createElement(m,l(l({ref:t},c),{},{components:n})):o.createElement(m,l({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=y;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:r,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}y.displayName="MDXCreateElement"},85162:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var o=n(67294),r=n(86010);const a={tabItem:"tabItem_Ymn6"};function i(e){var t=e.children,n=e.hidden,i=e.className;return o.createElement("div",{role:"tabpanel",className:(0,r.default)(a.tabItem,i),hidden:n},t)}},74866:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var o=n(87462),r=n(67294),a=n(86010),i=n(12466),l=n(16550),s=n(91980),c=n(67392),u=n(50012);function p(e){return function(e){return r.Children.map(e,(function(e){if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')}))}(e).map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes,default:t.default}}))}function d(e){var t=e.values,n=e.children;return(0,r.useMemo)((function(){var e=null!=t?t:p(n);return function(e){var t=(0,c.l)(e,(function(e,t){return e.value===t.value}));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,n])}function m(e){var t=e.value;return e.tabValues.some((function(e){return e.value===t}))}function f(e){var t=e.queryString,n=void 0!==t&&t,o=e.groupId,a=(0,l.k6)(),i=function(e){var t=e.queryString,n=void 0!==t&&t,o=e.groupId;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!o)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=o?o:null}({queryString:n,groupId:o});return[(0,s._X)(i),(0,r.useCallback)((function(e){if(i){var t=new URLSearchParams(a.location.search);t.set(i,e),a.replace(Object.assign({},a.location,{search:t.toString()}))}}),[i,a])]}function y(e){var t,n,o,a,i=e.defaultValue,l=e.queryString,s=void 0!==l&&l,c=e.groupId,p=d(e),y=(0,r.useState)((function(){return function(e){var t,n=e.defaultValue,o=e.tabValues;if(0===o.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:o}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+n+'" but none of its children has the corresponding value. Available values are: '+o.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return n}var r=null!=(t=o.find((function(e){return e.default})))?t:o[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:i,tabValues:p})})),h=y[0],g=y[1],v=f({queryString:s,groupId:c}),b=v[0],k=v[1],x=(t=function(e){return e?"docusaurus.tab."+e:null}({groupId:c}.groupId),n=(0,u.Nk)(t),o=n[0],a=n[1],[o,(0,r.useCallback)((function(e){t&&a.set(e)}),[t,a])]),w=x[0],N=x[1],O=function(){var e=null!=b?b:w;return m({value:e,tabValues:p})?e:null}();return(0,r.useLayoutEffect)((function(){O&&g(O)}),[O]),{selectedValue:h,selectValue:(0,r.useCallback)((function(e){if(!m({value:e,tabValues:p}))throw new Error("Can't select invalid tab value="+e);g(e),k(e),N(e)}),[k,N,p]),tabValues:p}}var h=n(72389);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function v(e){var t=e.className,n=e.block,l=e.selectedValue,s=e.selectValue,c=e.tabValues,u=[],p=(0,i.o5)().blockElementScrollPositionUntilNextRender,d=function(e){var t=e.currentTarget,n=u.indexOf(t),o=c[n].value;o!==l&&(p(t),s(o))},m=function(e){var t,n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":var o,r=u.indexOf(e.currentTarget)+1;n=null!=(o=u[r])?o:u[0];break;case"ArrowLeft":var a,i=u.indexOf(e.currentTarget)-1;n=null!=(a=u[i])?a:u[u.length-1]}null==(t=n)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.default)("tabs",{"tabs--block":n},t)},c.map((function(e){var t=e.value,n=e.label,i=e.attributes;return r.createElement("li",(0,o.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:function(e){return u.push(e)},onKeyDown:m,onClick:d},i,{className:(0,a.default)("tabs__item",g.tabItem,null==i?void 0:i.className,{"tabs__item--active":l===t})}),null!=n?n:t)})))}function b(e){var t=e.lazy,n=e.children,o=e.selectedValue;if(n=Array.isArray(n)?n:[n],t){var a=n.find((function(e){return e.props.value===o}));return a?(0,r.cloneElement)(a,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},n.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==o})})))}function k(e){var t=y(e);return r.createElement("div",{className:(0,a.default)("tabs-container",g.tabList)},r.createElement(v,(0,o.Z)({},e,t)),r.createElement(b,(0,o.Z)({},e,t)))}function x(e){var t=(0,h.default)();return r.createElement(k,(0,o.Z)({key:String(t)},e))}},7772:(e,t,n)=>{n.d(t,{Z:()=>m});var o=n(87462),r=n(67294),a=n(23746),i=n(7694),l=n(13618),s="0.47.0",c="0.48.0-SNAPSHOT",u="0.10.5",p="0.142.0",d=n(86668);const m=function(e){var t=e.language,n=e.code.replace(/{{site.lithoVersion}}/g,s).replace(/{{site.soloaderVersion}}/g,u).replace(/{{site.lithoSnapshotVersion}}/g,c).replace(/{{site.flipperVersion}}/g,p).trim(),m=(0,d.L)().isDarkTheme?l.Z:i.Z;return r.createElement(a.ZP,(0,o.Z)({},a.lG,{code:n,language:t,theme:m}),(function(e){var t=e.className,n=e.style,o=e.tokens,a=e.getLineProps,i=e.getTokenProps;return r.createElement("pre",{className:t,style:n},o.map((function(e,t){return r.createElement("div",a({line:e,key:t}),e.map((function(e,t){return r.createElement("span",i({token:e,key:t}))})))})))}))}},5221:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>y,frontMatter:()=>s,metadata:()=>u,toc:()=>d});var o=n(87462),r=n(63366),a=(n(67294),n(3905)),i=(n(74866),n(85162),n(7772)),l=["components"],s={id:"project-setup",title:"Setting up the Project"},c=void 0,u={unversionedId:"tutorial/project-setup",id:"tutorial/project-setup",title:"Setting up the Project",description:"After creating an Android app project in Android Studio, take the steps detailed in this page to configure it with the correct settings and dependencies.",source:"@site/../docs/tutorial/project-setup.mdx",sourceDirName:"tutorial",slug:"/tutorial/project-setup",permalink:"/docs/tutorial/project-setup",draft:!1,editUrl:"https://github.com/facebook/litho/edit/master/website/../docs/tutorial/project-setup.mdx",tags:[],version:"current",frontMatter:{id:"project-setup",title:"Setting up the Project"},sidebar:"mainSidebar",previous:{title:"Overview",permalink:"/docs/tutorial/overview"},next:{title:"Components and Props",permalink:"/docs/tutorial/first-components"}},p={},d=[{value:"1. Add Litho core dependencies",id:"1-add-litho-core-dependencies",level:2},{value:"2. Using the Annotation Processor",id:"2-using-the-annotation-processor",level:2},{value:"3. Wire up native libs",id:"3-wire-up-native-libs",level:2},{value:"Testing your setup",id:"testing-your-setup",level:2},{value:"What next?",id:"what-next",level:2}],m={toc:d},f="wrapper";function y(e){var t=e.components,n=(0,r.Z)(e,l);return(0,a.mdx)(f,(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.mdx)("p",null,"After creating an Android app project in Android Studio, take the steps detailed in this page to configure it with the correct settings and dependencies."),(0,a.mdx)("h2",{id:"1-add-litho-core-dependencies"},"1. Add Litho core dependencies"),(0,a.mdx)("p",null,"Add the following into the ",(0,a.mdx)("inlineCode",{parentName:"p"},"dependencies")," block of the ",(0,a.mdx)("inlineCode",{parentName:"p"},"build.gradle")," file:"),(0,a.mdx)(i.Z,{language:"groovy",code:"\ndependencies {\n  // Litho\n  implementation 'com.facebook.litho:litho-core:{{site.lithoVersion}}'\n  implementation 'com.facebook.litho:litho-core-kotlin:{{site.lithoVersion}}'\n  implementation 'com.facebook.litho:litho-widget:{{site.lithoVersion}}'\n  implementation 'com.facebook.litho:litho-widget-kotlin:{{site.lithoVersion}}'\n  kapt 'com.facebook.litho:litho-processor:{{site.lithoVersion}}'\n  // SoLoader\n  implementation 'com.facebook.soloader:soloader:{{site.soloaderVersion}}'\n  // Testing Litho\n  testImplementation 'com.facebook.litho:litho-testing:{{site.lithoVersion}}'\n}\n",mdxType:"VersionedCodeBlock"}),(0,a.mdx)("h2",{id:"2-using-the-annotation-processor"},"2. Using the Annotation Processor"),(0,a.mdx)("p",null,"The Annotation Processor is a part of the application build/compile process that generates code by reading annotations (such as @Override and @SuppressWanings)."),(0,a.mdx)("p",null,"In order to use your project's dependencies (from Step 2) with Annotation Processors, you need to apply the ",(0,a.mdx)("inlineCode",{parentName:"p"},"kotlin-kapt")," plugin at the top of your app's ",(0,a.mdx)("inlineCode",{parentName:"p"},"build.gradle")," file:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-groovy"},"apply plugin: 'kotlin-kapt'\n")),(0,a.mdx)("h2",{id:"3-wire-up-native-libs"},"3. Wire up native libs"),(0,a.mdx)("p",null,"Litho has a dependency on ",(0,a.mdx)("a",{parentName:"p",href:"https://github.com/facebook/SoLoader"},"SoLoader")," to help load native libraries provided by the underlying layout engine, ",(0,a.mdx)("a",{parentName:"p",href:"https://yogalayout.com/docs/"},"Yoga"),(0,a.mdx)("sup",{parentName:"p",id:"fnref-1"},(0,a.mdx)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1")),"."),(0,a.mdx)("p",null,"Your custom ",(0,a.mdx)("inlineCode",{parentName:"p"},"Application")," class is a good place to initialize SoLoader:"),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-kotlin",metastring:'title="MyApplication.kt"',title:'"MyApplication.kt"'},"class MyApplication: Application() {\n\n  override fun onCreate() {\n    super.onCreate()\n    SoLoader.init(this, false)\n  }\n}\n")),(0,a.mdx)("h2",{id:"testing-your-setup"},"Testing your setup"),(0,a.mdx)("p",null,'You can test the above setup steps by adding the following simple UI, created with Litho, that displays "Hello, World!" text to an activity:'),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-kotlin",metastring:"file=sample/src/main/java/com/facebook/samples/litho/onboarding/MyActivity.kt start=start_example end=end_example",file:"sample/src/main/java/com/facebook/samples/litho/onboarding/MyActivity.kt",start:"start_example",end:"end_example"},'import android.os.Bundle\nimport androidx.appcompat.app.AppCompatActivity\nimport com.facebook.litho.Component\nimport com.facebook.litho.ComponentScope\nimport com.facebook.litho.KComponent\nimport com.facebook.litho.LithoView\nimport com.facebook.litho.dp\nimport com.facebook.litho.kotlin.widget.Text\n\nclass MyActivity : AppCompatActivity() {\n\n  override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n\n    val lithoView = LithoView.create(this /* context */, MyComponent())\n    setContentView(lithoView)\n  }\n}\n\nclass MyComponent() : KComponent() {\n  override fun ComponentScope.render(): Component = Text(text = "Hello, World!", textSize = 50.dp)\n}\n')),(0,a.mdx)("p",null,'If you build and run the app you should see "Hello, World!" displayed on the screen. Project setup is complete!'),(0,a.mdx)("h2",{id:"what-next"},"What next?"),(0,a.mdx)("p",null,"The next section of the tutorial, ",(0,a.mdx)("a",{parentName:"p",href:"/docs/tutorial/first-components"},"Components and Props"),", gives you a deeper understanding of what you've completed in this section."),(0,a.mdx)("div",{className:"footnotes"},(0,a.mdx)("hr",{parentName:"div"}),(0,a.mdx)("ol",{parentName:"div"},(0,a.mdx)("li",{parentName:"ol",id:"fn-1"},"Yoga is a cross-platform (usable on Android, iOS, and other platforms) implementation of the Flexbox layout system used in web browsers. Litho uses Yoga to enable layouts (positioning of elements in the screen) to be specified via the Flexbox layouting system.",(0,a.mdx)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}y.isMDXComponent=!0},23746:(e,t,n)=>{n.d(t,{ZP:()=>f,lG:()=>i});var o=n(87410);const r={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var a=n(67294),i={Prism:o.Z,theme:r};function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s.apply(this,arguments)}var c=/\r\n|\r|\n/,u=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},p=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},d=function(e,t){var n=e.plain,o=Object.create(null),r=e.styles.reduce((function(e,n){var o=n.languages,r=n.style;return o&&!o.includes(t)||n.types.forEach((function(t){var n=s({},e[t],r);e[t]=n})),e}),o);return r.root=n,r.plain=s({},n,{backgroundColor:null}),r};function m(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&-1===t.indexOf(o)&&(n[o]=e[o]);return n}const f=function(e){function t(){for(var t=this,n=[],o=arguments.length;o--;)n[o]=arguments[o];e.apply(this,n),l(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?d(e.theme,e.language):void 0;return t.themeDict=n})),l(this,"getLineProps",(function(e){var n=e.key,o=e.className,r=e.style,a=s({},m(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),i=t.getThemeDict(t.props);return void 0!==i&&(a.style=i.plain),void 0!==r&&(a.style=void 0!==a.style?s({},a.style,r):r),void 0!==n&&(a.key=n),o&&(a.className+=" "+o),a})),l(this,"getStyleForToken",(function(e){var n=e.types,o=e.empty,r=n.length,a=t.getThemeDict(t.props);if(void 0!==a){if(1===r&&"plain"===n[0])return o?{display:"inline-block"}:void 0;if(1===r&&!o)return a[n[0]];var i=o?{display:"inline-block"}:{},l=n.map((function(e){return a[e]}));return Object.assign.apply(Object,[i].concat(l))}})),l(this,"getTokenProps",(function(e){var n=e.key,o=e.className,r=e.style,a=e.token,i=s({},m(e,["key","className","style","token"]),{className:"token "+a.types.join(" "),children:a.content,style:t.getStyleForToken(a),key:void 0});return void 0!==r&&(i.style=void 0!==i.style?s({},i.style,r):r),void 0!==n&&(i.key=n),o&&(i.className+=" "+o),i})),l(this,"tokenize",(function(e,t,n,o){var r={code:t,grammar:n,language:o,tokens:[]};e.hooks.run("before-tokenize",r);var a=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),a}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,o=e.code,r=e.children,a=this.getThemeDict(this.props),i=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],o=[0],r=[e.length],a=0,i=0,l=[],s=[l];i>-1;){for(;(a=o[i]++)<r[i];){var d=void 0,m=t[i],f=n[i][a];if("string"==typeof f?(m=i>0?m:["plain"],d=f):(m=p(m,f.type),f.alias&&(m=p(m,f.alias)),d=f.content),"string"==typeof d){var y=d.split(c),h=y.length;l.push({types:m,content:y[0]});for(var g=1;g<h;g++)u(l),s.push(l=[]),l.push({types:m,content:y[g]})}else i++,t.push(m),n.push(d),o.push(0),r.push(d.length)}i--,t.pop(),n.pop(),o.pop(),r.pop()}return u(l),s}(void 0!==i?this.tokenize(t,o,i,n):[o]),className:"prism-code language-"+n,style:void 0!==a?a.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(a.Component)},13618:(e,t,n)=>{n.d(t,{Z:()=>o});const o={plain:{color:"#F8F8F2",backgroundColor:"#282A36"},styles:[{types:["prolog","constant","builtin"],style:{color:"rgb(189, 147, 249)"}},{types:["inserted","function"],style:{color:"rgb(80, 250, 123)"}},{types:["deleted"],style:{color:"rgb(255, 85, 85)"}},{types:["changed"],style:{color:"rgb(255, 184, 108)"}},{types:["punctuation","symbol"],style:{color:"rgb(248, 248, 242)"}},{types:["string","char","tag","selector"],style:{color:"rgb(255, 121, 198)"}},{types:["keyword","variable"],style:{color:"rgb(189, 147, 249)",fontStyle:"italic"}},{types:["comment"],style:{color:"rgb(98, 114, 164)"}},{types:["attr-name"],style:{color:"rgb(241, 250, 140)"}}]}},7694:(e,t,n)=>{n.d(t,{Z:()=>o});const o={plain:{color:"#393A34",backgroundColor:"#f6f8fa"},styles:[{types:["comment","prolog","doctype","cdata"],style:{color:"#999988",fontStyle:"italic"}},{types:["namespace"],style:{opacity:.7}},{types:["string","attr-value"],style:{color:"#e3116c"}},{types:["punctuation","operator"],style:{color:"#393A34"}},{types:["entity","url","symbol","number","boolean","variable","constant","property","regex","inserted"],style:{color:"#36acaa"}},{types:["atrule","keyword","attr-name","selector"],style:{color:"#00a4db"}},{types:["function","deleted","tag"],style:{color:"#d73a49"}},{types:["function-variable"],style:{color:"#6f42c1"}},{types:["tag","selector","keyword"],style:{color:"#00009f"}}]}}}]);