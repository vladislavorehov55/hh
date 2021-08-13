import {useState, useMemo} from 'react';
import styles from './Header.module.css'
import close from '../../images/close.png';
import menu from '../../images/menu.png';

const Header = ({isFavoritePageActive, toFavoritePage, toAllVacancies}) => {

    const [showMenu, setShowMenu] = useState(false);

    const onClickChangePage = (e) => {
        if (e.target.classList[0].indexOf('menuItem') !== -1 ) {
            if (e.target.textContent === 'Поиск вакансий') {
                toAllVacancies();
            }
            else {
                toFavoritePage();
            }
        }
    }
    const openMenu = () => {
        setShowMenu(true)
    }
    const closeMenu = () => {
        setShowMenu(false)
    }
    const navClasses = useMemo(() => {
        return `${styles.menuWrap} ${showMenu ? styles.showMenuWrap : ''}`
    }, [showMenu])
    return(
        <header className={styles.header}>
            <div className={styles.container}>
                <h3 className={styles.title}>
                    <span className={styles.titleFirstWord}>FRONTEND </span>
                    <span className={styles.titleSecondWord}>JOB</span>
                </h3>

                {
                    showMenu ?
                        <img src={close} alt='Закрыть' className={styles.closeIcon} onClick={closeMenu}/> :
                        <img src={menu} alt='Меню' className={styles.menuIcon} onClick={openMenu}/>
                }

            </div>
            <nav className={navClasses} onClick={onClickChangePage}>
                <ul className={styles.menu}>
                    <li className={`${styles.menuItem} ${!isFavoritePageActive && styles.active}`}>Поиск вакансий</li>
                    <li className={`${styles.menuItem} ${isFavoritePageActive && styles.active}`}>Избранные вакансии</li>
                </ul>
            </nav>
        </header>
    )
}
export default Header