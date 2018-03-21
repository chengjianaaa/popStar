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
   
    public start() {
        cc.log("=== start Game ===");
        this._score=this.getScoreWithLocal();
        cc.director.setDisplayStats(false);
        
        this.gameBg.active=false;
        this.levelStartText.active=false;
        this.map.active=false;
        this.messageUI.active=false;
        
        //LocalManager.removeItem("score");
        cc.log(this._score);
        
        this.gotoTitle();
    }
    
    private getScoreWithLocal():number{
        return LocalManager.getInt("score");
    }
    private saveScoreToLocal():void{
        LocalManager.setInt("score",this._score);
    }
    public getLevelWithLocal():number{
        return LocalManager.getInt("level",1);
    }
    private saveLevelToLocal():void{
        LocalManager.setInt("level",this._level);
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
        //保存当前关卡数
        this._level++;
        this.saveLevelToLocal();
        this.gotoLevel(this._level);
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
        let visibleSize=cc.director.getVisibleSize();
        let resolutionSize=cc.view.getDesignResolutionSize();
        let sx=visibleSize.width/resolutionSize.width;
        let cellSize=this.map.getComponent(Map).getCellSize();
        let bottomLeft=cc.p(-visibleSize.width*0.5+cellSize.x*0.5,-visibleSize.height*0.5+cellSize.y*0.5);
        
        this.map.setPosition(bottomLeft);
        this.map.scale=sx;
        this.map.active=true;
    }
    
    public getComputeScoreWithCount(popCount:number):number{
        return (popCount-1)*10+5;
    }
    public addScore(value:number):void{
        this.setScore(this._score+value);
    }
    public setScore(value:number):void{
        this._score=value;
        let messageUIScript=this.messageUI.getComponent(MessageUI);
        messageUIScript.setScoreLabelText(this._score.toString());
    }

    public get level():number{return this._level;}
    public get score():number{return this._score;}


}