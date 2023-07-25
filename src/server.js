import http from "node:http";
import { json, database } from "./middlewares/json.js";
// const http = require('http')

const database = new Database();


const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("Users");

    return res.end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;
    const user = {
      id: 1,
      name,
      email,
    };

    database.insert("Users", user);

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
