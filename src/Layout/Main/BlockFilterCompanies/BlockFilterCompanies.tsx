import style from './blockFilterCompanies.module.css';
import { useAppDispatch } from '../../../Api/Store';
import { choiseRedWings, choisePobeda, choiseS7 } from '../../../Api/Slice';

function BlockFilterCompanies() {

    const dispatch = useAppDispatch();
    
    return (
        <div className={style.blockFilterCompanies}>
            <h2 className={style.titleFilter}>Компании</h2>
            <div className={style.positionRadiobutton}>
                <label className={style.label}>
                    <input onChange={() => {dispatch(choisePobeda())}} type="radio" name='company' value="pobeda"/>                   
                    <span className={style.label_text}>Победа</span>
                </label>
             
                <label className={style.label}>
                    <input onChange={() => {dispatch(choiseRedWings())}} type="radio" name='company' value="redwings"/>
                    <span>Red Wings</span>
                </label>
 
                <label className={style.label}>
                    <input onChange={() => {dispatch(choiseS7())}} type="radio" name='company' value="s7"/>
                    <span>S7 Airlines</span>
                </label>
            </div>
        </div>
    )
}

export default BlockFilterCompanies;