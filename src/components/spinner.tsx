export default function Spinner({ size }: { size: string }) {
  return (
    <div
      className={`${size} border-2 border-t-digiblue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
    ></div>
  );
}
