import { Header, PostForm, PostDetail, PostsSection, Footer } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Останні публікації</h2>
            </div>
          </div>

          <PostsSection />
        </section>
      </main>

      {/* Modals */}
      <PostForm />
      <PostDetail />

      {/* Footer */}
      <Footer />
    </div>
  );
}
