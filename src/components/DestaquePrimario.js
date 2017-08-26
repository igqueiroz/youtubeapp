import React, {Component}  from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import Ellipsis from 'FTEllipsis'

export default class DestaquePrimario extends Component {	
	componentDidMount() {
			function format(num){
			    var n = num.toString(), p = n.indexOf('.');
			    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
			        return p<0 || i<p ? ($0+'.') : $0;
			    });
			}
	    	var ytkey = 'AIzaSyB6TDiesYuXK36ogjLqcC5myC6MKACe9Uo';
            var desdestaqueInitialLoad = true;
            youtubeApiCall();
            $("#load-more-videos").on( "click", function( event ) {
                $('.load').show();
                $("#load-more-videos").hide();
                $("#pageToken").val($("#load-more-videos").val());
                youtubeApiCall();
            });
            $( '#video-info' ).click(function() {
				$('#video-info').addClass('opened');
			});
			
			
            function getVideoDetails(ids){
                $.ajax({
                    cache: false,
                    data: $.extend({
                        key: ytkey,
                        part: 'snippet,contentDetails,statistics'
                    }, {id: ids}),
                    dataType: 'json',
                    type: 'GET',
                    timeout: 5000,
                    fields: "items(id,contentDetails,statistics(viewCount),snippet(publishedAt,channelTitle,channelId,title,description,views,thumbnails(high)))",
                    url: 'https://www.googleapis.com/youtube/v3/videos'
                })
                .done(function(data) {
                    var items = data.items, videoList = "";
                    var destaqueFetch = data.items[0];
					if(desdestaqueInitialLoad){destaqueInitial(destaqueFetch)}
						
                    $.each(items, function(index,e) {
                        videoList = videoList + '<li data-desc="'+e.snippet.description+'" data-url="'+e.id+'" class="videos"  title="'+YTConvertDate(e.snippet.publishedAt)+'"><div class="video-img"><img src="'+e.snippet.thumbnails.default.url+'" alt="'+e.snippet.title+'"><span class="durtime">'+YTDurationToSeconds(e.contentDetails.duration)+'</span></div><span class="video-title">'+e.snippet.title+'</span><span class="video-icon-views">'+format(e.statistics.viewCount)+' views</span></li>';
                    });
                    $("#video-nav").append(videoList);
                    $('[data-toggle="tooltip"]').tooltip({ placement:"auto"})
                    
                    loadVideoContainer()
                });
            }
            
            
            function destaqueInitial(e) {
            	$('#videoDestaque').attr('src','https://www.youtube.com/embed/' + e.id);
            	var destaqueFields = '<h4>'+e.snippet.title+'</h4><span data-toggle="tooltip" data-placement="top" title="'+format(e.statistics.viewCount)+' views" class="tips video-info-views"></span><span data-toggle="tooltip" data-placement="top" title="'+YTConvertDate(e.snippet.publishedAt)+'" class="tips video-info-date"></span><div class="video-info-text-expandable"><p class="video-info-text-desc">'+e.snippet.description+'</p>'
                $("#video-info").html(destaqueFields);
                desdestaqueInitialLoad = false;
                   
            }
            function loadVideoContainer() {
                 $(".videos").click( function(event) {
                    var dataUrl = $(this).attr('data-url');
                    $('#videoDestaque').attr('src','https://www.youtube.com/embed/' + dataUrl);
                    $('.tips').remove();
                    var destaqueFields = '<h4>'+$(this).find('img').attr('alt')+'</h4><span data-toggle="tooltip" data-placement="top" title="'+$(this).find('.video-icon-views').html()+' " class="tips video-info-views"></span><span data-toggle="tooltip" data-placement="top" title="'+$(this).attr('title')+'" class="tips video-info-date"></span><div class="video-info-text-expandable"><p class="video-info-text-desc">'+$(this).attr('data-desc')+'</p>'
                    $("#video-info").html(destaqueFields);
                    $('[data-toggle="tooltip"]').tooltip({ placement:"auto"});
                });
            }
            function YTDurationToSeconds(duration) {
                var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

                var hours = ((parseInt(match[1]) || 0) !== 0)?parseInt(match[1])+":":"";
                var minutes = ((parseInt(match[2]) || 0) !== 0)?parseInt(match[2])+":":"0";
                var seconds = ((parseInt(match[3]) || 0) !== 0)?parseInt(match[3]):"00";
                var total = hours + minutes + seconds;
                return total;
            }

            function YTConvertDate(dates) {
                var date =  dates.split('T');
                date = date[0].split('-');
                if (date[1] == "01") {date[1] =  "Janeiro"};
                if (date[1] == "02") {date[1] =   "Fevereiro"};
                if (date[1] == "03") {date[1] =   "Março"};
                if (date[1] == "04") {date[1] =   "Abril"};
                if (date[1] == "05") {date[1] =   "Maio"};
                if (date[1] == "06") {date[1] =   "Junho"};
                if (date[1] == "07") {date[1] =   "Julho"};
                if (date[1] == "08") {date[1] =   "Agosto"}; 
                if (date[1] == "09") {date[1] =   "Setembro"}; 
                if (date[1] == "10") {date[1] =   "Outubro"};
                if (date[1] == "11") {date[1] =   "Novembro"};
                if (date[1] == "12") {date[1] =   "Dezembro"};
                return date[2] + ' de ' + date[1] + ' de ' + date[0];
            }
            function youtubeApiCall(){
                $.ajax({
                    cache: false,
                    data: $.extend({
                        key: ytkey,
                        part: 'snippet',
                        channelId: 'UCO9XI15xOtOyEWOYpn0whDA'
                    }, 
                    {maxResults:4,pageToken:$("#pageToken").val()}),
                    dataType: 'json',
                    type: 'GET',
                    timeout: 5000,
                    fields: "pageInfo,items(id(videoId)),nextPageToken",
                    url: 'https://www.googleapis.com/youtube/v3/search'
                })
                .done(function(data) {
                    
                    if (typeof data.nextPageToken === "undefined") {
                        $("#load-more-videos").hide();;
                    }
                    else{$("#load-more-videos").show();
                    }
                    var items = data.items, videoids = [];
                    $("#load-more-videos").val(data.nextPageToken);
                    $.each(items, function(index,e) {
                        videoids.push(e.id.videoId);
                    });
                    getVideoDetails(videoids.join());
                    $('.load').hide();
                    
                });
            }  
	}
	render() {
		return(
			<div className="row">
                <div id="youtube-destaque-wrapper" className="col-sm-8">
                  <h1>Vídeo em destaque</h1>
                  <div id="youtube-destaque">
                    <iframe id="videoDestaque" width="100%" height="315" src="" frameBorder="0" allowFullScreen></iframe>
                  </div>
                  <input type="hidden" id="pageToken" value="" />
                  <div id="video-info" className="box-shade" />
                </div>
                <div id="youtube-thumbs" className="col-sm-4">
                  <h1>+ Vídeos</h1>
                  <div id="video-info">
                    <ul id="video-nav" className="scrollbar" />
                    <button id="load-more-videos">CARREGAR MAIS VÍDEOS...</button>
                    <div className="load"><img src="../assets/images/loader.gif" width="22" alt="loading" title="loading" /></div>
                  </div>
                </div>
            </div>
		)
	}
}
