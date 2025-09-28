import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

// Get the webhook secret from environment variables
const secret = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    // Read the body
    const body = await req.text();
    
    // Get the signature from headers
    const signature = req.headers.get(SIGNATURE_HEADER_NAME);
    
    if (!signature) {
      return new NextResponse("No signature in headers", { status: 401 });
    }

    // Verify the signature
    const isValid = await isValidSignature(body, signature, secret);

    if (!isValid) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    // Parse the body
    const parsedBody = JSON.parse(body);
    const { _type, slug, _id, _rev } = parsedBody;

    console.log(`Webhook received for ${_type} document: ${_id}`);

    // Handle different document types
    switch (_type) {
      case "project":
        // Revalidate all affected pages when a project is created/updated/deleted
        
        // Always revalidate the home page (shows latest project)
        revalidatePath("/", "page");
        console.log("Revalidated: /");
        
        // Always revalidate the portfolio listing page
        revalidatePath("/portfolio", "page");
        console.log("Revalidated: /portfolio");
        
        // If we have a slug, revalidate that specific project page
        if (slug?.current) {
          revalidatePath(`/portfolio/${slug.current}`, "page");
          console.log(`Revalidated: /portfolio/${slug.current}`);
        }
        
        // For new projects or updates without slug info
        if (!slug?.current && _rev) {
          // This might be a new project or one being edited
          console.log("Project without slug detected");
        }
        
        return NextResponse.json({
          revalidated: true,
          paths: ["/", "/portfolio", slug?.current ? `/portfolio/${slug.current}` : null].filter(Boolean),
          now: Date.now(),
        });
        
      case "author":
      case "category":
      case "skill":
        // These might affect multiple projects
        // Revalidate everything related to projects
        revalidatePath("/", "page");
        revalidatePath("/portfolio", "layout");
        
        return NextResponse.json({
          revalidated: true,
          message: `Revalidated pages affected by ${_type} change`,
          now: Date.now(),
        });
        
      default:
        console.log(`No revalidation rules for type: ${_type}`);
        return NextResponse.json({
          revalidated: false,
          message: `No revalidation rules for type: ${_type}`,
        });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse(
      `Webhook error: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 }
    );
  }
}