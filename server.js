const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const books = [
  {
    id: 0,
    title: "The Alchemist",
    author: "Paulo Coelho",
  },
  {
    id: 1,
    title: "The Little Prince",
    author: "Antoine de Saint-Exupery",
  },
];

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

app.get("/books", authenticateToken, (req, res) => {
  res.json(books);
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const users = [
  {
    username: "admin",
    password: "$2b$10$LITJOGBRrxoEmHZMDEtGze1T6RxhrdfE37IXpPG4dE9no4N/jKkGC", // 123456
  },
];

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

app.post("/login", async (req, res) => {
  // Authenticate User
  const user = users.find((user) => user.username === req.body.username);

  if (user == null) {
    return res.status(400).send("Cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Generate JWT to send to client
      const accessToken = jwt.sign(user, "mySecretKey");
      res.json({ accessToken: accessToken });
    } else {
      res.send("Not Allowed");
    }
  } catch {
    return res.status(500).send();
  }
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader == null) {
    return res.sendStatus(401); // 401 Unauthorized. user didn't provide any token
  } else {
    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.sendStatus(403); // 403 Forbidden. user provided invalid token
      } else {
        req.user = user;
        next();
      }
    });
  }
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

app.listen(80);
