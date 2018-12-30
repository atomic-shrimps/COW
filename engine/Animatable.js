function Animatable(arg={})
{
	var animself=this;
	Atom.call(this,arg);
	this.ref=[arg.pack,arg.proj,arg.arm];
	this.defanim=!arg.defanim?"Walk":arg.defanim;
	this.sprite={};
	this.loaded=false;
	this.pos=new Proxy([0,0],
	{
		get:(pos,prop)=>(prop in pos)?pos[prop]:undefined,
		set:(pos,prop,val)=>{pos[prop]=animself.sprite[["x","y"][prop]]=val;}
	});
	this.on("resourceLoad",((p)=>{
		loadAnim(this,this.parent,p.res);
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
	armatureDisplay.animation.play(anim.defanim);
	anim.sprite=armatureDisplay;
	armatureDisplay.x = anim.pos[0];
	armatureDisplay.y = anim.pos[1];
	parent.sprite.addChild(armatureDisplay);
}