import { useTranslations } from "next-intl";

const swatches = [
  { key: "ink", hex: "#14201A", text: "#F6F1E7" },
  { key: "tea", hex: "#1F4D3A", text: "#F6F1E7" },
  { key: "leaf", hex: "#3E7D5A", text: "#F6F1E7" },
  { key: "laterite", hex: "#B4532A", text: "#F6F1E7" },
  { key: "lateriteInk", hex: "#9A4220", text: "#F6F1E7" },
  { key: "mist", hex: "#D9DED8", text: "#14201A" },
  { key: "paper", hex: "#F6F1E7", text: "#14201A" },
  { key: "accent", hex: "#F5C400", text: "#14201A" },
] as const;

export function ColourSwatches() {
  const t = useTranslations("styleguide.colour");
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
      {swatches.map((s) => (
        <li key={s.key} className="flex flex-col border border-rule">
          <div className="flex h-24 items-end p-3 font-mono text-sm" style={{ background: s.hex, color: s.text }}>
            {s.hex}
          </div>
          <span className="p-3 text-sm">{t(s.key)}</span>
        </li>
      ))}
    </ul>
  );
}
