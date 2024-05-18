import PropTypes from 'prop-types';

import './style.css';

const BookProperties = (props) => {
    const currentBook = props.currentBook;

    const coverPath = '/img/'

    return currentBook ? (
        <div className="book-props">
            <img className="book-cover2" src={`${coverPath}`+currentBook.image+'.png'}  alt="book cover"/>
            <h2 className="book-name">name: {currentBook.name}</h2>
            <h3 className="book-deposit">deposit: {currentBook.deposit}</h3>
            <h3 className="book-day-price">dayPrice: {currentBook.dayPrice}</h3>
            <h3 className="book-discount">discount: {currentBook.discount}</h3>
            <h3 className="book-available">available: {currentBook.available===true ? 'Yes' : 'No'}</h3>
            <h3 className="book-state">state: {currentBook.bookState}</h3>
            {currentBook.author && currentBook.author.fullName && (
                <h3 className="book-author">author: {currentBook.author.fullName}</h3>
            )}
        </div>
    ) : null;
};

BookProperties.propTypes = {
    currentBook: PropTypes.object.isRequired
};

export default BookProperties;
