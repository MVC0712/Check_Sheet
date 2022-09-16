<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
if ($_POST['list_check_id'] != 0) {
    $list_check_id = $_POST['list_check_id'];
    $sql = "SELECT id, content, check_type_id, description, file_url FROM check_sheet.t_content WHERE list_check_id = '$list_check_id';";
} else {
    $sql = "SELECT id, content, check_type_id, description, file_url FROM check_sheet.t_content;";
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