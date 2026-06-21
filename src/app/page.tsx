"use client";

export default function Home() {
  return (
    <main className="min-h-screen-safe bg-dark-900 flex flex-col items-center justify-center inset-safe">
      <div className="text-center space-y-4 px-8">
        <p className="text-overline mb-8">Le Livre, Samira</p>

        <h1 className="font-display text-display-hero text-white font-light tracking-tight">
          Samira
        </h1>

        <div className="chapter-divider" />

        <p className="font-body text-body text-white-60 font-light">
          Setup OK — PWA prête
        </p>

        <div className="mt-12 glass rounded-card p-6 max-w-xs mx-auto">
          <p className="font-body text-body-small text-white-60 text-center">
            Toutes les fondations sont en place.
            <br />
            Les chapitres seront construits dans les prochains prompts.
          </p>
        </div>
      </div>
    </main>
  );
}
