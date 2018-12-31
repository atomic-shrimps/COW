function Component(asyncAtoms,arg={}){ // src[,frame]
    Container.call(this,arg,true);
    this.start=()=>{}
    this.update=()=>{}
    this.ready.then(()=>this.start());
    this.on("postrender",()=>this.update());
    Promise.all(asyncAtoms.map(x=>x.ready)).then(()=>this.notifyIsReady());
}
Component.parse=(js)=>eval(js)
Component.load=(urls)=>new Promise((resolve,reject)=>{
    var components=[];
    if(typeof(url)=="string")urls=[urls];
    urls.forEach(url=>Semaphore.wait("component-ajax",done=>{
        $.get(url).then(data=>{
            components.push(eval(data));
            done();
        },error=>{
            console.error("ComponentLoader:",error)
            components.push(null);
            done();
        })
    }))
    Semaphore.wait("component-ajax",done=>{
        if(components.length==1)resolve(components[0])
        else resolve(components);
    })    
})