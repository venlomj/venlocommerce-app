import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";


interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: {
    searchTerm: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
    sortOrder: string;
  }) => void;
}


export default function ProductFilters({ categories, onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "name",
    sortOrder: "asc",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: string, value: any) => {
    const updatedFilters = { ...filters, [field]: value };

    // Zorg ervoor dat minPrice nooit hoger is dan maxPrice en vice versa
    if (field === "minPrice" && value > filters.maxPrice) {
        updatedFilters.maxPrice = value;
    }
    if (field === "maxPrice" && value < filters.minPrice) {
        updatedFilters.minPrice = value;
    }

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
};


  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg space-y-4">
      {/* Zoekveld */}
      <Input
        placeholder="Zoek product..."
        value={filters.searchTerm}
        onChange={(e) => handleChange("searchTerm", e.target.value)}
      />

      {/* Categorieën dropdown */}
      <Select onValueChange={(value) => handleChange("category", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Categorie selecteren" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Prijsbereik (Slider) */}
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Prijsbereik: €{filters.minPrice} - €{filters.maxPrice}</p>
        <Slider
          defaultValue={[filters.minPrice, filters.maxPrice]}
          min={0}
          max={2000}
          step={10}
          onValueChange={(values) => handleChange("minPrice", values[0])}
          onValueCommit={(values) => handleChange("maxPrice", values[1])}
        />
      </div>

      {/* Sorteervelden */}
      <div className="flex gap-4">
        <Select onValueChange={(value) => handleChange("sortBy", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sorteren op" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Naam</SelectItem>
            <SelectItem value="price">Prijs</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleChange("sortOrder", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Volgorde" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Oplopend</SelectItem>
            <SelectItem value="desc">Aflopend</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter toepassen */}
      <Button onClick={() => onFilterChange(filters)} className="w-full">
        Filters toepassen
      </Button>
    </div>
  );
}
