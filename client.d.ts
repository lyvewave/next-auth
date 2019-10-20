/// <reference path="./index.d.ts" />
import * as http from "http";

export class NextAuth {
  static init(opts: IInitOptions): Promise<Partial<INextAuthSessionData>>;
  static csrfToken(): Promise<string | Error>;
  static linked(opts: IClientOptions): Promise<ILinkedAccounts | Error>;
  static providers(opts: IClientOptions): Promise<IProviders | Error>;
  static signin(
    params: string | { [k: string]: string }
  ): Promise<boolean | Error>;
  static signout(): Promise<true | Error>;

  static _getLocalStore(): Promise<INextAuthSessionData | null>;
  static _saveLocalStore(): Promise<boolean>;
  static _removeLocalStore(): Promise<boolean>;
}

export interface LinkedAccounts {
  [name: string]: boolean;
}

export interface Provider {
  signin: string;
  callback: string;
}

export interface Providers {
  [name: string]: IProvider;
}

export interface NextAuthSessionData<UserType = {}> extends Express.Session {
  maxAge: number;
  revalidateAge: number;
  csrfToken: string;
  user?: UserType;
  expires?: number;
}

export interface NextAuthRequest<
  SessionType extends INextAuthSessionData = INextAuthSessionData
> extends Express.Request {
  session: SessionType;
  linked: () => Promise<ILinkedAccounts | Error>;
  providers: () => Promise<IProviders | Error>;
}

export interface InitOptions {
  req?: http.IncomingMessage;
  force?: boolean;
}

export interface ClientOptions {
  req?: http.IncomingMessage;
}
