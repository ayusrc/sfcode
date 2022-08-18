<?php

/*! \file
This script is for user login using username and password. Here, we authenticate user credentials with  MySQL server.
Returns a 404 error if username/password is incorrect.
*/

include_once("database.php");
$postData = file_get_contents("php://input");

if (isset($postData) && !empty($postData)) {

    $request = json_decode($postData);
    $pwd = mysqli_real_escape_string($mysqli, trim($request->password));
    $username = mysqli_real_escape_string($mysqli, trim($request->username));
    $sql = "SELECT * FROM users where username='$username'";

    if ($result = mysqli_query($mysqli, $sql)) {
        while ($row = mysqli_fetch_assoc($result)) {
            if (password_verify($pwd, $row['password'])) {
                echo json_encode($row);
                exit;
            }
        }
    }

    http_response_code(404);
}
