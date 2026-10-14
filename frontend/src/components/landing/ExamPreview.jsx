import SectionHeading from '../ui/SectionHeading';
import Exam from '../../Exam';

export default function ExamPreview() {
  return (
    <section className="w-full py-16 bg-surface-canvas" id="pratinjau">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Simulasi Tampilan Peserta"
            title="Pratinjau Antarmuka Ujian Siswa"
            description="Coba langsung mengerjakan soal: pilih opsi A–E, tandai ragu-ragu, navigasi keyboard, dan perbesar gambar."
          />
          <div className="flex items-center gap-2 text-sm text-text-muted bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-700">Simulasi Interaktif (Mode Demo)</span>
          </div>
        </div>

        {/* Live Interactive Exam Page with mode="demo" */}
        <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-xl bg-white">
          <Exam mode="demo" />
        </div>
      </div>
    </section>
  );
}
