// The URL of the Singly API endpoint
var apiBaseUrl = 'https://api.singly.com';

// A small wrapper for getting data from the Singly API
var singly = {
   get: function(url, options, callback) {
      if (options === undefined ||
         options === null) {
         options = {};
      }

      options.access_token = accessToken;

      $.getJSON(apiBaseUrl + url, options, callback);
   }
};

// Runs after the page has loaded
$(function() {
   // If there was no access token defined then return
   if (accessToken === 'undefined' ||
      accessToken === undefined) {
      return;
   }

   $('#access-token').val(accessToken);
   $('#access-token-wrapper').show();

   // Get the user's profiles
   singly.get('/v0/profiles', null, function(profiles) {
      _.each(profiles, function(profile, id) {
         $('#profiles').append(sprintf('<li><strong>Linked profile:</strong> Service: %s, id: %s</li>', id, profile));
      });
   });

   // Get the 5 latest items from the user's Twitter feed
   singly.get('/services/twitter/timeline', { limit: 5 }, function(tweets) {
      _.each(tweets, function(tweet) {
         $('#twitter').append(sprintf('<li><strong>Tweet:</strong> %s</li>', tweet.data.text));
      });
   });
});
