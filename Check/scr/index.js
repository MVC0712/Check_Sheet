var ajaxReturnData;
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
    // machine();
    var formatDateComponent = function(dateComponent) {
        return (dateComponent < 10 ? '0' : '') + dateComponent;
      };
    
      var formatDate = function(date) {
        return date.getFullYear()  + '-' + formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate()) ;
      };
    $("#check_date").val(formatDate(new Date()));
    makeSummaryTable();
});
$(document).on("click", "#log_out", function() {
    $('#active_staff').html('');
    clearSession();
});
function clearSession() {
    sessionStorage.clear();
    inputSession();
    makeSummaryTable();
};
function inputSession() {
    if (sessionStorage.active_staff ==null) {
        let staff_code = prompt("Please enter your Emp No:", "");
        if (staff_code === null) {
            $('#log_out').html("Login!");
            $("#machine_select option").remove();
            $("#machine_select").append($("<option>").val(0).html("NO select")).removeClass("complete-input").addClass("no-input");
            $("#list_check_select option").remove();
            $("#list_check_select").append($("<option>").val(0).html("NO select")).removeClass("complete-input").addClass("no-input");
            return;
        }
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
    $("#machine_select option").remove();
    $("#machine_select").append($("<option>").val(0).html("NO select")).removeClass("complete-input").addClass("no-input");
    $("#list_check_select option").remove();
    $("#list_check_select").append($("<option>").val(0).html("NO select")).removeClass("complete-input").addClass("no-input");
    $('#active_staff').html(JSON.parse(active)[0].staff_name);
    $('#log_out').html("Logout");
    machine();
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
function makeSummaryTable() {
    var fileName = "SelSummary.php";
    var sendData = {
        line_id: JSON.parse(active)[0].line_id
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBodyS(ajaxReturnData, $("#summary__table tbody"));
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
function list_content() {
    var fileName = "SelListContent.php";
    var sendData = {
        check_date: $("#check_date").val(),
        list_check_id : $("#list_check_select").val(),
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#content tbody"));
};
function fillTableBody(data, tbodyDom) {
    $(tbodyDom).empty();
    data.forEach(function(trVal) {
        let newTr = $("<tr>");
        Object.keys(trVal).forEach(function(tdVal) {
            if ((tdVal == "staff_name") || (tdVal == "staff_code") || 
            (tdVal == "line") || (tdVal == "machine") || (tdVal == "list_check")) {
                $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
            } else if (tdVal == "position_id") {
                $("<td>").append(positionSelect(trVal[tdVal])).appendTo(newTr);
            } else if (tdVal == "line_id") {
                $("<td>").append(lineSelect(trVal[tdVal])).appendTo(newTr);
            } else if (tdVal == "join_date") {
                $("<td>").append(makeDate(trVal[tdVal])).appendTo(newTr);
            } else if (tdVal == "/") {
                if (trVal[tdVal].content_type_id == 1) {
                    $("<td>").append(selectValue(trVal[tdVal])).appendTo(newTr);
                }else {
                    $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
                }
            } else {
                $("<td>").html(trVal[tdVal]).appendTo(newTr);
            }
        });
        if (trVal.content_type_id == 1) {
            $("<td>").append(selectValue(1)).appendTo(newTr);
        }else {
            $("<td>").append($("<input>").val("").addClass("no-input number-input")).appendTo(newTr);
        }
        $(newTr).appendTo(tbodyDom);
    });
};
function fillTableBodyS(data, tbodyDom) {
    $(tbodyDom).empty();
    data.forEach(function(trVal) {
        let newTr = $("<tr>");
        Object.keys(trVal).forEach(function(tdVal) {
            if (tdVal == "/") {
                if (trVal[tdVal].content_type_id == 1) {
                    $("<td>").append(selectValue(trVal[tdVal])).appendTo(newTr);
                }else {
                    $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
                }
            } else {
                $("<td>").html(trVal[tdVal]).appendTo(newTr);
            }
        });
        $(newTr).appendTo(tbodyDom);
    });
};
function selectValue(seletedId) {
    let targetDom = $("<select>");
    select_value = [{
        id : 1,
        sel : "O"
    },
    {
        id : 2,
        sel : "X"
    },
    {
        id : 3,
        sel : "△"
    }]
    select_value.forEach(function(element) {
        if (element["id"] == seletedId) {
            $("<option>")
                .html(element["sel"])
                .val(element["id"])
                .prop("selected", true)
                .appendTo(targetDom);
        } else {
            $("<option>")
                .html(element["sel"])
                .val(element["id"])
                .appendTo(targetDom);
        }
    });
    return targetDom;
};
function lineSelect(seletedId) {
    let targetDom = $("<select>");
    fileName = "Selline.php";
    sendData = {
    };
    myAjax.myAjax(fileName, sendData);
    ajaxReturnData.forEach(function(element) {
        if (element["id"] == seletedId) {
            $("<option>")
                .html(element["line"])
                .val(element["id"])
                .prop("selected", true)
                .appendTo(targetDom);
        } else {
            $("<option>")
                .html(element["line"])
                .val(element["id"])
                .appendTo(targetDom);
        }
    });
    return targetDom;
};
function makeDate(datePlan) {
    let targetDom = $("<input>");
    targetDom.attr("type", "date");
    targetDom.val(datePlan);
    return targetDom;
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
        list_content();
    }
});
$(document).on("click", "#content tbody tr", function() {
    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#list_content__selected").removeAttr("id");
        $(this).attr("id", "list_content__selected");
    } else {
        // $(this).removeClass("selected-record");
        // $(this).removeAttr("id");
    }
    checkInput();
});
$(document).on("keyup", "#content tbody tr td input", function() {
    var min = Number($("#list_content__selected td:nth-child(6)").html());
    var max = Number($("#list_content__selected td:nth-child(7)").html());
    var value = Number($("#list_content__selected td:nth-child(8) input").val());
    if($.isNumeric($("#list_content__selected td:nth-child(8) input").val())){
        $(this).removeClass("no-input").addClass("complete-input");
    } else {
        $(this).removeClass("complete-input").addClass("no-input");
    }
    if (value < min){
        $("#list_content__selected td:nth-child(8) input").removeClass("complete-input").addClass("no-input");
    } else if (value > max){
        $("#list_content__selected td:nth-child(8) input").removeClass("complete-input").addClass("no-input");
    } else {
        $("#list_content__selected td:nth-child(8) input").removeClass("no-input").addClass("complete-input");
        console.log("OK")
    }
    checkInput();
});
$(document).on("change", ".select-input", function() {
    if ($(this).val() != 0) {
        $(this).removeClass("no-input").addClass("complete-input");
    } else {
        $(this).removeClass("complete-input").addClass("no-input");
    }
    checkInput();
});
$(document).on("change", ".date-input", function() {
    if ($(this).val() != "") {
        $(this).removeClass("no-input").addClass("complete-input");
    } else {
        $(this).removeClass("complete-input").addClass("no-input");
    }
    checkInput();
});
$(document).on("keyup", ".text-input", function() {
    if ($(this).val() != "") {
        $(this).removeClass("no-input").addClass("complete-input");
    } else {
        $(this).removeClass("complete-input").addClass("no-input");
    }
    checkInput();
});
// $(document).on("keyup", ".number-input", function() {
//     if($.isNumeric($(this).val())){
//         $(this).removeClass("no-input").addClass("complete-input");
//     } else {
//         $(this).removeClass("complete-input").addClass("no-input");
//     }
//     checkInput();
// });
$(document).on("click", "#save__button", function () {
    var fileName = "InsData.php";
    tableData = getTableData($("#content tbody tr"))
      jsonData = JSON.stringify(tableData);
      var sendData = {
          data : jsonData,
          check_date : $("#check_date").val(),
          staff_check_id : JSON.parse(active)[0].id,
      };
      console.log(sendData);
    myAjax.myAjax(fileName, sendData);
    makeSummaryTable()
    $("#content tbody tr").remove();
    $("#list_check_select").val(0).removeClass("complete-input").addClass("no-input");
});
function getTableData(tableTrObj) {
    var tableData = [];
    tableTrObj.each(function (index, element) {
      var tr = [];
      $(this)
        .find("td")
        .each(function (index, element) {
          if ($(this).find("input").length) {
            tr.push($(this).find("input").val());
          } else if ($(this).find("select").length) {
            tr.push($(this).find("select").val());
          } else {
            tr.push($(this).html());
          }
        });
      tableData.push(tr);
    });
    return tableData;
};
function checkInput() {
    let check = true;
    if ($("#content tbody tr").length == 0) {
        check = false;
    };
    $("#content tbody tr input").each(function() {
      if ($(this).hasClass("no-input")) {
        check = false;
      }
    });
    if (check) {
      $("#save__button").attr("disabled", false);
    } else {
      $("#save__button").attr("disabled", true);
    } 
};