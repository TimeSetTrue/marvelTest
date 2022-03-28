import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelServices from '../../services/MarvelServices';


const RandomChar = () => {
	const [char, setChar] = useState({});
	
	const {loading, error, getCharacter, clearError} = useMarvelServices();

	useEffect(() => {
		getRandomChar();
		// const intervalChar = setInterval(getRandomChar, 3000)

		// return () => {
		// 	clearInterval(intervalChar);
		// }
	}, [])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const getRandomChar = () => {
		// onCharLoading();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		clearError();
			getCharacter(id)
			.then(onCharLoaded)
	}

	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const content = !(loading || error) ? <View char={char} /> : null;
	
	return (
		<div className="randomchar">
			{spinner}
			{errorMessage}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br/>
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button className="button button__main" onClick={getRandomChar}>
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
			</div>
		</div>
	)
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki } = char;
	let clazz = '';
	if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
	   clazz = 'randomchar__img randomchar__img_new'
	} else {
		clazz = 'randomchar__img'
	}
	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className={clazz}/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;