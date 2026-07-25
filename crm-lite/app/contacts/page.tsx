import { prisma } from "@/lib/prisma";
import { ContactList } from "@/components/ContactList";
import { ContactForm } from "@/components/ContactForm";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    include: { deals: { select: { id: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <h1>Contacts</h1>
      <ContactList contacts={contacts} />
      <h2>Add a contact</h2>
      <ContactForm />
    </>
  );
}
