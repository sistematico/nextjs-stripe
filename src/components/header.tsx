import { getCurrentUser } from "@/lib/user";
import { Navbar } from "@/components/navbar";

export async function Header() {
  const user = await getCurrentUser({ withFullUser: true });
  
  return <Navbar user={user} />;
}