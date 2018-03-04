const {ccclass, property} = cc._decorator;
import {LevelStartText} from "./LevelStartText";
import{Map}from"./Map";
import { LevelData } from "./LevelData";
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
   
    public onLoad() {
        cc.log("=== start Game ===");
        cc.director.setDisplayStats(false);
        
        this.title.active=true;
        this.gameBg.active=false;
        this.levelStartText.active=false;
        this.map.active=false;
        this.messageUI.active=false;
        
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
        this.map.setPosition(bottomLeft);
        this.map.active=true;
    }

    public get level():number{return this._level;}


}