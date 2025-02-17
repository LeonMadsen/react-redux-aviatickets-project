import style from './buttonFooter.module.css';
import { selectStatus } from '../../Api/Slice';
import { countReducer } from '../../Api/Slice';
import { useAppSelector, useAppDispatch } from '../../Api/Store';

function Footer() {
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
            
    return (
        <footer className={style.footer}>
            <button onClick={() => dispatch(countReducer())} className={style.button}>{status === "loading" 
                ? "Загрузка..." 
                : "Загрузить еще билеты"}</button>
        </footer>
    )
}

export default Footer;

