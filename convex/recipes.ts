import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("recipes").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    coffeeAmount: v.number(),
    waterAmount: v.number(),
    grindSize: v.string(),
    brewTime: v.number(),
    temperature: v.number(),
    method: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("recipes", args);
  },
});
