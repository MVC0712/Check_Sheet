<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$targetId = "";
$machine_data = "";

$targetId = $_POST["targetId"];
$machine_data = $_POST["machine_data"];
try {
    $sql = "UPDATE t_machine SET
        machine = '$machine_data'
    WHERE id = '$targetId'";

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>