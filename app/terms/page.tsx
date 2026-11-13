import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";

// Règle d'un paiement en tranche non payé. Laisse vide tant que tu n'as pas
// décidé : une phrase neutre est alors affichée. Exemple de valeur :
// "Si une tranche n'est pas payée à l'échéance, le vendeur peut ..."
const TRANCHE_RULE = "";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
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

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Conditions d&apos;utilisation</h1>
      <p className="mt-2 text-sm text-muted">
        Dernière mise à jour : 11 novembre 2026
      </p>

      <p className="mt-6 text-muted">
        En créant un compte ou en utilisant Lafia Shop, tu acceptes ces
        conditions. Lis-les : elles expliquent le rôle de Lafia, tes droits et
        tes responsabilités.
      </p>

      <Section title="1. Ce qu'est Lafia Shop">
        <p>
          Lafia Shop est une plateforme qui met en relation des vendeurs et des
          acheteurs des marchés du Bénin. Lafia n&apos;est pas le vendeur des
          produits : chaque vente est conclue entre un acheteur et un vendeur.
        </p>
      </Section>

      <Section title="2. Ton compte">
        <ul className="list-disc space-y-1 pl-5">
          <li>Tu dois avoir 18 ans ou l&apos;accord d&apos;un parent ou tuteur.</li>
          <li>Ton compte est lié à ton numéro de téléphone : donne un numéro qui est le tien.</li>
          <li>Les informations que tu donnes doivent être exactes.</li>
          <li>Garde tes codes secrets pour toi. Tu es responsable de ce qui se passe avec ton compte.</li>
        </ul>
      </Section>

      <Section title="3. Règles pour les vendeurs">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vends seulement des produits que la loi autorise et que tu peux réellement fournir.</li>
          <li>Les photos, vidéos, prix, descriptions et stocks doivent être honnêtes et à jour.</li>
          <li>
            Tu gères la livraison de tes produits (zone, délai, prix). Lafia
            ne livre pas.
          </li>
          <li>Tu réponds aux acheteurs et tu honores les commandes que tu acceptes.</li>
          <li>Le numéro de contact de ta boutique est visible par les visiteurs, pour qu&apos;ils puissent te joindre.</li>
        </ul>
      </Section>

      <Section title="4. Règles pour les acheteurs">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vérifie le produit, le prix et les conditions de livraison avant de commander.</li>
          <li>Donne une adresse et un téléphone de livraison corrects.</li>
          <li>Paie ce que tu as accepté de payer.</li>
        </ul>
      </Section>

      <Section title="5. Commander sur WhatsApp">
        <p>
          Tu peux contacter un vendeur et commander par WhatsApp. Une commande
          conclue en dehors de l&apos;app est un accord direct entre
          l&apos;acheteur et le vendeur : Lafia n&apos;en est pas partie et ne
          garantit ni le produit, ni la livraison, ni le paiement.
        </p>
      </Section>

      <Section title="6. Paiements">
        <p>
          Les paiements faits dans l&apos;app passent par FedaPay (mobile
          money). Lafia ne voit ni ne conserve ton code secret.
        </p>
        <p>
          Les modalités du paiement en tranches (montants et échéances) sont
          indiquées dans l&apos;app au moment de la commande.
          {TRANCHE_RULE ? ` ${TRANCHE_RULE}` : ""}
        </p>
      </Section>

      <Section title="7. Commission">
        <p>
          Lafia ne prélève actuellement aucune commission sur les ventes. Si
          cela change, les utilisateurs seront prévenus à l&apos;avance.
        </p>
      </Section>

      <Section title="8. Contenus et comportements interdits">
        <ul className="list-disc space-y-1 pl-5">
          <li>Produits illégaux, dangereux ou contrefaits.</li>
          <li>Fausses annonces, arnaques, faux avis.</li>
          <li>Insultes, harcèlement ou contenus choquants dans les discussions.</li>
          <li>Photos ou vidéos dont tu n&apos;as pas le droit de te servir.</li>
        </ul>
        <p>
          En publiant une photo ou une vidéo, tu nous autorises à l&apos;afficher
          dans Lafia Shop pour présenter tes produits.
        </p>
      </Section>

      <Section title="9. Litiges et remboursements">
        <p>
          En cas de problème avec un produit (non conforme, non livré), le
          remboursement ou l&apos;échange se règle entre l&apos;acheteur et le
          vendeur. Lafia peut aider à trouver une solution, mais ne rembourse
          pas elle-même.
        </p>
      </Section>

      <Section title="10. Suspension et suppression de compte">
        <p>
          Lafia peut suspendre ou supprimer un compte qui ne respecte pas ces
          conditions (arnaque, produits interdits, comportements abusifs).
          Tu peux demander la suppression de ton compte à tout moment : voir{" "}
          <Link href="/delete-account" className="font-medium text-brand underline">
            Supprimer mon compte
          </Link>
          . Tes données sont traitées comme expliqué dans notre{" "}
          <Link href="/privacy" className="font-medium text-brand underline">
            Politique de confidentialité
          </Link>
          .
        </p>
      </Section>

      <Section title="11. Responsabilité de Lafia">
        <p>
          Nous faisons de notre mieux pour que le service fonctionne, mais nous
          ne pouvons pas garantir qu&apos;il soit toujours disponible et sans
          erreur. Lafia n&apos;est pas responsable des produits vendus, ni des
          accords conclus entre acheteurs et vendeurs.
        </p>
      </Section>

      <Section title="12. Changements">
        <p>
          Nous pouvons modifier ces conditions. La date en haut de la page sera
          mise à jour, et nous préviendrons les utilisateurs en cas de
          changement important. Ces conditions sont soumises au droit
          applicable au Bénin.
        </p>
      </Section>

      <Section title="13. Nous contacter">
        <p>
          Une question ? Écris-nous sur <WhatsAppLink />.
        </p>
      </Section>
    </div>
  );
}