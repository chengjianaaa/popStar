const {ccclass, property} = cc._decorator;
import {LevelStartText} from "./LevelStartText";
import{Map}from"./Map";
import { LevelData } from "./LevelData";
import { LocalManager } from "./LocalManager";
import { MessageUI } from "./MessageUI";
@ccclass 
export class MyGame extends cc.Component {
    @property(cc.Node)
    private canvas:cc.Node=null;
    @property(cc.Node)
    private title:cc.Node=null;
    @property(cc.Node)
    private gameBg:cc.Node=null;
    @property(cc.Node)
    private levelStartText:cc.Node=null;
    @property(cc.Node)
    private map:cc.Node=null;
    @property(cc.Node)
    private messageUI:cc.Node=null;
    
    private _level:number;
    private _score:number;
   
    public onLoad() {
        cc.log("=== start Game ===");
        this._score=this.getScoreWithLocal();
        cc.director.setDisplayStats(false);
        
        this.title.active=true;
        this.gameBg.active=false;
        this.levelStartText.active=false;
        this.map.active=false;
        this.messageUI.active=false;
        
        LocalManager.removeItem("score");
        cc.log(this._score);
    }
    
    private getScoreWithLocal():number{
        return LocalManager.getInt("score");
    }
    private saveScoreToLocal():void{
        LocalManager.setInt("score",this._score);
    }
    
    public gotoTitle():void{
        cc.log("gotoTitle");
        this.title.active=true;
    }
    public gotoSelectLevel():void{
        cc.log("gotoSelectLevel");
    }
    public win():void{
        cc.log("win");
        let graphics=this.addComponent(cc.Graphics);
    }
    public faiure():void{
		cc.log("faiure");
    }
    
    public update(dt:number):void{
        
    }
    
    public gotoLevel(level:number):void{
        cc.log("gotoLevel");
        this._level=level;
        //吊销标题界面
        this.title.active=false;
        //游戏背景图
        this.gameBg.active=true;
        //信息面板
        cc.log(this.isValid);
        this.messageUI.active=true;
        //进入关卡前显示的目标分动画
        this.levelStartText.active=true;
        let levelStartTextScript=this.levelStartText.getComponent(LevelStartText);
        levelStartTextScript.setData(level,LevelData.getTargetScore(level));
        levelStartTextScript.setOnCompleteCallback(this.layoutLevel,this);
        
        
    }
    private layoutLevel():void{
        cc.log("layoutBlocks=======");
        let size=cc.director.getVisibleSize();
        let bottomLeft=cc.p(-size.width*0.5+48*0.5,-size.height*0.5+48*0.5);
        //this.map.setPosition(bottomLeft);
        this.map.active=true;
    }
    
    public getComputeScoreWithCount(popCount:number):number{
        return (popCount-1)*10+5;
    }
    public addScore(value:number):void{
        this.setScore(this._score=value);
    }
    public setScore(value:number):void{
        this._score=value;
        let messageUIScript=this.messageUI.getComponent(MessageUI);
        messageUIScript.setScoreLabelText(this._score.toString());
    }

    public get level():number{return this._level;}
    public get score():number{return this._score;}


}