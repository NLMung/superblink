<?php
 $referer = "";
 $issueId = "";
 $issueDate = "";
 $issueTitle = "";
 $articleId = "";
 $appId = "";
 $appVersion = "";
 $deviceModel = "";
 $deviceIdentifier = "";
 $deviceOS = "";
 $deviceOSVersion = "";
 $deviceType = "";
 /*foreach (getallheaders() as $name => $value) {
    echo "$name: $value\n";

}
exit;
*/

$debug = "";

foreach (getallheaders() as $name => $value) {
   	if (strtolower($name)=="ivy-referer-info") {
      	$debug = $debug."ivy-referer-info OK | ".$value." | ";
	  	//$debug = $debug."".mb_detect_encoding($str)." | ";
	   	$hdr = json_decode(utf8_encode($value),true);
	   	$referer = $hdr["referer"];
	   	$issueId = $hdr["issueId"];
	   	$issueDate = $hdr["issueDate"];
	   	$debug = $debug."issueDate ".$issueDate." | issueTitle ".$issueTitle." | ";
	   	$issueTitle = $hdr["issueTitle"];
	   	$articleId = $hdr["articleId"];
   	} else if (strtolower($name)=="ivy-device-info") {
      	$debug = $debug."ivy-device-info OK | ";
   		$hdr = json_decode(utf8_encode($value),true);
	   	$appId = $hdr["appId"];
	   	$appVersion = $hdr["appVersion"];
	   	$deviceModel = $hdr["deviceModel"];
	   	$deviceIdentifier = $hdr["deviceIdentifier"];
	   	$deviceOS = $hdr["deviceOS"];
	   	$deviceOSVersion = $hdr["deviceOSVersion"];
	   	$deviceType = $hdr["deviceType"];
   	}
   }
?>
