import { MyGame } from "./MyGame";

const {ccclass, property} = cc._decorator;

@ccclass
export class MessageUI extends cc.Component {
    @property(cc.Node)
    private game:MyGame=null;
    @property(cc.Label)
    private scoreLabel:cc.Label=null;
    public start():void{
        
    }
    
    public setScoreLabelText(text:string):void{
        this.scoreLabel.string=text;
    }
}
