import { SignUpForm } from "@/components/auth/signup";

export default async function SignUp() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <SignUpForm />
    </div>
  );
}