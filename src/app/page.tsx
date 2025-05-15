// src/app/page.tsx

import Image from "next/image";
import ExcelUploadForm from "@/components/ExcelUploadForm";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8 bg-black-50">
      {/* Dashboard title using sidebar text color */}
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#1f295c' }}>
        Welcome to NexS Ascend by ARYA
      </h1>

      {/* Your Excel upload widget */}
      <ExcelUploadForm />

      {/* (Optional) keep the default Next.js example below, or remove it */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <a
          className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/next.svg" alt="Docs" width={40} height={40} />
          <span className="ml-4" style={{ color: '#1f295c' }}>Read the Docs →</span>
        </a>
        <a
          className="flex items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition"
          href="https://vercel.com/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/vercel.svg" alt="Deploy" width={40} height={40} />
          <span className="ml-4" style={{ color: '#1f295c' }}>Deploy on Vercel →</span>
        </a>
      </div>
    </main>
  );
}