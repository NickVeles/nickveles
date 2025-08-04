import Client from "./client";

export default interface Referral {
  _id: string;
  client: Client;
  date: string;
  content: string;
}
