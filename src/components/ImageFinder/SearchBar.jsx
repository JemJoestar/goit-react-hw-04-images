import css from "./ImageFinder.module.css"
import { useState } from 'react';

export const SearchBar = ({onSubmit}) => {
  const [currentRequest, setCurrentRequest] = useState('')

  const handleChange = event =>{
    setCurrentRequest(event.currentTarget.value)
  }

  return (
    <header className={css.header}>
      <form
        className={css.form}
        onSubmit={event => {
          onSubmit({
            event,
            searchReq: currentRequest,
          });
          setCurrentRequest('')
        }}
      >
        <button type="submit" className={css.searchBtn}>
          <span className="button-label">&#128269;</span>
        </button>

        <input
          className={css.searchBar}
          type="text"
          autoComplete="off"
          autoFocus
          value={currentRequest}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
