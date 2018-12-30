function Player(arg={},asyncloaded=true)
{
	var self=this;
	Controllable.call(this,arg,asyncloaded);
	this.anim=!arg.anim?["Idle","Walk","JumpStart","JumpEnd","WalkJumpStart","WalkJumpEnd","Attack"]:arg.anim;
	this.falling=false;
	this.vspeed=0;
	this.hspeed=0;
	this.action=!arg.action?function()
	{
		var hacc=(self.press[1]-self.press[3])*10;
		self.hspeed=hacc;
		hspeed=self.hspeed;
		if(self.falling&&(self.sprite.animation._lastAnimationState.name!=self.anim[4]||self.sprite.animation.isCompleted))
		{
			self.vspeed-=1;
		}
		else if(self.press[0]==1&&!self.falling&&self.sprite.animation._lastAnimationState.name!=self.anim[2])
		{
			if((self.press[3]+self.press[1])>0)
			{
				self.sprite.animation.play(self.anim[4],1);
				self.vspeed=5;
			}
			else self.sprite.animation.play(self.anim[2],1);
			self.sprite.animation.timeScale=2;
		}
		else if(self.press[2]==1&&!self.falling&&self.sprite.animation._lastAnimationState.name!=self.anim[6])
		{
			self.sprite.animation.play(self.anim[6],1);
		}
		else
		{
			if(self.sprite.animation._lastAnimationState.name==self.anim[2]||self.sprite.animation._lastAnimationState.name==self.anim[4])
			{
				if(!self.sprite.animation.isCompleted){}
				else
				{
					self.vspeed=15;
				}
			}
			else if((self.sprite.animation._lastAnimationState.name==self.anim[3]||self.sprite.animation._lastAnimationState.name==self.anim[5])&&!self.sprite.animation.isCompleted){}
			else if(self.sprite.animation._lastAnimationState.name!=self.anim[6]||self.sprite.animation.isCompleted)
			{
				self.sprite.animation.timeScale=1;
				if(hspeed==0&&self.sprite.animation._lastAnimationState.name!=self.anim[0])self.sprite.animation.play(self.anim[0]);
				else if(!(hspeed==0)&&self.sprite.animation._lastAnimationState.name!=self.anim[1]){self.sprite.animation.play(self.anim[1]);}
			}
		}
		self.pos[1]-=self.vspeed;
		if(self.pos[1]>window.innerHeight)
		{
			self.vspeed=0;
			if(self.sprite.animation._lastAnimationState.name==self.anim[2])self.sprite.animation.play(self.anim[3],1);
			if(self.sprite.animation._lastAnimationState.name==self.anim[4])self.sprite.animation.play(self.anim[5],1);
			self.pos[1]=window.innerHeight;
			self.falling=false;
		}
		else if(self.pos[1]<window.innerHeight)self.falling=true;
		if(self.sprite.animation._lastAnimationState.name==self.anim[1]||self.sprite.animation._lastAnimationState.name==self.anim[4]||self.sprite.animation._lastAnimationState.name==self.anim[5])self.pos[0]-=hspeed;
		if(hspeed!=0)self.transform.scale._x=hspeed/10;
	}:arg.action;
}