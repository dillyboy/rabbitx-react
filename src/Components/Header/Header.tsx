import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import currencies from '../../Constants/currencies'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateLastFetch, updateSelectedCurrency } from '../../redux/appConfig';

export default function Header() {

  const dispatch = useAppDispatch()
  const selectedCurrency = useAppSelector(state => state.appConfig.selectedCurrency);  
  const currencyChanged = (val: string) => {
    const selectCurrency = currencies.find(item => item.currency === val);
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
        <img src="./rabbitx_logo.png" alt="" width="80" height="32" />
        <div>
          <button type="button" className='border-inherit border pl-2 pr-2 rounded mr-5' onClick={refetch}>Refresh</button>
          <label className='mr-2 text-sm'>Currency</label>
          <select className='pl-2 pr-2 border-inherit border rounded bg-transparent' name="currency" value={selectedCurrency.currency} onChange={(ev) => currencyChanged(ev.target.value)}>
            {currencies.map(item => (
              <option key={item.currency} value={item.currency}>{item.currency}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  )
}
