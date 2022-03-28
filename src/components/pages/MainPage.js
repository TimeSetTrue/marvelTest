import { useState } from 'react';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
	const [onCharInfoId, setCharInfoId] = useState(null)

	const onCharId = (id) => {
		setCharInfoId(id);
	}
	return (
		<>
			<ErrorBoundary>
				<RandomChar/>
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharId={onCharId}/>
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo onCharInfoId={onCharInfoId}/>
				</ErrorBoundary>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision"/>
		</>
	)
}

export default MainPage;