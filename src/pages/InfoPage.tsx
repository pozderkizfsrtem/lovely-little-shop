import { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

const InfoPage = ({ eyebrow, title, children }: Props) => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">— {eyebrow}</p>
      <h1 className="font-display text-5xl md:text-6xl leading-tight mb-10">{title}</h1>
      <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
};

export default InfoPage;
