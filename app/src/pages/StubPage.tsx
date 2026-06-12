interface StubPageProps {
  title: string;
  description?: string;
}

export default function StubPage({ title, description }: StubPageProps) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[var(--bg-primary)] pt-[72px]">
      <div className="text-center px-6">
        <div className="w-16 h-[2px] bg-[#C9A96E] mx-auto mb-6" />
        <h1 className="font-display font-semibold text-4xl md:text-5xl text-[#0A0A0A] mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-[#6B6560] max-w-md mx-auto">
            {description}
          </p>
        )}
        <div className="mt-8 w-16 h-[2px] bg-[#C9A96E] mx-auto" />
      </div>
    </div>
  );
}
