var api
var prefix
var href
window.onload = function (){
    var getaddress = localStorage.getItem("address")
    // Set overlay.js to open to chain info page
    localStorage.setItem("opened", "chaininfo.html")

    apiget = localStorage.getItem("apiSet")

    // Set history page to open to explorer according to mainnet or testnet & set ticker according to mainnet or testnet
    if (apiget == "mainnet" || apiget == null) {
        api = "http://20.243.210.93:3031"
        prefix = "RCI"
        href = "http://20.243.210.93:4321/address/" + getaddress
        $("#history").attr("href", href)
    }
    else if (apiget == "testnet"){
        api = "http://20.243.210.93:3031"
        prefix = "tRCI"
        href = "http://20.243.210.93:4321/address/" + getaddress
        $("#history").attr("href", href)
    }

    // Define function to make api request according to certain call
    function apiCall(call) {
        return Promise.resolve($.ajax({
            url: api + call,
            dataType: 'json',
            type: 'GET'
        }))
    }

    function getBlockHeight() {
        apiCall("/info").then(function(data) {
            var height = data.result.blocks
            $("#blockHeight").text(height)
        })
    }

    function getNetHash() {
        apiCall("/info").then(function(data) {
            var gethash = data.result.nethash
            var hash = gethash / 1000000
            $("#netHashrate").text(hash.toFixed(6) + " MH/s")
        })
    }

    function getSupply() {
        apiCall("/supply").then(function(data) {
            var getsupply = data.result.supply
            var supply = getsupply / 100000000
            $("#circSupply").text(supply + " " + prefix)
        })
    }
/*
    function getPrice() {
        apiCall("/price").then(function(data) {
            var usd = data.result.usd
            var btc = Number(data.result.btc).toLocaleString(undefined, {minimumFractionDigits: 8, maximumFractionDigits: 8})
            $("#priceBTC").text(btc)
            $("#priceUSD").text(usd)
        })
    }
*/    
    $(document).ready(function() {
          var url = "https://data-asg.goldprice.org/dbXRates/USD";

    // Mengirim permintaan GET ke API menggunakan jQuery
    $.get(url, function(data) {
          var xauPrice = data.items[0].xauPrice;
          var usdPrice = xauPrice / 31.1034768; // Menghitung nilai USD
          $("#priceUSD").text(usdPrice.toFixed(2));
          $("#priceXAU").text(xauPrice);
         })
    .fail(function() {
    console.log("Gagal mengambil data dari API.");
         });
    });

    $(document).ready(function() {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=XAU';

      $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
          const xauBtcRate = data.bitcoin.xau;
          $('#xauRate').html(xauBtcRate); // Mengupdate elemen dengan ID "xauRate"
        },
        error: function(error) {
          console.log('Error:', error);
        }
      });
    });
 
    // Loop functions to continuously show chain info
    setInterval(function() {
        getBlockHeight()
        getNetHash()
        getSupply()
        getPrice()
    }, 3000)

    setChainInfoLang()
}

