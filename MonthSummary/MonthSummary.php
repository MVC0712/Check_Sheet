<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Month</title>
    <link rel="stylesheet" href="../Lib/main.css" />
    <link rel="stylesheet" href="./css/index.css" />
</head>

<body>
<header><?php include("../header.php") ?></header>
	<div class="main__wrapper">
		<div id="select_area">
		<div class="input-block__outer code_outer">
			<div id="active_staff" class="input-block__outer"></div>
			<button id="log_out">Log out</button>
		</div>
		<div class="input-block__outer">
			<div class="input__title code_title">Machine</div>
			<select id="machine_select" class="no-input select-input"></select>
		</div>
		<div class="input-block__outer">
			<div class="input__title code_title">List</div>
			<select id="list_check_select" class="no-input select-input">
				<option value="0">NO select</option>
			</select>
		</div>
	</div>
		<div class="input-block__outer approve_area">
			<div class="input__title">Term</div>
			<input type=date id='std'> →
			<input type=date id='end'>
			<button id="approve" disabled>Approve</button>
			<div id="approve_staff" class="input-block__outer">Apr by: ..................</div>
			<!-- <div id="approve_date" class="input-block__outer">Mông Văn Chiến</div> -->
		</div>
	</div>
	<div class="summary__wrapper">
		<div id="table" class="calendar"></div>
	</div>
    <script src="../Lib/jquery.min.js"></script>
    <script src="./scr/index.js"></script>
</body>

</html>