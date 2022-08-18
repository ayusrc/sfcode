<?php

/*! \file
This script returns the code files present in a user's workspace, but doesn't account for directories and sub-directories.
This script is obselete because of the script dir_tree.php, which returns the directory tree of the user's workspace.
*/

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");


$postData = file_get_contents("php://input");
$postData = json_decode($postData, true);

$uname = $postData['username'];

$dir = "../users/" . $uname;
$contents = scandir($dir);
$f_list = array();

foreach ($contents as $fname)
{
    $ext = pathinfo($fname, PATHINFO_EXTENSION);
    
    if((strcmp($ext, "java") == 0) || (strcmp($ext, "cpp") == 0) || (strcmp($ext, "py") == 0))
    {
        array_push($f_list, $fname);
    }
}

echo json_encode($f_list);
?>