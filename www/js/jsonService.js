angular.module('JsonServices', [])

.constant('JSON_LOCAL_FILES', {
	PT_MEET_DETAIL: 'json/pt_meet.json',
	PT_MEET_DATA: 'json/pt_meet_data.json',
	PT_MEET_INDEX: 'json/pt_meet_index.json',
	PT_MEET_LIST: 'json/pt_meet_list.json',
	PT_NEWS_LIST: 'json/pt_news_list.json',
	PT_NEWS_DATA: 'json/pt_news_data.json'
})

.service('readJsonService', function($http, $q, JSON_LOCAL_FILES) {

	var getLocalJsonData = function(JSON_LOCAL_FILES) {
		var deferred = $q.defer(); // 声明延后执行， 表示要去监控后面的执行
		$http.get(JSON_LOCAL_FILES).success( function(data) {
			deferred.resolve(data); // 声明执行成功， 即http请求数据成功，可以返回数据了
			console.log(data);
			// return data;
		}).error( function(data, status, header, config) {
			deferred.reject(data); // 声明执行失败，即服务器返回错误
		})
		return deferred.promise; // 返回承诺，这里不是最终数据，而是访问最终数据的API
	};

	return {
		getLocalJsonData: getLocalJsonData
	};
})

.service('webRequest', function($http, $q) {
	var getWechatUserInfo = function(code) {
		var deferred = $q.defer();
		$http.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx9a2d4679eed0ae8b" +
			"&secret=d1d3713bfdd11b0a658c192d4594d1ad&code=" + code + 
			"&grant_type=authorization_code", {'Content-Type':'application/json'}).success( function(data) {
				$http.get("https://api.weixin.qq.com/sns/userinfo?access_token=" + data.access_token +
					"&openid=" + data.openid + "&lang=zh_CN", {'Content-Type':'application/json'}).success( function(data) {
						deferred.resolve(data);
					}).error( function(data, status, header, config) {
						deferred.reject(data);
						console.log("Failed: " + data)
					})
				// deferred.resolve(data);
			}).error( function(data, status, header, config) {
				deferred.reject(data);
				console.log("Failed: " + data)
			})
			return deferred.promise;
	};

	return {
		getWechatUserInfo: getWechatUserInfo
	}
})