import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Dialog as DialogSCN,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl, APIRoutes, saveAccessTokenAndRefreshToken } from "@/utils";
import Alert from "./Alert";
import { LoginAndSignupResponse, TokenType, UserType } from "@/types";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [lastName, setLastName] = useState("");
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const [isDialogOen, setIsDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"Success" | "Error" | "Warning">(
    "Success"
  );
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (event: FormEvent) => {
      event.preventDefault();
      return await axios.post<LoginAndSignupResponse>(
        `${baseUrl}${APIRoutes.USER_SIGNUP}`,
        {
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        }
      );
    },
    onSuccess: ({ data }) => {
      setAlertType("Success");
      setAlertMessage(data.message);
      const { accessToken, refreshToken, ...userDetails } = data.data;
      saveAccessTokenAndRefreshToken(
        accessToken,
        refreshToken,
        userDetails.userId
      );
      queryClient.setQueryData(["userDetails"], userDetails);
      navigator("/home");
    },
    onError: (error) => {
      setIsDialogOpen(false);
      setAlertType("Error");
      setAlertMessage(error.message);
    },
  });

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
    if (!/^\d{10}$/.test(phoneNumber)) return setIsValidPhoneNumber(false);

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

    setIsDialogOpen(true);
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
                    value={phoneNumber}
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
              <DialogSCN
                onOpenChange={() => setIsDialogOpen((ps) => !ps)}
                open={isDialogOen}
              >
                <DialogTrigger asChild>
                  <Button
                    type="submit"
                    onClick={(e) => {
                      onClickSignUp(e);
                    }}
                  >
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Review & Confirm Your Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start justify-center gap-2">
                      <h1 className="font-semibold text-muted-foreground">
                        First Name
                      </h1>
                      <h1 className="font-semibold">{firstName}</h1>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-2">
                      <h1 className="font-semibold text-muted-foreground">
                        Last Name
                      </h1>
                      <h1 className="font-semibold">{lastName}</h1>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-2">
                      <h1 className="font-semibold text-muted-foreground">
                        Phone Number
                      </h1>
                      <h1 className="font-semibold">{phoneNumber}</h1>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-2">
                      <h1 className="font-semibold text-muted-foreground">
                        Email
                      </h1>
                      <h1 className="font-semibold">{email}</h1>
                    </div>
                  </div>
                  <DialogFooter className="flex items-center gap-4">
                    <Button type="submit" onClick={(e) => mutate(e)}>
                      Sign up
                    </Button>
                    <DialogClose>
                      <Button>Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </DialogSCN>
            </div>
          </form>
        </CardContent>
      </Card>
      {alertMessage && (
        <Alert
          title="Sign up"
          description={alertMessage}
          type={alertType}
          setAlertMessage={setAlertMessage}
          variant="default"
        />
      )}
    </div>
  );
};

export default Signup;
