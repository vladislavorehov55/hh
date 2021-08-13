import {useState, useMemo, useEffect} from "react";
import styles from './App.module.css';
import Header from "./components/Header/Header";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import VacanciesList from "./components/VacanciesList/VacanciesList"
import VacancyAllDescription from "./components/VacancyAllDescription/VacancyAllDescription";

function App() {

    const [vacancies, setVacancies] = useState([])
    const [chosenVacancy, setChosenVacancy] = useState(null);

    const [isShownAllDescription, setIsShownAllDescription] = useState(false);

    const [isFavoritePageActive, setIsFavoritePageActive] = useState(false);

    const toFavoritePage = () => {
        setIsFavoritePageActive(true);
        setIsShownAllDescription(false);
    }
    const toAllVacancies = () => {
        setIsFavoritePageActive(false);
        setIsShownAllDescription(false);
    }

    const closeAllVacancyDescription = () => {
        setIsShownAllDescription(false)
    }
    const like = (id) => {
        const newState = vacancies.slice();
        setVacancies(newState.map(vacancy => {
            if (vacancy.id === id) {
                vacancy.isLiked = !vacancy.isLiked;
            }
            return vacancy
        }))
    }
    const data = useMemo(() => {
        return isFavoritePageActive ? vacancies.filter(item => item.isLiked) : vacancies
    }, [vacancies, isFavoritePageActive])


    const getVacancies = async ({schedule, employment, experience, city, salary}) => {
        const data = {schedule, employment, experience};
        let res = await fetch('https://api.hh.ru/dictionaries');
        let dictionaries = await res.json();
        Object.keys(data).forEach(key => {
            dictionaries[key].forEach( el => {
                if (el.name === data[key]) {
                    data[key] = el.id
                }
            })
        })
        localStorage.setItem('filters', JSON.stringify({schedule, employment, experience, city, salary}));
        res = await fetch(`https://api.hh.ru/vacancies?text=frontend ${city}&only_with_salary=true&per_page=100&schedule=${data.schedule}&employment=${data.employment}&experience=${data.experience}&salary=${salary}`);
        const vacancies = (await res.json()).items;
        setVacancies(vacancies);
    }

    useEffect(() => {
        const data = localStorage.getItem('filters') ? JSON.parse(localStorage.getItem('filters')) : ({schedule: 'Полный день', employment: 'Полная занятость', experience: 'От 1 года до 3 лет', city: 'Москва', salary: 150000});
        getVacancies(data);
    }, [])



    const getVacancy = async (id) => {
        const res = await fetch(`https://api.hh.ru/vacancies/${id}`);
        const vacancy = await res.json();
        setChosenVacancy(vacancy);
        setIsShownAllDescription(true);
    }

    return (
        <>
            <Header isFavoritePageActive={isFavoritePageActive} toFavoritePage={toFavoritePage}
                    toAllVacancies={toAllVacancies}

            />
            {
                !isFavoritePageActive && <FilterPanel getVacancies={getVacancies}/>
            }

            <main className={styles.main}>
                <VacanciesList vacancies={data} like={like}
                               isShownAllDescription={isShownAllDescription}
                               getVacancy={getVacancy}
                />
                <VacancyAllDescription vacancy={chosenVacancy}
                                       isShownAllDescription={isShownAllDescription}
                                       closeAllVacancyDescription={closeAllVacancyDescription}
                />
            </main>
        </>
      );
}

export default App;
