import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllAppointements = async (req, res) => {
    try {
        const appointments = await prisma.appointment.findMany();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: "Impossible de récupérer les rendez-vous !" });
    }
};

const getAppointementByPatientId = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await prisma.appointment.findMany({
            where: { patientId: parseInt(id) }
        });
        if (appointment) {
            res.json(appointment);
        } else {
            res.status(404).json({ error: "Rendez-vous non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Échec de la récupération du rendez-vous" });
    }
};

const createAppointement = async (req, res) => {
    const { date, time, userId, doctorId } = req.body;

    try {
        const newAppointment = await prisma.appointment.create({
            data: { date, time, userId, doctorId }
        });
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: "Échec de la création du rendez-vous" });
    }
};

const updateAppointement = async (req, res) => {
    const { id } = req.params;
    const { date, time, userId, doctorId } = req.body;

    try {
        const dataToUpdate = {};

        if(date) dataToUpdate.date = date;
        if(time) dataToUpdate.time = time;
        if(userId) dataToUpdate.userId = userId;
        if(doctorId) dataToUpdate.doctorId = doctorId;

        const updatedAppointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: dataToUpdate
        });
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: "Échec de la mise à jour du rendez-vous" });
    }
};

const deleteAppointement = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.appointment.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Échec de la suppression du rendez-vous" });
    }
};

export default { 
    getAllAppointements,
    getAppointementByPatientId,
    createAppointement,
    updateAppointement, 
    deleteAppointement 
};