import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/utils/articles";
import { Article } from "@/types/article";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      if (!category) return;
      setLoading(true);
      const data = await getArticlesByCategory(category);
      setArticles(data);
      setLoading(false);
    }
    loadArticles();
  }, [category]);

  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-semibold font-[Outfit] mb-8 border-b pb-4">
          {categoryName}
        </h1>

        {articles.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No articles found in this category.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
