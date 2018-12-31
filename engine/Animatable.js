function Animatable(arg={})
{
	var self=this;
	Atom.call(this,arg,true);
	//Container.call(this,arg,true);
	this.ref=[arg.pack,arg.proj,arg.arm];
	this.defanim=!arg.defanim?"Idle":arg.defanim;
	this.view={};
	this.transform=new Proxy({},
	{
		get:function(o,p)
		{
			return self.view.transform[p];
		},
		set:function(o,p,v)
		{
			return self.view.transform[p]=v;
		},
		has:function(o,p)
		{
			return p in self.view.transform;
		},
		ownKeys:function(o)
		{
			return Reflect.ownKeys(self.view.transform);
		}
	});
	this.pos=new Proxy([0,0],
	{
		get:(pos,prop)=>(prop in pos)?pos[prop]:undefined,
		set:(pos,prop,val)=>{pos[prop]=self.view[["x","y"][prop]]=val;}
	});
	this.ready.then((()=>{
		loadAnim(this);
		this.trigger("ready");
	}));
	const binaryOptions = { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER };
	Semaphore.wait("resource",(done)=>{
		arg.pack.forEach(file=>
		{
			if(!PIXI.loader.resources[file])
			{
				if(file.indexOf("dbbin")>=0)
					PIXI.loader.add(file,binaryOptions);
				else PIXI.loader.add(file);
			}
		});
		PIXI.loader.load(()=>{
			this.notifyIsReady();
			done();
		});
	});
}

function loadAnim(anim)
{
	var res=PIXI.loader.resources;
	var cow=anim.ref[0];
	factory = dragonBones.PixiFactory.factory;
	factory.parseDragonBonesData(res[cow[0]].data);
	factory.parseTextureAtlasData(res[cow[1]].data, res[cow[2]].texture);
	var armatureDisplay = factory.buildArmatureDisplay(anim.ref[2], anim.ref[1]);
	armatureDisplay.animation.play(anim.defanim);
	anim.view=armatureDisplay;
	armatureDisplay.x = anim.pos[0];
	armatureDisplay.y = anim.pos[1];
}