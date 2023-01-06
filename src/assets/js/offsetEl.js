export function getOffset(el){
    const offsetEl = el.getBoundingClientRect()
     return{
         top : offsetEl.top,
         left : offsetEl.left,
         width : offsetEl.width,
         height : offsetEl.height
     }
 }