import { getSanityData } from "@/lib/get-sanity-data";
import { SectionH } from "../ui/typography";
import CertificateCarousel from "../utils/certificate-carousel";
import Section from "../utils/section";
import { CertificateData, processCertificates } from "@/types/certificate";

export default async function Certificates() {
  // Fetch certificate data
  const rawCertificates = await getSanityData<CertificateData[]>(`*[_type == "certificate"]{
    _id,
    title,
    description,
    issuer,
    date,
    url,
    file {
      asset->{
        url
      }
    },
    image
  } | order(title asc)`) ?? [];

  if (rawCertificates.length === 0) return null;

  // Process the raw data into plain objects with computed properties
  const certificates = processCertificates(rawCertificates);

  return (
    <Section id="certificates" className="gap-8 justify-center items-center">
      <SectionH>Certificates</SectionH>
      <CertificateCarousel certificates={certificates} />
    </Section>
  )
}