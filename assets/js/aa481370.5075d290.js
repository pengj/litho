"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3707],{3905:(e,n,t)=>{t.r(n),t.d(n,{MDXContext:()=>s,MDXProvider:()=>p,mdx:()=>f,useMDXComponents:()=>m,withMDXComponents:()=>d});var l=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(){return a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var l in t)Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l])}return e},a.apply(this,arguments)}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,l,o=function(e,n){if(null==e)return{};var t,l,o={},a=Object.keys(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=l.createContext({}),d=function(e){return function(n){var t=m(n.components);return l.createElement(e,a({},n,{components:t}))}},m=function(e){var n=l.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},p=function(e){var n=m(e.components);return l.createElement(s.Provider,{value:n},e.children)},h={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},u=l.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=m(t),p=o,u=d["".concat(i,".").concat(p)]||d[p]||h[p]||a;return t?l.createElement(u,r(r({ref:n},s),{},{components:t})):l.createElement(u,r({ref:n},s))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=u;var r={};for(var c in n)hasOwnProperty.call(n,c)&&(r[c]=n[c]);r.originalType=e,r.mdxType="string"==typeof e?e:o,i[1]=r;for(var s=2;s<a;s++)i[s]=t[s];return l.createElement.apply(null,i)}return l.createElement.apply(null,t)}u.displayName="MDXCreateElement"},73448:(e,n,t)=>{t.r(n),t.d(n,{frontMatter:()=>r,contentTitle:()=>c,metadata:()=>s,toc:()=>d,default:()=>p});var l=t(87462),o=t(63366),a=(t(67294),t(3905)),i=["components"],r={id:"lazycollections-interactions",title:"Interactions"},c=void 0,s={unversionedId:"kotlin/lazycollections/lazycollections-interactions",id:"kotlin/lazycollections/lazycollections-interactions",isDocsHomePage:!1,title:"Interactions",description:"Scrolling the Lazy Collection",source:"@site/../docs/kotlin/lazycollections/lazycollections-interactions.mdx",sourceDirName:"kotlin/lazycollections",slug:"/kotlin/lazycollections/lazycollections-interactions",permalink:"/docs/kotlin/lazycollections/lazycollections-interactions",editUrl:"https://github.com/facebook/litho/edit/master/website/../docs/kotlin/lazycollections/lazycollections-interactions.mdx",tags:[],version:"current",frontMatter:{id:"lazycollections-interactions",title:"Interactions"}},d=[{value:"Scrolling the Lazy Collection",id:"scrolling-the-lazy-collection",children:[],level:2},{value:"Responding to Scroll Events",id:"responding-to-scroll-events",children:[],level:2},{value:"Paging",id:"paging",children:[],level:2},{value:"Pull to refresh",id:"pull-to-refresh",children:[],level:2}],m={toc:d};function p(e){var n=e.components,t=(0,o.Z)(e,i);return(0,a.mdx)("wrapper",(0,l.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,a.mdx)("h2",{id:"scrolling-the-lazy-collection"},"Scrolling the Lazy Collection"),(0,a.mdx)("p",null,"Scrolling the lazy collection by a given distance, or to a child with a given index/id, is a two-step process:"),(0,a.mdx)("ol",null,(0,a.mdx)("li",{parentName:"ol"},"Create a ",(0,a.mdx)("inlineCode",{parentName:"li"},"LazyCollectionController")," and attach it to the lazy collection via the ",(0,a.mdx)("inlineCode",{parentName:"li"},"lazyCollectionController")," parameter. Note that it should be defined in a ",(0,a.mdx)("inlineCode",{parentName:"li"},"useState")," hook."),(0,a.mdx)("li",{parentName:"ol"},"Use one of the ",(0,a.mdx)("inlineCode",{parentName:"li"},"LazyCollectionController"),"\u2019s scroll functions.")),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-kotlin",metastring:"file=sample/src/main/java/com/facebook/samples/litho/kotlin/collection/Interactions.kt start=start_scrolling_example end=end_scrolling_example",file:"sample/src/main/java/com/facebook/samples/litho/kotlin/collection/Interactions.kt",start:"start_scrolling_example",end:"end_scrolling_example"},'class ScrollingExample() : KComponent() {\n\n  override fun ComponentScope.render(): Component {\n    val controller = useState { LazyCollectionController() }.value\n\n    // Use one of these lambdas to scroll, e.g. in an onClick callback\n    val scrollToTenth = controller.scrollToIndex(10)\n    val smoothScrollToEnd = controller.smoothScrollToId("End")\n\n    return LazyList(\n        lazyCollectionController = controller,\n    ) {\n      children(items = (0..20), id = { it }) { Text("$it") }\n      child(id = "End", component = Text("End"))\n    }\n  }\n}\n')),(0,a.mdx)("h2",{id:"responding-to-scroll-events"},"Responding to Scroll Events"),(0,a.mdx)("p",null,"An ",(0,a.mdx)("a",{parentName:"p",href:"https://github.com/facebook/litho/blob/master/litho-widget-kotlin/src/main/kotlin/com/facebook/litho/widget/collection/OnNearCallback.kt"},"OnNearCallback")," can be applied to the lazy collection's ",(0,a.mdx)("inlineCode",{parentName:"p"},"onNearEnd")," parameter, or a child's ",(0,a.mdx)("inlineCode",{parentName:"p"},"onNearViewport")," parameter. For example, ",(0,a.mdx)("inlineCode",{parentName:"p"},"onNearEnd = OnNearCallback(offset = 10) { /* callback */ }"),"."),(0,a.mdx)("ul",null,(0,a.mdx)("li",{parentName:"ul"},(0,a.mdx)("inlineCode",{parentName:"li"},"onNearEnd")," is invoked when the lazy collection is scrolled to the last position or is scrolled within ",(0,a.mdx)("inlineCode",{parentName:"li"},"offset")," items away."),(0,a.mdx)("li",{parentName:"ul"},(0,a.mdx)("inlineCode",{parentName:"li"},"onNearViewport")," is invoked when the child enters the viewport or is ",(0,a.mdx)("inlineCode",{parentName:"li"},"offset")," items away.")),(0,a.mdx)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.mdx)("div",{parentName:"div",className:"admonition-heading"},(0,a.mdx)("h5",{parentName:"div"},(0,a.mdx)("span",{parentName:"h5",className:"admonition-icon"},(0,a.mdx)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.mdx)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.mdx)("div",{parentName:"div",className:"admonition-content"},(0,a.mdx)("p",{parentName:"div"},"For more complex scroll handling (such as for animations), you can access the ",(0,a.mdx)("inlineCode",{parentName:"p"},"RecyclerView")," directly via a ",(0,a.mdx)("inlineCode",{parentName:"p"},"LazyCollectionController")," and use a ",(0,a.mdx)("inlineCode",{parentName:"p"},"RecyclerView.OnScrollListener")," to receive callbacks during scroll:"),(0,a.mdx)("ol",{parentName:"div"},(0,a.mdx)("li",{parentName:"ol"},"Create a ",(0,a.mdx)("inlineCode",{parentName:"li"},"LazyCollectionController")," and attach it to the lazy collection via the ",(0,a.mdx)("inlineCode",{parentName:"li"},"lazyCollectionController")," parameter. Note that it should be defined in a ",(0,a.mdx)("inlineCode",{parentName:"li"},"useState")," hook."),(0,a.mdx)("li",{parentName:"ol"},"Access the ",(0,a.mdx)("inlineCode",{parentName:"li"},"RecyclerView")," via ",(0,a.mdx)("inlineCode",{parentName:"li"},"LazyCollectionController.recyclerView")),(0,a.mdx)("li",{parentName:"ol"},"Add a custom ",(0,a.mdx)("inlineCode",{parentName:"li"},"OnScrollListener")," using ",(0,a.mdx)("inlineCode",{parentName:"li"},"RecyclerView.addOnScrollListener(..)"))))),(0,a.mdx)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.mdx)("div",{parentName:"div",className:"admonition-heading"},(0,a.mdx)("h5",{parentName:"div"},(0,a.mdx)("span",{parentName:"h5",className:"admonition-icon"},(0,a.mdx)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.mdx)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.mdx)("div",{parentName:"div",className:"admonition-content"},(0,a.mdx)("p",{parentName:"div"},"It is currently unsafe to trigger a scroll event inside a ",(0,a.mdx)("inlineCode",{parentName:"p"},"useEffect")," callback as it will be invoked before the lazy collection's contents have been mounted.\nTo trigger a scroll immediately on entering a screen, use the ",(0,a.mdx)("inlineCode",{parentName:"p"},"LazyCollection"),"'s ",(0,a.mdx)("inlineCode",{parentName:"p"},"onDataBound")," callback."))),(0,a.mdx)("h2",{id:"paging"},"Paging"),(0,a.mdx)("p",null,"Lists of data are often retrieved from the server in pages; additional data is requested only if the user scrolls. To achieve this behaviour, add a callback to the lazy collection\u2019s ",(0,a.mdx)("inlineCode",{parentName:"p"},"onNearEnd")," parameter that fetches more data. This will be triggered when the lazy collection is scrolled near to the end. Optionally, add a request indicator to the bottom of the list."),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-kotlin",metastring:"file=sample/src/main/java/com/facebook/samples/litho/kotlin/collection/PaginationCollectionKComponent.kt start=start_example end=end_example",file:"sample/src/main/java/com/facebook/samples/litho/kotlin/collection/PaginationCollectionKComponent.kt",start:"start_example",end:"end_example"},"class PagedExample(private val pagedList: PaginatedList<Item>) : KComponent() {\n  override fun ComponentScope.render(): Component =\n      LazyList(\n          onNearEnd = OnNearCallback { if (pagedList.hasNextPage) pagedList.fetchNextPage() },\n      ) {\n        // Add the retrieved items\n        children(items = pagedList.list, id = { it.id }) { Text(it.text) }\n\n        // Optionally add a progress spinner\n        if (pagedList.hasNextPage) {\n          child(ProgressSpinner())\n        }\n      }\n}\n")),(0,a.mdx)("h2",{id:"pull-to-refresh"},"Pull to refresh"),(0,a.mdx)("p",null,"To implement 'pull to refresh' behaviour, provide a callback to the lazy collection's ",(0,a.mdx)("inlineCode",{parentName:"p"},"onPullToRefresh")," parameter. This callback will be responsible for fetching fresh data."),(0,a.mdx)("p",null,"To dismiss the refreshing indicator:"),(0,a.mdx)("ol",null,(0,a.mdx)("li",{parentName:"ol"},"Create a ",(0,a.mdx)("inlineCode",{parentName:"li"},"LazyCollectionController")," and attach it to the lazy collection via the ",(0,a.mdx)("inlineCode",{parentName:"li"},"lazyCollectionController")," parameter. Note that it should be defined in a ",(0,a.mdx)("inlineCode",{parentName:"li"},"useState")," hook."),(0,a.mdx)("li",{parentName:"ol"},"Call ",(0,a.mdx)("inlineCode",{parentName:"li"},"LazyCollectionController.clearRefreshing()"),".")),(0,a.mdx)("pre",null,(0,a.mdx)("code",{parentName:"pre",className:"language-kotlin",metastring:"file=sample/src/main/java/com/facebook/samples/litho/kotlin/collection/Interactions.kt start=start_pull_to_refresh_example end=end_pull_to_refresh_example",file:"sample/src/main/java/com/facebook/samples/litho/kotlin/collection/Interactions.kt",start:"start_pull_to_refresh_example",end:"end_pull_to_refresh_example"},"class PullToRefreshExample(\n    val data: List<String>,\n    val refresh: () -> Unit,\n) : KComponent() {\n\n  override fun ComponentScope.render(): Component {\n    val controller = useState { LazyCollectionController() }.value\n    return LazyList(\n        lazyCollectionController = controller,\n        onPullToRefresh = {\n          refresh()\n          controller.clearRefreshing()\n        },\n    ) { /* Add children */}\n  }\n}\n")))}p.isMDXComponent=!0}}]);