const {ccclass, property} = cc._decorator;
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
		var id:number=0;
		for(let x=0;x<this._xNum;x++){
			for(let y=this._yNum-1;y>=0;y--){
				this.setValue(x,y,data[id]);
				id++;
			}
		}
	}
	public setValue(x:number,y:number,value:number):void{
		this._list[x][y]=value;
	}
	public pop(x:number,y:number):cc.Vec2[]{
		let list:cc.Vec2[]=[];
		cc.log("pos:",this._list[x][y]);
		return list;
	}
	public toString():string{
		let str:string="";
		for(let x=0;x<this._xNum;x++){
			for(let y=this._yNum-1;y>=0;y--){
				str+=this._list[x][y]+" ";
			}
			str+="\n";
		}
		return str;
	}
	

}