import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TransactionComponent } from '.';
import { MemoryRouter } from 'react-router-dom';
import { TransactionItem } from '../../dataObjects/item';

const stories = storiesOf('components/TransactionComponent', module);

const item: TransactionItem = {
  id: 1,
  status: 'trading',
  transactionEvidenceStatus: 'wait_shipping',
  shippingStatus: 'initial',
  name: 'テスト商品',
  thumbnailUrl: 'https://gyazo.com/8560fce19556b64c95ad091350910184',
  createdAt: 111111111,
};

stories.add('default', () => (
  <MemoryRouter>
    <TransactionComponent item={item} />
  </MemoryRouter>
));
