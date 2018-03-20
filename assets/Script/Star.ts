import { StarType } from "./StarType";
import { Map } from "./Map";

const {ccclass, property} = cc._decorator;

@ccclass
export class Star extends cc.Component {
    
    private _posInt:cc.Vec2;
    private _type:StarType;
    private _map:Map;
    
    public init(map:Map,x:number,y:number,ix:number,iy:number,type:StarType):void{
        this._map=map;
        this.node.setPosition(x,y);
        this._posInt=cc.p(ix,iy);
        this._type=type;
    }
    
    public start():void{
        
    }
    
    public tweenDestroy():void{
        this.node.destroy();
    }
    
    public setPosInt(ix:number,iy:number):void{
        this._posInt.x=ix;
        this._posInt.y=iy;
    }
    
    public setPosition(x:number,y:number):void{
        this.node.setPosition(x,y);
    }
    
    public onDestroy():void{
        this._posInt=null;
        this._type=null;
        this._map=null;
    }

}
