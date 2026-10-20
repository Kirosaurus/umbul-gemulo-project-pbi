# Website Umbul Gemulo

Website statis (HTML + CSS + JavaScript biasa, tanpa build tool).

## Struktur
```
index.html
css/style.css
js/main.js            ← daftar foto galeri ada di sini
assets/images/        ← taruh semua gambar di sini (lihat README di dalamnya)
```

## Coba di komputer
Buka `index.html` di browser (atau jalankan `python3 -m http.server` lalu buka http://localhost:8000).

## Hosting di GitHub Pages
1. Buat repository baru di GitHub, upload seluruh isi folder ini (index.html harus di root repo).
2. Buka **Settings → Pages**.
3. Di **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1–2 menit; situs tersedia di `https://<username>.github.io/<nama-repo>/`.

Semua path di proyek ini relatif, jadi aman dipakai di alamat subfolder seperti di atas.
