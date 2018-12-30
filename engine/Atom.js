function Atom(arg={})
{
	this.pos=!arg.pos?[0,0]:arg.pos;
	this.evt=!arg.evt?{}:arg.evt;
	this.type=this.__proto__.constructor.name;
	this.children=!arg.children?[]:arg.children;
	this.id=!arg.id?"Me":arg.id;
	this.atomic=true;
	this.parent=null;
	this.trigger=function(e,param)
	{
		var propagate=true;
		if(e in this.evt)
		this.evt[e].forEach(handler=>{
			var res=handler(param);
			if(res===false)propagate=false;
			else if(res!==undefined)param=res;
		});
		if(propagate)this.children.forEach(child=>{
			child.trigger(e,param);
		});
	}
	this.on=function(evt,handler)
	{
		if(evt in this.evt)this.evt[evt].push(handler);
		else this.evt[evt]=[handler];
	}
	this.answer=function(param)
	{
		var pks=Object.keys(param);
		var ans=true;
		pks.forEach(key=>{
			var okey=key+"";
			var split=key.split("$");
			var op=split.pop();
			var signal=(["gt","eq","lt"].indexOf(op))-1;
			if(signal==-2)split.push(op);
			key=split.join("$");
			if(!(key in this)){ans=false;return;}
			if(typeof(param[okey])=="number")
			{
				if(Math.sign(param[okey]-this[key])!=signal)ans=false;
				return;
			}
			else
			{
				if(param[key]!=this[key])ans=false;
				return;
			}
		});
		return ans?this:undefined;
	}
	this.askfor=function(param)
	{
		var ans=[];
		var tans=this.answer(param);
		if(tans===undefined)
			this.children.forEach(child=>{
				var cans=child.askfor(param);
				if(cans!==undefined)ans=ans.concat(cans);
			})
		else ans.push(tans)
		return ans.length==0?undefined:ans;
	}
	this.addChild=function(child)
	{
		child.parent=this;
		this.children.push(child);
		return this.children[this.children.length-1];
	}
}