import { makeAutoObservable } from "mobx";
import { fetchMessages, sendMessage } from "../api";

class MessageStore {
  messages = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadMessages() {
    const data = await fetchMessages();
    this.messages = data;
  }

  async addMessage(content, userId) {
    const newMessage = await sendMessage(content, userId);
    this.messages.push(newMessage);
  }
}

export const messageStore = new MessageStore();
