export interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  read: Read;
}

interface Read {
  [key: string]: boolean | undefined;
}
