function Controllable(arg={})
{
	var self=this;
	if(!"atomic" in this)throw "Controllable Class requires a pre-existing atomic structure.";
	this.code=!arg.code?"wasd":arg.code;
	this.anim=!arg.anim?["Idle","Walk","Jump"]:arg.anim;
	this.press={};
	for(var i=0;i<this.code.length;i++)
	{
		this.press[this.code[i]]=0;
	}
	this.on("keydown",((code)=>(e)=>{
		self.press[e.key]=1;
	})(this.code));
	this.on("keyup",((code)=>(e)=>{
		self.press[e.key]=0;
	})(this.code));
	this.lastcycle=0;
	this.delay=!arg.delay?200:arg.delay;
	this.action=!arg.action?function()
	{
		var vspeed=(self.press[self.code[0]]-self.press[self.code[2]])*10;
		var hspeed=(self.press[self.code[1]]-self.press[self.code[3]])*10;
		if(vspeed==hspeed&&hspeed==0&&self.sprite.animation._lastAnimationState.name!=self.anim[0])self.sprite.animation.play(self.anim[0]);
		else if(!(vspeed==hspeed&&hspeed==0)&&self.sprite.animation._lastAnimationState.name!=self.anim[1]){self.sprite.animation.play(self.anim[1]);}
		self.pos[1]-=vspeed;
		self.pos[0]-=hspeed;
		if(hspeed!=0)self.transform.scale._x=hspeed/10;
	}:arg.action;
	this.on("postrender",((code)=>(e)=>{
		if(!self.loaded)return;
		var milis=new Date().getMilliseconds();
		if((milis-self.lastcycle)<self.delay)self.lastcycle=milis;
		self.action();
	})(this.code));
}