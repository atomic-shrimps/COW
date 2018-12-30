function Player(arg={},asyncloaded=true)
{
	var self=this;
	Controllable.call(this,arg,asyncloaded);
	this.anim=!arg.anim?["Idle","Walk","JumpStart","JumpEnd"]:arg.anim;
	this.falling=false;
	this.vspeed=0;
	this.action=!arg.action?function()
	{
		var hspeed=(self.press[1]-self.press[3])*10;
		var vspeed=self.vspeed;
		if(self.falling)
		{
			vpseed-=1;
		}
		else
		{
			if(self.sprite.animation._lastAnimationState.name==self.anim[2])self.sprite.animation.play(self.anim[3]);
			else if(self.sprite.animation._lastAnimationState.name==self.anim[3]&&!self.sprite.animation.isFinished)
			{
				if(hspeed==0&&self.sprite.animation._lastAnimationState.name!=self.anim[0])self.sprite.animation.play(self.anim[0]);
				else if(!(hspeed==0)&&self.sprite.animation._lastAnimationState.name!=self.anim[1]){self.sprite.animation.play(self.anim[1]);}
			}
		}
		self.pos[1]-=vspeed;
		if(self.pos[1]>window.innerHeight)
		{
			self.pos=window.innerHeight;
			self.falling=false;
		}
		self.pos[0]-=hspeed;
		if(hspeed!=0)self.transform.scale._x=hspeed/10;
	}:arg.action;
}