<?php
	//$url_string = $_SERVER['QUERY_STRING'];
	//$url_string = html_entity_decode($url_string); //decode url
	//parse_str($url_string, $output);
	//
	// echo '<pre>';
	// print_r($output);
	// echo '</pre>';

	date_default_timezone_set('Europe/Oslo');
	require "include/mysql_con.php";
	// require "request-headers.php";
	/*$maxAgeSeconds = 0;
	function validateDate($date)
	{
    	$d = DateTime::createFromFormat('Y-m-d', $date);
		return $d && $d->format('Y-m-d') == $date;
	}
	if ($output["date"] && validateDate($output["date"])) {
		// Date i URL - skal caches! På sikt skal vi få headerbasert caching...
		$maxAgeSeconds = 60*60*24*365;
	}*/
	//header('Cache-Control: max-age='.$maxAgeSeconds);
?>
<script>
    (function(doc) {
		var isMobile = (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()));
		var isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
        var viewport = document.getElementById('viewport');
        if (viewport!=null) {
        if ( isMobile) {
            viewport.setAttribute("content", "width=320px, user-scalable=no");
        } else {
            viewport.setAttribute("content", "width=device-width, user-scalable=no");
        }
        } else {
	        // viewport is null!!!
        }
    }(document));
</script>

<script type="text/javascript">
				<?php
		/*if ($output["date"] && validateDate($output["date"])) {
			// Date from URL
			$date = $output["date"];
			echo "console.log('".$date." from url!');\n";
		} else if ($issueDate!="") {
			// Date from IVY headers
			$date = $issueDate;
			$customerId = $output["customerId"];
			if ($customerId) {
				// Add 1 day for Bergens Tidende
				if ($customerId == "bt") {
					$date = date('Y-m-d',strtotime($date."+1 days"));
					echo "console.log('(1 extra day added for Bergens Tidende)');\n";
				}
			}
			echo "console.log('".$date." from header!');\n";
		} else {
			// Fallback: use today's date minus 3 hours */
			$date = date("Y-m-d", strtotime('-3 hour'));
			echo "console.log('".$date." from fallback!');\n";
		//}


		$result = mysqli_query($con,"SELECT id, difficulty, puzzle, solution FROM sudoku WHERE date = '".$date."' ORDER BY difficulty LIMIT 3");

		if (mysqli_num_rows($result)!=3) {
			
			echo "var sudokudate = \"2014-08-11\";\n";
			echo "var sudokudata = [{\"Puzzle\":\"907310000650840003001005004080100000009700435000000600000000000070900061000400980\",\"Solution\":\"947312856652849173831675294485136729169728435723594618598261347274983561316457982\"},{\"Puzzle\":\"040095010000400907900708004430000500056000700809000061000809470000070000000061000\",\"Solution\":\"743695218685412937912738654437126589156983742829547361261859473598374126374261895\"},{\"Puzzle\":\"790004680000070000000000005030090070000081000800046050040000830000000090380500104\",\"Solution\":\"792154683518673249463829715136295478954781362827346951645912837271438596389567124\"},{\"KeyString\":\"testKey0\"}];";
		} else {
			echo "var sudokudate = \"".$date."\";\n";
			
			// echo "var sudokudata = [";
			$i = 0;
			$puz;
			$sol;
			while($row = mysqli_fetch_array($result))  {
				if ($i==0) {
					$puz = $row[2];
					$sol = $row[3];
				}
				// echo "{\"Puzzle\":\"".$row[2]."\",\"Solution\":\"".$row[3]."\"}";
				if ($i<2) {
				//	echo ",";
				}
				$i +=1;
			}
			// echo ",{\"KeyString\":\"testKey0\"}];"; 
			
			$easyfication = (date("d")+0) % 5;
			// echo "\nvar easyfication = ".$easyfication.";";
			echo "\nvar sudokudata = [";
			//012345678 0
			//901234567 1
			//890123456 2
			//789012345 3
			//678901234 4
			//567890123 5
			//456789012 6
			//345678901 7
			//234567890 8
			$extras = array(0,2,3,4,5,6,8,18,26,27,31,35,36,39,41,44,45,49,53,54,62,72,74,75,76,77,78,80);
			if ($easyfication==1) {
				$extras = array(0,1,2,4,6,7,8,9,10,16,17,18,26,36,44,54,62,63,64,70,71,72,73,74,76,78,79,80);
			} else if ($easyfication==2) {
				$extras = array(13,20,21,22,23,24,29,30,31,32,33,37,38,39,41,42,43,47,48,49,50,51,56,57,58,59,60,67);
			} else if ($easyfication==3) {
				$extras = array(0,1,2,3,5,6,7,8,11,15,19,21,22,23,25,36,37,38,42,43,44,57,58,59,72,73,74,75,77,78,79,80);
			} else if ($easyfication==4) {
				$extras = array(1,2,3,4,5,6,9,10,11,12,13,18,19,20,21,27,28,29,30,36,37,45,54,62,70,71,78,79,80);
			}
				for ($j=0; $j<sizeof($extras); $j++) {
					$puz[$extras[$j]] = $sol[$extras[$j]];
				}
				echo "{\"Puzzle\":\"".$puz."\",\"Solution\":\"".$sol."\"}";
				echo ",";
				echo "{\"Puzzle\":\"".$puz."\",\"Solution\":\"".$sol."\"}";
				echo ",";
				echo "{\"Puzzle\":\"".$puz."\",\"Solution\":\"".$sol."\"}";

			echo ",{\"KeyString\":\"testKey0\"}];\n";
		}
		echo "SCRT = {};\n";
			echo "SCRT.game_id = \"nojo\";\n";
		$lang = "no";
		$customerId = 'superblink';
		$logo = "/wp-content/themes/superblink2/sudoku/gfx/".$customerId."_logo.png";
		$favicon = "/wp-content/themes/superblink2/sudoku/gfx/".$customerId.".ico";
		$css = "/wp-content/themes/superblink2/sudoku/css/".$customerId.".css";
		$logo = "/wp-content/themes/superblink2/sudoku/gfx/".$customerId."_logo.svg";						
		echo "\nvar sudokulang = \"no\";\n";
		
		echo "var sudokuInApp = false;\n";
	?>
</script>
<?php echo "<link rel='icon' href='".$favicon."' type='image/x-icon'>"; ?>
<link href="/wp-content/themes/superblink2/sudoku/css/sudoku.css" rel="stylesheet" type="text/css">
<script src="/wp-content/themes/superblink2/sudoku/js/lib/sweet-alert.min.js"></script>
<link rel="stylesheet" href="/wp-content/themes/superblink2/sudoku/css/sweet-alert.css">
<?php echo "<link href='".$css."' rel='stylesheet' type='text/css'>"; ?>


<div id="ivySudoku">
	<header id="header">
		<nav class="clearfix">
			<span class="client_logo">
				<?php echo "<img src=\"".$logo."\"/>"; ?>
			</span>
			<div class="alignright level">
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
			<button class="alignright status">Hjelp</button>
			<button class="alignright restart">Omstart</button>
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
	<script src="/wp-content/themes/superblink2/sudoku/js/optimized.js?cache42133dds"></script>

</div>
