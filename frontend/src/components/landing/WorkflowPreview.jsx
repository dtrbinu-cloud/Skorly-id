import Icon from '../ui/Icon';

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

        <div className="workflow-showcase grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-2xl bg-surface-card shadow-xl">
          <div className="lg:col-span-5 bg-primary p-6 md:p-9 text-on-primary flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-label-md text-label-md font-bold">Buat paket soal</span>
                <span className="px-2.5 py-1 rounded-full bg-white/15 text-[11px]">Langkah 1 dari 3</span>
              </div>
              <div className="flex flex-col gap-4">
                {['Konteks pembelajaran', 'Bentuk dan jumlah soal', 'Komposisi tingkat kesulitan'].map((label, index) => (
                  <div key={label} className={`workflow-field ${index === 0 ? 'is-active' : ''}`}>
                    <span className="text-xs text-blue-100">{index + 1}</span>
                    <span className="font-label-lg">{label}</span>
                    <Icon name="chevron_right" className="ml-auto text-[18px]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-100 text-xs">
              <Icon name="lock" className="text-[17px]" />
              <span>Data tersimpan otomatis</span>
            </div>
          </div>

          <div className="lg:col-span-7 p-5 md:p-8 bg-white">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4 mb-5">
              <div>
                <p className="font-label-sm text-label-sm text-text-muted">Pratinjau paket</p>
                <h3 className="font-headline-md text-headline-md text-on-surface">Matematika · Kelas XII</h3>
              </div>
              <span className="flex items-center gap-1.5 text-status-success text-xs font-bold"><span className="w-2 h-2 rounded-full bg-status-success" />Siap diperiksa</span>
            </div>
            {[['01', 'Hasil dari 3/4 + 5/8 adalah ...', '1 3/8'], ['02', 'Nilai x dari 2x + 5 = 19 adalah ...', '7'], ['03', 'Rata-rata dari 6, 8, 10, 12 adalah ...', '9']].map(([number, question, answer]) => (
              <div key={number} className="question-row flex items-center gap-3 py-3 border-b border-surface-container-low">
                <span className="w-8 h-8 rounded-lg bg-primary-fixed text-primary grid place-items-center text-xs font-bold">{number}</span>
                <span className="text-sm text-on-surface flex-1">{question}</span>
                <span className="hidden sm:inline-flex px-2 py-1 rounded bg-status-success/10 text-status-success text-xs font-bold">Kunci {answer}</span>
              </div>
            ))}
            <div className="flex justify-end pt-5">
              <button type="button" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-status-warning text-white text-sm font-bold shadow-sm">
                Lanjutkan <Icon name="arrow_forward" className="text-[17px]" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2" aria-label="Slide preview">
          <span className="w-7 h-1.5 rounded-full bg-primary" />
          <span className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
          <span className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
        </div>
      </div>
    </section>
  );
}
