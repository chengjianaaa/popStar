const {ccclass, property} = cc._decorator;
import { Game } from "./Game";
import { StarsBoard } from "./StarsBoard";
import { LevelData } from "./LevelData";

@ccclass
export class Map extends cc.Object {

    private _stars:StarsBoard;
    private _game:Game;

    public static create(game:Game):Map{
        let map=new Map();
        map.init(game);
        return map;
    }

    private init(game:Game):void{
        this._game=game;
        let levelData=LevelData.getData(this._game.level);
        this._stars=new StarsBoard();
        this._stars.init(10,10);
        this._stars.setWithData(levelData);
        cc.log(this._stars.toString());
        this._stars.pop(5,3);
        cc.log(this._stars.toString());
    }
}
