import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, DealStage } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const contacts = [
  { name: "Maria Alvarez", email: "maria@sunrisebakery.com", phone: "215-555-0142", company: "Sunrise Bakery" },
  { name: "James Okafor", email: "james@okaforlaw.com", phone: "215-555-0198", company: "Okafor Law Group" },
  { name: "Priya Nair", email: "priya@nairconsulting.com", phone: "267-555-0110", company: "Nair Consulting" },
  { name: "DeShawn Miller", email: "deshawn@millerhvac.com", phone: "215-555-0176", company: "Miller HVAC Services" },
  { name: "Grace Lin", email: "grace@linaccounting.com", phone: "610-555-0133", company: "Lin Accounting" },
  { name: "Carlos Rivera", email: "carlos@riverapaint.com", phone: "215-555-0121", company: "Rivera Painting Co" },
  { name: "Aisha Thompson", email: "aisha@thompsonevents.com", phone: "267-555-0187", company: "Thompson Events" },
  { name: "Ben Foster", email: "ben@fosterlandscaping.com", phone: "215-555-0159", company: "Foster Landscaping" },
  { name: "Nadia Hussain", email: "nadia@hussaindesign.com", phone: "610-555-0144", company: "Hussain Design Studio" },
  { name: "Tom Bradley", email: "tom@bradleyplumbing.com", phone: "215-555-0163", company: "Bradley Plumbing" },
  { name: "Elena Petrova", email: "elena@petrovabakery.com", phone: "267-555-0129", company: "Petrova Pastry Shop" },
  { name: "Marcus Webb", email: "marcus@webbfitness.com", phone: "215-555-0151", company: "Webb Fitness Studio" },
];

const stages: DealStage[] = ["LEAD", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "WON", "LOST"];

const dealTitles = [
  "Website redesign",
  "Monthly retainer",
  "Q3 signage order",
  "Equipment upgrade",
  "Annual service contract",
  "Branding package",
  "New location buildout",
  "Referral partnership",
];

async function main() {
  await prisma.deal.deleteMany();
  await prisma.contact.deleteMany();

  const created = [];
  for (const c of contacts) {
    created.push(await prisma.contact.create({ data: c }));
  }

  let dealCount = 0;
  for (let i = 0; i < created.length; i++) {
    const contact = created[i];
    const numDeals = i % 3 === 0 ? 2 : 1;
    for (let j = 0; j < numDeals; j++) {
      const stage = stages[dealCount % stages.length];
      const title = dealTitles[dealCount % dealTitles.length];
      await prisma.deal.create({
        data: {
          title: `${title} — ${contact.company}`,
          valueCents: (500 + ((dealCount * 137) % 4500)) * 100,
          stage,
          expectedCloseDate: new Date(Date.now() + (dealCount % 60) * 86_400_000),
          contactId: contact.id,
        },
      });
      dealCount++;
    }
  }

  console.log(`Seeded ${created.length} contacts and ${dealCount} deals.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
