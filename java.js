var avatars = [
    { name: "Neuralis the Navigator", description: "Yapay zeka sinir ağlarından ilham alan bir keşif uzmanı.", icon: "🤖" },
    { name: "Quantara the Quantum Sorcerer", description: "Kuantum hesaplamadan ilham almış bir büyücü.", icon: "🔮" },
    { name: "Circuita the Cyber Warrior", description: "Siber dünyadan gelen bir savaşçı.", icon: "⚔️" },
    { name: "Logicron the Strategist", description: "Mantık ve algoritmaların ustası bir stratejist.", icon: "🧠" },
    { name: "Pixelia the Illusionist", description: "Dijital dünyadan gelen bir illüzyonist.", icon: "🎨" },
    { name: "Algorithmos the Tactician", description: "Algoritmaların efendisi bir taktik ustası.", icon: "🔢" },
    { name: "Byteena the Data Mage", description: "Verilerin gücünü kullanarak büyüler yapan bir büyücü.", icon: "📊" },
    { name: "Synthara the Synthesizer", description: "Yapay zekanın yaratıcı yönünü temsil eden bir sentezci.", icon: "🎹" },
    { name: "Cognitus the Sage", description: "Bilgelik ve bilgi işlem uzmanı bir bilge.", icon: "📚" },
    { name: "Optima the Efficiency Master", description: "Optimizasyon ve verimlilik ustası.", icon: "⚙️" }
];

var currentAvatarIndex = 0;
var userPoints = 0;
var userBadges = 0;
var gamesCompleted = 0;
var selectedAvatar = null;
var avatarContainer = document.getElementById("avatar-container");

function showAvatars() {
    avatarContainer.innerHTML = "";
    avatars.forEach(function (avatar, index) {
        var avatarElement = document.createElement("div");
        avatarElement.classList.add("avatar");
        if (index === currentAvatarIndex) {
            avatarElement.classList.add("selected");
        }
        avatarElement.onclick = function () {
            selectAvatar(index);
        };
        var avatarIcon = document.createElement("div");
        avatarIcon.style.fontSize = "50px";
        avatarIcon.innerHTML = avatar.icon;
        var avatarInfo = document.createElement("div");
        avatarInfo.classList.add("avatar-info");
        avatarInfo.innerHTML = "<p>" + avatar.name + "</p><p>" + avatar.description + "</p>";
        avatarElement.appendChild(avatarIcon);
        avatarElement.appendChild(avatarInfo);
        avatarContainer.appendChild(avatarElement);
    });
}

function nextAvatar() {
    currentAvatarIndex++;
    if (currentAvatarIndex >= avatars.length) {
        currentAvatarIndex = 0;
    }
    showAvatars();
    playClickSound();
}

function previousAvatar() {
    currentAvatarIndex--;
    if (currentAvatarIndex < 0) {
        currentAvatarIndex = avatars.length - 1;
    }
    showAvatars();
    playClickSound();
}

function selectAvatar(index) {
    currentAvatarIndex = index;
    selectedAvatar = avatars[index];
    showAvatars();
    playClickSound();
    playMagicSound(getFrequency(avatars[index].name));
}

function startAdventure() {
    if (selectedAvatar) {
        document.getElementById("avatar-selection").classList.add('d-none');
        document.getElementById("main-header").classList.remove('d-none');
        document.getElementById("main-content").classList.remove('d-none');
        document.getElementById("main-title").innerText = selectedAvatar.name;
        document.getElementById("subtitle").innerText = selectedAvatar.description;
        animateStart();
        window.scrollTo(0, 0);  // Sayfanın en üstüne kaydır
    }
}

function animateStart() {
    const header = document.getElementById("main-header");
    header.classList.add("animate__animated", "animate__fadeIn");
    setTimeout(() => {
        header.classList.remove("animate__animated", "animate__fadeIn");
    }, 1000);
}

function playClickSound() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

