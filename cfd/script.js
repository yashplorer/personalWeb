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
            type: 'POST';
            
            url: 'https://api.twitter.com/oauth/request_token';
        });
        $.ajax({
            var type = 'GET';
            var base = 'https://api.twitter.com/1.1/search/tweets.json';
                        
            var parameters = [
                {'q':                       '#EllenCANHelpSMHS #smhscfd smhscfd "cfd"'},
                {'include_entities':        true},
                {'oauth_consumer_key':      'EuVlyU51BNnCZEmEouJ2dYt28'},
                {'oauth_nonce':             stringGen(32)},
                {'oauth_signature_method':  'HMAC-SHA1'},
                {'oauth_timestamp':         Date.now()},
                {'oauth_token':             '1455459518-1dGAa428AdiKgZqUSW2VBcQo7s2TC87fuk9vCSmC'},
                {'oauth_version':           1.0}
            ]
            parameters.sort();

            var o = ""; //output string
            for(var i in parameters){
                if(!parameters.hasOwnProperty(i)) continue;
                o += (escape(i) + '=' + escape(parameters[i]));
                if(i != parameters[Object.keys(parameters)[Object.keys(parameters).length - 1]]) o += '&';
            }

            var sigBase = createsSigBase(type, base, o);

            type: type,
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', '
                    OAuth oauth_consumer_key="",
                    oauth_nonce             ="",
                    oauth_signature         ="",
                    oauth_signature_method  ="", 
                    oauth_timestamp         ="",
                    oauth_token             ="",
                    oauth_version           =""
                ')
                //request.setRequestHeader('OAuth oauth_consumer_key', 'EuVlyU51BNnCZEmEouJ2dYt28');
                //request.setRequestHeader('oauth_nonce', '10b1798348cf195704813a1a22456b33');
                //request.setRequestHeader('oauth_signature', '4DHZwqn03itLFUxErewaq3vfSGk%3D');
                //request.setRequestHeader('oauth_signature_method','HMAC-SHA1');
                //request.setRequestHeader('oauth_timestamp', '1416646360');
                //request.setRequestHeader('oauth_token', '1455459518-1dGAa428AdiKgZqUSW2VBcQ7s2TC87fuk9vCSmC');
                //request.setRequestHeader('oauth_version', '1.0');
                //request.setRequestHeader('Access-Control-Allow-Origin', 'http://yashplorer.com');
            },
            url: base + '?q=' + escape(parameters.q),
            success: function(tweets){
                $('p').append(tweets.statuses.id);
            }
        });
    });
}
function stringGen(len) {
    var text = " ";
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for( var i=0; i < len; i++ ) text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}
function createsSigBase(type, uri, parameters){
    return type + '&' + escape(uri) + '&' + escape(parameters);
}