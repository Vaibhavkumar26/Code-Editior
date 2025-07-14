import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import ThemeSelector  from "./ThemeSelector";
import  LanguageSelector  from "./LanguageSelector";
import { SignedIn } from "@clerk/nextjs";
import  HeadProfileBtn  from "./HeadProfileBtn";
import  RunButton  from "./RunButton";

export const Header = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const Convexuser = await convex.query(api.users.getUser, {
    userid: user?.id || "",
  });

  console.log("Convex User", Convexuser);

  return (
    <div className="relative z-10">
      <div
        className="flex items-center lg:justify-between justify-center
        bg-green-200/60 backdrop-blur-md p-6 mb-4 rounded-xl shadow-lg border border-green-400/30 ring-1 ring-green-300/20"
      >
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group relative">
            {/* Glowing effect on hover */}
            <div
              className="absolute -inset-2 bg-gradient-to-r from-green-300/30 to-lime-200/30 rounded-xl opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
            />
            {/* Icon container */}
            <div
              className="relative bg-white p-2 rounded-xl ring-1
              ring-green-300/30 group-hover:ring-green-400/40 transition-all"
            >
              <Blocks className="size-6 text-green-600 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>

            {/* Title and subtitle */}
            <div className="flex flex-col">
              <span className="block text-lg font-semibold text-green-700">
                V.S.code
              </span>
              <span className="block text-xs text-green-600/70 font-medium">
                Interactive Code Editor
              </span>
            </div>
          </Link>

          <nav className="flex items-center space-x-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-green-700 bg-green-200/30 
      hover:bg-green-300/20 border border-green-300/30 hover:border-green-400/50 
      transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-lime-300/20 
        opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span
                className="text-sm font-medium relative z-10 group-hover:text-green-900
       transition-colors"
              >
                Snippets
              </span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(Convexuser?.isPro)} />
          </div>

          {!Convexuser?.isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          )}

          <SignedIn>
            <RunButton />
          </SignedIn>

          <div className="pl-3 border-l border-gray-800">
            <HeadProfileBtn />
          </div>
        </div>+

      </div>
    </div>
  );
};
