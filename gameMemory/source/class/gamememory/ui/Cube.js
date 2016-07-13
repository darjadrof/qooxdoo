qx.Class.define("gamememory.ui.Cube",
{
    extend : qx.ui.basic.Atom,

    construct : function (title, icon) {
        this.base(arguments, title, icon);
        this.init(icon);
    },
    
    members:{
        __faceUpImage: null,
        __faceDownImage: "qx/icon/Oxygen/64/emotes/face-smile.png",
        
        init: function(icon){
            this.__faceUpImage = icon;
            this.setMinWidth(60);
            this.setMinHeight(60);
        },
        
        putFaceDown: function(){
            this.setIcon(this.__faceDownImage);
        },
        
        putFaceUp: function(){
            this.setIcon(this.__faceUpImage);
        },
        
        isFaceDown: function(){
            if(this.getIcon()==this.__faceDownImage)
                return true;
            return false;
        }
      
    }

});