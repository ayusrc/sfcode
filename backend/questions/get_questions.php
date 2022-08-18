<?php

/*! \file
This script checks the questions present in the MySQL database, and sends the question info (title, problem statement, 
start and end time, and the author's username) to the frontend. 
For this the script communicates with the MySQL server.
Thus SQL injection has been handled.
*/

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

include_once("../database.php");

$sql2 = "SELECT * FROM questions";

$data = array();

if($result = $mysqli->query($sql2)){

    $i = 0;
    while($row = mysqli_fetch_assoc($result)){

        $data[$i]['title'] = $row['title'];
        $data[$i]['username'] = $row['username'];
        $data[$i]['statement'] = $row['statement'];
        $data[$i]['tc1'] = $row['tc1'];
        $data[$i]['out1'] = "";
        $data[$i]['tc2'] = $row['tc2'];
        $data[$i]['out2'] = "";
        $data[$i]['stime'] = $row['stime'];
        $data[$i]['etime'] = $row['etime'];
        $i++;
    }
    echo json_encode($data);
}
else{
    http_response_code(404);
}

?>
