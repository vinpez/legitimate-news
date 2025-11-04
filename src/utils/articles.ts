import { Article } from "@/types/article";

// Import all markdown files
const articleModules = import.meta.glob('/src/content/articles/*.md', { 
  query: '?raw',
  import: 'default'
});

export async function getAllArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  
  for (const path in articleModules) {
    const content = await articleModules[path]() as string;
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    // Parse frontmatter
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
      const frontmatterString = match[1];
      const articleContent = match[2];
      
      // Parse frontmatter fields
      const metadata: any = {};
      frontmatterString.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
          metadata[key.trim()] = value === 'true' ? true : value === 'false' ? false : value;
        }
      });
      
      articles.push({
        slug,
        metadata,
        content: articleContent.trim()
      });
    }
  }
  
  // Sort by date, newest first
  return articles.sort((a, b) => 
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(article => article.metadata.featured);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(article => 
    article.metadata.category.toLowerCase() === category.toLowerCase()
  );
}
