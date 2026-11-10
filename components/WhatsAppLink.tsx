import { CONTACT_LABEL, CONTACT_URL } from "@/lib/links";

export default function WhatsAppLink() {
  return (
    <a
      href={CONTACT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand underline"
    >
      WhatsApp {CONTACT_LABEL}
    </a>
  );
}