<?php

function sign()
{
    //echo "insign()";
    require_once("login.php");
    $userid = $_POST['userid']; 
    $sname = $_POST['sname']; 
    $snum = $_POST['snum'];
    //负责人
    $location = $_POST['location'];
    $activity_name = $_POST['activity'];
    $longitude = $_POST['longitude'];
    $latitude = $_POST['latitude'];
    //打卡人注册人脸后发送信息
    $hasface = $_POST['hasface'];



    if (!empty($sname&&$snum)) {  
        //打卡人注册
        $sql1 = "select * from worker where useid = '$userid'";  
        $result = mysqli_query($conn, $sql1);  
        $result = mysqli_fetch_assoc($result);

        if($result==null){
            $sql2 = "insert into worker(userid,name,number) values ('$userid','$sname','$snum')";  
            mysqli_query($conn, $sql2);
            echo json_encode("success");

        }else{
            echo "已经注册过了";
        }  
    }
    elseif(!empty($location&&$activity_name)){
        //echo $userid.$location.$activity_name;
        //负责人注册

        $sql3 = "insert into add_activities(userid,aname,location,longitude,latitude,stime) values ('$userid','$activity_name','$location','$longitude','$latitude',Now())";  
        mysqli_query($conn, $sql3);
        //echo json_encode("success"); 

        //创建活动考勤情况表
        $insertId = mysqli_insert_id($conn);
        if(!$insertId) die('no insertId');
        //$table_name = $activity_name.$insertId;
        //echo $table_name;
        $sql4 = "CREATE TABLE `$insertId`(
            `userid` VARCHAR(50) NOT NULL,
            `name` VARCHAR(50) NOT NULL,
            `number` VARCHAR(50) NOT nULL,
            `atime` DATETIME NOt NULL
        )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        $res = mysqli_query($conn,$sql4);
        if(!$res) 
        {
            var_dump(mysqli_error_list($conn));
            //die("not creat list table");
            echo json_encode('fail');
        }
        else
        echo $insertId;

    }
    elseif(!empty($hasface))
    {
        $sql5 = "update worker set sign_face = true where userid = '$userid'";
        $result = mysqli_query($conn,$sql5);
        if($result)
        echo json_encode("success");
        else
        echo mysqli_error($conn);

    }
    mysqli_close($conn);
}
if(isset($_POST['userid']))
sign();
else
echo "no userid";

?>