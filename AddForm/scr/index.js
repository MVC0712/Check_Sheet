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

});

function staff() {
    var fileName = "SelStaff.php";
    var sendData = {
        dummy: "dummy",
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#staff tbody"));
};

function fillTableBody(data, tbodyDom) {
    $(tbodyDom).empty();
    data.forEach(function(trVal) {
        let newTr = $("<tr>");
        Object.keys(trVal).forEach(function(tdVal) {
            if (tdVal == "duration") {
                $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
            } else {
                $("<td>").html(trVal[tdVal]).appendTo(newTr);
            }
        });

        $(newTr).appendTo(tbodyDom);
    });
};

function line() {
    var fileName = "SelLine.php";
    var sendData = {
        dummy: "dummy",
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#line tbody"));
};
function machine() {
    var fileName = "SelMachine.php";
    var sendData = {
        dummy: "dummy",
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#machine tbody"));
};
function list_check() {
    var fileName = "SelListCheck.php";
    var sendData = {
        dummy: "dummy",
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#list_check tbody"));
};
function list_content() {
    var fileName = "SelListContent.php";
    var sendData = {
        dummy: "dummy",
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#list_content tbody"));
};

$(document).on("click", "#line tbody tr", function() {
    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#line__selected").removeAttr("id");
        $(this).attr("id", "line__selected");
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
        var sendData = {
            line_id : $("#line__selected").find("td").eq(0).html(),
        };
        // myAjax.myAjax(fileName, sendData);
        // fillTableBody(ajaxReturnData, $("#work tbody"));
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
        var sendData = {
            machine_id: $("#machine__selected").find("td").eq(0).html(),
        };
        // myAjax.myAjax(fileName, sendData);
        // fillTableBody(ajaxReturnData, $("#work tbody"));
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
    // myAjax.myAjax(fileName, sendObj);

    var fileName = "SelLine.php";
    var sendData = {
        // line_id: $("#line__selected").find("td").eq(0).html(),
    };
    // myAjax.myAjax(fileName, sendData);
    // fillTableBody(ajaxReturnData, $("#line tbody"));

    $("#ins_line").val("");
    $("#ins_line").removeClass("complete-input").addClass("no-input");
    $("#Insert_line").prop("disabled", true);
});
$(document).on("click", "#Insert_machine", function() {
    var fileName = "InsMachine.php";
    var sendObj = new Object();
    sendObj["machine"] = $("#ins_machine").val();
    sendObj["line_id"] = $("#line__selected").find("td").eq(0).html();
    // myAjax.myAjax(fileName, sendObj);

    var fileName = "SelListCheck.php";
    var sendData = {
        line_id: $("#line__selected").find("td").eq(0).html(),
    };
    // myAjax.myAjax(fileName, sendData);
    // fillTableBody(ajaxReturnData, $("#machine tbody"));

    $("#ins_machine").val("");
    $("#ins_machine").removeClass("complete-input").addClass("no-input");
    $("#Insert_machine").prop("disabled", true);
});
$(document).on("click", "#Insert_list_check", function() {
    var fileName = "InsListCheck.php";
    var sendObj = new Object();
    sendObj["ins_list_check"] = $("#ins_list_check").val();
    sendObj["machine_id"] = $("#machine__selected").find("td").eq(0).html();
    // myAjax.myAjax(fileName, sendObj);

    var fileName = "SelListCheck.php";
    var sendData = {
        machine_id: $("#machine__selected").find("td").eq(0).html(),
    };
    // myAjax.myAjax(fileName, sendData);
    // fillTableBody(ajaxReturnData, $("#list_check tbody"));

    $("#ins_list_check").val("");
    $("#ins_list_check").removeClass("complete-input").addClass("no-input");
    $("#Insert_list_check").prop("disabled", true);
});
$(document).on("click", "#Insert_list_content", function() {
    var fileName = "InsListContent.php";
    var sendObj = new Object();
    sendObj["ins_list_content_content"] = $("#ins_list_content_content").val();
    sendObj["ins_list_content_type"] = $("#ins_list_content_type").val();
    sendObj["ins_list_content_description"] = $("#ins_list_content_description").val();
    sendObj["file_url"] = $("#file_url").val();
    sendObj["list_check_id"] = $("#list_check__selected").find("td").eq(0).html();
    // myAjax.myAjax(fileName, sendObj);

    var fileName = "SelListContent.php";
    var sendData = {
        list_check_id: $("#list_check__selected").find("td").eq(0).html(),
    };
    // myAjax.myAjax(fileName, sendData);
    // fillTableBody(ajaxReturnData, $("#list_content tbody"));

    $("#ins_list_content_content").val("");
    $("#ins_list_content_content").removeClass("complete-input").addClass("no-input");
    $("#ins_list_content_type").val(0);
    $("#ins_list_content_type").removeClass("complete-input").addClass("no-input");
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
    if ($("#ins_line").val().length == 0) {
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
        ($("#ins_list_content_type").val() == 0)||
        ($("#ins_staff_join").val() == "")||
        ($("#ins_staff_line").val().length == 0))) {
        $("#Insert_staff").prop("disabled", true);
    } else {
        $("#Insert_staff").prop("disabled", false);
    }
};
function InsCheck() {
    InsCheck();
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