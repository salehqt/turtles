
jQuery(function(){
    var editor = ace.edit("editor");
    editor.setHighlightActiveLine(false);
    editor.setTheme("ace/theme/clouds");
    editor.getSession().setMode("ace/mode/javascript");
    editor.focus();
    
    var currentAngle = 0;


	var cc = document.getElementById('canvas-container');
	var da = document.getElementById('drawing-area');
	da.width = cc.clientWidth ;
	da.height = cc.clientHeight;

	var clearCanvas = function(){
		var ctx = document.getElementById('drawing-area').getContext('2d');
		ctx.clearRect(0,0,da.width,da.height);
		
	}
    var drawFunc = function(a,p,c) {
	var ctx = document.getElementById('drawing-area').getContext('2d');
	if (p > 0){
		if((p - this.lastP) > 0.2 || p == 1.0) {
		ctx.beginPath();
		ctx.moveTo(this.lastLeft, this.lastTop);
		ctx.lineTo(this.offsetLeft , this.offsetTop );
		ctx.stroke();
		ctx.closePath();
		this.lastP = p;
		this.lastLeft = this.offsetLeft;
		this.lastTop = this.offsetTop;
		}
	}
	else{ this.lastP = p; 	this.lastLeft = this.offsetLeft;
	this.lastTop = this.offsetTop; }
	
    }
    
    var drawDuration = 400;
    var hopDuration = 100;
    var options = function(){ return {progress: drawFunc, duration: drawDuration }; };
    
    var t = $("#turtle");
    var tt = $("#turtle").get()[0];
    var moveTo = function(x,y){
	t.animate({ left : x, top : y }, {progress: drawFunc});	
    }
    var moveBy = function(x,y){
	return t.animate({ left : "+=" + x, top : "+=" + y}, options() );
    };
    var hopBy = function(x,y) {
	t.animate({ left : "+=" + x, top : "+=" + y}, { duration : hopDuration });
    }
    var hopTo = function(x,y) {
	t.animate({ left :  x, top :  y}, { duration : hopDuration } );
    }
    var forward = function(amount) {
	amount = amount || 10;
	var x = Math.cos(currentAngle) * amount;
	var y = Math.sin(currentAngle) * amount;
	moveBy(x,y);
    }
    var setAngle = function(angle){
	currentAngle = angle;
	t.animate({ rotate : currentAngle +"rad" }, { duration : hopDuration } );
    }
    var turn = function(amount) {
	setAngle(currentAngle + amount * Math.PI / 180)
    }
    var turnLeft = function(amount) { turn(-(amount || 90)); }
    var turnRight = function(amount) { turn(+(amount ||90)); }
    
    var reset = function() {
	t.css({left: 0, top: 0, transform : '' });
	setAngle(0);
	clearCanvas();
    };
    var runFunc = function(){
	try {
	  var r = eval(editor.getValue());
	  var l = $("#log").val();
	  $("#log").val(l + r  + "\n");
	} catch(e) {
	  alert(e);
	}
    };
    
    shortcut.add("Ctrl+E", runFunc);
    shortcut.add("Meta+E", runFunc);
    $("#run").click(runFunc);
});
