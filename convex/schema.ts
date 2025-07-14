import { defineSchema,defineTable } from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    users: defineTable({
        userId:v.string(), // Clerk user ID 
        email:v.string(), // User's email address
        name:v.string(), // User's name
        isPro:v.boolean(), // Whether the user has a Pro subscription
        proSince:v.optional(v.number()), // Date when the user subscribed to Pro
        lemonSqueezyId:v.optional(v.string()), // LemonSqueezy customer ID
        lemonSqueezyOrderId:v.optional(v.string()),

    }).index("by_uset_id", ["userId"]),

    codeExecutives:defineTable({
        userId:v.string(),
        language:v.string(), // Programming language of the code
        code:v.string(), // The code to be executed
        output:v.optional(v.string()), // Input for the code execution
        error:v.optional(v.string()), // Error message if execution fails
    }).index("by_user_id", ["userId"]),

    snippets:defineTable({
        userId:v.string(),
        title:v.string(),
        language:v.string(),
        code:v.string(),
        userName:v.string(),

    }).index("by_user_id",["userId"]),


    snippetsComments:defineTable({
        snippetsId:v.id("snippets"), // ID of the snippet being commented on
        userId:v.string(), // ID of the user who made the comment   
        userName:v.string(),
        content:v.string(),

    }).index("by_snippet_id", ["snippetsId"]),

    star:defineTable({
        userId:v.id("string"), // ID of the user who starred the snippet
        snippetsId:v.id("snippets"), // ID of the snippet that was starred
    })
    .index("by_user_id", ["userId"])
    .index("by_snippets_id", ["snippetsId"])
    .index("by_user_id_snippets_id", ["userId", "snippetsId"]),


})