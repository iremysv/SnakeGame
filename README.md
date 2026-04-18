<div align="center">
  <h1>🐍 Siber Yılan Oyunu (Cyber Snake) 🐍</h1>
  <p><i>Antigravity Development tarafından siber güvenlik teması entegre edilmiş, karanlık Terminal hissiyatlı klasik Yılan oyunu.</i></p>
  
  ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
  ![Turtle](https://img.shields.io/badge/Turtle-Graphic_Engine-000000?style=for-the-badge)
  ![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
  
  <br>
  
  <img src="demo/demo.gif" alt="Cyber Snake Gameplay" width="400" style="border: 2px solid #00FF00; border-radius: 10px;">
  
  <br>
</div>

---

## 🎯 Proje Özellikleri

- 🚀 **Oyun Motoru:** Görüntü render ve olay döngüsü yönetimi için Python `turtle` modülünden faydalanılmıştır.
- 💻 **Siber Konsept:** Koyu bir terminal hissiyatı uyandıracak siyah arka plan, neon yeşil (`#00FF00`) ve kritik açık rengi kırmızı kullanılarak tasarlandı.
- 📦 **Veri Toplama:** Oyunda Yılan yerine bir **"Veri Paketi"**, yem yerine ise sistemdeki bir **"Zafiyet"** teması işlenmektedir. Yem toplandıkça sistem ele geçirilir!
- 📊 **Skor ve Kayıt Sistemi:** O anki ilerlemeyi gösteren **Erişim (Current Score)** ve kırılan rekoru gösteren **Maksimum Erişim (High Score)** olarak dinamik skor tablosu mevcuttur.
- 🛡️ **Çarpışma Algılama (Collision Detection):**
  - **Güvenlik Duvarı Çarpışması:** Ekran sınırlarına (Güvenlik Duvarı) ulaşıldığında bağlantı kesilir ve oyun başa döner.
  - **Kuyruk Kontrolü (Self Collision):** Bağımsız yılan zincirlerinin yılanın kendi haline çarpmasıyla oyun sıfırlanır.
- ⚡ **Optimizasyon:** `window.tracer(0)` fonksiyonu kullanılarak gereksiz ekran yenilemeleri kapatılmış, böylece FPS drop yaşanmayan akıcı bir oyun içi döngü yakalanmıştır.

---

## 🎮 Nasıl Oynanır?

Proje tamamen yerel bir Python betiği olarak çalışır. Aşağıdaki adımları takip ederek siber dünyaya anında giriş yapabilirsiniz.

1. **Projeyi indirin:**
   ```bash
   git clone <repo-url>
   cd SnakeGame
   ```

2. **Oyunu başlatın:**
   Oyun herhangi bir harici kütüphane kurulumu gerektirmez. Sadece Python'un standart bir modülü olan `turtle` modülünü kullanır.
   ```bash
   python3 main.py
   ```
   
3. **Kontroller:**
   - ⬆️ **Yukarı Ok:** Yukarı Yönlendir
   - ⬇️ **Aşağı Ok:** Aşağı Yönlendir
   - ⬅️ **Sol Ok:** Sola Yönlendir
   - ➡️ **Sağ Ok:** Sağa Yönlendir

---

## 🔒 Telif ve Kullanım Hakları 

Bu projenin tüm kaynak kodları, metinleri, algoritmaları ve mimarisi **İrem Yasav (Antigravity Development)** adına tescilli olup **All Rights Reserved** (Tüm Hakları Saklıdır) lisansıyla korunmaktadır. Projenin izinsiz çoğaltılması, kopyalanması, başka platformlarda kendi eseri gibi yayınlanması veya ticari/bireysel amaçlarla kullanılması kesinlikle yasaktır ve yasal işlem sebebidir. 

Daha fazla detay için [LICENSE](LICENSE) ve [SECURITY.md](SECURITY.md) dosyalarını inceleyebilirsiniz.

---
<div align="center">
  <sub>Code aesthetics and logic developed with ❤️ by İrem Yasav</sub>
</div>
