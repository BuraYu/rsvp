import BackgroundAuth from "@/components/BackgroundAuth";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="flex h-screen">
      <LoginForm />
      <BackgroundAuth name={"Sign Up"} link={"signup"} />
    </div>
  );
}
