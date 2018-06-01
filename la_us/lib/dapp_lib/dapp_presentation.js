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

function Pre_OnLoad() {
    var url = location.search;
    var keyIndex = url.indexOf("key");
    var key;
    if (keyIndex > 0) {
        if ((url.length - keyIndex) == 24) key = url.slice(keyIndex + 4, keyIndex + 24);
        else key = 0;
    }
    else key = 0;
    Pre_Edit_Onload(key);
}
function Pre_Edit_Onload(key) {
    if (key.length == 20) {
        Restore_Pre_Remind_Type1_Open("Data is being restored...", key);
    }
    else {
        Restore_Pre_Remind_Type2_Open("Can't find corresponding information,Please check your address");
    }
    $(".Pre_main").css("pointer-events", "auto");
}

function Restore_Pre_Remind_Type1_Open(str, Key) {
    $("#Pre_Remind").addClass("Pre_Remind");
    var string = "";
    string += "<div id=\"Pre_Remind_pane\" class=\"Pre_Remind_pane\">";
    string += "<div class=\"Pre_Remind_pane_Head\"></div>";
    string += "<div class=\"Pre_Remind_pane_mess\"><label id=\"Pre_Remind_pane_mess\">" + str + "</label></div>";
    string += "</div>";

    document.getElementById("Pre_Remind").innerHTML = string;

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
    var callFunction = "PreData_Get";
    var callArgs = "[\"" + Key + "\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        Restore_Pre_Remind_Type1_Then(resp);
    });
}
function Restore_Pre_Remind_Type1_Then(resp) {
    var result = resp.result;
    if (result == "") {
        document.getElementById("Pre_Remind_pane_mess").innerHTML = "Error: Failed to invoke contract";
        document.getElementById("Pre_Remind_pane").innerHTML += "<div class=\"Pre_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Restore_Pre_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Pre_Remind_Type2_move()\" onmouseout=\"button_Restore_Pre_Remind_Type2_out()\" onmouseup=\"button_Restore_Pre_Remind_Type2_up()\"/></div>";
    }
    else {
        try {
            result = JSON.parse(result)
        } catch (err) {
            document.getElementById("Pre_Remind_pane_mess").innerHTML = "JSON Error:" + err;
            document.getElementById("Pre_Remind_pane").innerHTML += "<div class=\"Pre_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Restore_Pre_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Pre_Remind_Type2_move()\" onmouseout=\"button_Restore_Pre_Remind_Type2_out()\" onmouseup=\"button_Restore_Pre_Remind_Type2_up()\"/></div>";
        }
        if (result.Value) {
            if (result.True) {
                document.getElementById("Pre_Remind_pane_mess").innerHTML = "There is a mistake in the contract. Please contact us";
                document.getElementById("Pre_Remind_pane").innerHTML += "<div class=\"Pre_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Restore_Pre_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Pre_Remind_Type2_move()\" onmouseout=\"button_Restore_Pre_Remind_Type2_out()\" onmouseup=\"button_Restore_Pre_Remind_Type2_up()\"/></div>";
            }
            else {
                document.getElementById("Pre_Remind_pane_mess").innerHTML = result.Type + ":" + result.Value + "," + result.Info_US;
                document.getElementById("Pre_Remind_pane").innerHTML += "<div class=\"Pre_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Restore_Pre_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Pre_Remind_Type2_move()\" onmouseout=\"button_Restore_Pre_Remind_Type2_out()\" onmouseup=\"button_Restore_Pre_Remind_Type2_up()\"/></div>";
            }
        }
        else if (result.Key) {
            Pre_Form = result.Form;
            Pre_Key = result.Key;
            HTML_Presentation_Updata();
            Restore_Pre_Remind_Close();
        }
        else {
            document.getElementById("Pre_Remind_pane_mess").innerHTML = "Error:" + result;
            document.getElementById("Pre_Remind_pane").innerHTML += "<div class=\"Pre_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Restore_Pre_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Pre_Remind_Type2_move()\" onmouseout=\"button_Restore_Pre_Remind_Type2_out()\" onmouseup=\"button_Restore_Pre_Remind_Type2_up()\"/></div>";
        }
    }
}
function Restore_Pre_Remind_Type2_Open(str) {
    $("#Pre_Remind").addClass("Pre_Remind");
    var string = "";
    string += "<div class=\"Pre_Remind_pane\">";
    string += "<div class=\"Pre_Remind_pane_Head\"></div>";
    string += "<div class=\"Pre_Remind_pane_mess\"><label id=\"Pre_Remind_pane_mess\">" + str + "</label></div>";
    string += "<div class=\"Pre_Remind_pane_Button\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Restore_Pre_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Pre_Remind_Type2_move()\" onmouseout=\"button_Restore_Pre_Remind_Type2_out()\" onmouseup=\"button_Restore_Pre_Remind_Type2_up()\"/></div>"
    string += "</div>";

    document.getElementById("Pre_Remind").innerHTML = string;
}
function Restore_Pre_Remind_Close() {
    $("#Pre_Remind").removeClass("Pre_Remind");
    document.getElementById("Pre_Remind").innerHTML = "";
}

