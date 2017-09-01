import React, {Component}  from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from 'FTEllipsis'
import ConvertNumbers from './ConvertNumbers'
import ChannelList from '../services/ChannelList'

export default class AllListPrimario extends Component {	
	componentDidMount() {
        // ConvertNumbers.NumberFormat
        // ConvertNumbers.NumberConvertDate
        // ConvertNumbers.NumberDurationToSeconds
            $("#load-more-videos").on( "click", function( event ) {
                $('.load').fadeIn();
                $("#load-more-videos").hide();
                handleSubmit();
            });
            handleSubmit()
            
            function tools() {
				var forEach = Array.prototype.forEach;
				var els = document.getElementsByClassName('ellipsis');
				forEach.call(els, function(el) {
					var ellipsis = new Ellipsis(el);
					ellipsis.calc();
					ellipsis.set();
				});

            }
            function handleSubmit() {
                var pageTokenInput = document.querySelector('#pageToken').value;
                var qtidadeMaxIds = 12;
                ChannelList.listarCanal(qtidadeMaxIds,pageTokenInput).then((response) => {
                    var videosId = response.data.items, videosIds = [], nextPageTokenId = response.data.nextPageToken
                    videosId.forEach(e => {
                        videosIds.push(e.id.videoId);
                    })
                    $("#pageToken").val(nextPageTokenId);
                    
                    ChannelList.listarIds(videosIds.join()).then((response) => {
                        var items = response.data.items, videoList = "";
                        var destaqueFetch = response.data.items[0];
                        
                        response.data.items.forEach(e => {
                        videoList = videoList + '<li data-desc="'+ e.snippet.description +'" data-url="'+ e.id +'" class="videos"  title="' + ConvertNumbers.NumberConvertDate(e.snippet.publishedAt)+'"><div class="video-img"><img src="'+ e.snippet.thumbnails.high.url+'" alt="'+e.snippet.title+'"><span class="durtime">'+ ConvertNumbers.NumberDurationToSeconds(e.contentDetails.duration)+'</span></div><span class="video-title">'+e.snippet.title+'</span><span class="video-icon-views">'+ConvertNumbers.NumberFormat(e.statistics.viewCount)+' views</span></li>';
                        });
                        $("#video-nav").append(videoList);
                        
                        $('[data-toggle="tooltip"]').tooltip({ placement:"auto"})
                        loadVideoContainer();
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
                tools();
                loadVideoContainer()
            }
            function loadVideoContainer() {
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
