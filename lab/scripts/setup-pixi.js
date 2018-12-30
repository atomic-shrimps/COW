define((require)=>new Promise((resolve,reject)=>{
    var app = new PIXI.Application();
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.left = "0px";
    app.renderer.view.style.top = "0px";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(app.view);
    resolve();
}))