function FormToPre(form, Pre_Form) {
    var mainTitle = new Info_Presentation_MainTitle();
    mainTitle.Coding = form[0].Coding;
    mainTitle.Title = form[0].Title;
    mainTitle.Content = form[0].Content;
    Pre_Form.push(mainTitle);

    for (var i = 1; i < form.length; i++) {
        if (form[i].Type == 1) {
            var object = new Info_Presentation_Multiple();
            object.No = form[i].No;
            object.Coding = form[i].Coding;
            object.Title = form[i].Title;
            object.Option_Num = form[i].Option_Num;
            object.Option_Max = form[i].Option_Max;
            object.Option_Min = form[i].Option_Min;
            object.Option = new Array(object.Option_Num);
            for (var j = 0; j < object.Option_Num; j++) {
                object.Option[j] = new Info_Presentation_Option();
                object.Option[j].Text = form[i].Option[j];
            }
            Pre_Form.push(object);
        }
        else if (form[i].Type == 2) {
            var object = new Info_Presentation_Single();
            object.No = form[i].No;
            object.Coding = form[i].Coding;
            object.Title = form[i].Title;
            object.Option_Num = form[i].Option_Num;
            
            object.Option = new Array(object.Option_Num);
            for (var j = 0; j < object.Option_Num; j++) {
                object.Option[j] = new Info_Presentation_Option();
                object.Option[j].Text = form[i].Option[j];
            }
            Pre_Form.push(object);
        }
        else if (form[i].Type == 3) {
            var object = new Info_Presentation_Text();
            object.No = form[i].No;
            object.Coding = form[i].Coding;
            object.Title = form[i].Title;
            object.Text = form[i].Text;
            Pre_Form.push(object);
        }
    }

}

function CheckBox_Presentation_Multiple(coding, index) {
    var dex = 0;
    for (var i = 0; i < Pre_Form.length; i++) {
        if (Pre_Form[i].Coding == coding) {
            dex = i;
            break;
        }
    }
    if (Pre_Form[dex].Option[index].Selected) {
        Pre_Form[dex].Option[index].Selected = false;
        HTML_Presentation_Multiple_NoSelected(coding, index);
    }
    else {
        if (Pre_Form[dex].Option_Max == 0) {
            Pre_Form[dex].Option[index].Selected = true;
            HTML_Presentation_Multiple_Selected(coding, index);
        }
        else {
            if (GetProject_Presentation_MultipleSelectedNum(Pre_Form[dex]) == Pre_Form[dex].Option_Max) { }
            else {
                Pre_Form[dex].Option[index].Selected = true;
                HTML_Presentation_Multiple_Selected(coding, index);
            }
        }
    }
}
function CheckBox_Presentation_Single(coding, index) {
    var dex = 0;
    for (var i = 0; i < Pre_Form.length; i++) {
        if (Pre_Form[i].Coding == coding) {
            dex = i;
            break;
        }
    }
    var isSelect = false;
    var isSelectIndex = 0;
    for (var i = 0; i < Pre_Form[dex].Option_Num; i++) {
        if (Pre_Form[dex].Option[i].Selected) {
            isSelect = true;
            isSelectIndex = i;
            break;
        }
    }
    if (isSelect) {
        Pre_Form[dex].Option[isSelectIndex].Selected = false;
        HTML_Presentation_Single_NoSelected(coding, isSelectIndex);
    }
    Pre_Form[dex].Option[index].Selected = true;
    HTML_Presentation_Single_Selected(coding, index);
}

