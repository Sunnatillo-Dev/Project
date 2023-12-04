import News from "@/data/News.json";
export default function getNews(req, res) {
  res.status(200).json(News);
}
