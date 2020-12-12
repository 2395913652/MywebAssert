<?php
$nameId=$_POST["nameId"];
$number=$_POST["number"];
$password=$_POST["password"];
echo "账号是：",$number;
echo "密码是：",$password;
$conn=new mysqli("8.131.97.70:3306","root",".Wyj2458941097","demo");
if($conn->connect_error){
    die("连接失败".$conn->connect_error);
}
echo("<br>success<br>");
$sql="insert into bzls(nameId,number,password) values('".$nameId."','".$number."','".$password."')";
echo $sql;
if($conn->query($sql)===true){
    echo "<br>success";
}
?>