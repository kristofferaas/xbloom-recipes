import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recipes: defineTable({
    name: v.string(),
    description: v.string(),
    coffeeAmount: v.number(), // grams
    waterAmount: v.number(), // ml
    grindSize: v.string(), // e.g., "fine", "medium", "coarse"
    brewTime: v.number(), // seconds
    temperature: v.number(), // celsius
    method: v.string(), // e.g., "pour-over", "french-press", "espresso"
    notes: v.optional(v.string()),
  }),
});
