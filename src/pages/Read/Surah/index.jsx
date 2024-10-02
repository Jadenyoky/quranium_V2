import React, { useState, useEffect } from "react";

const App = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");

  // نص سورة الفاتحة مقسم إلى كلمات
  const surahFatiha = [
    "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "الرَّحْمَنِ الرَّحِيمِ",
    "مَالِكِ يَوْمِ الدِّينِ",
    "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
  ];

  useEffect(() => {
    if (isListening) {
      startRecognition();
    }
  }, [isListening]);

  const startRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "ar-SA";
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const speechToText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(speechToText);
      matchWords(speechToText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopRecognition = () => {
    setIsListening(false);
  };

  const matchWords = (spokenText) => {
    let matchingWords = "";

    surahFatiha.forEach((verse) => {
      let words = verse.split(" ");
      words.forEach((word) => {
        if (spokenText.includes(word)) {
          matchingWords += `<span style="color: green;">${word}</span> `;
        } else {
          matchingWords += `<span style="color: red;">${word}</span> `;
        }
      });
      matchingWords += "<br />";
    });

    setHighlightedText(matchingWords);
  };

  const handleStartListening = () => {
    setIsListening(true);
  };

  const handleStopListening = () => {
    stopRecognition();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>تحليل تلاوة سورة الفاتحة</h1>
      <button onClick={handleStartListening} disabled={isListening}>
        بدء التسجيل
      </button>
      <button onClick={handleStopListening} disabled={!isListening}>
        إيقاف التسجيل
      </button>
      <h2>النص المكتوب:</h2>
      <p>{transcript}</p>
      <h2>الكلمات المتطابقة:</h2>
      <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
    </div>
  );
};

export default App;
