<?php
	header('P3P: CP="CAO PSA OUR"');
	session_start(); 
	$v1 = 7;
	$v2 = 106;
	$v3 = 200;
	if (isset($_SESSION['sb2userid'])) {
		$user_id = $_SESSION['sb2userid'];
		
		include "../../sb2_db.php";
		$fl = friendsList($con,$_SESSION['sb2userid']);
		$c = count($fl);
		$v1 = $fl[rand(0,$c-1)];
		$v2 = $fl[rand(0,$c-1)];
		if ($v2==$v1) {
			$v2 = $fl[rand(0,$c-1)];
		}
		if ($v2==$v1) {
			$v2 = $fl[rand(0,$c-1)];
		}
		$v3 = $fl[rand(0,$c-1)];
		if ($v3==$v1 || $v3==$v2) {
			$v3 = $fl[rand(0,$c-1)];
		}
		if ($v3==$v1 || $v3==$v2) {
			$v3 = $fl[rand(0,$c-1)];
		}
	} else {
		$user_id = 0;
	}
	?>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="minimal-ui">
    <title>Superblink - Den lamme</title>
	<link href='../style.css' rel='stylesheet' type='text/css'>
    <!-- script type="text/javascript" src="finnkrybben.min.js" charset="utf-8"></script-->
    <script>
	    var user_id = <?php echo $user_id; ?>;
	    var v1 = <?php echo $v1; ?>;
	    var v2 = <?php echo $v2; ?>;
	    var v3 = <?php echo $v3; ?>;
	    </script>
    <script type="text/javascript" src="denlamme.js" charset="utf-8"></script>
    <script type="text/javascript" src="funGrid0963.js" charset="utf-8"></script>
    <script type="text/javascript" src="funTouch06.js" charset="utf-8"></script>
    <script type="text/javascript" src="funKeys03.js" charset="utf-8"></script>
    <script type="text/javascript" src="/wp-content/themes/superblink2/js/superload12.js" charset="utf-8"></script>

    <script>
    var scale=1;
    var viewportScale=1;
    if (window.devicePixelRatio === 2) {
        // Retina
        scale = 2;
        if (window.screen.width===768 && window.screen.height===1024) {
            // iPad
            if (window.innerHeight>window.innerWidth) {
                // Portrait
                viewportScale = 1.2;
            } else {
                // Landscape
                viewportScale = 0.9;
            }     
        } else {
          scale = 2;
          viewportScale = 0.5;
        }
    } else if (window.innerWidth>=960 && window.innerHeight>=424) {
        // Non retina big screen
        scale = 2;
    }
    // override - alltid scale 2:
    scale = 2;
    
    document.write("<meta name=\"viewport\" content=\"initial-scale="+viewportScale+" maximum-scale="+viewportScale+" user-scalable=0 minimal-ui\" />");
     </script>

</head>
<body onload="DL.init(scale);" bgcolor = "#000000">
    <span style=""><script>document.write("<canvas id=\"canvas\" width=\""+(scale*480)+"\" height=\""+(scale*212)+"\">"+"No canvas support!"+"</canvas>");</script></span>
    <div class="clear"></div>
	<a href="/kategori/spill/mobilspill/" class="rounded_link">‹ Tilbake</a>
	<!--br><a href="."><img src="/wp-content/themes/superblink2/img/sblogo.png"></a-->
	<!--div id="spilleliste"><button onclick="DL.visListe();">Logg</button></div-->
	
</body>
</html>