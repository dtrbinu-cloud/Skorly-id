import { useState } from 'react';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { useCountdown } from '../../hooks/useCountdown';
import {
  quizOptions,
  quizQuestion,
  questionNumbers,
  paletteLegends,
} from '../../data/landing';

export default function ExamPreview() {
  const [selected, setSelected] = useState('B');
  const [flagged, setFlagged] = useState(false);
  const { formatted: timerDisplay } = useCountdown(5085);

  const getQuestionButtonClass = (num) => {
    const numInt = parseInt(num, 10);
    if (numInt === 14) {
      return flagged
        ? 'h-9 rounded-lg bg-status-warning text-surface-card font-label-md text-label-md font-bold shadow-md'
        : 'h-9 rounded-lg bg-primary text-surface-card font-label-md text-label-md font-bold shadow-md';
    }
    if (numInt === 7) {
      return 'h-9 rounded-lg bg-status-warning text-surface-card font-label-md text-label-md font-bold';
    }
    if (numInt < 14) {
      return 'h-9 rounded-lg bg-status-success text-surface-card font-label-md text-label-md font-bold';
    }
    return 'h-9 rounded-lg bg-surface-container-low text-text-muted font-label-md text-label-md';
  };

  return (
    <section className="w-full py-20 bg-surface-canvas" id="pratinjau">
      <div className="max-w-7xl mx-auto px-margin-desktop flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <SectionHeading
            eyebrow="Simulasi Tampilan Peserta"
            title="Pratinjau Antarmuka Ujian Desktop"
            description="Fokus maksimal, kontras tinggi, navigasi ramah keyboard & sentuhan."
          />
          <div className="flex items-center gap-space-sm text-label-md font-label-md text-text-muted bg-surface-card px-4 py-2 rounded-lg shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-status-success"></span>
            <span>Mode Ujian Terkunci (Fullscreen Active)</span>
          </div>
        </div>

        {/* Live Interactive Exam Sheet Preview */}
        <div className="grid grid-cols-12 gap-gutter-desktop">
          {/* Main Question Card (8 Cols) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-space-md">
            <div className="bg-surface-card rounded-xl p-space-xl shadow-md flex flex-col gap-space-lg">
              {/* Question Header Ribbon */}
              <div className="flex items-center justify-between pb-space-md bg-surface-container-low -mx-space-xl -mt-space-xl p-space-lg rounded-t-xl">
                <div className="flex items-center gap-space-sm">
                  <span className="px-3 py-1 rounded bg-primary text-surface-card font-label-md text-label-md font-bold">
                    Soal No. {quizQuestion.number}
                  </span>
                  <span className="text-text-muted font-body-sm text-body-sm">
                    Kategori: {quizQuestion.category}
                  </span>
                </div>
                <div className="flex items-center gap-space-md">
                  <span className="font-label-sm text-label-sm text-text-muted">
                    Bobot: {quizQuestion.weight}
                  </span>
                  <button
                    className="text-text-muted hover:text-primary"
                    title="Perbesar Teks"
                    aria-label="Perbesar Teks"
                    type="button"
                  >
                    <Icon name="format_size" className="text-[20px]" />
                  </button>
                </div>
              </div>

              {/* Question Body */}
              <div className="font-body-lg text-body-lg text-on-surface leading-relaxed pt-2">
                {quizQuestion.leadText}
                <pre className="bg-surface-container-low p-space-md rounded-lg font-mono text-body-sm text-on-surface-variant overflow-x-auto mt-3">
                  {quizQuestion.codeSnippet}
                </pre>
                {quizQuestion.questionText}{' '}
                <code className="bg-surface-container px-1 py-0.5 rounded text-primary">
                  {quizQuestion.questionVar}
                </code>
                ?
              </div>

              {/* Multiple Choice Options (A-E) */}
              <div
                className="flex flex-col gap-space-sm pt-2"
                id="quizOptions"
                role="radiogroup"
                aria-label="Pilihan Jawaban"
              >
                {quizOptions.map((opt) => {
                  const isSelected = selected === opt.id;
                  return (
                    <button
                      key={opt.id}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelected(opt.id)}
                      type="button"
                      className={`w-full text-left cursor-pointer p-space-md rounded-lg transition-all flex items-center justify-between shadow-sm ${
                        isSelected
                          ? 'bg-surface-container text-on-surface'
                          : 'bg-surface-card hover:bg-surface-container-low text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-space-md">
                        <span
                          className={`w-8 h-8 rounded flex items-center justify-center font-bold text-label-md ${
                            isSelected
                              ? 'bg-primary text-surface-card'
                              : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span
                          className={`font-body-md text-body-md ${
                            isSelected
                              ? 'font-semibold text-primary'
                              : 'text-on-surface'
                          }`}
                        >
                          {opt.text}
                        </span>
                      </div>
                      <Icon
                        name="check_circle"
                        filled={isSelected}
                        className={`text-[20px] ${
                          isSelected ? 'text-primary' : 'text-transparent'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Control Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-space-md pt-4 mt-2">
                <button
                  className="px-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md flex items-center gap-1.5 hover:bg-surface-container-high transition-colors"
                  type="button"
                >
                  <Icon name="arrow_back" className="text-[18px]" />
                  <span>Sebelumnya</span>
                </button>
                <div className="flex items-center gap-space-sm">
                  <button
                    className={`px-4 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-colors ${
                      flagged
                        ? 'bg-status-warning text-surface-card'
                        : 'bg-surface-container-low text-tertiary-container hover:bg-surface-container-high'
                    }`}
                    id="flagBtn"
                    onClick={() => setFlagged(!flagged)}
                    aria-pressed={flagged}
                    type="button"
                  >
                    <Icon name="bookmark" className="text-[18px]" />
                    <span id="flagLabel">
                      {flagged ? 'Ragu-ragu Aktif' : 'Tandai Ragu-ragu'}
                    </span>
                  </button>
                  <button
                    className="px-5 py-2.5 rounded-lg bg-primary-container text-surface-card font-label-md text-label-md flex items-center gap-1.5 shadow hover:bg-primary transition-colors"
                    type="button"
                  >
                    <span>Simpan &amp; Berikutnya</span>
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Question Grid Palette (4 Cols) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-space-md">
            {/* Timer Card */}
            <div className="bg-surface-card rounded-xl p-space-lg shadow-md flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <Icon name="timer" className="text-primary text-[28px]" />
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-text-muted">
                    Sisa Waktu Ujian
                  </span>
                  <span
                    className="font-headline-md text-headline-md font-bold text-on-surface tracking-wider"
                    id="timerDisplay"
                  >
                    {timerDisplay}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-status-success/15 text-status-success font-label-sm text-label-sm font-semibold">
                Stabil
              </span>
            </div>

            {/* Question Palette Box */}
            <div className="bg-surface-card rounded-xl p-space-lg shadow-md flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Daftar Nomor Soal
                </span>
                <span className="font-label-sm text-label-sm text-text-muted">
                  14 / 20 Terjawab
                </span>
              </div>

              {/* Number Matrix Grid (20 buttons) */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {questionNumbers.map((num) => (
                  <button
                    key={num}
                    id={num === '14' ? 'q14Badge' : undefined}
                    className={getQuestionButtonClass(num)}
                    type="button"
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Legend Info */}
              <div className="grid grid-cols-2 gap-2 pt-3 text-label-sm font-label-sm text-text-muted">
                {paletteLegends.map((legend) => (
                  <div key={legend.label} className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded ${legend.colorClass}`}
                    ></span>
                    <span>{legend.label}</span>
                  </div>
                ))}
              </div>

              {/* Finish CTA */}
              <button
                className="w-full mt-2 py-3 rounded-lg bg-status-warning text-surface-card font-label-md text-label-md font-bold shadow hover:bg-tertiary-container transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                <Icon name="task_alt" className="text-[18px]" />
                <span>Selesai &amp; Kumpulkan Ujian</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
