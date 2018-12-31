function PixiWorld(arg,asyncloaded=false)
{
	Container.call(this,arg);

	this.display = new PIXI.Application();
	var display=this.display;
	
	display.renderer.view.style.position = "absolute";
	display.renderer.view.style.left = "0px";
	display.renderer.view.style.top = "0px";
	display.renderer.view.style.display = "block";
	display.renderer.autoResize = true;
	display.renderer.backgroundColor = 0xffffff;
	display.renderer.resize(window.innerWidth, window.innerHeight);

	document.body.appendChild(display.view);
	this.view=this.display.stage;

	display.renderer.on("prerender",((self)=>()=>self.trigger("prerender",{}))(this));
	display.renderer.on("postrender",((self)=>()=>self.trigger("postrender",{}))(this));
	window.addEventListener("keydown",((self)=>(e)=>self.trigger("keydown",e))(this));
	window.addEventListener("keyup",((self)=>(e)=>self.trigger("keyup",e))(this));
}