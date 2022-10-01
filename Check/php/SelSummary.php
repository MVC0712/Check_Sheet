<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$line_id = $_POST['line_id'];
try {
    $sql = "SELECT 
    t10.id,
    t10.check_date,
    t10.staff_name,
    t_staff.staff_name as stfc,
    line,
    t10.machine,
    t10.list_check
FROM
    (SELECT 
        t_record.id,
            DATE_FORMAT(check_date, '%y-%m-%d') AS check_date,
            staff_name,
            staff_comfirm_id,
            line,
            machine,
            check_type,
            content,
            list_check
    FROM
        check_sheet.t_record
    LEFT JOIN t_staff ON t_staff.id = t_record.staff_check_id
    LEFT JOIN t_content ON t_content.id = t_record.content_id
    LEFT JOIN m_check_type ON m_check_type.id = t_content.check_type_id
    LEFT JOIN m_content_type ON m_content_type.id = t_content.content_type_id
    LEFT JOIN t_list_check ON t_list_check.id = t_content.list_check_id
    LEFT JOIN t_machine ON t_machine.id = t_list_check.machine_id
    LEFT JOIN t_line ON t_line.id = t_machine.line_id
    WHERE
        t_line.id = '$line_id'
    GROUP BY machine_id , check_date
    ORDER BY check_date DESC , line ASC , machine ASC , check_type ASC) AS t10
        LEFT JOIN
    t_staff ON t_staff.id = t10.staff_comfirm_id;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>