// theme.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { ComponentStyleConfig } from "@chakra-ui/theme";

// Configure the initial color mode and system preference
const config: ThemeConfig = {
  initialColorMode: "light", // Set the initial color mode to 'light'
  useSystemColorMode: false, // Disable using the system's color mode
};

const Button: ComponentStyleConfig = {
  variants: {
    black: {
      bg: "black",
      color: "white",
    },
  },
};

// Use this file to define/inject custom theme
const theme = {
  config, // Include the color mode configuration
  colors: {
    brand: {
      100: "green",
      // Add other brand colors if needed
    },
  },
  components: {
    Button,
  },
};

export default extendTheme(theme);