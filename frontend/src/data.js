export const rooms=[
 {id:1,judul:'Matematika Dasar – Bab 3',token:'SKOR88',soal:200,durasi:90,status:'Buka',peserta:28,tutup:'12 Okt 2026, 10.00'},
 {id:2,judul:'Bahasa Indonesia – PTS',token:'B4TN-8RLW',soal:60,durasi:60,status:'Buka',peserta:31,tutup:'14 Okt 2026, 09.00'},
 {id:3,judul:'IPA Terpadu – Latihan 2',token:'H9ZC-2DVE',soal:40,durasi:45,status:'Tutup',peserta:30,tutup:'2 Okt 2026, 11.30'}]
export const hasil=[
 {nama:'Aisyah Putri',benar:172,nilai:86,waktu:'09.41'},{nama:'Bagus Pratama',benar:158,nilai:79,waktu:'09.52'},
 {nama:'Citra Lestari',benar:181,nilai:90.5,waktu:'09.38'},{nama:'Dimas Aditya',benar:133,nilai:66.5,waktu:'09.58'}]
export const riwayat=[
 {judul:'IPA Terpadu – Latihan 2',tgl:'2 Okt 2026',benar:34,total:40,nilai:85},
 {judul:'Bahasa Inggris – Quiz 4',tgl:'25 Sep 2026',benar:17,total:20,nilai:85},
 {judul:'Matematika – Ulangan Harian',tgl:'18 Sep 2026',benar:41,total:50,nilai:82}]
export const guruBaru=[
 {id:1,nama:'Pak Hendra Saputra',email:'hendra@smkn1.sch.id',sekolah:'SMKN 1 Dlanggu'},
 {id:2,nama:'Bu Maya Anggraini',email:'maya@sman2.sch.id',sekolah:'SMAN 2 Mojokerto'}]
// Kunci tidak ada di sini: server tidak mengirim kunci ke browser murid.
export const soalUjian=[
 {id:1,teks:'Hasil dari 3/4 + 5/8 adalah …',opsi:['1 1/8','1 3/8','1 1/4','7/8','1 1/2']},
 {id:2,teks:'Sebuah persegi panjang berukuran 12 cm × 7 cm. Kelilingnya adalah …',opsi:['38 cm','84 cm','19 cm','76 cm','42 cm']},
 {id:3,teks:'Nilai x dari 2x + 5 = 19 adalah …',opsi:['5','7','9','12','14']},
 {id:4,teks:'FPB dari 24 dan 36 adalah …',opsi:['6','8','12','18','72']},
 {id:5,teks:'Rata-rata dari 6, 8, 10, 12 adalah …',opsi:['8','9','10','11','12']}]
// Respons POST /sets/upload (pratinjau). kunci:null = belum ada kunci.
export const pratinjau=[
 {no:1,teks:'Ibu kota Provinsi Jawa Timur adalah …',opsi:['Malang','Surabaya','Kediri','Madiun','Jember'],kunci:'B'},
 {no:2,teks:'Hasil dari 15 × 12 adalah …',opsi:['160','170','180','190','200'],kunci:'C'},
 {no:3,teks:'Sinonim kata "gigih" adalah …',opsi:['Malas','Tekun','Ragu','Lamban','Cepat'],kunci:null},
 {no:4,teks:'Lambang kimia untuk air adalah …',opsi:['CO2','O2','H2O','NaCl','H2'],kunci:'C'},
 {no:5,teks:'Proklamasi kemerdekaan Indonesia dibacakan pada tahun …',opsi:['1942','1945','1949','1950','1955'],kunci:null}]
