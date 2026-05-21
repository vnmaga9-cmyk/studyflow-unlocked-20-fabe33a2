import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Entrar — StudyFlow" }],
  }),
});

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Login em breve</h1>
        <p className="mt-3 text-muted-foreground">
          A tela de autenticação ainda será construída.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Voltar para a home
        </Link>
      </div>
    </div>
  );
}
