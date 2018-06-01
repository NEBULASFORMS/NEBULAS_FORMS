"use strict";

var Info_MainTitle = function () {
    this.Type = 0;
    this.Coding = null;
    this.EditStatus = true;
    this.Title = "未命名";
    this.Title_Count = 25;
    this.Content = "未填写";
    this.Content_Count = 300;
}
var Info_Multiple = function () {
    this.Type = 1;
    this.No = null;
    this.Coding = null;
    this.EditStatus = false;
    this.Title = "未命名";
    this.Option_Num = 3;
    this.Option_Max = 0;
    this.Option_Min = 0;
    this.Option = new Array(3);
    for (var i = 0; i < this.Option.length; i++) {
        this.Option[i] = "未填写";
    }
}
var Info_Single = function () {
    this.Type = 2;
    this.No = null;
    this.Coding = null;
    this.EditStatus = false;
    this.Title = "未命名";
    this.Option_Num = 3;
    this.Option = new Array(3);
    for (var i = 0; i < this.Option.length; i++) {
        this.Option[i] = "未填写";
    }
}
var Info_Text = function () {
    this.Type = 3;
    this.No = null;
    this.Coding = null;
    this.EditStatus = false;
    this.Title = "未命名";
    this.Text = "未填写";
    this.Text_Max = 125;
}

var EditInfo_Multiple = function () {
    this.No = "";
    this.Coding = "";
    this.Title = "";
    this.Type = 1;
    this.Option_Num = null;
    this.Option_Max = null;
    this.Option_Min = null;
    this.Option = new Array();
}
var EditInfo_Single = function () {
    this.No = "";
    this.Coding = "";
    this.Title = "";
    this.Type = 2;
    this.Option_Num = null;
    this.Option = new Array();
}
var EditInfo_Text = function () {
    this.No = "";
    this.Coding = "";
    this.Title = "";
    this.Type = 3;
    this.Text = "";
}

function OnLoad() {
    var url = location.search;
    var statusIndex = url.indexOf("status");
    var keyIndex = url.indexOf("key");
    var valueIndex = url.indexOf("value");
    var status;
    var key;
    var value;
    if (statusIndex > 0) status = url[statusIndex + 7];
    else status = 0;
    if (keyIndex > 0) {
        if ((valueIndex - keyIndex) == 25) key = url.slice(keyIndex + 4, keyIndex + 24);
        else key = 0;
    }
    if (valueIndex > 0) {
        if ((valueIndex + 26) == url.length) value = url.slice(valueIndex + 6, valueIndex + 26);
        else value = 0;
    }
    else value = 0;
    Edit_Onload(status, key, value);
}
function Edit_Onload(status, key, value) {
    if (status == 1) {
        MainTitle = new Info_MainTitle();
        MainTitle.Coding = 1;
        Form.push(MainTitle);
        EditStatus = true;
        HTML_Updata();
    }
    else if (status == 2) {
        if (key.length == 20 && value.length == 20) {
            Restore_Remind_Type1_Open("正在恢复数据", key, value);
        }
        else {
            Restore_Remind_Type2_Open("地址错误,请检查你的链接");
        }
    }
    else {
        Restore_Remind_Type2_Open("错误:请检查你的链接");
    }
    $(".main").css("pointer-events","auto");
}

