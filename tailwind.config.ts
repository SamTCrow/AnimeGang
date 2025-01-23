import { _backdropOpacity } from "#tailwind-config/theme";
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  variants: {
    extend: {
      backgroundOpacity: ["active"]
    }
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"]
      }
    }
  }
};
