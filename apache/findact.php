<?php

function find()
{
    require_once('login.php');
    $activity_name = $_POST['activity_name'];
    $sql = "select * from `$activity_name` ";
    $res = mysqli_query($conn,$sql);
    $err = mysqli_error_list($conn);
    if($err)
    {
        $err = $err[0]['error'];
        //echo $err;
        //echo stristr($err,'exist');
        if(strpos($err,'exist'))
        {
           
            echo 'fail';
        }
        else
        echo 'wrong';
    }
    else 
    echo json_encode('ok');
}
if(isset($_POST['activity_name']))
find();
else
echo "no actvity_name";

?>