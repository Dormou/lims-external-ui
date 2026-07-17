import { Text, Box } from '@mantine/core';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <Box
      component="footer"
      h={48}
      bg="white"
      px={32}
      display="flex"
      className={styles.footerContent}
    >
      <Text c="dimmed" size="md">
        Разработано Департаментом цифровых технологий АО "Россети
        Научно-технический центр" ®
      </Text>
    </Box>
  );
};