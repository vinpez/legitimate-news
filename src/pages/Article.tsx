import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleBySlug } from "@/utils/articles";
import { Article as ArticleType } from "@/types/article";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      setLoading(true);
      const data = await getArticleBySlug(slug);
      setArticle(data);
      setLoading(false);
    }
    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-64 mb-8" />
          <Skeleton className="aspect-video w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const formattedDate = new Date(article.metadata.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <article>
          <Badge className="mb-4">{article.metadata.category}</Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {article.metadata.title}
          </h1>
          
          <div className="text-muted-foreground mb-8">
            By {article.metadata.author} • {formattedDate}
          </div>

          <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-8">
            <img
              src={article.metadata.image}
              alt={article.metadata.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}
