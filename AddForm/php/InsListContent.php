<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$ins_list_content_content = $_POST['ins_list_content_content'];
$ins_list_content_type = $_POST['ins_list_content_type'];
$ins_list_content_type_select = $_POST['ins_list_content_type_select'];
$ins_list_content_description = $_POST['ins_list_content_description'];
$file_url = $_POST['file_url'];
$list_check_id = $_POST['list_check_id'];
try {
    $sql = "INSERT INTO t_content(list_check_id, content, check_type_id, description, file_url, content_type_id) VALUES 
        ('$list_check_id','$ins_list_content_content','$ins_list_content_type','$ins_list_content_description','$file_url', '$ins_list_content_type_select')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>