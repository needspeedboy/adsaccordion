/**
 * Created by Administrator on 2016/4/14.
 */
var data = [1,2,3,4,5,6];
var currIndex = 5;
var isTouch = false;
var adWidth = 300;
var adHeight = 250;
var menuWidth = 35;
var isLeft = [];
var duration= 600;
var auto = null;

$(function() {

    console.log('data: ', data);

    var container = document.getElementById("container");
    var pages = document.querySelectorAll('.page');
    var slip = Slip(container, 'x').webapp(pages);
    slip.width(adWidth);
    rendCurr();

    function rendCurr() {
        $("#container").css('width',adWidth + menuWidth *data.length + 'px');
        for (var i = 0; i < data.length; i++) {
            var _num = data[i];
            //console.log('index ', index,'_num', _num,'currIndex',currIndex);
            $("#container").append('<div class="page" id="page-' + _num + '"></div>');
            $("#page-" + _num).css("background-image", "url(" + _num + ".jpg)");
            $("#page-" + _num).css('width', adWidth + "px");
            $("#page-" + _num).css('height', adHeight + "px");
            $("#page-" + _num).css('left', 35+i*menuWidth + "px");
        }
        $("#mask").css('width',adWidth+'px');
        $("#mask").css('height',adHeight+'px');
        $("#mask").css('left',i*menuWidth+adWidth +'px');
        $("#mask").css('top',0 +'px');

        $("#menu").css('width', menuWidth*data.length + "px");
        for (var i = 0; i < data.length; i++) {
            var _num = data[i];
            $("#menu").append('<div class="menu" id="menu-' + _num + '"></div>');
            $("#menu-" + _num).css('background', "#FFFF00");

            $("#menu-" + _num).css('width', menuWidth + "px");
            $("#menu-" + _num).css('height', adHeight + "px");
            $("#menu-" + _num).html("商品"+_num);
            $("#menu-" + _num).addClass('opacity');
            $("#menu-" + _num).click(clickHandler);
            isLeft.push(1);

            function clickHandler(){
                console.log('index : ',this.id.split("-")[1]);
                //var _num = parseInt(this.id.split("-")[1])-1;

                currIndex = findIndex(this.id.split("-")[1]);
                currIndex = indexCheck(currIndex);

                //slip.setCoord({'x': adWidth+menuWidth*_num},document.getElementById("page-" + _num));
                var curr,page;
                if(isLeft[currIndex])// goright
                {
                    for(var i=currIndex;i<data.length;i++)
                    {
                        if(isLeft[i])
                        {
                            curr= document.getElementById("menu-" + data[i]);
                            slip.setAni(duration+(data.length-i)*30,curr);
                            slip.setCoord({'x': adWidth},curr);

                            page= document.getElementById("page-" + data[i]);
                            slip.setAni(duration+(data.length-i)*30,page);
                            slip.setCoord({'x': adWidth},page);

                            isLeft[i] = isLeft[i]?0:1;
                        }
                    }
                }else{ // goleft
                    for(var i=currIndex;i>=0;i--)
                    {
                        if(!isLeft[i])
                        {
                            curr= document.getElementById("menu-" + data[i]);
                            slip.setAni(duration+i*10,curr);
                            slip.setCoord({'x': 0},curr);

                            page= document.getElementById("page-" + data[i]);
                            slip.setAni(duration+i*10,page);
                            slip.setCoord({'x': 0},page);

                            isLeft[i] = isLeft[i]?0:1;
                        }

                    }

                }
                setTimeout(function(){
                    isTouch = false;
                },4400);
                isTouch = true;


            }
        }
        //slip.setAni(0);
        //slip.setCoord({'x': -adWidth});
    }

    function indexCheck(index) {
        if (index > data.length - 1)index = 5;
        if (index < 1)index = 1;
        return index;
    }
    function findIndex(num)
    {
        for(var i in data)
        {
            if(num == data[i].toString())return parseInt(i);
        }

    }
    auto = setInterval(function(){
        if(!isTouch)
        {
            var _num = data[currIndex];
            var curr= document.getElementById("menu-" + _num);
            var page= document.getElementById("page-" + _num);
            slip.setAni(duration,curr);slip.setAni(duration,page);
            (isLeft[currIndex])?slip.setCoord({'x': adWidth},curr):slip.setCoord({'x': 0},curr);
            (isLeft[currIndex])?slip.setCoord({'x': adWidth},page):slip.setCoord({'x': 0},page);
            isLeft[currIndex] = isLeft[currIndex]?0:1;
            (isLeft[currIndex])?currIndex++:currIndex--;
            currIndex = indexCheck(currIndex);
        }
    },2000);
});