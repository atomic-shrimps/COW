function Player(arg={},asyncloaded=true)
{
	var self=this;
	Animatable.call(this,arg);
	Controllable.call(this,arg);
	this.anim=!arg.anim?["Idle","Walk","JumpStart","JumpEnd","WalkJumpStart","WalkJumpEnd","Attack"]:arg.anim;
	this.falling=false;
	this.vspeed=0;
	this.hspeed=0;
	this.action=!arg.action?function()
	{
		var hacc=(self.press[self.code[1]]-self.press[self.code[3]])*10;
		self.hspeed=hacc;
		hspeed=self.hspeed;
		if(self.falling&&(self.view.animation._lastAnimationState.name!=self.anim[4]||self.view.animation.isCompleted))
		{
			self.vspeed-=1;
		}
		else if(self.press[self.code[0]]==1&&!self.falling&&self.view.animation._lastAnimationState.name!=self.anim[2])
		{
			if((self.press[self.code[3]]+self.press[self.code[1]])>0)
			{
				self.view.animation.play(self.anim[4],1);
				self.vspeed=5;
			}
			else self.view.animation.play(self.anim[2],1);
			self.view.animation.timeScale=2;
		}
		else if(self.press[self.code[2]]==1&&!self.falling&&self.view.animation._lastAnimationState.name!=self.anim[6])
		{
			self.view.animation.play(self.anim[6],1);
		}
		else
		{
			if(self.view.animation._lastAnimationState.name==self.anim[2]||self.view.animation._lastAnimationState.name==self.anim[4])
			{
				if(!self.view.animation.isCompleted){}
				else
				{
					self.vspeed=15;
				}
			}
			else if((self.view.animation._lastAnimationState.name==self.anim[3]||self.view.animation._lastAnimationState.name==self.anim[5])&&!self.view.animation.isCompleted){}
			else if(self.view.animation._lastAnimationState.name!=self.anim[6]||self.view.animation.isCompleted)
			{
				self.view.animation.timeScale=1;
				if(hspeed==0&&self.view.animation._lastAnimationState.name!=self.anim[0])self.view.animation.play(self.anim[0]);
				else if(!(hspeed==0)&&self.view.animation._lastAnimationState.name!=self.anim[1]){self.view.animation.play(self.anim[1]);}
			}
		}
		self.pos[1]-=self.vspeed;
		if(self.pos[1]>window.innerHeight)
		{
			self.vspeed=0;
			if(self.view.animation._lastAnimationState.name==self.anim[2])self.view.animation.play(self.anim[3],1);
			if(self.view.animation._lastAnimationState.name==self.anim[4])self.view.animation.play(self.anim[5],1);
			self.pos[1]=window.innerHeight;
			self.falling=false;
		}
		else if(self.pos[1]<window.innerHeight)self.falling=true;
		if(self.view.animation._lastAnimationState.name==self.anim[1]||self.view.animation._lastAnimationState.name==self.anim[4]||self.view.animation._lastAnimationState.name==self.anim[5])self.pos[0]-=hspeed;
		if(hspeed!=0)self.transform.scale._x=hspeed/10;
	}:arg.action;
}