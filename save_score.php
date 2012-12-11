<?

echo "save score...";

include_once ("data.php");
$conn = mysql_connect($db_host,$db_user,$db_pass);
mysql_select_db($db_name,$conn);

$name = $_GET['name'];
$score = $_GET['score'];
$time = $_GET['time'];

$sql = "INSERT INTO $db_table (name,score,time) VALUES (\"$name\",\"$score\",\"$time\")";
$result = mysql_query($sql);

mysql_close ($conn);

?>