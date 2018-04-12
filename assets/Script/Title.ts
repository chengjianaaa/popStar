import MyGame from "./MyGame";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Title extends cc.Component {
    @property(MyGame)
    public game:MyGame=null;

    protected start() {
        cc.log("===title start");
        var title_bg:cc.Node=this.node.getChildByName("title_bg");
        title_bg.getComponent(cc.Widget).target=cc.Canvas.instance.node;
    }
    
    public clickHandler(event:TouchEvent,data:string):void{
        cc.log(event.type);
        switch(data){
            case "startGame":
            this.game.gotoLevel(this.game.getLevelWithLocal());
            this.node.destroy();
            break;
        }
    }
}
