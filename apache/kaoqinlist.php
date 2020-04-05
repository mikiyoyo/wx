<?php
function kaoqinlist()
{
	//echo "kaoqinlist";
    include("login.php");
	$userid=$_POST["userid"];

	$sql = "select * from add_activities where userid='$userid' order by stime desc";

 	mysqli_query($conn, "set names 'utf8mb4'");
	$result = mysqli_query($conn, $sql);
	//echo mysqli_error($result."asdfdsad");
	if($error = mysqli_error($conn))
	echo $error;
	class Article{
        public $actid;
		public $aname;
		public $location;
        public $stime;

	
	}
	$data = array();
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_assoc($result)) {
            $article=new Article();
            $article->actid=$row["actid"];
			$article->aname=$row["aname"];
			$article->location=$row["location"];
			$article->stime=$row["stime"];
			
			$data[] = $article;
			
			}
			echo json_encode($data,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);//将请求结果转换为json格式
            }
}
if(isset($_POST['userid']))
kaoqinlist();
else
echo "no userid";
　　?>