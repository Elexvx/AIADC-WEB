type HomeSectionTitleProps = {
  title: string;
  description?: string;
  centered?: boolean;
};

export function HomeSectionTitle({ title, description, centered = true }: HomeSectionTitleProps) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="heading-2 text-black transition-colors duration-300 dark:text-white">{title}</h2>
      {description ? (
        <p
          className={`mt-3 max-w-3xl text-sm leading-8 text-[#615d59] transition-colors duration-300 dark:text-white/82 sm:text-[15px] ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
