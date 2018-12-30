var display = new PIXI.Application();
display.renderer.view.style.position = "absolute";
display.renderer.view.style.left = "0px";
display.renderer.view.style.top = "0px";
display.renderer.view.style.display = "block";
display.renderer.autoResize = true;
display.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(display.view);