import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import currencies from '../../Constants/currencies';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDetails } from '../../redux/appConfig';
import { getNumberColor, makeNumberReadable } from '../../utils/textModifiers';

export default function Details() {

  const dispatch = useAppDispatch();
  let { slug } = useParams();
  const appConfig = useAppSelector(state => state.appConfig);
  const [detailsTransformed, setDetailsTransformed] = useState<any>({
    price: 0,
    volume_24h: 0,
    volume_change_24h: 0,
    market_cap: 0,
    sign: ''
  });

  useEffect(() => {
    if (slug) {
      dispatch(getDetails({slug, convert: appConfig.selectedCurrency.symbol}))
    }
  }, [appConfig.selectedCurrency, appConfig.lastFetch]);

  useEffect(() => {
    const { quote }: { quote: any } = appConfig.details;
    if (quote) {
      const key = Object.keys(quote)[0];
      const selectCurrency = currencies.find(item => item.symbol === appConfig.selectedCurrency.symbol);
      setDetailsTransformed({
        price: quote[key].price,
        volume_24h: quote[key].volume_24h,
        volume_change_24h: quote[key].volume_change_24h,
        market_cap: quote[key].market_cap,
        sign: selectCurrency?.sign
      })
    }

  }, [appConfig.details]);

  return (
    <div className="page-container">

      {appConfig.loadingDetails === false && appConfig.details ? (
        <div style={{maxWidth: '1000px', margin: '0 auto'}}>
          <div className='p-2' style={{ borderBottom: '1px solid #424242'}}>
            <span className='text-xs opacity-70'> <Link to="/" className='breadcrumb-link'>Cryptocurrencies</Link> <span className='ml-3'>{appConfig.details?.name}</span> </span>
            <div className='flex mt-4 mb-4'>
              {appConfig.details.id? <img className="coin-logo-large" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${appConfig.details.id}.png`} alt={`Logo`} /> : null}
              <h1 className='text-5xl font-bold'>{appConfig.details?.name}</h1>
            </div>
            <span className='text-xs'>{appConfig.details.name} Price ({appConfig.details.symbol})</span>
            <h1 className='text-3xl font-bold'>{detailsTransformed.sign}{makeNumberReadable(detailsTransformed.price)}</h1>
            <span className='text-xs p-1 rounded inline-block mt-2 mb-2' style={{background: "#858ca2"}}>Rank #{appConfig.details.cmc_rank}</span>

          </div>

          <div className="grid-container">
            <div className="grid-item">
              <span className='text-xs opacity-80'>24h Volume</span>
              <h1 className='text-lg font-semibold'>{detailsTransformed.sign}{makeNumberReadable(detailsTransformed.volume_24h)}</h1>
            </div>
            <div className="grid-item">
              <span className='text-xs opacity-80'>24h Volume Change</span>
              <h1 className='text-lg font-semibold' style={{color: getNumberColor(detailsTransformed.volume_change_24h)}}>{makeNumberReadable(detailsTransformed.volume_change_24h)}</h1>
            </div>
            <div className="grid-item">
            <span className='text-xs opacity-80'>Market Cap</span>
              <h1 className='text-lg font-semibold'>{detailsTransformed.sign}{makeNumberReadable(detailsTransformed.market_cap)}</h1>
            </div>
            <div className="grid-item">
              <span className='text-xs opacity-80'>Selected Fiat Currency</span>
              <h1 className='text-lg font-semibold'>{appConfig.selectedCurrency.symbol}</h1>
            </div>
            <div className="grid-item">
              <span className='text-xs opacity-80'>Available Supply</span>
              <h1 className='text-lg font-semibold'>{makeNumberReadable(appConfig.details.circulating_supply)}</h1>
            </div>
            <div className="grid-item">
              <span className='text-xs opacity-80'>Total</span>
              <h1 className='text-lg font-semibold'>{makeNumberReadable(appConfig.details.total_supply)}</h1>
            </div>
          </div>

        </div>
      ): (
        <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
          <CircularProgress />
        </div>
        )}
    </div>
  )
}
