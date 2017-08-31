import React, {Component}  from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import Ellipsis from 'FTEllipsis'
import ConvertNumbers from './ConvertNumbers'
import ChannelList from '../services/ChannelList'


export default class DestaquePrimario extends Component {	
	componentDidMount() {
		var desdestaqueInitialLoad = true;
        handleSubmit();

        $("#load-more-videos").on( "click", function( event ) {
            $('.load').fadeIn();
            $("#load-more-videos").hide();
            handleSubmit();
        });
        $( '#video-info' ).click(function() {
			$('#video-info').addClass('opened');
		});
		
		function destaqueInitial(e) {
        	$('#videoDestaque').attr('src','https://www.youtube.com/embed/' + e.id);
        	var destaqueFields = '<h4>'+e.snippet.title+'</h4><span data-toggle="tooltip" data-placement="top" title="' + ConvertNumbers.NumberFormat(e.statistics.viewCount)+' views" class="tips video-info-views"></span><span data-toggle="tooltip" data-placement="top" title="'+ConvertNumbers.NumberConvertDate(e.snippet.publishedAt)+'" class="tips video-info-date"></span><div class="video-info-text-expandable"><p class="video-info-text-desc">'+e.snippet.description+'</p>'
            $("#video-info").html(destaqueFields);  
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
       
        function handleSubmit(e) {
            var pageTokenInput = document.querySelector('#pageToken').value;
            var qtidadeMaxIds = 4;
            ChannelList.listarCanal(qtidadeMaxIds,pageTokenInput).then((response) => {
                var videosId = response.data.items, videosIds = [], nextPageTokenId = response.data.nextPageToken
                videosId.forEach(e => {
                    videosIds.push(e.id.videoId);
                })
                $("#pageToken").val(nextPageTokenId);
                
                ChannelList.listarIds(videosIds.join()).then((response) => {
                    var items = response.data.items, videoList = "";
                    var destaqueFetch = response.data.items[0];
                    console.log(response.data.items)
                    if(desdestaqueInitialLoad){destaqueInitial(destaqueFetch)}
                    response.data.items.forEach(e => {
                    videoList = videoList + '<li data-desc="'+ e.snippet.description +'" data-url="'+ e.id +'" class="videos"  title="' + ConvertNumbers.NumberConvertDate(e.snippet.publishedAt)+'"><div class="video-img"><img src="'+ e.snippet.thumbnails.default.url+'" alt="'+e.snippet.title+'"><span class="durtime">'+ ConvertNumbers.NumberDurationToSeconds(e.contentDetails.duration)+'</span></div><span class="video-title">'+e.snippet.title+'</span><span class="video-icon-views">'+ConvertNumbers.NumberFormat(e.statistics.viewCount)+' views</span></li>';
                    });
                    $("#video-nav").append(videoList);
                    $('[data-toggle="tooltip"]').tooltip({ placement:"auto"})
                    loadVideoContainer()
                    if (typeof nextPageTokenId === "undefined") {
                        $("#load-more-videos").hide();
                        $('.load').hide();
                    }
                    else {
                        $('.load').hide();
                        $("#load-more-videos").fadeIn();
                    }
                })
            })
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
