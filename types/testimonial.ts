import Client from "./client";

export default interface Testimonial {
  _id: string;
  client: Client;
  date: string;
  title?: string;
  content: string;
  score?: number; // 0 - 1
}
