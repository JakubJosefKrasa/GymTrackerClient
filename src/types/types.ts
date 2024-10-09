import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type AuthType = {
  isLoggedIn: boolean;
  email: string | null;
};

export type AuthContextType = AuthType & {
  setAuth: (auth: AuthType) => void;
};
