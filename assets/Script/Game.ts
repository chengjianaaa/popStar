const {ccclass, property} = cc._decorator;
import {LevelStartText} from "./LevelStartText";
import {StarsBoard} from "./StarsBoard";
import{LevelData}from"./LevelData";
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

    private level:number;
   
    public onLoad() {
        cc.log("=== start Game ===");
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
        this.level=level;
        this.gameBg.active=true;
        this.levelStartText.active=true;
        this.levelStartText.getComponent(LevelStartText).setOnCompleteCallback(this.layoutLevel,this);
    }
    private layoutLevel():void{
        cc.log("layoutBlocks=======");
        let levelData=LevelData.getData(this.level);
        let stars=new StarsBoard();
        stars.init(10,10);
        stars.setWithData(levelData);
        cc.log(stars.toString());
        stars.pop(5,3);
        cc.log(stars.toString());
    }
}