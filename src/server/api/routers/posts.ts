import type { User } from "@clerk/nextjs/api";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.imageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.userId),
        limit: 100,
      })
    ).map(filterUserForClient);

    return posts.map((post) => {
      const user = users.find((user) => user.id === post.userId);

      if (!user || !user.username)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User for post not found",
        });

      return { post, user: { ...user, username: user.username } };
    });
  }),
});
