const {ccclass, property} = cc._decorator;
import {Game} from "./Game";

@ccclass
export class LevelStartText extends cc.Component {
    @property(cc.Node)
    private levelNum:cc.Node=null;
    @property(cc.Node)
    private targetScore:cc.Node=null;

    private onComplete:Function;
    private onCompleteThis:any;

    public onLoad() {
        let size=cc.director.getWinSizeInPixels();

        this.levelNum.x=-(size.width*0.5+this.levelNum.width*0.5);
        let moveTo=cc.moveTo(0.5,cc.p(0,this.levelNum.y));
        let moveOut=cc.moveTo(0.5,cc.p(size.width+this.levelNum.width*0.5,this.levelNum.y));
        this.levelNum.runAction(cc.sequence(moveTo,cc.delayTime(0.5),cc.delayTime(0.5),moveOut));

        this.targetScore.x=-(size.width*0.5+this.targetScore.width*0.5);
        moveTo=cc.moveTo(0.5,cc.p(0,this.targetScore.y));
        moveOut=cc.moveTo(0.5,cc.p(size.width+this.targetScore.width*0.5,this.targetScore.y));
        this.targetScore.runAction(cc.sequence(cc.delayTime(0.5),moveTo,cc.delayTime(0.5),moveOut,cc.callFunc(this.complete,this)));
    }

    private complete():void{
        if(this.onComplete!=null){
            this.onComplete.apply(this.onCompleteThis);
        }
    }

    public setOnCompleteCallback(complete:Function,thisObj:any):void{
        this.onComplete=complete;
        this.onCompleteThis=thisObj;
    }
}
