define((require)=>new Promise((resolve,reject)=>{
    PIXI.loader
    .add("images/dragon-test_ske.json")
    .load((loader, resources)=>{
        
        resolve()
    });
}))