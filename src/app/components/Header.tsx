import {
  getSignInUrl,
  getSignUpUrl,
  signOut,
  withAuth,
} from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Header() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const signOutUrl = await getSignUpUrl();

  return (
    <header>
      <div className="container flex justify-between items-center mx-auto my-4">
        <Link href={"/"} className="font-bold text-xl">
          Job Board
        </Link>
        <nav className="flex gap-2">
          {!user ? (
            <Link
              href={signInUrl}
              className="bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 rounded-md"
            >
              Login
            </Link>
          ) : (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 rounded-md">
                Logout
              </button>
            </form>
          )}

          <Link
            href={"/new-listing"}
            className="bg-blue-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-md"
          >
            Post Job
          </Link>
        </nav>
      </div>
    </header>
  );
}
