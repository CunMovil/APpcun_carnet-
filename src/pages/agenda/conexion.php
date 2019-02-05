<?php
$servername = "app.cun.edu.co";
$database = "sistema_de_notas";
$username = "appcun2";
$password = "lO7]}MZR(}Md";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
mysqli_close($conn);
?>