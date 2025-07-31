import { SignUpForm } from "@/components/auth/signup";

export default async function SignUp() {
  return (
    <div className="container mx-auto py-20">
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] w-full w-md-2xl">
        <SignUpForm />
      </div>
    </div>
  );
}