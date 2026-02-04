import { Header, PostForm, PostDetail, ProfileContent, Footer } from "@/components";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <ProfileContent />
      </main>

      {/* Modals */}
      <PostForm />
      <PostDetail />

      {/* Footer */}
      <Footer />
    </div>
  );
}
