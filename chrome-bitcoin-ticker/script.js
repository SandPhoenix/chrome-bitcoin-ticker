function sleep (seconds) {
    var start = new Date().getTime();
    while (new Date() < start + seconds*1000) {}
    return 0;
}

chrome.browserAction.setBadgeBackgroundColor({color:[47, 72, 130,255]});
chrome.alarms.create("",{
	periodInMinutes:1,
	when: Date.now()
});

chrome.alarms.onAlarm.addListener(function () {
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "http://api.coindesk.com/v1/bpi/currentprice.json", false);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var result = (Math.round(JSON.parse(xhr.responseText)["bpi"]["USD"]["rate_float"]*10)/10).toString().slice(0,5);

			chrome.browserAction.getBadgeText({}, function (badge) {
				if (badge != result) {
					if (parseFloat(badge) > parseFloat(result)){
						chrome.browserAction.setBadgeBackgroundColor({color:[216, 20, 29,255]});		
					}else{
						chrome.browserAction.setBadgeBackgroundColor({color:[70, 198, 162,255]});
					}
					chrome.browserAction.setBadgeText({text: result});
					sleep(0.5);
					chrome.browserAction.setBadgeBackgroundColor({color:[47, 72, 130,255]});
				}
			});
		}
	};
	xhr.send();
});
chrome.browserAction.setBadgeBackgroundColor({color:[47, 72, 130,255]});
