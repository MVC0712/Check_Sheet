<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$targetId = "";
$name = "";
$code = "";
$position = "";
$join_date = "";
$line_id = "";

$targetId = $_POST["targetId"];
$name = $_POST["name"];
$code = $_POST["code"];
$position = $_POST["position"];
$join_date = $_POST["join_date"];
$line_id = $_POST["line_id"];
try {
    $sql = "UPDATE t_staff SET
    staff_name = '$name',
    staff_code = '$code',
    position_id  = '$position',
    join_date = '$join_date',
    line_id = '$line_id'
    WHERE id = '$targetId'";

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>