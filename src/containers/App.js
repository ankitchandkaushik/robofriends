import React , {Component} from 'react';
//import {robots} from './robots';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
// const state = {
// 	robots : robots,
// 	searchfield : ''
// }

class App extends Component {
	constructor(){
		super()
		this.state = {
			robots : [],
			searchfield : ''
		}
		
	}

	onSearchChange = (event) => {
		this.setState({searchfield : event.target.value})	
		
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users').then(response => {
			return response.json();
		}).then(users =>{
			this.setState({robots : users})
		})
		
		
	}

	render(){
		const {robots,searchfield} = this.state
		const filterRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})

		if(!robots.length ){
			return <h1>LOADING</h1>;
		}
		else{
			return (
				<div className = "tc"> 
					<h1 className = 'f1'>ROBORIENDS</h1>
					<SearchBox searchChange = {this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots = {filterRobots}/>
						</ErrorBoundry>
					</Scroll>
				</div>
			);
		}

		
	}
	
}

export default App;