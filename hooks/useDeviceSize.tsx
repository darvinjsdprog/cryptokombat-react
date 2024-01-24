import "@expo/match-media";
// Unleash the demo :D
import { useMediaQuery } from "react-responsive";

export type MediaQuery = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  device: "mobile" | "tablet" | "desktop";
};

export function useDeviceSize() {
  const isTablet = useMediaQuery({
    minDeviceWidth: 768,
  });
  const isDesktop = useMediaQuery({
    minDeviceWidth: 1224,
  });
  const isMobile = !isTablet && !isDesktop;

  const result = {
    isMobile,
    isTablet,
    isDesktop,
    device: isDesktop ? "desktop" : isTablet ? "tablet" : "mobile",
  } as MediaQuery;
  return result;
}
