const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();


app.disable("x-powered-by");
app.use(express.json());

// ❌ Bug: Hardcoded secret (bad practice)
const SECRET_KEY = "12345-plaintext-secret"; 

app.get('/', (req, res) => {
  res.send("Hello World");
});

// ❌ Vulnerability: Using eval (dangerous)
app.get('/eval', (req, res) => {
  const code = req.query.code;
  res.send(eval(code)); // Sonar will flag this
});

app.post("/login", (req, res) => {
  const token = jwt.sign({ user: req.body.user }, SECRET_KEY); // ❌ Sonar will flag this as hardcode secret
  res.json({ token });
});

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;