import { StarType } from "./StarType";

const { ccclass, property } = cc._decorator;
@ccclass 
export class StarsBoard extends cc.Object {
	private _list:number[][];
	private _xNum:number;
	private _yNum:number;
	public init(xNum:number,yNum:number):void{
		this._xNum=xNum;
		this._yNum=yNum;
		this._list=[];
		for(let x=0;x<xNum;x++){
			this._list[x]=[];
			for(let y=0;y<yNum;y++){
				this.setValue(x,y,0);
			}
		}
	}

	public setWithData(data:number[]):void{
		if(data.length!=this._xNum*this._yNum){
			throw new Error("data length not match starsBoard size");
		}
		let id:number=0;
		for(let y=this._yNum-1;y>=0;y--){
			for(let x=0;x<this._xNum;x++){
				this.setValue(x,y,data[id]);
				id++;
			}
		}
	}

	public setValue(x:number,y:number,value:number):void{
		this._list[x][y]=value;
	}
	public getValue(x:number,y:number):number{
		return this._list[x][y];
	}
	
	/**
	 * 消除
	 * @param x 
	 * @param y 
	 * @param popMinNum 最小能消除的个数
	 * @param results 输出消除的位置
	 * @return 返回消除的范围，小于popMinNum时，返回null
	 */
	public pop(x:number,y:number,popMinNum:number,results:cc.Vec2[]=null):cc.Rect{
		if(!results)results=[];
		this.findFill(x,y,results);
		//this.printPopResult(results,this.getValue(x,y));
		if(results.length>=popMinNum){
			let bounds:cc.Rect=this.deletePosList(results);
			return bounds;
		}
		return null;
	}

	private findFill(x:number,y:number,results:cc.Vec2[]):void{
		let curValue:number=this.getValue(x,y);
		if(curValue==StarType.NOTHING)return;
		if(this.getResultsHasXY(results,x,y))return;
		results.push(cc.p(x,y));
		let x1:number,y1:number;
		//top
		x1=x;
		y1=Math.min(this._yNum-1,y+1);
		if(this.getValue(x1,y1)==curValue)this.findFill(x1,y1,results);
		//bottom
		x1=x;
		y1=Math.max(0,y-1);
		if(this.getValue(x1,y1)==curValue)this.findFill(x1,y1,results);
		//left
		x1=Math.max(0,x-1);
		y1=y;
		if(this.getValue(x1,y1)==curValue)this.findFill(x1,y1,results);
		//right
		x1=Math.min(this._xNum-1,x+1);
		y1=y;
		if(this.getValue(x1,y1)==curValue)this.findFill(x1,y1,results);
	}
	
	private getResultsHasXY(results:cc.Vec2[],x:number,y:number):boolean{
		for(let i=0;i<results.length;i++){
			if(results[i].x==x&&results[i].y==y){
				return true;
			}
		}
		return false;
	}

	public deletePosList(posList:cc.Vec2[]):cc.Rect{
		let xmin=this._xNum-1, xmax=0;
		let ymin=this._yNum-1, ymax=0;
		for(let i=0;i<posList.length;i++){
			let x=posList[i].x;
			let y=posList[i].y;
			this.setEmptyWithXY(x,y);
			xmin=Math.min(xmin,x);
			xmax=Math.max(xmax,x);
			ymin=Math.min(ymin,y);
			ymax=Math.max(ymax,y);
		}
		return cc.rect(xmin,ymin,xmax-xmin,ymax-ymin);
	}

	public drop(bounds:cc.Rect,outResults?:ChangeResult[]):ChangeResult[]{
		if(!outResults)outResults=[];
		let xmin=bounds.xMin;
		let xmax=bounds.xMax;
		let ymin=bounds.yMin;
		for(let x=xmin;x<=xmax;x++){
			let emptyNum=0;
			for(let y=ymin;y<this._yNum;y++){
				let value=this._list[x][y];
				if(value==StarType.NOTHING){
                    emptyNum++;
				}else{
					let newY=y-emptyNum;
					this.setEmptyWithXY(x,y);
                    this.setValue(x,newY,value);
					if(y!=newY){
						if(outResults){
							outResults.push(new ChangeResult(x,y,x,newY));
						}
					}
				}
			}
		}
		return outResults;
	}
	
