var pixi = new PIXI.Application();
pixi.renderer.backgroundColor = 0xffffff;
pixi.renderer.view.style.position = "absolute";
pixi.renderer.view.style.left = "0px";
pixi.renderer.view.style.top = "0px";
pixi.renderer.view.style.display = "block";
pixi.renderer.autoResize = true;
pixi.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(pixi.view);