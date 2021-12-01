export class Message {
  constructor(
    public friendId: number,
    public toEmail: string,
    public fromEmail: string,
    public name: string,
    public imageUrl: string,
    public text: string,
    public edit: number,
    public unread: boolean,
  ) { }
}