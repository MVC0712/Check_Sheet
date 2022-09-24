<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$ins_staff_name = $_POST['ins_staff_name'];
$ins_staff_code = $_POST['ins_staff_code'];
$ins_staff_position = $_POST['ins_staff_position'];
$ins_staff_join = $_POST['ins_staff_join'];
$ins_staff_line = $_POST['ins_staff_line'];

try {
    $sql = "INSERT INTO t_staff (staff_name, staff_code, position_id, join_date, line_id) VALUES 
        ('$ins_staff_name','$ins_staff_code','$ins_staff_position','$ins_staff_join', '$ins_staff_line')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>