var lang = {
    'en': {
        // Page text
        'block-height': "Block Height:",
        'net-hash': "Network Hashrate:",
        'circ-supply': "Circulating Supply:",
        'logoutreminder': {
            'part1': "Remember to",
            'logoutlink': "Logout",
            'part2': "before exiting Chrome",
        },

        // Tab text
        'create-wallet': "Create Wallet",
        'import-wallet': "Import Wallet",
        'your-wallet': "Your Wallet",
        'send': "Send",
        'tx-history': "History",
        'chain-info': "Chain Info",
        'settings': "Settings"
    },
    

    'fr': {
        // Page text
        'block-height': "Bloc Hauteur:",
        'net-hash': "Réseau Taux de Hachage:",
        'circ-supply': "Circulé Réserve:",
        'logoutreminder': {
            'part1': "Se souvenir de",
            'logoutlink': "Se Déconnecter",
            'part2': "avant de sortir Chrome",
        },

        // Tab text
        'create-wallet': "Créer Portefeuille",
        'import-wallet': "Importer Portefeuille",
        'your-wallet': "Votre Portefeuille",
        'send': "Envoyer",
        'tx-history': "L'histoire",
        'chain-info': "Chaîne Données",
        'settings': "Paramètres"        
    },

    'kr': {
        // Page text
        'block-height': "블록 신장:",
        'net-hash': "회로망 해시비율:",
        'circ-supply': "순환 공급품:",
        'logoutreminder': {
            'part1': "기억해",
            'logoutlink': "로그 아웃",
            'part2': "종료하기 전에",
        },

        // Tab text
        'create-wallet': "창조하다 지갑",
        'import-wallet': "수입 지갑",
        'your-wallet': "너의 지갑",
        'send': "보내다",
        'tx-history': "역사",
        'chain-info': "체인 정보",
        'settings': "설정"
    },

    'id': {
        // Page text
        'block-height': "tinggi blok:",
        'net-hash': "Jaringan Tingkat-Hash:",
        'circ-supply': "Beredar Pasokan:",
        'logoutreminder': {
            'part1': "Ingat untuk",
            'logoutlink': "Keluar",
            'part2': "sebelum keluar Chrome",
        },

        // Tab text
        'create-wallet': "Membuat Dompet",
        'import-wallet': "Impor Dompet",
        'your-wallet': "Dompet Anda",
        'send': "Kirim",
        'tx-history': "Riwayat",
        'chain-info': "Data Rantai",
        'settings': "Pengaturan"
    },

    'es': {
        // Page text
        'block-height': "Bloque Altura:",
        'net-hash': "Red Tasa de Hash:",
        'circ-supply': "Circulante Surtido:",
        'logoutreminder': {
            'part1': "Recuerda a",
            'logoutlink': "Cerrar sesión",
            'part2': "antes de irse Chrome",
        },

        // Tab text
        'create-wallet': "Billetera Crear",
        'import-wallet': "Billetera Importar",
        'your-wallet': "Billetera Tu",
        'send': "Enviar",
        'tx-history': "Historia",
        'chain-info': "Informacion Red",
        'settings': "El Ajuste"
    },

    'ru': {
        // Page text
        'block-height': "Высота блока:",
        'net-hash': "Хешрейт:",
        'circ-supply': "Предложение:",
        'logoutreminder': {
            'part1': "Помните в",
            'logoutlink': "Выйти",
            'part2': "перед выходом",
        },
    
        // Tab text
        'create-wallet': "Создать кошелек",
        'import-wallet': "Импортировать кошелек",
        'your-wallet': "Ваш кошелек",
        'send': "Отправить",
        'tx-history': "История",
        'chain-info': "Информация о сети",
        'settings': "Настройки"
    },

    'zh': {
        // Page text
        'block-height': "当前高度:",
        'net-hash': "全网算力:",
        'circ-supply': "流通总量:",
        'logoutreminder': {
            'part1': "记得 至",
            'logoutlink': "登出",
            'part2': "退出前 Chrome",
        },

        // Tab text
        'create-wallet': "创建钱包",
        'import-wallet': "导入钱包",
        'your-wallet': "你的钱包",
        'send': "发送",
        'tx-history': "历史",
        'chain-info': "网络信息",
        'settings': "设置"
    },

    'ja': {
        // Page text
        'block-height': "ブロック 高さ:",
        'net-hash': "通信網 ハッシュレート:",
        'circ-supply': "サプライ:",
        'logoutreminder': {
            'part1': "覚えて に",
            'logoutlink': "ログアウト",
            'part2': "出る前に Chrome",
        },

        // Tab text
        'create-wallet': "作成する 財布",
        'import-wallet': "インポート 財布",
        'your-wallet': "きみの 財布",
        'send': "送る",
        'tx-history': "歴史",
        'chain-info': "通信網 情報",
        'settings': "設定"
    },
}

function setChainInfoLang() {
    if (localStorage['lang'] == null) {
        // Page text
        $("#block-height").text(lang['en']['block-height'])
        $("#net-hash").text(lang['en']['net-hash'])
        $("#circ-supply").text(lang['en']['circ-supply'])
        $("#part1").text(lang['en']['logoutreminder']['part1'])
        $("#logoutlink").text(lang['en']['logoutreminder']['logoutlink'])
        $("#part2").text(lang['en']['logoutreminder']['part2'])

        // Tab text
        $("#create-wallet").text(lang['en']['create-wallet'])
        $("#import-wallet").text(lang['en']['import-wallet'])
        $("#your-wallet").text(lang['en']['your-wallet'])
        $("#send").text(lang['en']['send'])
        $("#tx-history").text(lang['en']['tx-history'])
        $("#chain-info").text(lang['en']['chain-info'])
        $("#settings").text(lang['en']['settings'])
    }
    else {
        // Page text
        $("#block-height").text(lang[localStorage.getItem("lang")]['block-height'])
        $("#net-hash").text(lang[localStorage.getItem("lang")]['net-hash'])
        $("#circ-supply").text(lang[localStorage.getItem("lang")]['circ-supply'])
        $("#part1").text(lang[localStorage.getItem("lang")]['logoutreminder']['part1'])
        $("#logoutlink").text(lang[localStorage.getItem("lang")]['logoutreminder']['logoutlink'])
        $("#part2").text(lang[localStorage.getItem("lang")]['logoutreminder']['part2'])

        // Tab text
        $("#create-wallet").text(lang[localStorage.getItem("lang")]['create-wallet'])
        $("#import-wallet").text(lang[localStorage.getItem("lang")]['import-wallet'])
        $("#your-wallet").text(lang[localStorage.getItem("lang")]['your-wallet'])
        $("#send").text(lang[localStorage.getItem("lang")]['send'])
        $("#tx-history").text(lang[localStorage.getItem("lang")]['tx-history'])
        $("#chain-info").text(lang[localStorage.getItem("lang")]['chain-info'])
        $("#settings").text(lang[localStorage.getItem("lang")]['settings'])
    }
}
