<?php

/*! \file
This is the default script to connect with the MySQL server in the backend. 

*/
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-Type: application/json; charset=UTF-8");

    $db_host = 'localhost';
    $db_username = 'root';
    $db_password = '';
    $db_name = 'ssl_database';
    $mysqli = new mysqli($db_host, $db_username, $db_password,$db_name);

    if ($mysqli->connect_error) {
        die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
    }
?>
