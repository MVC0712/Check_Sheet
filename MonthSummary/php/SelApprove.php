<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$approve_month = $_POST['approve_month'];
$list_check_id = $_POST['list_check_id'];
try {
    $sql = "SELECT 
        approve_by, approve_date, staff_name
    FROM
        t_month_approve
    LEFT JOIN
        t_staff ON t_staff.id = t_month_approve.approve_by 
    WHERE list_check_id = '$list_check_id' 
            AND approve_month = '$approve_month';";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>