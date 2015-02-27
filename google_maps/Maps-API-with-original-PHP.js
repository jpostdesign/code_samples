//Google Maps APIv3, JavaScript and PHP by Jason Post, jpost-design.com
// See working example at http://jpost-design.com/#interactive-map

var openMapIcon = {
    url: 'img/web_design/map-open-icon.png',
    size: new google.maps.Size(24, 24),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(5, 24)
  };

var seasonalMapIcon = Object.create(openMapIcon);
  seasonalMapIcon.url = 'img/web_design/map-open-icon.png';
  seasonalMapIcon.anchor = new google.maps.Point(-8, 36);
      
var closedMapIcon = Object.create(openMapIcon);
  closedMapIcon.url = 'img/web_design/map-closed-icon.png';
  closedMapIcon.anchor = new google.maps.Point(21, 24);

 var center = null;
 var map = null;
 var currentPopup;
 var bounds = new google.maps.LatLngBounds();
 
 //added iconType to make more DRY
 function addMarker(iconType, lat, lng, html) {
   var iconType = iconType;
	 var pt = new google.maps.LatLng(lat, lng);
	 bounds.extend(pt);
	var marker = new google.maps.Marker({
			 position: pt,
			 icon: iconType,
			 map: map
		 });
		 
	var popup = new google.maps.InfoWindow({
		 content: html,
		 maxWidth: 250
	 });
	
	google.maps.event.addListener(marker, "click", function() {
		 if (currentPopup != null) {
			 currentPopup.close();
			 currentPopup = null;
		 }
		 popup.open(map, marker);
		 currentPopup = popup;
	});
	 google.maps.event.addListener(popup, "closeclick", function() {
	 currentPopup = null;
	 });
 }

 function initialize() {
	 map = new google.maps.Map(document.getElementById("google-map"), {
		 center: new google.maps.LatLng(37.7945928242851, -121.81365966796875),
		 zoom: 8,
		 mapTypeId: google.maps.MapTypeId.ROADMAP,
		 mapTypeControl: false,
		 mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
		 },
		 navigationControl: true,
		 navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL
		}
	});

	// extracting and looping through data
		 
<?php  //Initialize database
	echo " //<![CDATA[\n";
	$cnty= strip_tags($_GET["cnty"]);
	$day= strip_tags($_GET["day"]);
	$today_date=date("Y-m-d"); 

	if ($day == "0")
	{
		$listtype = "DAY";
	}
	elseif ($day == "7")
	{
		$listtype = "DY7";
	}
	elseif (empty($cnty) AND empty($day))
	{
		$listtype = "ALL";
	}
	elseif (!empty($cnty) AND empty($day))
	{
		$listtype = "CTY";
	}
	elseif (empty($cnty) AND !empty($day))
	{
		$listtype = "DAY";
	}
	else
	{
		$listtype = "TWO";
	}
	include 'connectionSettings.inc'; 
	mysql_connect("localhost",$login,$password); 
	@mysql_select_db($database) or die( "Unable to select database"); 
	
	$mySQLmapquerySelect = "market.market_id, market.market_name, market_day.marketday_latitude, market_day.marketday_longitude, market_day.marketday_start, market_day.marketday_end, TIME_FORMAT(market_day.marketday_starttime, '%l:%i %p') AS marketday_starttime, TIME_FORMAT(market_day.marketday_endtime, '%l:%i %p') AS marketday_endtime,  market_day.marketday_day, market.market_facebook FROM market, market_day";
	
	$mySQLmapqueryWhereBeforeAnd = "market.market_id=market_day.marketday_marketid";

