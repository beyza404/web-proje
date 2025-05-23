<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gönderilen Form Verileri - Kişisel Web Sitesi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            background-color: #f4f4f4; 
        }
        .data-container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-top: 40px;
        }
        .data-container h1 {
            color: #8B4513; 
            margin-bottom: 20px;
        }
        .data-item {
            margin-bottom: 10px;
            font-size: 1.1rem;
        }
        .data-item strong {
            color: #A0522D; 
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-custom">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">Adınız Soyadınız</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Hakkında</a></li>
                    <li class="nav-item"><a class="nav-link" href="ozgecmis.html">Özgeçmiş</a></li>
                    <li class="nav-item"><a class="nav-link" href="sehrim.html">Şehrim</a></li>
                    <li class="nav-item"><a class="nav-link" href="mirasimiz.html">Mirasımız</a></li>
                    <li class="nav-item"><a class="nav-link" href="ilgi-alanlarim.html">İlgi Alanlarım</a></li>
                    <li class="nav-item"><a class="nav-link" href="iletisim.html">İletişim</a></li>
                    <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="data-container">
            <h1 class="text-center">Gönderilen İletişim Formu Bilgileri</h1>

            <?php
            // Formun POST metodu ile gönderilip gönderilmediğini kontrol et
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                echo "<p>Form başarıyla gönderildi. İşte gönderdiğiniz bilgiler:</p><hr>";

                

                /
                if (isset($_POST['ad']) && !empty($_POST['ad'])) {
                    echo "<div class='data-item'><strong>Adınız:</strong> " . htmlspecialchars($_POST['ad']) . "</div>";
                }
                
                if (isset($_POST['soyad']) && !empty($_POST['soyad'])) {
                    echo "<div class='data-item'><strong>Soyadınız:</strong> " . htmlspecialchars($_POST['soyad']) . "</div>";
                }
                
                if (isset($_POST['email']) && !empty($_POST['email'])) {
                    echo "<div class='data-item'><strong>E-posta Adresiniz:</strong> " . htmlspecialchars($_POST['email']) . "</div>";
                }
                
                if (isset($_POST['telefon']) && !empty($_POST['telefon'])) {
                    echo "<div class='data-item'><strong>Telefon Numaranız:</strong> " . htmlspecialchars($_POST['telefon']) . "</div>";
                }
                
                if (isset($_POST['cinsiyet']) && !empty($_POST['cinsiyet'])) {
                    echo "<div class='data-item'><strong>Cinsiyetiniz:</strong> " . htmlspecialchars($_POST['cinsiyet']) . "</div>";
                }
                
                if (isset($_POST['konu']) && !empty($_POST['konu'])) {
                    echo "<div class='data-item'><strong>Konu:</strong> " . htmlspecialchars($_POST['konu']) . "</div>";
                }
                
                if (isset($_POST['yas']) && $_POST['yas'] !== '') { 
                    echo "<div class='data-item'><strong>Yaşınız:</strong> " . htmlspecialchars($_POST['yas']) . "</div>";
                }
                
                if (isset($_POST['mesaj']) && !empty($_POST['mesaj'])) {
                    
                    echo "<div class='data-item'><strong>Mesajınız:</strong><br>" . nl2br(htmlspecialchars($_POST['mesaj'])) . "</div>";
                }
                
                if (isset($_POST['ilgiAlanlari']) && is_array($_POST['ilgiAlanlari'])) {
                    echo "<div class='data-item'><strong>İlgilendiğiniz Alanlar:</strong> " . htmlspecialchars(implode(", ", $_POST['ilgiAlanlari'])) . "</div>";
                } else {
                    echo "<div class='data-item'><strong>İlgilendiğiniz Alanlar:</strong> Seçilmedi</div>";
                }
               
                if (isset($_FILES['dosya']) && $_FILES['dosya']['error'] == UPLOAD_ERR_OK) {
                    echo "<div class='data-item'><strong>Ek Dosya Adı:</strong> " . htmlspecialchars($_FILES['dosya']['name']) . "</div>";
                    
                } elseif (isset($_FILES['dosya']) && $_FILES['dosya']['error'] != UPLOAD_ERR_NO_FILE) {
                    echo "<div class='data-item'><strong>Ek Dosya:</strong> Yüklenirken bir hata oluştu (Hata kodu: " . $_FILES['dosya']['error'] . ")</div>";
                }


                
                if (isset($_POST['memnuniyet'])) { // 0 da bir değer olduğu için !empty kullanmıyoruz
                    echo "<div class='data-item'><strong>Genel Memnuniyetiniz:</strong> " . htmlspecialchars($_POST['memnuniyet']) . "/10</div>";
                }
               
                if (isset($_POST['kullanimKosullari']) && $_POST['kullanimKosullari'] == 'kabul') {
                    echo "<div class='data-item'><strong>Kullanım Koşulları:</strong> Kabul Edildi</div>";
                } else {
                    echo "<div class='data-item'><strong>Kullanım Koşulları:</strong> Kabul Edilmedi</div>";
                }

                echo "<hr><a href='iletisim.html' class='btn btn-secondary mt-3'>İletişim Formuna Geri Dön</a>";

            } else {
                
                echo "<p class='text-danger'>Bu sayfaya doğrudan erişilemez. Lütfen iletişim formunu kullanarak bilgilerinizi gönderin.</p>";
                echo "<a href='iletisim.html' class='btn btn-primary-custom mt-3'>İletişim Formuna Git</a>";
            }
            ?>
        </div>
    </div>

    <footer class="text-center mt-5 mb-3">
        <p>&copy; <?php echo date("Y"); ?> [Adınız Soyadınız] | Web Teknolojileri Projesi</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
