import { Text } from "@mantine/core";

export const Footer = () => {
  return (
    <footer
      style={{
        height: "48px",
        backgroundColor: "#005B9C",
        boxShadow: "0 -2px 4px #ADB5BD",
        padding: "8px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        c="white"
        style={{
          fontFamily: "PF Din Text Cond Pro, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
        }}
      >
        Разработано Департаментом цифровых технологий АО "Россети
        Научно-технический центр" ®
      </Text>
    </footer>
  );
};
