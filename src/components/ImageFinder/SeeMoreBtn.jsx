import css from "./ImageFinder.module.css"

export const SeeMoreBtn = ({onSeeMore}) => {
    return (<button className={css.seeMoreBtn} type="button" onClick={onSeeMore}>See More</button>)
}