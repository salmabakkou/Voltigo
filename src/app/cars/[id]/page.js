import Link from "next/link";

export default function CarDetailsPage({ params }) {
    const id = params?.id;

    return (
        <main className="min-h-screen bg-[#0A100E] text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold tracking-widest text-[#CFFF1A] uppercase mb-4">
                Car Details
            </h1>
            <p className="text-gray-400 tracking-widest uppercase mb-10">
                You are viewing details for Car ID: {id}
            </p>

            <Link
                href="/cars"
                className="px-8 py-3 border border-gray-600 rounded text-xs uppercase tracking-widest hover:border-[#CFFF1A] hover:text-[#CFFF1A] transition-colors"
            >
                Go back to Cars
            </Link>
        </main>
    );
}
