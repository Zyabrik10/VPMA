let e,n,t,r=[],l,i;function u(e,n,t){let r=t.findIndex(n=>e===n);if(-1!==r){t.splice(r,1),t.push(e);return}let l=n.indexOf(null);if(-1!==l){t.push(e),n[l]=e;return}let i=n.indexOf(t[0]);n[i]=e,t.shift(),t.push(e)}function d(e,n,t){if(-1!==n.indexOf(e))return;let r=n.indexOf(null);if(-1!==r){t.push(e),n[r]=e;return}let l=n.indexOf(t[0]);n[l]=e,t.shift(),t.push(e)}function f(){l=0,i.innerText=l,n.innerHTML="",t.innerHTML="",r=[];let f=e.alg.value.toLowerCase().trim(),o=e.mem.value.toLowerCase().trim(),c=e.input.value.trim().split(" ").map(e=>+e),s=function(e){let n=[];for(let t=0;t<e;t++)n[t]=null;return n}(o),a=[],p=function(e){switch(e){case"fifo":return d;case"lru":return u}}(f);!function(e){e.forEach(e=>{let n=document.createElement("tr");n.innerHTML=`<td>${e}</td>`,t.append(n)})}(c);for(let e=0;e<c.length;e++){let t=+c[e];p?p(t,s,a):function(e,n,t,r,l){if(-1!==n.indexOf(e))return;let i=n.indexOf(null);if(-1!==i){t.push(e),n[i]=e;return}let u=[],d=0;for(let t=l;t<r.length;t++)if(r[t]!==e&&-1!==n.findIndex(e=>e===r[t])&&-1===u.findIndex(e=>e===r[t])&&u.push(r[t]),u.length===n.length){d=n.findIndex(e=>e===u[u.length-1]);break}if(u.length===n.length){n[d]=e,console.log(n,u);return}let f=n.findIndex(e=>n.filter(e=>-1===u.findIndex(n=>e===n))[0]===e);n[f]=e}(t,s,a,c,e),function(e){let t=document.createElement("tr");t.innerHTML=e.map(e=>{let n=-1!==r.findIndex(n=>n===e);return null===e&&(e="",n=!0),!n&&l++,`<td class="${n?"":"isOld"}">${e}</td>`}).join(""),n.append(t)}(s),r="opt"!==f?[...a]:[...s]}i.innerText=l}window.addEventListener("load",()=>{e=document.querySelector(".form"),n=document.querySelector(".output"),i=document.querySelector(".stron-data"),t=document.querySelector(".output-seq"),f(),e.addEventListener("submit",e=>{e.preventDefault(),f()})});
//# sourceMappingURL=index.e6e6f72f.js.map
