import { makeAutoObservable } from "mobx";

class AuthStore {
  user = null;
  token = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user, token) {
    this.user = user;
    this.token = token;
  }

  clearUser() {
    this.user = null;
    this.token = null;
  }
}

export const authStore = new AuthStore();
