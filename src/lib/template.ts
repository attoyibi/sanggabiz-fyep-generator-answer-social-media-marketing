/** Pengganti token {{nama}} / {{seg1}} di dalam teks bank jawaban. */
export function fillTokens(text: string, tokens: Record<string, string>): string {
  return text.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (whole, key: string) => {
    const value = tokens[key];
    return value === undefined || value === "" ? whole : value;
  });
}
