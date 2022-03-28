import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';
import Skeleton from './../skeleton/Skeleton';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const {loading, error, getCharacter, clearError} = useMarvelServices();

	useEffect(() => {
		getCharInfo();
	}, [props.onCharInfoId])

	const getCharInfo = () => {
		const {onCharInfoId} = props;
		if(!onCharInfoId) {
			return;
		}
		clearError();
		getCharacter(onCharInfoId)
		.then(setCharState)
	}
	const setCharState = (char) => {
		setChar(char);
	}

	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const skeleton = !(loading || error || char) ? <Skeleton /> : null;
	const content = !(loading || error || !char) ? <View char={char} />  : null;



	// const charElement = <View char={char} />
	return (
		<div className="char__info">
			{content}
			{spinner}
			{errorMessage}
			{skeleton}
		</div>
	)
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;

	let clazz = {objectFit: 'cover'};
	if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		clazz = {objectFit: 'unset'};
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={clazz}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>

			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : 'There is no comics with this character'}
				{
					comics.map((items, i) => {
						// eslint-disable-next-line
						if (i > 9) return;
						return (
							<li key={i} className="char__comics-item">
								<a href={items.resourceURI}>{items.name}</a>
							</li>
						)
					})
				}
			</ul>
		</>
	)
}


CharInfo.propTypes = {
	onCharInfoId: PropTypes.number
}

export default CharInfo;