<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
if ($_POST['machine_id'] != 0) {
    $machine_id = $_POST['machine_id'];
    $sql = "SELECT id, list_check FROM check_sheet.t_list_check WHERE machine_id = '$machine_id';";
} else {
    $sql = "SELECT id, list_check FROM check_sheet.t_list_check;";
}
try {
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>