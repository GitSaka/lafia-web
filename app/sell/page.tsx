import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Ouvre ta boutique gratuitement",
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mt-8">
    <h2 className="text-xl font-bold">{title}</h2>
    <div className="mt-2 space-y-2 text-muted">{children}</div>
  </section>
);

export default function SellPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">
        Ouvre ta boutique gratuitement
      </h1>
      <p className="mt-2 text-sm text-muted">
        Tes produits des marchés du Bénin, visibles par des acheteurs près de
        chez toi.
      </p>

      <p className="mt-6 text-muted">
        Tu vends déjà au marché ? Mets ta boutique sur Lafia Shop. Les
        acheteurs te trouvent, te parlent et commandent, même quand tu
        n&apos;es pas au marché.
      </p>

      <Section title="Pourquoi vendre sur Lafia ?">
        <ul className="list-disc space-y-1 pl-5">
          <li>C&apos;est gratuit pour ouvrir ta boutique.</li>
          <li>Tes produits sont visibles par des acheteurs près de toi.</li>
          <li>Les acheteurs te contactent directement dans l&apos;app.</li>
          <li>Tu suis tes commandes et ton solde dans l&apos;app.</li>
        </ul>
      </Section>

      <Section title="Comment ouvrir ta boutique ?">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Télécharge l&apos;app Lafia Shop.</li>
          <li>Crée ton compte avec ton numéro de téléphone.</li>
          <li>Crée ta boutique : nom, photo, adresse, téléphone de contact.</li>
          <li>Ajoute tes produits : photo, prix, description.</li>
          <li>Tu reçois tes premières commandes.</li>
        </ol>
      </Section>

      <Section title="Ce qu'il te faut">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ton numéro de téléphone.</li>
          <li>Le nom de ta boutique.</li>
          <li>Des photos de tes produits.</li>
        </ul>
      </Section>

      <div className="mt-10 rounded-xl bg-brand p-6 text-center">
        <p className="text-lg font-bold text-white">Prêt à vendre ?</p>
        <p className="mt-1 text-sm text-white/80">
          Télécharge l&apos;app et ouvre ta boutique.
        </p>
        <Link
          href="/download"
          className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-bold text-brand"
        >
          Télécharger l&apos;app
        </Link>
      </div>

      <Section title="Une question ?">
        <p>
          Écris-nous sur <WhatsAppLink />.
        </p>
      </Section>
    </div>
  );
}