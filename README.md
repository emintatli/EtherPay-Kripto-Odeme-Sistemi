<h1 align="center">EtherPay-Kripto-Odeme-Sistemi 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Ethereum ödeme yapma-alma kripto POS sistemi

## ✨ [Demo](https://ether-pay.herokuapp.com/demokullanici123)

## ✨ Youtube DEMO : [Youtube](https://www.youtube.com/watch?v=9b5IKDIbq0I)

<p align="center"><img src="https://i.ibb.co/NCwG9Lp/logo.png" alt="logo" border="0"></p>

# Başlamadan Önce
Kullanmadan önce api dosyalarının içindedki token,MONGODB ve ETHER_SCAN_API kısımlarını kendi bilgilerinizle değiştirmeniz gerekmektedir.
Uygulama default olarak <b>Ropsten Test Ağı</b> üzerinde çalışmaktadır.Bunu değiştirmek için Etherscan kısmındaki api url sini Ethereum main network API url si ile değiştirmeniz gereklidir.




## Özellikler
*Tarayıcıdan çıkılsa hadi kullanıcı zaman limiti içerisinde oturumunu şifre veya kullanıcı adı girmeden aynı url üzerinden tekrar devam ettirebilmektedir.<br/>
*Tüm ethereum ağları için geçerlidir, diğer ağlarda kullanmak için tek yapmanız gereken EtherScan api url sini değiştirmek olacaktır.(default olarak Ropsten ayarlı)<br/>
*Her ödeme yapacak kullanıcıya özel bir ethereum cüzdanı oluşturulur ve kullanıcının bu adrese ödeme yapması beklenir.Oluşturulan bu adresler ve kullancı,kullanıcı ödeme bilgileri,cüzdan adresi ve cüzdan private anahtarı mongoDB servisi üzerinde saklanır.Ödemeleri almak için private anahtarları kullanmanız yeterlidir.<br/>
*Mobil uyglama üzerinden ethereum cüzdanı kullanan kullanıcılar içinse otomatik QR kodu desteği bulunmaktadır.Oluşturulan her cüzdan kullanıcıya hem QR hemde yazı olarak gösterilir.


<br/>
## Install

```sh
npm install
```

## Kullanım

```sh
npm run dev
```


👤 **Emin**

* Github: [@emintatli](https://github.com/emintatli)

