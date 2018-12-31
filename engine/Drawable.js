function Drawable(arg={}){ // src[,frame]
    Container.call(this,arg,true);
    var onTextureLoad=(_,resources)=>{
        var texture;
        if(resources[arg.src].spritesheet){
            var sheet=resources[arg.src].spritesheet;
            var frame=arg.frame?arg.frame:sheet.textures[Object.keys(sheet.textures)[0]]
            texture=sheet.textures[frame];
        }
        else texture=resources[arg.src].texture;
        this.view=new PIXI.Sprite(texture);
        this.notifyIsReady(this);
    }
    if(!PIXI.loader.resources[arg.src])PIXI.loader.add(arg.src).load(onTextureLoad);
    else PIXI.loader.once("complete",onTextureLoad);
}