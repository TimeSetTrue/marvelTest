import { Component } from 'react';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
	state = {
		onCharInfoId: null
	}

	onCharId = (id) => {
		this.setState({
			onCharInfoId: id
		})
	}

	render () {
		return (
			<div className="app">
				<AppHeader/>
				<main>
					<ErrorBoundary>
						<RandomChar/>
					</ErrorBoundary>
					<div className="char__content">
						<ErrorBoundary>
							<CharList onCharId={this.onCharId}/>
						</ErrorBoundary>
						<ErrorBoundary>
							<CharInfo onCharInfoId={this.state.onCharInfoId}/>
						</ErrorBoundary>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision"/>
				</main>
			</div>
		)
	}
}

export default App;