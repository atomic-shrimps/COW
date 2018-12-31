function Container(arg={},asyncLoaded=false){ // src[,frame]
    Atom.call(this,arg,asyncLoaded);
    this.view=new PIXI.Container();
    this.transform=null;
    this.ready
        .then(()=>{
            this.transform=new Proxy({},{
                get:(_,prop)=>this.view.transform[prop],
                set:(_,prop,value)=>this.view.transform[prop]=value
            })
            this.pos=new Proxy({},{
                get:(_,prop)=>this.view.transform.position[prop],
                set:(_,prop,value)=>this.view.transform.position[prop]=value
            })
        })
        .then(()=>this.trigger_ex("ready"))

    this.evt={
        addTo:[(parent)=>{
            this.ready.then(()=>{
                if(!parent.atomic)parent.addChild(this.view);
            })
        }],
        removeFrom:[(parent)=>{
            this.ready.then(()=>{
                if(!parent.atomic)parent.removeChild(this.view);
            })
        }],
        addChild:[(child)=>{
            this.ready.then(()=>{
                if(child.atomic)child.ready.then(()=>this.view.addChild(child.view))
                else this.view.addChild(child)
            })
        }],
        removeChild:[(child)=>{
            this.ready.then(()=>{
                if(child.atomic)child.ready.then(()=>this.view.removeChild(child.view))
                else this.view.removeChild(child)
            })
        }]
    }
    if(!asyncLoaded)this.notifyIsReady(this);
}