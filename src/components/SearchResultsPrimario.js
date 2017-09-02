import React, {Component}  from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from 'FTEllipsis'
import ConvertNumbers from './ConvertNumbers'
import ChannelList from '../services/ChannelList'

export default class SearchResultsPrimario extends Component {	
	componentDidMount() {
			var submit = location.href.split('#?');
           	var query = submit[1];
           	var eventsFirstLoad = true;
           	$('#pageToken').val('');
			initialState();
			function initialState() {
				if (eventsFirstLoad == true) {
		            $('.navbar-nav .search').addClass('active');
		            $('.button-search').on('click', function (event) {
		            	$('#pageToken').val('');
						query = $('#buscar').val();
						location.replace('/#/search#?' + query);
						$('#video-info #video-nav').empty();
						$('#copyResults').text(query);
						$('.load').fadeIn();
		                $("#load-more-videos").hide();
		                $(this).off();
					})
					$('form').on('submit', function (event) {
						$('#pageToken').val('');
						location.replace('/#/search#?' + query);
						$('#video-info #video-nav').empty();
						handleSubmit();
						$('#copyResults').text(query);
						$('.load').fadeIn();
		                $("#load-more-videos").hide();
		                $(this).off();
					})
					$('#load-more-videos').on( 'click', function( event ) {
		                $('.load').fadeIn();
		                $('#load-more-videos').hide();
		                handleSubmit();
				    });
					eventsFirstLoad = false;
					handleSubmit();
				}
			}

            function handleSubmit() {
                var pageTokenInput = document.querySelector('#pageToken').value;
                var qtidadeMaxIds = 12;
                ChannelList.pesquisarTerms(qtidadeMaxIds,pageTokenInput,query).then((response) => {
                    var videosId = response.data.items, videosIds = [], nextPageTokenId = response.data.nextPageToken
                    videosId.forEach(e => {
                        videosIds.push(e.id.videoId);
                    })
                    $("#pageToken").val(nextPageTokenId);
                    if (response.data.pageInfo.totalResults == 0) {
                    	$('#youtube-destaque-wrapper h1').html('Nenhum resultado para "' +  query + '"')
                    }
                    else {
                    	$('#youtube-destaque-wrapper h1').html('Mostrando resultados para "' +  query + '"')
                    }
                    ChannelList.listarIds(videosIds.join()).then((response) => {
                        var items = response.data.items, videoList = "";
                        var destaqueFetch = response.data.items[0];
                        response.data.items.forEach(e => {
                        videoList = videoList + '<li class="videos" data-desc="'+ e.snippet.description +'" data-toggle="modal" data-target="#myModal" data-theVideo="'+e.id+'" data-title="'+e.snippet.title+'" data-views="'+ ConvertNumbers.NumberFormat(e.statistics.viewCount)+'" data-publication="'+ ConvertNumbers.NumberConvertDate(e.snippet.publishedAt)+'"><div class="video-img"><img src="'+e.snippet.thumbnails.default.url+'"/><span>'+ ConvertNumbers.NumberDurationToSeconds(e.contentDetails.duration)+'</span></div><div class="ellipsis"><h3 class="video-title">'+e.snippet.title+'</h3></div><span class="video-icon-views">'+ ConvertNumbers.NumberFormat(e.statistics.viewCount)+' views</span></li>'
                        });
                        $("#video-nav").append(videoList);
                        tools()
                        $('[data-toggle="tooltip"]').tooltip({ placement:"auto"})
                        loadVideoContainer();
                        if (typeof nextPageTokenId === "undefined") {
                            $("#load-more-videos").fadeOut();
                            $('.load').fadeOut();
                        }
                        else {
                            $('.load').hide();
                            $("#load-more-videos").fadeIn();
                        }
                    })
                })
                tools()
                loadVideoContainer()
            }

            function tools() {
				var els = document.querySelectorAll('.ellipsis');
				els.forEach(el => {
					var ellipsis = new Ellipsis(el);
					ellipsis.calc();
					ellipsis.set();
				});

            }
            function loadVideoContainer() {
            $('#myModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget);
                var title = button.data('title');
                var views = button.data('views');
                var publication = button.data('publication');
                var description = button.data('desc');
                var text = button.data('text');
                var thevideo = button.data('thevideo');
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
	componentWillUnmount() {
		$('#video-info #video-nav', '#buscar').empty();
		$('form').off();
		$('.button-search').off();
		$( "form" ).submit(function( event ) {
			event.preventDefault();
			window.location = "/#/search#?" + $("#buscar").val();
		});
		$('#pageToken').val('');
	}
	render() {
		return(
			<div>
				<h1 />
				<div>
					<div id="youtube-thumbs" className="expanded">
			     		<div id="video-info" className="results">
			     			<ul id="video-nav" className="scrollbar" />
			     		</div>
			     		
			     		<button id="load-more-videos" className="limited">CARREGAR MAIS RESULTADOS...</button>

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
		    </div>
		)
	}
}