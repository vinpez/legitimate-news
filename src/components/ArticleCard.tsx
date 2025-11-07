import { Link } from "react-router-dom";
import { Article } from "@/types/article";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.metadata.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  if (featured) {
    return (
      <Link 
        to={`/article/${article.slug}`}
        className="group block"
      >
        <article className="grid md:grid-cols-2 gap-6 pb-6 border-b">
          <div className="aspect-video md:aspect-[16/10] overflow-hidden rounded-lg bg-muted">
            <img
              src={article.metadata.image}
              alt={article.metadata.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <Badge className="w-fit mb-3">{article.metadata.category}</Badge>
            <h2 className="text-3xl font-medium font-[Outfit] mb-3 group-hover:text-primary transition-colors">
              {article.metadata.title}
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {article.metadata.excerpt}
            </p>
            <div className="text-sm text-muted-foreground">
              By {article.metadata.author} • {formattedDate}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link 
      to={`/article/${article.slug}`}
      className="group block"
    >
      <article>
        <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-3">
          <img
            src={article.metadata.image}
            alt={article.metadata.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <Badge className="mb-2">{article.metadata.category}</Badge>
        <h3 className="text-2xl font-medium font-[Outfit] mb-2 group-hover:text-primary transition-colors">
          {article.metadata.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {article.metadata.excerpt}
        </p>
        <div className="text-xs text-muted-foreground">
          By {article.metadata.author} • {formattedDate}
        </div>
      </article>
    </Link>
  );
}
