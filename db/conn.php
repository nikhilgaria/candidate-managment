<?php 
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect('localhost', 'root', '', 'test');
if (!$conn) {
    echo "gettng isue on db connection";
    die;
}