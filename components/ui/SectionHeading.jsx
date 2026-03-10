export default function SectionHeading({
  heading,
  subheading,
  centered = true,
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2
        className={`text-4xl font-extrabold tracking-tight text-black ${
          centered ? "mx-auto" : ""
        }`}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={`text-lg font-light tracking-wide text-black/60 max-w-3xl mt-4 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
