import { MyGame } from "./MyGame";

const {ccclass, property} = cc._decorator;
@ccclass
export class Title extends cc.Component {
    @property(MyGame)
    public game:MyGame=null;

    protected onLoad() {
        cc.log("===title on load");
        var title_bg:cc.Node=this.node.getChildByName("title_bg");
        //title_bg.getComponent(cc.Widget).target=cc.Canvas.instance.node;
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