function GetProject_Presentation(coding) {
    for (var i = 0; i < Pre_Form.length; i++) {
        if (Pre_Form[i].Coding == coding) return Pre_Form[i];
    }
}
function GetProject_Presentation_MultipleSelectedNum(object) {
    var num = 0;
    for (var i = 0; i < object.Option_Num; i++) {
        if (object.Option[i].Selected) num++;
    }
    return num;
}
function GetStringLength_Presentation(string) {
    if (string == null) return 0;
    else return string.replace(/[\u0391-\uFFE5]/g, "aa").length;
}
function GetType_Presentation(type) {
    if (type == 1) return "Multiple";
    else if (type == 2) return "Single";
    else if (type == 3) return "Text";
    else "";
}
function GetOptionName_Presentation(index) {
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
function GetMultipleNumString_Presentation(object) {
    if (object.Option_Max == 0) {
        if (object.Option_Min == 0) return "";
        else return "( " + object.Option_Min + " or more)";
    }
    else {
        if (object.Option_Min == 0) return "( " + object.Option_Max + " or less)";
        else return "( " + object.Option_Min + " - " + object.Option_Max + " )";
    }
}

function HTML_Presentation_Multiple_Selected(coding, index) {
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_check").removeClass("Pre_form_Project_Multiple_checkbox_NoSelected");
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_check").addClass("Pre_form_Project_Multiple_checkbox_Selected");
}
function HTML_Presentation_Multiple_NoSelected(coding, index) {
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_check").removeClass("Pre_form_Project_Multiple_checkbox_Selected");
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_check").addClass("Pre_form_Project_Multiple_checkbox_NoSelected");
}

function HTML_Presentation_Single_Selected(coding, index) {
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_check").removeClass("Pre_form_Project_Single_checkbox_NoSelected");
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_check").addClass("Pre_form_Project_Single_checkbox_Selected");
}
function HTML_Presentation_Single_NoSelected(coding, index) {
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_check").removeClass("Pre_form_Project_Single_checkbox_Selected");
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_check").addClass("Pre_form_Project_Single_checkbox_NoSelected");
}

function HTML_Presentation_Updata() {
    var string = "";
    string += "<div class=\"Pre_form_Heading\"></div>";
    string += "<div class=\"Pre_form_Project_List\">";
    for (var i = 0; i < Pre_Form.length; i++) {
        string += ToHTML_Presentation(Pre_Form[i]);
    }
    string += "</div>";
    string += "<div class=\"Pre_form_button_submit\"><input id=\"button_submit\" type=\"button\" value=\"Submit\" onmousedown=\"button_Presentation_sumbit_down()\" onmousemove=\"button_Presentation_sumbit_move()\" onmouseout=\"button_Presentation_sumbit_out()\" onmouseup=\"button_Presentation_sumbit_up()\" /></div>";
    string += "<div class=\"Pre_form_bottom\"></div>";
    document.getElementById("Pre_form").innerHTML = string;
    HTML_Presentation_UpdataTextLength();
}
function HTML_Presentation_Updata_Preview() {
    var string = "";
    string += "<div class=\"Pre_form_Heading\"></div>";
    string += "<div class=\"Pre_form_Project_List\">";
    for (var i = 0; i < Pre_Form.length; i++) {
        string += ToHTML_Presentation(Pre_Form[i]);
    }
    string += "</div>";
    string += "<div class=\"Pre_form_button_submit\"><input id=\"button_submit\" type=\"button\" value=\"Submit\" onmousedown=\"button_Presentation_sumbit_down()\" onmousemove=\"button_Presentation_sumbit_move()\" onmouseout=\"button_Presentation_sumbit_out()\" onmouseup=\"button_Presentation_sumbit_up_Preview()\" /></div>";
    string += "<div class=\"Pre_form_bottom\"></div>";
    document.getElementById("Pre_form").innerHTML = string;
    HTML_Presentation_UpdataTextLength();
}
function HTML_Presentation_UpdataTextLength() {
    document.getElementById("Pre_form_MainTitle").style.height = (120 + 20 * (GetStringLength_Presentation(Pre_Form[0].Content) - 1) / 100) + 'px';
    document.getElementById("Pre_form_MainTitle_content").style.height = (72 + 20 * (GetStringLength_Presentation(Pre_Form[0].Content) - 1) / 100) + 'px';
    for (var i = 1; i < Pre_Form.length; i++) {
        document.getElementById("Pre_form_Project_" + Pre_Form[i].Coding + "_" + GetType_Presentation(Pre_Form[i].Type) + "_title").style.height = (60 + 17.5 * (GetStringLength_Presentation(Pre_Form[i].Title) - 1) / 72) + 'px';
        if (Pre_Form[i].Type == 3) { }
        else {
            for (var j = 0; j < Pre_Form[i].Option_Num; j++) {
                document.getElementById("Pre_form_Project_" + Pre_Form[i].Coding + "_option_" + (j + 1)).style.height = (30 + 12 * (GetStringLength_Presentation(Pre_Form[i].Option[j].Text) - 1) / 58) + 'px';
                document.getElementById("Pre_form_Project_" + Pre_Form[i].Coding + "_option_" + (j + 1) + "_label").style.height = (12 + 12 * (GetStringLength_Presentation(Pre_Form[i].Option[j].Text) - 1) / 58) + 'px';
            }
        }
    }
}

function ToHTML_Presentation_MainTitle(object) {
    var string = "";
    string += "<div id=\"Pre_form_MainTitle\" class=\"Pre_form_MainTitle\">";
    string += "<div id=\"Pre_form_MainTitle_title\" class=\"Pre_form_MainTitle_title\"><label   id=\"Pre_form_MainTitle_title\">" + object.Title + "</label></div>";
    string += "<div id=\"Pre_form_MainTitle_content\" class=\"Pre_form_MainTitle_content\"><label>" + object.Content + "</label></div>";
    string += "</div>";
    return string;
}
function ToHTML_Presentation_Multiple(object) {
    var string = "";
    string += "<div class=\"Pre_form_Project\">";
    string += "<div class=\"Pre_form_Project__Head\"><div class=\"Pre_form_Project__Head_Type\"><label>" + object.No + ": Checkboxes " + GetMultipleNumString_Presentation(object) + "</label></div></div>";
    string += "<div class=\"Pre_form_Project_Multiple\">";
    string += "<div id=\"Pre_form_Project_" + object.Coding + "_Multiple_title\"  class=\"Pre_form_Project_Multiple_title\"><label>" + object.Title + "</label></div>";
    for (var i = 0; i < object.Option_Num; i++) {
        string += "<div id=\"Pre_form_Project_" + object.Coding + "_option_" + (i + 1) + "\" class=\"Pre_form_Project_Multiple_option\">";
        string += "<div class=\"Pre_form_Project_Multiple_checkbox_pane\" onclick=\"CheckBox_Presentation_Multiple(" + object.Coding + "," + i + ")\" onmousemove=\"button_Presentation_Multiple_Option_move(" + object.Coding + "," + i + ")\" onmouseout=\"button_Presentation_Multiple_Option_out(" + object.Coding + "," + i + ")\"><div id=\"Pre_form_Project_" + object.Coding + "_option_" + (i + 1) + "_checkbox\" class=\"Pre_form_Project_Multiple_checkbox\"><div id=\"Pre_form_Project_" + object.Coding + "_option_" + (i + 1) + "_check\" class=\"Pre_form_Project_Multiple_checkbox_NoSelected\"></div></div></div>";
        string += "<label id=\"Pre_form_Project_" + object.Coding + "_option_" + (i + 1) + "_label\">" + GetOptionName_Presentation(i+1) + ". " + object.Option[i].Text + "</label>";
        string += "</div>";
    }
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Presentation_Single(object) {
    var string = "";
    string += "<div class=\"Pre_form_Project\">";
    string += "<div class=\"Pre_form_Project__Head\"><div class=\"Pre_form_Project__Head_Type\"><label>" + object.No + ": Multiple</label></div></div>";
    string += "<div class=\"Pre_form_Project_Single\">";
    string += "<div id=\"Pre_form_Project_" + object.Coding + "_Single_title\" class=\"Pre_form_Project_Single_title\"><label>" + object.Title + "</label></div>";
    for (var i = 0; i < object.Option_Num; i++) {
        string += "<div id=\"Pre_form_Project_" + object.Coding + "_option_" + (i + 1) + "\" class=\"Pre_form_Project_Single_option\">";
        string += "<div class=\"Pre_form_Project_Single_checkbox_pane\" onclick=\"CheckBox_Presentation_Single(" + object.Coding + "," + i + ")\" onmousemove=\"button_Presentation_Single_Option_move(" + object.Coding + "," + i + ")\" onmouseout=\"button_Presentation_Single_Option_out(" + object.Coding + "," + i + ")\"><div id=\"Pre_form_Project_" + object.Coding + "_option_" + (i + 1) + "_checkbox\" class=\"Pre_form_Project_Single_checkbox\"><div id=\"Pre_form_Project_" + object.Coding + "_option_" + (i + 1) + "_check\" class=\"Pre_form_Project_Single_checkbox_NoSelected\"></div></div></div>";
        string += "<label id=\"Pre_form_Project_" + object.Coding + "_option_" + (i + 1) + "_label\">" + GetOptionName_Presentation(i + 1) + ". " + object.Option[i].Text + "</label>";
        string += "</div>";
    }
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Presentation_Text(object) {
    var string = "";
    string += "<div class=\"Pre_form_Project\">";
    string += "<div class=\"Pre_form_Project__Head\">";
    string += "<div class=\"Pre_form_Project__Head_Type\"><label>" + object.No + ": Question (300 words)</label></div>";
    string += "</div>";
    string += "<div class=\"Pre_form_Project_Text\">";
    string += "<div class=\"Pre_form_Project_Text_title\" id=\"Pre_form_Project_" + object.Coding + "_Text_title\"><label>" + object.Title + "</label></div>";
    string += "<div class=\"Pre_form_Project_Text_text\"><label>Content:</label><textarea id=\"Pre_form_Project_" + object.Coding + "_Text_text\" maxlength=\"" + object.Text_Max + "\">" + object.Text + "</textarea></div>";
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Presentation(object) {
    if (object.Type == 0) return ToHTML_Presentation_MainTitle(object);
    else if (object.Type == 1) return ToHTML_Presentation_Multiple(object);
    else if (object.Type == 2) return ToHTML_Presentation_Single(object);
    else if (object.Type == 3) return ToHTML_Presentation_Text(object);
    else "";
}

function Examination_Presentation_Multiple(object) {
    var Select_Num = 0;
    for (var i = 0; i < object.Option_Num; i++) {
        if (object.Option[i].Selected) Select_Num++;
    }
    if (Select_Num == 0) Pre_Eorro_Option += " " + object.No + ",";
    else if (Select_Num < object.Option_Min) Pre_Eorro_Option += " " + object.No + ",";
}
function Examination_Presentation_Single(object) {
    var Select = false;
    for (var i = 0; i < object.Option_Num; i++) {
        if (object.Option[i].Selected) {
            Select = true;
            break;
        }
    }
    if (Select) { }
    else Pre_Eorro_Option += " " + object.No + ",";
}
function Examination_Presentation_Text(object) {
    if (object.Text == "") Pre_Eorro_Option += " " + object.No + ",";
}
function Examination_Presentation(object) {
    if (object.Type == 1) Examination_Presentation_Multiple(object);
    else if (object.Type == 2) Examination_Presentation_Single(object);
    else if (object.Type == 3) Examination_Presentation_Text(object);
}

function button_Presentation_sumbit_down() {
    $(".Pre_form_button_submit input").css("background-color", "rgba(255, 145, 26, 0.5)");
};
function button_Presentation_sumbit_move() {
    $(".Pre_form_button_submit input").css("background-color", "rgba(255, 145, 26, 0.75)");
};
function button_Presentation_sumbit_out() {
    $(".Pre_form_button_submit input").css("background-color", "#ff911a");
};
function button_Presentation_sumbit_up() {
    $(".Pre_form_button_submit input").css("background-color", "#ff911a");

    Pre_Eorro_Option = "No:";
    for (var i = 1; i < Pre_Form.length; i++) {
        if (Pre_Form[i].Type == 3) {
            Pre_Form[i].Text = $("#Pre_form_Project_" + Pre_Form[i].Coding + "_Text_text").val();
        }
    }
    for (var i = 1; i < Pre_Form.length; i++) {
        Examination_Presentation(Pre_Form[i]);
    }
    if (Pre_Eorro_Option == "No:") {
        var string = "";
        string += "<div id=\"Pre_Form_Submit_pane\" class=\"Pre_Form_Submit_pane\">";
        string += "<div class=\"Pre_Form_Submit_pane_Head\"></div>";
        string += "<div class=\"Pre_Form_Submit_pane_mess\"><label id=\"Pre_Form_Submit_pane_mess\">Do you want to submit a project?</label></div>";
        string += "<div id=\"Pre_Form_Submit_pane_BackYes\" class=\"Pre_Form_Submit_pane_BackYes\"><input value=\"Yes\" type=\"button\" onmousedown=\"button_Pre_Form_SubmitYes_down()\" onmousemove=\"button_Pre_Form_SubmitYes_move()\" onmouseout=\"button_Pre_Form_SubmitYes_out()\" onmouseup=\"button_Pre_Form_SubmitYes_up()\"/></div>";
        string += "<div id=\"Pre_Form_Submit_pane_BackNo\" class=\"Pre_Form_Submit_pane_BackNo\"><input value=\"No\" type=\"button\" onmousedown=\"button_Pre_Form_SubmitNo_down()\" onmousemove=\"button_Pre_Form_SubmitNo_move()\" onmouseout=\"button_Pre_Form_SubmitNo_out()\" onmouseup=\"button_Pre_Form_SubmitNo_up()\"/></div>";
        string += "</div>";

        $("#Pre_Form_Submit").addClass("Pre_Form_Submit");
        document.getElementById("Pre_Form_Submit").innerHTML = string;
    }
    else {
        var string = "";
        string += "<div id=\"Pre_Form_Submit_pane\" class=\"Pre_Form_Submit_pane\">";
        string += "<div class=\"Pre_Form_Submit_pane_Head\"></div>";
        string += "<div  class=\"Pre_Form_Submit_pane_mess\"><label id=\"Pre_Form_Submit_pane_mess\">The following content does not meet the requirements:<br>" + Pre_Eorro_Option + "</label></div>";
        string += "<div id=\"Pre_Form_Submit_pane_Back\" class=\"Pre_Form_Submit_pane_Back\"><input value=\"OK\" type=\"button\" onmousedown=\"button_Pre_Form_SubmitBack_down()\" onmousemove=\"button_Pre_Form_SubmitBack_move()\" onmouseout=\"button_Pre_Form_SubmitBack_out()\" onmouseup=\"button_Pre_Form_SubmitBack_up()\"/></div>";
        string += "</div>";

        $("#Pre_Form_Submit").addClass("Pre_Form_Submit");
        document.getElementById("Pre_Form_Submit").innerHTML = string;
    }
};
function button_Presentation_sumbit_up_Preview() {
    $(".Pre_form_button_submit input").css("background-color", "#ff911a");
};

function button_Pre_Form_SubmitYes_down() {
    $(".Pre_Form_Submit_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Pre_Form_SubmitYes_move() {
    $(".Pre_Form_Submit_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Pre_Form_SubmitYes_out() {
    $(".Pre_Form_Submit_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Pre_Form_SubmitYes_up() {
    $(".Pre_Form_Submit_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
    $("div").remove("#Pre_Form_Submit_pane_BackYes");
    $("div").remove("#Pre_Form_Submit_pane_BackNo");

    document.getElementById("Pre_Form_Submit_pane_mess").innerHTML = "<div class=\"Pre_None_Select\">Start submitting the project<br><br>We will apply to call your wallet</div>";
        document.getElementById("Pre_Form_Submit_pane").innerHTML += "<div id=\"Pre_Form_Submit_pane_Back\" class=\"Pre_Form_Submit_pane_Back\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Pre_Form_SubmitBack_down()\" onmousemove=\"button_Pre_Form_SubmitBack_move()\" onmouseout=\"button_Pre_Form_SubmitBack_out()\" onmouseup=\"button_Pre_Form_SubmitBack_Plus_1_up()\"/></div>";

    Pre_WalletUsed = true;
        var dappAddress = DappAddress;
        var nebulas = require("nebulas"),
            Account = nebulas.Account,
            neb = new nebulas.Neb();
        neb.setRequest(new nebulas.HttpRequest(DappNetwork));
        var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
        var nebPay = new NebPay();
        var SerialNumber;
        var Query;//间隔查询


        var PreData_Save = function () {
            this.Key = null;
            this.Form = null;
        }
        var PreData = new PreData_Save();
        PreData.Key = Pre_Key;
        PreData.Form = Pre_Form;

        var to = dappAddress;
        var value = "0";
        var callFunction = "PreData_Sumbit"
        var callArgs = "[" + JSON.stringify(PreData) + "]";

        SerialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: button_Pre_Form_SubmitYes_up_Listener//设置listener, 处理交易返回信息
        });
        Query = setInterval(function () { button_Pre_Form_SubmitYes_up_Query(Query, SerialNumber); }, 5000);

        function button_Pre_Form_SubmitYes_up_Query() {
            nebPay.queryPayInfo(SerialNumber).then(function (resp) {
                if (Pre_WalletUsed) {
                    var respObject = JSON.parse(resp)
                    if (respObject.code === 0) {
                        Pre_WalletUsed = false;
                        document.getElementById("Pre_Form_Submit_pane_mess").innerHTML = "<div class=\"Pre_Pre_None_Select\">Upload data successfully, thank you for using</div><br><div class=\"Pre_Pre_None_Select\">Now you can click this button to exit this page</div>";
                        document.getElementById("Pre_Form_Submit_pane").innerHTML += "<div id=\"Pre_Form_Submit_pane_Back\" class=\"Pre_Form_Submit_pane_Back\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Pre_Form_SubmitBack_down()\" onmousemove=\"button_Pre_Form_SubmitBack_move()\" onmouseout=\"button_Pre_Form_SubmitBack_out()\" onmouseup=\"button_Pre_Form_SubmitBack_Plus_2_up()\"/></div>";
                        Pre_Submit_OK = true;
                        clearInterval(Query);
                    }
                }
                else {
                    clearInterval(Query);
                    $("#Pre_Form_Submit").removeClass("Pre_Form_Submit");
                    document.getElementById("Pre_Form_Submit").innerHTML = "";
                }
            }).catch(function (err) {
                document.getElementById("Pre_Form_Submit_pane_mess").innerHTML = "<div class=\"Pre_Pre_None_Select\">We seem to have encountered some errors,</div><div class=\"Pre_Pre_None_Select\">You can save it later.</div>"+err;
                document.getElementById("Pre_Form_Submit_pane").innerHTML += "<div id=\"Pre_Form_Submit_pane_Back\" class=\"Pre_Form_Submit_pane_Back\"><input value=\"Exit\" type=\"button\" onmousedown=\"button_Pre_Form_SubmitBack_down()\" onmousemove=\"button_Pre_Form_SubmitBack_move()\" onmouseout=\"button_Pre_Form_SubmitBack_out()\" onmouseup=\"button_Pre_Form_SubmitBack_Plus_2_up()\"/></div>";
            });
        }
        function button_Pre_Form_SubmitYes_up_Listener() {
            $("div").remove("#Pre_Form_Submit_pane_Back");
            document.getElementById("Pre_Form_Submit_pane_mess").innerHTML = "<div class=\"Pre_None_Select\">Project is being saved<br><br>Please wait...</div>";
        }
}
function button_Pre_Form_SubmitNo_down() {
    $(".Pre_Form_Submit_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Pre_Form_SubmitNo_move() {
    $(".Pre_Form_Submit_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Pre_Form_SubmitNo_out() {
    $(".Pre_Form_Submit_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Pre_Form_SubmitNo_up() {
    $(".Pre_Form_Submit_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("#Pre_Form_Submit").removeClass("Pre_Form_Submit");
    document.getElementById("Pre_Form_Submit").innerHTML = "";
}
function button_Pre_Form_SubmitBack_down() {
    $(".Pre_Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Pre_Form_SubmitBack_move() {
    $(".Pre_Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Pre_Form_SubmitBack_out() {
    $(".Pre_Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Pre_Form_SubmitBack_up() {
    $(".Pre_Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("#Pre_Form_Submit").removeClass("Pre_Form_Submit");
    document.getElementById("Pre_Form_Submit").innerHTML = "";
}
function button_Pre_Form_SubmitBack_Plus_1_up() {
    $(".Pre_Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");

    Pre_WalletUsed = false;
    document.getElementById("Pre_Form_Submit_pane_mess").innerHTML = "<br><br>Exiting, Please wait..."
    $("div").remove("#Pre_Form_Submit_pane_Back");
}
function button_Pre_Form_SubmitBack_Plus_2_up() {
    $(".Pre_Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");
    window.location.href = "dapp_house.html";
}


function button_Presentation_Multiple_Option_move(coding, index) {
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_checkbox").removeClass("Pre_form_Project_Multiple_checkbox");
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_checkbox").addClass("Pre_form_Project_Multiple_checkbox_Move");
}
function button_Presentation_Multiple_Option_out(coding, index) {
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_checkbox").removeClass("Pre_form_Project_Multiple_checkbox_Move");
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_checkbox").addClass("Pre_form_Project_Multiple_checkbox");
}

function button_Presentation_Single_Option_move(coding, index) {
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_checkbox").removeClass("Pre_form_Project_Single_checkbox");
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_checkbox").addClass("Pre_form_Project_Single_checkbox_Move");
}
function button_Presentation_Single_Option_out(coding, index) {
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_checkbox").removeClass("Pre_form_Project_Single_checkbox_Move");
    $("#Pre_form_Project_" + coding + "_option_" + (index + 1) + "_checkbox").addClass("Pre_form_Project_Single_checkbox");
}

function button_Pre_Top_House_down() {
    $(".Pre_top_house").css("opacity", "0.25");
}
function button_Pre_Top_House_move() {
    $(".Pre_top_house").css("opacity", "0.6");
}
function button_Pre_Top_House_out() {
    $(".Pre_top_house").css("opacity", "0.85");
}
function button_Pre_Top_House_up() {
    $(".Pre_top_house").css("opacity", "0.85");
    if (Pre_Submit_OK) {
        window.location.href = "dapp_house.html";
    }
    else {        
        var string = "";
        string += "<div class=\"Pre_House_pane\">";
        string += "<div class=\"Pre_House_pane_Head\"></div>";
        string += "<div class=\"Pre_House_pane_mess\"><label><div class=\"Pre_Pre_None_Select\">Project not saved yet, whether to exit?</div></label></div>";
        string += "<div class=\"Pre_House_pane_BackYes\"><input value=\"Yes\" type=\"button\" onmousedown=\"button_Pre_Top_House_BackYes_down()\" onmousemove=\"button_Pre_Top_House_BackYes_move()\" onmouseout=\"button_Pre_Top_House_BackYes_out()\" onmouseup=\"button_Pre_Top_House_BackYes_up()\"/></div>";
        string += "<div class=\"Pre_House_pane_BackNo\"><input value=\"No\" type=\"button\" onmousedown=\"button_Pre_Top_House_BackNo_down()\" onmousemove=\"button_Pre_Top_House_BackNo_move()\" onmouseout=\"button_Pre_Top_House_BackNo_out()\" onmouseup=\"button_Pre_Top_House_BackNo_up()\"/></div>";
        string += "</div>";

        $("#Pre_House").addClass("Pre_House");
        document.getElementById("Pre_House").innerHTML = string;
    }
}

function button_Pre_Top_House_BackYes_down() {
    $(".Pre_House_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Pre_Top_House_BackYes_move() {
    $(".Pre_House_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Pre_Top_House_BackYes_out() {
    $(".Pre_House_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Pre_Top_House_BackYes_up() {
    $(".Pre_House_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
    window.location.href = "dapp_house.html";
}
function button_Pre_Top_House_BackNo_down() {
    $(".Pre_House_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Pre_Top_House_BackNo_move() {
    $(".Pre_House_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Pre_Top_House_BackNo_out() {
    $(".Pre_House_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Pre_Top_House_BackNo_up() {
    $(".Pre_House_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("#Pre_House").removeClass("Pre_House");
    document.getElementById("Pre_House").innerHTML = "";
}

function button_Pre_Top_Help_down() {
    $(".Pre_top_help").css("opacity", "0.25");
}
function button_Pre_Top_Help_move() {
    $(".Pre_top_help").css("opacity", "0.6");
}
function button_Pre_Top_Help_out() {
    $(".Pre_top_help").css("opacity", "0.85");
}
function button_Pre_Top_Help_up() {
    $(".Pre_top_help").css("opacity", "0.85");
    window.open("dapp_help.html");
}

function button_Restore_Pre_Remind_Type2_dowm() {
    $(".Pre_Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Restore_Pre_Remind_Type2_move() {
    $(".Pre_Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Restore_Pre_Remind_Type2_out() {
    $(".Pre_Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Restore_Pre_Remind_Type2_up() {
    $(".Pre_Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.8)");
    window.location.href = "dapp_house.html";
}

function button_Pre_Top_Language_down() {
    $(".Pre_top_Language").css("opacity", "0.35");
}
function button_Pre_Top_Language_move() {
    $(".Pre_top_Language").css("opacity", "0.75");
}
function button_Pre_Top_Language_out() {
    $(".Pre_top_Language").css("opacity", "1");
}
function button_Pre_Top_Language_up() {
    $(".Pre_top_Language").css("opacity", "1");
    var url = window.location.href;
    var new_url = url.replace("la_us", "la_cn");
    window.location.href = new_url;
}