import BackgroundAuth from "@/components/BackgroundAuth";
import SignupForm from "./components/SignupForm";

export default function Login() {
  return (
    <div className="flex h-screen">
      <SignupForm />
      <BackgroundAuth name={"Login"} link={"login"} />
    </div>
  );
}
