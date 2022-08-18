<?php

/**  \file
* This script registers a user using a username, password, name, and email. 
* This script communicates with the MySQL server to save user data.
* Passowrd is hashed, and SQL injection is taken care of.
* The process of registering involves -
* 1. An insert operation into the users table, in the database.
* 2. Creation of directories, required to store files, executables and question attempts made by the user.

* Returns a 404 error if username already exists.
*/

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

include_once("database.php");

/** \cond */
$postData = file_get_contents("php://input");
/** \endcond */

if (isset($postData) && !empty($postData)) {


    $request = json_decode($postData); /** \brief POST data decoded. */

    $name = trim($request->name);
    $pwd = password_hash(mysqli_real_escape_string($mysqli, trim($request->pwd)), PASSWORD_DEFAULT);
    $email = mysqli_real_escape_string($mysqli, trim($request->email));
    $username = mysqli_real_escape_string($mysqli, trim($request->username));
    $sql = "INSERT INTO users(name,password,email,username) VALUES ('$name','$pwd','$email','$username')";
    $sql1 = "INSERT INTO users(n_files,img_url,n_attempts,correct_timeline,rating) VALUES (0,'https://bain.design/wp-content/uploads/2014/08/People-Avatar-Set-Rectangular-12.jpg',0,'[]',0)";

    if ($mysqli->query($sql) === TRUE) {
        $authData = [
            'name' => $name,
            'pwd' => $pwd,
            'email' => $email,
            'id' => mysqli_insert_id($mysqli),
            'username' => $username
        ];
        mkdir('../users/' . $authData['username'], 0777, true);
        mkdir('../users/' . $authData['username'] . "/attempts", 0777, true);
        mkdir('../user_execs/' . $authData['username'] . "/temp_sfcode_139213617964", 0777, true);
        mkdir('../user_execs/' . $authData['username'] . "/attempts", 0777, true);
        $mysqli->query($sql1);
        echo json_encode($authData);
    }

    else {
        echo "mysqli_error($mysqli)";
    }
}
?>
