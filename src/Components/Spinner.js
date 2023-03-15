import React from 'react';
import loading from '../images/loading.gif'

export const Spinner = () => {
  return (
    <div className='text-center my-5'>
        <img src={loading} alt='loading' />
    </div>
  )
}
