"use strict";

$(".House_main").css("pointer-events", "auto");

function ToHTML_House_Preview_Restore() {
    var string = "";
    string += "<div class=\"House_center_Preview_Background\" onclick=\"OnClick_House_Preview_Background()\"></div>";
    string += "<div id=\"House_Preview_Restore\" class=\"House_Preview_Restore\">";
    string += "<div class=\"House_Preview_Restore_Head\"><label>Recovery Project</label></div>";
    string += "<div class=\"House_Preview_Restore_Key\"><label>Number:</label><input id=\"House_Preview_Restore_Key\" maxlength=\"20\" type=\"text\" /></div>";
    string += "<div class=\"House_Preview_Restore_Pass\"><label>Pass:</label><input id=\"House_Preview_Restore_Pass\" maxlength=\"20\" type=\"text\" /></div>";
    string += "<div class=\"House_Preview_Restore_Mess\"><label id=\"House_Preview_Restore_Mess\"></label></div>";
    string += "<div class=\"House_Preview_Restore_Button\">";
    string += "<input value=\"Recovery\" type=\"button\" onmousedown=\"button_House_Preview_Restore_Button_Restore_down()\" onmousemove=\"button_House_Preview_Restore_Button_Restore_move()\" onmouseout=\"button_House_Preview_Restore_Button_Restore_out()\" onmouseup=\"button_House_Preview_Restore_Button_Restore_up()\"/>";
    string += "</div>";
    string += "</div>";

    return string;
}
function ToHTML_House_Preview_Result() {
    var string = "";
    string += "<div class=\"House_center_Preview_Background\" onclick=\"OnClick_House_Preview_Background()\"></div>";
    string += "<div id=\"House_Preview_Result\" class=\"House_Preview_Result\">";
    string += "<div class=\"House_Preview_Result_Head\"><label>View Report</label></div>";
    string += "<div class=\"House_Preview_Result_Key\"><label>Number:</label><input id=\"House_Preview_Result_Key\" maxlength=\"20\" type=\"text\" /></div>";
    string += "<div class=\"House_Preview_Result_Pass\"><label>Pass:</label><input id=\"House_Preview_Result_Pass\" maxlength=\"20\" type=\"text\" /></div>";
    string += "<div class=\"House_Preview_Result_Mess\"><label id=\"House_Preview_Result_Mess\"></label></div>";
    string += "<div class=\"House_Preview_Result_Button\">";
    string += "<input value=\"OK\" type=\"button\" onmousedown=\"button_House_Preview_Result_Button_Result_down()\" onmousemove=\"button_House_Preview_Result_Button_Result_move()\" onmouseout=\"button_House_Preview_Result_Button_Result_out()\" onmouseup=\"button_House_Preview_Result_Button_Result_up()\"/>";
    string += "</div>";
    string += "</div>";

    return string;
}
function ToHTML_House_Preview_Search() {
    var string = "";
    string += "<div class=\"House_center_Preview_Background\" onclick=\"OnClick_House_Preview_Background()\"></div>";
    string += "<div id=\"House_Preview_Search\" class=\"House_Preview_Search\">";
    string += "<div class=\"House_Preview_Search_Head\"><label>Search Form</label></div>";
    string += "<div class=\"House_Preview_Search_Key\"><label>Number:</label><input id=\"House_Preview_Search_Key\" maxlength=\"20\" type=\"text\" /></div>";
    string += "<div class=\"House_Preview_Search_Mess\"><label id=\"House_Preview_Search_Mess\"></label></div>";
    string += "<div class=\"House_Preview_Search_Button\">";
    string += "<input value=\"Search\" type=\"button\" onmousedown=\"button_House_Preview_Search_Button_Search_down()\" onmousemove=\"button_House_Preview_Search_Button_Search_move()\" onmouseout=\"button_House_Preview_Search_Button_Search_out()\" onmouseup=\"button_House_Preview_Search_Button_Search_up()\"/>";
    string += "</div>";
    string += "</div>";

    return string;
}


function House_Preview_Restore_Open() {
    $("#House_center_Preview").addClass("House_center_Preview");
    document.getElementById("House_center_Preview").innerHTML = ToHTML_House_Preview_Restore();
}
function House_Preview_Result_Open() {
    $("#House_center_Preview").addClass("House_center_Preview");
    document.getElementById("House_center_Preview").innerHTML = ToHTML_House_Preview_Result();
}
function House_Preview_Search_Open() {
    $("#House_center_Preview").addClass("House_center_Preview");
    document.getElementById("House_center_Preview").innerHTML = ToHTML_House_Preview_Search();
}

