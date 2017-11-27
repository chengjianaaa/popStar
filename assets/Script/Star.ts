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
    
    public onLoad():void{
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }

    private onTouchEnd(e:cc.Event.EventTouch):void{
        this._map.popAndDrop(this._posInt.x,this._posInt.y);
    }
    
    public tweenDestroy():void{
        this.node.destroy();
    }

    public onDisable():void{
        this.node.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
    
    public onDestroy():void{
        this._posInt=null;
        this._type=null;
        this._map=null;
    }

}
