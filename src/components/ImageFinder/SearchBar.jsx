import css from "./ImageFinder.module.css"
import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    currentRequest: '',
  };
  handleChange = event => {
    this.setState({ currentRequest: event.currentTarget.value });
  };

  render() {
    return (
      <header className={css.header}>
        <form
          className={css.form}
          onSubmit={event => {
            this.props.onSubmit({
              event,
              searchReq: this.state.currentRequest,
            });
            this.setState({currentRequest: ""});
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
            value={this.state.currentRequest}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
