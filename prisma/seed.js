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

  const est3 = await prisma.establishment.create({
    data: {
      name: "Centre Médical Bastille",
      address: "5 Rue de Lyon, 75012 Paris",
      phoneNumber: "0145897412"
    }
  });

  const est4 = await prisma.establishment.create({
    data: {
      name: "Polyclinique Montparnasse",
      address: "45 Boulevard du Montparnasse, 75014 Paris",
      phoneNumber: "0145236981"
    }
  });

  const est5 = await prisma.establishment.create({
    data: {
      name: "Centre Médical Ophtalmo Paris",
      address: "5 Rue de Turin, 75008 Paris",
      phoneNumber: "0142681593"
    }
  })

  const specGeneraliste = await prisma.speciality.create({
    data: { name: "Généraliste" }
  });
  const specDermato = await prisma.speciality.create({
    data: { name: "Dermatologue" }
  });
  const specCardio = await prisma.speciality.create({
    data: { name: "Cardiologue" }
  });
  const specPediatre = await prisma.speciality.create({
    data: { name: "Pédiatre" }
  });
  const specOphtalmo = await prisma.speciality.create({
    data: { name: "Ophtalmologue" }
  });
  const specGyneco = await prisma.speciality.create({
    data: { name: "Gynécologue" }
  })

  await prisma.establishment.update({
    where: { id: est1.id },
    data: { specialities: { connect: [{ id: specGeneraliste.id }, { id: specCardio.id }, { id: specGyneco.id }] } }
  });

  await prisma.establishment.update({
    where: { id: est2.id },
    data: { specialities: { connect: [{ id: specDermato.id }, { id: specGeneraliste.id }] } }
  });

  await prisma.establishment.update({
    where: { id: est3.id },
    data: { specialities: { connect: [{ id: specPediatre.id }, { id: specGeneraliste.id }, { id: specGyneco.id }] } }
  });

  await prisma.establishment.update({
    where: { id: est4.id },
    data: { specialities: { connect: [{ id: specOphtalmo.id }, { id: specCardio.id }] } }
  });

  await prisma.establishment.update({
    where: { id: est5.id },
    data: { specialities: { connect: [{ id: specOphtalmo.id }, { id: specCardio.id }, { id: specGyneco.id }] } }
  });


  const doc1 = await prisma.user.create({
    data: {
      email: "jean.martin@example.com",
      name: "Dr. Jean Martin",
      phoneNumber: "0678123456",
      password: await bcrypt.hash("passer", 10),
      role: "DOCTOR",
      specialityId: specGeneraliste.id,
      establishmentId: est1.id
    }
  });

  const doc2 = await prisma.user.create({
    data: {
      email: "sophie.dupont@example.com",
      name: "Dr. Sophie Dupont",
      phoneNumber: "0687456321",
      password: await bcrypt.hash("passer", 10),
      role: "DOCTOR",
      specialityId: specDermato.id,
      establishmentId: est2.id
    }
  });

  const doc3 = await prisma.user.create({
    data: {
      email: "dr.lambert@example.com",
      name: "Dr. Pierre Lambert",
      phoneNumber: "0612345678",
      password: await bcrypt.hash("passer", 10),
      role: "DOCTOR",
      specialityId: specCardio.id,
      establishmentId: est4.id
    }
  });

  const doc4 = await prisma.user.create({
    data: {
      email: "dr.roger@example.com",
      name: "Dr. Claire Roger",
      phoneNumber: "0698745632",
      password: await bcrypt.hash("passer", 10),
      role: "DOCTOR",
      specialityId: specPediatre.id,
      establishmentId: est3.id
    }
  });

  const doc5 = await prisma.user.create({
    data: {
      email: "dr.moreau@example.com",
      name: "Dr. Claire Moreau",
      phoneNumber: "0687654321",
      password: await bcrypt.hash("passer123", 10),
      role: "DOCTOR",
      specialityId: specGyneco.id,
      establishmentId: est5.id
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

  const pat3 = await prisma.user.create({
    data: {
      email: "marc.durand@example.com",
      name: "Marc Durand",
      phoneNumber: "0678945612",
      password: await bcrypt.hash("passer", 10),
      role: "PATIENT"
    }
  });

  const pat4 = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      name: "John DOE",
      phoneNumber: "0645897123",
      password: await bcrypt.hash("passer123", 10),
      role: "PATIENT"
    }
  });

    const pat5 = await prisma.user.create({
      data: {
        email: "jane.doe@example.com",
        name: "Jane DOE",
        phoneNumber: "0678945612",
        password: await bcrypt.hash("passer", 10),
        role: "PATIENT"
      }
    });

    const pat6 = await prisma.user.create({
      data: {
        email: "marie.durand@example.com",
        name: "Marie Durand",
        phoneNumber: "0632145698",
        password: await bcrypt.hash("passer", 10),
        role: "PATIENT"
      }
    });

    const pat7 = await prisma.user.create({
      data: {
        email: "pierre.bernard@example.com",
        name: "Pierre Bernard",
        phoneNumber: "0698765432",
        password: await bcrypt.hash("passer123", 10),
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
        date: new Date("2025-10-07T11:00:00Z"),
        time: "11:00",
        status: "CONFIRMED",
        patientId: pat3.id,
        doctorId: doc3.id
      },
      {
        date: new Date("2025-10-08T15:00:00Z"),
        time: "15:00",
        status: "CANCELLED",
        patientId: pat1.id,
        doctorId: doc2.id
      },
      {
        date: new Date("2025-10-09T10:00:00Z"),
        time: "10:00",
        status: "PENDING",
        patientId: pat2.id,
        doctorId: doc4.id
      },
      {
        date: new Date("2025-10-10T16:00:00Z"),
        time: "16:00",
        status: "CONFIRMED",
        patientId: pat3.id,
        doctorId: doc1.id
      },
      {
        date: new Date("2025-10-10T16:00:00Z"),
        time: "16:00",
        status: "CONFIRMED",
        patientId: pat5.id,
        doctorId: doc2.id
      },
      {
        date: new Date("2025-10-10T16:00:00Z"),
        time: "16:00",
        status: "CONFIRMED",
        patientId: pat5.id,
        doctorId: doc4.id
      },
      {
        date: new Date("2025-10-10T16:00:00Z"),
        time: "16:00",
        status: "CONFIRMED",
        patientId: pat7.id,
        doctorId: doc3.id
      },
    ]
  });

  await prisma.searchHistory.createMany({
    data: [
      { query: "Dermatologue Paris 11", patientId: pat1.id },
      { query: "Médecin généraliste Paris 13", patientId: pat1.id },
      { query: "Gynécologue", patientId: pat1.id },
      { query: "Cardiologue Montparnasse", patientId: pat2.id },
      { query: "Pédiatre Bastille", patientId: pat2.id },
      { query: "Ophtalmologue Paris", patientId: pat3.id },
      { query: "Consultation acné", patientId: pat3.id }
    ]
  });

  await prisma.doctorFeed.createMany({
  data: [
    {
      title: "Un cabinet de dentiste ouvre près de chez vous",
      content: "Le Dr André ouvre un cabinet de dentiste au 50 rue de la Paix.",
      image: "https://example.com/images/cardiologie.jpg"
    },
    {
      title: "Une épidémie de gastro hivernale",
      content: "De nombreux cas de gastro on été détectés en France. Protégez-vous !",
      image: "https://example.com/images/vaccin.jpg"
    },
    {
      title: "Evolution des remboursement des frais de santé",
      content: "En 2026, les remboursement de frais de santé concernant la chirurgie dentaire vont changer.",
      image: "https://example.com/images/dermato.jpg"
    },
    {
      title: "Campagne de Don du Sang",
      content: "Une campagne de don du sang est prévue le samedi 19 octobre 2025.",
      image: "https://example.com/images/dermato.jpg"
    },
    {
      title: "Ouverture d’un centre d’analyses médicales proche de chez vous",
      content: "Un centre d’analyses médicales ouvre au 99 rue Hervé Clerc.",
      image: "https://example.com/images/dermato.jpg"
    },
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