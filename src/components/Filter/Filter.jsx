import css from './Filter.module.css'

export default function Filter ({ value, onFilter}) {
    return(
        <div className={css.form}>
            <p className={css.search}>Search</p>
            <input className={css.input} type="text" value={value} onChange={(e) => onFilter(e.target.value)}
            />
        </div>
    )
}