<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$staff_code = $_POST["staff_code"];
try {
    $sql = "SELECT t_staff.id, staff_name, line_id, line
    FROM t_staff
    LEFT JOIN
        t_line ON t_line.id = t_staff.line_id
    WHERE staff_code = '$staff_code';";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>