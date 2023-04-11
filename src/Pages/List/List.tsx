import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchListings } from '../../redux/appConfig';
import { getNumberColor, makeNumberReadable } from '../../utils/textModifiers';
import { useNavigate } from 'react-router-dom';

function List() {

  const dispatch = useAppDispatch();
  const appConfig = useAppSelector(state => state.appConfig);
  
  const [listItems, setListItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchListings(appConfig.selectedCurrency.symbol))
  }, [appConfig.selectedCurrency, appConfig.lastFetch]);

  useEffect(() => {
    console.log(appConfig.data);
    const transformed = appConfig.data.map((item: any) => {
      return {
        sign: appConfig.selectedCurrency.sign,
        id: item.id,
        slug: item.slug,
        name: item.name,
        symbol: item.symbol,
        rank: item.cmc_rank,
        price: item.quote[appConfig.selectedCurrency.symbol].price,
        volume_change_24h: item.quote[appConfig.selectedCurrency.symbol].volume_change_24h}
    });
    setListItems(transformed);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [appConfig.data]);

  const goToDetailsPage = (slug: string) => {
    navigate(`/details/${slug}`);
  }

  return (
    <div style={{ margin: '20px', paddingTop: '40px'}}>
      <Header></Header>

      <table className="w-full">
        <thead style={{position: 'sticky', top: '40px', background: '#424242'}}>
          <tr className='text-sm opacity-80'>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th align='right'>Price</th>
            <th align='right'>Volume Change (24h)</th>
          </tr>
          {appConfig.loading ? (
            <tr>
              <td colSpan={5}><LinearProgress /></td>
            </tr>
          ): null}

        </thead>
        <tbody>
          {listItems.map(item => (
            <tr key={item.id} className='cursor-pointer' onClick={() => goToDetailsPage(item.slug)}>
              <td>{item.rank}</td>
              <td> <img className="coin-logo" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`} loading="lazy" alt={`${item.name} Logo`} /> {item.name}</td>
              <td>{item.symbol}</td>
              <td align='right'>{item.sign}{makeNumberReadable(item.price)}</td>
              <td align='right' style={{color: getNumberColor(item.volume_change_24h)}}>{makeNumberReadable(item.volume_change_24h)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List;
