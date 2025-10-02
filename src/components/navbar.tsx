import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/img/logo.jpg";
import LogoBlack from "@/assets/img/logo-black.jpg";
import { setMode } from "@/store/slices/global";
import type { RootState } from "@/types/global";
import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import WarningModal from "./warning-modal";

const Navbar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState<boolean>(false);
  const { mode } = useSelector((state: RootState) => state.global);

  const toggleValidationMode = () => {
    if (mode === "employees") {
      dispatch(setMode("candidates"));
    } else {
      dispatch(setMode("employees"));
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-[2] h-16 w-full border-b backdrop-blur">
        <MaxWidthWrapper className="flex items-center justify-between px-5 py-2.5 lg:px-0">
          <img
            src={theme === "dark" ? Logo : LogoBlack}
            alt="logo"
            className="h-full rounded-md"
            onClick={() => navigate("/dashboard")}
          />
          <div className="flex items-center justify-center gap-2.5">
            <div className="flex items-center justify-center gap-2.5 pr-3">
              <span className="font-medium text-muted-foreground text-xs">Employees</span>
              <Switch checked={mode === "employees"} onCheckedChange={toggleValidationMode} />
              <span className="font-medium text-muted-foreground text-xs">Candidates</span>
            </div>
            <Button size="sm" variant="destructive" onClick={() => setLogout(true)}>
              Logout
            </Button>
            <ModeToggle />
          </div>
        </MaxWidthWrapper>
      </nav>
      <WarningModal
        open={logout}
        title="Are you Sure"
        text={
          <span>
            You want to Logout? <br />
            You can always log back in.
          </span>
        }
        setOpen={setLogout}
        cta={() => {
          localStorage.clear();
          void navigate("/");
        }}
      />
    </>
  );
};

export default Navbar;
