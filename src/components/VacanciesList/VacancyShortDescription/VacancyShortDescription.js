import styles from './VacancyShortDescription.module.css';
import logo from '../../../images/grey-logo.png';
import likeIcon1 from '../../../images/red-heart.png';
import likeIcon2 from '../../../images/grey-heart.png';
import DOMPurify from 'dompurify';

const VacancyShortDescription = ({vacancy, like, getVacancy}) => {
    const onClickLike = (e) => {
        e.stopPropagation();
        like(vacancy.id)
    }
    const onClickVacancy = () => {
        getVacancy(vacancy.id);
    }
    return(
        <div className={styles.wrap} onClick={onClickVacancy}>
            <img src={vacancy.isLiked ? likeIcon1 : likeIcon2} alt='like' className={styles.like}
                 onClick={onClickLike}/>
            <img src={vacancy.employer.logo_urls ? `${vacancy.employer.logo_urls[90]}` : logo} alt="logo"/>
            <div className={styles.container}>
                <div className={styles.companyName}>{vacancy.employer.name}</div>
                <div className={styles.job}>{vacancy.name}</div>
                <div className={styles.city}>{vacancy.area.name}</div>
                <div className={styles.skillsWrap}>
                    {
                        vacancy.snippet.requirement.split('. ').map((skill, ind) => <div key={ind} className={styles.skill}
                                                                                         dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(skill)}}
                        />)
                    }
                </div>
            </div>
            <div className={styles.date}>{vacancy.created_at.split('T')[0].split('-').reverse().join('/')}</div>
        </div>
    )
}
export default VacancyShortDescription