export default function Tooltip({ label, description }) {
  return (
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-sm p-2 rounded shadow-lg z-10">
      <strong>{label}</strong>: {description}
    </div>
  );
}
