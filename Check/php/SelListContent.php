<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$list_check_id = $_POST['list_check_id'];
$check_date = $_POST['check_date'];
if($check_date == date('Y-m-01', strtotime($check_date))) {
    $sql = "SELECT 
    t_content.id,
    content,
    description,
    check_type,
    content_type_id,
    min_value,
    max_value
FROM
    check_sheet.t_content
        LEFT JOIN
    t_list_check ON t_list_check.id = t_content.list_check_id
        LEFT JOIN
    m_check_type ON m_check_type.id = t_content.check_type_id
        LEFT JOIN
    m_content_type ON m_content_type.id = t_content.content_type_id
    WHERE list_check_id = '$list_check_id' 
        AND (check_type_id = '1'
        OR check_type_id = '3')
ORDER BY check_type_id ASC;";
}
if(date('D', strtotime($check_date)) == "Mon") {
    $sql = "SELECT 
    t_content.id,
    content,
    description,
    check_type,
    content_type_id,
    min_value,
    max_value
FROM
    check_sheet.t_content
        LEFT JOIN
    t_list_check ON t_list_check.id = t_content.list_check_id
        LEFT JOIN
    m_check_type ON m_check_type.id = t_content.check_type_id
        LEFT JOIN
    m_content_type ON m_content_type.id = t_content.content_type_id
    WHERE list_check_id = '$list_check_id' 
        AND (check_type_id = '1'
        OR check_type_id = '2')
ORDER BY check_type_id ASC;";
}
if((date('D', strtotime($check_date)) == "Mon") && $check_date == date('Y-m-01', strtotime($check_date))) {
    $sql = "SELECT 
    t_content.id,
    content,
    description,
    check_type,
    content_type_id,
    min_value,
    max_value
FROM
    check_sheet.t_content
        LEFT JOIN
    t_list_check ON t_list_check.id = t_content.list_check_id
        LEFT JOIN
    m_check_type ON m_check_type.id = t_content.check_type_id
        LEFT JOIN
    m_content_type ON m_content_type.id = t_content.content_type_id
    WHERE list_check_id = '$list_check_id'
    ORDER BY check_type_id ASC;";
} 
if((date('D', strtotime($check_date)) != "Mon") && $check_date != date('Y-m-01', strtotime($check_date))) {
    $sql = "SELECT 
    t_content.id,
    content,
    description,
    check_type,
    content_type_id,
    min_value,
    max_value
FROM
    check_sheet.t_content
        LEFT JOIN
    t_list_check ON t_list_check.id = t_content.list_check_id
        LEFT JOIN
    m_check_type ON m_check_type.id = t_content.check_type_id
        LEFT JOIN
    m_content_type ON m_content_type.id = t_content.content_type_id
    WHERE list_check_id = '$list_check_id' 
        AND check_type_id = '1'
ORDER BY check_type_id ASC;";
}
try {
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>