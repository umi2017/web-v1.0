/**
 * Created by mpw on 2017/9/26.
 * 鼠标移动速度、倾斜角、象限
 * v-1.0
 * 2017/09/26
 */
/**
 * example:
 * var s = new MouseSpeed();
 * $("body").mousemove(function(e){
 *  e = e || event;
 *  var xx = e.clientX || e.originalEvent.x || e.originalEvent.layerX || 0;
 *  var yy = e.clientY || e.originalEvent.y || e.originalEvent.layerY || 0;
 *  var r=s.speed(xx,yy);
 *  console.log(r)
 *});
 * */

var MouseSpeed = function () {
    this.mouse = {
        start_xmouse: undefined,
        start_ymouse: undefined,
        start_time: undefined,
        last_xmouse: undefined,
        last_ymouse: undefined,
        last_time: undefined,
        tilt: undefined
    };
    this.speed = function (xx, yy, interval) {
        var d = new Date();
        interval = interval || 30;
        //x轴速度，y轴速度，运动速度、斜率（倾斜角度）,象限
        var xspeed = undefined, yspeed = undefined, speed = undefined, tilt = undefined, quadrant = undefined;
        if (this.mouse.start_xmouse === undefined && this.mouse.start_ymouse === undefined) {
            this.mouse.start_xmouse = xx;
            this.mouse.start_ymouse = yy;
            this.mouse.start_time = d.getTime();
        } else if (d.getTime() - this.mouse.start_time > interval) {
            this.mouse.last_xmouse = xx;
            this.mouse.last_ymouse = yy;
            this.mouse.last_time = d.getTime();
            var XL = this.mouse.last_xmouse - this.mouse.start_xmouse;
            var YL = this.mouse.start_ymouse - this.mouse.last_ymouse;
            var during = (this.mouse.last_time - this.mouse.start_time) / 1000;
            xspeed = Math.abs(XL / during);
            yspeed = Math.abs(YL / during);
            speed = Math.round(Math.sqrt(xspeed * xspeed + yspeed * yspeed));
            tilt = Math.round(Math.atan(YL / XL) / Math.PI * 180);
            if (isNaN(tilt))
                tilt = undefined;
            xspeed = Math.round(xspeed);
            yspeed = Math.round(yspeed);
            if (XL >= 0 && YL >= 0)
                quadrant = "1";
            if (XL < 0 && YL >= 0)
                quadrant = "2";
            if (XL < 0 && YL < 0)
                quadrant = "3";
            if (XL >= 0 && YL < 0)
                quadrant = "4";
            this.mouse.start_xmouse = undefined;
            this.mouse.start_ymouse = undefined;
            this.mouse.start_time = undefined;
        }
        if (xspeed !== undefined && yspeed !== undefined) {
            return {
                xspeed: xspeed,
                yspeed: yspeed,
                speed: speed,
                tilt: tilt,
                quadrant: quadrant
            };
        }
    }
};