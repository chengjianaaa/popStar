const {ccclass, property} = cc._decorator;
import { StarsBoard, ChangeResult } from "./StarsBoard";
import { LevelData } from "./LevelData";
import { StarType } from "./StarType";
import { Star } from "./Star";
import { MyGame } from "./MyGame";

@ccclass
export class Map extends cc.Component {
	@property(MyGame)
	private game:MyGame=null;
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
	@property(cc.Node)
	private canvasNode:cc.Node=null;
	@property
	private xNum:number=10;
	@property
	private yNum:number=10;
	
	private _starsBoard:StarsBoard;
	private _stars:Star[][];

	public start():void{
		this.initStarsBoard();
		this.canvasNode.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
	}
    
    private onTouchEnd(e:cc.Event.EventTouch):void{
		let touchPos:cc.Vec2=this.node.convertTouchToNodeSpaceAR(e.touch);
		let ix=(touchPos.x+this.cellSize.x*0.5)/this.cellSize.x;
		let iy=(touchPos.y+this.cellSize.y*0.5)/this.cellSize.y;
		ix=ix|0;
		iy=iy|0;
		ix=Math.min(ix,this.xNum);
		iy=Math.min(iy,this.yNum);
		this.popAndDrop(ix,iy);
    }
	
	private initStarsBoard():void{
		cc.log("gamelevel:",this.game.level);
		//let levelData=LevelData.getData(this.game.level);
		let levelData=LevelData.getRandomData();
		this._starsBoard=new StarsBoard();
		this._starsBoard.init(this.xNum,this.yNum);
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
		//cc.log(this._starsBoard.toString());
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
            //计算消除得分
            let popCount=popResults.length;
            let score=this.game.getComputeScoreWithCount(popCount);
            this.game.addScore(score);//添加得分
            
			for(let i=0;i<popCount;i++){
				let posInt=popResults[i];
				
				let star=this._stars[posInt.x][posInt.y];
				star.tweenDestroy();
				this._stars[posInt.x][posInt.y]=null;
			}
			//2.下落
			let dropResults:ChangeResult[]=this._starsBoard.drop(popResultsRect);//输出需要掉落星星和它新位置
			this.changeStarsWithResults(dropResults);
			//cc.log(this._starsBoard.toString());
            
			//3.左移
			let moveToLeftResults:ChangeResult[]=this._starsBoard.moveToLeft(popResultsRect);//输出需要左移星星和它新位置
			this.changeStarsWithResults(moveToLeftResults);
			//cc.log(this._starsBoard.toString());
		}
	}
	
	public isPopEnd():boolean{
		return this._starsBoard.isPopEnd();
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
	
	public onDisable():void{
		this.canvasNode.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd);
	}
    
    public onDestroy():void{
        this.canvasNode.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd);
	}
	
	public get CellSize():cc.Vec2{return this.cellSize;}
    
    
	
}
