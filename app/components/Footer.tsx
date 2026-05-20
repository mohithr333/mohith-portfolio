export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[#374151] text-xs">
        <span>
          © {new Date().getFullYear()} Mohith Ramesh — Berlin
        </span>
        <span>Built with Next.js &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}
