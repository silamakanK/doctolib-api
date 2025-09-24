import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    const est1 = await prisma.establishment.create({
    data: {
      name: "Clinique Saint-Michel",
      address: "12 Rue de la Santé, 75013 Paris",
      phoneNumber: "0145789632"
    }
  });

  const est2 = await prisma.establishment.create({
    data: {
      name: "Cabinet Médical République",
      address: "22 Avenue de la République, 75011 Paris",
      phoneNumber: "0145236987"
    }
  });

  const doc1 = await prisma.user.create({
    data: {
      email: "dr.martin@example.com",
      name: "Dr. Jean Martin",
      phoneNumber: "0678123456",
      password: await bcrypt.hash("passer", 10),
      role: "DOCTOR",
      speciality: "GENERALISTE",
      establishmentId: est1.id
    }
  });

  const doc2 = await prisma.user.create({
    data: {
      email: "dr.dupont@example.com",
      name: "Dr. Sophie Dupont",
      phoneNumber: "0687456321",
      password: await bcrypt.hash("passer", 10),
      role: "DOCTOR",
      speciality: "DERMATOLOGUE",
      establishmentId: est2.id
    }
  });

  const pat1 = await prisma.user.create({
    data: {
      email: "paul.dupuis@example.com",
      name: "Paul Dupuis",
      phoneNumber: "0654789632",
      password: await bcrypt.hash("passer", 10),
      role: "PATIENT"
    }
  });

  const pat2 = await prisma.user.create({
    data: {
      email: "lea.moreau@example.com",
      name: "Léa Moreau",
      phoneNumber: "0645897123",
      password: await bcrypt.hash("passer", 10),
      role: "PATIENT"
    }
  });

  await prisma.appointment.createMany({
    data: [
      {
        date: new Date("2025-10-05T09:00:00Z"),
        time: "09:00",
        status: "CONFIRMED",
        patientId: pat1.id,
        doctorId: doc1.id
      },
      {
        date: new Date("2025-10-06T14:30:00Z"),
        time: "14:30",
        status: "PENDING",
        patientId: pat2.id,
        doctorId: doc2.id
      },
      {
        date: new Date("2025-10-08T11:00:00Z"),
        time: "11:00",
        status: "CANCELLED",
        patientId: pat1.id,
        doctorId: doc2.id
      }
    ]
  });

  console.log("✅ Données mocks insérées avec succès !");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });