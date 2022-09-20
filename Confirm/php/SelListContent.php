<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$list_check_id = $_POST['list_check_id'];
$check_date = $_POST['check_date'];
try {
    $sql = "SELECT 
    t_record.id,
    content,
    description,
    check_type,
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
WHERE
    check_date = '$check_date'
        AND t_content.list_check_id = '$list_check_id'
ORDER BY check_type ASC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>