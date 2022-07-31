export default function handler(req, res) {
  if (!res) res.status(400).json({ status: 400, message: "Bad Request" });

  cookies.set("theme", req.theme);

  res.status(200).json({ status: 200, message: "OK" });
}
