<?php
/*! \file
This script returns the directory tree of a user's workspace, given the username. It returns a nested array in JSON form, after
using the recursive function called dirToArray().
*/

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$postData = file_get_contents("php://input");
$postData = json_decode($postData, true);

$uname = $postData['username'];

function dirToArray($dir) 
{
  
  $result = array();
  $result["dirs"] = array();
  $result["files"] = array();

  $cdir = scandir($dir);
  foreach ($cdir as $key => $value)
  {
     if (!in_array($value,array(".","..")))
     {
        if (is_dir($dir . DIRECTORY_SEPARATOR . $value))
        {
           $result["dirs"][$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value);
        }
        else
        {
            $ext = pathinfo($value, PATHINFO_EXTENSION);
      
            if((strcmp($ext, "java") == 0) || (strcmp($ext, "cpp") == 0) || (strcmp($ext, "py") == 0))
            {
               array_push($result["files"], $value);
            }
        }
     }
  }
 
  return $result;
}

$Dir = "../users/" . $uname;

echo json_encode(dirToArray($Dir));

?>