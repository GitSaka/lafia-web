// 1200 -> "1 200 FCFA"
export function formatFCFA(n: number): string {
  return `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA`;
}

// 1200 -> "1 200 F" (comme dans l'app)
export function formatF(n: number): string {
  return `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} F`;
}