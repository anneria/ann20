// responsive images & breakpoints
var desktopBreak = 1023,
tabletBreak = 700,
mobileBreak = 320,
screenWidth = 0,
screenHeight = 0,
screenType = "mobile";

particlesJS.load("particles-js", "assets/js/vendor/particles.data.js");

$(document).ready(function(){

    if (window.location.pathname == "/cv.html") {
      $('[href="cv.html"]').removeClass("textLink").addClass("active");
    } else {
        $(".navDev").removeClass("textLink").addClass("active");
    }

    //PRETTY ON READY
    setTimeout(function() {
        hamburgerIn();
        $("html").addClass("loaded")
    }, 200)

    // swop inline images to background
    swapDataSrc();
    swapImgSource();

    // logo animation
    if ($(".logo").length) {
        var eyeLidLeft = $("#eyelidleft"),
            eyeLidRight = $("#eyelidright"),
            jaw = $("#jawline"),
            jawLength = Math.round($("#jawline").get(0).getTotalLength()),
            hair = $("#hairLine"),
            hairLength = Math.round($("#hairLine").get(0).getTotalLength()),
            tlJawDraw = new TimelineMax(), // draw jaw line
            tlHairDraw = new TimelineMax(), // draw hair line
            tlEyesDraw = new TimelineMax({onComplete: function(){ // blink eyes
                tlEyesBlink = new TimelineMax({
                    repeat: -1
                });
                tlEyesBlink
                    .to(eyeLidLeft, .09, { attr: {"ry": 0} }, 4.5)
                    .to(eyeLidLeft, .09, { attr: {"ry": 9.4} })
                    .to([eyeLidLeft,eyeLidRight], .09, { attr: {"ry": 1} }, "+=3")
                    .to([eyeLidLeft,eyeLidRight], .09, { attr: {"ry": 9.4} })
                    .to([eyeLidLeft,eyeLidRight], .09, { attr: {"ry": 0} })
                    .to([eyeLidLeft,eyeLidRight], .09, { attr: {"ry": 9.4} });
            }});
        // draw hair
        hair.css("stroke-dasharray", hairLength);
        tlHairDraw
            .fromTo(hair, 3, { "stroke-dashoffset": hairLength}, { "stroke-dashoffset": 0, ease: Linear.easeNone}, 1);
        $(".logo").hover(function() {
            tlHairDraw.reverse();
        }, function() {
            tlHairDraw.play();
        });
        // blink eyes
        tlEyesDraw
            .to(eyeLidLeft, 1.2, {strokeDashoffset: 0, opacity: 1})
            .add("startDrawingEyes")
            .to(eyeLidRight, 1.2, {strokeDashoffset: 0, opacity: 1}, "startDrawingEyes-=1.05"); 
        // draw jaw
        jaw.css("stroke-dasharray", jawLength);
        tlJawDraw
            .fromTo(jaw, .8, { "stroke-dashoffset": jawLength}, { "stroke-dashoffset": 0}, 1)
        setTimeout(function(){
            $(".logo").addClass('done');
        }, 1200)
    }
});



$(window).resize(function () {
    // Replace img src based on device screen size
    if ($("img.responsive").length) {
        swapDataSrc();
    }
    // Convert inline image to background
    if ($("img.bg").length) {
        swapImgSource();
    }
});

// function
// check for screen res
function resetScreenVars() {
    screenWidth = $(window).width();
    screenHeight = $(window).height();
    if (screenWidth > desktopBreak) {
        screenType = "desktop";
    } else if (screenWidth >= tabletBreak) {
        screenType = "tablet";
    } else {
        screenType = "mobile";
    }
}
// swop inline images to background
function swapImgSource() {
    // resetScreenVars();
    $("img.bg").each(function() {
        var src = $(this).attr("src");
        $(this).attr("src", src);
        var p = $(this).parent();
        p.css("background-image", "url(" + src + ")");
        p.addClass("cover");
    });
}
// swop data source on screensize
function swapDataSrc() {
    resetScreenVars();
    if($("img[data-" + screenType + "]").length) {
        $("img[data-" + screenType + "]").addClass("imgData");
        $(".imgData").each(function () {
            $(this).attr("src", $(this).data(screenType));
        });
    }
}

