import { SectionH } from "../ui/typography";
import CertificateCarousel from "../utils/certificate-carousel";
import Section from "../utils/section";
import Certificate from "@/types/certificate";


const certificates: Certificate[] = [
  {
    _id: "1",
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    description: "Professional certification for designing distributed systems on AWS",
    url: "#",
  },
  {
    _id: "2",
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
    description: "Advanced certification in Google Cloud Platform architecture",
    url: "#",
  },
  {
    _id: "3",
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2023",
    description: "Comprehensive certification covering React fundamentals and advanced concepts",
    url: "#",
  },
  {
    _id: "4",
    title: "Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2024",
    description: "Certified Kubernetes Administrator (CKA) for container orchestration",
    url: "#",
  },
  {
    _id: "5",
    title: "MongoDB Developer",
    issuer: "MongoDB University",
    date: "2023",
    description: "Professional certification for MongoDB database development",
    url: "#",
  },
]

export default async function Certificates() {


  return (
    <Section id="certificates" className="gap-8 justify-center items-center">
      <SectionH>Certificates</SectionH>
      <CertificateCarousel certificates={certificates} />
    </Section>
  )
}