function ToHTML_MainTitle(object) {
    var string = "";
    if (object.EditStatus) {
        string += "<div class=\"form_EditMainTitle\">";
        string += "<div class=\"form_EditMainTitle_tile\"><label>主题:</label><input id=\"form_EditMainTitle_tile\" type=\"text\" maxlength=\"" + object.Title_Count + "\" value=\"" + object.Title + "\" onblur=\"OnBlur_MainTitle()\" /></div>";
        string += "<div class=\"form_EditMainTitle_content\"><label>介绍:</label><textarea id=\"form_EditMainTitle_content\" maxlength=\"" + object.Content_Count + "\" onblur=\"OnBlur_MainTitle()\" >" + object.Content + "</textarea></div>";
        string += "</div>";
    }
    else {
        string += "<div id=\"form_MainTitle\" class=\"form_MainTitle\" onclick=\"OnClick_MainTitle(" + object.Coding + ")\">";
        string += "<div id=\"form_MainTitle_title\" class=\"form_MainTitle_title\"><label id=\"form_MainTitle_title\">" + object.Title + "</label></div>";
        string += "<div id=\"form_MainTitle_content\" class=\"form_MainTitle_content\"><label id=\"form_MainTitle_content\">" + object.Content + "</label></div>";
        string += "</div>";
    }
    return string;
}
function ToHTML_Multiple(object) {
    var string = "";
    if (object.EditStatus) string += "<div id=\"form_Project_" + object.Coding + "\" class=\"form_Project_OnClick\">";
    else string += "<div id=\"form_Project_" + object.Coding + "\" class=\"form_Project\" onclick=\"OnClick_Multiple(" + object.Coding + ")\">";
    string += "<div class=\"form_Project__Head\">";
    string += "<div class=\"form_Project__Head_Type\"><label id=\"form_Project_" + object.Coding + "_Head_Type\">" + object.No + ": 多选项" + GetMultipleNumString(object) + "</label></div>";
    if (object.EditStatus) string += "<div class=\"form_Project__Head_Del\" onmousedown=\"button_OnClick_Del_down()\" onmousemove=\"button_OnClick_Del_move()\" onmouseout=\"button_OnClick_Del_out()\" onmouseup=\"button_OnClick_Del_up(" + object.Coding + ")\"></div>";
    string += "</div>";
    string += "<div id=\"form_Project_" + object.Coding + "_Multiple\" class=\"form_Project_Multiple\">";
    string += "<div id=\"form_Project_" + object.Coding + "_Multiple_title\" class=\"form_Project_Multiple_title\"><label>" + object.Title + "</label></div>";
    for (var i = 0; i < object.Option_Num; i++) {
        string += "<div id=\"form_Project_" + object.Coding + "_option_" + (i + 1) + "\" class=\"form_Project_Multiple_option\">";
        string += "<input type=\"checkbox\" disabled=\"disabled\" />";
        string += "<label id=\"form_Project_" + object.Coding + "_option_" + (i + 1) + "_label\">" + GetOptionName(i+1) + ". " + object.Option[i] + "</label>";
        string += "</div>";
    }
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Single(object) {
    var string = "";
    if (object.EditStatus) string += "<div id=\"form_Project_" + object.Coding + "\" class=\"form_Project_OnClick\">";
    else string += "<div id=\"form_Project_" + object.Coding + "\" class=\"form_Project\" onclick=\"OnClick_Single(" + object.Coding + ")\">";
    string += "<div class=\"form_Project__Head\">";
    string += "<div class=\"form_Project__Head_Type\"><label id=\"form_Project_" + object.Coding + "_Head_Type\">" + object.No + ": 单选项</label></div>";
    if (object.EditStatus) string += "<div class=\"form_Project__Head_Del\" onmousedown=\"button_OnClick_Del_down()\" onmousemove=\"button_OnClick_Del_move()\" onmouseout=\"button_OnClick_Del_out()\" onmouseup=\"button_OnClick_Del_up(" + object.Coding + ")\"></div>";
    string += "</div>";
    string += "<div id=\"form_Project_" + object.Coding + "_Single\" class=\"form_Project_Single\">";
    string += "<div id=\"form_Project_" + object.Coding + "_Single_title\" class=\"form_Project_Single_title\"><label>" + object.Title + "</label></div>";
    for (var i = 0; i < object.Option_Num; i++) {
        string += "<div id=\"form_Project_" + object.Coding + "_option_" + (i + 1) + "\" class=\"form_Project_Single_option\">";
        string += "<input type=\"checkbox\" disabled=\"disabled\" />";
        string += "<label id=\"form_Project_" + object.Coding + "_option_" + (i + 1) + "_label\">" + GetOptionName(i+1) + ". " + object.Option[i] + "</label>";
        string += "</div>";
    }
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Text(object) {
    var string = "";
    if (object.EditStatus) string += "<div id=\"form_Project_" + object.Coding + "\" class=\"form_Project_OnClick\">";
    else string += "<div id=\"form_Project_" + object.Coding + "\" class=\"form_Project\" onclick=\"OnClick_Text(" + object.Coding + ")\">";
    string += "<div class=\"form_Project__Head\">";
    string += "<div class=\"form_Project__Head_Type\"><label id=\"form_Project_" + object.Coding + "_Head_Type\">" + object.No + ": 文本项</label></div>";
    if (object.EditStatus) string += "<div class=\"form_Project__Head_Del\" onmousedown=\"button_OnClick_Del_down()\" onmousemove=\"button_OnClick_Del_move()\" onmouseout=\"button_OnClick_Del_out()\" onmouseup=\"button_OnClick_Del_up(" + object.Coding + ")\"></div>";
    string += "</div>";
    string += "<div class=\"form_Project_Text\">";
    string += "<div id=\"form_Project_" + object.Coding + "_Text_title\" class=\"form_Project_Text_title\"><label>" + object.Title + "</label></div>";
    string += "<div class=\"form_Project_Text_text\"><label>内容:</label><textarea id=\"form_Project_" + object.Coding + "_Text_text\" maxlength=\"" + object.Text_Max + "\">" + object.Text + "</textarea></div>";
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML(object) {
    if (object.Type == 0) return ToHTML_MainTitle(object);
    else if (object.Type == 1) return ToHTML_Multiple(object);
    else if (object.Type == 2) return ToHTML_Single(object);
    else if (object.Type == 3) return ToHTML_Text(object);
    else return "";
}

function ToHTML_Edit_Multiple() {
    var string = "";
    string += "<div class=\"edit_Edit_Heading\"><div class=\"edit_Edit_Heading_Type\" ><label>" + Edit.No + " : 多选项</label></div></div>";
    string += "<div class=\"edit_Edit_Title\"><label>标题:</label><textarea id=\"edit_Edit_Title\" maxlength=\"125\" onblur=\"OnBlur_Multiple()\">" + Edit.Title + "</textarea></div>";
    string += "<div class=\"edit_Edit_Multiple\">";
    string += "<div id=\"edit_Edit_Multiple_Options\" class=\"edit_Edit_Multiple_Options\">";
    for (var i = 0; i < Edit.Option_Num; i++) {
        string += "<div id=\"edit_Edit_Multiple_Option_" + (i + 1) + "\" class=\"edit_Edit_Multiple_Option\"><label>选项" + GetOptionName(i + 1) + ":</label><input id=\"edit_Edit_Multiple_Option_" + (i + 1) + "_value\" type=\"text\" value=\"" + Edit.Option[i] + "\" onblur=\"OnBlur_Multiple()\"/></div>";
    }
    string += "<div id=\"edit_Edit_Multiple_OptionButton\" class=\"edit_Edit_Multiple_OptionButton\">";
    string += "<input class=\"edit_Edit_Multiple_OptionButton_Add\" type=\"button\" value=\"+\" onmousedown=\"button_MultipleEditAdd_down()\" onmousemove=\"button_MultipleEditAdd_move()\" onmouseout=\"button_MultipleEditAdd_out()\" onmouseup=\"button_MultipleEditAdd_up()\"/>";
    string += "<input class=\"edit_Edit_Multiple_OptionButton_Del\" type=\"button\" value=\"-\" onmousedown=\"button_MultipleEditDel_down()\" onmousemove=\"button_MultipleEditDel_move()\" onmouseout=\"button_MultipleEditDel_out()\" onmouseup=\"button_MultipleEditDel_up()\"/>";
    string += "</div>";
    string += "<div class=\"edit_Edit_Multiple_OptionNum\"><label>相关:</label></div>";
    string += "<div class=\"edit_Edit_Multiple_Num_Min\"><label>最小值:</label><input  id=\"edit_Edit_Multiple_Num_Min_value\" value=\"" + Edit.Option_Min + "\" type=\"text\" /><div class=\"edit_Edit_Multiple_Num_Min_div\"></div>";
    string += "<div class=\"edit_Edit_Multiple_Num_Min_add\" onmousedown=\"button_edit_mu_min_add_down()\" onmousemove=\"button_edit_mu_min_add_move()\" onmouseout=\"button_edit_mu_min_add_out()\" onmouseup=\"button_edit_mu_min_add_up()\"></div>";
    string += "<div class=\"edit_Edit_Multiple_Num_Min_del\" onmousedown=\"button_edit_mu_min_del_down()\" onmousemove=\"button_edit_mu_min_del_move()\" onmouseout=\"button_edit_mu_min_del_out()\" onmouseup=\"button_edit_mu_min_del_up()\"></div>";
    string += "</div>";
    string += "<div class=\"edit_Edit_Multiple_Num_Max\"><label>最大值:</label><input  id=\"edit_Edit_Multiple_Num_Max_value\" value=\""+Edit.Option_Max+"\" type=\"text\" /><div class=\"edit_Edit_Multiple_Num_Max_div\"></div>";
    string += "<div class=\"edit_Edit_Multiple_Num_Max_add\" onmousedown=\"button_edit_mu_max_add_down()\" onmousemove=\"button_edit_mu_max_add_move()\" onmouseout=\"button_edit_mu_max_add_out()\" onmouseup=\"button_edit_mu_max_add_up()\"></div>";
    string += "<div class=\"edit_Edit_Multiple_Num_Max_del\" onmousedown=\"button_edit_mu_max_del_down()\" onmousemove=\"button_edit_mu_max_del_move()\" onmouseout=\"button_edit_mu_max_del_out()\" onmouseup=\"button_edit_mu_max_del_up()\"></div>";
    string += "</div>";
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Edit_Single() {
    var string = "";
    string += "<div class=\"edit_Edit_Heading\"><div class=\"edit_Edit_Heading_Type\" ><label>" + Edit.No + " : 单选项</label></div></div>";
    string += "<div class=\"edit_Edit_Title\"><label>标题:</label><textarea id=\"edit_Edit_Title\" maxlength=\"125\" onblur=\"OnBlur_Single()\">" + Edit.Title + "</textarea></div>";
    string += "<div class=\"edit_Edit_Single\">";
    string += "<div id=\"edit_Edit_Single_Options\" class=\"edit_Edit_Single_Options\">";
    for (var i = 0; i < Edit.Option_Num; i++) {
        string += "<div id=\"edit_Edit_Single_Option_" + (i + 1) + "\" class=\"edit_Edit_Single_Option\"><label>选项" + GetOptionName(i + 1) + ":</label><input id=\"edit_Edit_Single_Option_" + (i + 1) + "_value\" type=\"text\" value=\"" + Edit.Option[i] + "\"  onblur=\"OnBlur_Single()\" /></div>";
    }
    string += "<div id=\"edit_Edit_Single_OptionButton\" class=\"edit_Edit_Single_OptionButton\">";
    string += "<input class=\"edit_Edit_Single_OptionButton_Add\" type=\"button\" value=\"+\" onmousedown=\"button_SingleEditAdd_down()\" onmousemove=\"button_SingleEditAdd_move()\" onmouseout=\"button_SingleEditAdd_out()\" onmouseup=\"button_SingleEditAdd_up()\"/>";
    string += "<input class=\"edit_Edit_Single_OptionButton_Del\" type=\"button\" value=\"-\" onmousedown=\"button_SingleEditDel_down()\" onmousemove=\"button_SingleEditDel_move()\" onmouseout=\"button_SingleEditDel_out()\" onmouseup=\"button_SingleEditDel_up()\"/>";
    string += "</div>";
    string += "</div>";
    string += "</div>";
    return string;
}
function ToHTML_Edit_Text() {
    var string = "";
    string += "<div class=\"edit_Edit_Heading\"><div class=\"edit_Edit_Heading_Type\" ><label>" + Edit.No + " : 文本项</label></div></div>";
    string += "<div class=\"edit_Edit_Title\"><label>标题:</label><textarea id=\"edit_Edit_Title\" maxlength=\"125\" onblur=\"OnBlur_Text()\">" + Edit.Title + "</textarea></div>";
    string += "<div class=\"edit_Edit_Text\">";
    string += "<label>默认值:</label><textarea id=\"edit_Edit_Text\" onblur=\"OnBlur_Text()\">" + Edit.Text + "</textarea>";
    string += "</div>";
    return string;
}
function ToHTML_NoEdit() {
    return "<div class=\"edit_NoEdit\"><div class=\"edit_NoEdit_Text\"><label>点击项目<br>可以编辑属性</label></div></div>";
}

function HTML_Updata() {
    var string = "";
    string += "<div class=\"form_Heading\"></div>";
    string += "<div class=\"form_Project_List\">";
    for (var i = 0; i < Form.length; i++) {
        string += ToHTML(Form[i]);
    }
    string += "</div>";
    string += "<div class=\"form_button_submit\"><input id=\"button_submit\" type=\"button\" value=\"提交\" onmousedown=\"button_sumbit_down()\" onmousemove=\"button_sumbit_move()\" onmouseout=\"button_sumbit_out()\" onmouseup=\"button_sumbit_up()\" /></div>";
    string += "<div class=\"form_bottom\"></div>";
    document.getElementById("form").innerHTML = string;
    HTML_UpdataTextLength();
}
function HTML_UpdataNo() {
    for (var i = 1; i < Form.length; i++) {
        Form[i].No = i;
        document.getElementById("form_Project_" + Form[i].Coding + "_Head_Type").innerHTML = Form[i].No + ": " + GetTypeName(Form[i].Type);
    }
}
function HTML_UpdataTextLength() {
    if (MainTitle.EditStatus) { }
    else {
        document.getElementById("form_MainTitle").style.height = (120 + 20 * (GetStringLength(Form[0].Content) - 1) / 70) + 'px';
        document.getElementById("form_MainTitle_content").style.height = (72 + 20 * (GetStringLength(Form[0].Content) - 1) / 70) + 'px';
    }
    for (var i = 1; i < Form.length; i++) {
        document.getElementById("form_Project_" + Form[i].Coding + "_" + GetType(Form[i].Type) + "_title").style.height = (60 + 17.5 * (GetStringLength(Form[i].Title) - 1) / 60) + 'px';
        if (Form[i].Type == 3) { }
        else {
            for (var j = 0; j < Form[i].Option_Num; j++) {
                document.getElementById("form_Project_" + Form[i].Coding + "_option_" + (j + 1)).style.height = (30 + 12 * (GetStringLength(Form[i].Option[j]) - 1) / 58) + 'px';
                document.getElementById("form_Project_" + Form[i].Coding + "_option_" + (j + 1) + "_label").style.height = (12 + 12 * (GetStringLength(Form[i].Option[j]) - 1) / 58) + 'px';
            }
        }
    }
}

function OnClick_ProjectChange(coding) {
    for (var i = 0; i < Form.length; i++) {
        if (Form[i].Coding == coding) Form[i].EditStatus = true;
        else Form[i].EditStatus = false;
    }
    HTML_Updata();
}
function OnClick_MainTitle(coding) {
    Edit = null;
    document.getElementById("edit_Edit").innerHTML = ToHTML_NoEdit();
    OnClick_ProjectChange(coding);
}
function OnClick_Multiple(coding) {
    if (MainTitle.EditStatus) {
        MainTitle.Title = document.getElementById("form_EditMainTitle_tile").value;
        MainTitle.Content = document.getElementById("form_EditMainTitle_content").value;
    }
    var object = GetProject(coding);
    Edit = new EditInfo_Multiple();
    Edit.No = object.No;
    Edit.Coding = object.Coding;
    Edit.Title = object.Title;
    Edit.Option_Num = object.Option_Num;
    Edit.Option_Max = object.Option_Max;
    Edit.Option_Min = object.Option_Min;
    for (var i = 0; i < object.Option_Num; i++) {
        Edit.Option.push(object.Option[i]);
    }
    document.getElementById("edit_Edit").innerHTML = ToHTML_Edit_Multiple();
    OnClick_ProjectChange(coding);
}
function OnClick_Single(coding) {
    if (MainTitle.EditStatus) {
        MainTitle.Title = document.getElementById("form_EditMainTitle_tile").value;
        MainTitle.Content = document.getElementById("form_EditMainTitle_content").value;
    }
    var object = GetProject(coding);
    Edit = new EditInfo_Single();
    Edit.No = object.No;
    Edit.Coding = object.Coding;
    Edit.Title = object.Title;
    Edit.Option_Num = object.Option_Num;
    for (var i = 0; i < object.Option_Num; i++) {
        Edit.Option.push(object.Option[i]);
    }
    document.getElementById("edit_Edit").innerHTML = ToHTML_Edit_Single();
    OnClick_ProjectChange(coding);
}
function OnClick_Text(coding) {
    if (MainTitle.EditStatus) {
        MainTitle.Title = document.getElementById("form_EditMainTitle_tile").value;
        MainTitle.Content = document.getElementById("form_EditMainTitle_content").value;
    }
    var object = GetProject(coding);
    Edit = new EditInfo_Text();
    Edit.No = object.No;
    Edit.Coding = object.Coding;
    Edit.Title = object.Title;
    Edit.Text = object.Text;
    document.getElementById("edit_Edit").innerHTML = ToHTML_Edit_Text();
    OnClick_ProjectChange(coding);
}
function OnClick_Del(coding) {
    $("div").remove("#form_Project_" + coding);
    Edit = null;
    document.getElementById("edit_Edit").innerHTML = ToHTML_NoEdit();

    var index = 0;
    for (var i = 1; i < Form.length; i++) {
        if (Form[i].Coding == coding) {
            index = i;
            break;
        }
    }
    Form.splice(index, 1);
    HTML_UpdataNo();
}

    function Restore_Remind_Type1_Open(str,Key,Pass) {
    $("#Remind").addClass("Remind");
    var string = "";
        string += "<div id=\"Remind_pane\" class=\"Remind_pane\">";
    string += "<div class=\"Remind_pane_Head\"></div>";
    string += "<div class=\"Remind_pane_mess\"><label id=\"Remind_pane_mess\">"+str+"</label></div>";
    string += "</div>";

    document.getElementById("Remind").innerHTML = string;

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
        var callFunction = "UploadData_Get";
        var callArgs = "[\"" + Key + "\",\"" + Pass + "\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        Restore_Remind_Type1_Then(resp);
    });
}
    function Restore_Remind_Type1_Then(resp) {
    var result = resp.result;
    if (result == "") {
        document.getElementById("Remind_pane_mess").innerHTML = "错误:调用合约失败";
        document.getElementById("Remind_pane").innerHTML += "<div class=\"Remind_pane_Button\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Restore_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Remind_Type2_move()\" onmouseout=\"button_Restore_Remind_Type2_out()\" onmouseup=\"button_Restore_Remind_Type2_up()\"/></div>";
    }
    else {
        try {
            result = JSON.parse(result)
        } catch (err) {
            document.getElementById("Remind_pane_mess").innerHTML = "JSON错误:" + err;
            document.getElementById("Remind_pane").innerHTML += "<div class=\"Remind_pane_Button\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Restore_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Remind_Type2_move()\" onmouseout=\"button_Restore_Remind_Type2_out()\" onmouseup=\"button_Restore_Remind_Type2_up()\"/></div>";
        }
        if (result.Value) {
            if (result.True) {
                document.getElementById("Remind_pane_mess").innerHTML = "合约中存在一个错误,请联系我们";
                document.getElementById("Remind_pane").innerHTML += "<div class=\"Remind_pane_Button\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Restore_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Remind_Type2_move()\" onmouseout=\"button_Restore_Remind_Type2_out()\" onmouseup=\"button_Restore_Remind_Type2_up()\"/></div>";
            }
            else {
                document.getElementById("Remind_pane_mess").innerHTML = result.Type + ":" + result.Value + "," + result.Info;
                document.getElementById("Remind_pane").innerHTML += "<div class=\"Remind_pane_Button\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Restore_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Remind_Type2_move()\" onmouseout=\"button_Restore_Remind_Type2_out()\" onmouseup=\"button_Restore_Remind_Type2_up()\"/></div>";
            }
        }
        else if (result.Key) {
            Project_Key = result.Key;
            Project_Pass = result.Pass;
            Project_OwnKeys = true;
            Form = result.FormData;
            MainTitle = Form[0];
            EditStatus = true;
            HTML_Updata();
            document.getElementById("add_Heading_KeyInfo_Value").innerHTML = Project_Key;
            document.getElementById("add_Heading_Password_Value").innerHTML = Project_Pass;
            Restore_Remind_Close();
        }
        else {
            document.getElementById("Remind_pane_mess").innerHTML = "错误:" + result;
            document.getElementById("Remind_pane").innerHTML += "<div class=\"Remind_pane_Button\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Restore_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Remind_Type2_move()\" onmouseout=\"button_Restore_Remind_Type2_out()\" onmouseup=\"button_Restore_Remind_Type2_up()\"/></div>";
        }
    }
}
    function Restore_Remind_Type2_Open(str) {
        $("#Remind").addClass("Remind");
        var string = "";
        string += "<div class=\"Remind_pane\">";
        string += "<div class=\"Remind_pane_Head\"></div>";
        string += "<div class=\"Remind_pane_mess\"><label id=\"Remind_pane_mess\">" + str + "</label></div>";
        string += "<div class=\"Remind_pane_Button\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Restore_Remind_Type2_dowm()\" onmousemove=\"button_Restore_Remind_Type2_move()\" onmouseout=\"button_Restore_Remind_Type2_out()\" onmouseup=\"button_Restore_Remind_Type2_up()\"/></div>";
        string += "</div>";

        document.getElementById("Remind").innerHTML = string;
    }
    function Restore_Remind_Close() {
        $("#Remind").removeClass("Remind");
        document.getElementById("Remind").innerHTML = "";
    }


    function GetProject(coding) {
        for (var i = 0; i < Form.length; i++) {
            if (Form[i].Coding == coding) return Form[i];
        }
    }
    function GetOptionName(index) {
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
    function GetTypeName(type) {
        if (type == 1) return "多选项";
        else if (type == 2) return "单选项";
        else if (type == 3) return "文本项";
        else "未知类";
    }
    function GetType(type) {
        if (type == 1) return "Multiple";
        else if (type == 2) return "Single";
        else if (type == 3) return "Text";
        else "";
    }
    function GetStringLength(string) {
        if (string == null) return 0;
        else return string.replace(/[\u0391-\uFFE5]/g, "aa").length;
    }
    function GetMultipleNumString(object) {
        if (object.Option_Max == 0) {
            if (object.Option_Min == 0) return "";
            else return "(最少 " + object.Option_Min + " 项)";
        }
        else {
            if (object.Option_Min == 0) return "(最多 " + object.Option_Max + " 项)";
            else return "(选择 " + object.Option_Min + " - " + object.Option_Max + " 项)";
        }
    }

    function button_sumbit_down() {
        $(".form_button_submit input").css("background-color", "rgba(255, 145, 26, 0.5)");
    };
    function button_sumbit_move() {
        $(".form_button_submit input").css("background-color", "rgba(255, 145, 26, 0.75)");
    };
    function button_sumbit_out() {
        $(".form_button_submit input").css("background-color", "#ff911a");
    };
    function button_sumbit_up() {
        $(".form_button_submit input").css("background-color", "#ff911a");

        var string = "";
        string += "<div id=\"Form_Submit_pane\" class=\"Form_Submit_pane\">";
        string += "<div class=\"Form_Submit_pane_Head\"></div>";
        string += "<div class=\"Form_Submit_pane_mess\"><label id=\"Form_Submit_pane_mess\">是否要提交项目?</label></div>";
        string += "<div id=\"Form_Submit_pane_BackYes\" class=\"Form_Submit_pane_BackYes\"><input value=\"确定\" type=\"button\" onmousedown=\"button_Form_SubmitYes_down()\" onmousemove=\"button_Form_SubmitYes_move()\" onmouseout=\"button_Form_SubmitYes_out()\" onmouseup=\"button_Form_SubmitYes_up()\"/></div>";
        string += "<div id=\"Form_Submit_pane_BackNo\" class=\"Form_Submit_pane_BackNo\"><input value=\"取消\" type=\"button\" onmousedown=\"button_Form_SubmitNo_down()\" onmousemove=\"button_Form_SubmitNo_move()\" onmouseout=\"button_Form_SubmitNo_out()\" onmouseup=\"button_Form_SubmitNo_up()\"/></div>";
        string += "</div>";

        $("#Form_Submit").addClass("Form_Submit");
        document.getElementById("Form_Submit").innerHTML = string;
};

function button_Form_SubmitYes_down() {
    $(".Form_Submit_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Form_SubmitYes_move() {
    $(".Form_Submit_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Form_SubmitYes_out() {
    $(".Form_Submit_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Form_SubmitYes_up() {
    $(".Form_Submit_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
    $("div").remove("#Form_Submit_pane_BackYes");
    $("div").remove("#Form_Submit_pane_BackNo");

    if (Project_OwnKeys) {
        WalletUsed = true;
        document.getElementById("Form_Submit_pane_mess").innerHTML = "开始提交项目<br><br>我们会申请调用你的钱包插件";
        document.getElementById("Form_Submit_pane").innerHTML += "<div id=\"Form_Submit_pane_Back\" class=\"Form_Submit_pane_Back\"><input value=\"返回\" type=\"button\" onmousedown=\"button_Form_SubmitBack_down()\" onmousemove=\"button_Form_SubmitBack_move()\" onmouseout=\"button_Form_SubmitBack_out()\" onmouseup=\"button_Form_SubmitBack_Plus_1_up()\"/></div>";

        var dappAddress = DappAddress;
        var nebulas = require("nebulas"),
            Account = nebulas.Account,
            neb = new nebulas.Neb();
        neb.setRequest(new nebulas.HttpRequest(DappNetwork));
        var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
        var nebPay = new NebPay();
        var SerialNumber;
        var Query;//间隔查询
        

        var StorageData_Save = function () {
            this.Key = null;
            this.Pass = null;
            this.Form = null;
        }
        var StorageData = new StorageData_Save();
        StorageData.Key = Project_Key;
        StorageData.Pass = Project_Pass;
        StorageData.Form = Form;

        var to = dappAddress;
        var value = "0";
        var callFunction = "StorageData_Save"
        var callArgs = "[" + JSON.stringify(StorageData) + "]";

        SerialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: button_Form_SubmitYes_up_Listener//设置listener, 处理交易返回信息
        });
        Query = setInterval(function () { button_Form_SubmitYes_up_Query(Query, SerialNumber); }, 5000);

        function button_Form_SubmitYes_up_Query() {
            nebPay.queryPayInfo(SerialNumber).then(function (resp) {
                if (WalletUsed) {
                    var respObject = JSON.parse(resp)
                    if (respObject.code === 0) {                      
                        WalletUsed = false;
                        document.getElementById("Form_Submit_pane_mess").innerHTML = "<div class=\"None_Select\">上传数据成功 , 请妥善保管以下信息<br>稍后你可以使用它进行相关操作</div><br>项目编号 : " + Project_Key + "<br>项目密钥 : " + Project_Pass;
                        document.getElementById("Form_Submit_pane").innerHTML += "<div id=\"Form_Submit_pane_Back\" class=\"Form_Submit_pane_Back\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Form_SubmitBack_down()\" onmousemove=\"button_Form_SubmitBack_move()\" onmouseout=\"button_Form_SubmitBack_out()\" onmouseup=\"button_Form_SubmitBack_Plus_2_up()\"/></div>";
                        EditStatus = false;
                        clearInterval(Query);
                    }
                }
                else {
                    clearInterval(Query);
                    $("#Form_Submit").removeClass("Form_Submit");
                    document.getElementById("Form_Submit").innerHTML = "";
                }
                
            }).catch(function (err) {
                    document.getElementById("Form_Submit_pane_mess").innerHTML = "<div class=\"None_Select\">我们似乎遇到了一些错误</div><br><div class=\"None_Select\">你可以重新保存</div>";
                    document.getElementById("Form_Submit_pane").innerHTML += "<div id=\"Form_Submit_pane_Back\" class=\"Form_Submit_pane_Back\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Form_SubmitBack_down()\" onmousemove=\"button_Form_SubmitBack_move()\" onmouseout=\"button_Form_SubmitBack_out()\" onmouseup=\"button_Form_SubmitBack_Plus_2_up()\"/></div>";
                });
        }
        function button_Form_SubmitYes_up_Listener() {
            $("div").remove("#Form_Submit_pane_Back");
            document.getElementById("Form_Submit_pane_mess").innerHTML = "正在保存项目<br><br>请稍后";
        }
        
    }
    else {
        document.getElementById("Form_Submit_pane_mess").innerHTML = "检测到你没有项目密匙<br><br>请返回获取对应信息";
        document.getElementById("Form_Submit_pane").innerHTML += "<div id=\"Form_Submit_pane_Back\" class=\"Form_Submit_pane_Back\"><input value=\"确定\" type=\"button\" onmousedown=\"button_Form_SubmitBack_down()\" onmousemove=\"button_Form_SubmitBack_move()\" onmouseout=\"button_Form_SubmitBack_out()\" onmouseup=\"button_Form_SubmitBack_up()\"/></div>";
    }
}
function button_Form_SubmitNo_down() {
    $(".Form_Submit_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Form_SubmitNo_move() {
    $(".Form_Submit_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Form_SubmitNo_out() {
    $(".Form_Submit_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Form_SubmitNo_up() {
    $(".Form_Submit_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("#Form_Submit").removeClass("Form_Submit");
    document.getElementById("Form_Submit").innerHTML = "";
}
function button_Form_SubmitBack_down() {
    $(".Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Form_SubmitBack_move() {
    $(".Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Form_SubmitBack_out() {
    $(".Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Form_SubmitBack_up() {
    $(".Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("#Form_Submit").removeClass("Form_Submit");
    document.getElementById("Form_Submit").innerHTML = "";
}
function button_Form_SubmitBack_Plus_1_up() {
    $(".Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");

    WalletUsed = false;
    document.getElementById("Form_Submit_pane_mess").innerHTML = "<br><br>正在退出,请稍后"
    $("div").remove("#Form_Submit_pane_Back");
}
function button_Form_SubmitBack_Plus_2_up() {
    $(".Form_Submit_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");
    window.location.href = "dapp_house.html";
}

    function button_OnClick_Del_down() {
        $(".form_Project__Head_Del").css("opacity", "0.25");
    }
    function button_OnClick_Del_move() {
        $(".form_Project__Head_Del").css("opacity", "0.5");
    }
    function button_OnClick_Del_out() {
        $(".form_Project__Head_Del").css("opacity", "0.75");
    }
    function button_OnClick_Del_up(coding) {
        $(".form_Project__Head_Del").css("opacity", "0.25");
        OnClick_Del(coding);
    }

    function button_MultipleEditAdd_down() {
        $(".edit_Edit_Multiple_OptionButton_Add").css("background-color", "rgba(0, 154, 255, 0.5)");
    }
    function button_MultipleEditAdd_move() {
        $(".edit_Edit_Multiple_OptionButton_Add").css("background-color", "rgba(0, 154, 255, 0.75)");
    }
    function button_MultipleEditAdd_out() {
        $(".edit_Edit_Multiple_OptionButton_Add").css("background-color", "#009aff");
    }
    function button_MultipleEditAdd_up() {
        $(".edit_Edit_Multiple_OptionButton_Add").css("background-color", "#009aff");
        if (Edit.Option_Num == 25) { }
        else {
            Edit.Option_Num++;
            Edit.Option.push("");
            var options = document.getElementById("edit_Edit_Multiple_Options");
            var option_insert = document.createElement('div');
            option_insert.id = "edit_Edit_Multiple_Option_" + Edit.Option_Num;
            option_insert.classList = "edit_Edit_Multiple_Option";
            option_insert.innerHTML = "<label>选项" + GetOptionName(Edit.Option_Num) + ":</label><input id=\"" + option_insert.id + "_value\" type=\"text\" onblur=\"OnBlur_Multiple()\"/>";
            var option = document.getElementById("edit_Edit_Multiple_OptionButton");
            options.insertBefore(option_insert, option);

            var string = "";
            string += "<div id=\"form_Project_" + Edit.Coding + "_Multiple_title\" class=\"form_Project_Multiple_title\"><label>" + Edit.Title + "</label></div>";
            for (var i = 0; i < Edit.Option_Num; i++) {
                string += "<div id=\"form_Project_" + Edit.Coding + "_option_" + (i + 1) + "\" class=\"form_Project_Multiple_option\">";
                string += "<input type=\"checkbox\" disabled=\"disabled\" />";
                string += "<label id=\"form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label\">" + GetOptionName(i + 1) + ". " + Edit.Option[i] + "</label>";
                string += "</div>";
            }
            document.getElementById("form_Project_" + Edit.Coding + "_Multiple").innerHTML = string;

            document.getElementById("form_Project_" + Edit.Coding + "_Multiple_title").style.height = (60 + 17.5 * (GetStringLength(Edit.Title) - 1) / 60) + 'px';
            for (var i = 0; i < Edit.Option_Num; i++) {
                document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1)).style.height = (30 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
                document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label").style.height = (12 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
            }
        }
    }

    function button_MultipleEditDel_down() {
        $(".edit_Edit_Multiple_OptionButton_Del").css("background-color", "rgba(0, 154, 255, 0.5)");
    }
    function button_MultipleEditDel_move() {
        $(".edit_Edit_Multiple_OptionButton_Del").css("background-color", "rgba(0, 154, 255, 0.75)");
    }
    function button_MultipleEditDel_out() {
        $(".edit_Edit_Multiple_OptionButton_Del").css("background-color", "#009aff");
    }
    function button_MultipleEditDel_up() {
        $(".edit_Edit_Multiple_OptionButton_Del").css("background-color", "#009aff");

        if (Edit.Option_Num == 1) { }
        else {
            $("div").remove("#edit_Edit_Multiple_Option_" + Edit.Option_Num);
            Edit.Option_Num--;
            Edit.Option.splice(Edit.Option_Num, 1);
            $("div").remove("#form_Project_" + Edit.Coding + "_option_" + (Edit.Option_Num + 1));
            if (Edit.Option_Min > Edit.Option_Num) {
                Edit.Option_Min = Edit.Option_Num;
                document.getElementById("edit_Edit_Multiple_Num_Min_value").value = Edit.Option_Min;
            }
            if (Edit.Option_Max > Edit.Option_Num) {
                Edit.Option_Max = Edit.Option_Num;
                document.getElementById("edit_Edit_Multiple_Num_Max_value").value = Edit.Option_Max;
            }
        }
    }

    function button_SingleEditAdd_down() {
        $(".edit_Edit_Single_OptionButton_Add").css("background-color", "rgba(0, 154, 255, 0.5)");
    }
    function button_SingleEditAdd_move() {
        $(".edit_Edit_Single_OptionButton_Add").css("background-color", "rgba(0, 154, 255, 0.75)");
    }
    function button_SingleEditAdd_out() {
        $(".edit_Edit_Single_OptionButton_Add").css("background-color", "#009aff");
    }
    function button_SingleEditAdd_up() {
        $(".edit_Edit_Single_OptionButton_Add").css("background-color", "#009aff");
        if (Edit.Option_Num == 25) { }
        else {
            Edit.Option_Num++;
            Edit.Option.push("");
            var options = document.getElementById("edit_Edit_Single_Options");
            var option_insert = document.createElement('div');
            option_insert.id = "edit_Edit_Single_Option_" + Edit.Option_Num;
            option_insert.classList = "edit_Edit_Single_Option";
            option_insert.innerHTML = "<label>选项" + GetOptionName(Edit.Option_Num) + ":</label><input id=\"" + option_insert.id + "_value\" type=\"text\" onblur=\"OnBlur_Single()\"/>";
            var option = document.getElementById("edit_Edit_Single_OptionButton");
            options.insertBefore(option_insert, option);

            var string = "";
            string += "<div id=\"form_Project_" + Edit.Coding + "_Single_title\" class=\"form_Project_Single_title\"><label>" + Edit.Title + "</label></div>";
            for (var i = 0; i < Edit.Option_Num; i++) {
                string += "<div id=\"form_Project_" + Edit.Coding + "_option_" + (i + 1) + "\" class=\"form_Project_Single_option\">";
                string += "<input type=\"checkbox\" disabled=\"disabled\" />";
                string += "<label id=\"form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label\">" + GetOptionName(i + 1) + ". " + Edit.Option[i] + "</label>";
                string += "</div>";
            }
            document.getElementById("form_Project_" + Edit.Coding + "_Single").innerHTML = string;

            document.getElementById("form_Project_" + Edit.Coding + "_Single_title").style.height = (60 + 17.5 * (GetStringLength(Edit.Title) - 1) / 60) + 'px';
            for (var i = 0; i < Edit.Option_Num; i++) {
                document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1)).style.height = (30 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
                document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label").style.height = (12 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
            }
        }
    }

    function button_SingleEditDel_down() {
        $(".edit_Edit_Single_OptionButton_Del").css("background-color", "rgba(0, 154, 255, 0.5)");
    }
    function button_SingleEditDel_move() {
        $(".edit_Edit_Single_OptionButton_Del").css("background-color", "rgba(0, 154, 255, 0.75)");
    }
    function button_SingleEditDel_out() {
        $(".edit_Edit_Single_OptionButton_Del").css("background-color", "#009aff");
    }
    function button_SingleEditDel_up() {
        $(".edit_Edit_Single_OptionButton_Del").css("background-color", "#009aff");

        if (Edit.Option_Num == 1) { }
        else {
            $("div").remove("#edit_Edit_Single_Option_" + Edit.Option_Num);
            Edit.Option_Num--;
            Edit.Option.splice(Edit.Option_Num, 1);
            $("div").remove("#form_Project_" + Edit.Coding + "_option_" + (Edit.Option_Num + 1));
        }
    }

    function button_ButtonSave_down() {
        if (Edit == null) { }
        else {
            $(".edit_Buttom input").css("background-color", "rgba(0, 154, 255, 0.5)");
        }
    }
    function button_ButtonSave_move() {
        if (Edit == null) { }
        else {
            $(".edit_Buttom input").css("background-color", "rgba(0, 154, 255, 0.75)");
        }
    }
    function button_ButtonSave_out() {
        if (Edit == null) { }
        else {
            $(".edit_Buttom input").css("background-color", "#009aff");
        }
    }
    function button_ButtonSave_up() {
        if (Edit == null) { }
        else {
            $(".edit_Buttom input").css("background-color", "#009aff");
            var index = 0;
            for (var i = 1; i < Form.length; i++) {
                if (Form[i].Coding == Edit.Coding) {
                    index = i;
                    break;
                }
            }
            if (Form[index].Type == 1) {
                Form[index].Title = Edit.Title;
                Form[index].Option_Num = Edit.Option_Num;
                Form[index].Option_Max = Edit.Option_Max;
                Form[index].Option_Min = Edit.Option_Min;
                Form[index].Option = Edit.Option;
                for (var i = 0; i < Form[index].Option_Num; i++) {
                    if (Form[index].Option[i] == "") Form[index].Option[i] = "未填写";
                }
            }
            else if (Form[index].Type == 2) {
                Form[index].Title = Edit.Title;
                Form[index].Option_Num = Edit.Option_Num;
                Form[index].Option = Edit.Option;

                for (var i = 0; i < Form[index].Option_Num; i++) {
                    if (Form[index].Option[i] == "") Form[index].Option[i] = "未填写";
                }
            }
            else if (Form[index].Type == 3) {
                Form[index].Title = Edit.Title;
                Form[index].Text = Edit.Text;
            }
            else { }
            Edit = null;
            document.getElementById("edit_Edit").innerHTML = ToHTML_NoEdit();
            Form[index].EditStatus = false;
            HTML_Updata();
        }
    }

    function button_MultipleAdd_down() {
        $(".add_Project_Multiple").css("color", "rgba(0, 154, 255, 0.50)");
    }
    function button_MultipleAdd_move() {
        $(".add_Project_Multiple").css("color", "rgba(0, 154, 255, 0.7)");
    }
    function button_MultipleAdd_out() {
        $(".add_Project_Multiple").css("color", "#009aff");
    }
    function button_MultipleAdd_up() {
        if (MainTitle.EditStatus) {
            MainTitle.Title = document.getElementById("form_EditMainTitle_tile").value;
            MainTitle.Content = document.getElementById("form_EditMainTitle_content").value;
        }
        $(".add_Project_Multiple").css("color", "#009aff");
        var Multiple = new Info_Multiple();
        Multiple.Coding = Form[Form.length - 1].Coding + 1;
        Multiple.No = Form.length;
        Form.push(Multiple);
        HTML_Updata();
        AddTimeEdit();
    }

    function button_SingleAdd_down() {
        $(".add_Project_Single").css("color", "rgba(0, 154, 255, 0.50)");
    }
    function button_SingleAdd_move() {
        $(".add_Project_Single").css("color", "rgba(0, 154, 255, 0.7)");
    }
    function button_SingleAdd_out() {
        $(".add_Project_Single").css("color", "#009aff");
    }
    function button_SingleAdd_up() {
        if (MainTitle.EditStatus) {
            MainTitle.Title = document.getElementById("form_EditMainTitle_tile").value;
            MainTitle.Content = document.getElementById("form_EditMainTitle_content").value;
        }
        $(".add_Project_Single").css("color", "#009aff");
        var Single = new Info_Single();
        Single.Coding = Form[Form.length - 1].Coding + 1;
        Single.No = Form.length;
        Form.push(Single);
        HTML_Updata();
        AddTimeEdit();
    }

    function button_TextAdd_down() {
        $(".add_Project_Text").css("color", "rgba(0, 154, 255, 0.50)");
    }
    function button_TextAdd_move() {
        $(".add_Project_Text").css("color", "rgba(0, 154, 255, 0.7)");
    }
    function button_TextAdd_out() {
        $(".add_Project_Text").css("color", "#009aff");
    }
    function button_TextAdd_up() {
        if (MainTitle.EditStatus) {
            MainTitle.Title = document.getElementById("form_EditMainTitle_tile").value;
            MainTitle.Content = document.getElementById("form_EditMainTitle_content").value;
        }
        $(".add_Project_Text").css("color", "#009aff");
        var Text = new Info_Text();
        Text.Coding = Form[Form.length - 1].Coding + 1;
        Text.No = Form.length;
        Form.push(Text);
        HTML_Updata();
        AddTimeEdit();
}

    function AddTimeEdit_Multiple() {
        document.getElementById("form_Project_" + Edit.Coding + "_Head_Type").innerHTML = Edit.No + ": 多选项" + GetMultipleNumString(Edit);
        var string = "";
        string += "<div id=\"form_Project_" + Edit.Coding + "_Multiple_title\" class=\"form_Project_Multiple_title\"><label>" + Edit.Title + "</label></div>";
        for (var i = 0; i < Edit.Option_Num; i++) {
            string += "<div id=\"form_Project_" + Edit.Coding + "_option_" + (i + 1) + "\" class=\"form_Project_Multiple_option\">";
            string += "<input type=\"checkbox\" disabled=\"disabled\" />";
            string += "<label id=\"form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label\">" + GetOptionName(i + 1) + ". " + Edit.Option[i] + "</label>";
            string += "</div>";
        }
        document.getElementById("form_Project_" + Edit.Coding + "_Multiple").innerHTML = string;

        document.getElementById("form_Project_" + Edit.Coding + "_Multiple_title").style.height = (60 + 17.5 * (GetStringLength(Edit.Title) - 1) / 60) + 'px';
        for (var i = 0; i < Edit.Option_Num; i++) {
            document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1)).style.height = (30 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
            document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label").style.height = (12 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
        }
}
    function AddTimeEdit_Single() {
        var string = "";
        string += "<div id=\"form_Project_" + Edit.Coding + "_Single_title\" class=\"form_Project_Single_title\"><label>" + Edit.Title + "</label></div>";
        for (var i = 0; i < Edit.Option_Num; i++) {
            string += "<div id=\"form_Project_" + Edit.Coding + "_option_" + (i + 1) + "\" class=\"form_Project_Single_option\">";
            string += "<input type=\"checkbox\" disabled=\"disabled\" />";
            string += "<label id=\"form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label\">" + GetOptionName(i + 1) + ". " + Edit.Option[i] + "</label>";
            string += "</div>";
        }
        document.getElementById("form_Project_" + Edit.Coding + "_Single").innerHTML = string;

        document.getElementById("form_Project_" + Edit.Coding + "_Single_title").style.height = (60 + 17.5 * (GetStringLength(Edit.Title) - 1) / 60) + 'px';
        for (var i = 0; i < Edit.Option_Num; i++) {
           document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1)).style.height = (30 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
           document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label").style.height = (12 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
        }
}
    function AddTimeEdit_Text() {
        document.getElementById("form_Project_" + Edit.Coding + "_Text_title").innerHTML = "<label>" + Edit.Title + "</label>";
        document.getElementById("form_Project_" + Edit.Coding + "_Text_text").innerHTML = Edit.Text;
        document.getElementById("form_Project_" + Edit.Coding + "_Text_title").style.height = (60 + 17.5 * (GetStringLength(Edit.Title) - 1) / 60) + 'px';
    }
    function AddTimeEdit() {
        if (Edit == null) { }
        else {
            if (Edit.Type == 1) AddTimeEdit_Multiple();
            else if (Edit.Type == 2) AddTimeEdit_Single();
            else if (Edit.Type == 3) AddTimeEdit_Text();
            else {}
        }
    }

    function button_add_Heading_Button_down() {
    $(".add_Heading_Button input").css("background-color", "rgba(0, 154, 255, 0.35)");
}
    function button_add_Heading_Button_move() {
    $(".add_Heading_Button input").css("background-color", "rgba(0, 154, 255, 0.75)");
}
    function button_add_Heading_Button_out() {
    $(".add_Heading_Button input").css("background-color", "rgba(0, 154, 255, 1)");
}
    function button_add_Heading_Button_up() {
    $(".add_Heading_Button input").css("background-color", "rgba(0, 154, 255, 1)");
        if (Project_OwnKeys) { }
        else {
            Get_KeyAndPass();
        }
}
    function Get_KeyAndPass() {
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
    var callFunction = "GetData_KeyAndPass";
    var callArgs = "";
    var contract = {
        "function": callFunction,
        "args": callArgs
        }
        document.getElementById("add_Heading_KeyInfo_Value").innerHTML = "正在获取..."
        document.getElementById("add_Heading_Password_Value").innerHTML = "正在获取...";
    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        Get_KeyAndPass_Then(resp);
    });
}
    function Get_KeyAndPass_Then(resp) {
    document.getElementById("add_Heading_Password_Value").innerHTML = "";
    var result = resp.result;
    if (result == "") {
        document.getElementById("add_Heading_KeyInfo_Value").innerHTML = "错误:调用合约失败";
    }
    else {
        try {
            result = JSON.parse(result)
        } catch (err) {
            document.getElementById("add_Heading_KeyInfo_Value").innerHTML = "JSON错误:" + err;
        }
        if (result.Key) {
            Project_Key = result.Key;
            Project_Pass = result.Pass;
            Project_OwnKeys = true;
            document.getElementById("add_Heading_KeyInfo_Value").innerHTML = Project_Key;
            document.getElementById("add_Heading_Password_Value").innerHTML = Project_Pass;
        }
        else {
            document.getElementById("add_Heading_KeyInfo_Value").innerHTML = "错误:" + result;
        }
    }
}

    function OnBlur_MainTitle() {
    if (MainTitle.EditStatus) {
        MainTitle.Title = document.getElementById("form_EditMainTitle_tile").value;
        MainTitle.Content = document.getElementById("form_EditMainTitle_content").value;
    }
}
    function OnBlur_Multiple() {
        Edit.Title = document.getElementById("edit_Edit_Title").value;
        for (var i = 0; i < Edit.Option_Num; i++) {
            Edit.Option[i] = document.getElementById("edit_Edit_Multiple_Option_" + (i + 1) + "_value").value;
        }

        document.getElementById("form_Project_" + Edit.Coding + "_Multiple_title").innerHTML = "<label>" + Edit.Title + "</label>";
        document.getElementById("form_Project_" + Edit.Coding + "_Multiple_title").style.height = (60 + 17.5 * (GetStringLength(Edit.Title) - 1) / 60) + 'px';

        for (var i = 0; i < Edit.Option_Num; i++) {
            document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1)).style.height = (30 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
            document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label").innerHTML = GetOptionName(i + 1) + ". " + Edit.Option[i];
            document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label").style.height = (12 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
        }

    }
    function OnBlur_Single() {
        Edit.Title = document.getElementById("edit_Edit_Title").value;
        for (var i = 0; i < Edit.Option_Num; i++) {
            Edit.Option[i] = document.getElementById("edit_Edit_Single_Option_" + (i + 1) + "_value").value;
        }

        document.getElementById("form_Project_" + Edit.Coding + "_Single_title").innerHTML = "<label>" + Edit.Title + "</label>";
        document.getElementById("form_Project_" + Edit.Coding + "_Single_title").style.height = (60 + 17.5 * (GetStringLength(Edit.Title) - 1) / 60) + 'px';

        for (var i = 0; i < Edit.Option_Num; i++) {
            document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1)).style.height = (30 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
            document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label").innerHTML = GetOptionName(i + 1) + ". " + Edit.Option[i];
            document.getElementById("form_Project_" + Edit.Coding + "_option_" + (i + 1) + "_label").style.height = (12 + 12 * (GetStringLength(Edit.Option[i]) - 1) / 58) + 'px';
        }
    }
    function OnBlur_Text() {
        Edit.Title = document.getElementById("edit_Edit_Title").value;
        Edit.Text = document.getElementById("edit_Edit_Text").value;
        document.getElementById("form_Project_" + Edit.Coding + "_Text_title").innerHTML = "<label>" + Edit.Title + "</label>";
        document.getElementById("form_Project_" + Edit.Coding + "_Text_text").innerHTML = Edit.Text;
        document.getElementById("form_Project_" + Edit.Coding + "_Text_title").style.height = (60 + 17.5 * (GetStringLength(Edit.Title) - 1) / 60) + 'px';
}



    function button_Top_Back_down() {
        $(".top_back").css("opacity", "0.25");
    }
    function button_Top_Back_move() {
        $(".top_back").css("opacity", "0.6");
    }
    function button_Top_Back_out() {
        $(".top_back").css("opacity", "0.85");
    }
    function button_Top_Back_up() {
        $(".top_back").css("opacity", "0.85");
        if (EditStatus) {
            var string = "";
            string += "<div class=\"back_preview_pane\">";
            string += "<div class=\"back_preview_pane_Head\"></div>";
            string += "<div class=\"back_preview_pane_mess\"><label>项目尚未保存,是否退出</label></div>";
            string += "<div class=\"back_preview_pane_BackYes\"><input value=\"确定\" type=\"button\" onmousedown=\"button_Top_BackYes_down()\" onmousemove=\"button_Top_BackYes_move()\" onmouseout=\"button_Top_BackYes_out()\" onmouseup=\"button_Top_BackYes_up()\"/></div>";
            string += "<div class=\"back_preview_pane_BackNo\"><input value=\"取消\" type=\"button\" onmousedown=\"button_Top_BackNo_down()\" onmousemove=\"button_Top_BackNo_move()\" onmouseout=\"button_Top_BackNo_out()\" onmouseup=\"button_Top_BackNo_up()\"/></div>";
            string += "</div>";

            $("#back_preview").addClass("back_preview");
            document.getElementById("back_preview").innerHTML = string;
        }
        else {
            window.location.href = "dapp_house.html";
        }
    }

    function button_Top_BackYes_down() {
        $(".back_preview_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.35)");
    }
    function button_Top_BackYes_move() {
        $(".back_preview_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.6)");
    }
    function button_Top_BackYes_out() {
        $(".back_preview_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
    }
    function button_Top_BackYes_up() {
        $(".back_preview_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
        window.location.href = "dapp_house.html";
    }
    function button_Top_BackNo_down() {
        $(".back_preview_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.35)");
    }
    function button_Top_BackNo_move() {
        $(".back_preview_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.6)");
    }
    function button_Top_BackNo_out() {
        $(".back_preview_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");
    }
    function button_Top_BackNo_up() {
        $(".back_preview_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");

        $("#back_preview").removeClass("back_preview");
        document.getElementById("back_preview").innerHTML = "";
    }

    function button_Top_Preview_down() {
        if (Preview) {
            $(".top_preview_true").css("opacity", "0.25");
        }
        else {
            $(".top_preview").css("opacity", "0.25");
        }
    }
    function button_Top_Preview_move() {
        if (Preview) {
            $(".top_preview_true").css("opacity", "0.6");
        }
        else {
            $(".top_preview").css("opacity", "0.6");
        }
    }
    function button_Top_Preview_out() {
        if (Preview) {
            $(".top_preview_true").css("opacity", "0.85");
        }
        else {
            $(".top_preview").css("opacity", "0.85");
        }
    }
    function button_Top_Preview_up() {
        if (EditStatus) {
            if (Preview) {
                $(".top_preview_true").css("opacity", "0.85");
                Preview = false;
                $("#top_preview").removeClass("top_preview_true");
                $("#top_preview").addClass("top_preview");

                $("#preview").removeClass("preview");
                $("div").remove("#Pre_form");
                Pre_Form = new Array();
            }
            else {
                $(".top_preview").css("opacity", "0.85");
                Preview = true;
                $("#top_preview").removeClass("top_preview");
                $("#top_preview").addClass("top_preview_true");

                $("#preview").addClass("preview");
                document.getElementById("preview").innerHTML = "<div id=\"Pre_form\" class=\"Pre_form\"></div>";
                FormToPre(Form, Pre_Form);
                HTML_Presentation_Updata_Preview();
            }
        }
        else {
            if (Preview) {
                $(".top_preview_true").css("opacity", "0.85");
            }
            else {
                $(".top_preview").css("opacity", "0.85");
            }
        }
    }

    function button_Top_Upload_down() {
        $(".top_upload").css("opacity", "0.25");
    }
    function button_Top_Upload_move() {
        $(".top_upload").css("opacity", "0.6");
    }
    function button_Top_Upload_out() {
        $(".top_upload").css("opacity", "0.85");
    }
    function button_Top_Upload_up() {
        $(".top_upload").css("opacity", "0.85");
        if (EditStatus) {
            var string = "";
            string += "<div id=\"Form_Upload_pane\" class=\"Form_Upload_pane\">";
            string += "<div class=\"Form_Upload_pane_Head\"></div>";
            string += "<div  class=\"Form_Upload_pane_mess\"><label id=\"Form_Upload_pane_mess\">是否要提交项目?</label></div>";
            string += "<div id=\"Form_Upload_pane_BackYes\" class=\"Form_Upload_pane_BackYes\"><input value=\"确定\" type=\"button\" onmousedown=\"button_Form_UploadYes_down()\" onmousemove=\"button_Form_UploadYes_move()\" onmouseout=\"button_Form_UploadYes_out()\" onmouseup=\"button_Form_UploadYes_up()\"/></div>";
            string += "<div id=\"Form_Upload_pane_BackNo\" class=\"Form_Upload_pane_BackNo\"><input value=\"取消\" type=\"button\" onmousedown=\"button_Form_UploadNo_down()\" onmousemove=\"button_Form_UploadNo_move()\" onmouseout=\"button_Form_UploadNo_out()\" onmouseup=\"button_Form_UploadNo_up()\"/></div>";
            string += "</div>";

            $("#Form_Upload").addClass("Form_Upload");
            document.getElementById("Form_Upload").innerHTML = string;
        }
}
    function button_Form_UploadYes_down() {
    $(".Form_Upload_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
    function button_Form_UploadYes_move() {
    $(".Form_Upload_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
    function button_Form_UploadYes_out() {
    $(".Form_Upload_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
    function button_Form_UploadYes_up() {
        $(".Form_Upload_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("div").remove("#Form_Upload_pane_BackYes");
        $("div").remove("#Form_Upload_pane_BackNo");

        if (Project_OwnKeys) {
            WalletUsed = true;
            document.getElementById("Form_Upload_pane_mess").innerHTML = "开始提交项目<br><br>我们会申请调用你的钱包插件";
            document.getElementById("Form_Upload_pane").innerHTML += "<div id=\"Form_Upload_pane_Back\" class=\"Form_Upload_pane_Back\"><input value=\"返回\" type=\"button\" onmousedown=\"button_Form_UploadBack_down()\" onmousemove=\"button_Form_UploadBack_move()\" onmouseout=\"button_Form_UploadBack_out()\" onmouseup=\"button_Form_UploadBack_Plus_1_up()\"/></div>";

            var dappAddress = DappAddress;
            var nebulas = require("nebulas"),
                Account = nebulas.Account,
                neb = new nebulas.Neb();
            neb.setRequest(new nebulas.HttpRequest(DappNetwork));
            var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
            var nebPay = new NebPay();
            var SerialNumber;
            var Query;//间隔查询

            var StorageData_Save = function () {
                this.Key = null;
                this.Pass = null;
                this.Form = null;
            }
            var StorageData = new StorageData_Save();
            StorageData.Key = Project_Key;
            StorageData.Pass = Project_Pass;
            StorageData.Form = Form;

            var to = dappAddress;
            var value = "0";
            var callFunction = "UploadData_Save"
            var callArgs = "[" + JSON.stringify(StorageData) + "]";

            SerialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
                listener: button_Form_UploadYes_up_Listener//设置listener, 处理交易返回信息
            });
            Query = setInterval(function () { button_Form_UploadYes_up_Query(Query, SerialNumber); }, 5000);

            function button_Form_UploadYes_up_Query() {
                nebPay.queryPayInfo(SerialNumber).then(function (resp) {
                    if (WalletUsed) {
                        var respObject = JSON.parse(resp)
                        if (respObject.code === 0) {
                            WalletUsed = false;
                            document.getElementById("Form_Upload_pane_mess").innerHTML = "<div class=\"None_Select\">上传数据成功 , 请妥善保管以下信息<br>稍后你可以使用它数据进行操作</div><br>项目编号 : " + Project_Key + "<br>项目密钥 : " + Project_Pass;
                            document.getElementById("Form_Upload_pane").innerHTML += "<div id=\"Form_Upload_pane_Back\" class=\"Form_Upload_pane_Back\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Form_UploadBack_down()\" onmousemove=\"button_Form_UploadBack_move()\" onmouseout=\"button_Form_UploadBack_out()\" onmouseup=\"button_Form_UploadBack_Plus_2_up()\"/></div>";
                            EditStatus = false;
                            clearInterval(Query);
                        }
                    }
                    else {
                        clearInterval(Query);
                        $("#Form_Upload").removeClass("Form_Upload");
                        document.getElementById("Form_Upload").innerHTML = "";
                    }
                    
                }).catch(function (err) {
                    document.getElementById("Form_Upload_pane").innerHTML += "<div id=\"Form_Upload_pane_Back\" class=\"Form_Upload_pane_Back\"><input value=\"退出\" type=\"button\" onmousedown=\"button_Form_UploadBack_down()\" onmousemove=\"button_Form_UploadBack_move()\" onmouseout=\"button_Form_UploadBack_out()\" onmouseup=\"button_Form_UploadBack_Plus_2_up()\"/></div>";
                    document.getElementById("Form_Upload_pane_mess").innerHTML = "我们似乎遇到了一些错误<br><br>你可以重新保存";
                });
            }
            function button_Form_UploadYes_up_Listener() {
                $("div").remove("#Form_Upload_pane_Back");
                document.getElementById("Form_Upload_pane_mess").innerHTML = "正在保存项目<br><br>请稍后";
            }
        }
        else {
            document.getElementById("Form_Upload_pane_mess").innerHTML = "检测到你没有项目密匙<br><br>请返回获取对应信息";
            document.getElementById("Form_Upload_pane").innerHTML += "<div id=\"Form_Upload_pane_Back\" class=\"Form_Upload_pane_Back\"><input value=\"确定\" type=\"button\" onmousedown=\"button_Form_UploadBack_down()\" onmousemove=\"button_Form_UploadBack_move()\" onmouseout=\"button_Form_UploadBack_out()\" onmouseup=\"button_Form_UploadBack_up()\"/></div>";
        }
}
    function button_Form_UploadNo_down() {
    $(".Form_Upload_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
    function button_Form_UploadNo_move() {
    $(".Form_Upload_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
    function button_Form_UploadNo_out() {
    $(".Form_Upload_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
    function button_Form_UploadNo_up() {
    $(".Form_Upload_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("#Form_Upload").removeClass("Form_Upload");
    document.getElementById("Form_Upload").innerHTML = "";
}
    function button_Form_UploadBack_down() {
    $(".Form_Upload_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
    function button_Form_UploadBack_move() {
    $(".Form_Upload_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
    function button_Form_UploadBack_out() {
    $(".Form_Upload_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
    function button_Form_UploadBack_up() {
    $(".Form_Upload_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("#Form_Upload").removeClass("Form_Upload");
    document.getElementById("Form_Upload").innerHTML = "";
}
    function button_Form_UploadBack_Plus_1_up() {
    $(".Form_Upload_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");

    WalletUsed = false;
        document.getElementById("Form_Upload_pane_mess").innerHTML = "<br><br>正在退出,请稍后"
        $("div").remove("#Form_Upload_pane_Back");
}
    function button_Form_UploadBack_Plus_2_up() {
    $(".Form_Upload_pane_Back input").css("background-color", " rgba(255, 106, 0, 0.8)");
    window.location.href = "dapp_house.html";
}

    function button_Top_Help_down() {
        $(".top_help").css("opacity", "0.25");
    }
    function button_Top_Help_move() {
        $(".top_help").css("opacity", "0.5");
    }
    function button_Top_Help_out() {
        $(".top_help").css("opacity", "0.75");
    }
    function button_Top_Help_up() {
        $(".top_help").css("opacity", "0.75");
        window.open("dapp_help.html");
    }



    function button_edit_mu_min_add_down() {
        $(".edit_Edit_Multiple_Num_Min_add").css("opacity", "0.25");
    }
    function button_edit_mu_min_add_move() {
        $(".edit_Edit_Multiple_Num_Min_add").css("opacity", "0.5");
    }
    function button_edit_mu_min_add_out() {
        $(".edit_Edit_Multiple_Num_Min_add").css("opacity", "0.75");
    }
    function button_edit_mu_min_add_up() {
        $(".edit_Edit_Multiple_Num_Min_add").css("opacity", "0.75");
        if (Edit.Option_Max == 0) {
            if (Edit.Option_Min == Edit.Option_Num) { }
            else {
                Edit.Option_Min++;
                document.getElementById("edit_Edit_Multiple_Num_Min_value").value = Edit.Option_Min;
            }
        }
        else {
            if (Edit.Option_Min == Edit.Option_Max) { }
            else {
                Edit.Option_Min++;
                document.getElementById("edit_Edit_Multiple_Num_Min_value").value = Edit.Option_Min;
            }
        }
        document.getElementById("form_Project_" + Edit.Coding + "_Head_Type").innerHTML = Edit.No + ": 多选项" + GetMultipleNumString(Edit);
    }

    function button_edit_mu_min_del_down() {
        $(".edit_Edit_Multiple_Num_Min_del").css("opacity", "0.25");
    }
    function button_edit_mu_min_del_move() {
        $(".edit_Edit_Multiple_Num_Min_del").css("opacity", "0.5");
    }
    function button_edit_mu_min_del_out() {
        $(".edit_Edit_Multiple_Num_Min_del").css("opacity", "0.75");
    }
    function button_edit_mu_min_del_up() {
        $(".edit_Edit_Multiple_Num_Min_del").css("opacity", "0.75");
        if (Edit.Option_Min == 0) { }
        else {
            Edit.Option_Min--;
            document.getElementById("edit_Edit_Multiple_Num_Min_value").value = Edit.Option_Min;
        }
        document.getElementById("form_Project_" + Edit.Coding + "_Head_Type").innerHTML = Edit.No + ": 多选项" + GetMultipleNumString(Edit);
    }

    function button_edit_mu_max_add_down() {
        $(".edit_Edit_Multiple_Num_Max_add").css("opacity", "0.25");
    }
    function button_edit_mu_max_add_move() {
        $(".edit_Edit_Multiple_Num_Max_add").css("opacity", "0.5");
    }
    function button_edit_mu_max_add_out() {
        $(".edit_Edit_Multiple_Num_Max_add").css("opacity", "0.75");
    }
    function button_edit_mu_max_add_up() {
        $(".edit_Edit_Multiple_Num_Max_add").css("opacity", "0.75");

        if (Edit.Option_Max == 0) {
            if (Edit.Option_Min == 0) {
                Edit.Option_Max++;
                document.getElementById("edit_Edit_Multiple_Num_Max_value").value = Edit.Option_Max;
            }
            else {
                Edit.Option_Max = Edit.Option_Min;
                document.getElementById("edit_Edit_Multiple_Num_Max_value").value = Edit.Option_Max;
            }
        }
        else {
            if (Edit.Option_Max == Edit.Option_Num) { }
            else {
                Edit.Option_Max++;
                document.getElementById("edit_Edit_Multiple_Num_Max_value").value = Edit.Option_Max
            }
        }
        document.getElementById("form_Project_" + Edit.Coding + "_Head_Type").innerHTML = Edit.No + ": 多选项" + GetMultipleNumString(Edit);
    }

    function button_edit_mu_max_del_down() {
        $(".edit_Edit_Multiple_Num_Max_del").css("opacity", "0.25");
    }
    function button_edit_mu_max_del_move() {
        $(".edit_Edit_Multiple_Num_Max_del").css("opacity", "0.5");
    }
    function button_edit_mu_max_del_out() {
        $(".edit_Edit_Multiple_Num_Max_del").css("opacity", "0.75");
    }
    function button_edit_mu_max_del_up() {
        $(".edit_Edit_Multiple_Num_Max_del").css("opacity", "0.75");

        if (Edit.Option_Max == 0) { }
        else if (Edit.Option_Max == Edit.Option_Min) {
            Edit.Option_Min--;
            Edit.Option_Max--;
            document.getElementById("edit_Edit_Multiple_Num_Min_value").value = Edit.Option_Min;
            document.getElementById("edit_Edit_Multiple_Num_Max_value").value = Edit.Option_Max;
        }
        else {
            Edit.Option_Max--;
            document.getElementById("edit_Edit_Multiple_Num_Max_value").value = Edit.Option_Max;
        }
        document.getElementById("form_Project_" + Edit.Coding + "_Head_Type").innerHTML = Edit.No + ": 多选项" + GetMultipleNumString(Edit);
    }

    function button_Restore_Remind_Type2_dowm() {
        $(".Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.35)");
    }
    function button_Restore_Remind_Type2_move() {
        $(".Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.6)");
    }
    function button_Restore_Remind_Type2_out() {
        $(".Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.8)");
    }
    function button_Restore_Remind_Type2_up() {
        $(".Remind_pane_Button input").css("background-color", " rgba(255, 106, 0, 0.8)");
        window.location.href = "dapp_house.html";
}

function button_Top_Language_down() {
    $(".top_Language").css("opacity", "0.35");
}
function button_Top_Language_move() {
    $(".top_Language").css("opacity", "0.75");
}
function button_Top_Language_out() {
    $(".top_Language").css("opacity", "1");
}
function button_Top_Language_up() {
    $(".op_Language").css("opacity", "1");

    var string = "";
    string += "<div class=\"Language_preview_pane\">";
    string += "<div class=\"Language_preview_pane_Head\"></div>";
    string += "<div class=\"Language_preview_pane_mess\"><label>切换语言会重置项目,是否切换?</label></div>";
    string += "<div class=\"Language_preview_pane_BackYes\"><input value=\"确定\" type=\"button\" onmousedown=\"button_Language_Top_BackYes_down()\" onmousemove=\"button_Language_Top_BackYes_move()\" onmouseout=\"button_Language_Top_BackYes_out()\" onmouseup=\"button_Language_Top_BackYes_up()\"/></div>";
    string += "<div class=\"Language_preview_pane_BackNo\"><input value=\"取消\" type=\"button\" onmousedown=\"button_Language_Top_BackNo_down()\" onmousemove=\"button_Language_Top_BackNo_move()\" onmouseout=\"button_Language_Top_BackNo_out()\" onmouseup=\"button_Language_Top_BackNo_up()\"/></div>";
    string += "</div>";

    $("#Language_preview").addClass("Language_preview");
    document.getElementById("Language_preview").innerHTML = string;
}


function button_Language_Top_BackYes_down() {
    $(".Language_preview_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Language_Top_BackYes_move() {
    $(".Language_preview_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Language_Top_BackYes_out() {
    $(".Language_preview_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Language_Top_BackYes_up() {
    $(".Language_preview_pane_BackYes input").css("background-color", " rgba(255, 106, 0, 0.8)");
    var url = window.location.href;
    var new_url = url.replace("la_cn", "la_us");
    window.location.href = new_url;
}
function button_Language_Top_BackNo_down() {
    $(".Language_preview_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.35)");
}
function button_Language_Top_BackNo_move() {
    $(".Language_preview_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.6)");
}
function button_Language_Top_BackNo_out() {
    $(".Language_preview_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");
}
function button_Language_Top_BackNo_up() {
    $(".Language_preview_pane_BackNo input").css("background-color", " rgba(255, 106, 0, 0.8)");

    $("#Language_preview").removeClass("Language_preview");
    document.getElementById("Language_preview").innerHTML = "";
}
