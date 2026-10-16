import AlurCarousel from '../AlurCarousel';

export default function WorkflowPreview() {
  return (
    <section className="workflow-section w-full py-20 bg-surface-canvas" id="cara">
      <div className="max-w-7xl mx-auto px-margin-desktop flex flex-col gap-space-xl">
        <div className="max-w-2xl">
          <span className="font-label-md text-label-md tracking-wide text-primary font-bold">
            Lihat cara kerjanya
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">
            Dari pengaturan hingga soal siap digunakan
          </h2>
          <p className="font-body-lg text-body-lg text-text-muted mt-2">
            Alur yang ringkas membantu guru menyiapkan, memeriksa, lalu membagikan ujian tanpa berpindah-pindah aplikasi.
          </p>
        </div>

        <AlurCarousel />
      </div>
    </section>
  );
}
