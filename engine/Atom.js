function Atom(arg={},asyncLoaded=false)
{
	this.ready=new Promise(resolve=>this.notifyIsReady=resolve);
	this.pos=!arg.pos?[0,0]:arg.pos;
	this.evt=!arg.evt?{}:arg.evt;
	this.type=this.__proto__.constructor.name;
	this.children=!arg.children?[]:arg.children;
	this.id=!arg.id?"Me":arg.id;
	this.atomic=true;
	this.on=function(e,handler){
		this.evt[e]=this.evt[e]?this.evt[e]:[];
		this.evt[e].push(handler);
	}
	this.unbind=function(e,handler){
		this.evt[e]=this.evt[e]?this.evt[e]:[];
		var index=this.evt[e].indexOf(handler);
		if(index!=-1)this.evt[e].splice(index,1);
	}
	this.parent=null;
	this.trigger=function(e,param)
	{
		if(!this.evt[e])return;
		var propagate=true;
		if(e in this.evt)
		this.evt[e].forEach(handler=>{
			var res=handler(param);
			if(res===false)propagate=false;
			else if(res!==undefined)param=res;
		});
		if(propagate)this.children.forEach(child=>{
			if(child.atomic)child.trigger(e,param);
		});
	}
	this.trigger_ex=function(e,param){ // Trigger event exclusively here
		if(!this.evt[e])return;
		this.evt[e].forEach(handler=>handler(param));
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
				if(!child.atomic)return;
				var cans=child.askfor(param);
				if(cans!==undefined)ans=ans.concat(cans);
			})
		else ans.push(tans)
		return ans.length==0?undefined:ans;
	}
	this.addTo=function(parent){
        if(parent.atomic)parent.addChild(this);
        this.trigger_ex("addTo",parent);
	}
	this.removeFrom=function(parent){
        if(parent.atomic)parent.removeChild(this);
        this.trigger_ex("removeFrom",parent);
    }
    this.addChild=function(child){
		this.children.parent=this;
        this.children.push(child);
        this.trigger_ex("addChild",child);
		return child;
    }
    this.removeChild=function(child){
		if(this.children.parent!=this)return;
		this.children.parent=null;
		var index=this.children.indexOf(child);
		if(index!=-1)this.children.splice(index,1);
        this.trigger_ex("removeChild",child);
	}
	this.ready.then(()=>{
		var exploreArg=(_arg, tail=[])=>{
			Object.keys(_arg).forEach(argKey=>{
				if(typeof(_arg[argKey])=="object")exploreArg(_arg[argKey],tail.concat([argKey]))
				else if(typeof(_arg[argKey])!="function"){
					var node=this;
					tail.forEach(tailKey=>{
						if(tailKey!=argKey&&node)node=node[tailKey]
					})
					if(node)node[argKey]=_arg[argKey];
				}
			})
		}
		exploreArg(arg,[]);
	})
	if(!asyncLoaded)this.notifyIsReady();
}