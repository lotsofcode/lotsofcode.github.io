;(function(window) {

	function Tweet(url) {
		this.url = url;
	}

	String.prototype.parseTwitterURL = function() {
		return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
			return url.link(url);
		});
	};
	// test = "Simon Whatley's online musings can be found at: http://www.simonwhatley.co.uk";
	// document.writeln(test.parseURL());

	String.prototype.parseTwitterUsername = function() {
		return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
			var username = u.replace("@","")
			return u.link("http://twitter.com/"+username);
		});
	};
	// test = "@whatterz is writing a post about JavaScript";
	// document.writeln(test.parseUsername());

	String.prototype.parseTwitterHashtag = function() {
		return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
			var tag = t.replace("#","%23")
			return t.link("http://search.twitter.com/search?q="+tag);
		});
	};

	Tweet.prototype.parse = function(string) {
		return this.url.parseTwitterURL()
				.parseTwitterUsername()
				.parseTwitterHashtag()
	}

	// test = "Simon is writing a post about #twitter, #javascript and parsing hashtags as URLs";
	// document.writeln(test.parseHashtag());

	window.Tweet = Tweet;

})(window);
