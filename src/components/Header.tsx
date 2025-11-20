import { Link } from "react-router-dom";
import { categories } from "@/types/article";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  category?: string;
}

export function Header({ category }: HeaderProps) {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 border-b">
          <Link to="/" className="flex text-3xl font-bold font-[Ovo] tracking-tight">
            <span className="inline-block">Legitimate&nbsp;</span>
            <span className="inline-block text-[#d01133]">
              <span className={`block ${category ? 'max-w-[100%]' : 'max-w-[0px]'} overflow-hidden transition-all ease-in-out duration-700`}>
                {category ? <span>{category}&nbsp;</span> : <span></span>}
              </span> 
            </span>
            <span className="inline-block">News</span>
          </Link>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex gap-6 py-3 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="text-sm font-open text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors"
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