// PRETTY ON READY
// load the hamburger menu lines
function hamburgerIn() {
    var hamline01 = $("#hamline01"),
        hamline02 = $("#hamline02"),
        hamline03 = $("#hamline03"),
        hamlines = $("#hamline01", "#hamline02", "#hamline03");

        TweenMax.to(hamline01, .5, {"stroke-dashoffset": 0} );  
        TweenMax.to(hamline02, .3, {"stroke-dashoffset": 0} );  
        TweenMax.to(hamline03, .1, {"stroke-dashoffset": 0} );  
}

// HAMBURGER MENU
function hamburgerHover() {
    var hamlineBun = $("#hamlineBun"),
        hamlineBunLength = hamlineBun.get(0).getTotalLength();
    TweenMax.to(hamlineBun, .3, {"stroke-dashoffset": hamlineBunLength * 2} ); 
    TweenMax.fromTo(hamline02, .3, 
        {attr: {d: "M 1,41.2 c 5,0, 5,2, 10,2 s 5 -2, 10 -2, 5 2, 10 2, 5 -2, 10 -2, 5 2, 10 2, 5 -2, 10 -2"}},
        {attr: {d: "M 1,41.2 c 5,0, 5,-2, 10,-2 s 5 2, 10 2, 5 -2, 10 -2, 5 2, 10 2, 5 -2, 10 -2, 5 2, 10 2"}, yoyo: true, repeat: -1, ease:Power1 .easeInOut} );   
}
function hamburgerHoverOut() {
    var hamlineBun = $("#hamlineBun"),
        hamlineBunLength = hamlineBun.get(0).getTotalLength();
    TweenMax.to(hamlineBun, .3, {"stroke-dashoffset": hamlineBunLength} ); 
    TweenMax.to(hamline02, .3, {attr: {d: "M 1,41.2 c 5 0, 5 0, 10 0 s 5 0, 10 0, 5 0, 10 0, 5 0, 10 0, 5 0, 10 0, 5 0, 10 0"}} ); 
}
$("#navTrigger").hover(function() {
    hamburgerHover();
    $(this).addClass("complete-bun");
}, function() {
    hamburgerHoverOut();
    $(this).removeClass("complete-bun");
});

// MENU
function menuOpen() {
    $("#nav").removeClass("nav-default nav-closed").addClass("nav-open");
    $("html").addClass("no-scroll");
    setTimeout(function() {
        $(".menu").removeClass("menu-closed").addClass("menu-open");
        $("#btnCloseNav").addClass("active");
    }, 300);
}
function menuClose() {
    $(".menu").removeClass("menu-open").addClass("menu-closed nav-default");
    $("#btnCloseNav").removeClass("active");
    setTimeout(function() {
        $("#nav").addClass("nav-closed").removeClass("nav-open");
        $("html").removeClass("no-scroll");
    }, 400);
}
$("#navTrigger").on("click", function(event) { 
    event.preventDefault();
    menuOpen();
});
$("#btnCloseNav").on("click", function(event) {
    event.preventDefault();
    menuClose();
});

// TEXT LINKS
$(".textLink span").mouseover(function(){
    if ($(window).width() > tabletBreak) {
        $(this).removeClass("out");
    }
});
$(".textLink span").mouseout(function(){
    if ($(window).width() > tabletBreak) {
        $(this).addClass("out");
    }
});

// THUMBNAILS > PROJECT PANEL
$(".devThumb").on("click", function(event) {
    event.preventDefault();

    // add loader later

    var dataThumb = $(this).data("thumb");
    $(".devDetailPanel .container").hide();
    $(".devDetailPanel .hero").hide();
    $("." + dataThumb + "Content").show();
    $("." + dataThumb + "Hero").show();
    // animate panel
    $("html").addClass("no-scroll");
    $(".devDetailPanelLoad").addClass("active"); 
    $(".devDetailPanel").addClass("active"); 
    $(".hero").addClass("active");
    setTimeout(function(){
        $(".panelContent").addClass("active");
        $(".btnClosePanel").addClass("active");
    }, 850);
});

// PROJECT PANEL CLOSE
$(".btnClosePanel").on("click", function(event) {
    event.preventDefault();
    $(".panelContent").removeClass("active");
    $(".btnClosePanel").removeClass("active");
    $(".hero").removeClass("active");
    $(".devDetailPanel").removeClass("active").addClass("inactive"); 
    setTimeout(function(){ 
        $(".devDetailPanelLoad").removeClass("active").addClass("inactive"); 
        $("html").removeClass("no-scroll");
    }, 300);
    setTimeout(function(){ 
        $(".devDetailPanelLoad").removeClass("inactive");
        $(".devDetailPanel").removeClass("inactive")
    }, 1000);
});