if (($listtype == "ALL") OR ($listtype == "DY7"))
	{
		$mapquery="SELECT $mySQLmapquerySelect WHERE $mySQLmapqueryWhereBeforeAnd AND market.market_inactive<>'Y' ORDER BY market_day.marketday_start DESC";
	}
	elseif ($listtype == "CTY")
	{
		$mapquery="SELECT $mySQLmapquerySelect WHERE $mySQLmapqueryWhereBeforeAnd AND market_county = '$cnty' AND market.market_inactive<>'Y' ORDER BY market_day.marketday_start DESC";
	}
	elseif ($listtype == "DAY")
	{
		$mapquery="SELECT $mySQLmapquerySelect WHERE $mySQLmapqueryWhereBeforeAnd AND market_day.marketday_day = '$day' AND market.market_inactive<>'Y' ORDER BY market_day.marketday_start DESC";
	}
	else
	{
		$mapquery="SELECT $mySQLmapquerySelect WHERE $mySQLmapqueryWhereBeforeAnd AND market_county = '$cnty' AND market_day = '$day' AND market.market_inactive<>'Y' ORDER BY market_day.marketday_start DESC";
	}
	
	$mapresult=mysql_query($mapquery);
	$mapnum=mysql_numrows($mapresult);
	$latarray = array();
	$longarray = array();
	$a=0;
	while ($a < $mapnum)
	{
		$market_latitude=mysql_result($mapresult,$a,"marketday_latitude");
		$market_longitude=mysql_result($mapresult,$a,"marketday_longitude");
		if ($market_latitude!="" AND $market_latitude!=0)
		{
			$latarray[$a]=$market_latitude;
			$longarray[$a]=$market_longitude;
		}
		++$a;
	}
	
	$market_facebook=mysql_result($mapresult,$m,"market_facebook");
			if (($market_facebook=="") OR ($market_facebook=="NULL"))
			{
				$market_facebook_link="";
			}
			else {
				$market_facebook_link="<p class=\"facebookLink\"><a class=\"gmapInfoWindow\" href=\"http://www.facebook.com/$market_facebook\" target=\"_top\"><img src=\"images/facebook_logo_tiny.png\" width=\"16\" height=\"16\" alt=\"Facebook logo\" />&nbsp;Facebook Page</a></p>";
			}
	
	 	mysql_close();
	$closednum=0;
	$m=0;
	while ($m < $mapnum)
	{
		$marketday_start=mysql_result($mapresult,$m,"marketday_start");
		$marketday_end=mysql_result($mapresult,$m,"marketday_end");
		$seastartdate=date("Y-m-d",strtotime("$marketday_start"));
		$seaenddate=date("Y-m-d",strtotime("$marketday_end"));
		$comparedate=date("Y-m-d",strtotime("$today_date"));
		$market_name=mysql_result($mapresult,$m,"market_name");
		$market_namestrip=str_replace(" Farmers' Market", "", "$market_name");
		$market_id=mysql_result($mapresult,$m,"market_id");
		$start_time=mysql_result($mapresult,$m,"marketday_starttime");
		$end_time=mysql_result($mapresult,$m,"marketday_endtime");
		$startdate=date("F j, Y",strtotime("$marketday_start"));
		$enddate=date("F j, Y",strtotime("$marketday_end"));
		$marketday_day=mysql_result($mapresult,$m,"marketday_day");
		$days = array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");

		$market_facebook=mysql_result($mapresult,$m,"market_facebook");
			if (($market_facebook=="") OR ($market_facebook=="NULL"))
			{
				$market_facebook_link="";
			}
			else {
				$market_facebook_link="<p class=\"facebookLinkAPIv3\"><a class=\"gmapInfoWindowAPIv3\" href=\"http://www.facebook.com/$market_facebook\" target=\"_top\"><img src=\"images/facebook_logo_tiny.png\" width=\"16\" height=\"16\" alt=\"Facebook logo\" />&nbsp;Facebook Page</a></p>";
			}
		
		$market_latitude=mysql_result($mapresult,$m,"marketday_latitude");
		$market_longitude=mysql_result($mapresult,$m,"marketday_longitude");
 
			if ($marketday_start=="") {
				echo "addMarker(openMapIcon, $market_latitude, $market_longitude,'<div class=\"gmapInfoWindowAPIv3Container\"><a class=\"gmapInfoWindowAPIv3 marketNameAPIv3\" href=\"market_home.php?market_id=$market_id\">$market_namestrip</a>$market_facebook_link<dl class=\"gmapInfoWindowAPIv3\"><dt class=\"gmapInfoWindowAPIv3\">Season</dt><dd class=\"gmapInfoWindowAPIv3\">Year-Round</dd><dt class=\"gmapInfoWindowAPIv3\">$days[$marketday_day]</dt><dd class=\"gmapInfoWindowAPIv3\">$start_time to $end_time</dd></dl><p class=\"gmapInfoWindowAPIv3\"><a class=\"gmapInfoWindowAPIv3\" href=\"/market_directions.php?market_id=$market_id&amp;market_day=$marketday_day\">Get directions...</a></p></div>');\n";
			} elseif ($seastartdate<=$comparedate AND $seaenddate>=$comparedate) {
				echo "addMarker(seasonalMapIcon, $market_latitude, $market_longitude,'<div class=\"gmapInfoWindowAPIv3Container\"><a class=\"gmapInfoWindowAPIv3 marketNameAPIv3\" href=\"market_home.php?market_id=$market_id\">$market_namestrip</a>$market_facebook_link<dl class=\"gmapInfoWindowAPIv3\"><dt class=\"gmapInfoWindowAPIv3\">Season</dt><dd class=\"gmapInfoWindowAPIv3\">$startdate to $enddate</dd><dt class=\"gmapInfoWindowAPIv3\"> $days[$marketday_day]</dt><dd class=\"gmapInfoWindowAPIv3\">$start_time to $end_time</dd></dl><p class=\"gmapInfoWindowAPIv3\"><a class=\"gmapInfoWindowAPIv3\" href=\"/market_directions.php?market_id=$market_id&amp;market_day=$marketday_day\">Get directions...</a></p></div>');\n";
			} else {
				echo "addMarker(closedMapIcon, $market_latitude, $market_longitude,'<div class=\"gmapInfoWindowAPIv3Container\"><a class=\"gmapInfoWindowAPIv3 marketNameAPIv3 closedMarket\" href=\"market_home.php?market_id=$market_id\">$market_namestrip</a>$market_facebook_link<dl class=\"gmapInfoWindowAPIv3\"><dt class=\"gmapInfoWindowAPIv3\">Season</dt><dd class=\"gmapInfoWindowAPIv3\">$startdate to $enddate</dd><dt class=\"gmapInfoWindowAPIv3\"> $days[$marketday_day]</dt><dd class=\"gmapInfoWindowAPIv3\">$start_time to $end_time</dd></dl><p class=\"gmapInfoWindowAPIv3 closedSeason\">Closed for the season.</p></div>');\n";
			}
	
	++$m;
 }
 echo "//]]>\n";
 echo"	center = bounds.getCenter();\n";  
	 ?>; 
	 }