import { APK_URL, HAS_APK } from "@/lib/links";

type Props = {
  label?: string;
  className?: string;
};

export default function DownloadButton({
  label = "Télécharger pour Android",
  className = "",
}: Props) {
  const base =
    "inline-block text-center font-bold px-6 py-3 rounded-xl text-base";

  if (!HAS_APK) {
    return (
      <span
        className={`${base} bg-brand-soft text-brand-dark cursor-default ${className}`}
      >
        Bientôt disponible
      </span>
    );
  }

  return (
    <a
      href={APK_URL}
      className={`${base} bg-brand text-white hover:bg-brand-dark ${className}`}
    >
      {label}
    </a>
  );
}