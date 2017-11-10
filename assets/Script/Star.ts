import { StarType } from "./StarType";

const {ccclass, property} = cc._decorator;

@ccclass
export class Star extends cc.Component {
    
    private _posInt:cc.Vec2;
    private _type:StarType;
    
    public init(ix:number,iy:number,type:StarType):void{
        this._posInt=cc.p(ix,iy);
        this._type=type;
    }
    
    public onLoad():void{
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }

    private onTouchStart(e:cc.Event.EventCustom):void{
        
    }

    public onDisable():void{
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this)
    }

}
