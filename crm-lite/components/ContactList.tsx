import Link from "next/link";

type ContactWithDeals = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  deals: { id: string }[];
};

export function ContactList({ contacts }: { contacts: ContactWithDeals[] }) {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact.id} className="card">
          <div className="contact-row">
            <Link href={`/contacts/${contact.id}`}>
              <strong>{contact.name}</strong>
            </Link>
            <span className="muted">{contact.deals.length} deal(s)</span>
          </div>
          <div className="muted">
            {contact.company ?? "—"} {contact.email ? `· ${contact.email}` : ""}
          </div>
        </li>
      ))}
    </ul>
  );
}
