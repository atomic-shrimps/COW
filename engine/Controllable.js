function Controllable(arg={},asyncloaded=true,parentclass)
{
	var self=this;
	parentclass.call(this,arg,asyncloaded);
	this.code=!arg.code?"wasd":arg.code;
	this.anim=!arg.anim?["Idle","Walk","Jump"]:arg.anim;
	this.press=new Array(this.code.length).fill(0);
	this.on("keydown",((code)=>(e)=>{
		for(var i=0;i<self.press.length;i++)
		{
			if(e.key==code[i]){return (self.press[i]=1,true);}
		}
	})(this.code));
	this.on("keyup",((code)=>(e)=>{
		for(var i=0;i<self.press.length;i++)
		{
			if(e.key==code[i]){return (self.press[i]=0,true);}
		}
	})(this.code));
	this.lastcycle=0;
	this.delay=!arg.delay?200:arg.delay;
	this.action=!arg.action?function()
	{
		var vspeed=(self.press[0]-self.press[2])*10;
		var hspeed=(self.press[1]-self.press[3])*10;
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