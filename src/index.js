import React from 'react'
import { render } from 'react-dom'
import { Destaque } from './components/Destaque'
import { SearchResults } from './components/SearchResults'
import { AllList } from './components/AllList'
import { Router, Route, hashHistory } from 'react-router'
import { Top, Oooppsss404 } from './components/'

window.React = React

render(
	<Router history={hashHistory}>
		<Route component={Top}>
			<Route path="/" component={Destaque} />
			<Route path="search" component={SearchResults} />
			<Route path="alllist" component={AllList} />
		</Route>
		<Route path="*" component={Oooppsss404} />
	</Router>,
	document.querySelector('#react-container')
)