import Section from "../utils/section";
import { SectionH } from "../ui/typography";
import TestimonialCard from "../utils/testimonial-card";
import Image from "next/image";
import ClientAvatar from "../utils/client-avatar";
import { getSanityData } from "@/lib/get-sanity-data";
import {
  ClientData,
  processClient,
  processClients,
} from "@/types/client";
import Testimonial from "@/types/testimonial";

export default async function Testimonials() {
  // Fetch testimonials
  const rawTestimonials =
    (await getSanityData<Testimonial[]>(`*[_type == "testimonial"]{
    client->{
      _id,
      name,
      personTitle,
      logo,
      fullImage,
      website
    },
    date,
    title,
    content,
    proofUrl,
    score
  }`)) ?? [];

  // Manually create Client data because typescript is broken
  const testimonials = rawTestimonials.map((t) => ({
    ...t,
    client: processClient(t.client),
  }));

  // Fetch clients
  const rawClients =
    (await getSanityData<ClientData[]>(`*[_type == "client"]{
    _id,
    name,
    personTitle,
    logo,
    fullImage,
    website
  }`)) ?? [];

  // Manually create Client data because typescript is broken
  const clients = processClients(rawClients);

  if (clients.length === 0) return null;

  return (
    <Section id="testimonials" className="gap-2 justify-center items-center">
      <SectionH>
        {testimonials && testimonials.length > 0
          ? "Testimonials"
          : "Trusted by"}
      </SectionH>
      <div className="flex flex-col gap-12 justify-center items-center w-full max-w-3xl">
        <h3 className="text-xl text-muted-foreground">
          Join the people who trusted my services
        </h3>
        {/* List of clients */}
        <div className="w-full flex flex-wrap gap-4 justify-center items-center">
          {clients.map((client) =>
            client.resolvedFullImage ? (
              <div key={client._id} className="relative h-12 aspect-video">
                <Image
                  src={client.resolvedFullImage}
                  alt={`${client.name}'s logo`}
                  className="object-contain"
                  fill
                />
              </div>
            ) : (
              <ClientAvatar
                key={client._id}
                client={client}
                avatarClassName="size-12"
                hideWebsite
              />
            )
          )}
        </div>

        {/* Testimonial */}
        {testimonials && testimonials.length > 0 && (
          <TestimonialCard testimonials={testimonials} />
        )}
      </div>
    </Section>
  );
}
