import { Container, Flex, Loader } from '@mantine/core';
import type { FC } from 'react';

const FullPageLoader: FC = () => {
  return (
    <Container w={'100vh'} h={'100vh'}>
      <Flex align={'center'} justify={'center'} h={'100%'}>
        <Loader size={'xl'} />
      </Flex>
    </Container>
  );
};

export default FullPageLoader;
