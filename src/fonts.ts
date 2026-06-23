import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadHeebo } from "@remotion/google-fonts/Heebo";

const inter = loadInter("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const heebo = loadHeebo("normal", {
  weights: ["400", "600", "700"],
  subsets: ["hebrew", "latin"],
});

export const fontFamily = inter.fontFamily;
export const fontFamilyHe = heebo.fontFamily;
