/**
 * Created by Nvi.
 */
//首页动画
var canvas, stage, exportRoot;

function init() {
    //var canvasWidth = $(".indexPage1").width();
    //var canvasHeight = canvasWidth / 1920 * 800;
    //document.getElementById("canvas").setAttribute("width",canvasWidth);
    //document.getElementById("canvas").setAttribute("height",canvasHeight);
    // --- write your JS code here ---
    var canvasTop = $(".indexPage1").height() / 2 - 400;
    $("canvas").css("top",canvasTop);

    createjs.MotionGuidePlugin.install();

    canvas = document.getElementById("canvas");
    exportRoot = new lib.index();

    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);
    stage.update();

    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener("tick", stage);
}

$(document).ready(function(){
    //页面最小高度控制
    $(function(){
        var mainMinHeight = $(document).height() - $("header").height() - $("footer").height() - 40;
        $("main").css("min-height",mainMinHeight);
    });
    $(function(){
        var editNow;

    });
    //日期选择器初始化
    $(function(){
        if($('.datepicker').length > 0) {
            console.log("OK!");
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year

                format: 'yyyy-mm-dd',
                weekdaysLetter: ['日', '一', '二', '三', '四', '五', '六'],
                today: '今天',
                clear: '清除',
                close: '关闭',
                monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                weekdaysFull: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']



            });
        }
    });

    //列表选择控件初始化
    $(function(){
        if($('select').length > 0) {
            $('select').material_select();
        }
    });

//首页动画控制
    $(function(){
        var firstLogo = $("#firstLogo");
        var indexBoxItem = $(".indexBoxItem");
        var h2 = $("H1");
        var searchBox = $(".search");
        var catNav = $(".catNav");
        var mainNav = $("#mainNav");
        if($(firstLogo).length > 0){
            firstLogo.css("visibility","hidden");
            firstLogo.addClass("animated").addClass("fadeInRight").css("visibility","visible");
        }
        if($(h2).length > 0){
            h2.css("visibility","hidden");
        }
        if($(searchBox).length > 0){
            searchBox.css("visibility","hidden");
        }
        if($(indexBoxItem).length > 0){
            indexBoxItem.css("visibility","hidden");
        }
        if($(mainNav).length > 0){
            mainNav.addClass("animated").addClass("slideInDown").css("visibility","visible");
        }
        setTimeout(function(){
            catNav.addClass("animated").addClass("fadeIn").css("visibility","visible");
        }, 500);
        if($('.pageShow').length > 0){
            console.log("show this");
            $('.pageShow').fullpage({
                sectionsColor: ['#ffffff', '#3e4b62'],
                'navigation': true,
                'anchors': ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
                'afterLoad': function(anchorLink, index){
                    if(index == 2){
                        h2.css("visibility","visible").addClass("animated").addClass("bounceInDown");
                        searchBox.css("visibility","visible").addClass("animated").addClass("bounceIn");
                        indexBoxItem.css("visibility","visible").addClass("animated").addClass("bounceIn");
                        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
                        $('.modal').modal();
                    }
                }
            });
            setTimeout($.fn.fullpage.moveSectionDown, 5000);
        }else if($(searchBox).length > 0){
            searchBox.css("visibility","visible").addClass("animated").addClass("bounceIn");
        }
    });
    //导航菜单显示
    $(function(){
        if($(".menuBox").length > 0){
            var menuBox = $(".menuBox");
            var menuBt = $('.nav-wrapper>ul.left>li');
            var menuSat = 0;
            var liNum;
                menuBt.mouseover(function(){
                    if($(this).index() != 0) {

                        menuBt.removeClass("active");
                        $(this).addClass("active");
                        liNum = $(this).index() - 1;
                        menuSat = 1;
                        menuBox.slideDown();
                        $("ul.menuShow>li").removeClass("active");
                        $("ul.menuShow>li:eq(" + liNum + ")").addClass("active");
                    }
                });

                if(menuSat == 0){
                    menuBox.mouseleave(function(){
                        menuBox.slideUp();
                        menuBt.removeClass("active");
                        menuSat = 0;
                    });
                }


        }
    });
    var getPushpin = function(){
        setTimeout(function() {
            var tocWrapperHeight = 0; // Max height of ads.
            var tocHeight = $('.toc-wrapper .table-of-contents').length ? $('.toc-wrapper .table-of-contents').height() : 0;
            var socialHeight = 95; // Height of unloaded social media in footer.
            var footerOffset = $('body > footer').first().length ? $('body > footer').first().offset().top : 0;
            var bottomOffset = footerOffset - socialHeight - tocHeight - tocWrapperHeight;
            if ($('nav').length) {
                $('.toc-wrapper').pushpin({
                    top: $('nav').height(),
                    bottom: bottomOffset
                });
            }
            else if ($('#index-banner').length) {
                $('.toc-wrapper').pushpin({
                    top: $('#index-banner').height(),
                    bottom: bottomOffset

                });
            }
            else {
                $('.toc-wrapper').pushpin({
                    top: 0,
                    bottom: bottomOffset
                });
            }
        }, 100);
    };
    getPushpin();
    $('.collapsible-header').click(function(){
        getPushpin();
    });
    $('.scrollspy').scrollSpy();
    if ($('#gzgwTab').length) {
        $('#gzgwTab').tabs({ 'swipeable': true });
    }

    $('input#search').focus(function() { $(this).parent().addClass('focused'); });
    $('input#search').blur(function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });
});

