import { NextResponse, type NextRequest } from "next/server";
import { getUserFromSession, updateUserSessionExpiration } from "@/lib/session";

const privateRoutes = ["/private"];
const adminRoutes = ["/admin"];

async function middlewareAuth(request: NextRequest) {
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (!user) return NextResponse.redirect(new URL("/entrar", request.url));
  }

  if (adminRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (!user) return NextResponse.redirect(new URL("/entrar", request.url));
    if (user.role !== "admin") return NextResponse.redirect(new URL("/", request.url));
  }
}

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
    get: (key) => request.cookies.get(key),
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"],
};
