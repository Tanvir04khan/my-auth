import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [lastName, setLastName] = useState("");
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");

  const navigator = useNavigate();

  const onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidFirstName) setIsValidFirstName(true);
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidLastName) setIsValidLastName(true);
    setLastName(e.target.value);
  };
  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidPhoneNumber) setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidEmail) setIsValidEmail(true);
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidPassword) setIsValidPassword(true);
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (ConfirmPasswordError) setConfirmPasswordError("");
    setConfirmPassword(e.target.value);
  };

  const onClickSignUp = (e: FormEvent) => {
    e.preventDefault();
    if (firstName.length < 3 || firstName.length > 10)
      return setIsValidFirstName(false);
    if (lastName.length < 3 || lastName.length > 10)
      return setIsValidLastName(false);
    if (!/^\d{10}$/.test(PhoneNumber)) return setIsValidPhoneNumber(false);

    if (!email.includes("@")) return setIsValidEmail(false);

    if (password.length < 8) return setIsValidPassword(false);

    if (confirmPassword.length < 8)
      return setConfirmPasswordError(
        "Password must have 8 or more than 8 characters!"
      );

    if (confirmPassword !== password)
      return setConfirmPasswordError(
        "Your passwords don’t match. Please re-enter the same password!"
      );

    navigator("/home");
  };

  return (
    <div className="w-full md:w-[700px]">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to My Auth</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Sign up
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 ">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    maxLength={10}
                    minLength={3}
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={onChangeFirstName}
                  />
                  {!isValidFirstName && (
                    <h1 className="text-red-600">
                      First name must be between 3 and 10 characters!
                    </h1>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    maxLength={10}
                    minLength={3}
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={onChangeLastName}
                  />
                  {!isValidLastName && (
                    <h1 className="text-red-600">
                      Last name must be between 3 and 10 characters!
                    </h1>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="number"
                    minLength={10}
                    maxLength={10}
                    placeholder="Phone Number"
                    required
                    value={PhoneNumber}
                    onChange={onChangePhoneNumber}
                  />
                  {!isValidPhoneNumber && (
                    <h1 className="text-red-600">
                      Please enter valid phone number!
                    </h1>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={onChangeEmail}
                  />
                  {!isValidEmail && (
                    <h1 className="text-red-600">Please enter valid email!</h1>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    placeholder="Password"
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={onChangePassword}
                  />
                  {!isValidPassword && (
                    <h1 className="text-red-600">
                      Password must have 8 characters.
                    </h1>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    required
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                  />
                  {ConfirmPasswordError && (
                    <h1 className="text-red-600">{ConfirmPasswordError}</h1>
                  )}
                </div>
              </div>
              <Button onClick={onClickSignUp} type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
