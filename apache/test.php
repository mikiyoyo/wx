<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = 'root';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass,'wxface');
if(mysqli_connect_errno($conn) )
{
   echo "please try again!";
   echo "Could not connect: ". mysqli_connect_error();
   exit;
}
mysqli_query($conn,"set character set 'utf8'");
mysqli_query($conn,"set names 'utf8'");
mysqli_select_db($conn,'database');
var_dump($conn);
mysqli_close($conn);


?>