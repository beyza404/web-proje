<?php

session_start(); 

$ogrenci_no_temel = "b231210062"; 

$dogru_kullanici_adi = $ogrenci_no_temel . "@sakarya.edu.tr";
$dogru_sifre = $ogrenci_no_temel;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $girilen_kullanici_adi = isset($_POST['username']) ? trim($_POST['username']) : '';
    $girilen_sifre = isset($_POST['password']) ? trim($_POST['password']) : '';

    
    if (empty($girilen_kullanici_adi) || empty($girilen_sifre)) {
       
        header("Location: login.html"); 
        exit;
    }

    if ($girilen_kullanici_adi === $dogru_kullanici_adi && $girilen_sifre === $dogru_sifre) {
        
        $kullanici_no_mesaj = htmlspecialchars($ogrenci_no_temel, ENT_QUOTES, 'UTF-8');
        echo "<!DOCTYPE html><html lang='tr'><head><meta charset='UTF-8'><title>Giriş Başarılı</title>";
        echo "<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css' rel='stylesheet'>";
        echo "<link rel='stylesheet' href='style.css'>";
        echo "</head><body class='d-flex justify-content-center align-items-center vh-100 text-center'>";
        echo "<div class='container'>";
        echo "<h1>Giriş Başarılı!</h1>";
        echo "<p class='lead'>Hoşgeldiniz <strong>" . $kullanici_no_mesaj . "</strong></p>"; 
        echo "<a href='index.html' class='btn btn-primary-custom mt-3'>Ana Sayfaya Dön</a>";
        echo "</div></body></html>";
        exit;
    } else {
        
        header("Location: login.html"); 
        exit;
    }
} else {
    
    header("Location: login.html");
    exit;
}
?>
