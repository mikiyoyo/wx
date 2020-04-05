<?php
function freeback()
{
    $userid = $_POST['userid'];

    require_once("login.php");

    $sql = "select * from worker where userid = '$userid'";
    $result = mysqli_query($conn, $sql);  
    $result = mysqli_fetch_assoc($result);
    if($result == null)
    echo json_encode($result);
    else if($result['sign_face']==false)
    echo json_encode('face');
}
if(isset($_POST['userid']))
freeback();
else
echo "no userid";

?>