function button_House_Top_House_down() {
    $(".House_top_house").css("opacity", "0.25");
}
function button_House_Top_House_move() {
    $(".House_top_house").css("opacity", "0.6");
}
function button_House_Top_House_out() {
    $(".House_top_house").css("opacity", "0.85");
}
function button_House_Top_House_up() {
    $(".House_top_house").css("opacity", "0.85");
    window.location.href = "dapp_house.html";
}

function button_House_Top_Help_down() {
    $(".House_top_help").css("opacity", "0.25");
}
function button_House_Top_Help_move() {
    $(".House_top_help").css("opacity", "0.6");
}
function button_House_Top_Help_out() {
    $(".House_top_help").css("opacity", "0.85");
}
function button_House_Top_Help_up() {
    $(".House_top_help").css("opacity", "0.85");
    window.open("dapp_help.html");
}


function button_House_Features_Create_down() {
    $(".House_Features_Create").css("background-color", "rgba(238,238,238,0.3)");
}
function button_House_Features_Create_move() {
    $(".House_Features_Create").css("background-color", "rgba(238,238,238,0.5)");
}
function button_House_Features_Create_out() {
    $(".House_Features_Create").css("background-color", "rgba(238,238,238,0.1)");
}
function button_House_Features_Create_up() {
    $(".House_Features_Create").css("background-color", "rgba(238,238,238,0.5)");
    window.location.href = "dapp_edit.html?" + "status=" + encodeURI(1) + "&key=" + "" + "&value=" + "";
}

function button_House_Features_Restore_down() {
    $(".House_Features_Restore").css("background-color", "rgba(238,238,238,0.3)");
}
function button_House_Features_Restore_move() {
    $(".House_Features_Restore").css("background-color", "rgba(238,238,238,0.5)");
}
function button_House_Features_Restore_out() {
    $(".House_Features_Restore").css("background-color", "rgba(238,238,238,0.1)");
}
function button_House_Features_Restore_up() {
    $(".House_Features_Restore").css("background-color", "rgba(238,238,238,0.5)");
    House_Preview_Restore_Open();
}

function button_House_Features_Search_down() {
    $(".House_Features_Search").css("background-color", "rgba(238,238,238,0.3)");
}
function button_House_Features_Search_move() {
    $(".House_Features_Search").css("background-color", "rgba(238,238,238,0.5)");
}
function button_House_Features_Search_out() {
    $(".House_Features_Search").css("background-color", "rgba(238,238,238,0.1)");
}
function button_House_Features_Search_up() {
    $(".House_Features_Search").css("background-color", "rgba(238,238,238,0.5)");
    House_Preview_Search_Open()
}

function button_House_Features_Result_down() {
    $(".House_Features_Result").css("background-color", "rgba(238,238,238,0.3)");
}
function button_House_Features_Result_move() {
    $(".House_Features_Result").css("background-color", "rgba(238,238,238,0.5)");
}
function button_House_Features_Result_out() {
    $(".House_Features_Result").css("background-color", "rgba(238,238,238,0.1)");
}
function button_House_Features_Result_up() {
    $(".House_Features_Result").css("background-color", "rgba(238,238,238,0.5)");
    House_Preview_Result_Open();
}

function button_House_NoticeClose_down() {
    $(".House_Notice_buttom input").css("background-color", "rgba(0, 154, 255, 0.5)");
}
function button_House_NoticeClose_move() {
    $(".House_Notice_buttom input").css("background-color", "rgba(0, 154, 255, 0.75)");
}
function button_House_NoticeClose_out() {
    $(".House_Notice_buttom input").css("background-color", "rgba(0, 154, 255, 1)");
}
function button_House_NoticeClose_up() {
    $(".House_Notice_buttom input").css("background-color", "rgba(0, 154, 255, 1)");
    $("div").remove("#House_center_Notice");
    $(".House_center_Main").css("left", "0%");
    $(".House_center_Main").css("width", "100%");
}

