<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$machine_id = $_POST['machine_id'];
$ins_list_check = $_POST['ins_list_check'];
try {
    $sql = "INSERT INTO t_list_check(machine_id, list_check) VALUES ('$machine_id','$ins_list_check')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>