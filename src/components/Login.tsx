import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Alert from "./Alert";
import useLogin from "@/hooks/useLogin";

const Login = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"Success" | "Error" | "Warning">(
    "Success"
  );

  const { mutate: login } = useLogin();

  const onchangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidEmail) setIsValidEmail(true);
    setEmail(e.target.value);
  };

  const onClickLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      return setIsValidEmail(false);
    }
    login(
      { email, password },
      {
        onError: (error) => {
          setAlertType("Error");
          setAlertMessage(error.message);
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Login
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={onchangeEmail}
                  />
                  {!isValidEmail && (
                    <h1 className="text-red-600">
                      Please provide valid email!
                    </h1>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button onClick={onClickLogin} type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
      {alertMessage && (
        <Alert
          title="Login"
          description={alertMessage}
          type={alertType}
          setAlertMessage={setAlertMessage}
          variant="default"
        />
      )}
    </div>
  );
};

export default Login;
