
import styles from './DropdownFilter.module.css';

const DropdownFilter = ({data, chooseFilter, filter, str}) => {

    const handleChange = (group, e) => {
        chooseFilter(group, e.target.labels[0].textContent);
    }
    return(
        <div className={styles.wrap}>
            <h1 className={`${styles.title} ${styles.salaryTitle}`}>Доход</h1>
            <input placeholder='150 000' className={styles.input}/>
            {
                data.map((el, ind) => {
                    return(
                        <div key={ind}>
                            {<h1 className={styles.title}>{el.title}</h1>}
                            {
                                el.filters.map((item, ind) => {
                                    return(
                                        <label key={ind} className={styles.radioWrap}>
                                            <input type='radio'
                                                   name={el.group + str}
                                                   onChange={handleChange.bind(null, el.group)}
                                                   hidden={true}
                                                   className={styles.radio}
                                                   checked={item === filter[el.group]}
                                            />
                                            <span className={styles.text}>{item}</span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                    )

                })
            }
        </div>
    )
}
export default DropdownFilter