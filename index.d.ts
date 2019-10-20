import { Store } from "express-session";
import { Express } from "express";
import * as next from "next";
import { LuscaOptions } from "lusca";
import { INextAuthSessionData } from "./client";

export interface Options {
  bodyParser?: boolean;
  csrf?: boolean | LuscaOptions;
  pathPrefix?: string;
  expressApp?: Express.Application;
  expressSession: any;
  sessionSecret: string;
  sessionStore: Store;
  sessionMaxAge: number;
  sessionRevalidateAge: number;
  sessionResave?: boolean;
  sessionRolling?: boolean;
  sessionSaveUninitialized?: boolean;
  serverUrl?: string;
  trustProxy?: boolean;
  providers: any[];
  port?: number;
  functions: IFunctions;
}

export interface UserProvider {
  name: string;
  id: string;
}

export interface SendSignInEmailOpts {
  email?: string;
  url?: string;
  req?: Express.Request;
}

export interface SignInOpts {
  email?: string;
  password?: string;
}

export interface FindParamsType<
  UserType = {},
  IDType = string,
  SessionType extends INextAuthSessionData = INextAuthSessionData
> {
  id: IDType | null;
  email: string | null;
  emailToken: string | null;
  provider: IUserProvider | null;
}

export interface Functions<
  UserType = {},
  IDType = string,
  SessionType extends INextAuthSessionData = INextAuthSessionData
> {
  find(opts: IFindParamsType<UserType, IDType, SessionType>): Promise<UserType>;
  update: (user: UserType, profile: any) => Promise<UserType>;
  insert: (user: UserType, profile: any) => Promise<UserType>;
  remove: (id: IDType) => Promise<boolean>;
  serialize: (user: UserType) => Promise<IDType>;
  deserialize: (id: IDType) => Promise<UserType>;
  session?: (
    session: INextAuthSessionData,
    req: Express.Request
  ) => SessionType;
  sendSignInEmail?: (opts: ISendSignInEmailOpts) => Promise<boolean>;
  signIn?: (opts: ISignInOpts) => Promise<UserType>;
}

export interface NextAuthResult {
  next?: next.Server;
  express: Express;
  expressApp: Express.Application;
  function: IFunctions;
  providers: any;
  port?: number;
}

export default function NextAuth(
  nextApp?: next.Server,
  options?: IOptions
): Promise<INextAuthResult>;
