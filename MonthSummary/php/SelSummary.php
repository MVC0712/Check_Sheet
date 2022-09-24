<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$start_s = $_POST['start_s'];
$end_s = $_POST['end_s'];
$list_check_id = $_POST['list_check_id'];

$begin = new DateTime($start_s);
$end = new DateTime($end_s);
$end = $end->modify( '+1 day' );
$sql ="";
$sql1 = "SELECT 
ts.id,
t_content.content,
t_content.description,
m_check_type.check_type,";
$interval = DateInterval::createFromDateString('1 day');
$period = new DatePeriod($begin, $interval, $end);
foreach ($period as $dt) {
    $di = $dt->format("Y-m-d");
    $din = $dt->format("Ymd");
    $sql1 = $sql1." _" . $din.", ";
}
$sql1 = substr(trim($sql1), 0, -1);
$sql1 = $sql1." FROM
t_content
    LEFT JOIN
(SELECT 
    t_record.id,
    t_record.content_id,
    t_content.list_check_id,
    ";
foreach ($period as $dt) {
    $di = $dt->format("Y-m-d");
    $din = $dt->format("Ymd");
    $sql1 = $sql1 ."  MAX(CASE WHEN 
    t_record.check_date = '" . $di . "' 
    THEN 
    CASE content_type_id
        WHEN
            1
        THEN
            CASE check_value
                WHEN 1 THEN 'O'
                ELSE 'X'
            END
        ELSE check_value
    END
    ELSE '' END) AS '_" . $din ."',";
}
$sql2 = substr(trim($sql1), 0, -1);
$sql2 = $sql2." FROM
t_record
LEFT JOIN t_content ON t_content.id = t_record.content_id
LEFT JOIN t_list_check ON t_list_check.id = t_content.list_check_id
GROUP BY content_id) AS ts ON t_content.id = ts.content_id
LEFT JOIN
    m_check_type ON m_check_type.id = t_content.check_type_id
WHERE
    t_content.list_check_id = '$list_check_id' ";
$sql = $sql2;

$sql3 = "UNION SELECT 
ts.id,
'Check By' AS content,
'' AS description,
'' AS check_type,";
$interval = DateInterval::createFromDateString('1 day');
$period = new DatePeriod($begin, $interval, $end);
foreach ($period as $dt) {
    $di = $dt->format("Y-m-d");
    $din = $dt->format("Ymd");
    $sql3 = $sql3." _" . $din.", ";
}
$sql3 = substr(trim($sql3), 0, -1);
$sql3 = $sql3." FROM
t_content
    LEFT JOIN
(SELECT 
    t_record.id,
    t_record.content_id,
    t_content.list_check_id,
    '$start_s' AS ttt,
    ";
foreach ($period as $dt) {
    $di = $dt->format("Y-m-d");
    $din = $dt->format("Ymd");
    $sql3 = $sql3 ."  MAX(CASE WHEN 
    t_record.check_date = '" . $di . "' 
    THEN SUBSTRING_INDEX(t_staff.staff_name, ' ', - 1)
    ELSE '' END) AS '_" . $din ."',";
}
$sql4 = substr(trim($sql3), 0, -1);
$sql4 = $sql4." FROM
t_record
LEFT JOIN t_content ON t_content.id = t_record.content_id
LEFT JOIN t_list_check ON t_list_check.id = t_content.list_check_id
LEFT JOIN t_staff ON t_staff.id = t_record.staff_check_id
GROUP BY content_id) AS ts ON t_content.id = ts.content_id
LEFT JOIN
    m_check_type ON m_check_type.id = t_content.check_type_id
WHERE
    t_content.list_check_id = '$list_check_id'
GROUP BY ttt ";

$sql = $sql2.$sql4;

$sql5 = "UNION SELECT 
ts.id,
'Confirm By' AS content,
'' AS description,
'' AS check_type,";
$interval = DateInterval::createFromDateString('1 day');
$period = new DatePeriod($begin, $interval, $end);
foreach ($period as $dt) {
    $di = $dt->format("Y-m-d");
    $din = $dt->format("Ymd");
    $sql5 = $sql5." _" . $din.", ";
}
$sql5 = substr(trim($sql5), 0, -1);
$sql5 = $sql5." FROM
t_content
    LEFT JOIN
(SELECT 
    t_record.id,
    t_record.content_id,
    t_content.list_check_id,
    '$start_s' AS ttt,
    ";
foreach ($period as $dt) {
    $di = $dt->format("Y-m-d");
    $din = $dt->format("Ymd");
    $sql5 = $sql5 ."  MAX(CASE WHEN 
    t_record.check_date = '" . $di . "' 
    THEN SUBSTRING_INDEX(t_staff.staff_name, ' ', - 1)
    ELSE '' END) AS '_" . $din ."',";
}
$sql6 = substr(trim($sql5), 0, -1);
$sql6 = $sql6." FROM
t_record
LEFT JOIN t_content ON t_content.id = t_record.content_id
LEFT JOIN t_list_check ON t_list_check.id = t_content.list_check_id
LEFT JOIN t_staff ON t_staff.id = t_record.staff_comfirm_id
GROUP BY content_id) AS ts ON t_content.id = ts.content_id
LEFT JOIN
    m_check_type ON m_check_type.id = t_content.check_type_id
WHERE
    t_content.list_check_id = '$list_check_id'
GROUP BY ttt ;";

$sql = $sql.$sql6;
// print_r($sql);
try {
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>