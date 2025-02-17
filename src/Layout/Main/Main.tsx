import style from './main.module.css';
import ButtonsNavigation from './ButtonsNavigation/ButtonsNavigation';
import TicketsInfo from './TicketsInfo/TicketsInfo';
import SvgArrowDown from '../../Svg/svgArrowDown';
import BlockFilterTransfer from './BlockFilterTransfer/BlockFilterTransfer';
import BlockFilterCompanies from './BlockFilterCompanies/BlockFilterCompanies';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../Api/Store';
import { fetchTickets } from '../../Api/FetchTickets';
import { selectListTickets, selectStateParams, selectStateDisplayFilter } from '../../Api/Slice';

function Main() { 
    const stateParams = useAppSelector(selectStateParams);
    const stateDisplayFilter = useAppSelector(selectStateDisplayFilter);
    const dispatch = useAppDispatch();
    const listTickets = useAppSelector(selectListTickets);

   
    useEffect(() => {
        dispatch(fetchTickets(stateParams))
    }, [dispatch, stateParams]);

    
    const filteredTickets = listTickets.filter((ticket) => {
        const isPriceInRange = stateParams.priceRange
            ? ticket.price >= stateParams.priceRange.min && ticket.price <= stateParams.priceRange.max
            : true;
        const isDurationInRange = stateParams.durationRange
            ? ticket.duration >= stateParams.durationRange.min && ticket.duration <= stateParams.durationRange.max
            : true;
        const isTransfersValid = stateParams.transfers
            ? ticket.transfers === stateParams.transfers
            : true;
        
        return isPriceInRange && isDurationInRange && isTransfersValid;
    });

    const sortedTickets = [...filteredTickets].sort((a, b) => {
        const primary = stateParams.sortBy;
        const secondary = stateParams.sortBySecondary;

        const compare = (param) => {
            if (a[param] < b[param]) return -1;
            if (a[param] > b[param]) return 1;
            return 0;
        };

        if (primary) {
            const primaryComparison = compare(primary);
            if (primaryComparison !== 0) return primaryComparison;
        }

        if (secondary) {
            return compare(secondary);
        }

        return 0;
    });

    return (
        <main className={style.blockMain}>
            <div className={style.blockFilters}>
                <BlockFilterTransfer />
                <BlockFilterCompanies />
            </div>

            <div className={style.blockInfo}>
                <div className={style.block_info__navigation}>
                    <ButtonsNavigation />
                </div>
                <div className={stateDisplayFilter ? style.menuApearHeaderWithBottom : style.menuApearHeader}>
                    <h2 className={style.menuApearTitle}>Любая авиакомпания, любое кол-во пересадок</h2>
                    <h2 className={style.menuApearTitleAction}>Открыть настройки</h2>
                    <SvgArrowDown />
                    { stateDisplayFilter && 
                    <div className={style.menuApearFilter}>
                        <BlockFilterCompanies />
                        <BlockFilterTransfer />
                    </div> }
                </div>
                <div className={style.block_info__tickets}>
                    {sortedTickets.map((ticket) => (
                        <TicketsInfo key={ticket.id} {...ticket} />
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Main;