function playMagicSound(frequency) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 2, audioCtx.currentTime + 0.5);
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
}

function getFrequency(avatarName) {
    var totalAsciiValue = 0;
    for (var i = 0; i < avatarName.length; i++) {
        totalAsciiValue += avatarName.charCodeAt(i);
    }
    var minFrequency = 200; 
    var maxFrequency = 1000; 
    var frequencyRange = maxFrequency - minFrequency;
    var frequency = (totalAsciiValue % frequencyRange) + minFrequency;
    return frequency;
}

function updateUserStats(points, badges) {
    userPoints += points;
    userBadges += badges;
    document.getElementById("user-points").innerText = userPoints;
    document.getElementById("user-badges").innerText = userBadges;
    gamesCompleted++;
    if (gamesCompleted % 3 === 0) {
        userBadges++;
        showBadgeNotification();
    }
    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = (gamesCompleted / 10) * 100;
    progressBar.style.width = progress + "%";
    progressBar.innerText = Math.round(progress) + "%";
}

function showBadgeNotification() {
    const notification = document.getElementById("notification");
    notification.innerHTML = '<div class="icon mb-4"><i class="fas fa-medal text-primary"></i></div><p>Tebrikler! Yeni bir rozet kazandınız!</p>';
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

function playNumberGame() {
    const numbers = [3, 5, 7, 2, 8];
    const maxNumber = Math.max(...numbers);
    document.getElementById("numberGameResult").innerText = "En büyük sayı: " + maxNumber;
    updateUserStats(10, 0); 
    highlightPythonCode('numberGameResult');
}

function playGuessGame() {
    const guessInput = document.getElementById("guessInput").value;
    let result = "";
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (!guessInput) {
        result = "Lütfen bir sayı giriniz.";
    } else if (guessInput < randomNumber) {
        result = "Daha büyük bir sayı tahmin et.";
    } else if (guessInput > randomNumber) {
        result = "Daha küçük bir sayı tahmin et.";
    } else {
        result = "Tebrikler, doğru tahmin ettin!";
        updateUserStats(20, 1); 
    }
    document.getElementById("guessGameResult").innerText = result;
    highlightPythonCode('guessGameResult');
}

function playCharacterGame() {
    const characterInput = document.getElementById("characterInput").value;
    const characters = ["Mickey Mouse", "SpongeBob", "Tom", "Jerry", "Bugs Bunny"];
    const selectedCharacter = characters[Math.floor(Math.random() * characters.length)];
    let result = "";
    if (!characterInput) {
        result = "Lütfen bir karakter giriniz.";
    } else if (characterInput !== selectedCharacter) {
        result = "Yanlış tahmin, tekrar dene.";
    } else {
        result = "Tebrikler, doğru tahmin ettin!";
        updateUserStats(15, 1); 
    }
    document.getElementById("characterGameResult").innerText = result;
    highlightPythonCode('characterGameResult');
}

function playStoryGame() {
    const names = ["Ali", "Ayşe", "Mehmet", "Elif"];
    const places = ["parkta", "okulda", "evde", "bahçede"];
    const actions = ["koşuyor", "zıplıyor", "yemek yiyor", "kitap okuyor"];
    const name = names[Math.floor(Math.random() * names.length)];
    const place = places[Math.floor(Math.random() * places.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const story = `${name} ${place} ${action}.`;
    document.getElementById("storyGameResult").innerText = story;
    updateUserStats(10, 0); 
    highlightPythonCode('storyGameResult');
}

function generatePassword() {
    const passwordLength = 12;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById("passwordResult").innerText = "Oluşturulan şifre: " + password;
    updateUserStats(10, 0); 
    highlightPythonCode('passwordResult');
}

function classifyText() {
    const text = document.getElementById("textInput").value;
    const animationDiv = document.getElementById("animation");
    animationDiv.classList.remove("d-none");

    setTimeout(() => {
        const result = textClassification(text);
        document.getElementById("textClassificationResult").innerText = "Metin sınıflandırması: " + result;
        animationDiv.classList.add("d-none");
        updateUserStats(20, 1); 
        highlightPythonCode('textClassificationResult');
    }, 3000);
}

function textClassification(text) {
    const analysis = new TextBlob(text);
    if (analysis.sentiment.polarity > 0) {
        return "Pozitif";
    } else if (analysis.sentiment.polarity < 0) {
        return "Negatif";
    } else {
        return "Nötr";
    }
}

function simulateLogicGates() {
    const a = parseInt(document.getElementById("logicInputA").value);
    const b = parseInt(document.getElementById("logicInputB").value);
    if (isNaN(a) || isNaN(b) || (a !== 0 && a !== 1) || (b !== 0 && b !== 1)) {
        document.getElementById("logicGateResult").innerText = "Lütfen 0 veya 1 değeri giriniz.";
        return;
    }
    const andResult = a & b;
    const orResult = a | b;
    const notResult = ~a & 1;
    document.getElementById("logicGateResult").innerText = `AND: ${andResult}, OR: ${orResult}, NOT: ${notResult}`;
    updateUserStats(15, 0); 
    highlightPythonCode('logicGateResult');
}

function playClassificationGame() {
    const animationDiv = document.getElementById("classificationAnimation");
    animationDiv.classList.remove("d-none");

    setTimeout(() => {
        const result = classificationSimulation();
        document.getElementById("classificationGameResult").innerText = "Sınıflandırma doğruluğu: " + result;
        animationDiv.classList.add("d-none");
        updateUserStats(30, 1); 
        highlightPythonCode('classificationGameResult');
    }, 3000);
}

function classificationSimulation() {
    return "0.95"; 
}

function changeLanguage(lang) {
    const elements = {
        "tr": {
            "navbar-title": "Yapay Zeka Oyunlaştırma Platformu",
            "avatar-select-title": "Avatarını Seç",
            "start-adventure-button": "Başla! Yapay Zekayı Oyunlaştır!",
            "main-title": "Yapay Zeka Oyunlaştırma Platformu",
            "subtitle": "AI Gamification Platform",
            "game1-title": "En Büyük Sayıyı Bulma Oyunu",
            "game1-description": "Bu oyunda rastgele verilen sayılar arasından en büyüğünü bulmaya çalışacaksınız.",
            "game2-title": "Sayı Tahmin Oyunu",
            "game2-description": "1 ile 100 arasında bir sayı tahmin edin ve yapay zekanın doğru tahmini yapmasını sağlayın.",
            "game3-title": "Çizgi Film Karakteri Tahmini Oyunu",
            "game3-description": "Bir çizgi film karakteri tahmin edin ve yapay zekanın doğru tahmini yapmasını sağlayın.",
            "game4-title": "Rastgele Hikaye Oluşturma",
            "game4-description": "Rastgele karakterler ve olaylarla bir hikaye oluşturun.",
            "game5-title": "Şifre Oluşturucu",
            "game5-description": "Güçlü bir şifre oluşturun ve güvenliğinizi artırın.",
            "game6-title": "Bubble Sort Görselleştirme Oyunu",
            "game6-description": "Bu oyunda, bir dizi sayının bubble sort algoritması ile sıralanmasını izleyin. Bubble sort, en basit sıralama algoritmalarından biridir ve her adımda komşu elemanları karşılaştırarak sıralama yapar.",
            "game7-title": "Dik Üçgen Hipotenüs Hesaplama Oyunu",
            "game7-description": "Bu oyunda, bir dik üçgenin iki kenarını girerek hipotenüsü hesaplayın. Dik üçgenin hipotenüsü, diğer iki kenarın karelerinin toplamının kareköküne eşittir.",
            "game8-title": "Doğal Dil İşleme - Metin Sınıflandırma Oyunu",
            "game8-description": "Bu oyunda, kısa bir metin girin ve metnin pozitif veya negatif olduğunu sınıflandırın. Doğal dil işleme (NLP) algoritmaları kullanılarak metnin duygu analizi yapılır.",
            "game9-title": "Mantık Kapıları Simülasyonu",
            "game9-description": "Bu oyunda, temel mantık kapılarını (AND, OR, NOT) kullanarak bir mantık devresi tasarlayın ve sonuçlarını izleyin. Mantık kapıları, dijital devrelerin temel bileşenleridir ve iki veya daha fazla giriş sinyalini belirli kurallara göre işler.",
            "game10-title": "Veri Kümesi Sınıflandırma Oyunu",
            "game10-description": "Bu oyunda, veri kümesindeki örnekleri sınıflandırmak için k-en yakın komşu algoritmasını (k-NN) kullanın. k-NN algoritması, her veri noktasını en yakın komşularına göre sınıflandırır.",
            "badges-title": "Rozetler",
            "black-white-badge-title": "Siyah Beyaz Rozeti",
            "champion-badge-title": "Şampiyon Rozeti",
            "besiktas-badge-title": "Beşiktaş Rozeti"
        },
        "en": {
            "navbar-title": "AI Gamification Platform",
            "avatar-select-title": "Select Your Avatar",
            "start-adventure-button": "Start! Gamify AI!",
            "main-title": "AI Gamification Platform",
            "subtitle": "Yapay Zeka Oyunlaştırma Platformu",
            "game1-title": "Find the Largest Number Game",
            "game1-description": "In this game, you will try to find the largest number among randomly given numbers.",
            "game2-title": "Number Guessing Game",
            "game2-description": "Guess a number between 1 and 100 and see if the AI can guess it correctly.",
            "game3-title": "Cartoon Character Guessing Game",
            "game3-description": "Guess a cartoon character and see if the AI can guess it correctly.",
            "game4-title": "Random Story Generator",
            "game4-description": "Create a story with random characters and events.",
            "game5-title": "Password Generator",
            "game5-description": "Create a strong password to enhance your security.",
            "game6-title": "Bubble Sort Visualization Game",
            "game6-description": "In this game, watch a series of numbers being sorted using the bubble sort algorithm. Bubble sort is one of the simplest sorting algorithms and sorts by comparing adjacent elements at each step.",
            "game7-title": "Right Triangle Hypotenuse Calculation Game",
            "game7-description": "In this game, enter the two sides of a right triangle to calculate the hypotenuse. The hypotenuse of a right triangle is equal to the square root of the sum of the squares of the other two sides.",
            "game8-title": "Natural Language Processing - Text Classification Game",
            "game8-description": "In this game, enter a short text and classify it as positive or negative. Sentiment analysis is performed using natural language processing (NLP) algorithms.",
            "game9-title": "Logic Gates Simulation",
            "game9-description": "In this game, design a logic circuit using basic logic gates (AND, OR, NOT) and observe the results. Logic gates are the fundamental components of digital circuits and process two or more input signals according to specific rules.",
            "game10-title": "Dataset Classification Game",
            "game10-description": "In this game, classify the samples in the dataset using the k-nearest neighbors (k-NN) algorithm. The k-NN algorithm classifies each data point based on its nearest neighbors.",
            "badges-title": "Badges",
            "black-white-badge-title": "Black and White Badge",
            "champion-badge-title": "Champion Badge",
            "besiktas-badge-title": "Beşiktaş Badge"
        }
    };

    const selectedLanguage = elements[lang];
    for (const [key, value] of Object.entries(selectedLanguage)) {
        const element = document.getElementById(key);
        if (element) {
            element.innerHTML = value;
        }
    }
}

function highlightPythonCode(id) {
    const element = document.getElementById(id).previousElementSibling;
    if (element) {
        element.classList.add('highlight');
    }
    setTimeout(() => {
        if (element) {
            element.classList.remove('highlight');
        }
    }, 2000);
}

window.onload = function () {
    showAvatars();
};


















