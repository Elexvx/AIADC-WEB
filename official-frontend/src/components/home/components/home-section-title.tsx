type HomeSectionTitleProps = {
  title: string;
  description?: string;
  centered?: boolean;
};

export function HomeSectionTitle({ title, description }: HomeSectionTitleProps) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-[2rem] font-bold leading-[1.1] tracking-[-0.04em] text-black transition-colors duration-300 dark:text-white sm:text-[2.75rem]">{title}</h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-[#31302e] transition-colors duration-300 dark:text-white/82 sm:text-[15px]">{description}</p>
      ) : null}
    </div>
  );
}
