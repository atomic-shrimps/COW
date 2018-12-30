var packs=[];

function Pack(arg={})
{
	this.res=arg.res;
	packs.push(this.res);
}

function PixiWorld(arg)
{
	Atom.call(this,arg);

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

	const binaryOptions = { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER };

	packs.forEach(pack=>{
		for (const resource of pack) {
			if (resource.indexOf("dbbin") > 0) {
				PIXI.loader.add(resource, resource, binaryOptions);
			}
			else {
				PIXI.loader.add(resource, resource);
			}
		}
	});
	this.sprite=this.display.stage;
	PIXI.loader.once("complete", (loader, resources) => {
		this.trigger("resourceLoad",{res:resources});
	});
	PIXI.loader.load();
}