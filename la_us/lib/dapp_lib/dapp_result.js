"use strict";

var Info_Presentation_Option = function () {
    this.Text = "Unfilled";
    this.Selected = false;
}
var Info_Presentation_MainTitle = function () {
    this.Type = 0;
    this.Coding = null;
    this.Title = "Unfilled";
    this.Content = "Unfilled";
}
var Info_Presentation_Multiple = function () {
    this.Type = 1;
    this.No = null;
    this.Coding = null;
    this.Title = "Unfilled";
    this.Option_Num = null;
    this.Option_Max = 0;
    this.Option_Min = 0;
    this.Option = null;
}
var Info_Presentation_Single = function () {
    this.Type = 2;
    this.No = null;
    this.Coding = null;
    this.Title = "Unfilled";
    this.Option_Num = null;
    this.Option = null;
}
var Info_Presentation_Text = function () {
    this.Type = 3;
    this.No = null;
    this.Coding = null;
    this.Title = "Unfilled";
    this.Text = "Unfilled";
    this.Text_Max = 300;
}

function Result_OnLoad() {
    var url = location.search;
    var keyIndex = url.indexOf("key");
    var valueIndex = url.indexOf("value");
    var key;
    var value;
    if (keyIndex > 0) {
        if ((valueIndex - keyIndex) == 25) key = url.slice(keyIndex + 4, keyIndex + 24);
        else key = 0;
    }
    else key = 0;
    if (valueIndex > 0) {
        if ((valueIndex + 26) == url.length) value = url.slice(valueIndex + 6, valueIndex + 26);
        else value = 0;
    }
    else value = 0;
    Result_Then_Onload(key, value);
}
function Result_Then_Onload(key, value) {
    
    if (key.length == 20 && value.length == 20) {
        Result_Remind_Type1_Open("Data is being restored...", key, value);
    }
    else {
        Result_Remind_Type2_Open("The address is wrong, please check your link");
    } 
    $(".Result_main").css("pointer-events", "auto");
}

