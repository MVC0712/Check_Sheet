var ajaxReturnData;

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
    // inputSession();
    staff();
    line();
    // machine();
    // list_check();
    // list_content();
    shecktype();
    staffPosition();
    staffLine();
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
            var active = sessionStorage.getItem("active_staff");
            alert(JSON.parse(active)[0].staff_name + " is activating!");
        } else {
            alert("Your Emp No dose not exist!");
            inputSession();
        }
    }
};

function staffPosition() {
    var fileName = "SelPosition.php";
    var sendData = {
    };
    myAjax.myAjax(fileName, sendData);
    $("#ins_staff_position option").remove();
    $("#ins_staff_position").append($("<option>").val(0).html("NO select"));
    ajaxReturnData.forEach(function(value) {
        $("#ins_staff_position").append(
            $("<option>").val(value["id"]).html(value["position"])
        );
    });
};
function staffLine() {
    var fileName = "SelLine.php";
    var sendData = {
    };
    myAjax.myAjax(fileName, sendData);
    $("#ins_staff_line option").remove();
    $("#ins_staff_line").append($("<option>").val(0).html("NO select"));
    ajaxReturnData.forEach(function(value) {
        $("#ins_staff_line").append(
            $("<option>").val(value["id"]).html(value["line"])
        );
    });
};
function staff() {
    var fileName = "SelStaff.php";
    var sendData = {
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#staff tbody"));
};
function shecktype() {
    let fileName = "SelCheckType.php";
    let sendData = {
    };
    myAjax.myAjax(fileName, sendData);
    $("#ins_list_content_type option").remove();
    $("#ins_list_content_type").append($("<option>").val(0).html("NO"));
    ajaxReturnData.forEach(function(value) {
        $("#ins_list_content_type").append(
            $("<option>").val(value["id"]).html(value["check_type"])
        );
    });
  };
function line() {
    var fileName = "SelLine.php";
    var sendData = {
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#line tbody"));
};
function machine() {
    var fileName = "SelMachine.php";
    if ($("#line__selected").find("td").eq(0).html() == undefined) {
        var lid=0
    } else {
        var lid = $("#line__selected").find("td").eq(0).html()
    }
    var sendData = {
        line_id: lid,
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#machine tbody"));
    $("#list_check tbody").empty();
    $("#list_content tbody").empty();
};
function list_check() {
    var fileName = "SelListCheck.php";
    if ($("#machine__selected").find("td").eq(0).html() == undefined) {
        var mcid=0
    } else {
        var mcid = $("#machine__selected").find("td").eq(0).html()
    }
    var sendData = {
        machine_id:mcid,
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#list_check tbody"));
    $("#list_content tbody").empty();
};
function list_content() {
    var fileName = "SelListContent.php";
    if ($("#list_check__selected").find("td").eq(0).html() == undefined) {
        var lcid=0
    } else {
        var lcid = $("#list_check__selected").find("td").eq(0).html()
    }
    var sendData = {
        list_check_id: lcid,
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#list_content tbody"));
};
function fillTableBody(data, tbodyDom) {
    $(tbodyDom).empty();
    data.forEach(function(trVal) {
        let newTr = $("<tr>");
        Object.keys(trVal).forEach(function(tdVal) {
            if ((tdVal == "staff_name") || (tdVal == "staff_code") || 
                (tdVal == "line") || (tdVal == "machine") || 
                (tdVal == "content") || (tdVal == "description") || 
                (tdVal == "list_check")) {
                $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
            } else if (tdVal == "position_id") {
                $("<td>").append(positionSelect(trVal[tdVal])).appendTo(newTr);
            } else if (tdVal == "check_type_id") {
                $("<td>").append(checkType(trVal[tdVal])).appendTo(newTr);
            } else if (tdVal == "content_type_id") {
                $("<td>").append(checkTypeSelect(trVal[tdVal])).appendTo(newTr);
            } else if (tdVal == "line_id") {
                $("<td>").append(lineSelect(trVal[tdVal])).appendTo(newTr);
            } else if (tdVal == "join_date") {
                $("<td>").append(makeDate(trVal[tdVal])).appendTo(newTr);
            } else {
                $("<td>").html(trVal[tdVal]).appendTo(newTr);
            }
        });

        $(newTr).appendTo(tbodyDom);
    });
};
function positionSelect(seletedId) {
    let targetDom = $("<select>");
    fileName = "SelPosition.php";
    sendData = {
    };
    myAjax.myAjax(fileName, sendData);
    ajaxReturnData.forEach(function(element) {
        if (element["id"] == seletedId) {
            $("<option>")
                .html(element["position"])
                .val(element["id"])
                .prop("selected", true)
                .appendTo(targetDom);
        } else {
            $("<option>")
                .html(element["position"])
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
function checkType(seletedId) {
    let targetDom = $("<select>");
    var ctype = [{
        id : 1,
        ct : "Daily"
    },{
        id : 2,
        ct : "Weekly"
    }]
    ctype.forEach(function(element) {
        if (element["id"] == seletedId) {
            $("<option>")
                .html(element["ct"])
                .val(element["id"])
                .prop("selected", true)
                .appendTo(targetDom);
        } else {
            $("<option>")
                .html(element["ct"])
                .val(element["id"])
                .appendTo(targetDom);
        }
    });
    return targetDom;
};
function checkTypeSelect(seletedId) {
    let targetDom = $("<select>");
    var ctypes = [{
        id : 1,
        cts : "OK/NG"
    },{
        id : 2,
        cts : "Value"
    }]
    ctypes.forEach(function(element) {
        if (element["id"] == seletedId) {
            $("<option>")
                .html(element["cts"])
                .val(element["id"])
                .prop("selected", true)
                .appendTo(targetDom);
        } else {
            $("<option>")
                .html(element["cts"])
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

$(document).on("click", "#line tbody tr", function() {
    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#line__selected").removeAttr("id");
        $(this).attr("id", "line__selected");
        machine();
    } else {
        $(this).removeClass("selected-record");
        $(this).removeAttr("id");
        $("#machine tbody").empty();
        $("#list_check tbody").empty();
        $("#list_content tbody").empty();
    }
    InsCheck();
});
$(document).on("click", "#machine tbody tr", function() {
    var fileName = "SelPartPosition.php";
    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#machine__selected").removeAttr("id");
        $(this).attr("id", "machine__selected");
        list_check();
    } else {
        $(this).removeClass("selected-record");
        $(this).removeAttr("id");
        $("#list_check tbody").empty();
        $("#list_content tbody").empty();
    }
    InsCheck();
});
$(document).on("click", "#list_check tbody tr", function() {
    var fileName = "SelPartPosition.php";
    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#list_check__selected").removeAttr("id");
        $(this).attr("id", "list_check__selected");
        list_content();
    } else {
        $(this).removeClass("selected-record");
        $(this).removeAttr("id");
        $("#list_content tbody").empty();
    }
    InsCheck();
});
$(document).on("click", "#list_content tbody tr", function() {
    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#list_content__selected").removeAttr("id");
        $(this).attr("id", "list_content__selected");
    } else {
        $(this).removeClass("selected-record");
        $(this).removeAttr("id");
    }
    InsCheck();
});
$(document).on("click", "#staff tbody tr", function() {
    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#staff__selected").removeAttr("id");
        $(this).attr("id", "staff__selected");
    } else {
        $(this).removeClass("selected-record");
        $(this).removeAttr("id");
    }
    InsCheck();
});

$(document).on("click", "#Insert_line", function() {
    var fileName = "InsLine.php";
    var sendObj = new Object();
    sendObj["line"] = $("#ins_line").val();
    sendObj["manage_id"] = $("#staff__selected td:nth-child(1)").html();
    myAjax.myAjax(fileName, sendObj);
    line();
    $("#ins_line").val("");
    $("#ins_line").removeClass("complete-input").addClass("no-input");
    $("#Insert_line").prop("disabled", true);
});
$(document).on("click", "#Insert_machine", function() {
    var fileName = "InsMachine.php";
    var sendObj = new Object();
    sendObj["machine"] = $("#ins_machine").val();
    sendObj["line_id"] = $("#line__selected").find("td").eq(0).html();
    myAjax.myAjax(fileName, sendObj);
    machine();
    $("#ins_machine").val("");
    $("#ins_machine").removeClass("complete-input").addClass("no-input");
    $("#Insert_machine").prop("disabled", true);
});
$(document).on("click", "#Insert_list_check", function() {
    var fileName = "InsListCheck.php";
    var sendObj = new Object();
    sendObj["ins_list_check"] = $("#ins_list_check").val();
    sendObj["machine_id"] = $("#machine__selected").find("td").eq(0).html();
    myAjax.myAjax(fileName, sendObj);
    list_check();
    $("#ins_list_check").val("");
    $("#ins_list_check").removeClass("complete-input").addClass("no-input");
    $("#Insert_list_check").prop("disabled", true);
});
$(document).on("click", "#Insert_list_content", function() {
    var fileName = "InsListContent.php";
    var sendObj = new Object();
    sendObj["ins_list_content_content"] = $("#ins_list_content_content").val();
    sendObj["ins_list_content_type"] = $("#ins_list_content_type").val();
    sendObj["ins_list_content_type_select"] = $("#ins_list_content_type_select").val();
    sendObj["ins_list_content_description"] = $("#ins_list_content_description").val();
    sendObj["file_url"] = $("#file_url").html();
    sendObj["list_check_id"] = $("#list_check__selected").find("td").eq(0).html();
    myAjax.myAjax(fileName, sendObj);
    list_content();
    $("#file_url").html("");
    $("#ins_list_content_content").val("");
    $("#ins_list_content_content").removeClass("complete-input").addClass("no-input");
    $("#ins_list_content_type").val(0);
    $("#ins_list_content_type").removeClass("complete-input").addClass("no-input");
    $("#ins_list_content_type_select").val(0);
    $("#ins_list_content_type_select").removeClass("complete-input").addClass("no-input");
    $("#ins_list_content_description").val("");
    $("#ins_list_content_description").removeClass("complete-input").addClass("no-input");
    $("#Insert_list_content").prop("disabled", true);
});
$(document).on("click", "#Insert_staff", function() {
    var fileName = "InsStaff.php";
    var sendObj = new Object();
    sendObj["ins_staff_name"] = $("#ins_staff_name").val();
    sendObj["ins_staff_code"] = $("#ins_staff_code").val();
    sendObj["ins_staff_position"] = $("#ins_staff_position").val();
    sendObj["ins_staff_join"] = $("#ins_staff_join").val();
    sendObj["ins_staff_line"] = $("#ins_staff_line").val();
    myAjax.myAjax(fileName, sendObj);

    $("#ins_staff_name").val("");
    $("#ins_staff_name").removeClass("complete-input").addClass("no-input");
    $("#ins_staff_code").val("");
    $("#ins_staff_code").removeClass("complete-input").addClass("no-input");
    $("#ins_staff_position").val(0);
    $("#ins_staff_position").removeClass("complete-input").addClass("no-input");
    $("#ins_staff_join").val("");
    $("#ins_staff_join").removeClass("complete-input").addClass("no-input");
    $("#ins_staff_line").val(0);
    $("#ins_staff_line").removeClass("complete-input").addClass("no-input");
    $("#Insert_staff").prop("disabled", true);
    staff();
});
$(document).on("change", "#line tbody tr td", function () {
    let sendData = new Object();
    let fileName;
    fileName = "UpdateLineData.php";
    sendData = {
      targetId : $("#line__selected td:nth-child(1)").html(),
      line_data : $("#line__selected td:nth-child(2) input").val(),
    };
    myAjax.myAjax(fileName, sendData);
    line();
});
$(document).on("change", "#machine tbody tr td", function () {
    let sendData = new Object();
    let fileName;
    fileName = "UpdateMachineData.php";
    sendData = {
      targetId : $("#machine__selected td:nth-child(1)").html(),
      machine_data : $("#machine__selected td:nth-child(2) input").val(),
    };
    myAjax.myAjax(fileName, sendData);
    machine();
});
$(document).on("change", "#list_check tbody tr td", function () {
    let sendData = new Object();
    let fileName;
    fileName = "UpdateListCheckData.php";
    sendData = {
      targetId : $("#list_check__selected td:nth-child(1)").html(),
      list_check_data : $("#list_check__selected td:nth-child(2) input").val(),
    };
    myAjax.myAjax(fileName, sendData);
    list_check();
});
$(document).on("change", "#list_content tbody tr td", function () {
    let sendData = new Object();
    let fileName;
    fileName = "UpdateListContentData.php";
    sendData = {
      targetId : $("#list_content__selected td:nth-child(1)").html(),
      content : $("#list_content__selected td:nth-child(2) input").val(),
      check_type_id : $("#list_content__selected td:nth-child(3) select").val(),
      description : $("#list_content__selected td:nth-child(4) input").val(),
      content_type_id : $("#list_content__selected td:nth-child(5) select").val(),
    };
    myAjax.myAjax(fileName, sendData);
    list_content();
});
$(document).on("change", "#staff tbody tr td", function () {
    let sendData = new Object();
    let fileName;
    fileName = "UpdateStaffData.php";
    sendData = {
      targetId : $("#staff__selected td:nth-child(1)").html(),
      name : $("#staff__selected td:nth-child(2) input").val(),
      code : $("#staff__selected td:nth-child(3) input").val(),
      position : $("#staff__selected td:nth-child(4) select").val(),
      join_date : $("#staff__selected td:nth-child(5) input").val(),
      line_id : $("#staff__selected td:nth-child(6) select").val(),
    };
    myAjax.myAjax(fileName, sendData);
    staff();
});
function select_row(targetId, targetDom, id) {
    targetDom.each(function(index, element) {
        if ($(element).find("td").eq(0).text() == targetId) {
            $(element).parent().find("tr").removeClass("selected-record");
            $(element).addClass("selected-record");
            $(id).removeAttr("id");
            $(element).attr("id", id);
            $(targetDom).scrollTop(19 * index);
        }
    });
};

function InsLineCheck() {
    if (($("#ins_line").val().length == 0)||
        (!$("#staff tbody tr").hasClass("selected-record"))) {
        $("#Insert_line").prop("disabled", true);
    } else {
        $("#Insert_line").prop("disabled", false);
    }
};
function InsMachineCheck() {
    if ((($("#ins_machine").val().length == 0)|| 
        (!$("#line tbody tr").hasClass("selected-record")))) {
        $("#Insert_machine").prop("disabled", true);
    } else {
        $("#Insert_machine").prop("disabled", false);
    }
};
function InsListCheck() {
    if ((($("#ins_list_check").val().length == 0)|| 
        (!$("#machine tbody tr").hasClass("selected-record")))) {
        $("#Insert_list_check").prop("disabled", true);
    } else {
        $("#Insert_list_check").prop("disabled", false);
    }
};
function InsContentCheck() {
    if ((($("#ins_list_content_content").val().length == 0)|| 
        ($("#ins_list_content_type").val() == 0)||
        ($("#ins_list_content_type_select").val() == 0)||
        ($("#ins_list_content_description").val().length == 0)||
        (!$("#list_check tbody tr").hasClass("selected-record")))) {
        $("#Insert_list_content").prop("disabled", true);
    } else {
        $("#Insert_list_content").prop("disabled", false);
    }
};
function InsStaffCheck() {
    if ((($("#ins_staff_name").val().length == 0)|| 
        ($("#ins_staff_code").val().length == 0)||
        ($("#ins_staff_position").val() == 0)||
        ($("#ins_staff_join").val() == "")||
        ($("#ins_staff_line").val().length == 0))) {
        $("#Insert_staff").prop("disabled", true);
    } else {
        $("#Insert_staff").prop("disabled", false);
    }
};
function InsCheck() {
    InsLineCheck();
    InsMachineCheck();
    InsListCheck();
    InsContentCheck();
    InsStaffCheck();
};

$(document).on("change", ".select-input", function() {
    if ($(this).val() != 0) {
        $(this).removeClass("no-input").addClass("complete-input");
    } else {
        $(this).removeClass("complete-input").addClass("no-input");
    }
    InsCheck();
});
$(document).on("change", ".date-input", function() {
    if ($(this).val() != "") {
        $(this).removeClass("no-input").addClass("complete-input");
    } else {
        $(this).removeClass("complete-input").addClass("no-input");
    }
    InsCheck();
});
$(document).on("keyup", ".text-input", function() {
    if ($(this).val() != "") {
        $(this).removeClass("no-input").addClass("complete-input");
    } else {
        $(this).removeClass("complete-input").addClass("no-input");
    }
    InsCheck();
});

$("#file_upload").on("change", function () {
    var file = $(this).prop("files")[0];
    console.log(file.name);
    $("#file_url").html(file.name);
    $("#preview__button").prop("disabled", false);
  });
  $(document).on("change", "#file_upload", function () {
    ajaxFileUpload();
    fileName = "UpdateListContent.php";
    sendData = {
      targetId: $("#list_content__selected").find("td").eq(0).html(),
      file_url: $("#file_url").html(),
    };
    myAjax.myAjax(fileName, sendData);
  });
  $(document).on("click", "#preview__button", function () {
    window.open("../AddForm/AddFormSub.html");
  });
  function ajaxFileUpload() {
    var file_data = $('#file_upload').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: "./php/FileUpload.php",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
    });
  };