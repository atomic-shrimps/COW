(function(arg={}){
    Component.call(this,[
        this.man=new Player({
            pack:[
                "pack/COW/COW_ske.dbbin",
                "pack/COW/COW_tex.json",
                "pack/COW/COW_tex.png"
                ],
            proj:"COW",
            arm:"Stickman",
            code:!arg.code?'wasd':arg.code
        })
    ])
    this.start=function(){
        this.addChild(this.man);
    }
})