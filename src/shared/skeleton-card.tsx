import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="w-full p-6 border rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      {/* Afbeelding */}
      <div className="relative overflow-hidden rounded-lg">
        <Skeleton className="w-full h-60 object-cover rounded-lg transition-transform duration-300 transform hover:scale-110" />
      </div>

      {/* Titel en beschrijving */}
      <div className="space-y-4 mt-4">
        <Skeleton className="w-3/4 h-6" /> {/* Simuleert de producttitel */}
        <Skeleton className="w-full h-4" /> {/* Simuleert de beschrijving */}
        <Skeleton className="w-5/6 h-4" />
      </div>

      {/* Prijs en knop */}
      <div className="flex justify-between items-center mt-6">
        <Skeleton className="w-20 h-6" /> {/* Simuleert de prijs */}
        <Skeleton className="w-24 h-10 rounded-lg" /> {/* Simuleert de knop */}
      </div>
    </div>
  );
}
