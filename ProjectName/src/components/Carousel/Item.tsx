import React from 'react';
import Box from '@components/layouts/Box';

interface Props {
  children: JSX.Element;
}

const Item: React.FC<Props> = ({children}) => {
  return <Box>{children}</Box>;
};

export default Item;
