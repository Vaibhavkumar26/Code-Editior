import {  httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api,  } from "./_generated/api";


const http= httpRouter();

http.route({
    path:"/clerk-webhook",
    method:"POST",

    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEDHOOK_SECRET;
        if (!webhookSecret) {   
            throw new Error("Webhook secret is not set");
        }

        const svix_id= request.headers.get("svix-id");
        const svix_signature= request.headers.get("svix-signature");
        const svix_timestamp= request.headers.get("svix-timestamp");    

        if (!svix_id || !svix_signature || !svix_timestamp) {
            return  new Response("Missing required headers", { status: 400 });
        }



        const payload=await request.json();
        const body=JSON.stringify(payload);

        const wh=new Webhook(webhookSecret);
        let event: WebhookEvent;
        try {
            event = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp,
            })as WebhookEvent;


        }catch (error) {
            console.error("Webhook verification failed:", error);
            return new Response("Invalid signature", { status: 400 });
        }

        const eventType = event.type;
        if (eventType === "user.created") {
            const {id, email_addresses, first_name, last_name} = event.data;
            const email = email_addresses[0]?.email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try{
                // save user to Convex database
                await ctx.runMutation(api.users.syncUsers, {
                    userId: id,
                    email,
                    name,
                });
               
            }catch (error) {
                console.error("Error processing user.created event:", error);
                return new Response("Internal server error", { status: 500 });
            }
        }
        return new Response("Webhook processed successfully", { status: 200 });

        
    }),
})

export default http;
