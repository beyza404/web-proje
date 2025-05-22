// iletisim.js

// Vue.js Uygulaması
const { createApp, ref, reactive } = Vue;

const iletisimApp = createApp({
    data() {
        return {
            formData: {
                ad: '',
                soyad: '',
                email: '',
                telefon: '',
                cinsiyet: '',
                konu: '',
                yas: null,
                mesaj: '',
                ilgiAlanlari: [],
                memnuniyet: 5,
                kullanimKosullari: false
            },
            formErrorsVue: {},
            formGenelErrorVueMessage: ''
        };
    },
    methods: {
        updateMemnuniyetValue() {
            const memnuniyetSpan = document.getElementById('memnuniyetValue');
            if (memnuniyetSpan) {
                memnuniyetSpan.textContent = this.formData.memnuniyet;
            }
        },
        clearFormVue() {
            // Form verilerini sıfırla
            this.formData = {
                ad: '',
                soyad: '',
                email: '',
                telefon: '',
                cinsiyet: '',
                konu: '',
                yas: null,
                mesaj: '',
                ilgiAlanlari: [],
                memnuniyet: 5,
                kullanimKosullari: false
            };
            // Vue hata mesajlarını temizle
            this.formErrorsVue = {};
            this.formGenelErrorVueMessage = '';
            
            // Formun kendisini de resetle (radio/checkbox gibi elemanların görsel seçimi için)
            document.getElementById('contactForm').reset(); 

            // Saf JS ile yönetilen hataları da temizle
            clearAllJsErrors();
            
            // Memnuniyet slider span'ını güncelle
            this.updateMemnuniyetValue();
        },
        validateFormVue() {
            this.formErrorsVue = {}; // Her validasyonda hataları sıfırla
            let isValid = true;
            this.formGenelErrorVueMessage = '';

            // Ad Kontrolü
            if (!this.formData.ad.trim()) {
                this.formErrorsVue.ad = 'Ad alanı boş bırakılamaz (Vue).';
                isValid = false;
            }

            // Soyad Kontrolü
            if (!this.formData.soyad.trim()) {
                this.formErrorsVue.soyad = 'Soyad alanı boş bırakılamaz (Vue).';
                isValid = false;
            }

            // E-posta Kontrolü
            if (!this.formData.email.trim()) {
                this.formErrorsVue.email = 'E-posta alanı boş bırakılamaz (Vue).';
                isValid = false;
            } else {
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailPattern.test(this.formData.email)) {
                    this.formErrorsVue.email = 'Lütfen geçerli bir e-posta adresi giriniz (Vue).';
                    isValid = false;
                }
            }

            // Telefon Kontrolü
            if (!this.formData.telefon.trim()) {
                this.formErrorsVue.telefon = 'Telefon alanı boş bırakılamaz (Vue).';
                isValid = false;
            } else {
                const phonePattern = /^[0-9]{10,11}$/; // Sadece 10 veya 11 rakam
                if (!phonePattern.test(this.formData.telefon.trim())) {
                    this.formErrorsVue.telefon = 'Telefon numarası sadece rakamlardan oluşmalı ve 10 veya 11 haneli olmalıdır (örn: 5xxxxxxxxx) (Vue).';
                    isValid = false;
                }
            }

            // Cinsiyet Kontrolü
            if (!this.formData.cinsiyet) {
                this.formErrorsVue.cinsiyet = 'Lütfen cinsiyetinizi seçiniz (Vue).';
                isValid = false;
            }

            // Konu Kontrolü
            if (!this.formData.konu) {
                this.formErrorsVue.konu = 'Lütfen bir konu seçiniz (Vue).';
                isValid = false;
            }

            // Mesaj Kontrolü
            if (!this.formData.mesaj.trim()) {
                this.formErrorsVue.mesaj = 'Mesaj alanı boş bırakılamaz (Vue).';
                isValid = false;
            }

            // Kullanım Koşulları Kontrolü
            if (!this.formData.kullanimKosullari) {
                this.formErrorsVue.kullanimKosullari = 'Devam etmek için kullanım koşullarını kabul etmelisiniz (Vue).';
                isValid = false;
            }

            if (!isValid) {
                this.formGenelErrorVueMessage = 'Lütfen formdaki işaretli alanları düzeltin (Vue).';
            }
            return isValid;
        },
        vueSubmit() {
            // Vue ile Doğrula ve Gönder butonu bu metodu tetikler
            // Önce saf JS hatalarını temizle, böylece sadece Vue hataları görünür
            clearAllJsErrors();
            if (this.validateFormVue()) {
                console.log('Vue.js ile form doğrulandı, gönderiliyor:', this.formData);
                document.getElementById('contactForm').submit();
            } else {
                console.log('Vue.js ile form doğrulaması başarısız.');
            }
        }
    },
    mounted() {
        this.updateMemnuniyetValue();
    }
});

