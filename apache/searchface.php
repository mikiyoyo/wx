<?php
/**
 * 发起http post请求(REST API), 并获取REST请求的结果
 * @param string $url
 * @param string $param
 * @return - http response body if succeeds, else false.
 */
function getphoto($name)
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
    if(!move_uploaded_file($tmp,$filepath.$name)){

        echo "上传失败";
    }
    //$unlink($filepath.$name);
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
if(isset($_FILES)&&isset($_GET['name']))
{
    $name = $_GET['name'];
    $name = preg_replace('/[^\w]/', '', $name);
    $image = getphoto($name);
}
else  
{
    die('no name or file');
}

$token = '24.5802fc03593b8f0b734ff1ff122e51c4.2592000.1553935878.282335-15649270';
$url = 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' . $token;
/*$bodys = "{\"image\":\"027d8308a2ec665acb1bdf63e513bcb9\",\"image_type\":\"FACE_TOKEN\",\"group_id_list\":\"group_repeat,group_233\",\"quality_control\":\"LOW\",\"liveness_control\":\"NORMAL\"}"*/
$bodys["image"] = $image;
$bodys["image_type"] = "BASE64";
$bodys["group_id_list"] ="group_repeat";
$bodys["quality_control"] = "LOW";
$bodys["liveness_control"] = "NONE";

$res = request_post($url, $bodys);
$res = json_decode($res,true);
$user_list = $res['result']['user_list'][0];
$user_info = $user_list['user_info'];
$user_score = $user_list['score'];
//var_dump( $user_list);
if($user_score>60)
echo json_encode($user_info);
else
echo "fail"
?>