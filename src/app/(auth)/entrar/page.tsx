import { SignInForm } from "@/components/auth/signin";

export default async function SignIn() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <SignInForm />
      </div>
    </div>
  );
}
