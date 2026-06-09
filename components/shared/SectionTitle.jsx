// components/shared/sectiontitle

export default function SectionTitle({ title, subtitle, center = false }) {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-500 text-lg">{subtitle}</p>}
    </div>
  );
}
