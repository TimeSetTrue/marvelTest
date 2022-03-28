import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

const CharList = (props) => {
	const [allChar, setAllChar] = useState([]);
	const [offset, setOffset] = useState(210);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [charEnded, setCharEnded] = useState(false);

	const {loading, error, getAllCharacters, clearError} = useMarvelServices();

	useEffect(() => {
		onRequest(offset, true);
	}, [])

	const setCharState = (newAllChar) => {
		let ended = false;
		if(newAllChar.length < 9) {
			ended = true;
		}

		setAllChar(allChar => [...allChar, ...newAllChar]);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setCharEnded(charEnded => ended);
	}

	const onRequest = (offset, initial) => {
		clearError();
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset)
			.then(setCharState)
	}

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	const loadingFullChar = (arr) => {
		const elements = arr.map((item, i) => {
			const {name, thumbnail, id} = item;

			let clazz = {objectFit: 'cover'};
			if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				clazz = {objectFit: 'unset'};
			}
			return (
				<li key={id} 
					tabIndex={0}
					ref={el => itemRefs.current[i] = el}
					className="char__item"
					onClick={
						() => { 
							props.onCharId(id)
							focusOnItem(i)
					}}
					onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharId(item.id);
                            focusOnItem(i);
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


	const items = loadingFullChar(allChar);

	const spinner = loading &&  !newItemLoading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;

	return (
		<div className="char__list">
			{spinner}
			{errorMessage}
			{items}
			<button className="button button__main button__long"
			onClick={() => onRequest(offset, false)}
			style={{display: charEnded ? 'none' : 'block'}}
			disabled={newItemLoading}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

CharList.propTypes = {
	onCharId: PropTypes.func
}

export default CharList;