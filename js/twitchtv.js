$(document).ready(function(){

//The Array of Twitch Streams
var twitchStreams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","cashnastygaming","testytesty","brunofin","comster404","mega64podcast"];

//Ignore:
//var streamArray = [];

//For each stream in the Array
twitchStreams.forEach(function(user){

//Promises for stream data and channel data
var stream = $.getJSON('https://api.twitch.tv/kraken/streams/' + user + '?callback=?');
var channel = $.getJSON('https://api.twitch.tv/kraken/channels/' + user + '?callback=?');

//Wait until both promises are complete, then assign data
$.when(stream, channel).done(function(streamData, channelData){

  var data = {};

  //If the display name is null (channel does not exist), use the user value from the twitchStreams array as the username.
  if(channelData[0].display_name == null){
  data.name = user;
  var nameHTML = '<div class="username">' + data.name + '</div>';
  }
  else {
  data.name = channelData[0].display_name;
  var nameHTML = '<div class="username"><a href="https://www.twitch.tv/' + user + '" target="_blank">' + data.name + '</a></div>';
  }

  //If the stream value is null, check status. If status is 422, then the stream was deleted / does not exist. Else the stream is offline.
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
  //If stream is not null, then assign to status the stream's current status, and mark as online.
  else {
  data.status = streamData[0].stream.channel.status;
  data.online = 'online';
  }
  //If the channel logo value returns null, the image HTML will be blank. Else create the HTML for the logo image.
  if(channelData[0].logo == null){
  data.logo = '';
  var logoHTML = '';
  }
  else {
  data.logo = channelData[0].logo;
  var logoHTML = '<a href="https://www.twitch.tv/' + user + '" target="_blank"><img src="' + data.logo + '"></a>';
  }

  //Ignore:
  //streamArray.push(data);

  //Create the HTML using user data for the current stream and add to stream list.
  var streamerHTML = '<div class="streamer  ' + data.online + '"><div class="avatar">' + logoHTML + '</div>' + nameHTML + '<div class="status">' + data.status + '</div></div>';
  $('#streamer-list')[0].insertAdjacentHTML('beforeend',streamerHTML);
});

});


//Manages logic for the "All", "Online", "Offline" filters.
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

//Logic for the info button and project description.
//Keep track of initialTop and currentTop for responsive design.
//$('#project-description').css('top') will vary depending on screen size.
var initialTop = $('#project-description').css('top').split("p")[0];
var currentTop = $('#project-description').css('top').split("p")[0];
$('#info-button').on('click',function(){
  if(currentTop <= -365){
    $('#project-description').css('top','0');
    currentTop = 0;
    $('#info-button').css({'background':'white','color':'#7f52d2','transform':'rotate(90deg)'});
  }
  else {
    $('#project-description').css('top',initialTop + 'px');
    currentTop = initialTop;
    $('#info-button').css({'background':'#6441a5','color':'white','transform':'rotate(0deg)'});
    $('#info-button:hover').css('background','#7f52d2;')
  }
});

});
