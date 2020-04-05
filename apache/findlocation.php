<?php

if(isset($_POST['actid']))
findlocation();
else
echo "no actid";

function findlocation()
{
    //echo "test12";
    require_once('login.php');
    $actid = $_POST['actid'];
    $sql = "select * from add_activities where actid = $actid";
    $res =  mysqli_query($conn,$sql);
    $res = mysqli_fetch_assoc($res);
    $longitude = $res['longitude'];
    $latitude = $res['latitude'];
    echo $longitude.'|'.$latitude;

    $err = mysqli_error_list($conn);
    if($err)
    var_dump($err);
}
?>