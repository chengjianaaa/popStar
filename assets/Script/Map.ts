const {ccclass, property} = cc._decorator;
import { Game } from "./Game";
import { StarsBoard } from "./StarsBoard";
import { LevelData } from "./LevelData";
import { StarType } from "./StarType";

@ccclass
export class Map extends cc.Component {
    @property(Game)
    private game:Game=null;
    @property(cc.Prefab)
    private rStar:cc.Prefab=null;
    @property(cc.Prefab)
    private gStar:cc.Prefab=null;
    @property(cc.Prefab)
    private bStar:cc.Prefab=null;
    @property(cc.Prefab)
    private vStar:cc.Prefab=null;
    @property(cc.Prefab)
    private yStar:cc.Prefab=null;
    private _stars:StarsBoard;

    public onLoad():void{
        let levelData=LevelData.getData(this.game.level);
        this._stars=new StarsBoard();
        this._stars.init(10,10);
        this._stars.setWithData(levelData);
        
        let posList=this._stars.posList;
        for(let x=0;x<this._stars.xNum;x++){
            for(let y=0;y<this._stars.yNum;y++){
                let starType=posList[x][y];
                
            }
        }
        cc.log(this._stars.toString());
        
        
        
        let outList:cc.Vec2[]=[];
        let bounds=this._stars.pop(5,3,outList);
        //cc.log(outList);
        cc.log(this._stars.toString());
        this._stars.drop(bounds);
        cc.log(this._stars.toString());

        let star=cc.instantiate(this.rStar);
        star.parent=this.node;
        star.active=true;
        cc.log("onLoad map");
        
    }
    
    private createStarWithType(type:StarType):void{
        
    }
}
