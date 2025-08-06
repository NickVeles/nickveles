export default class Certificate {
  _id: string;
  title: string;
  description?: string;
  issuer: string;
  date: string;
  url?: string;
  file?: any;

  constructor(data: {
    _id: string;
    title: string;
    description?: string;
    issuer: string;
    date: string;
    url?: string;
    file?: any;
  }) {
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.issuer = data.issuer;
    this.date = data.date;
    this.file = data.file;

    // Overwrite url from file.asset.url if available
    if (data.file?.asset?.url) {
      this.url = data.file.asset.url;
    } else {
      this.url = data.url;
    }
  }
}
