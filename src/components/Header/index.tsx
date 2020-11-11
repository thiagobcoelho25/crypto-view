import React, { useEffect, useState } from 'react';
import { cryptoHttp } from '../../http';
import { Coin } from '../Coin';
import './index.css';

interface HeaderProps {
    onSelected: (coin: string) => void;
}

interface Price{
    [key: string]: {oldPrice: number, currentPrice: number}
}

const ALL_PRICES: Price = {
    BTC: {oldPrice: 0, currentPrice: 0},
    LTC: {oldPrice: 0, currentPrice: 0},
}

export const Header: React.FC<HeaderProps> = (props) => {
    const { onSelected } = props;
    const [prices, setPrices] = useState<Price>(ALL_PRICES);
    
    useEffect(() => {
        const intervals = Object.keys(ALL_PRICES).map( coin => {
            return setInterval(() => {
                cryptoHttp.get(`price?fsym=${coin}&tsyms=BRL`).then( res => setPrices((prevState) => {
                    if(prevState[coin].currentPrice === res.data.BRL){
                        return prevState
                    }
                    return {
                        ...prevState,
                        [coin]: {
                            oldPrice: prevState[coin].currentPrice,
                            currentPrice: res.data.BRL
                        }
                    }
                }))
            }, 5000);
        })
        return () => {
            intervals.forEach(interval => clearInterval(interval));
        }

    },[])

    return (
        <div className='Header'>
            
            {Object.entries(prices).map(([coin,{oldPrice, currentPrice}]) => {
               return (<div onClick={ () => onSelected(coin)}>
                    <Coin coin={coin} oldPrice={oldPrice} currentPrice={currentPrice}/>
                </div>)
            })
            /*  Ou se pode usar:
                Object.keys(prices).map(coin => {
                    <Coin ... coin={coin} old={prices[coin].oldPrice} ....
                }) 
                mas dessa forma devemos utilizar interface, pois o Type ira acusar erro de any implicito.
            */
            }
        </div>
    )
}