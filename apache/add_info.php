<?php
if(isset($_POST['actid'])&&isset($_POST['userid']))
add_info();
else
echo 'lack of information';

function add_info()
{
    //echo "test8";
    require_once("login.php");
    $actid = $_POST['actid'];
    $userid = $_POST['userid'];
    $sql1 = "select * from worker where userid = '$userid';";
    $res = mysqli_query($conn,$sql1);
    $res = mysqli_fetch_assoc($res);
    
    $name = $res['name'];
    $number = $res['number'];
    $sql2 = "insert into `$actid` (userid,name,number,atime) values('$userid','$name','$number',NOW())";
    $res2 = mysqli_query($conn,$sql2);
     //var_dump($res2);

    $err = mysqli_error_list($conn);
    if($err)
    var_dump($err);
    else
    echo "ok";

    
}
?>