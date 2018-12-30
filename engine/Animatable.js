var anims=[];
var packs=[];

function Pack(arg={})
{
	this.res=arg.res;
	packs.push(this.res);
}

function Animatable(arg={})
{
	var animself=this;
	Atom.call(this,arg);
	this.ref=[arg.pack,arg.proj,arg.arm];
	this.defanim=!arg.defanim?"Walk":arg.defanim;
	anims.push(this);
	this.sprite={};
	this.pos=new Proxy([0,0],
	{
		get:(pos,prop)=>(prop in pos)?pos[prop]:undefined,
		set:(pos,prop,val)=>{pos[prop]=animself.sprite[["x","y"][prop]]=val;}
	});
}

function PixiWorld()
{
	var display = new PIXI.Application();
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

	PIXI.loader.once("complete", (loader, resources) => {
		anims.forEach(anim=>{
			var cow=anim.ref[0].res;
			var factory = dragonBones.PixiFactory.factory;
			factory.parseDragonBonesData(resources[cow[0]].data);
			factory.parseTextureAtlasData(resources[cow[1]].data, resources[cow[2]].texture);

			var armatureDisplay = factory.buildArmatureDisplay(anim.ref[2], anim.ref[1]);
			armatureDisplay.animation.play(anim.defanim);

			anim.sprite=armatureDisplay;

			armatureDisplay.x = anim.pos[0];
			armatureDisplay.y = anim.pos[1];

			display.stage.addChild(armatureDisplay);
		});
	});
	PIXI.loader.load();
}