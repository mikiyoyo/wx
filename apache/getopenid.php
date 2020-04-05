<?php
function get_openid()
{
    $code = $_GET['code'];
    $secret = "db532e1822602d0ab406b4e90c1e70ab";
    $appid = "wx20258e8a9416706a";


    $url = "https://api.weixin.qq.com/sns/jscode2session?appid=wx20258e8a9416706a&secret=db532e1822602d0ab406b4e90c1e70ab&js_code=". $code . "&grant_type=authorization_code";
    $info = file_get_contents($url);//发送HTTPs请求并获取返回的数据，推荐使用curl
    echo json_encode($info);
    }
    if(isset($_GET['code']))
    {
        get_openid();
    }
    else
    echo "no code";

?>