function button_House_Preview_Restore_Button_Restore_down(){
    $(".House_Preview_Restore_Button input").css("background-color","rgba(0, 154, 255, 0.5)");
}
function button_House_Preview_Restore_Button_Restore_move() {
    $(".House_Preview_Restore_Button input").css("background-color", "rgba(0, 154, 255, 0.75)");
}
function button_House_Preview_Restore_Button_Restore_out() {
    $(".House_Preview_Restore_Button input").css("background-color", "rgba(0, 154, 255, 1)");
}
function button_House_Preview_Restore_Button_Restore_up() {
    $(".House_Preview_Restore_Button input").css("background-color", "rgba(0, 154, 255, 1)");
    var Key = $("#House_Preview_Restore_Key").val();
    var Pass = $("#House_Preview_Restore_Pass").val();
    if (Key == ""|| Pass == "") {
        document.getElementById("House_Preview_Restore_Mess").innerHTML = "The content can not be blank.";
    }
    else if (Key.length != 20||Pass.length != 20) {
        document.getElementById("House_Preview_Restore_Mess").innerHTML = "Content format is incorrect.";
    }
    else {
        document.getElementById("House_Preview_Restore_Mess").innerHTML = "Data is querying...";

        var dappAddress = DappAddress;
        var nebulas = require("nebulas"),
            Account = nebulas.Account,
            neb = new nebulas.Neb();
        neb.setRequest(new nebulas.HttpRequest(DappNetwork));
        var NebPay = require("nebpay");
        var nebPay = new NebPay();
        var serialNumber;
        var intervalQuery;//间隔查询

        var from = Account.NewAccount().getAddressString();
        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "UploadData_Search";
        var callArgs = "[\"" + Key + "\",\"" + Pass + "\"]";
        var contract = {
            "function": callFunction,
            "args": callArgs
        }
        neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
            Restore_UploadData_Search(resp,Key,Pass)
        });
    }
}
function Restore_UploadData_Search(resp,Key,Pass) {
    var result = resp.result;
    if (result == "") {
        document.getElementById("House_Preview_Restore_Mess").innerHTML = "Error: Failed to invoke contract";
    }
    else {
        try {
            result = JSON.parse(result)
        } catch (err) {
            document.getElementById("House_Preview_Restore_Mess").innerHTML = "JSON Error:" + err;
        }
        if (result.Value) {
            if (result.True) {
                document.getElementById("House_Preview_Restore_Mess").innerHTML = "OK";
                window.location.href = "dapp_edit.html?" + "status=" + encodeURI(2) + "&key=" + Key + "&value=" + Pass;
            }
            else {
                document.getElementById("House_Preview_Restore_Mess").innerHTML = result.Type + ":" + result.Value + "," + result.Info_US;
            }
        }
        else document.getElementById("House_Preview_Restore_Mess").innerHTML = result;
    }
}

function button_House_Preview_Search_Button_Search_down() {
    $(".House_Preview_Search_Button input").css("background-color", "rgba(0, 154, 255, 0.5)");
}
function button_House_Preview_Search_Button_Search_move() {
    $(".House_Preview_Search_Button input").css("background-color", "rgba(0, 154, 255, 0.75)");
}
function button_House_Preview_Search_Button_Search_out() {
    $(".House_Preview_Search_Button input").css("background-color", "rgba(0, 154, 255, 1)");
}
function button_House_Preview_Search_Button_Search_up() {
    $(".House_Preview_Search_Button input").css("background-color", "rgba(0, 154, 255, 1)");
    var Key = $("#House_Preview_Search_Key").val();
    if (Key == "") {
        document.getElementById("House_Preview_Search_Mess").innerHTML = "The content can not be blank.";
    }
    else if (Key.length != 20) {
        document.getElementById("House_Preview_Search_Mess").innerHTML = "Content format is incorrect.";
    }
    else {
        document.getElementById("House_Preview_Search_Mess").innerHTML = "Data is querying...";

        var dappAddress = DappAddress;
        var nebulas = require("nebulas"),
            Account = nebulas.Account,
            neb = new nebulas.Neb();
        neb.setRequest(new nebulas.HttpRequest(DappNetwork));
        var NebPay = require("nebpay");
        var nebPay = new NebPay();
        var serialNumber;
        var intervalQuery;//间隔查询

        var from = Account.NewAccount().getAddressString();
        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "StorageData_Search";
        var callArgs = "[\"" + Key + "\"]";
        var contract = {
            "function": callFunction,
            "args": callArgs
        }
        neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
            Search_StorageData_Search(resp, Key);
        });
    }
}
function Search_StorageData_Search(resp, Key) {
    var result = resp.result;
    if (result == "") {
        document.getElementById("House_Preview_Search_Mess").innerHTML = "Error: Failed to invoke contract";
    }
    else {
        try {
            result = JSON.parse(result)
        } catch (err) {
            document.getElementById("House_Preview_Search_Mess").innerHTML = "JSON Error:" + err;
        }
        if (result.Value) {
            if (result.True) {
                document.getElementById("House_Preview_Search_Mess").innerHTML = "OK";
                window.location.href = "dapp_presentation.html?" + "key=" + Key;
            }
            else {
                document.getElementById("House_Preview_Search_Mess").innerHTML = result.Type + ":" + result.Value + "," + result.Info_US;
            }
        }
        else document.getElementById("House_Preview_Search_Mess").innerHTML = result;
    }
}


