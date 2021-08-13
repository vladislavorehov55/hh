import {useEffect, useState} from "react";
import styles from './FilterPanel.module.css';
import cityBlockIcon from '../../images/filter-panel/city-block.png';
import scheduleBlockIcon from '../../images/filter-panel/schedule-block.png';
import employmentBlockIcon from '../../images/filter-panel/employment-block.png';
import experienceBlockIcon from '../../images/filter-panel/experience-block.png';
import salaryBlockIcon from '../../images/filter-panel/salary-block.png';
import DropdownFilter from "./DropdownFilter/DropdownFilter";
import {filters} from '../../data';


const FilterPanel = ({getVacancies}) => {
    const [isShowScheduleBlock, setIsShowScheduleBlock] = useState(false);
    const [isShowEmploymentBlock, setIsShowEmploymentBlock] = useState(false);
    const [isShowExperienceBlock, setIsShowExperienceBlock] = useState(false);
    const [isShowAllFiltersBlock, setIsShowAllFiltersBlock] = useState(false);

    const [schedule, setSchedule] = useState('Полный день');
    const [employment, setEmployment] = useState('Полная занятость');
    const [experience, setExperience] = useState('От 1 года до 3 лет');
    const [city, setCity] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        if (localStorage.getItem('filters')) {
            const {schedule, employment, experience, city, salary} =  JSON.parse(localStorage.getItem('filters'));
            setSchedule(schedule);
            setEmployment(employment)
            setExperience(experience)
            setCity(city)
            setSalary(salary)
        }
    },[])

    const onClickBlock = (blockName) => {
        switch (blockName) {
            case 'schedule':
                setIsShowScheduleBlock(prevState => !prevState);
                break;
            case 'employment':
                setIsShowEmploymentBlock(prevState => !prevState);
                break;
            case 'experience':
                setIsShowExperienceBlock(prevState => !prevState);
                break;
            case 'all':
                setIsShowAllFiltersBlock(prevState => !prevState);
                break
            default:
                break
        }
    }
    const chooseFilter = (group, filter) => {
        switch (group){
            case 'schedule':
                setSchedule(filter);
                break;
            case 'employment':
                setEmployment(filter);
                break;
            case 'experience':
                setExperience(filter);
                break;
            default:
                break;
        }
    }
    const inputHandler = (e) => {
        switch (e.target.name) {
            case 'city':
                setCity(e.target.value);
                break;
            case 'salary':
                setSalary(e.target.value);
                break;
            default:
                break;
        }
    }
    const onClickSearch = () => {
        setIsShowScheduleBlock(false);
        setIsShowEmploymentBlock(false);
        setIsShowExperienceBlock(false);
        setIsShowAllFiltersBlock(false);
        getVacancies({schedule, employment, experience, city: city ? city : 'Москва', salary: salary ? salary : 150000});
    }
    return(
        <div className={styles.wrap}>
            <div className={styles.filter}>
                <div className={styles.container}>
                    <div className={styles.cityBlock}>
                        <img src={cityBlockIcon} alt=""/>
                        <input placeholder='Москва' className={styles.input} name='city' value={city}
                               onChange={inputHandler}
                        />
                    </div>

                    <div className={styles.scheduleBlock} onClick={onClickBlock.bind(null, 'schedule')}>
                        <img src={scheduleBlockIcon} alt=''/>
                        <span className={styles.text}>{schedule}</span>
                        <div style={isShowScheduleBlock ? {opacity: 1} : {opacity: 0, pointerEvents: 'none'}}
                             className={styles.animated}>
                            <DropdownFilter data={[filters[0]]} chooseFilter={chooseFilter}
                                            filter={{schedule}} str=''
                            />
                        </div>
                    </div>

                    <div className={styles.employmentBlock} onClick={onClickBlock.bind(null, 'employment')}>
                        <img src={employmentBlockIcon} alt=''/>
                        <span className={styles.text}>{employment}</span>
                        <div style={isShowEmploymentBlock ? {opacity: 1} : {opacity: 0, pointerEvents: 'none'}}
                             className={styles.animated}>
                            <DropdownFilter data={[filters[1]]} chooseFilter={chooseFilter}
                                            filter={{employment}} str=''
                            />
                        </div>
                    </div>

                    <div className={styles.experienceBlock} onClick={onClickBlock.bind(null, 'experience')}>
                        <img src={experienceBlockIcon} alt=''/>
                        <span className={styles.text}>{experience}</span>
                        <div style={isShowExperienceBlock ? {opacity: 1} : {opacity: 0, pointerEvents: 'none'}}
                             className={styles.animated}>
                            <DropdownFilter data={[filters[2]]} chooseFilter={chooseFilter}
                                            filter={{experience}} str=''
                            />
                        </div>
                    </div>

                    <div className={styles.salaryBlock}>
                        <img src={salaryBlockIcon} alt=''/>
                        <input placeholder='150 000 руб.' className={styles.input} name='salary' value={salary}
                               onChange={inputHandler}
                        />
                    </div>

                    <div className={styles.filtersBlock} onClick={onClickBlock.bind(null, 'all')}>
                        <span className={styles.text}>Фильтры</span>
                    </div>

                    <div style={isShowAllFiltersBlock ? {opacity: 1} : {opacity: 0, pointerEvents: 'none'}}
                         className={styles.animated}>
                        <DropdownFilter data={filters} chooseFilter={chooseFilter} str='_'
                                        filter={{schedule, employment, experience}}/>
                    </div>
                </div>
                <button className={styles.btn} onClick={onClickSearch}>Поиск</button>
            </div>
        </div>
    )
}
export default FilterPanel