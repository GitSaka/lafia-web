import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Supprimer mon compte",
};

export default function DeleteAccountPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Supprimer mon compte</h1>
      <p className="mt-2 text-sm text-muted">
        Dernière mise à jour : 10 novembre 2026
      </p>

      <p className="mt-6 text-muted">
        Tu peux demander la suppression de ton compte Lafia Shop à tout
        moment. Cette page explique comment faire et ce qui se passe après.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Comment supprimer ton compte</h2>
        <div className="mt-2 space-y-2 text-muted">
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Écris-nous sur <WhatsAppLink />.
            </li>
            <li>
              Indique le <span className="font-bold text-ink">numéro de
              téléphone</span> de ton compte et écris « Supprimer mon compte ».
            </li>
            <li>
              Nous vérifions que c&apos;est bien toi, puis nous supprimons ton
              compte.
            </li>
          </ol>
          {/* À ajouter quand le bouton existera dans l'app :
              "Ou directement dans l'app : Profil → Supprimer mon compte". */}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Ce qui est supprimé</h2>
        <div className="mt-2 space-y-2 text-muted">
          <ul className="list-disc space-y-1 pl-5">
            <li>Ton profil : nom, photo, numéro de téléphone, position.</li>
            <li>Tes adresses de livraison : quartier, repère, téléphone.</li>
            <li>Tes likes, abonnements et commentaires.</li>
            <li>Tes messages dans les discussions.</li>
            <li>
              Pour les vendeurs : ta boutique, tes produits, tes photos et ta
              vidéo.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Ce qui peut être gardé</h2>
        <div className="mt-2 space-y-2 text-muted">
          <p>
            Certaines informations liées aux commandes (montants, dates,
            statuts) peuvent être gardées lorsque la loi ou la bonne gestion
            d&apos;un litige l&apos;exige, comme indiqué dans notre{" "}
            <Link href="/privacy" className="font-medium text-brand underline">
              Politique de confidentialité
            </Link>
            . Elles ne sont pas affichées publiquement.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">Après la suppression</h2>
        <div className="mt-2 space-y-2 text-muted">
          <p>
            Tu ne pourras plus te connecter avec ce compte. Si tu veux
            revenir, tu devras créer un nouveau compte.
          </p>
        </div>
      </section>
    </div>
  );
}