import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";

export function SearchProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  return (
    <span className="flex justify-center py-8">
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
        className="max-w-sm"
      />
    </span>
  );
}
