import { useState } from 'react';
import Icon from '../ui/Icon';
import { sampleRooms, initialRoom } from '../../data/landing';

export default function TokenCard() {
  const [token, setToken] = useState('SKOR88');
  const [roomState, setRoomState] = useState({
    status: 'initial', // 'initial' | 'found' | 'not_found'
    data: initialRoom,
    searchedCode: 'SKOR88',
  });

  const handleValidate = () => {
    const val = token.trim().toUpperCase();
    const match = sampleRooms.find((r) => r.code === val);
    if (match) {
      setRoomState({
        status: 'found',
        data: match,
        searchedCode: val,
      });
    } else {
      setRoomState({
        status: 'not_found',
        data: null,
        searchedCode: val,
      });
    }
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * sampleRooms.length);
    const chosen = sampleRooms[randomIndex];
    setToken(chosen.code);
    setRoomState({
      status: 'found',
      data: chosen,
      searchedCode: chosen.code,
    });
  };

  return (
    <div className="col-span-12 lg:col-span-5 relative" id="simulasi">
      {/* Glass Accent Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none"></div>

      <div className="relative bg-surface-card rounded-xl p-space-xl shadow-xl flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-status-danger"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-status-warning"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-status-success"></span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-label-sm font-semibold bg-primary-fixed text-primary">
            Sesi Aktif
          </span>
        </div>

        <div>
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface block">
            Akses Ruang CBT
          </span>
          <p className="font-body-sm text-body-sm text-text-muted">
            Masukkan token ujian kelas
          </p>
        </div>

        <div className="relative flex items-center mt-1">
          <input
            className="w-full h-14 bg-surface-container-low text-center font-headline-md text-headline-md tracking-[0.25em] uppercase rounded-xl text-primary focus:outline-none focus:bg-surface-card shadow-inner font-extrabold"
            id="tokenInput"
            maxLength={6}
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleValidate();
            }}
            aria-label="Token ujian"
          />
          <button
            className="absolute right-3 p-1.5 text-text-muted hover:text-primary transition-colors"
            id="btnResetToken"
            title="Acak Kode"
            aria-label="Acak Kode"
            type="button"
            onClick={handleRandom}
          >
            <Icon name="refresh" className="text-[20px]" />
          </button>
        </div>

        <button
          className="w-full py-3 rounded-xl bg-primary-container text-surface-card font-label-lg font-bold shadow hover:bg-primary transition-all flex items-center justify-center gap-2"
          id="btnValidateToken"
          type="button"
          onClick={handleValidate}
        >
          <Icon name="login" className="text-[18px]" />
          <span>Validasi Token</span>
        </button>

        <div
          className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1 transition-all"
          id="roomFeedback"
          aria-live="polite"
        >
          {roomState.status === 'initial' && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                  <span className="font-label-sm text-label-sm font-bold text-status-success uppercase">
                    Ruang Tersedia
                  </span>
                </div>
                <span className="font-label-sm text-label-sm font-semibold text-primary">
                  {roomState.data.count}
                </span>
              </div>
              <div className="font-body-md text-on-surface font-semibold truncate">
                {roomState.data.name}
              </div>
              <div className="text-text-muted font-body-sm text-[12px]">
                Penguji: {roomState.data.teacher}
              </div>
            </>
          )}

          {roomState.status === 'found' && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse"></span>
                <span className="font-label-sm text-label-sm font-bold text-status-success uppercase tracking-wider">
                  Status Ruang Aktif
                </span>
              </div>
              <div className="font-headline-sm text-body-md text-on-surface font-semibold">
                {roomState.data.name}
              </div>
              <div className="flex items-center justify-between text-text-muted font-body-sm text-body-sm pt-1">
                <span>Penguji: {roomState.data.teacher}</span>
                <span className="font-semibold text-primary">
                  {roomState.data.count}
                </span>
              </div>
            </>
          )}

          {roomState.status === 'not_found' && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-status-danger animate-pulse"></span>
                <span className="font-label-sm text-label-sm font-bold text-status-danger uppercase tracking-wider">
                  Token Tidak Ditemukan
                </span>
              </div>
              <div className="font-headline-sm text-body-md text-on-surface font-semibold">
                Kode &quot;{roomState.searchedCode}&quot; Belum Dijadwalkan
              </div>
              <div className="text-text-muted font-body-sm text-body-sm pt-1">
                Harap tanyakan ulang token resmi 6-digit kepada pengawas ujian di kelas.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
