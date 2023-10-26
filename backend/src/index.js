import express from "express";

const app = express();

app.use("/api/todos", (req, res) => {
  res.json([
    { id: 1, text: "todo 1" },
    { id: 2, text: "todo 2" },
    { id: 3, text: "todo 3" },
    { id: 4, text: "todo 4" },
  ]);
});

app.listen(3000);
