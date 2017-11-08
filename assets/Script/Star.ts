const {ccclass, property} = cc._decorator;

@ccclass
export class Star extends cc.Component {

    public onLoad():void{
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }

    private onTouchStart(e:cc.Event.EventCustom):void{
        
    }

    public onDisable():void{
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this)
    }

}
