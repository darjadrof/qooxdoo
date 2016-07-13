/**
 * @asset(qx/icon/Tango/*)
 */
qx.Class.define("gamememory.ui.Game",
{
    extend : qx.ui.container.Composite,


    construct : function () {
        this.base(arguments);    
        this.init();
    },
    
    members:{
        init: function(){
            this.setLayout(new qx.ui.layout.Dock(10, 5));
            
            /*var easy = new qx.ui.basic.Label("Easy");
            var difficulty = qx.ui.form.ComboBox();
            difficulty.add(easy);*/
            var clicks = new qx.ui.basic.Label("Clicks: 0");
            clicks.setFont("points");
            var count = new qx.ui.basic.Label("Pairs found: 0");
            count.setFont("points");
            var reset = new qx.ui.form.Button("Reset", "qx/icon/Tango/22/actions/dialog-cancel.png");
            
            var statusLayout = new qx.ui.layout.HBox(15);
            statusLayout.setAlignY("middle");
            var status = new qx.ui.container.Composite(statusLayout);
            status.add(reset);
            status.add(count);
            status.add(clicks);
            
            var board = new gamememory.ui.Board();
            board.prepare(15);
            board.addListener("changeTurnedCount", function(e){
                count.setValue("Pairs found: "+e.getData()/2);
            }, this);
            board.addListener("changeClicksCount", function(e){
                clicks.setValue("Clicks: "+e.getData());
            }, this);
            reset.addListener("click", board.reset, board);
            
            this.add(status, {edge: "north"});
            this.add(board, {edge: "center"});
        }
    }
    
});