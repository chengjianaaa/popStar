const {ccclass, property} = cc._decorator;

@ccclass
export default class LocalManager extends cc.Component{
    public static getItem(key:string):any{
        return JSON.parse(cc.sys.localStorage.getItem(key));
    }
    public static setItem(key:string,value:any):void{
        cc.sys.localStorage.setItem(key, JSON.stringify(value));
    }
    public static removeItem(key:any):void{
        cc.sys.localStorage.removeItem(key);
    }
    
    public static setNumber(key:string,value:number):void{
        this.setItem(key,value);
    }
    public static getNumber(key:string):number{
        return parseInt(this.getItem(key));
    }
    
    public static setInt(key:string,value:number):void{
        this.setItem(key,value|0);
    }
    public static getInt(key:string,defaultValue:number=0):number{
        let value:number=this.getItem(key)|0;
        if(value==0){
            if(defaultValue!=value)value=defaultValue;
        }
        return value;
    }
    
    public static setString(key:string,value:string):void{
        this.setItem(key,value);
    }
    public static getString(key:string):string{
        return JSON.stringify(this.getItem(key));
    }
}
