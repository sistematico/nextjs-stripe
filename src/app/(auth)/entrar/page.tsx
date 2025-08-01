import { SignInForm } from "@/components/auth/signin";

export default async function SignIn() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <SignInForm />
    </div>
  );
}
