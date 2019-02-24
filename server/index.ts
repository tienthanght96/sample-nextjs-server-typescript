import { Request, Response } from "express";
const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');


const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = 'authenticated';
const COOKIE_SECRET = '123qweasdzxc';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true
};

const authenticate = async (email: string, password: string) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data.find((user: any) => {
    if (user.email === email && user.website === password) {
      return user;
    }
  });
};

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser(COOKIE_SECRET));

  // get body from request -> save token cookie when login success
  server.post("/api/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authenticate(email, password);
    if (!user) {
      return res.status(403).send("Invalid email or password");
    }
    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_USER_TYPE
    };
    res.cookie("token", userData, COOKIE_OPTIONS);
    res.json(userData);
  });

  server.get("/api/profile", async (req: Request, res: Response) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if(token && token.email) {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
       const userProfile = data.find((user: any) => user.email === token.email);
      return res.json({ user: userProfile });
    }
    res.sendStatus(404);
  });

  server.post("/api/logout", (_0: Request, res: Response) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.sendStatus(204);
  });

  server.get("*", (req: any, res: any) => {
    return handle(req, res);
  });

  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`Listening on PORT ${port}`);
  });
});
