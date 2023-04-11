import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import currencies from '../../Constants/currencies';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateLastFetch, updateSelectedCurrency } from '../../redux/appConfig';
import logo  from '/rabbitx_logo.png';

export default function Header() {

  const dispatch = useAppDispatch()
  const selectedCurrency = useAppSelector(state => state.appConfig.selectedCurrency);  
  const currencyChanged = (val: string) => {
    const selectCurrency = currencies.find(item => item.symbol === val);
    if (selectCurrency !== undefined) {
      dispatch(updateSelectedCurrency(selectCurrency));
    }
  }

  const refetch = () => {
    dispatch(updateLastFetch());
  }

  return (
    <div id="appHeader">
      <div className='flex justify-between items-center h-full pl-5 pr-5'>
        <Link to="/"><img src={logo} alt="" width="100" height="40" /></Link>
        <div>
          <button type="button" className='border-inherit border pl-2 pr-2 rounded mr-5' onClick={refetch}>Refresh</button>
          <label className='mr-2 text-sm'>Currency</label>
          <select className='pl-2 pr-2 border-inherit border rounded bg-transparent' name="currency" value={selectedCurrency.symbol} onChange={(ev) => currencyChanged(ev.target.value)}>
            {currencies.map(item => (
              <option key={item.symbol} value={item.symbol}>{item.symbol}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  )
}
