<?php
/** \file
 * This script creates a new directory as and where, the user wants it to be made.
 * Returns 0 in case a directory with the same name and path already exists.
 * Returns 1 in case of a succesful operation.
 */
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$postData = file_get_contents("php://input");

if (isset($postData) && !empty($postData)) {
  $request = json_decode($postData, true);
  $username = $request['username'];
  $dirname = $request['dirname'];
  $path = "../users/" . $username . "/" . $request['path'] . "/" . $dirname;

  if (file_exists($path)) {
    $msg = "0";
    clearstatcache();
    echo json_encode($msg);
  } else {
    mkdir($path, 0777, true);
    $path = "../user_execs/" . $username . "/" . $request['path'] . "/" . $dirname;
    mkdir($path, 0777, true);
    echo json_encode("1");
    clearstatcache();
  }

}
?>
