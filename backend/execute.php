<?php

/*! \file
This script uses the username, name of the code file, language of the code file and the input data (test case) and executes the code,
(given that it has already been compiled) using system() function, and returns the output. If the file hasn't been compiled or a runtime error occurs, then
the script raises an exception.
*/

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$postData = file_get_contents("php://input");
$postData = json_decode($postData, true);

$uname = $postData['file']['username'];
$filename = $postData['file']['filename'];
$f_path = $postData['file']['path'];
$language = $postData['file']['language'];
$input_data = $postData['input_data'];

$ret_stat = 0;

$template = strval(rand(1, 1000000));
$in_fname = "../user_execs/" . $uname . "//temp_sfcode_139213617964/temp_in" . $template;

$file = fopen($in_fname, 'w');
file_put_contents($in_fname, $input_data);
fclose($file);

$out_fname = "../user_execs/" . $uname . "//temp_sfcode_139213617964/temp_out" . $template;

if (strcmp($language, ".cpp") == 0) {
  system("./../user_execs/" . $uname . "/" . $f_path . "/" . $filename . " < " . $in_fname . " > " . $out_fname, $ret_stat);
} else if (strcmp($language, ".java") == 0) {
  system("java -cp ../user_execs/" . $uname . "/" . $f_path . "/ " . $filename . " < " . $in_fname . " > " . $out_fname, $ret_stat);
} else if (strcmp($language, ".py") == 0) {
  system("python3 ../users/" . $uname . "/" . $f_path . "/" . $filename . ".py < " . $in_fname . " > " . $out_fname, $ret_stat);
}

if ($ret_stat != 0) {
  unlink($in_fname);
  unlink($out_fname);
  throw new Exception("Runtime Error!");
} else {
  $file = fopen($out_fname, 'r');
  if (filesize($out_fname) == 0) {
    echo json_encode('');
  } else {
    echo json_encode(fread($file, filesize($out_fname)));
  }
  fclose($file);
}

unlink($in_fname);
unlink($out_fname);

?>
