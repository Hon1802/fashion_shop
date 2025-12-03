import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import { type BoxProps } from "@mui/material/Box";
interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx }: Props) {
  const logo = (
    <Box
      component="img"
      src="/logo/logo.png"
      sx={{ width: 40, height: 40, cursor: "pointer", ...sx }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
