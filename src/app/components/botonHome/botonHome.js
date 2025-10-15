import Link from "next/link";

export default function BotonHome() {
  return (
    <Link href="/" className="text-2xl font-bold bg-[var(--color-gold)] text-white rounded-b-md">
      Volver
    </Link>
  );
}