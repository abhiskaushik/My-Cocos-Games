

//global variables

var gameArray=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18];
var pickedTile=[];
var scoreText;
var moves=0;
var gameLayer;


//function that shuffles the array everytime..

var shuffle = function(v){
for(var j, x, i = v.length; i;j = parseInt(Math.random() * i),
x = v[--i], v[i] = v[j], v[j] = x);
return v;

}

    
        
function checkTiles(){

    moves++;
    scoreText.setString("Moves: " +moves);

        var pause=setTimeout(function(){
            

            if(pickedTile[0].pictureValue!=pickedTile[1].pictureValue){
                    pickedTile[0].initWithFile("res/anime0.gif");
                    pickedTile[1].initWithFile("res/anime0.gif");
                }
                else{
                    gameLayer.removeChild(pickedTile[0]);
                    gameLayer.removeChild(pickedTile[1]);
                }
                pickedTile=[];
            },2000); 
  }



var gameScene = cc.Scene.extend({
    onEnter:function () {
        gameArray=shuffle(gameArray);
        this._super();

            gameLayer = new game();
            gameLayer.init();
           this.addChild(gameLayer);
    }
});


var game = cc.Layer.extend({
    
    init:function () {
    this._super();

    var gradient=cc.LayerGradient.create(cc.color(0,0,0,255),cc.color(0x46,0x82,0xB4,255));
                  
                  this.addChild(gradient);

                 scoreText=cc.LabelTTF.create("Moves: 0","Cursive","22",cc.TEXT_ALIGNMENT_CENTER);
                 this.addChild(scoreText);
                 scoreText.setPosition(200,20); 

    
    for(var i=0;i<36;i++){
        var tile=new memoryTile();
        tile.pictureValue=gameArray[i];
        this.addChild(tile,0);
        tile.setPosition(49+i%6*58,390-Math.floor(i/6)*65);

    }

    }
});


var listener=cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches:true,
    onTouchBegan: function(touch,event){

        if(pickedTile.length<2){

        var target=event.getCurrentTarget();
        var location=target.convertToNodeSpace(touch.getLocation());
        var targetSize=target.getContentSize();
        var targetRectangle=cc.rect(0,0,targetSize.width,targetSize.height);

          if(cc.rectContainsPoint(targetRectangle,location)){
            target.initWithFile("res/anime"+target.pictureValue+".gif");
             pickedTile.push(target);

            if(pickedTile.length==2){
                checkTiles();
            }
          }
   }
}

    


});





var memoryTile=cc.Sprite.extend({
    ctor:function(){
        this._super(),
        this.initWithFile("res/anime0.gif");
        cc.eventManager.addListener(listener.clone(),this);
    }
});






