import { urlFor } from "@/lib/sanity-image";

export default class Client {
  _id: string;
  name: string;
  personTitle?: string;
  logo?: any;
  resolvedLogo?: string;
  fullImage?: any;
  resolvedFullImage?: string;
  website?: string;

  constructor(data: {
    _id: string;
    name: string;
    personTitle?: string;
    logo?: any;
    website?: string;
  }) {
    this._id = data._id;
    this.name = data.name;
    this.personTitle = data.personTitle;
    this.logo = data.logo;
    this.website = data.website;

    this.resolvedLogo = this.logo ? urlFor(this.logo).width(64).height(64).url() : undefined;
    this.resolvedFullImage = this.fullImage ? urlFor(this.fullImage).height(64).url() : undefined;
  }
}
