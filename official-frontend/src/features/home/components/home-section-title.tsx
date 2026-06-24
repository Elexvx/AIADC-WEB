type HomeSectionTitleProps = {
  title: string;
  description?: string;
};

export function HomeSectionTitle({ title, description }: HomeSectionTitleProps) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <span className="mt-1 h-8 w-1 shrink-0 rounded-full bg-[#0b55b7]" aria-hidden="true" />
      <div className="min-w-0">
        <h2 className="text-2xl font-semibold tracking-wide text-[#082656] sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
