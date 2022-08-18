<?php

/*! \file
This script saves a given code file for a user, given it's path.
If the file is an Attempt to a question, it is saved in the separate questions directory(part of the workspace).
This file also communicates with the MySQL Server to update n_files(file count) of the user, to enforce the maximum limit of 10 files.
Hence SQL injection is taken care of.
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
  $username = mysqli_real_escape_string($mysqli, trim($request['file']['username']));
  $data = trim($request['file']['text']);
  $filename = trim($request['file']['filename']);
  $lang = trim($request['file']['language']);
  $path = '../users/' . $username . '/' . trim($request['file']['path']) . '/' . $filename . $lang;
  $isAttempt = trim($request['isAttempt']);
  if (file_exists($path)) {
    $myfile = fopen($path, "w");
    fwrite($myfile, $data);
    fclose($myfile);

    $msg = "0";
    clearstatcache();
    echo json_encode($msg);
    exit;
  }
  if(!$isAttempt){
    $sql1 = "SELECT n_files from users where username = '$username'";
    $sql2 = "UPDATE users SET n_files = n_files+1 WHERE username = '$username'";
    $result = mysqli_query($mysqli, $sql1)->fetch_all()[0];

    if ($result[0] >= 10) {
      $msg = "maximum limit(10) reached";
      echo json_encode($msg);
    } else {
      if (mysqli_query($mysqli, $sql2)) {

        $myfile = fopen($path, "w");
        fwrite($myfile, $data);
        fclose($myfile);

        $msg = "1";
        clearstatcache();
        echo json_encode($msg);
      } else {
        http_response_code(404);
      }
    }

  }
  else{
    $myfile = fopen($path, "w");
    fwrite($myfile, $data);
    fclose($myfile);

    $msg = "1";
    clearstatcache();
    echo json_encode($msg);
  }


}
?>
