<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$line_id = $_POST['line_id'];
$machine = $_POST['machine'];
try {
    $sql = "INSERT INTO t_machine(line_id, machine) VALUES ('$line_id','$machine')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>