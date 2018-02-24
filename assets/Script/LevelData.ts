import { StarType } from "./StarType";

const {ccclass,property}=cc._decorator;
@ccclass
export class LevelData extends cc.Object{
    
    public static getRandomData():number[]{
        let starTypes=[
            StarType.RED,
            StarType.GREEN,
            StarType.BLUE,
            StarType.YELLOW,
            StarType.PURPLE
        ];
        
        let list=[];
        for(let i=0;i<100;i++){
            list[i]=starTypes[(Math.random()*starTypes.length)>>0];
        }
        return list;
    }
    
    public static getData(level:number):number[]{
        //cc.log(level);
        return LevelData["level_"+level]();
    }
    public static level_1():number[]{
        return [
            3,1,1,1,1,2,1,1,1,4,
            1,1,1,1,1,2,1,1,1,1,
            1,1,1,1,1,2,1,1,1,1,
            1,1,1,1,1,2,1,1,1,1,
            1,1,1,1,5,2,5,1,1,1,
            1,1,1,5,5,2,5,1,1,1,
            1,1,1,1,5,2,1,1,1,1,
            1,1,1,1,1,2,1,1,1,1,
            1,1,1,1,1,2,1,1,1,1,
            2,1,1,1,1,2,1,1,1,1
        ];
    }
    public static level_2():number[]{
        return [
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1,1,1
        ];
    }
    
}