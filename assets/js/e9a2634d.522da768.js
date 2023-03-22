"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9195],{3905:(e,t,n)=>{n.r(t),n.d(t,{MDXContext:()=>p,MDXProvider:()=>u,mdx:()=>y,useMDXComponents:()=>l,withMDXComponents:()=>m});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),m=function(e){return function(t){var n=l(t.components);return r.createElement(e,o({},t,{components:n}))}},l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=l(n),u=a,d=m["".concat(i,".").concat(u)]||m[u]||f[u]||o;return n?r.createElement(d,s(s({ref:t},p),{},{components:n})):r.createElement(d,s({ref:t},p))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=b;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[d]="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}b.displayName="MDXCreateElement"},63004:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>c,default:()=>f,frontMatter:()=>s,metadata:()=>p,toc:()=>l});var r=n(87462),a=n(63366),o=(n(67294),n(3905)),i=["components"],s={id:"immutability",title:"Immutability"},c=void 0,p={unversionedId:"best-practices/immutability",id:"best-practices/immutability",title:"Immutability",description:"Components are essentially functions that receive data as parameters and are immutable (cannot be changed). When the props or state of a component change, the framework will create a new component instance with the updated information, because the previous component cannot be mutated.",source:"@site/../docs/best-practices/immutability.md",sourceDirName:"best-practices",slug:"/best-practices/immutability",permalink:"/docs/best-practices/immutability",draft:!1,editUrl:"https://github.com/facebook/litho/edit/master/website/../docs/best-practices/immutability.md",tags:[],version:"current",frontMatter:{id:"immutability",title:"Immutability"},sidebar:"mainSidebar",previous:{title:"Flipper Plugins",permalink:"/docs/devtools/flipper-plugins"},next:{title:"Props vs. State",permalink:"/docs/best-practices/props-vs-state"}},m={},l=[],u={toc:l},d="wrapper";function f(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.mdx)(d,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.mdx)("p",null,"Components are essentially functions that receive data as parameters and are immutable (cannot be changed). When the props or state of a component change, the framework will create a new component instance with the updated information, because the previous component cannot be mutated."),(0,o.mdx)("p",null,"While the component itself is immutable, it is easy to make it not thread safe by using mutable objects for props and state. Litho computes ",(0,o.mdx)("a",{parentName:"p",href:"/docs/asynchronous-layout"},"layout on a background thread"),", and if the objects that make up a component's props or state are mutated from another thread, then this may result in rendering different outputs for the same component."),(0,o.mdx)("admonition",{title:"Best Practice",type:"note"},(0,o.mdx)("p",{parentName:"admonition"},"Props and state must be kept as either primitive types (which are inherently immutable), or, if it's not possible to use a primitive type, an alternative that is also immutable.")))}f.isMDXComponent=!0}}]);