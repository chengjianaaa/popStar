const {ccclass, property} = cc._decorator;
import {LevelStartText} from "./LevelStartText";
import{Map}from"./Map";
@ccclass 
export class Game extends cc.Component {
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
    
    private _level:number;
   
    public onLoad() {
        cc.log("=== start Game ===");
        cc.director.setDisplayStats(false);
        
        this.title.active=true;
        this.gameBg.active=false;
        this.levelStartText.active=false;
        this.map.active=false;
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
    }
    public faiure():void{
        cc.log("faiure");
    }
    public gotoLevel(level:number):void{
        cc.log("gotoLevel:",level);
        this._level=level;
        this.gameBg.active=true;
        this.levelStartText.active=true;
        this.levelStartText.getComponent(LevelStartText).setOnCompleteCallback(this.layoutLevel,this);
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