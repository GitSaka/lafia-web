import type { Metadata } from "next";
import DownloadButton from "@/components/DownloadButton";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Télécharger l'app",
  description:
    "Télécharge Lafia Shop sur Android : installation en quelques étapes.",
};

const steps = [
  "Appuie sur « Télécharger pour Android » et attends la fin du téléchargement.",
  "Ouvre le fichier téléchargé (dans les notifications ou le dossier « Téléchargements »).",
  "Si le téléphone le demande, active « Autoriser depuis cette source », puis reviens en arrière.",
  "Appuie sur « Installer », puis sur « Ouvrir ».",
];

export default function DownloadPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Télécharge Lafia Shop</h1>
      <p className="mt-3 text-muted">
        Gratuit, pour téléphones Android. Trouve des produits près de toi et
        contacte directement les vendeurs.
      </p>

      <div className="mt-6">
        <DownloadButton className="w-full sm:w-auto" />
      </div>

      <h2 className="mt-10 text-xl font-bold">Comment installer</h2>
      <ol className="mt-4 space-y-3">
        {steps.map((s, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-xl border border-line bg-white p-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

           <p className="mt-6 rounded-xl bg-brand-softer p-4 text-sm text-muted">
        Android affiche un avertissement : c&apos;est normal. L&apos;app
        n&apos;est pas encore sur le Play Store, donc le téléphone demande ton
        accord pour l&apos;installer.
      </p>

      <p className="mt-6 text-sm text-muted">
        Un souci pour installer ? Écris-nous sur <WhatsAppLink />.
      </p>
    </div>
  );
}