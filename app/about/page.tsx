import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "À propos",
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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">À propos de Lafia Shop</h1>
      <p className="mt-2 text-sm text-muted">
        Les marchés du Bénin, dans ton téléphone.
      </p>

      <p className="mt-6 text-muted">
        Lafia Shop met en relation acheteurs et vendeurs des marchés du Bénin.
        Tu trouves les produits près de chez toi, tu discutes avec le vendeur,
        et tu commandes sans te déplacer pour rien.
      </p>

      <Section title="Pour les acheteurs">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vois les produits et les boutiques près de toi.</li>
          <li>Discute avec le vendeur dans l&apos;app.</li>
          <li>Commande, avec livraison quand la boutique la propose.</li>
          <li>Paye en une fois ou en plusieurs fois, avec FedaPay.</li>
        </ul>
        <p>
          <Link href="/download" className="font-medium text-brand underline">
            Télécharger l&apos;app
          </Link>
        </p>
      </Section>

      <Section title="Pour les vendeurs">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ouvre ta boutique gratuitement.</li>
          <li>Publie tes produits avec photos et prix.</li>
          <li>Reçois des commandes.</li>
          <li>Suis ton solde et tes retraits dans l&apos;app.</li>
        </ul>
        <p>
          <Link href="/sell" className="font-medium text-brand underline">
            Ouvre ta boutique gratuitement
          </Link>
        </p>
      </Section>

      <Section title="Comment ça marche ?">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Tu télécharges l&apos;app Lafia Shop.</li>
          <li>Tu crées ton compte avec ton numéro de téléphone.</li>
          <li>Tu cherches un produit ou une boutique près de toi.</li>
          <li>Tu discutes avec le vendeur et tu commandes.</li>
        </ol>
      </Section>

      <Section title="Une question ?">
        <p>
          Écris-nous sur <WhatsAppLink />.
        </p>
      </Section>
    </div>
  );
}