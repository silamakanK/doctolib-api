import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient;

const getAllFeeds = async (req, res) => {
    try {
        const feeds = await prisma.doctorFeed.findMany();
        res.json(feeds)
    } catch (error) {
        console.error("Erreur prisma /doctorfeed:", error);
        res.status(500).json({ error: "Impossible de récupérer les actualités !" });
    }
};

const getFeedById = async (req, res) => {
  const { id } = req.params;
  try {
    const feed = await prisma.doctorFeed.findUnique({
      where: { id: parseInt(id) }
    });
    if (feed) {
      res.json(feed);
    } else {
      res.status(404).json({ error: "Feed not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feed" });
  }
};
export default { getAllFeeds, getFeedById }