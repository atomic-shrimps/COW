function Component(asyncAtoms,arg={}){ // src[,frame]
    Container.call(this,arg,true);
    this.start=()=>{}
    this.update=()=>{}
    this.ready.then(()=>this.start());
    this.on("postrender",()=>this.update());
    Promise.all(asyncAtoms.map(x=>x.ready)).then(()=>this.notifyIsReady());
}
Component.parse=(js)=>eval(js)
Component.load=(url)=>new Promise((resolve,reject)=>{
    $.get(url).then(data=>{
        resolve(eval(data))
    },error=>{
        console.error("ComponentLoader:",error)
        reject(error);
    })
})