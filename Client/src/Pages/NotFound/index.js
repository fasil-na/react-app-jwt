import React from 'react';

export const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 className='my-1 text-danger' style={{ fontSize: '3rem' }}>Error 404</h1>
            <p className='my-1 text-danger'>We are sorry, the page you've requested is not available.</p>
        </div> 

    )
}