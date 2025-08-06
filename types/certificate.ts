export default interface Certificate {
  _id: string;
  title: string;
  description?: string;
  issuer: string;
  date: string;
  url?: string;
  file?: { asset: { url: string }};
}
