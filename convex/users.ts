import {mutation} from "./_generated/server"
import {v} from "convex/values";
import {query} from "./_generated/server";

export const syncUsers = mutation({
    args:{
        userId:v.string(),
        email:v.string(),
        name:v.string(),
    },
    handler: async(ctx , args)=>{
        const exisitingUser = await ctx.db.query("users")
        .filter(q => q.eq(q.field("userId"), args.userId))
        .first();
        if(!exisitingUser){
            await ctx.db.insert("users",{
                userId: args.userId,
                email: args.email,
                name: args.name,
                isPro: false,
                
            });
        }
    }
})

export const getUser=query({
    args:{userid:v.string()},

    handler: async(ctx, args)=>{
        if(!args.userid) return null;
        const user = await ctx.db
        .query("users")
        .withIndex("by_uset_id")
        .filter(q => q.eq(q.field("userId"), args.userid))
        .first();

        if(!user) return null;
        return user;


    },

});