const vm = iletisimApp.mount('#iletisimApp');

// --- Saf JavaScript Fonksiyonları ---

// Helper: Belirli bir input için JS hata mesajını ayarlar ve .is-invalid class'ı ekler
function setJsError(inputId, errorMsgId, message) {
    document.getElementById(errorMsgId).textContent = message;
    document.getElementById(inputId).classList.add('is-invalid');
}

// Helper: Belirli bir input için JS hata mesajını ve .is-invalid class'ını temizler
function clearJsError(inputId, errorMsgId) {
    document.getElementById(errorMsgId).textContent = '';
    document.getElementById(inputId).classList.remove('is-invalid');
}

// Tüm JavaScript hata mesajlarını ve .is-invalid class'larını temizleme
function clearAllJsErrors() {
    const formElements = document.getElementById('contactForm').elements;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.id) { // Sadece id'si olanları hedef alalım
            const errorMsgId = element.id + 'ErrorJs';
            const errorDiv = document.getElementById(errorMsgId);
            if (errorDiv) {
                errorDiv.textContent = '';
            }
            element.classList.remove('is-invalid');
        }
    }
    // Cinsiyet ve Kullanım Koşulları gibi özel durumlar için de temizlik
    const cinsiyetErrorJs = document.getElementById('cinsiyetErrorJs');
    if (cinsiyetErrorJs) cinsiyetErrorJs.textContent = '';
    
    const kosulErrorJs = document.getElementById('kosulErrorJs');
    const kosulCheckbox = document.getElementById('kullanimKosullari');
    if (kosulErrorJs) kosulErrorJs.textContent = '';
    if (kosulCheckbox) kosulCheckbox.classList.remove('is-invalid');

    document.getElementById('formGenelErrorJs').textContent = '';
}


document.getElementById('clearForm').addEventListener('click', function() {
    vm.clearFormVue(); // Vue datasını ve formu temizler, ayrıca JS hatalarını da temizler.
});

