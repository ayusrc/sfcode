<?php

/*! \file
This script compiles a given code file (except python code files) for a user using the compiler correponding to the language
of the code file, using system() function.
Returns an error if there is a compilation error.
*/

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$postData = file_get_contents("php://input");
$postData = json_decode($postData, true);

$uname = $postData['username'];
$filename = $postData['filename'];
$f_path = $postData['path'];
$language = $postData['language'];

$ret_stat = 0;

if(strcmp($language, ".cpp") == 0)
{
    if(!file_exists("../user_execs/" . $uname . "/" . $f_path))
    {
        mkdir("../user_execs/" . $uname . "/" . $f_path , 0777, true);
    }
    system("g++ ../users/" . $uname . "/" . $f_path . "/" . $filename . ".cpp -o ../user_execs/" . $uname . "/" . $f_path . "/" . $filename , $ret_stat);
    if($ret_stat != 0)
    {
        unlink("../user_execs/" . $uname . "/" . $f_path . "/" . $filename);
        throw new Exception("Compilation Error!");
    }
}

else if(strcmp($language, ".java") == 0)
{
    if(!file_exists("../user_execs/" . $uname . "/" . $f_path))
    {
        mkdir("../user_execs/" . $uname . "/" . $f_path , 0777, true);
    }

    system("javac -d ../user_execs/" . $uname . "/" . $f_path . "/ ../users/" . $uname . "/" . $f_path . "/" . $filename . '.java', $ret_stat);

    if($ret_stat != 0)
    {
        unlink("../user_execs/" . $uname . "/" . $f_path . "/" . $filename . ".class");
        throw new Exception("Compilation Error!");
    }
}

echo $ret_stat;
?>
