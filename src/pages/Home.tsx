import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles, getFeaturedArticles } from "@/utils/articles";
import { Article } from "@/types/article";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      const [featured, all] = await Promise.all([
        getFeaturedArticles(),
        getAllArticles()
      ]);
      setFeaturedArticles(featured);
      setArticles(all.filter(a => !a.metadata.featured));
      setLoading(false);
    }
    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <Skeleton className="h-96 w-full" />
            <div className="grid md:grid-cols-3 gap-6">
              <Skeleton className="h-80" />
              <Skeleton className="h-80" />
              <Skeleton className="h-80" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Featured Articles */}
        <section className="mb-12">
          <div className="space-y-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} featured />
            ))}
          </div>
        </section>

        {/* Latest Articles Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Latest News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
