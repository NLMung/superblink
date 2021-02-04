<?php
	$con=mysqli_connect("superblink-prod.ceovy3wgfsgu.eu-west-1.rds.amazonaws.com","produser","L3!8P03zeqIS","superblink");
	if (mysqli_connect_errno($con)) {
		die("Failed to connect to MySQL: " . mysqli_connect_error());
	}
?>
