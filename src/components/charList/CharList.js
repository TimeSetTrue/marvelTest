import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
	state = {
		allChar: [],
		loading: true,
		error: false,
		offset: 210,
		newItemLoading: false,
		charEnded: false
	}

	marvelServicesAll = new MarvelServices();

	componentDidMount() {
		this.onRequest();
	}

	setCharState = (newAllChar) => {
		let ended = false;
		if(newAllChar.length < 9) {
			ended = true;
		}

		this.setState(({offset, allChar}) => ({
			allChar: [...allChar, ...newAllChar],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended
		}))
	}

	onErrorAllChar = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

	onRequest = (offset) => {
		this.onCharLoading();
		this.marvelServicesAll
			.getAllCharacters(offset)
			.then(this.setCharState)
			.catch(this.onErrorAllChar)
	}

	onCharLoading = () => {
		this.setState({
			newItemLoading: true
		})
	}

	itemRefs = [];

	setRef = (ref) => {
        this.itemRefs.push(ref);
    }
	focusOnItem = (id) => {
		this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
		this.itemRefs[id].classList.add('char__item_selected');
		this.itemRefs[id].focus();
	}

	loadingFullChar = (arr) => {
		const elements = arr.map((item, i) => {
			const {name, thumbnail, id} = item;

			let clazz = {objectFit: 'cover'};
			if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				clazz = {objectFit: 'unset'};
			}
			return (
				<li key={id} 
					tabIndex={0}
					ref={this.setRef}
					className="char__item"
					onClick={
						() => { 
							this.props.onCharId(id)
							this.focusOnItem(i)
					}}
					onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharId(item.id);
                            this.focusOnItem(i);
                        }
                    }}>
					<img src={thumbnail} alt={abyss} style={clazz}/>
					<div className="char__name">{name}</div>
				</li>
			)
		}); 
		return (
			<ul className="char__grid">
				{elements}
			</ul>
		)
	}

	render() {
		const {allChar, loading, error, offset, newItemLoading, charEnded} = this.state;
		const items = this.loadingFullChar(allChar);

		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className="char__list">
				{spinner}
				{errorMessage}
				{content}
				<button className="button button__main button__long"
				onClick={() => this.onRequest(offset)}
				style={{display: charEnded ? 'none' : 'block'}}
				disabled={newItemLoading}>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

CharList.propTypes = {
	onCharId: PropTypes.func
}

export default CharList;