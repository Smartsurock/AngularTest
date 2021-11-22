import { Job } from "./job.model";

export class Profile {
  constructor(
    public id: number,
    public imageUrl: string,
    public position: string,
    public status: string,
    public employment: string,
    public payment: string,
    public wishcity: string,
    public name: string,
    public birthday: string,
    public city: string,
    public phone: string,
    public email: string,
    public social: string,
    public privateMail: string,
    public skills: string,
    public jobs: Job[],
  ) { }
}