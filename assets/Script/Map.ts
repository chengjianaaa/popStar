const {ccclass, property} = cc._decorator;
import { Game } from "./Game";
import { StarsBoard, ChangeResult } from "./StarsBoard";
import { LevelData } from "./LevelData";
import { StarType } from "./StarType";
import { Star } from "./Star";

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
	private _starsBoard:StarsBoard;
	private _stars:Star[][];

	public onLoad():void{
		this.initStarsBoard();
	}
	
	private initStarsBoard():void{
		cc.log("gamelevel:",this.game.level);
		let levelData=LevelData.getData(this.game.level);
		//let levelData=LevelData.getRandomData();
		this._starsBoard=new StarsBoard();
		this._starsBoard.init(10,10);
		this._starsBoard.setWithData(levelData);
		
		this._stars=[];
		
		let posList=this._starsBoard.posList;
		for(let x=0;x<this._starsBoard.xNum;x++){
			this._stars[x]=[];
			for(let y=0;y<this._starsBoard.yNum;y++){
				let starType=posList[x][y];
				this._stars[x][y]=this.createStarWithType(starType,x,y);
			}
		}
		cc.log(this._starsBoard.toString());
	}
	
	private createStarWithType(type:StarType,ix:number,iy:number):Star{
		let x=ix*this.cellSize.x;
		let y=iy*this.cellSize.y;
		let starNode:cc.Node;
		switch(type){
			case StarType.NOTHING:
				//star=cc.instantiate(this.rStar);
				break;
			case StarType.RED:
				starNode=cc.instantiate(this.rStar);
				break;
			case StarType.GREEN:
				starNode=cc.instantiate(this.gStar);
				break;
			case StarType.BLUE:
				starNode=cc.instantiate(this.bStar);
				break;
			case StarType.PURPLE:
				starNode=cc.instantiate(this.vStar);
				break;
			case StarType.YELLOW:
				starNode=cc.instantiate(this.yStar);
				break;
		}
		let star:Star=starNode.getComponent(Star) as Star;
		star.init(this,x,y,ix,iy,type);
		starNode.parent=this.node;
		return star;
	}
	
	public popAndDrop(ix:number,iy:number):void{
		let popResults:cc.Vec2[]=[];
		let popMinNum:number=2;//最小能消除的数量
		//1.消除
		let popResultsRect=this._starsBoard.pop(ix,iy,popMinNum,popResults);
		if(popResultsRect!=null){//有输出范围代表输出的结果大于最小可消除数
			for(let i=0;i<popResults.length;i++){
				let posInt=popResults[i];
				
				let star=this._stars[posInt.x][posInt.y];
				star.tweenDestroy();
				this._stars[posInt.x][posInt.y]=null;
			}
			//2.下落
			let dropResults:ChangeResult[]=this._starsBoard.drop(popResultsRect);//输出需要掉落星星和它新位置
			this.changeStarsWithResults(dropResults);
			cc.log(this._starsBoard.toString());
			//3.左移
			let moveToLeftResults:ChangeResult[]=this._starsBoard.moveToLeft(popResultsRect);//输出需要左移星星和它新位置
			this.changeStarsWithResults(moveToLeftResults);
			cc.log(this._starsBoard.toString());
		}
	}
	
	public changeStarsWithResults(results:ChangeResult[]):void{
		for(let i=0;i<results.length;i++){
			let result=results[i];
			let star=this._stars[result.pos.x][result.pos.y];
			this._stars[result.pos.x][result.pos.y]=null;
			if(star){
				star.setPosInt(result.newPos.x,result.newPos.y);
				star.setPosition(result.newPos.x*this.cellSize.x,result.newPos.y*this.cellSize.y);
				this._stars[result.newPos.x][result.newPos.y]=star;
			}
		}
	}
	
}
