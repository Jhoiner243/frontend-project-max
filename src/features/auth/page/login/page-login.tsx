import { ArrowLeft, GalleryVerticalEnd } from "lucide-react";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/login-form";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      <motion.div
        onClick={() => navigate("/")}
        className="flex  absolute ml-[20%] mt-20 cursor-default hover:bg-slate-800/10 rounded-full p-2 font-medium  transition-transform bg-background/40 hover:translate-x-1"
      >
        <ArrowLeft className="m-1 w-5 h-5 group-hover:translate-x-3 transition-transform" />
        Back
      </motion.div>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            FillStep.
          </a>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
