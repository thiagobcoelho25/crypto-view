import React from 'react';
import './index.css';

interface CoinProps {
    coin: string;
    oldPrice: number;
    currentPrice: number;
}

export const Coin:React.FC<CoinProps> = (props) => {
    const { coin, oldPrice, currentPrice } = props;

    return(
        <div className={`Coin ${oldPrice > currentPrice ? 'down' : 'up'}`}>
            <span>{coin}</span>
            <span>{currentPrice.toLocaleString()}</span>
        </div>
    )
}