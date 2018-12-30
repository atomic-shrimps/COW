function Animatable(arg={},asyncloaded=true)
{
	var self=this;
	Atom.call(this,arg,asyncloaded);
	this.ref=[arg.pack,arg.proj,arg.arm];
	this.defanim=!arg.defanim?"Idle":arg.defanim;
	this.sprite={};
	this.loaded=false;
	this.transform=new Proxy({},
	{
		get:function(o,p)
		{
			return self.sprite.transform[p];
		},
		set:function(o,p,v)
		{
			return self.sprite.transform[p]=v;
		},
		has:function(o,p)
		{
			return p in self.sprite.transform;
		},
		ownKeys:function(o)
		{
			return Reflect.ownKeys(self.sprite.transform);
		}
	});
	this.pos=new Proxy([0,0],
	{
		get:(pos,prop)=>(prop in pos)?pos[prop]:undefined,
		set:(pos,prop,val)=>{pos[prop]=self.sprite[["x","y"][prop]]=val;}
	});
	this.on("resourceLoad",((p)=>{
		loadAnim(this,this.parent,p.res);
		this.loaded=true;
	}));
}

function loadAnim(anim,parent,res)
{
	var resources=res;
	var cow=anim.ref[0].res;
	factory = dragonBones.PixiFactory.factory;
	factory.parseDragonBonesData(resources[cow[0]].data);
	factory.parseTextureAtlasData(resources[cow[1]].data, resources[cow[2]].texture);
	var armatureDisplay = factory.buildArmatureDisplay(anim.ref[2], anim.ref[1]);
	armatureDisplay.animation.play(anim.defanim,1);
	anim.sprite=armatureDisplay;
	armatureDisplay.x = anim.pos[0];
	armatureDisplay.y = anim.pos[1];
	parent.sprite.addChild(armatureDisplay);
}