function Result_Remind_Type1_Open(str, Key,Value) {
    $("#Result_Remind").addClass("Result_Remind");
    var string = "";
    string += "<div id=\"Result_Remind_pane\" class=\"Result_Remind_pane\">";
    string += "<div class=\"Result_Remind_pane_Head\"></div>";
    string += "<div class=\"Result_Remind_pane_mess\"><label id=\"Result_Remind_pane_mess\">" + str + "</label></div>";
    string += "</div>";

    document.getElementById("Result_Remind").innerHTML = string;

    var dappAddress = DappAddress;
    var nebulas = require("nebulas"),
        Account = nebulas.Account,
        neb = new nebulas.Neb();
    neb.setRequest(new nebulas.HttpRequest(DappNetwork));

    var from = Account.NewAccount().getAddressString();
    var value = "0";
    var nonce = "0"
    var gas_price = "1000000"
    var gas_limit = "2000000"
    var callFunction = "ResultData_Get";
    var callArgs = "[\"" + Key + "\",\"" + Value + "\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        Result_Remind_Type1_Then(resp);
    });
}
function Result_Remind_Type1_Then(resp) {
    var result = resp.result;
    if (result == "") {
        document.getElementById("Result_Remind_pane_mess").innerHTML = "Error: Failed to invoke contract";
        document.getElementById("Result_Remind_pane").innerHTML += "<div class=\"Result_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Result_Remind_Type2_dowm()\" onmousemove=\"button_Result_Remind_Type2_move()\" onmouseout=\"button_Result_Remind_Type2_out()\" onmouseup=\"button_Result_Remind_Type2_up()\"/></div>";
    }
    else {
        try {
            result = JSON.parse(result)
        } catch (err) {
            document.getElementById("Result_Remind_pane_mess").innerHTML = "JSON Error:" + err;
            document.getElementById("Result_Remind_pane").innerHTML += "<div class=\"Result_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Result_Remind_Type2_dowm()\" onmousemove=\"button_Result_Remind_Type2_move()\" onmouseout=\"button_Result_Remind_Type2_out()\" onmouseup=\"button_Result_Remind_Type2_up()\"/></div>";
        }
        if (result.Value) {
            if (result.True) {
                document.getElementById("Result_Remind_pane_mess").innerHTML = "There is a mistake in the contract. Please contact us";
                document.getElementById("Result_Remind_pane").innerHTML += "<div class=\"Result_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Result_Remind_Type2_dowm()\" onmousemove=\"button_Result_Remind_Type2_move()\" onmouseout=\"button_Result_Remind_Type2_out()\" onmouseup=\"button_Result_Remind_Type2_up()\"/></div>";
            }
            else {
                document.getElementById("Result_Remind_pane_mess").innerHTML = result.Type + ":" + result.Value + "," + result.Info_US;
                document.getElementById("Result_Remind_pane").innerHTML += "<div class=\"Result_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Result_Remind_Type2_dowm()\" onmousemove=\"button_Result_Remind_Type2_move()\" onmouseout=\"button_Result_Remind_Type2_out()\" onmouseup=\"button_Result_Remind_Type2_up()\"/></div>";
            }
        }
        else if (result.Key) {
            Result = result;
            Result_Form = result.FormData;
            HTML_Result_Updata();
            Result_Remind_Close();
        }
        else {
            document.getElementById("Result_Remind_pane_mess").innerHTML = "Eorro:" + result;
            document.getElementById("Result_Remind_pane").innerHTML += "<div class=\"Result_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Result_Remind_Type2_dowm()\" onmousemove=\"button_Result_Remind_Type2_move()\" onmouseout=\"button_Result_Remind_Type2_out()\" onmouseup=\"button_Result_Remind_Type2_up()\"/></div>";
        }
    }
}
function Result_Remind_Type2_Open(str) {
    $("#Result_Remind").addClass("Result_Remind");
    var string = "";
    string += "<div class=\"Result_Remind_pane\">";
    string += "<div class=\"Result_Remind_pane_Head\"></div>";
    string += "<div class=\"Result_Remind_pane_mess\"><label id=\"Result_Remind_pane_mess\">" + str + "</label></div>";
    string += "<div class=\"Result_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Result_Remind_Type2_dowm()\" onmousemove=\"button_Result_Remind_Type2_move()\" onmouseout=\"button_Result_Remind_Type2_out()\" onmouseup=\"button_Result_Remind_Type2_up()\"/></div>";
    string += "</div>";

    document.getElementById("Result_Remind").innerHTML = string;
}
function Result_Remind_Close() {
    $("#Result_Remind").removeClass("Result_Remind");
    document.getElementById("Result_Remind").innerHTML = "";
}


function GetProject_Result(coding) {
    for (var i = 0; i < Result_Form.length; i++) {
        if (Result_Form[i].Coding == coding) return Result_Form[i];
    }
}
function GetProject_Result_MultipleSelectedNum(object) {
    var num = 0;
    for (var i = 0; i < object.Option_Num; i++) {
        if (object.Option[i].Selected) num++;
    }
    return num;
}
function GetStringLength_Result(string) {
    if (string == null) return 0;
    else return string.replace(/[\u0391-\uFFE5]/g, "aa").length;
}
function GetType_Result(type) {
    if (type == 1) return "Multiple";
    else if (type == 2) return "Single";
    else if (type == 3) return "Text";
    else "";
}
function GetOptionName_Result(index) {
    if (index == 1) return "A";
    else if (index == 2) return "B";
    else if (index == 3) return "C";
    else if (index == 4) return "D";
    else if (index == 5) return "E";
    else if (index == 6) return "F";
    else if (index == 7) return "G";
    else if (index == 8) return "H";
    else if (index == 9) return "I";
    else if (index == 10) return "J";
    else if (index == 11) return "K";
    else if (index == 12) return "L";
    else if (index == 13) return "M";
    else if (index == 14) return "N";
    else if (index == 15) return "O";
    else if (index == 16) return "P";
    else if (index == 17) return "Q";
    else if (index == 18) return "R";
    else if (index == 19) return "S";
    else if (index == 20) return "T";
    else if (index == 21) return "U";
    else if (index == 22) return "V";
    else if (index == 23) return "W";
    else if (index == 24) return "X";
    else if (index == 25) return "Y";
    else return "Z:";
}
function GetMultipleNumString_Result(object) {
    if (object.Option_Max == 0) {
        if (object.Option_Min == 0) return "";
        else return "( " + object.Option_Min + " or more)";
    }
    else {
        if (object.Option_Min == 0) return "( " + object.Option_Max + " or less)";
        else return "( " + object.Option_Min + " - " + object.Option_Max + " )";
    }
}
function GetPercentage_Result(num) {
    var num_1 = num;
    var num_2 = Result.Submit_Num;
    if (num_2 == 0) return "0%";
    else {
        var result = "0";
        result = (num_1 * 100) / num_2;
        return (Math.round(result) + "%");
    }
}


