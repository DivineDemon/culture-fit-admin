import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [login, { isLoading }] = useLoginMutation();
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (email !== "digimark.dev1@gmail.com") {
      toast.error("Please use the Admin Credentials to login.");
      return;
    }

    const response = await login({
      email,
      password,
    });

    if (response.data) {
      toast.success("Logged In Successfully!");
      void navigate("/dashboard");
    } else {
      toast.error("Something went wrong, Please try again!");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleLogin();
      }}
      className="mx-auto flex w-[90%] flex-col items-center justify-center lg:w-2/3 xl:w-1/2"
    >
      <span className="w-full text-center font-bold text-[32px] leading-[32px] md:text-[48px] md:leading-[53px]">
        Welcome to
        <br /> Culture Fit
      </span>
      <span className="mt-2.5 mb-5 w-full text-center text-[#71717A] text-[14px] leading-[14px]">
        Enter your credentials to login.
      </span>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-5 mb-2.5 w-full p-5"
        placeholder="Enter your email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-5"
        placeholder="Enter your password"
      />
      <Button disabled={isLoading} className="mt-10 w-full" variant="default" size="lg">
        {isLoading ? <Loader2 className="animate-spin" /> : "Sign In with Email"}
      </Button>
    </form>
  );
};

export default Login;
