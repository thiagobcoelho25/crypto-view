import React from 'react';
import { render, screen } from '@testing-library/react';
import { Coin } from './index';

it('Check coin label', () => {
    render(<Coin coin='BTC' currentPrice={16} oldPrice={20} ></Coin>);
    expect(screen.getByText('BTC'));
})