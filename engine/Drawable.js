function Drawable(arg={}){ // src[,frame]
    Atom.call(this,arg,true);
    this.sprite=null;
    this.transform=null;
    this.ready
        .then(()=>{
            this.transform=new Proxy({},{
                get:(_,prop)=>this.sprite.transform[prop],
                set:(_,prop,value)=>this.sprite.transform[prop]=value
            })
            this.pos=new Proxy({},{
                get:(_,prop)=>this.sprite.transform.position[prop],
                set:(_,prop,value)=>this.sprite.transform.position[prop]=value
            })
        })
        .then(()=>this.trigger_ex("ready"))

    this.evt={
        addTo:[(parent)=>{
            this.ready.then(()=>{
                if(!parent.atomic)parent.addChild(this.sprite);
            })
        }],
        removeFrom:[(parent)=>{
            this.ready.then(()=>{
                if(!parent.atomic)parent.removeChild(this.sprite);
            })
        }],
        addChild:[(child)=>{
            this.ready.then(()=>{
                if(child.atomic)child.ready.then(()=>this.sprite.addChild(child.sprite))
                else this.sprite.addChild(child)
            })
        }],
        removeChild:[(child)=>{
            this.ready.then(()=>{
                if(child.atomic)child.ready.then(()=>this.sprite.removeChild(child.sprite))
                else this.sprite.removeChild(child)
            })
        }]
    }

    var onTextureLoad=(_,resources)=>{
        var texture;
        if(resources[arg.src].spritesheet){
            var sheet=resources[arg.src].spritesheet;
            var frame=arg.frame?arg.frame:sheet.textures[Object.keys(sheet.textures)[0]]
            texture=sheet.textures[frame];
        }
        else texture=resources[arg.src].texture;
        this.sprite=new PIXI.Sprite(texture);
        this.notifyIsReady(this);
    }
    if(!PIXI.loader.resources[arg.src])PIXI.loader.add(arg.src).load(onTextureLoad);
    else PIXI.loader.once("complete",onTextureLoad);
}