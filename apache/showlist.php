<?php
if(isset($_POST['actid']))
showlist();
else
echo "no actid";

function showlist()
{
    //echo "test3 ";
    require_once('login.php');
    $actid = $_POST['actid'];
    //var_dump($actid);
    $sql = "select * from `$actid` order by atime desc";
    $res = mysqli_query($conn,$sql);
    $err =  mysqli_error_list($conn);
    class Slist{
        public $name;
        public $number;
        public $atime;
        }
$data = array();
if (mysqli_num_rows($res) > 0) {
while($row = mysqli_fetch_assoc($res)) {
    $wlist=new Slist();
    $wlist->name=$row["name"];
    $wlist->number=$row["number"];
    $wlist->atime=$row["atime"];
    
    $data[] = $wlist;

    }
    echo json_encode($data,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);//将请求结果转换为json格式
    }
    else 
    echo "wrong";
    if($err)
    var_dump($err);
}
?>