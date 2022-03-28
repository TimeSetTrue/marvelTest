import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';


const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [loadComicsNew, setLoadComicsNew] = useState(false);
    const [offset, setOffset] = useState(0);
    const [endedComics, setEndedComics] = useState(false);

    const {loading, error, clearError, getAllComics} = useMarvelServices();
    
    useEffect(() => {
        onComics(offset, true);
    }, [])

    const setComicsState = (newComics) => {
        let ended = false;
		if(newComics.length < 8) {
			ended = true;
		}
        
        setComics(comics => [...comics, ...newComics])
        setOffset(offset => offset + 8)
        setLoadComicsNew(false)
        setEndedComics(ended)
    }

    const onComics = (offset, initial) => {
        clearError();
        initial ? setLoadComicsNew(false) : setLoadComicsNew(true);
        getAllComics(offset)
        .then(setComicsState)
    }


    const comicsItem = (comics) => {
        const items = comics.map((item, i) => {
            const {id, title, price, thumbnail} = item;
            
            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}     
            </ul>
            
        )
    }

    const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
    const content = comicsItem(comics);

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {content}
            <button 
                style={{display: endedComics ? 'none' : 'block'}}
                onClick={() => onComics(offset, false)}
                disabled={loadComicsNew}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;