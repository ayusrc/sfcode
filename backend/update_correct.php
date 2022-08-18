<?php

/** \file
 *  This script updates the userdata based on whether the most recent attempt made by the user was successful or unsuccessful.
 *  An attempt is successful if and only if all testcases produce correct output.
 */

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

include_once("database.php");
$postData = file_get_contents("php://input");

if (isset($postData) && !empty($postData)) {
  $request = json_decode($postData,true);
  $username = mysqli_real_escape_string($mysqli, trim($request->username));
  $bool = trim($request->b);
  $sql0 = "UPDATE users set n_attempts = n_attempts+1 where username = '$username'";
  mysqli_query($mysqli,$sql0);
  if($bool){
    $sql1 = "UPDATE users set correct_timeline=CONCAT(correct_timeline,'1')  where username = '$username'";
  }
  else{
    $sql1 = "UPDATE users set correct_timeline=CONCAT(correct_timeline,'0')  where username = '$username'";
  }
  
  mysqli_query($mysqli,$sql1);
}

?>