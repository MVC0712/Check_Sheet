<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Home Page</title>
  <link rel="stylesheet" href="./Lib/main.css" />
  <link rel="stylesheet" href="./Lib/home.css" />
  </head>
  <body>
    <header><?php include("header.php")?></header>
      <script src="./Lib/jquery.min.js"></script>
      <script>
        $(document).on("click", "#add_form", function () {
          window.open("/Check_Sheet/AddForm","__self");
        });
        $(document).on("click", "#check", function () {
          window.open("/Check_Sheet/Check","__self");
        });
        $(document).on("click", "#confirm", function () {
          window.open("/Check_Sheet/Confirm","__self");
        });
        $(document).on("click", "#month_summary", function () {
          window.open("/Check_Sheet/MonthSummary","__self");
        });
      </script>
</html>