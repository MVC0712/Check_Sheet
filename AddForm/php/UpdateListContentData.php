<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$targetId = "";
$content = "";
$check_type_id = "";
$description = "";
$content_type_id = "";

$targetId = $_POST["targetId"];
$content = $_POST["content"];
$check_type_id = $_POST["check_type_id"];
$description = $_POST["description"];
$content_type_id = $_POST["content_type_id"];
try {
    $sql = "UPDATE t_content SET
    content = '$content',
    check_type_id = '$check_type_id',
    description = '$description',
    content_type_id = '$content_type_id'
    WHERE id = '$targetId'";

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>