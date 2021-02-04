<?php
	date_default_timezone_set('Europe/Oslo');
	require "include/mysql_con.php";
	require "request-headers.php";
	$maxAgeSeconds = 0;
	function validateDate($date)
	{
    	$d = DateTime::createFromFormat('Y-m-d', $date);
		return $d && $d->format('Y-m-d') == $date;
	}
	if (isset($_GET["date"]) && validateDate($_GET["date"])) {
		// Date i URL - skal caches! På sikt skal vi få headerbasert caching...
		$maxAgeSeconds = 60*60*24*365;
	}
	header('Cache-Control: max-age='.$maxAgeSeconds);
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="Content-type" value="text/html; charset=UTF-8" />
		<meta id="viewport" name='viewport'>
		<!-- Turn off telephone number detection. -->
	    <meta name = "format-detection" content = "telephone=no">
		<script>
		    (function(doc) {
				var isMobile = (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()));
				var isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
		        var viewport = document.getElementById('viewport');

		        if ( isMobile) {
		            viewport.setAttribute("content", "width=320px, user-scalable=no");
		        } else {
		            viewport.setAttribute("content", "width=device-width, user-scalable=no");
		        }
		    }(document));
		</script>
		
		<script type="text/javascript">
			<?php
				if (isset($_GET["date"]) && validateDate($_GET["date"])) {
					// Date from URL
					$date = $_GET["date"];
					echo "console.log('".$date." from url!');\n";
				} else if ($issueDate!="") {
					// Date from IVY headers
					$date = $issueDate;
					$customerId = $_GET["customerId"];	
					if (isset($customerId)) {
						// Add 1 day for Bergens Tidende
						if ($customerId == "bt") {
							$date = date('Y-m-d',strtotime($date."+1 days"));
							echo "console.log('(1 extra day added for Bergens Tidende)');\n";
						}
					}
					echo "console.log('".$date." from header!');\n";
				} else {
					// Fallback: use today's date minus 3 hours
					$date = date("Y-m-d", strtotime('-3 hour'));
					echo "console.log('".$date." from fallback!');\n";
				}
				$result = mysqli_query($con,"SELECT id, difficulty, puzzle, solution FROM sudoku WHERE date = '".$date."' ORDER BY difficulty LIMIT 3");

				if (mysqli_num_rows($result)!=3) {
					echo "var sudokudate = \"2014-08-11\";\n";
					echo "var sudokudata = [{\"Puzzle\":\"907310000650840003001005004080100000009700435000000600000000000070900061000400980\",\"Solution\":\"947312856652849173831675294485136729169728435723594618598261347274983561316457982\"},{\"Puzzle\":\"040095010000400907900708004430000500056000700809000061000809470000070000000061000\",\"Solution\":\"743695218685412937912738654437126589156983742829547361261859473598374126374261895\"},{\"Puzzle\":\"790004680000070000000000005030090070000081000800046050040000830000000090380500104\",\"Solution\":\"792154683518673249463829715136295478954781362827346951645912837271438596389567124\"},{\"KeyString\":\"testKey0\"}];";
				} else {
					echo "var sudokudate = \"".$date."\";\n";
					echo "var sudokudata = [";
					$i = 0;
					while($row = mysqli_fetch_array($result))  {
						echo "{\"Puzzle\":\"".$row[2]."\",\"Solution\":\"".$row[3]."\"}";
						if ($i<2) {
							echo ",";
						}
						$i +=1;
					}
					echo ",{\"KeyString\":\"testKey0\"}];";
				}

				$lang = "en";
				$logo = "gfx/ivy_logo.png";
				$css = "css/ivy.css";
				$favicon = "gfx/ivy.ico";
				if (isset($_GET["customerId"])) {
					$customerId = $_GET["customerId"];
					$logo = "gfx/".$customerId."_logo.png";
					$favicon = "gfx/".$customerId.".ico";
					$css = "css/".$customerId.".css";

					if ($customerId=="ap" || $customerId=="fvn" || $customerId=="sa" || $customerId == "bt") {
						$lang = "no";
					}
				}

				if (isset($_GET["lang"])) {
					$lang = $_GET["lang"];
				}
				echo "\nvar sudokulang = \"".$lang."\";\n";
				$inApp = "true";
				if (isset($_GET["inApp"])) {
					$inApp = $_GET["inApp"];
					if ($inApp=="false" || $inApp=="0") {
						$inApp = "false";
					} else {
						$inApp = "true";
					}
				}
				echo "var sudokuInApp = ".$inApp.";\n";
			?>
		</script>
		<?php echo "<link rel='icon' href='".$favicon."' type='image/x-icon'>"; ?>
		<link href="css/sudoku.css" rel="stylesheet" type="text/css">
		<?php echo "<link href='".$css."' rel='stylesheet' type='text/css'>"; ?>
		<script src="js/lib/sweet-alert.min.js"></script>
		<link rel="stylesheet" href="css/sweet-alert.css">
		<title><?php
			$dato = explode("-",$date);
			if ($lang == "no")  {
				echo "DAGENS SUDOKU ";
				echo strtoupper (ltrim($dato[2], '0').".".ltrim($dato[1], '0').".".$dato[0]);
			} else if ($lang=="en") {
				echo "TODAY’S SUDOKU ";
				echo strtoupper (date("M", mktime(0, 0, 0, (int)ltrim($dato[1], '0'), 10))." ".ltrim($dato[2], '0').". ".$dato[0]);
			} else {
				echo "UNKNOWN LANGUAGE ";
				echo strtoupper (ltrim($dato[2], '0').".".ltrim($dato[1], '0').".".$dato[0]);
			}
		?></title>
	</head>
	<body>
		<header id="header">
			<nav class="clearfix">
				<span class="client_logo">
					<?php echo "<img src=\"".$logo."\"/>"; ?>
				</span>
				<div class="alignright">
					<label for="dagens">Select level</label>
					<select id="dagens">
						<?php if ($lang=="no") { ?>
							<option value="0">Lett</option>
							<option value="1">Middels</option>
							<option value="2">Vanskelig</option>
						<?php } else if ($lang=="en" || true) { ?>
							<option value="0">Easy</option>
							<option value="1">Middle</option>
							<option value="2">Hard</option>
						<?php } ?>
					</select>
				</div>
				<button class="alignright status">?</button>
				<button class="alignright restart"></button>
			</nav>
		</header>
		<div id="container" class="clearfix">
			<?php
				error_reporting(E_ALL);

				board();

				function square($id) {
					echo "<div id='s_".$id."' class='square'>\n";
					echo "<div id='s_".$id."_n' class='square_number'></div>\n";
					echo "<div id='s_".$id."_1' class='note'></div>\n";
					echo "<div id='s_".$id."_2' class='note'></div>\n";
					echo "<div id='s_".$id."_3' class='note'></div>\n";
					echo "<div id='s_".$id."_4' class='note'></div>\n";
					echo "<div id='s_".$id."_5' class='note'></div>\n";
					echo "<div id='s_".$id."_6' class='note'></div>\n";
					echo "<div id='s_".$id."_7' class='note'></div>\n";
					echo "<div id='s_".$id."_8' class='note'></div>\n";
					echo "<div id='s_".$id."_9' class='note'></div>\n";
					echo "</div>\n";
				}

				function group($groupId, $startX, $startY) {
					echo "<div id='g_".$groupId."' class='group'>\n";
					square($startX."_".$startY);
					square(($startX+1)."_".$startY);
					square(($startX+2)."_".$startY);
					square($startX."_".($startY+1));
					square(($startX+1)."_".($startY+1));
					square(($startX+2)."_".($startY+1));
					square($startX."_".($startY+2));
					square(($startX+1)."_".($startY+2));
					square(($startX+2)."_".($startY+2));
					echo "</div>\n";
				}

				function board() {
					echo "<div id='board'>\n";
					group(1,1,1);
					group(2,4,1);
					group(3,7,1);
					group(4,1,4);
					group(5,4,4);
					group(6,7,4);
					group(7,1,7);
					group(8,4,7);
					group(9,7,7);
					echo "</div>\n";
				}
			?>
			<div id="keyboard" class="clearfix inactive">
				<div class="square_numbers">
					<?php
						for ($i=1;$i<=9;$i++) {
							echo "<div id='k_s_".$i."' class='square'>\n<div id='k_".$i."_n' class='square_number'>".$i."</div>\n</div>";
						}
					?>
				</div>
				<div class="note_numbers">
					<?php
						for ($i=1;$i<=9;$i++) {
							echo "<div id='k_n_".$i."' class='square'>\n<div id='k_n_".$i."_n' class='note_number'>".$i."</div>\n</div>";
						}
					?>
				</div>
			</div>
			<p id="instruction" class="clear">IVY SUDOKU V1.0</p>
		</div>
		<%= scripts %>
	</body>
</html>
