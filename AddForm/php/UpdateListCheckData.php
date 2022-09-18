<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$targetId = "";
$list_check_data = "";

$targetId = $_POST["targetId"];
$list_check_data = $_POST["list_check_data"];
try {
    $sql = "UPDATE t_list_check SET
        list_check = '$list_check_data'
    WHERE id = '$targetId'";

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>