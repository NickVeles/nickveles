import Section from "../utils/section";
import { SectionH } from "../ui/typography";
import TestimonialCard from "../utils/testimonial-card";
import Image from "next/image";
import ClientAvatar from "../utils/client-avatar";
import { getSanityData } from "@/lib/get-sanity-data";
import Client from "@/types/client";
import Testimonial from "@/types/testimonial";

export default async function Testimonials() {
  // Fetch testimonials
  const testimonials = await getSanityData<
    Testimonial[]
  >(`*[_type == "testimonial"]{
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
  }`);

  // Fetch clients
  const clients = await getSanityData<Client[]>(`*[_type == "client"]{
    _id,
    name,
    personTitle,
    logo,
    fullImage,
    website
  }`);

  if (!clients || clients.length === 0) return null;

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
              <div className="relative h-16 aspect-video">
                <Image
                  key={client._id}
                  src={client.resolvedFullImage}
                  alt={`${client.name}'s logo`}
                  className="object-contain"
                  fill
                />
              </div>
            ) : (
              <ClientAvatar key={client._id} client={client} hideWebsite />
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
