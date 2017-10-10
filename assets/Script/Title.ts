const {ccclass, property} = cc._decorator;
import {Game} from"./Game";
@ccclass
export class Title extends cc.Component {
    @property(Game)
    public game:Game=null;

    protected onLoad() {
        cc.log("===title on load");
        var title_bg:cc.Node=this.node.getChildByName("title_bg");
        title_bg.getComponent(cc.Widget).target=cc.Canvas.instance.node;
    }
    
    public clickHandler(event:TouchEvent,data:string):void{
        cc.log(event.type);
        switch(data){
            case "startGame":
            this.game.gotoLevel(1);
            this.node.destroy();
            break;
        }
    }
}
