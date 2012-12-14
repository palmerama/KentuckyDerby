<?

include_once ("data.php");
$conn = mysql_connect($db_host,$db_user,$db_pass);
mysql_select_db($db_name,$conn);

$level = $_GET['level'];
$sql = "SELECT * FROM $db_table WHERE level='$level' ORDER BY score ASC LIMIT 0,10";
$result = mysql_query($sql);

$html = "<table id='highscorestable'>";


for($id = 0; $id < mysql_num_rows($result); $id++)
{
    $row = mysql_fetch_assoc($result);
    $name = $row["name"];
	$time = $row["time"];

	$num = $id+1;
	$html = $html."<tr><td>".$num.".</td><td>".$name."</td><td>".$time."</td></tr>";
}


$html = $html."</table>";

echo "$html";

mysql_close ($conn);

?>