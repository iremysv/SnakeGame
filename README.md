<div align="center">
  <h1>🐍 Siber Yılan Oyunu (Cyber Snake) 🐍</h1>
  <p><i>Siber güvenlik teması entegre edilmiş, karanlık Terminal hissiyatlı klasik Yılan oyunu.</i></p>
  
  ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
  
  <br>
  
  ![Cyber Snake Gameplay](demo/demo.gif)
  
  <br>
</div>

---

## 🎯 Proje Özellikleri

- 🚀 **Oyun Motorları:** Standart kullanım için Python `turtle` modülü, web arayüzü için **HTML5 `<canvas>`** ve vanilla JavaScript kullanılarak eşzamanlı iki farklı versiyon üretilmiştir.
- 💻 **Siber Konsept:** Koyu bir terminal hissiyatı uyandıracak siyah arka plan, neon yeşil (`#00FF00`) ve kritik açık rengi kırmızı kullanılarak tasarlandı. Yeni eklenen web arayüzünde "Glassmorphism" (cam görünümü) efektleri ile daha premium bir hava yakalanmıştır.
- 📦 **Veri Toplama:** Oyunda Yılan yerine bir **"Veri Paketi"**, yem yerine ise sistemdeki bir **"Zafiyet"** teması işlenmektedir. Yem toplandıkça sistem ele geçirilir!
- 📊 **Skor ve Kayıt Sistemi:** O anki ilerlemeyi gösteren **Erişim (Current Score)** ve kırılan rekoru gösteren **Maksimum Erişim (High Score)** olarak dinamik skor tablosu mevcuttur.
- 🛡️ **Çarpışma Algılama (Collision Detection):**
  - **Güvenlik Duvarı Çarpışması:** Ekran sınırlarına (Güvenlik Duvarı) ulaşıldığında bağlantı kesilir ve oyun başa döner.
  - **Kuyruk Kontrolü (Self Collision):** Bağımsız yılan zincirlerinin yılanın kendi haline çarpmasıyla oyun sıfırlanır.
- ⚡ **Optimizasyon:** `window.tracer(0)` fonksiyonu kullanılarak gereksiz ekran yenilemeleri kapatılmış, böylece FPS drop yaşanmayan akıcı bir oyun içi döngü yakalanmıştır.

---

## 🎮 Nasıl Oynanır?

Projede hem yerel (Python) hem de tarayıcı tabanlı (Web) sürüm mevcuttur.

1. **Projeyi indirin:**
   ```bash
   git clone <repo-url>
   cd SnakeGame
   ```

2. **Web Versiyonunu Oynayın (Yeni & Tavsiye Edilen):**
   Herhangi bir kurulum gerektirmez. Sadece klasördeki `index.html` dosyasını tarayıcınızda (Chrome, Safari, Firefox vs.) çift tıklayarak açın. Modern web arayüzünün tadını çıkarın!

3. **Python Versiyonunu Oynayın:**
   Yalnızca standart bir modül olan `turtle` kullanır.
   ```bash
   python3 main.py
   ```
   
4. **Kontroller:**
   - ⬆️ **Yukarı Ok:** Yukarı Yönlendir
   - ⬇️ **Aşağı Ok:** Aşağı Yönlendir
   - ⬅️ **Sol Ok:** Sola Yönlendir
   - ➡️ **Sağ Ok:** Sağa Yönlendir

---

## 🔒 Telif ve Kullanım Hakları 

Bu projenin tüm kaynak kodları, metinleri, algoritmaları ve mimarisi **İrem Yasav** adına tescilli olup **All Rights Reserved** (Tüm Hakları Saklıdır) lisansıyla korunmaktadır. Projenin izinsiz çoğaltılması, kopyalanması, başka platformlarda kendi eseri gibi yayınlanması veya ticari/bireysel amaçlarla kullanılması kesinlikle yasaktır ve yasal işlem sebebidir. 

Daha fazla detay için [LICENSE](LICENSE) ve [SECURITY.md](SECURITY.md) dosyalarını inceleyebilirsiniz.
