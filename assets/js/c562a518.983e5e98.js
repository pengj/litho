"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2093,6972,2304,4882,6127,7940,1646],{3905:(e,t,n)=>{n.r(t),n.d(t,{MDXContext:()=>d,MDXProvider:()=>c,mdx:()=>y,useMDXComponents:()=>p,withMDXComponents:()=>s});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o.apply(this,arguments)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=a.createContext({}),s=function(e){return function(t){var n=p(t.components);return a.createElement(e,o({},t,{components:n}))}},p=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(d.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=m(e,["components","mdxType","originalType","parentName"]),s=p(n),c=r,f=s["".concat(l,".").concat(c)]||s[c]||u[c]||o;return n?a.createElement(f,i(i({ref:t},d),{},{components:n})):a.createElement(f,i({ref:t},d))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=f;var i={};for(var m in t)hasOwnProperty.call(t,m)&&(i[m]=t[m]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var d=2;d<o;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},85162:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var a=n(67294),r=n(34334);const o="tabItem_Ymn6";function l(e){var t=e.children,n=e.hidden,l=e.className;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,l),hidden:n},t)}},65488:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var a=n(83117),r=n(67294),o=n(34334),l=n(72389),i=n(67392),m=n(7094),d=n(12466);const s="tabList__CuJ",p="tabItem_LNqP";function c(e){var t,n,l=e.lazy,c=e.block,u=e.defaultValue,f=e.values,y=e.groupId,h=e.className,b=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),g=null!=f?f:b.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),x=(0,i.l)(g,(function(e,t){return e.value===t.value}));if(x.length>0)throw new Error('Docusaurus error: Duplicate values "'+x.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var N=null===u?u:null!=(t=null!=u?u:null==(n=b.find((function(e){return e.props.default})))?void 0:n.props.value)?t:b[0].props.value;if(null!==N&&!g.some((function(e){return e.value===N})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+N+'" but none of its children has the corresponding value. Available values are: '+g.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var v=(0,m.U)(),k=v.tabGroupChoices,O=v.setTabGroupChoices,P=(0,r.useState)(N),w=P[0],C=P[1],S=[],T=(0,d.o5)().blockElementScrollPositionUntilNextRender;if(null!=y){var E=k[y];null!=E&&E!==w&&g.some((function(e){return e.value===E}))&&C(E)}var j=function(e){var t=e.currentTarget,n=S.indexOf(t),a=g[n].value;a!==w&&(T(t),C(a),null!=y&&O(y,String(a)))},D=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a,r=S.indexOf(e.currentTarget)+1;n=null!=(a=S[r])?a:S[0];break;case"ArrowLeft":var o,l=S.indexOf(e.currentTarget)-1;n=null!=(o=S[l])?o:S[S.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:(0,o.Z)("tabs-container",s)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":c},h)},g.map((function(e){var t=e.value,n=e.label,l=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:function(e){return S.push(e)},onKeyDown:D,onFocus:j,onClick:j},l,{className:(0,o.Z)("tabs__item",p,null==l?void 0:l.className,{"tabs__item--active":w===t})}),null!=n?n:t)}))),l?(0,r.cloneElement)(b.filter((function(e){return e.props.value===w}))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},b.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==w})}))))}function u(e){var t=(0,l.default)();return r.createElement(c,(0,a.Z)({key:String(t)},e))}},7772:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(83117),r=n(67294),o=n(23746),l=n(7694),i=n(13618),m="0.42.0",d="0.43.0-SNAPSHOT",s="0.10.4",p="0.142.0",c=n(86668);const u=function(e){var t=e.language,n=e.code.replace(/{{site.lithoVersion}}/g,m).replace(/{{site.soloaderVersion}}/g,s).replace(/{{site.lithoSnapshotVersion}}/g,d).replace(/{{site.flipperVersion}}/g,p).trim(),u=(0,c.L)().isDarkTheme?i.Z:l.Z;return r.createElement(o.ZP,(0,a.Z)({},o.lG,{code:n,language:t,theme:u}),(function(e){var t=e.className,n=e.style,a=e.tokens,o=e.getLineProps,l=e.getTokenProps;return r.createElement("pre",{className:t,style:n},a.map((function(e,t){return r.createElement("div",o({line:e,key:t}),e.map((function(e,t){return r.createElement("span",l({token:e,key:t}))})))})))}))}},83614:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>m,default:()=>u,frontMatter:()=>i,metadata:()=>d,toc:()=>p});var a=n(83117),r=n(80102),o=(n(67294),n(3905)),l=(n(65488),n(85162),n(7772),["components"]),i={id:"mountable-cheatsheet",title:"Cheatsheet"},m=void 0,d={unversionedId:"mountablecomponents/mountable-cheatsheet",id:"mountablecomponents/mountable-cheatsheet",title:"Cheatsheet",description:"The following cheatsheet provides a set of links for the migration of individual aspects of existing code from the Java Spec API to Kotlin API.",source:"@site/../docs/mountablecomponents/mountable-cheatsheet.mdx",sourceDirName:"mountablecomponents",slug:"/mountablecomponents/mountable-cheatsheet",permalink:"/docs/mountablecomponents/mountable-cheatsheet",draft:!1,editUrl:"https://github.com/facebook/litho/edit/master/website/../docs/mountablecomponents/mountable-cheatsheet.mdx",tags:[],version:"current",frontMatter:{id:"mountable-cheatsheet",title:"Cheatsheet"}},s={},p=[],c={toc:p};function u(e){var t=e.components,n=(0,r.Z)(e,l);return(0,o.mdx)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.mdx)("admonition",{type:"note"},(0,o.mdx)("p",{parentName:"admonition"},"The following cheatsheet provides a set of links for the migration of individual aspects of existing code from the Java Spec API to Kotlin API.")),(0,o.mdx)("table",null,(0,o.mdx)("thead",{parentName:"table"},(0,o.mdx)("tr",{parentName:"thead"},(0,o.mdx)("th",{parentName:"tr",align:"left"},"Java Spec API"),(0,o.mdx)("th",{parentName:"tr",align:"left"},"Kotlin API Link"))),(0,o.mdx)("tbody",{parentName:"table"},(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@LayoutSpec"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics"},"KComponent and Props"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnCreateLayout"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics"},"ComponentScope.render()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnCreateTransition"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/hooks-for-spec-developers#usetransition"},"useTransition()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnCreateInitialState / @OnUpdateState"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mainconcepts/use-state"},"useState()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"Lazy State"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mainconcepts/use-ref"},"useRef()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnError"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mainconcepts/use-error-boundary"},"useErrorBoundary()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnAttached / @OnDetached"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mainconcepts/use-effect"},"useEffect()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnEvent"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/event-handling"},"Event Handling"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnCalculateCachedValue"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"https://fburl.com/code/s2xoyg3o"},"useCached()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@TreeProp"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics#treeprops"},"getTreeProp()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnCreateTreeProp"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics#treeprops"},"TreePropProvider"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"Common Props"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics#common-props"},"Style"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@InjectProp"),(0,o.mdx)("td",{parentName:"tr",align:"left"},"Use Ultralight, the ",(0,o.mdx)("a",{parentName:"td",href:"https://www.internalfb.com/intern/wiki/Ultralight/Static_Injector/"},"New API"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"Column.create(context)"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-flexbox-containers"},"Column()"),"; see ",(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-flexbox-containers#flexbox-properties-cheatsheet"},"Flexbox Properties Cheatsheet"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"Row.create(context)"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-flexbox-containers"},"Row()"),"; see ",(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-flexbox-containers#flexbox-properties-cheatsheet"},"Flexbox Properties Cheatsheet"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"Manual Keys"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mainconcepts/coordinate-state-actions/keys-and-identity#assigning-manual-keys"},"key()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"Handle"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics#handles"},"handle()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnCreateLayoutWithSizeSpec"),(0,o.mdx)("td",{parentName:"tr",align:"left"},"Not yet supported. Suggested ",(0,o.mdx)("a",{parentName:"td",href:"/docs/custom-layout#kotlin-integration"},"workaround"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@MountSpec / @GroupSectionSpec"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mountablecomponents/overview"},"MountableComponent()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnTrigger"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mountablecomponents/mountable-controllers"},"Controllers pattern"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnBind / @OnUnbind"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"https://fburl.com/code/hwshbday"},"mount() / unmount()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnMount / @OnUnmount"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"https://fburl.com/code/hwshbday"},"mount() / unmount()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnBindDynamicValue"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mountablecomponents/mountable-bindto"},"BindTo - Dynamic Values API"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@ShouldUpdate"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mountablecomponents/mountable-component"},"shouldUpdate()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnCreateMountContent"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"https://fburl.com/code/i19c5dl7"},"createContent()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnCreateMountContentPool"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"https://fburl.com/code/r3paekuj"},"ContentAllocator API"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnMeasure"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mountablecomponents/mountable-measuring"},"measure()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnBoundsDefined"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mountablecomponents/mountable-measuring"},"measure()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnPrepare"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mountablecomponents/mountable-component"},"MountableComponentScope.render()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnLoadStyle"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"/docs/mountablecomponents/mountable-component"},"MountableComponentScope.render()"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@GetExtraAccessibilityNodeAt"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"https://fburl.com/code/3ikzp6c7"},"AccessibilityStyles")," (see: ",(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics#common-props"},"Style")," )")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@GetExtraAccessibilityNodesCount"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"https://fburl.com/code/3ikzp6c7"},"AccessibilityStyles")," (see: ",(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics#common-props"},"Style")," )")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnPopulateAccessibilityNode"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"https://fburl.com/code/3ikzp6c7"},"AccessibilityStyles")," (see: ",(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics#common-props"},"Style")," )")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:"left"},"@OnPopulateExtraAccessibilityNode"),(0,o.mdx)("td",{parentName:"tr",align:"left"},(0,o.mdx)("a",{parentName:"td",href:"https://fburl.com/code/3ikzp6c7"},"AccessibilityStyles")," (see: ",(0,o.mdx)("a",{parentName:"td",href:"/docs/kotlin/kotlin-api-basics#common-props"},"Style")," )")))))}u.isMDXComponent=!0},23746:(e,t,n)=>{n.d(t,{ZP:()=>f,lG:()=>l});var a=n(87410);const r={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var o=n(67294),l={Prism:a.Z,theme:r};function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(){return m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},m.apply(this,arguments)}var d=/\r\n|\r|\n/,s=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},p=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},c=function(e,t){var n=e.plain,a=Object.create(null),r=e.styles.reduce((function(e,n){var a=n.languages,r=n.style;return a&&!a.includes(t)||n.types.forEach((function(t){var n=m({},e[t],r);e[t]=n})),e}),a);return r.root=n,r.plain=m({},n,{backgroundColor:null}),r};function u(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}const f=function(e){function t(){for(var t=this,n=[],a=arguments.length;a--;)n[a]=arguments[a];e.apply(this,n),i(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?c(e.theme,e.language):void 0;return t.themeDict=n})),i(this,"getLineProps",(function(e){var n=e.key,a=e.className,r=e.style,o=m({},u(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(o.style=l.plain),void 0!==r&&(o.style=void 0!==o.style?m({},o.style,r):r),void 0!==n&&(o.key=n),a&&(o.className+=" "+a),o})),i(this,"getStyleForToken",(function(e){var n=e.types,a=e.empty,r=n.length,o=t.getThemeDict(t.props);if(void 0!==o){if(1===r&&"plain"===n[0])return a?{display:"inline-block"}:void 0;if(1===r&&!a)return o[n[0]];var l=a?{display:"inline-block"}:{},i=n.map((function(e){return o[e]}));return Object.assign.apply(Object,[l].concat(i))}})),i(this,"getTokenProps",(function(e){var n=e.key,a=e.className,r=e.style,o=e.token,l=m({},u(e,["key","className","style","token"]),{className:"token "+o.types.join(" "),children:o.content,style:t.getStyleForToken(o),key:void 0});return void 0!==r&&(l.style=void 0!==l.style?m({},l.style,r):r),void 0!==n&&(l.key=n),a&&(l.className+=" "+a),l})),i(this,"tokenize",(function(e,t,n,a){var r={code:t,grammar:n,language:a,tokens:[]};e.hooks.run("before-tokenize",r);var o=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),o}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,a=e.code,r=e.children,o=this.getThemeDict(this.props),l=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],a=[0],r=[e.length],o=0,l=0,i=[],m=[i];l>-1;){for(;(o=a[l]++)<r[l];){var c=void 0,u=t[l],f=n[l][o];if("string"==typeof f?(u=l>0?u:["plain"],c=f):(u=p(u,f.type),f.alias&&(u=p(u,f.alias)),c=f.content),"string"==typeof c){var y=c.split(d),h=y.length;i.push({types:u,content:y[0]});for(var b=1;b<h;b++)s(i),m.push(i=[]),i.push({types:u,content:y[b]})}else l++,t.push(u),n.push(c),a.push(0),r.push(c.length)}l--,t.pop(),n.pop(),a.pop(),r.pop()}return s(i),m}(void 0!==l?this.tokenize(t,a,l,n):[a]),className:"prism-code language-"+n,style:void 0!==o?o.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(o.Component)},13618:(e,t,n)=>{n.d(t,{Z:()=>a});const a={plain:{color:"#F8F8F2",backgroundColor:"#282A36"},styles:[{types:["prolog","constant","builtin"],style:{color:"rgb(189, 147, 249)"}},{types:["inserted","function"],style:{color:"rgb(80, 250, 123)"}},{types:["deleted"],style:{color:"rgb(255, 85, 85)"}},{types:["changed"],style:{color:"rgb(255, 184, 108)"}},{types:["punctuation","symbol"],style:{color:"rgb(248, 248, 242)"}},{types:["string","char","tag","selector"],style:{color:"rgb(255, 121, 198)"}},{types:["keyword","variable"],style:{color:"rgb(189, 147, 249)",fontStyle:"italic"}},{types:["comment"],style:{color:"rgb(98, 114, 164)"}},{types:["attr-name"],style:{color:"rgb(241, 250, 140)"}}]}},7694:(e,t,n)=>{n.d(t,{Z:()=>a});const a={plain:{color:"#393A34",backgroundColor:"#f6f8fa"},styles:[{types:["comment","prolog","doctype","cdata"],style:{color:"#999988",fontStyle:"italic"}},{types:["namespace"],style:{opacity:.7}},{types:["string","attr-value"],style:{color:"#e3116c"}},{types:["punctuation","operator"],style:{color:"#393A34"}},{types:["entity","url","symbol","number","boolean","variable","constant","property","regex","inserted"],style:{color:"#36acaa"}},{types:["atrule","keyword","attr-name","selector"],style:{color:"#00a4db"}},{types:["function","deleted","tag"],style:{color:"#d73a49"}},{types:["function-variable"],style:{color:"#6f42c1"}},{types:["tag","selector","keyword"],style:{color:"#00009f"}}]}}}]);