/**
 * @asset(qx/icon/Oxygen/64/*)
 * @asset(qx/icon/Tango/64/*)
 */

qx.Class.define("gamememory.ui.Board",
{
    extend : qx.ui.container.Composite,


    construct : function () {
        this.base(arguments);    
        this.init();
    },
    
    properties: {
        turnedCount: {
            nullable: false,
            init: 0,
            event: "changeTurnedCount"
        },
        
        clicksCount: {
            nullable: false,
            init: 0,
            event: "changeClicksCount"
        }
    },
    
    
    events: {
        "changeTurnedCount": "qx.event.type.Data",
        "changeClicksCount": "qx.event.type.Data"
    },

    members:{
        __facedupCubes: [],
        __clickCount: 0,
        __allCount: 0,
        __cubes: [],
        
        availablePictures: [
            "qx/icon/Oxygen/64/categories/development.png",
            "qx/icon/Oxygen/64/categories/graphics.png",
            "qx/icon/Oxygen/64/categories/accessories.png",
            "qx/icon/Oxygen/64/categories/science.png",
            "qx/icon/Oxygen/64/categories/games.png",
            "qx/icon/Oxygen/64/categories/internet.png",
            "qx/icon/Oxygen/64/categories/multimedia.png",
            "qx/icon/Oxygen/64/categories/office.png",
            "qx/icon/Oxygen/64/categories/engineering.png",
            "qx/icon/Oxygen/64/categories/system.png",
            "qx/icon/Tango/64/categories/games.png",
            "qx/icon/Tango/64/categories/science.png",
            "qx/icon/Tango/64/categories/accessories.png",
            "qx/icon/Tango/64/categories/office.png",
            "qx/icon/Tango/64/categories/graphics.png"
        ],
        
        init: function(){
            this.setBackgroundColor("white");
            this.setLayout(new qx.ui.layout.Grid(5, 5));
        },
        
        prepare: function(pairs){
            if(!pairs || pairs>this.availablePictures.length)
                return;
            
            this.__allCount = pairs*2;
            
            var cubes = [];
            for(var i=0; i<pairs; i++){
                var picture = this.availablePictures[i];
                var cubeFirst = new gamememory.ui.Cube(null, picture);
                var cubeSecond = new gamememory.ui.Cube(null, picture);
                cubes.push(cubeFirst);
                cubes.push(cubeSecond);
            }
            
            this.__cubes = this.shuffle(cubes);
            this.createCubes(this.__cubes);
            
        },
        
        createCubes: function(cubes){
            var maxColumnCount = Math.ceil(Math.sqrt(cubes.length)); 
            var currentColumn = 0;
            var currentRow = 0;
            for(var c=0; c<cubes.length; c++){
                var cube = cubes[c];
                cube.putFaceDown();
                cube.addListener("click", function(e){
                    if(e.getTarget().isFaceDown()){
                        this.turnCubeFaceUp(e.getTarget());
                    }
                }, this);
                this.add(cube, {column: currentColumn++, row: currentRow});
                
                if(currentColumn==maxColumnCount){
                    currentColumn = 0;
                    currentRow++;
                }
            }
        },
        
        reset: function(){
            this.setTurnedCount(0);
            this.setClicksCount(0);
            
            this.__cubes = this.shuffle(this.__cubes);
            this.createCubes(this.__cubes);
        },
        
        shuffle: function(cubes){
            var shuffled = [];
            
            while(cubes.length>0){
                var randomNum = Math.floor((Math.random() * cubes.length)); 
                shuffled.push(cubes[randomNum])
                cubes.splice(randomNum, 1);
            }
            return shuffled;
        },
        
        turnCubeFaceUp: function(cube){
            cube.putFaceUp();
            this.setClicksCount(this.getClicksCount()+1);
            this.__facedupCubes.push(cube);
            
            if(this.__facedupCubes.length>1){
                if(this.__cubesAreEqual(this.__facedupCubes[0], this.__facedupCubes[1])){
                    this.setTurnedCount(this.getTurnedCount()+2);
                    
                    if(this.__allCubesTurned())
                        alert("Congratulations! You won with "+this.getClicksCount()+" clicks!");
                }else{
                    // If cubes are different, turn them back down after some time.
                    setTimeout((function(cubes){
                        return function(){
                            for(var i=0; i<cubes.length; i++){
                               cubes[i].putFaceDown();
                            }
                        }
                    })(this.__facedupCubes), 1000);
                }
                
                this.__facedupCubes=[];
                
            }
        },
        
        __cubesAreEqual: function(cube1, cube2){
            return (cube1.getIcon()==cube2.getIcon());
        },
        
        __allCubesTurned: function(){
            return (this.__allCount==this.getTurnedCount());
        }
      
    }

});