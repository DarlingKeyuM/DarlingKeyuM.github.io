function Draw(array, canvas, obj) {
    var ctx = canvas.getContext("2d");
    this.ctxWidth = canvas.width;
    this.ctxHeight = canvas.height;
    this.points = [];
    //绘制xy轴
    this.drawPiex = function() {
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(50, this.ctxHeight - 50);
        ctx.lineTo(this.ctxWidth - 50, this.ctxHeight - 50);
        ctx.moveTo(40, 60);
        ctx.lineTo(50, 50);
        ctx.lineTo(60, 60);
        ctx.moveTo(this.ctxWidth - 60, this.ctxHeight - 60);
        ctx.lineTo(this.ctxWidth - 50, this.ctxHeight - 50);
        ctx.lineTo(this.ctxWidth - 60, this.ctxHeight - 40);
        ctx.stroke();
        ctx.closePath();
    }
    this.drawPoint = function() {
        var length = array.length;
        var x_dis = this.ctxWidth - 100 - 10;
        var per_disX = x_dis / length;
        var y_dis = this.ctxHeight - 110;
        var scale = y_dis / this.getMaxY();
        for (var i = 0; i < array.length; i++) {
            var x = (i + 1) * per_disX + 50;
            var y = this.ctxHeight - scale * array[i].value - 50;
            var p = new Point(x, y);
            this.points.push(p);
        }
        this.beginDrawPoint();
    }

    this.beginDrawPoint = function() {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = obj.lineWidth;
        ctx.stroke();
        this.drawwords();
        this.drawgezi();
        ctx.closePath();
    }
    //绘制文字
     this.drawwords=function(){
        ctx.beginPath();
        ctx.strokeStyle="black";
        ctx.font="13px FangSong";
        for(var i=0;i<array.length;i++){
            console.log(array[i].name);
            console.log(array[i].value);
            ctx.strokeText(array[i].name,this.points[i].x-8,this.ctxWidth - 30);
            ctx.strokeText(array[i].value,15,this.points[i].y);
        }
        ctx.closePath();
    }
    //绘制网格y轴 竖线
    this.drawgezi=function(){
        if(obj.yPiex==true){
        ctx.beginPath();
        for(var i=0;i<array.length;i++){
        ctx.moveTo(this.points[i].x,this.ctxHeight - 460);
        ctx.lineTo(this.points[i].x,this.ctxHeight - 50);
        }
        ctx.strokeStyle = "lightpink";
        ctx.lineWidth = "1px";
        ctx.stroke();
        ctx.closePath();
        }
        //绘制网格x轴,即横线
         if(obj.xPiex==true){
        ctx.beginPath();
        var number=this.getMaxY()/100; //一共28组线
        var numberHeight=(this.ctxHeight-70)/number; //每条线这么高
        console.log(numberHeight);
       
        //计算其y轴
        for(var k=0;k<number;k++){
           numberHeight+=15;
           console.log(k);
           console.log(numberHeight);
             ctx.moveTo(this.ctxWidth-450,numberHeight);
        ctx.lineTo(this.ctxWidth,numberHeight);
        }
      
        ctx.strokeStyle = "lightgrey";
        ctx.lineWidth="1px";
        ctx.stroke();
        ctx.closePath();
     }
    }
    //获得数据的最大值
    this.getMaxY = function() {
        var max = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i].value > max) {
                max = array[i].value;
            }
        }
        return max;
    }
}
//获取其xy轴的坐标
function Point(x, y) {
    this.x = x;
    this.y = y;
}
