# Siber Yılan Oyunu (Cyber Snake)

Bu proje, Python ve `turtle` kütüphanesi kullanılarak geliştirilmiş, Antigravity tarafından siber güvenlik teması entegre edilmiş klasik bir yılan (Snake) oyunudur.

## Proje Özellikleri

- **Oyun Motoru:** Görüntü render ve olay döngüsü (event loop) yönetimi için Python `turtle` grafik modülünden faydalanılmıştır.
- **Konsept ve Kullanıcı Arayüzü:** Oyun, koyu bir terminal hissiyatı uyandıracak siyah arka plan ve neon yeşil/kırmızı renk paleti kullanılarak tasarlanmıştır. Yılan "Veri Paketi", yem ise "Zafiyet" olarak betimlenmiştir.
- **Skor ve Kayıt Sistemi:** Gerçek zamanlı bir puanlama yapısı mevcuttur. O anki ilerlemeyi "Erişim" (Current Score), en yüksek performansı ise "Maksimum Erişim" (High Score) olarak takip eden dinamik bir skor tablosu eklenmiştir.
- **Çarpışma Algılama (Collision Detection):**
  - **Güvenlik Duvarı Çarpışması:** X ve Y koordinatları kontrol edilerek ekranın sınırlarına ulaşıldığında bağlantıyı kesen (oyunu sıfırlayan) bariyer mekanizması aktiftir.
  - **Kuyruk Kontrolü (Self Collision):** Bağımsız yılan segmentlerinin yılanın başı (head) ile olan mesafesi (distance) sürekli hesaplanarak kendine çarpma durumunda oyun sonlandırılmaktadır.
- **Dinamik Segmentasyon:** Hedef veri (yem) ele geçirildiğinde skor 10 puan artar, hedefin koordinatları rastgele (random) yenilenir ve yılanın dizisine (Array/List) yeni bir vücut parçası eklenerek büyüme sağlanır.
- **Oyun Döngüsü (Game Loop):** Performans optimizasyonu amacıyla `window.tracer(0)` fonksiyonu kullanılarak otomatik çizim kapatılmış, manuel state güncellemeleri (`window.update()`) ile akıcı bir ekran yenileme hızı (frame rate) elde edilmiştir.

## Demo

Gerçek bir demo görüntüsü için:
1. Oyunu oynarken Mac'inde **Cmd + Shift + 5** ile ekran kaydı al.
2. Bu kaydı bir [GIF oluşturucuya](https://ezgif.com/) yükle.
3. Oluşan `demo.gif` dosyasını ilgili proje klasörüne at.
4. README'deki görsel kısmını şu şekilde güncelle: `![Cyber Snake Demo](demo.gif)`

![Cyber Snake Demo](demo.gif)
