<?php
/**
 * 发起http post请求(REST API), 并获取REST请求的结果
 * @param string $url
 * @param string $param
 * @return - http response body if succeeds, else false.
 */
function getphoto($userid)
{
    $tmp = $_FILES['file']['tmp_name'];
    //上传图片临时文件
    $type = $_FILES['file']['type'];  
    $filepath = '/data/www/default/photo/';

    /*$fil = compact('type','filepath');
    var_dump($fil);*/
    $file = file_get_contents($tmp);
    $image =base64_encode($file);
//echo '--------------------------------';
    if(!move_uploaded_file($tmp,$filepath.$userid)){
        echo "上传失败";
    }
    unlink($filepath.$userid);
    return $image;

}


function request_post($url = '', $param = '')
{
    if (empty($url) || empty($param)) {
        return false;
    }

    $postUrl = $url;
    $curlPost = json_encode($param);
    // 初始化curl
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $postUrl);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    // 要求结果为字符串且输出到屏幕上
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    // post提交方式
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
    // 运行curl
    $data = curl_exec($curl);
    curl_close($curl);

    return $data;
}

//main
if(isset($_FILES)&&isset($_GET['userid']))
{
    $userid = $_GET['userid'];
    $user_info = $userid;
    $userid = preg_replace('/[^\w]/', '', $userid);
    //$userid = strtr($userid,'\'','');
    //echo $userid;
    $image = getphoto($userid);
}
else  
{
    die('no name or file');
}
$token = '24.5802fc03593b8f0b734ff1ff122e51c4.2592000.1553935878.282335-15649270';
$url = 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' . $token;

/*$bodys = "{\"image\":\"027d8308a2ec665acb1bdf63e513bcb9\",\"image_type\":\"FACE_TOKEN\",\"group_id\":\"group_repeat\",\"user_id\":$userid,\"user_info\":\"abc\",\"quality_control\":\"LOW\",\"liveness_control\":\"NORMAL\"}";*/

/*var_dump($userid);
var_dump('123');
var_dump($_GET['name']);*/


$bodys["image"] = $image;
$bodys["image_type"] = "BASE64";
$bodys["group_id"] ="group_repeat";
$bodys["user_id"] = $userid;
$bodys["user_info"] = $user_info;
$bodys["quality_control"] = "LOW";
$bodys["liveness_control"] = "NONE";
/*$o = "";
foreach ( $bodys as $k => $v ) 
{ 
    $o.= "$k=" . urlencode( $v ). "&" ;
}
$bodys = substr($o,0,-1);*/



//var_dump($bodys);
$res = request_post($url, $bodys);
$res = json_decode($res,true);
$error_code = $res['error_code'];
if($error_code === 0)
echo json_encode('success');
else 
echo 'no'
?>




