var load = 20;
$(document).ready(function() {
	chrome.storage.local.get({"videoD" : []}, function(result) {
		var baseURI = $('video')[0].baseURI;
		
		if(baseURI in result['videoD']){
			$('video')[0].currentTime=result['videoD'][baseURI];
		}
		
		var count = 0;
		$('video')[0].ontimeupdate = function() {
			if(count=load){
				result[baseURI]=$('video')[0].currentTime;
				chrome.storage.local.set({'videoD': result}, function () {});
				count=0;
			}else{
				count++;
			}
		};


		$('video')[0].onended = function() {
			chrome.storage.local.get({"videoD" : []}, function(result) {
				delete result[baseURI];
				chrome.storage.local.set({'videoD': result}, function () {});
			});
		};
	});
});
