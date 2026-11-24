/** Rules for the account settings forms. */

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_DISPLAY_NAME = 60;
export const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
export const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const DELETE_CONFIRMATION = "EXCLUIR";

export function validateDisplayName(name: string): string | null {
  const v = name.trim();
  if (!v) return "Digite um nome.";
  if (v.length > MAX_DISPLAY_NAME) return `Use no máximo ${MAX_DISPLAY_NAME} caracteres.`;
  return null;
}

export function validateAvatar(file: { type: string; size: number }): string | null {
  if (!AVATAR_TYPES.includes(file.type)) return "Envie uma imagem JPG, PNG ou WEBP.";
  if (file.size > MAX_AVATAR_BYTES) return "A foto deve ter no máximo 2 MB.";
  return null;
}

export function validateNewPassword(password: string, confirm: string, current: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH)
    return `A nova senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  if (password !== confirm) return "A confirmação não é igual à nova senha.";
  if (password === current) return "A nova senha precisa ser diferente da atual.";
  return null;
}

export function validateEmail(email: string, currentEmail: string | undefined): string | null {
  const v = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Digite um e-mail válido.";
  if (v === currentEmail?.toLowerCase()) return "Este já é o seu e-mail atual.";
  return null;
}

/** Short device description from a browser user agent. */
export function describeDevice(userAgent: string | null | undefined): string {
  const ua = userAgent ?? "";
  if (!ua) return "Dispositivo desconhecido";
  const os = /iPhone|iPad/.test(ua)
    ? "iPhone/iPad"
    : /Android/.test(ua)
      ? "Android"
      : /Windows/.test(ua)
        ? "Windows"
        : /Mac OS X|Macintosh/.test(ua)
          ? "Mac"
          : /Linux/.test(ua)
            ? "Linux"
            : "Outro sistema";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /Firefox\//.test(ua)
        ? "Firefox"
        : /Chrome\//.test(ua)
          ? "Chrome"
          : /Safari\//.test(ua)
            ? "Safari"
            : "Navegador";
  return `${browser} · ${os}`;
}
