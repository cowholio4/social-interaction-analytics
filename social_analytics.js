// Track Social Actions to Google Analytics
// Resources:
//  https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingSocial#facebook
//  https://dev.twitter.com/docs/intents/events

/* Facebook */
window.fbAsyncInitTracking = function() {

  FB.Event.subscribe('edge.create', function(targetUrl) {
      _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
  });
  
  FB.Event.subscribe('edge.remove', function(targetUrl) {
      _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
  });
  
  FB.Event.subscribe('message.send', function(targetUrl) {
      _gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
  });
};

/* Twitter */
function track_tweet(intent_event) {
  if (intent_event) {
    var opt_pagePath;
    if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
      var opt_target = extractParamFromUri(intent_event.target.src, 'url');
    }
    _gaq.push(['_trackSocial', 'twitter', 'tweet', opt_pagePath]);
  }
}

function track_follow( event ) {
  var followed_user_id = event.data.user_id;
  var followed_screen_name = event.data.screen_name;
  _gaq.push(['_trackSocial', 'twitter', 'follow', followed_screen_name ]);
}

function track_retweet( event ) {
  var retweeted_tweet_id = event.data.source_tweet_id;
  _gaq.push(['_trackSocial', 'twitter', 'retweet', retweeted_tweet_id]);
}
function track_favorite( event ) {
  var favorited_tweet_id = event.data.tweet_id;
  _gaq.push(['_trackSocial', 'twitter', 'favorite', favorited_tweet_id]);
}

//Wrap event bindings - Wait for async js to load
twttr.ready(function (twttr) {
  //event bindings
  twttr.events.bind('tweet', track_tweet);
  twttr.events.bind('follow', track_follow );
  twttr.events.bind('retweet', track_retweet );
  twttr.events.bind('favorite', track_favorite );

});


function extractParamFromUri(uri, paramName) {
  if (!uri) {
    return;
  }
  var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
  var params = regex.exec(uri);
  if (params != null) {
    return unescape(params[1]);
  }
  return;
}
