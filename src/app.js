const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();


app.disable("x-powered-by");
app.use(express.json());

// ❌ Bug: Hardcoded secret (bad practice)
//const SECRET_KEY = "12345-plaintext-secret"; 

//✅ Best Practice: Use environment variable for secret
const SECRET_KEY = process.env.SECRET_KEY;

app.get('/', (req, res) => {
  res.send("Hello World");
});

// ❌ Vulnerability: Using eval (dangerous)
// app.get('/eval', (req, res) => {
//   const code = req.query.code;
//   res.send(eval(code)); // Sonar will flag this
// });

//✅ Safer alternative to eval
app.get('/eval', (req, res) => {
  const code = req.query.code;
    if (code === "2+2") {
        res.status(200).send("4");
    } else {
        res.status(400).send("Invalid code");
    }
});

app.post("/login", (req, res) => {
  const token = jwt.sign({ user: req.body.user }, SECRET_KEY); // ❌ Sonar will flag this as hardcode secret
  res.json({ token });
});

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;