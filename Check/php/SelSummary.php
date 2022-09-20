<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$line_id = $_POST['line_id'];
try {
    $sql = "SELECT 
    t_record.id,
    DATE_FORMAT(check_date, '%y-%m-%d') AS check_date,
    staff_name,
    line,
    machine,
    check_type,
    content,
    description,
    CASE content_type_id
        WHEN
            1
        THEN
            CASE check_value
                WHEN 1 THEN 'O'
                ELSE 'X'
            END
        ELSE check_value
    END AS vl
FROM
    check_sheet.t_record
        LEFT JOIN
    t_staff ON t_staff.id = t_record.staff_check_id
        LEFT JOIN
    t_content ON t_content.id = t_record.content_id
        LEFT JOIN
    m_check_type ON m_check_type.id = t_content.check_type_id
        LEFT JOIN
    m_content_type ON m_content_type.id = t_content.content_type_id
        LEFT JOIN
    t_list_check ON t_list_check.id = t_content.list_check_id
        LEFT JOIN
    t_machine ON t_machine.id = t_list_check.machine_id
        LEFT JOIN
    t_line ON t_line.id = t_machine.line_id
    WHERE t_line.id = '$line_id'
ORDER BY check_date DESC , line ASC , machine ASC , check_type ASC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>