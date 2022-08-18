<?php

/*! \file
This script uses the username and file path in the user's workspace to return the contents in the requested file (code file).
If the file path is not found on the server, a 404 HTTP error is raised.
*/

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$postData = file_get_contents("php://input");
$postData = json_decode($postData, true);

$uname = $postData['username'];
$f_path = $postData['file_path'];

$path = "../users/" . $uname . "/" . $f_path;

if(file_exists($path))
{
    echo json_encode(file_get_contents($path));
}

else
{
    http_response_code(404);
}

?>