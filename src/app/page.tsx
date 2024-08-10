import RegistForm from "@/components/shared/Form/RegistForm";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <div className="mx-auto max-w-5xl p-8 bg-blue-50 border rounded">
        <RegistForm />
      </div>
    </main>
  );
}
