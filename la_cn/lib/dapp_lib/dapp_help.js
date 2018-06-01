"use strict";

$(".Help_main").css("pointer-events", "auto");

function button_Help_Top_House_down() {
    $(".Help_top_house").css("opacity", "0.25");
}
function button_Help_Top_House_move() {
    $(".Help_top_house").css("opacity", "0.6");
}
function button_Help_Top_House_out() {
    $(".Help_top_house").css("opacity", "0.85");
}
function button_Help_Top_House_up() {
    $(".Help_top_house").css("opacity", "0.85");
    window.location.href = "dapp_house.html";
}

function button_Help_Top_Language_down() {
    $(".Help_top_Language").css("opacity", "0.35");
}
function button_Help_Top_Language_move() {
    $(".Help_top_Language").css("opacity", "0.75");
}
function button_Help_Top_Language_out() {
    $(".Help_top_Language").css("opacity", "1");
}
function button_Help_Top_Language_up() {
    $(".Help_top_Language").css("opacity", "1");
    var url = window.location.href;
    var new_url = url.replace("la_cn", "la_us");
    window.location.href = new_url;
}

function ImgOpen(index) {
    $("#Preview").addClass("Preview");
    document.getElementById("Preview").innerHTML = "<div id=\"Preview_Img_" + index + "\" class=\"Preview_Img_" + index + "\" onclick=\"ImgClose(" + index + ")\"></div>";
}
function ImgClose(index) {
    $("#Preview").removeClass("Preview");
    $("div").remove("#Preview_Img_" + index);
}
