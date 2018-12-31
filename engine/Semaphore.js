var Semaphore={
    thread:{},
    wait:function(threadName,job){
        this.thread[threadName]=this.thread[threadName]?this.thread[threadName]:Promise.resolve();
        if(job)this.thread[threadName]=this.thread[threadName].then(()=>new Promise(resolve=>{
            job(resolve);
        }))
        return this.thread[threadName];
    }
}