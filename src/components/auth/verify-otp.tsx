import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "../../../public/KervahLogo1Logo.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

function VerifyOtp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-black">
            <Image
              src={logo}
              alt="logo"
              width={70}
              height={70}
              className="mt-1"
            />
          </div>
          <CardTitle className="text-center">Verify Otp</CardTitle>
          <CardDescription className="text-center">
            Enter the code sent to your email below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center items-center gap-3 rounded-lg border bg-muted/50 p-4">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {/* <Button
              className="w-full"
              onClick={handleAcceptInvite}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Accept & Join"
              )}
            </Button> */}
          <Button variant="outline" className="w-full bg-transparent">
            Verify
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerifyOtp;
