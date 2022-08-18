<?php

/*! \file
This script deletes a given code file, or a directory in the user's workspace, given its path.
This file also communicates with the MySQL Server to update n_files(file count) of the user, to enforce the maximum limit of 10 files.
Hence SQL Injection is taken care of.
Deleting a directory deletes all contained files.
*/

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

include_once("database.php");
$postData = file_get_contents("php://input");

if (isset($postData) && !empty($postData)) {

  $request = json_decode($postData, true);
  $isFile = trim($request['isFile']);
  $nFiles = trim($request['nFiles']);
  if($isFile){
    $username = mysqli_real_escape_string($mysqli, trim($request['file']['username']));
    $filename = trim($request['file']['filename']);
    $lang = trim($request['file']['language']);
    $path = '../users/' . $username . '/' . trim($request['file']['path']) . '/' . $filename . $lang;

    $exec_path = '../user_execs/' . $username . '/' . trim($request['file']['path']) . '/' . $filename;

    if(strcmp($lang, '.java') == 0)
    {
      $exec_path = $exec_path . '.class';
    }

    if (unlink($path)) {
      $sql = "UPDATE users SET n_files=n_files-1 WHERE username = '$username'";
      mysqli_query($mysqli,$sql);
      $msg = "file successfully deleted";
      echo json_encode($msg);
      if (file_exists($exec_path) && is_file($exec_path)) {
        unlink($exec_path);
      }
    }
    else{
      http_response_code(404);
    }
    exit;
  }
  $username = trim($request['username']);
  $dirname = trim($request['file']['name']);
  $path = '../users/' . $username . '/' . trim($request['file']['path']) . '/' . $dirname;
  $sql = "UPDATE users SET n_files=n_files-" . "$nFiles" . " WHERE username = '$username'";
  mysqli_query($mysqli,$sql);
  $exec_path = '../user_execs/' . $username . '/' . trim($request['file']['path']) . '/' . $dirname;

  $ret_stat = 0;
  system('rm -r ' . $path, $ret_stat);
  system('rm -r ' . $exec_path);
  if ($ret_stat === 0) {
    $msg = "directory successfully deleted";
    echo json_encode($msg);
  }
  else {
    http_response_code(404);
  }
}
?>
