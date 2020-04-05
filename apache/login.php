<?php
//数据库信息

	$db_hostname = "localhost";
	$db_database = "wxface";
	$db_username = "root";
	$db_password = "zhangyimysql";
	//连接MYSQL数据库
	$conn = mysqli_connect($db_hostname,$db_username,$db_password,$db_database);
	mysqli_query($conn,"set names 'utf8mb4'");

?>
