import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  // beforeAuth: () => {
  //   console.log("This is a middleware log");
  // },
  publicRoutes: [
    "/api/trpc/posts.getAll",
    // "/api/trpc/posts.getById",
    // "/api/trpc/posts.getPostsByUserId",
    // "/api/trpc/profile.getUserByUsername",
  ],
});

export const config = {
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
