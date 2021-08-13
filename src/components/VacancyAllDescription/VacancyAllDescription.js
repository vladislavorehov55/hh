import DOMPurify from 'dompurify';
import styles from './VacancyAllDescription.module.css';
import closeIcon from '../../images/close.png'

const VacancyAllDescription = ({vacancy, isShownAllDescription, closeAllVacancyDescription}) => {

    const getSalary = () => {
        let valute = 'руб.'
        if (vacancy.salary.currency !== 'RUR') {
            valute = 'RUR'
        }
        const salaryFrom = vacancy.salary.from;
        const salaryTo = vacancy.salary.to
        if (salaryFrom && salaryTo) {
            return `От ${salaryFrom.toLocaleString()} до ${salaryTo.toLocaleString()} ${valute}`
        }
        else if (salaryFrom && !salaryTo) {
            return `От ${salaryFrom.toLocaleString()} ${valute}`
        }
        else if (!salaryFrom && salaryTo) {
            return `До ${salaryTo.toLocaleString()} ${valute}`
        }
    }



    return(
        <>
            {
                vacancy &&
                <div className={`${styles.wrap} ${isShownAllDescription ? styles.show : ''}`}>
                    <img src={closeIcon} alt='close' className={styles.close} onClick={closeAllVacancyDescription}/>
                    <div className={styles.container}>
                        <img src={vacancy.employer.logo_urls && vacancy.employer.logo_urls[90] } alt=""/>
                        <div className={styles.info}>
                            <div className={styles.job}>{vacancy.name}</div>
                            <span className={styles.companyName}>{vacancy.employer.name}</span>
                            <span className={styles.city}>{vacancy.area.name}</span>
                        </div>
                    </div>
                    <div className={styles.salary}>{getSalary()}</div>
                    <div className={styles.text} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(vacancy.description)}}/>

                </div>
            }
        </>



    )
}
export default VacancyAllDescription