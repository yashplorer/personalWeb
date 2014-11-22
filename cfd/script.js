window.twttr = (function (d, s, id) {
  var t, js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src= "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
}(document, "script", "twitter-wjs"));

window.onload = myFunciton();
function myFunciton(){
    $(document).ready(function() {
        //$("#result").load("http://google.com/index.html .petitions");
        $.ajax({
            type: 'GET',
            beforeSend: function (request) {
                request.setRequestHeader('OAuth oauth_consumer_key', 'EuVlyU51BNnCZEmEouJ2dYt28');
                request.setRequestHeader('oauth_nonce', '10b1798348cf195704813a1a22456b33');
                request.setRequestHeader('oauth_signature', '4DHZwqn03itLFUxErewaq3vfSGk%3D');
                request.setRequestHeader('oauth_signature_method','HMAC-SHA1');
                request.setRequestHeader('oauth_timestamp', '1416646360');
                request.setRequestHeader('oauth_token', '1455459518-1dGAa428AdiKgZqUSW2VBcQ7s2TC87fuk9vCSmC');
                request.setRequestHeader('oauth_version', '1.0');
                request.setRequestHeader('Access-Control-Allow-Origin', 'http://yashplorer.com');
            },
            url: 'https://api.twitter.com/1.1/search/tweets.json' + '?q=' + '%23EllenCANHelpSMHS%20%23smhscfd%20smhscfd%20%22cfd%22',
            success: function(tweets){
                $('p').append(tweets.statuses.id);
            }
        });
    });
}