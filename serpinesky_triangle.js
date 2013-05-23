// Lines that start with two forward slashes
// are documentation texts.
// 
// Try changing the numbers. 
// You can also copy and paste lines
reset();
drawDuration = 10;
hopDuration = 0;

hopTo(70,220);

var s = 50;

var serp = function(s) {
    if(s < 10){
        forward(s);
    } else {
        s = s / 9;

            serp(s);
            turnLeft(60);
            serp(s);
            turnRight(120);
            serp(s);
            turnLeft(60);
            serp(s);
            
        turnLeft(60);
        
            serp(s);
            turnLeft(60);
            serp(s);
            turnRight(120);
            serp(s);
            turnLeft(60);
            serp(s);
            
        turnRight(120);
        
            serp(s);
            turnLeft(60);
            serp(s);
            turnRight(120);
            serp(s);
            turnLeft(60);
            serp(s);
            
        turnLeft(60);
        
            serp(s);
            turnLeft(60);
            serp(s);
            turnRight(120);
            serp(s);
            turnLeft(60);
            serp(s);



    }
};

var ss = 9*9*9;
serp(ss);turnRight(120);
serp(ss);turnRight(120);
serp(ss);turnRight(120);

hopTo(0,0);