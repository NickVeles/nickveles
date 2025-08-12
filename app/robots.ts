import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      process.env.NEXT_PUBLIC_UPWORK_CENSOR
        ? {
            userAgent: "*",
            disallow: ["/"],
          }
        : {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/api/", "/private/"],
          },
    ],
  };
}
