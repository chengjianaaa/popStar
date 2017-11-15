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
	@property(cc.Vec2)
	private cellSize:cc.Vec2=null;
	private _stars:StarsBoard;

	public onLoad():void{
		cc.log("gamelevel:",this.game.level);
		let levelData=LevelData.getData(this.game.level);
		this._stars=new StarsBoard();
		this._stars.init(10,10);
		this._stars.setWithData(levelData);
		
		let posList=this._stars.posList;
		for(let x=0;x<this._stars.xNum;x++){
			for(let y=0;y<this._stars.yNum;y++){
				let starType=posList[x][y];
				this.createStarWithType(starType,x,y);
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
	
	private createStarWithType(type:StarType,ix:number,iy:number):void{
		let x=ix*this.cellSize.x;
		let y=iy*this.cellSize.y;
		let star:cc.Node;
		switch(type){
			case StarType.NOTHING:
				//star=cc.instantiate(this.rStar);
				break;
			case StarType.RED:
				star=cc.instantiate(this.rStar);
				break;
			case StarType.GREEN:
				star=cc.instantiate(this.gStar);
				break;
			case StarType.BLUE:
				star=cc.instantiate(this.bStar);
				break;
			case StarType.PURPLE:
				star=cc.instantiate(this.vStar);
				break;
			case StarType.YELLOW:
				star=cc.instantiate(this.yStar);
				break;
		}
		star.setPosition(x,y);
		star.parent=this.node;
	}
}