function HTML_Result_Updata() {
    var string = "";
    string += "<div class=\"Result_form_Heading\"></div>";
    string += "<div class=\"Result_form_Project_List\">";
    for (var i = 0; i < Result_Form.length; i++) {
        string += ToHTML_Result(Result_Form[i]);
    }
    string += "</div>";
    string += "<div class=\"Result_form_button_submit\"><input id=\"button_submit\" type=\"button\" value=\"Exit\" onmousedown=\"button_Result_sumbit_down()\" onmousemove=\"button_Result_sumbit_move()\" onmouseout=\"button_Result_sumbit_out()\" onmouseup=\"button_Result_sumbit_up()\" /></div>";
    string += "<div class=\"Result_form_bottom\"></div>";
    document.getElementById("Result_form").innerHTML = string;
    HTML_Result_UpdataTextLength();
}
function HTML_Result_UpdataTextLength() {
    document.getElementById("Result_form_MainTitle").style.height = (120 + 20 * (GetStringLength_Result(Result_Form[0].Content) - 1) / 100) + 'px';
    document.getElementById("Result_form_MainTitle_content").style.height = (72 + 20 * (GetStringLength_Result(Result_Form[0].Content) - 1) / 100) + 'px';
    for (var i = 1; i < Result_Form.length; i++) {
        document.getElementById("Result_form_Project_" + Result_Form[i].Coding + "_" + GetType_Result(Result_Form[i].Type) + "_title").style.height = (60 + 17.5 * (GetStringLength_Result(Result_Form[i].Title) - 1) / 72) + 'px';
        if (Result_Form[i].Type == 3) { }
        else {
            for (var j = 0; j < Result_Form[i].Option_Num; j++) {
                document.getElementById("Result_form_Project_" + Result_Form[i].Coding + "_option_" + (j + 1)).style.height = (30 + 12 * (GetStringLength_Result(Result_Form[i].OptionInfo[j].Text) - 1) / 58) + 'px';
                document.getElementById("Result_form_Project_" + Result_Form[i].Coding + "_option_" + (j + 1) + "_label").style.height = (12 + 12 * (GetStringLength_Result(Result_Form[i].OptionInfo[j].Text) - 1) / 58) + 'px';
            }
        }
    }
}

