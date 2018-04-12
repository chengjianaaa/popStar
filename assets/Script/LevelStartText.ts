const {ccclass, property} = cc._decorator;
import MyGame from "./MyGame";
import LevelData from "./LevelData";

@ccclass
export default class LevelStartText extends cc.Component {
    @property(cc.Node)
    private levelNum:cc.Node=null;
    @property(cc.Node)
    private targetScore:cc.Node=null;

    private onComplete:Function;
    private onCompleteThis:any;
    private _initLevelNumPos:cc.Vec2=null;
    private _initTargetScorePos:cc.Vec2=null;

    protected start(){
        this._initLevelNumPos=this.levelNum.getPosition().clone();
        this._initTargetScorePos=this.targetScore.getPosition().clone();
    }
    
    protected onEnable():void{
        if(this._initLevelNumPos)this.levelNum.setPosition(this._initLevelNumPos);
        if(this._initTargetScorePos)this.targetScore.setPosition(this._initTargetScorePos);
        this.levelNum.active=true;
        this.targetScore.active=true;
        
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
    
    public setData(level:number,targetScore:number):void{
        //关卡数
        let levelNumLabel:cc.Label=this.levelNum.getComponent(cc.Label);
        levelNumLabel.string="关卡"+level.toString();
        //目标分数
        let targetScoreLabel:cc.Label=this.targetScore.getComponent(cc.Label);
        targetScoreLabel.string="目标分数"+targetScore.toString();
    }
    
    private complete():void{
        if(this.onComplete!=null){
            this.onComplete.apply(this.onCompleteThis);
        }
    }
    
    protected onDisable():void{
        this.levelNum.active=false;
        this.targetScore.active=false;
    }
    
    public setOnCompleteCallback(complete:Function,thisObj:any):void{
        this.onComplete=complete;
        this.onCompleteThis=thisObj;
    }
}
