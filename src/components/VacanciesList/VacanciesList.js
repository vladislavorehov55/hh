import styles from './VacanciesList.module.css'
import VacancyShortDescription from "./VacancyShortDescription/VacancyShortDescription";
const VacanciesList = ({vacancies, like, getVacancy}) => {
    return(
        <div className={styles.wrap}>

            {
                vacancies.length === 0 ? '' :
                    <>
                        {
                            vacancies.map((vacancy, ind) => <VacancyShortDescription key={ind} vacancy={vacancy}
                                                                                     like={like} getVacancy={getVacancy}/>)
                        }

                    </>

            }

        </div>
    )
}
export default VacanciesList