function ToHTML_Result_MainTitle(object) {
    var string = "";
    string += "<div id=\"Result_form_MainTitle\" class=\"Result_form_MainTitle\">";
    string += "<div id=\"Result_form_MainTitle_title\" class=\"Result_form_MainTitle_title\"><label   id=\"Result_form_MainTitle_title\">" + object.Title + " (" + Result.Submit_Num + " times)" + "</label></div>";
    string += "<div id=\"Result_form_MainTitle_content\" class=\"Result_form_MainTitle_content\"><label>" + object.Content + "</label></div>";
    string += "</div>";
    return string;
}
function ToHTML_Result_Multiple(object) {
    var string = "";
    string += "<div class=\"Result_form_Project\">";
    string += "<div class=\"Result_form_Project__Head\"><div class=\"Result_form_Project__Head_Type\"><label>" + object.No + ": Checkboxes" + GetMultipleNumString_Result(object) + "</label></div></div>";
    string += "<div class=\"Result_form_Project_Multiple\">";
    string += "<div id=\"Result_form_Project_" + object.Coding + "_Multiple_title\"  class=\"Result_form_Project_Multiple_title\"><label>" + object.Title + "</label></div>";
    for (var i = 0; i < object.Option_Num; i++) {
        string += "<div id=\"Result_form_Project_" + object.Coding + "_option_" + (i + 1) + "\" class=\"Result_form_Project_Multiple_option\">";
        string += "<div class=\"Result_form_Project_Multiple_OptionResult\"><label>" + GetOptionName_Result(i + 1) + ". " + object.OptionInfo[i].Submit_Num + " (" + GetPercentage_Result(object.OptionInfo[i].Submit_Num) + ")" + "</label></div>";
        string += "<label class=\"Result_form_Project_Multiple_option_label\" id=\"Result_form_Project_" + object.Coding + "_option_" + (i + 1) + "_label\">" + object.OptionInfo[i].Text + "</label>";
        string += "</div>";
    }
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Result_Single(object) {
    var string = "";
    string += "<div class=\"Result_form_Project\">";
    string += "<div class=\"Result_form_Project__Head\"><div class=\"Result_form_Project__Head_Type\"><label>" + object.No + ": Multiple</label></div></div>";
    string += "<div class=\"Result_form_Project_Single\">";
    string += "<div id=\"Result_form_Project_" + object.Coding + "_Single_title\" class=\"Result_form_Project_Single_title\"><label>" + object.Title + "</label></div>";
    for (var i = 0; i < object.Option_Num; i++) {
        string += "<div id=\"Result_form_Project_" + object.Coding + "_option_" + (i + 1) + "\" class=\"Result_form_Project_Single_option\">";
        string += "<div class=\"Result_form_Project_Single_OptionResult\"><label>" + GetOptionName_Result(i + 1) + ". " + object.OptionInfo[i].Submit_Num + " (" + GetPercentage_Result(object.OptionInfo[i].Submit_Num) + ")" + "</label></div>";
        string += "<label class=\"Result_form_Project_Single_option_label\" id=\"Result_form_Project_" + object.Coding + "_option_" + (i + 1) + "_label\">" + object.OptionInfo[i].Text + "</label>";
        string += "</div>";
    }
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Result_Text(object) {
    var string = "";
    string += "<div class=\"Result_form_Project\">";
    string += "<div class=\"Result_form_Project__Head\">";
    string += "<div class=\"Result_form_Project__Head_Type\"><label>" + object.No + ": Question</label></div>";
    string += "</div>";
    string += "<div class=\"Result_form_Project_Text\">";
    string += "<div class=\"Result_form_Project_Text_title\" id=\"Result_form_Project_" + object.Coding + "_Text_title\"><label>" + object.Title + "</label></div>";
    string += "<div class=\"Result_form_Project_Text_text\"><label>Content:</label><textarea id=\"Result_form_Project_" + object.Coding + "_Text_text\" maxlength=\"" + object.Text_Max + "\" readonly=\"readonly\">" + object.TextInfo[0] + "</textarea></div>";
    string += "<div class=\"Result_form_Project_Text_Page\">";
    string += "<label id=\"Result_form_Project_Text_Page_Previous_" + object.Coding + "\" class=\"Result_form_Project_Text_Page_Previous\" onmousedown=\"button_Result_form_Project_Text_Page_Previous_down(" + object.Coding + ")\" onmousemove=\"button_Result_form_Project_Text_Page_Previous_move(" + object.Coding + ")\" onmouseout=\"button_Result_form_Project_Text_Page_Previous_out(" + object.Coding + ")\" onmouseup=\"button_Result_form_Project_Text_Page_Previous_up(" + object.Coding + ")\">Last</label>";
    string += "<label id=\"Result_form_Project_Text_Page_Page_" + object.Coding + "\" class=\"Result_form_Project_Text_Page_Page\">1/" + object.TextInfo.length + "</label>";
    string += "<label id=\"Result_form_Project_Text_Page_Next_" + object.Coding + "\" class=\"Result_form_Project_Text_Page_Next\" onmousedown=\"button_Result_form_Project_Text_Page_Next_down(" + object.Coding + ")\" onmousemove=\"button_Result_form_Project_Text_Page_Next_move(" + object.Coding + ")\" onmouseout=\"button_Result_form_Project_Text_Page_Next_out(" + object.Coding + ")\" onmouseup=\"button_Result_form_Project_Text_Page_Next_up(" + object.Coding + ")\">Next</label>";
    string += "</div >";
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Result(object) {
    if (object.Type == 0) return ToHTML_Result_MainTitle(object);
    else if (object.Type == 1) return ToHTML_Result_Multiple(object);
    else if (object.Type == 2) return ToHTML_Result_Single(object);
    else if (object.Type == 3) return ToHTML_Result_Text(object);
    else "";
}


function button_Result_Top_House_down() {
    $(".Result_top_house").css("opacity", "0.25");
}
function button_Result_Top_House_move() {
    $(".Result_top_house").css("opacity", "0.6");
}
function button_Result_Top_House_out() {
    $(".Result_top_house").css("opacity", "0.85");
}
function button_Result_Top_House_up() {
    $(".Result_top_house").css("opacity", "0.85");
    var string = "";
    string += "<div class=\"Result_House_pane\">";
    string += "<div class=\"Result_House_pane_Head\"></div>";
    string += "<div class=\"Result_House_pane_mess\"><label><div class=\"Result_None_Select\">Checking results, are you exiting?</div></label></div>";
    string += "<div class=\"Result_House_pane_BackYes\"><input value=\"Yes\" type=\"button\" onmousedown=\"button_Result_Top_House_BackYes_down()\" onmousemove=\"button_Result_Top_House_BackYes_move()\" onmouseout=\"button_Result_Top_House_BackYes_out()\" onmouseup=\"button_Result_Top_House_BackYes_up()\"/></div>";
    string += "<div class=\"Result_House_pane_BackNo\"><input value=\"No\" type=\"button\" onmousedown=\"button_Result_Top_House_BackNo_down()\" onmousemove=\"button_Result_Top_House_BackNo_move()\" onmouseout=\"button_Result_Top_House_BackNo_out()\" onmouseup=\"button_Result_Top_House_BackNo_up()\"/></div>";
    string += "</div>";

    $("#Result_House").addClass("Result_House");
    document.getElementById("Result_House").innerHTML = string;
}

function button_Result_Top_House_BackYes_down() {
    $(".Result_House_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Result_Top_House_BackYes_move() {
    $(".Result_House_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Result_Top_House_BackYes_out() {
    $(".Result_House_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Result_Top_House_BackYes_up() {
    $(".Result_House_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
    window.location.href = "dapp_house.html";
}
function button_Result_Top_House_BackNo_down() {
    $(".Result_House_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Result_Top_House_BackNo_move() {
    $(".Result_House_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Result_Top_House_BackNo_out() {
    $(".Result_House_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Result_Top_House_BackNo_up() {
    $(".Result_House_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("#Result_House").removeClass("Result_House");
    document.getElementById("Result_House").innerHTML = "";
}

function button_Result_Top_Help_down() {
    $(".Result_top_help").css("opacity", "0.25");
}
function button_Result_Top_Help_move() {
    $(".Result_top_help").css("opacity", "0.6");
}
function button_Result_Top_Help_out() {
    $(".Result_top_help").css("opacity", "0.85");
}
function button_Result_Top_Help_up() {
    $(".Result_top_help").css("opacity", "0.85");
    window.open("dapp_help.html");
}

function button_Result_Remind_Type2_dowm() {
    $(".Result_Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Result_Remind_Type2_move() {
    $(".Result_Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Result_Remind_Type2_out() {
    $(".Result_Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Result_Remind_Type2_up() {
    $(".Result_Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.8)");
    window.location.href = "dapp_house.html";
}

function button_Result_sumbit_down() {
    $(".Result_form_button_submit input").css("background-color", "rgba(255, 145, 26, 0.5)");
}
function button_Result_sumbit_move() {
    $(".Result_form_button_submit input").css("background-color", "rgba(255, 145, 26, 0.75)");
}
function button_Result_sumbit_out() {
    $(".Result_form_button_submit input").css("background-color", "rgba(255, 145, 26, 1)");
}
function button_Result_sumbit_up() {
    $(".Result_form_button_submit input").css("background-color", "rgba(255, 145, 26, 1)");
    window.location.href = "dapp_house.html";
}

function button_Result_form_Project_Text_Page_Previous_down(coding) {
    $("#Result_form_Project_Text_Page_Previous_" + coding).removeClass("Result_form_Project_Text_Page_Previous_move");
    $("#Result_form_Project_Text_Page_Previous_" + coding).removeClass("Result_form_Project_Text_Page_Previous");
    $("#Result_form_Project_Text_Page_Previous_" + coding).addClass("Result_form_Project_Text_Page_Previous_down");
}
function button_Result_form_Project_Text_Page_Previous_move(coding) {
    $("#Result_form_Project_Text_Page_Previous_" + coding).removeClass("Result_form_Project_Text_Page_Previous");
    $("#Result_form_Project_Text_Page_Previous_" + coding).addClass("Result_form_Project_Text_Page_Previous_move");
}
function button_Result_form_Project_Text_Page_Previous_out(coding) {
    $("#Result_form_Project_Text_Page_Previous_" + coding).removeClass("Result_form_Project_Text_Page_Previous_down");
    $("#Result_form_Project_Text_Page_Previous_" + coding).removeClass("Result_form_Project_Text_Page_Previous_move");
    $("#Result_form_Project_Text_Page_Previous_" + coding).addClass("Result_form_Project_Text_Page_Previous");
}
function button_Result_form_Project_Text_Page_Previous_up(coding) {
    $("#Result_form_Project_Text_Page_Previous_" + coding).removeClass("Result_form_Project_Text_Page_Previous_down");
    $("#Result_form_Project_Text_Page_Previous_" + coding).removeClass("Result_form_Project_Text_Page_Previous_move");
    $("#Result_form_Project_Text_Page_Previous_" + coding).addClass("Result_form_Project_Text_Page_Previous");

    var string = document.getElementById("Result_form_Project_Text_Page_Page_" + coding).innerHTML;
    var PageIndex = string.indexOf("/");
    var Page = string.slice(0, PageIndex);

    var obj = GetProject_Result(coding);
    if (Page > 1) {
        Page--;
    }
    document.getElementById("Result_form_Project_Text_Page_Page_" + coding).innerHTML = Page + "/" + obj.TextInfo.length;
    document.getElementById("Result_form_Project_" + coding + "_Text_text").innerHTML = obj.TextInfo[Page - 1];
}

function button_Result_form_Project_Text_Page_Next_down(coding) {
    $("#Result_form_Project_Text_Page_Next_" + coding).removeClass("Result_form_Project_Text_Page_Next_move");
    $("#Result_form_Project_Text_Page_Next_" + coding).removeClass("Result_form_Project_Text_Page_Next");
    $("#Result_form_Project_Text_Page_Next_" + coding).addClass("Result_form_Project_Text_Page_Next_down");
}
function button_Result_form_Project_Text_Page_Next_move(coding) {
    $("#Result_form_Project_Text_Page_Next_" + coding).removeClass("Result_form_Project_Text_Page_Next");
    $("#Result_form_Project_Text_Page_Next_" + coding).addClass("Result_form_Project_Text_Page_Next_move");
}
function button_Result_form_Project_Text_Page_Next_out(coding) {
    $("#Result_form_Project_Text_Page_Next_" + coding).removeClass("Result_form_Project_Text_Page_Next_down");
    $("#Result_form_Project_Text_Page_Next_" + coding).removeClass("Result_form_Project_Text_Page_Next_move");
    $("#Result_form_Project_Text_Page_Next_" + coding).addClass("Result_form_Project_Text_Page_Next");
}
function button_Result_form_Project_Text_Page_Next_up(coding) {
    $("#Result_form_Project_Text_Page_Next_" + coding).removeClass("Result_form_Project_Text_Page_Next_down");
    $("#Result_form_Project_Text_Page_Next_" + coding).removeClass("Result_form_Project_Text_Page_Next_move");
    $("#Result_form_Project_Text_Page_Next_" + coding).addClass("Result_form_Project_Text_Page_Next");

    var string = document.getElementById("Result_form_Project_Text_Page_Page_" + coding).innerHTML;
    var PageIndex = string.indexOf("/");
    var Page = string.slice(0, PageIndex);

    var obj = GetProject_Result(coding);
    if (Page < obj.TextInfo.length) {
        Page ++;
    }
    document.getElementById("Result_form_Project_Text_Page_Page_" + coding).innerHTML = Page + "/" + obj.TextInfo.length;
    document.getElementById("Result_form_Project_" + coding + "_Text_text").innerHTML = obj.TextInfo[Page-1];

}

function button_Result_Top_Language_down() {
    $(".Result_top_Language").css("opacity", "0.35");
}
function button_Result_Top_Language_move() {
    $(".Result_top_Language").css("opacity", "0.75");
}
function button_Result_Top_Language_out() {
    $(".Result_top_Language").css("opacity", "1");
}
function button_Result_Top_Language_up() {
    $(".Result_top_Language").css("opacity", "1");
    var url = window.location.href;
    var new_url = url.replace("la_us", "la_cn");
    window.location.href = new_url;
}
