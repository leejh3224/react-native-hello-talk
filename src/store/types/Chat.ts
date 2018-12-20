import { Message } from "./Message";

export interface Chat {
  id: string;
  owner: string;
  participants: string[];
  messages: Message[];
}
