import React, {Component}  from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from 'FTEllipsis'


export default class AllListPrimario extends Component {	
	componentDidMount() {
			function format(num){
			    var n = num.toString(), p = n.indexOf('.');
			    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
			        return p<0 || i<p ? ($0+'.') : $0;
			    });
			}
	    	var ytkey = 'AIzaSyB6TDiesYuXK36ogjLqcC5myC6MKACe9Uo';
            youtubeApiCall();
            $("#load-more-videos").on( "click", function( event ) {
                $('.load').show();
                $("#load-more-videos").hide();
                $("#pageToken").val($("#load-more-videos").val());
                youtubeApiCall();
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
                    $.each(items, function(index,e) {
                        videoList = videoList + '<li class="videos" data-desc="'+ e.snippet.description +'" data-toggle="modal" data-target="#myModal" data-theVideo="'+e.id+'" data-title="'+e.snippet.title+'" data-views="'+format(e.statistics.viewCount)+'" data-publication="'+YTConvertDate(e.snippet.publishedAt)+'"><div class="video-img"><img src="'+e.snippet.thumbnails.default.url+'"/><span>'+YTDurationToSeconds(e.contentDetails.duration)+'</span></div><div class="ellipsis"><h3 class="video-title">'+e.snippet.title+'</h3></div><span class="video-icon-views">'+format(e.statistics.viewCount)+' views</span></li>'
                    });
                    $("#video-nav").append(videoList);
                    tools();
                });
            }
            tools();
            function tools() {
				var forEach = Array.prototype.forEach;
				var els = document.getElementsByClassName('ellipsis');
				forEach.call(els, function(el) {
					var ellipsis = new Ellipsis(el);
					ellipsis.calc();
					ellipsis.set();
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
                    {maxResults:12,pageToken:$("#pageToken").val()}),
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
                    
					$('#myModal').on('show.bs.modal', function (event) {
						var button = $(event.relatedTarget);
						var title = button.data('title');
						var views = button.data('views');
						var publication = button.data('publication');
						var description = button.data('desc');
						var text = button.data('text');
						var thevideo = button.data('thevideo')
						var text = button.data('text');
						var modal = $(this);
						modal.find('h4').text(title);
						$('.tips').remove();
						$('#video-info h4').after('<span data-toggle="tooltip" data-placement="top" title="'+ views + ' views" class="tips video-info-views" /><span data-toggle="tooltip" data-placement="top" title="'+ publication + '" class="tips video-info-date" />');
						
						modal.find('.video-info-text-desc').text(description);
						$('#youtube-destaque iframe').attr('src','https://www.youtube.com/embed/' + thevideo + '?autoplay=1');

						modal.find('.close').click(function () {
							$('#youtube-destaque iframe').attr('src', '');
						});
						$(document).click(function (e) {
							if (e.target === $('#myModal')[0] && $('body').hasClass('modal-open')) {
								$('#youtube-destaque iframe').attr('src', '');
							}
						})
						$('[data-toggle="tooltip"]').tooltip({ placement:"auto"})
               		 });
            });			
		}
	}
	render() {
		return(
			<div>
				<div id="youtube-thumbs">
		     		<div id="video-info" className="results">
		     			<ul id="video-nav" className="scrollbar" />
		     		</div>
		     		<button id="load-more-videos" className="limited">CARREGAR MAIS VÍDEOS...</button>
		     		<div className="load">
		     			<img src="../assets/images/loader.gif" width="22" alt="loading" title="loading" />
		     		</div>
		     	</div>
		     	<div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			        <div className="vertical-alignment-helper">
			          <div className="modal-dialog vertical-align-center">
			            <div className="modal-content">
			              <div className="modal-header">
			                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span>
			                </button>
			              </div>
			              <div className="modal-body">
			                <div id="youtube-destaque">
			                  <iframe width="100%" height="350" src="" frameBorder="0" allowFullScreen />
			                </div>
			                <input type="hidden" id="pageToken" value="" />
			                <div id="video-info">
			                  <h4 />
			                  <div className="video-info-text-expandable">
			                    <p className="video-info-text-desc" />
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			    </div>
	     	</div>
		)
	}
}
