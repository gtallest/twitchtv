$(document).ready(function(){

var twitchStreams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","cashnastygaming","testytesty","brunofin","comster404","mega64podcast"];

var streamArray = [];

twitchStreams.forEach(function(user){
var stream = $.getJSON('https://api.twitch.tv/kraken/streams/' + user + '?callback=?');
var channel = $.getJSON('https://api.twitch.tv/kraken/channels/' + user + '?callback=?');

$.when(stream, channel).done(function(streamData, channelData){
var data = {};
if(channelData[0].display_name == null){
data.name = user;
var nameHTML = '<div class="username">' + data.name + '</div>';
}
else {
data.name = channelData[0].display_name;
var nameHTML = '<div class="username"><a href="https://www.twitch.tv/' + user + '" target="_blank">' + data.name + '</a></div>';
}
if(streamData[0].stream == null){
if(streamData[0].status == 422){
  data.status = "Channel does not exist.";
  data.online = 'offline';
}
else {
  data.status = "Offline";
  data.online = 'offline';
}

}
else {
data.status = streamData[0].stream.channel.status;
data.online = 'online';
}
if(channelData[0].logo == null){
data.logo = '';
var logoHTML = '';
}
else {
data.logo = channelData[0].logo;
var logoHTML = '<img src="' + data.logo + '">';
}


streamArray.push(data);

var streamerHTML = '<div class="streamer  ' + data.online + '"><div class="avatar">' + logoHTML + '</div>' + nameHTML + '<div class="status">' + data.status + '</div></div>';
$('#streamer-list')[0].insertAdjacentHTML('beforeend',streamerHTML);
});
});



//var apiURL = 'https://api.twitch.tv/kraken/streams?channel=' + commaSeparated + '&callback=?';
/*
twitchStreams.forEach(function(user){

$.getJSON('https://api.twitch.tv/kraken/channels/' + user + '?callback=?', function(data) {

if(data.error){

alert(data.message);
}
else {
console.log(data.logo);
}
});
});


var streams = $.getJSON(apiURL, function(data) {
var resultData = data;
var streams = resultData["streams"];
for(var i = 0; i < streams.length; i++){

}

});
*/


$('#all-filter').on('click',function(){
$(this).addClass('filter-active');
$('#online-filter').removeClass('filter-active');
$('#offline-filter').removeClass('filter-active');
$('.online').show();
$('.offline').show();
});
$('#online-filter').on('click',function(){
$(this).addClass('filter-active');
$('#all-filter').removeClass('filter-active');
$('#offline-filter').removeClass('filter-active');
$('.online').show();
$('.offline').hide();
});
$('#offline-filter').on('click',function(){
$(this).addClass('filter-active');
$('#online-filter').removeClass('filter-active');
$('#all-filter').removeClass('filter-active');
$('.online').hide();
$('.offline').show();
});

});