<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$line = $_POST['line'];
$manage_by = $_POST['manage_by'];
try {
    $sql = "INSERT INTO t_line(line, manage_by) VALUES ('$line', '$manage_by')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>