function button_House_Preview_Result_Button_Result_down() {
    $(".House_Preview_Result_Button input").css("background-color", "rgba(0, 154, 255, 0.5)");
}
function button_House_Preview_Result_Button_Result_move() {
    $(".House_Preview_Result_Button input").css("background-color", "rgba(0, 154, 255, 0.75)");
}
function button_House_Preview_Result_Button_Result_out() {
    $(".House_Preview_Result_Button input").css("background-color", "rgba(0, 154, 255, 1)");
}
function button_House_Preview_Result_Button_Result_up() {
    $(".House_Preview_Result_Button input").css("background-color", "rgba(0, 154, 255, 1)");
    var Key = $("#House_Preview_Result_Key").val();
    var Pass = $("#House_Preview_Result_Pass").val();
    if (Key == "" || Pass == "") {
        document.getElementById("House_Preview_Result_Mess").innerHTML = "The content can not be blank.";
    }
    else if (Key.length != 20 || Pass.length != 20) {
        document.getElementById("House_Preview_Result_Mess").innerHTML = "Content format is incorrect.";
    }
    else {
        document.getElementById("House_Preview_Result_Mess").innerHTML = "Data is querying...";

        var dappAddress = DappAddress;
        var nebulas = require("nebulas"),
            Account = nebulas.Account,
            neb = new nebulas.Neb();
        neb.setRequest(new nebulas.HttpRequest(DappNetwork));
        var NebPay = require("nebpay");
        var nebPay = new NebPay();
        var serialNumber;
        var intervalQuery;//间隔查询

        var from = Account.NewAccount().getAddressString();
        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var callFunction = "ResultData_Search";
        //var callArgs = "[\"" + $("#House_Preview_Result_Key").val() + "\",\"" + $("#House_Preview_Result_Pass").val() + "\"]";
        var callArgs = "[\"" + Key + "\",\"" + Pass + "\"]";
        var contract = {
            "function": callFunction,
            "args": callArgs
        }
        neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
            Result_ResultData_Search(resp, Key, Pass);
        });
    }
    }
function Result_ResultData_Search(resp, Key, Pass) {
    var result = resp.result;
    if (result == "") {
        document.getElementById("House_Preview_Result_Mess").innerHTML = "Error: Failed to invoke contract";
    }
    else {
        try {
            result = JSON.parse(result)
        } catch (err) {
            document.getElementById("House_Preview_Result_Mess").innerHTML = "JSON Error:" + err;
        }
        if (result.Value) {
            if (result.True) {
                document.getElementById("House_Preview_Result_Mess").innerHTML = "OK";
                window.location.href = "dapp_result.html?key=" + Key + "&value=" + Pass;
            }
            else {
                document.getElementById("House_Preview_Result_Mess").innerHTML = result.Type + ":" + result.Value + "," + result.Info_US;
            }
        }
        else document.getElementById("House_Preview_Result_Mess").innerHTML = result;
    }
}

function button_House_Top_Language_down() {
    $(".House_top_Language").css("opacity", "0.35");
}
function button_House_Top_Language_move() {
    $(".House_top_Language").css("opacity", "0.75");
}
function button_House_Top_Language_out() {
    $(".House_top_Language").css("opacity", "1");
}
function button_House_Top_Language_up() {
    $(".House_top_Language").css("opacity", "1");
    var url = window.location.href;
    var new_url = url.replace("la_us", "la_cn");
    window.location.href = new_url;
}

function OnClick_House_Preview_Background() {
    document.getElementById("House_center_Preview").innerHTML = "";
    $("#House_center_Preview").removeClass("House_center_Preview");   
}