	/**左移空列*/
	public moveToLeft(bounds:cc.Rect,outResults?:ChangeResult[]):ChangeResult[]{
		if(!outResults)outResults=[];
		let xmin=bounds.xMin;
		//let xmax=bounds.xMax;
        
        let emptyCount=0;
		for(let x=xmin;x<this._xNum;x++){
            let isEmptyCol=true;
            for(let y=0;y<this._yNum;y++){
                if(!this.isEmptyXY(x,y)) isEmptyCol=false;
                if(emptyCount>0){
                    let newX=x-emptyCount;
                    let value=this._list[x][y];
                    this.setEmptyWithXY(x,y);
                    this.setValue(newX,y,value);
                    outResults.push(new ChangeResult(x,y,newX,y));
                }
            }
            if(isEmptyCol) emptyCount++;
		}
		return outResults;
	}
	
	/**检测是否消除完毕*/
	public isPopEnd():boolean{
		let result=true;
		//检测竖向是否有相同的方块
		for(let x=0;x<this._xNum;x++){
			for(let y=1;y<this._yNum;y++){
				let pre=this._list[x][y-1];
				let current=this._list[x][y];
				if(pre==current&&!this.isEmptyXY(x,y-1)){
					result=false;
					break;
				}
			}
		}
		//检测横向是否有相同的方块
		for(let y=0;y<this._yNum;y++){
			for(let x=1;x<this._xNum;x++){
				let pre=this._list[x-1][y];
				let current=this._list[x][y];
				if(pre==current&&!this.isEmptyXY(x-1,y)){
					result=false;
					break;
				}
			}
		}
		return result;
	}
    
    private isEmptyXY(x:number,y:number):boolean{
        return this._list[x][y]==StarType.NOTHING;
    }
    private setEmptyWithXY(x:number,y:number):void{
        this._list[x][y]=StarType.NOTHING;
    }
    
    private isEmptyColumn(x:number):boolean{
        let isEmpty:boolean=true;
        for(let y=0;y<this._yNum;y++){
            if(!this.isEmptyXY(x,y)){
                isEmpty=false;
                break;
            }
        }
        return isEmpty;
    }

	public toString():string{
		let str="";
		for(let y=this._yNum-1;y>=0;y--){
			for(let x=0;x<this._xNum;x++){
				str+=this._list[x][y]+" ";
			}
			str+="\n";
		}
		return str;
	}

	public printPopResult(results:cc.Vec2[],value:number):void{
		let tmpList:number[][]=[];
		for(let x=0;x<this._xNum;x++){
			tmpList[x]=[];
			for(let y=0;y<this._yNum;y++){
				tmpList[x][y]=0;
			}
		}

		for(let i=0;i<results.length;i++){
			tmpList[results[i].x][results[i].y]=value;
		}

		let str:string="";
		for(let y=this._yNum-1;y>=0;y--){
			for(let x=0;x<this._xNum;x++){
				str+=tmpList[x][y]+" ";
			}
			str+="\n";
		}
		cc.log(str);
	}

	public get posList():number[][]{ return this._list; }
	public get xNum():number{ return this._xNum; }
	public get yNum():number{ return this._yNum; }
	

}

/**变更的结果*/
export class ChangeResult extends cc.Object{
	public pos:cc.Vec2;
	public newPos:cc.Vec2;
	public constructor(x:number,y:number,newX:number,newY:number){
		super();
		this.pos=cc.p(x,y);
		this.newPos=cc.p(newX,newY);
	}
}