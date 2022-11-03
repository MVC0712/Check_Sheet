<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
  $data = "";
  $check_date = "";
  $staff_check_id = "";

  $data = $_POST['data'];
  $check_date = $_POST['check_date'];
  $staff_check_id = $_POST['staff_check_id'];
  $data_json = json_decode($data);

try {
    foreach ($data_json as $val) {
        $sql_paramater[] = "('{$val[0]}', '{$staff_check_id}', '{$check_date}', '{$val[7]}')";

        $sqlsub = "DELETE FROM t_record WHERE content_id = '{$val[0]}' AND check_date = '{$check_date}'";
        $stmt = $dbh->getInstance()->prepare($sqlsub);
        $stmt->execute();
        $sqlsub = "";

    };
    $sql = "INSERT INTO t_record ";
    $sql = $sql."(content_id ,staff_check_id, check_date, check_value) VALUES ";
    $sql = $sql.join(",", $sql_paramater);

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>