import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SearchProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  return (
    <div className="flex justify-center py-8 bg-green-500 mb-4 rounded-md">
      <Input
        type="search"
        defaultValue={q}
        placeholder="Search by category, title"
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set("q", e.target.value);
            return prev;
          })
        }
        className="max-w-sm shadcn-input"
      />
      <Button className="mx-1 font-bold text-lg">Search</Button>
    </div>
  );
}
