<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Add Form</title>
    <link rel="stylesheet" href="../Lib/main.css" />
    <link rel="stylesheet" href="./css/indexV2.css" />
</head>
<body>
    <header><?php include("../header.php") ?></header>
    <div class="main__wrapper">
        <div class="upper__wrapper">
                    <div>
            <table id="line"> 
                <thead>
                    <th>id</th>
                    <th>Line</th>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="input-block__outer">
                <input id="ins_line" class="no-input text-input" type="text">
                <button id="Insert_line" disabled>Line</button>
            </div>
        </div>
        <div>
            <table id="machine"> 
                <thead>
                    <th>id</th>
                    <th>Machine</th>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="input-block__outer">
                <input id="ins_machine" class="no-input text-input" type="text">
                <button id="Insert_machine" disabled>Machine</button>
            </div>
        </div>
        <div>
            <table id="list_check"> 
                <thead>
                    <th>id</th>
                    <th>List check</th>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="input-block__outer">
                <input id="ins_list_check" class="no-input text-input" type="text">
                <button id="Insert_list_check" disabled>List</button>
            </div>
        </div>
        <div>
            <table id="list_content"> 
                <thead>
                    <th>id</th>
                    <th>Content</th>
                    <th>Type</th>
                    <th>description</th>
                    <th>TP</th>
                    <th>Min</th>
                    <th>Max</th>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="input-block__outer">
                <input id="ins_list_content_content" class="no-input text-input" type="text">
                <select id="ins_list_content_type" class="no-input select-input">
                </select>
                <input id="ins_list_content_description" class="no-input text-input" type="text">
                <select id="ins_list_content_type_select" class="no-input select-input">
                    <option value="0">---</option>
                    <option value="1">OK/NG</option>
                    <option value="2">Value</option>
                </select>
                <input id="ins_list_content_min_value" class="no-input number-input" type="text">
                <input id="ins_list_content_max_value" class="no-input number-input" type="text">
                <button id="Insert_list_content" disabled>Content</button>
            </div>
            <div class="input-block__outer file_outer">
                <div class="input__title file_title">
                  File
                </div>
                <div>
                  <input type="file" id="file_upload" class="need-clear">
                  <label id="file_url" for="file_upload">No file</label>
                </div>
                <button id="preview__button" class="input__title aluminium_ingot_title">
                  Preview
                </button>
              </div>
        </div>
        </div>
        <div class="lower__wrapper">
        <div>
            <table id="staff"> 
                <thead>
                    <th>id</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Position</th>
                    <th>Join Date</th>
                    <th>Line</th>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="input-block__outer">
                <input id="ins_staff_name" class="no-input text-input" type="text">
                <input id="ins_staff_code" class="no-input text-input" type="text">
                <select id="ins_staff_position" class="no-input select-input">
                </select>
                <input id="ins_staff_join" class="no-input date-input" type="date">
                <select id="ins_staff_line" class="no-input select-input">
                </select>
                <button id="Insert_staff" disabled>Ins</button>
            </div>
        </div>
    </div>
    </div>
    </div>
    <script src="../Lib/jquery.min.js"></script>
    <script src="./scr/indexV2.js"></script>
</body>
</html>