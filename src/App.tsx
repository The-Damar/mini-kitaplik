import React, { useState, useEffect } from 'react';

// Kitap Veri Arayüzü
interface Kitap {
  id: number;
  baslik: string;
  yazar: string;
  kategori: string;
}

// Sabit Kitap Listesi
const KITAPLAR_VERI: Kitap[] = [
  { id: 1, baslik: "React'e Giriş", yazar: "D. Usta", kategori: "Web" },
  { id: 2, baslik: "İleri JavaScript", yazar: "S. Kılıç", kategori: "Web" },
  { id: 3, baslik: "Veri Yapıları", yazar: "A. Demir", kategori: "CS" },
  { id: 4, baslik: "Algoritmalar", yazar: "E. Kaya", kategori: "CS" },
  { id: 5, baslik: "UI/UX Temelleri", yazar: "N. Akın", kategori: "Tasarım" },
];

// --- 1. ARAMA ÇUBUĞU BİLEŞENİ ---
interface AramaCubuguProps {
  aramaMetni: string;
  onAramaDegis: (metin: string) => void;
}

const AramaCubugu: React.FC<AramaCubuguProps> = ({ aramaMetni, onAramaDegis }) => {
  return (
    <input
      type="text"
      placeholder="Başlık veya yazar ara..."
      value={aramaMetni}
      onChange={(e) => onAramaDegis(e.target.value)}
      style={{
        width: '100%',
        padding: '10px 12px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        boxSizing: 'border-box',
        fontSize: '14px',
        backgroundColor: '#ffffff',
        color: '#333333',
        outline: 'none'
      }}
    />
  );
};

// --- 2. KATEGORİ FİLTRE BİLEŞENİ ---
interface KategoriFiltreProps {
  seciliKategori: string;
  onKategoriDegis: (kategori: string) => void;
}

const KategoriFiltre: React.FC<KategoriFiltreProps> = ({ seciliKategori, onKategoriDegis }) => {
  return (
    <select
      value={seciliKategori}
      onChange={(e) => onKategoriDegis(e.target.value)}
      style={{
        width: '100%',
        padding: '10px 12px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        boxSizing: 'border-box',
        fontSize: '14px',
        backgroundColor: '#ffffff',
        color: '#333333',
        outline: 'none',
        height: '42px'
      }}
    >
      <option value="Tümü">Tümü</option>
      <option value="Web">Web</option>
      <option value="CS">CS</option>
      <option value="Tasarım">Tasarım</option>
    </select>
  );
};

// --- 3. KİTAP KARTI BİLEŞENİ ---
interface KitapKartiProps extends Kitap {
  favorideMi: boolean;
  onFavoriToggle: (id: number) => void;
}

const KitapKarti: React.FC<KitapKartiProps> = ({ id, baslik, yazar, kategori, favorideMi, onFavoriToggle }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      marginBottom: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ textAlign: 'left' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#333333' }}>{baslik}</h4>
        <span style={{ fontSize: '13px', color: '#666666' }}>{yazar} • <b>{kategori}</b></span>
      </div>
      <button
        onClick={() => onFavoriToggle(id)}
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          border: favorideMi ? '1px solid #ffa000' : '1px solid #ccc',
          backgroundColor: favorideMi ? '#fff8e1' : '#f5f5f5',
          color: favorideMi ? '#f57c00' : '#333333',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '13px'
        }}
      >
        {favorideMi ? '★ Favoride' : '✩ Favori Ekle'}
      </button>
    </div>
  );
};

// --- 4. KİTAP LİSTE BİLEŞENİ ---
interface KitapListeProps {
  kitaplar: Kitap[];
  favoriler: number[];
  onFavoriToggle: (id: number) => void;
}

const KitapListe: React.FC<KitapListeProps> = ({ kitaplar, favoriler, onFavoriToggle }) => {
  if (kitaplar.length === 0) {
    return <p style={{ color: '#888888', fontStyle: 'italic', textAlign: 'center' }}>Aranan kriterlere uygun kitap bulunamadı.</p>;
  }

  return (
    <div>
      {kitaplar.map((kitap) => (
        <KitapKarti
          key={kitap.id}
          {...kitap}
          favorideMi={favoriler.includes(kitap.id)}
          onFavoriToggle={onFavoriToggle}
        />
      ))}
    </div>
  );
};

// --- 5. FAVORİ PANELİ BİLEŞENİ ---
interface FavoriPaneliProps {
  favoriKitaplar: Kitap[];
  onFavoriCikar: (id: number) => void;
}

const FavoriPaneli: React.FC<FavoriPaneliProps> = ({ favoriKitaplar, onFavoriCikar }) => {
  return (
    <div style={{
      marginTop: '25px',
      padding: '16px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      textAlign: 'left'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#333333' }}>
        Favoriler ({favoriKitaplar.length})
      </h3>
      {favoriKitaplar.length === 0 ? (
        <p style={{ margin: 0, fontSize: '13px', color: '#888888' }}>Henüz favori kitap eklenmedi.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {favoriKitaplar.map((kitap) => (
            <li
              key={kitap.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 0',
                borderBottom: '1px dashed #e0e0e0',
                fontSize: '14px',
                color: '#333333'
              }}
            >
              <span>• {kitap.baslik}</span>
              <button
                onClick={() => onFavoriCikar(kitap.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#d32f2f',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                Kaldır
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- ANA UYGULAMA BİLEŞENİ (APP) ---
export default function App() {
  const [kitaplar] = useState<Kitap[]>(KITAPLAR_VERI);

  const [aramaMetni, setAramaMetni] = useState<string>(() => {
    return localStorage.getItem('kitaplik_arama') || '';
  });

  const [kategori, setKategori] = useState<string>('Tümü');

  const [favoriler, setFavoriler] = useState<number[]>(() => {
    const kayitliFavoriler = localStorage.getItem('kitaplik_favoriler');
    return kayitliFavoriler ? JSON.parse(kayitliFavoriler) : [];
  });

  useEffect(() => {
    localStorage.setItem('kitaplik_arama', aramaMetni);
  }, [aramaMetni]);

  useEffect(() => {
    localStorage.setItem('kitaplik_favoriler', JSON.stringify(favoriler));
  }, [favoriler]);

  const handleFavoriToggle = (id: number) => {
    setFavoriler((onceki) =>
      onceki.includes(id) ? onceki.filter((fId) => fId !== id) : [...onceki, id]
    );
  };

  const filtrelenmisKitaplar = kitaplar.filter((kitap) => {
    const aramaUyumlu =
      kitap.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      kitap.yazar.toLowerCase().includes(aramaMetni.toLowerCase());

    const kategoriUyumlu = kategori === 'Tümü' || kitap.kategori === kategori;

    return aramaUyumlu && kategoriUyumlu;
  });

  const favoriKitapListesi = kitaplar.filter((k) => favoriler.includes(k.id));

  return (
    <div style={{
      maxWidth: '480px',
      margin: '40px auto',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      color: '#333333'
    }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '22px', color: '#111111', textAlign: 'center' }}>Mini Kitaplık</h2>

      <AramaCubugu aramaMetni={aramaMetni} onAramaDegis={setAramaMetni} />

      <KategoriFiltre seciliKategori={kategori} onKategoriDegis={setKategori} />

      <KitapListe
        kitaplar={filtrelenmisKitaplar}
        favoriler={favoriler}
        onFavoriToggle={handleFavoriToggle}
      />

      <FavoriPaneli
        favoriKitaplar={favoriKitapListesi}
        onFavoriCikar={handleFavoriToggle}
      />
    </div>
  );
}