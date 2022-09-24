<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$manager_id = $_POST['manager_id'];
try {
    $sql = "SELECT 
    id, machine
FROM
    check_sheet.t_machine
WHERE
    t_machine.line_id IN (SELECT 
            id
        FROM
            check_sheet.t_line
        WHERE
            t_line.manage_by = '$manager_id');";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>