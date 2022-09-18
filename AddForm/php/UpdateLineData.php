<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$targetId = "";
$line_data = "";

$targetId = $_POST["targetId"];
$line_data = $_POST["line_data"];
try {
    $sql = "UPDATE t_line SET
        line = '$line_data'
    WHERE id = '$targetId'";

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>