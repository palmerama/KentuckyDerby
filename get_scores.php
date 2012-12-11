<?

include_once ("data.php");
$conn = mysql_connect($db_host,$db_user,$db_pass);
mysql_select_db($db_name,$conn);

$sql = "SELECT * FROM $db_table ORDER BY score ASC LIMIT 0,10";
$result = mysql_query($sql);

$html = "<table id='highscorestable'>";


for($id = 0; $id < mysql_num_rows($result); $id++)
{
    $row = mysql_fetch_assoc($result);
    $name = $row["name"];
	$time = $row["time"];

	$html = $html."<tr><td>".$id.".</td><td>".$name."</td><td>".$time."</td></tr>";
}


$html = $html."</table>";

echo "$html";

mysql_close ($conn);

?>