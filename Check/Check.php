<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Check</title>
    <link rel="stylesheet" href="../Lib/main.css" />
    <link rel="stylesheet" href="./css/index.css" />
</head>
<body>
<header><?php include("../header.php") ?></header>
    <div class="main__wrapper">
        <div class="upper__wrapper">
            <div class="left__wrapper">
                <div id="active_area">
                    <div id="active_staff" class="input-block__outer"></div>
                    <button id="log_out">Log out</button>
                </div>
                <div class="input-block__outer code_outer">
                    <div class="input__title code_title">Check date</div>
                    <input id="check_date" class="date-input" type="date">
                </div>
                <div class="input-block__outer code_outer">
                    <div class="input__title code_title">Machine</div>
                    <select id="machine_select" class="no-input select-input"></select>
                </div>
                <div class="input-block__outer code_outer">
                    <div class="input__title code_title">List</div>
                    <select id="list_check_select" class="no-input select-input">
                        <option value="0">NO select</option>
                    </select>
                </div>
            </div>
            <div class="right__wrapper">
                <table id="content">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Content</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Check type</th>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <button id="save__button" disabled>Save</button>
            </div>
        </div>
        <div class="lower__wrapper">
            <table id="summary__table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Check date</th>
                        <th>Staff check</th>
                        <th>Staff confirm</th>
                        <th>Line</th>
                        <th>Machine</th>
                        <th>List Check</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <script src="../Lib/jquery.min.js"></script>
    <script src="./scr/index.js"></script>
</body>

</html>