<?php

/*! \file
This script saves a question in the MySQL database after a user creates it. It uses parameters like, author's username,
problem statement, testcases, start and end time, etc. 
*/
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

include_once("../database.php");
$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData)){
    $request = json_decode($postData);

    $title = mysqli_real_escape_string($mysqli, trim($request->title));
    $username = mysqli_real_escape_string($mysqli, trim($request->username));  //string
    $statement = mysqli_real_escape_string($mysqli, trim($request->statement)); //string
    $tc1 = mysqli_real_escape_string($mysqli, trim($request->tc1));
    $out1 = mysqli_real_escape_string($mysqli, trim($request->out1));
    $tc2 = mysqli_real_escape_string($mysqli, trim($request->tc2));
    $out2 = mysqli_real_escape_string($mysqli, trim($request->out2));
    $stime = mysqli_real_escape_string($mysqli, trim($request->stime)); //string
    $etime = mysqli_real_escape_string($mysqli, trim($request->etime));

    $sql = "INSERT INTO questions(title,username,statement,tc1,out1,tc2,out2,stime,etime) VALUES ('$title','$username','$statement','$tc1','$out1','$tc2','$out2','$stime','$etime')";

    if($result = $mysqli->query($sql)){
        $msg = "question uploaded";
        echo json_encode($msg);
    }
    else{
        http_response_code(404);
    }

}

?>