document.getElementById('validateAndSubmitJs').addEventListener('click', function() {
    clearAllJsErrors(); // Önceki JS hatalarını temizle
    vm.formErrorsVue = {}; // Vue hatalarını da temizleyelim ki karışmasın
    vm.formGenelErrorVueMessage = '';

    let isValid = true;
    const form = document.getElementById('contactForm');

    // Ad Kontrolü
    const adInput = document.getElementById('ad');
    if (adInput.value.trim() === '') {
        setJsError('ad', 'adErrorJs', 'Ad alanı boş bırakılamaz (JS).');
        isValid = false;
    } else {
        clearJsError('ad', 'adErrorJs');
    }

    // Soyad Kontrolü
    const soyadInput = document.getElementById('soyad');
    if (soyadInput.value.trim() === '') {
        setJsError('soyad', 'soyadErrorJs', 'Soyad alanı boş bırakılamaz (JS).');
        isValid = false;
    } else {
        clearJsError('soyad', 'soyadErrorJs');
    }

    // E-posta Kontrolü
    const emailInput = document.getElementById('email');
    if (emailInput.value.trim() === '') {
        setJsError('email', 'emailErrorJs', 'E-posta alanı boş bırakılamaz (JS).');
        isValid = false;
    } else {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            setJsError('email', 'emailErrorJs', 'Lütfen geçerli bir e-posta adresi giriniz (JS).');
            isValid = false;
        } else {
            clearJsError('email', 'emailErrorJs');
        }
    }

    // Telefon Kontrolü
    const telefonInput = document.getElementById('telefon');
    if (telefonInput.value.trim() === '') {
        setJsError('telefon', 'telefonErrorJs', 'Telefon alanı boş bırakılamaz (JS).');
        isValid = false;
    } else {
        const phonePattern = /^[0-9]{10,11}$/; // Sadece 10 veya 11 rakam
        if (!phonePattern.test(telefonInput.value.trim())) {
            setJsError('telefon', 'telefonErrorJs', 'Telefon numarası sadece rakamlardan oluşmalı ve 10 veya 11 haneli olmalıdır (örn: 5xxxxxxxxx) (JS).');
            isValid = false;
        } else {
            clearJsError('telefon', 'telefonErrorJs');
        }
    }

    // Cinsiyet Kontrolü
    const cinsiyetRadios = document.getElementsByName('cinsiyet');
    let cinsiyetSecili = false;
    for (const radio of cinsiyetRadios) {
        if (radio.checked) {
            cinsiyetSecili = true;
            break;
        }
    }
    const cinsiyetErrorJsDiv = document.getElementById('cinsiyetErrorJs');
    if (!cinsiyetSecili) {
        cinsiyetErrorJsDiv.textContent = 'Lütfen cinsiyetinizi seçiniz (JS).';
        cinsiyetErrorJsDiv.style.display = 'block'; // Bootstrap .invalid-feedback normalde gizli olduğu için görünür yap
        isValid = false;
    } else {
        cinsiyetErrorJsDiv.textContent = '';
        cinsiyetErrorJsDiv.style.display = 'none';
    }

    // Konu Kontrolü
    const konuSelect = document.getElementById('konu');
    if (konuSelect.value === '') {
        setJsError('konu', 'konuErrorJs', 'Lütfen bir konu seçiniz (JS).');
        isValid = false;
    } else {
        clearJsError('konu', 'konuErrorJs');
    }

    // Mesaj Kontrolü
    const mesajTextarea = document.getElementById('mesaj');
    if (mesajTextarea.value.trim() === '') {
        setJsError('mesaj', 'mesajErrorJs', 'Mesaj alanı boş bırakılamaz (JS).');
        isValid = false;
    } else {
        clearJsError('mesaj', 'mesajErrorJs');
    }

    // Kullanım Koşulları Kontrolü
    const kosulCheckbox = document.getElementById('kullanimKosullari');
    const kosulErrorJsDiv = document.getElementById('kosulErrorJs');
    if (!kosulCheckbox.checked) {
        kosulErrorJsDiv.textContent = 'Devam etmek için kullanım koşullarını kabul etmelisiniz (JS).';
        kosulErrorJsDiv.style.display = 'block';
        kosulCheckbox.classList.add('is-invalid'); // Checkbox için de stil uygula
        isValid = false;
    } else {
        kosulErrorJsDiv.textContent = '';
        kosulErrorJsDiv.style.display = 'none';
        kosulCheckbox.classList.remove('is-invalid');
    }

    if (isValid) {
        console.log('Saf JavaScript ile form doğrulandı, gönderiliyor.');
        form.submit();
    } else {
        document.getElementById('formGenelErrorJs').textContent = 'Lütfen formdaki işaretli alanları düzeltin (JS).';
        console.log('Saf JavaScript ile form doğrulaması başarısız.');
    }
});

// Range slider değeri için span'ı güncelleme
const memnuniyetSlider = document.getElementById('memnuniyet');
const memnuniyetValueSpan = document.getElementById('memnuniyetValue');

if(memnuniyetSlider && memnuniyetValueSpan){
    // Sayfa yüklendiğinde de span'ı güncelle
    memnuniyetValueSpan.textContent = memnuniyetSlider.value; 
    memnuniyetSlider.addEventListener('input', function() {
        memnuniyetValueSpan.textContent = this.value;
    });
}
