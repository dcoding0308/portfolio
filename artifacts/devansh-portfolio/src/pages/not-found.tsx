import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="portfolio grain min-h-screen">
      <div className="wrap flex min-h-screen flex-col justify-center py-16">
        <div className="section-label">Page not found · 404</div>
        <h1 className="display mt-7 max-w-3xl text-6xl leading-none sm:text-8xl">This route has <em className="text-primary">no signal.</em></h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">That page isn’t part of this portfolio. Return to the work and explore from there.</p>
        <a href={`${import.meta.env.BASE_URL}#home`} className="button button-primary mt-8 w-fit" data-testid="link-not-found-home"><ArrowLeft size={15} /> Back to the portfolio</a>
      </div>
    </main>
  );
}
