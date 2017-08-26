import React, {Component}  from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import '../stylesheets/ui.scss'
import '../stylesheets/js-offcanvas.css'
import 'bootstrap'


export default class Menus extends Component {	
	SearchBox() {
		$('nav .search').addClass('active');
			  $('nav .search').animate({
			    width: 288
			  }, 0, function() {
				$(document).mouseup(function(e) {
				    var container = $("nav .search");
				    if (!container.is(e.target) && container.has(e.target).length === 0) {
				        container.removeClass('active');
				        container.css('width','50px');
				}
			});
		});
	}
	componentDidMount() {
		$( "form" ).submit(function( event ) {
			event.preventDefault();
			window.location = "/#/search#?" + $("#buscar").val();
		})
	}
	render() {
		return(
			<section className="bg-primary">
				<div className="container">	     
				    <nav className="navbar navbar-default">
						  <div className="container-fluid">
						  	 <Link to="/" className="navbar-brand" title="Fictícia Vídeos" alt="Fictícia Vídeos"></Link>
						    <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
						      <ul className="nav navbar-nav navbar-right">
						      	<li className="search" onClick={this.SearchBox}>
							  		<form>
							  			<div className="input-group stylish-input-group">
							  				<label htmlFor="buscar" className="label-buscar"></label>
							  					<input type="text" className="form-control hideme" id="buscar" placeholder="Buscar" />
							            		<span className="input-group-addon">
							                    	<button className="button-search" type="submit"></button>
							                    </span>
							        	</div>
							    	</form>
							  	</li>
						        <li className="dropdown">
					          		<a href="#off-canvas" className="dropdown-toggle js-offcanvas-trigger navbar-toggle collapsed" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						          		<span className="text-menu">Menu</span>
				 						<span className="icon-bar"></span>
				 						<span className="icon-bar"></span>
				 						<span className="icon-bar"></span>
				 					</a>
						          
						          <ul className="dropdown-menu">
						            <li><Link to="/" className="destaques" href="#">Destaques</Link></li>
						            <li><Link to="/AllList" className="videos" href="#">Vídeos</Link></li>
						          </ul>
						        </li>
						      </ul>
						    </div>
						</div>
					</nav>
				</div>
			</section>
		)
	}
}

	
