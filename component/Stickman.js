(function(arg={}){
    Component.call(this,[
        this.man=new Player({
            pack:[
                "pack/COW/COW_ske.dbbin",
                "pack/COW/COW_tex.json",
                "pack/COW/COW_tex.png"
                ],
            proj:"COW",
            arm:!arg.arm?"Stickman":arg.arm,
            code:!arg.code?'wasd':arg.code,
            anim:!arg.anim?["Idle","Walk","JumpStart","JumpEnd","WalkJumpStart","WalkJumpEnd","Attack"]:arg.anim
        })
    ])
    this.start=function(){
        this.addChild(this.man);
    }
})