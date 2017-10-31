const { ccclass, property } = cc._decorator;
    
export enum StarType{
    NOTHING=0,
    RED=1,
    GREEN=2,
    BLUE=3,
    YELLOW=4,
    PURPLE=5
}

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

	public pop(x:number,y:number):cc.Vec2[]{
		let results:cc.Vec2[]=[];
		this.findFill(x,y,results);
		this.printPopResult(results,this.getValue(x,y));
		this.deletePosList(results);
		return results;
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

	private deletePosList(posList:cc.Vec2[]):cc.Rect{
		let xmin=this._xNum-1, xmax=0;
		for(let i=0;i<posList.length;i++){
			let x=posList[i].x;
			let y=posList[i].y;
			this._list[x][y]=StarType.NOTHING;
			xmin=Math.min(xmin,x);
			xmax=Math.max(xmax,x);
		}
		let ymin, ymax;
		return cc.rect(xmin,ymin,xmax,ymax);
	}

	public drop(xmin:number,xmax:number):void{
		for(let x=xmin;x<xmax;x++){
			let emptyNum=0;
			for(let y=0;y<this._yNum;y++){
				let value=this._list[x][y];
				if(value==StarType.NOTHING){
                    emptyNum++;
				}else{
					this._list[x][y]=StarType.NOTHING;
					this._list[x][y-emptyNum]=value;
				}
			}
		}
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


	

}
