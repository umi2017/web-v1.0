var menus = {
    init: function () {
        var _this = this;
        $("#navigation").mouseover(function () {
            $("#children").css({
                display: "block"
            })
        });
        $("#menus").mouseleave(function () {
            $("#children").css({
                display: "none"
            })
        });
        var data = this.getData();
        var S = new MouseSpeed();
        $("#navigation").mousemove(function (e) {
            e = e || event;
            var x = e.clientX || e.originalEvent.x || e.originalEvent.layerX || 0;
            var y = e.clientY || e.originalEvent.y || e.originalEvent.layerY || 0;
            var speed = S.speed(x, y, 20);
            if (speed && speed.xspeed !== undefined) {
                _this.SPEED = speed;
            }
        });
        this.setMenus(data);
        $("#navigation").on("mouseover", "li", function () {
            var children = $(this).data("children");
            _this.setChildrenMenus(children);
        })
    },
    getData: function (act) {
        var data = [];
        $.ajax({
            type: "GET",
            async: false,
            url: "data/data.json",
            dataType: "json",
            data: JSON.stringify({
                "menus": act
            }),
            success: function (msg) {
                if (typeof (msg) === "string")
                    msg = JSON.parse(msg);
                data = msg.data;
            }
        });
        return data;
    },
    setMenus: function (data) {
        var menus = data.menus;
        if (!$.isArray(menus)) return;
        var ul = $("#navigation").empty();
        menus.forEach(function (menu, i) {
            var items = menu.items;
            var children = menu.children;
            var li = $("<li></li>").data({
                id: menu.id,
                children: children
            });
            if (!$.isArray(items)) return;
            items.forEach(function (item, index) {
                var str = "";
                if (index === 0)
                    str += "<span class='glyphicon " + menu.icon + "'></span><a target=\"_blank\" href='" + item.command + "'>" + item.name + "</a>";
                else
                    str += "<span>/</span><a target=\"_blank\" href='" + item.command + "'>" + item.name + "</a>";
                li.append(str);
                console.log(li, str)
            });
            ul.append(li);
        })
    },
    setChildrenMenus: function (children) {
        var SPEED=this.SPEED;
        if (SPEED != undefined && SPEED.tilt != undefined)
            var tilt = Math.abs(SPEED.tilt);
        if (SPEED != undefined && SPEED.speed != undefined && SPEED.speed > 200 && tilt < 50 && ( SPEED.xspeed > 1000 || SPEED.quadrant === "1" || SPEED.quadrant === "4")) return;
        if (!$.isArray(children)) return;
        var $children = $("#children").empty();
        children.forEach(function (child, i) {
            var items = child.items;
            var dl = $("<dl><dt><a  target=\"_blank\" href='" + child.command + "'>" + child.name + "</a></dt><dd></dd></dl>");
            if (!$.isArray(items)) return;
            items.forEach(function (item, index) {
                var div = "<div><span>|</span><a  target=\"_blank\" href='" + item.command + "'>" + item.name + "</a></div>"
                dl.find("dd").append(div);
            });
            $children.append(dl);
        });

    }
};
$(function () {
    menus.init();
});