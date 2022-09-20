let ajaxReturnData;
const getTwoDigits = (value) => value < 10 ? `0${value}` : value;
let active = sessionStorage.getItem("active_staff");
const myAjax = {
    myAjax: function (fileName, sendData) {
      $.ajax({
        type: "POST",
        url: "./php/"+fileName,
        dataType: "json",
        data: sendData,
        async: false,
      })
        .done(function (data) {
          ajaxReturnData = data;
        })
        .fail(function () {
          alert("DB connect error");
        });
    },
};
$(function() {
    inputSession();
    machine();
    var now = new Date();
    var MonthLastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    var MonthFirstDate = new Date(now.getFullYear(), (now.getMonth() + 12) % 12, 1);
    var formatDateComponent = function(dateComponent) {
      return (dateComponent < 10 ? '0' : '') + dateComponent;
    };
    var formatDate = function(date) {
      return date.getFullYear()  + '-' + formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate()) ;
    };
    var a = formatDate(MonthFirstDate);
    var b = formatDate(MonthLastDate);
    $("#std").val(a);
    $("#end").val(b);
    renderHead($('div#table'), new Date($("#std").val()), new Date($("#end").val()));
});
$(document).on("click", "#log_out", function() {
    $('#active_staff').html('');
    clearSession();
});
function clearSession() {
    sessionStorage.clear();
    inputSession();
};
function inputSession() {
    if (sessionStorage.active_staff ==null) {
        let staff_code = prompt("Please enter your Emp No:", "");
        var fileName = "SearchStaff.php";
        var sendData = {
            staff_code: staff_code,
        };
        myAjax.myAjax(fileName, sendData);
        if (ajaxReturnData.length !=0){
            sessionStorage.setItem("active_staff", JSON.stringify(ajaxReturnData));
            active = sessionStorage.getItem("active_staff");
            alert(JSON.parse(active)[0].staff_name + " is activating!");
        } else {
            alert("Your Emp No dose not exist!");
            inputSession();
        }
    }
    $('#active_staff').html(JSON.parse(active)[0].staff_name);
};
function machine() {
    var fileName = "SelMachine.php";
    var sendData = {
        line_id: JSON.parse(active)[0].line_id
    };
    myAjax.myAjax(fileName, sendData);
    $("#machine_select option").remove();
    $("#machine_select").append($("<option>").val(0).html("NO select"));
    ajaxReturnData.forEach(function(value) {
        $("#machine_select").append(
            $("<option>").val(value["id"]).html(value["machine"])
        );
    });
};
function list_check() {
    var fileName = "SelListCheck.php";
    var sendData = {
        machine_id : $("#machine_select").val(),
    };
    myAjax.myAjax(fileName, sendData);
    $("#list_check_select option").remove();
    $("#list_check_select").append($("<option>").val(0).html("NO select"));
    ajaxReturnData.forEach(function(value) {
        $("#list_check_select").append(
            $("<option>").val(value["id"]).html(value["list_check"])
        );
    });
};
function makeSummaryTable() {
    var fileName = "SelSummary.php";
    var sendObj = new Object();

    sendObj["start_s"] = $('#std').val();
    sendObj["end_s"] = $("#end").val();
    sendObj["list_check_id"] = $("#list_check_select").val();
    myAjax.myAjax(fileName, sendObj);

    $("#summary__table tbody").empty();
    ajaxReturnData.forEach(function(trVal) {
        var newTr = $("<tr>");
        Object.keys(trVal).forEach(function(tdVal) {
            $("<td>").html(trVal[tdVal]).appendTo(newTr);
        });
        $(newTr).appendTo("#summary__table tbody");
    });
};
$(document).on("change", "#machine_select", function() {
    if ($(this).val() == 0) {
        $(this).removeClass("complete-input").addClass("no-input");
        $("#list_check_select option").remove();
        $("#list_check_select").removeClass("complete-input").addClass("no-input");
        $("#content tbody").empty();
    } else {
        $(this).removeClass("no-input").addClass("complete-input");
        $("#list_check_select").removeClass("complete-input").addClass("no-input");
        $("#content tbody").empty();
        list_check();
    }
});
$(document).on("change", "#list_check_select", function() {
    if ($(this).val() == 0) {
        $(this).removeClass("complete-input").addClass("no-input");
        $("#content tbody").empty();
    } else {
        $(this).removeClass("no-input").addClass("complete-input");
        makeSummaryTable();
    }
});
$(document).on("change", "#std", function() {
    renderHead($('div#table'), new Date($("#std").val()), new Date($("#end").val()));
    makeSummaryTable();
});
$(document).on("change", "#end", function() {
    renderHead($('div#table'), new Date($("#std").val()), new Date($("#end").val()));
    makeSummaryTable();
});

var weekday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

function renderHead(div, start, end) {
    var c_year = start.getFullYear();
    var r_year = "<tr> <th rowspan='4' style ='width: 100px;'>Content</th> <th rowspan='4' style ='width: 150px;'>Description</th> <th rowspan='4' style ='width: 50px;'>Type</th>";
    var r_year1 = "<tr style='display:none;'><th style='display:none;'></th><th style='display:none;'></th>";
    var daysInYear = 0;

    var c_month = start.getMonth();
    var r_month = "<tr>";
    var r_month1 = "<tr style='display:none;'><th style='display:none;'></th><th style='display:none;'></th>";
    var daysInMonth = 0;

    var r_days = "<tr><th style='display:none;'></th><th style='display:none;'></th><th style='display:none;'></th>";
    var r_days2 = "<tr><th style='display:none;'></th><th style='display:none;'></th><th style='display:none;'></th>";
    for (start; start <= end; start.setDate(start.getDate() + 1)) {
        if (start.getFullYear() !== c_year) {
            r_year += '<th colspan="' + daysInYear + '">' + c_year + '</th>';
            c_year = start.getFullYear();
            daysInYear = 0;
        }
        daysInYear++;
        if (start.getMonth() !== c_month) {
            r_month += '<th colspan="' + daysInMonth + '">' + months[c_month] + '</th>';
            // r_month1 += '<th>' + months[c_month] + '</th>';
            c_month = start.getMonth();
            daysInMonth = 0;
        }
        daysInMonth++;

        r_days += '<th>' + start.getDate() + '</th>';
        r_days2 += '<th>' + weekday[start.getDay()] + '</th>';
        r_month1 += '<th>' + months[c_month] + '</th>';
        r_year1 += '<th>' + c_year + '</th>';
    }
    r_days += "</tr>";
    r_days2 += "</tr>";
    r_year += '<th colspan="' + (daysInYear) + '">' + c_year + '</th>';
    r_year1 += '<th>' + c_year + '</th>';
    r_year += "</tr>";
    r_year1 += "</tr>";
    r_month += '<th colspan="' + (daysInMonth) + '">' + months[c_month] + '</th>';
    r_month1 += '<th>' + months[c_month] + '</th>';
    r_month += "</tr>";
    r_month1 += "</tr>";
    table = "<table id='summary__table'> <thead>" + r_year + r_year1 + r_month + r_month1 + r_days + "</thead> <tbody> </tbody> </table>";

    div.html(table);
};