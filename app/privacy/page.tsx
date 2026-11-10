import WhatsAppLink from "@/components/WhatsAppLink";
import type { Metadata } from "next";
import Link from "next/link";

// ⚠ À COMPLÉTER avant de publier - il ne reste que ça
const CONTACT_LABEL = "+229 01 40 03 33 44";
const CONTACT_URL =
  "https://wa.me/2290140033344?text=" +
  encodeURIComponent("Bonjour, j'ai une question sur mes données Lafia Shop.");

export const metadata: Metadata = {
  title: "Politique de confidentialité",
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

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Politique de confidentialité</h1>
      <p className="mt-2 text-sm text-muted">Dernière mise à jour : 10 novembre 2026</p>

      <p className="mt-6 text-muted">
        Lafia Shop met en relation acheteurs et vendeurs des marchés du Bénin.
        Cette page explique quelles données l&apos;app collecte, pourquoi, et
        comment tu peux les contrôler.
      </p>

      <Section title="Données que nous collectons">
        <ul className="list-disc space-y-1 pl-5">
          <li>
        Ton numéro de téléphone : c&apos;est la seule information demandée pour
        créer ton compte (pas d&apos;e-mail). Il sert à te connecter et à te
        joindre pour la livraison.
        </li>
          <li>Ton nom et ta photo de profil.</li>
          <li>
            Ta position (latitude et longitude), si tu l&apos;autorises, pour
            te montrer les boutiques proches.
          </li>
          <li>
            Tes informations de livraison : téléphone, quartier, point de
            repère.
          </li>
          <li>
            Tes commandes, achats et paiements échelonnés (montants, dates,
            statuts).
          </li>
          <li>Tes messages dans les discussions avec les vendeurs.</li>
          <li>
            Tes recherches, y compris celles faites avec l&apos;assistant IA.
          </li>
          <li>Tes likes, abonnements et commentaires.</li>
          <li>
            Pour les vendeurs : nom de la boutique, photos, vidéo,
            description, adresse, position, téléphone de contact et solde du
            portefeuille.
          </li>
        </ul>
      </Section>

      <Section title="Pourquoi nous les utilisons">
        <p>
          Pour créer ton compte, afficher les produits près de toi, traiter les
          commandes et la livraison, permettre les discussions, et améliorer la
          recherche.
        </p>
        <p>
        Pour les paiements, nous utilisons FedaPay. C&apos;est FedaPay qui
        traite ton paiement Mobile Money. Nous ne voyons pas et nous ne stockons
        pas ton code secret. Nous gardons seulement les informations utiles au
        suivi de ta commande : montant, date et statut du paiement.
        </p>
      </Section>

      <Section title="Ce qui est visible par les autres">
        <p>
          Les informations de boutique (nom, photos, adresse, téléphone de
          contact) et les produits sont publics. Ta position exacte, ton
          historique d&apos;achats et tes messages ne sont pas affichés
          publiquement.
        </p>
      </Section>

      <Section title="Services tiers">
        <p>
          Nous utilisons Supabase pour la connexion, la base de données et le
          stockage des fichiers. Les paiements sont traités par FedaPay. Les
          messages et recherches faits avec l&apos;assistant IA sont traités par
          un service d&apos;intelligence artificielle (Google Gemini) afin de
          produire une réponse. Nous ne vendons pas tes données.
        </p>
      </Section>

      <Section title="Conservation et suppression">
        <p>
          Nous gardons tes données tant que ton compte existe. Tu peux
          demander la suppression de ton compte à tout moment (voir la page{" "}
          <Link href="/delete-account" className="font-medium text-brand underline">
            Supprimer mon compte
            </Link>
          ). Certaines informations liées aux commandes peuvent être
          conservées lorsque la loi ou la bonne gestion d&apos;un litige
          l&apos;exige.
        </p>
      </Section>

      <Section title="Tes droits">
        <p>
        Tu peux demander à consulter, corriger ou supprimer tes données.
        Écris-nous sur <WhatsAppLink />.
        </p>
      </Section>

      <Section title="Enfants">
        <p>
          Lafia Shop n&apos;est pas destinée aux personnes de moins de 18 ans
          sans l&apos;accord d&apos;un parent ou tuteur.
        </p>
      </Section>

      <Section title="Changements">
        <p>
          Si cette politique change, la date en haut de la page sera mise à
          jour.
        </p>
      </Section>
    </div>
  );
}