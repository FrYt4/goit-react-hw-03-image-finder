import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './SearchBar.module.css'


export const SearchBar = ({ onSubmit }) => {
    const [searchedValue, setSearchedValue] = useState('');

    const handleSearchedValue = async (e) => {
        e.preventDefault();
        //Don't fetch data on button submit if searchedValue is empty
        if (searchedValue.length > 0) {
            await onSubmit(searchedValue);
            setSearchedValue("")
        }
    }

return (
    <header className={css.header}>
        <form className={css.form} onSubmit={handleSearchedValue}>
            <button type="submit" className={css.button}>
                    <span className={css.label}>Search</span>
            </button>
            <input
                value={searchedValue}
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={(e) =>setSearchedValue(e.target.value)}
                />
        </form>

    </header>
    )
}

SearchBar.prototypes = {
    onSubmit: PropTypes.func.isRequired
}