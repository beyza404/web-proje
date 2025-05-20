<?php
// Hata raporlamasını açmak geliştirme aşamasında faydalı olabilir
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

session_start(); // Oturumları kullanmak için (isteğe bağlı, şu anki gereksinim için şart değil ama iyi bir pratik)

// BURAYI KENDİ ÖĞRENCİ NUMARANIZLA DEĞİŞTİRİN
$ogrenci_no_temel = "b231210062"; // Örneğin: g201210001, b191210002 vb.

$dogru_kullanici_adi = $ogrenci_no_temel . "@sakarya.edu.tr";
$dogru_sifre = $ogrenci_no_temel;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $girilen_kullanici_adi = isset($_POST['username']) ? trim($_POST['username']) : '';
    $girilen_sifre = isset($_POST['password']) ? trim($_POST['password']) : '';

    // Basit boşluk kontrolü (sunucu tarafında da yapmak iyi bir pratiktir)
    if (empty($girilen_kullanici_adi) || empty($girilen_sifre)) {
        // İsterseniz burada bir hata mesajı ile login sayfasına yönlendirebilirsiniz
        // Veya doğrudan login sayfasına yönlendirme yapabilirsiniz.
        // Örnek: $_SESSION['login_error'] = "Kullanıcı adı veya şifre boş bırakılamaz.";
        header("Location: login.html"); // Hatalı veya eksik giriş, login sayfasına geri yönlendir
        exit;
    }

    if ($girilen_kullanici_adi === $dogru_kullanici_adi && $girilen_sifre === $dogru_sifre) {
        // Giriş başarılı [cite: 12]
        // Hoşgeldin mesajı için kullanıcı adının @ işaretinden önceki kısmını alalım (öğrenci numarası)
        $kullanici_no_mesaj = htmlspecialchars($ogrenci_no_temel, ENT_QUOTES, 'UTF-8');
        echo "<!DOCTYPE html><html lang='tr'><head><meta charset='UTF-8'><title>Giriş Başarılı</title>";
        echo "<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css' rel='stylesheet'>";
        echo "<link rel='stylesheet' href='style.css'>"; // Ana stil dosyanız
        echo "</head><body class='d-flex justify-content-center align-items-center vh-100 text-center'>";
        echo "<div class='container'>";
        echo "<h1>Giriş Başarılı!</h1>";
        echo "<p class='lead'>Hoşgeldiniz <strong>" . $kullanici_no_mesaj . "</strong></p>"; // [cite: 12]
        echo "<a href='index.html' class='btn btn-primary-custom mt-3'>Ana Sayfaya Dön</a>";
        echo "</div></body></html>";
        exit;
    } else {
        // Giriş başarısız [cite: 12]
        // İsterseniz burada bir hata mesajı ayarlayabilirsiniz.
        // Örnek: $_SESSION['login_error'] = "Kullanıcı adı veya şifre hatalı.";
        header("Location: login.html"); // Login sayfasına geri yönlendir
        exit;
    }
} else {
    // POST metodu dışındaki istekleri login sayfasına yönlendir
    header("Location: login.html");
    exit;
}
?>
