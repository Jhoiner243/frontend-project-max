import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { LoginForm } from "../../components/login-form";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => navigate("/")}
        className="flex  absolute ml-[20%] mt-20 cursor-default hover:bg-white/10 rounded-full p-2 font-medium  bg-background/40 text-white"
      >
        <ArrowLeft className="m-1 w-5 h-5 " />
        Back
      </Button>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-black">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
