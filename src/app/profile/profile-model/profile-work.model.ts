import { Job } from "./job.model";

export class ProfileWork {
  constructor(
    public email: string,
    public skills: string,
    public jobs: Job[],
  ) { }
}