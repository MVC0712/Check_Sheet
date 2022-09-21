<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$data = "";
$staff_confirm_id = "";

$data = $_POST['data'];
$staff_confirm_id = $_POST['staff_confirm_id'];
$data_json = json_decode($data);

try {
    foreach ($data_json as $val) {
        $sql = "UPDATE t_record SET staff_comfirm_id = '$staff_confirm_id' WHERE id = '{$val[0]}'";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
        $sql = "";
    };
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>