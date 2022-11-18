import dbConnect from "../../lib/dbconnect/dbconnect.js";

// Schemas
import Document from "../../database/Documents.js";

const POST = async (req, res) => {
  return res.status(200).json({ status: 200, body: "Success!" });
};

const GET = async (req, res) => {
  if (!req.headers.target)
    return res
      .status(400)
      .json({ status: 400, body: "'target' missing from headers." });

  const target = req.headers.target;

  await dbConnect();

  const data = await Document.findOne({ name: target });

  return res.status(200).json({
    status: 200,
    body: {
      text: "Success!",
      found: data !== null,
      data: data,
    },
  });
};

export default async function handler(req, res) {
  if (!req) return res.status(400).json({ status: 400, body: "Missing req!" });

  switch (req.method) {
    case "POST":
      return POST(req, res);
    case "GET":
      return GET(req, res);
    default:
      return res
        .status(500)
        .json({ status: 500, body: "Error handling request method." });
  }
}
