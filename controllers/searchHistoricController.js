import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

const getAllHistoricsByPatientId = async (req, res) => {
    const { id } = req.params;
    try {
        const historics = await prisma.searchHistory.findMany({
            where: { patientId: parseInt(id) }
        });

        if(historics.length > 0) {
            res.json({historics})
        } else {
            res.status(404).json({ error: "Aucun historique de recherche trouvé" })
        }
    } catch(error) {
        res.status(500).json({error: "Échec de la récupération des historiques "})
    }
}

export default { getAllHistoricsByPatientId }