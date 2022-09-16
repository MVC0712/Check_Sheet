<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
try {
    $sql = "SELECT 
    t_staff.id,
    staff_name,
    staff_code,
    position_id,
    join_date,
    line_id
FROM
    check_sheet.t_staff
        LEFT JOIN
    m_position ON m_position.id = t_staff.position_id
        LEFT JOIN
    t_line ON t_line.id = t_staff.line_id;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>