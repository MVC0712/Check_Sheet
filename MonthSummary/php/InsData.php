<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$staff_confirm_id  = "";
$approve_date = "";
$approve_month = "";
$list_check_id = "";

$staff_confirm_id  = $_POST['staff_confirm_id'];
$approve_date  = $_POST['approve_date'];
$approve_month = $_POST['approve_month'];
$list_check_id = $_POST['list_check_id'];

try {
    $sqlsub = "DELETE FROM t_month_approve WHERE approve_month = '$approve_month' AND list_check_id = '$list_check_id'";
    $stmt = $dbh->getInstance()->prepare($sqlsub);
    $stmt->execute();

    $sql = "INSERT INTO t_month_approve (approve_by, approve_date, list_check_id, approve_month) VALUES 
                        ('$staff_confirm_id', ' $approve_date', ' $list_check_id', '$approve_month')";

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>