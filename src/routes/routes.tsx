import { ReactElement } from "react";
import NotFound from "@/screens/NotFound";
import LoginScreen from "@/screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";
import HomeScreen from "@/screens/HomeScreen";

const routes: { path: string; screen: ReactElement }[] = [
  {
    path: "/",
    screen: <LoginScreen />,
  },
  {
    path: "/signup",
    screen: <SignupScreen />,
  },
  {
    path: "/home",
    screen: <HomeScreen />,
  },
  {
    path: "*",
    screen: <NotFound />,
  },
];

export default routes;
