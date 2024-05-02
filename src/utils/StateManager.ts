
class SingletonClass {

    private static _instance:SingletonClass = new SingletonClass();

    private state: any = {}

    constructor() {
        if(SingletonClass._instance){
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        SingletonClass._instance = this;
    }

    public static getInstance():SingletonClass
    {
        return SingletonClass._instance;
    }

    public setState(key: string, value:any):void
    {
        this.state[key] = value;
    }

    public getState(key: string): any
    {
        return this.state[key];
    }

    

}

export default SingletonClass