import express from "express";

const app = express();

app.use("/api/todos", (req, res) => {
  const data = [];

  for (let i = 0; i < 500; i++) {
    data.push({ id: i, text: `todo ${i}` });
  }

  res.json(data);
});

app.listen(3000);
