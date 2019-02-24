import Router from "next/router";
import { appAxios } from "@src/config/axios";

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

export function getServerSideToken(request: any) {
  const { signedCookies = {} } = request;
  if(!signedCookies) {
    return {};
  } else if(!signedCookies.token) {
    return {};
  }

  return { user: signedCookies.token };
};

export function getClientSideToken() {
  if(typeof window !== 'undefined') {
    const windowClient = window as any;
    const user = windowClient[WINDOW_USER_SCRIPT_VARIABLE] ? windowClient[WINDOW_USER_SCRIPT_VARIABLE] : {};
    return { user };
  }

  return { user: {} };
};

export function getUserScript(user: any) {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)};`;
};

export function redirectUser(res: any, path: string) {
  if(res) {
    res.redirect(302, path);
    res.finished = true;
    return {};
  }
  Router.replace(path);
  return {};
};

export async function logoutUser() {
  if (typeof window !== "undefined") {
    const windowClient = window as any;
    windowClient[WINDOW_USER_SCRIPT_VARIABLE] = {};
  }
  await appAxios.post("/api/logout");
  Router.push("/login");
};

export async function loginUser (email: string, password: string) {
  const { data } = await appAxios.post("/api/login", { email, password });
  if (typeof window !== "undefined") {
    const windowClient = window as any;
    windowClient[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
  }
};

export function authInitialProps(isProtectedRoute?: boolean) {
  return function({ req, res }: any) {
    const auth = req ? getServerSideToken(req) : getClientSideToken();
    const currentPath = req ? req.url : window.location.pathname;
    const user = auth.user;
    const isAnonymous = !user || user.type !== "authenticated";
    if (isProtectedRoute && isAnonymous && currentPath !== "/login") {
      return redirectUser(res, "/login");
    }
  
    return { auth };
  }
}