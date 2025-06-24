const questions = [
    {
      q: "What is the capital of France?",
      options: ["Berlin", "Paris", "London", "Madrid"],
      answer: "Paris"
    },
    {
      q: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      q: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      q: "What is the largest ocean?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: "Pacific"
    },
    {
      q: "Who wrote 'Romeo and Juliet'?",
      options: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"],
      answer: "Shakespeare"
    }
  ];
  
  let current = 0;
  let player = 1;
  let score1 = 0;
  let score2 = 0;
  
  function startGame() {
    current = 0;
    player = 1;
    score1 = 0;
    score2 = 0;
    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
    document.getElementById("result").textContent = "";
    document.getElementById("turn").textContent = "Player 1's Turn";
    loadQuestion();
  }
  
  function loadQuestion() {
    if (current >= questions.length) {
      showResult();
      return;
    }
  
    const q = questions[current];
    document.getElementById("question").textContent = q.q;
  
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
  
    // Shuffle options
    const shuffled = [...q.options].sort(() => 0.5 - Math.random());
  
    shuffled.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(option);
      optionsDiv.appendChild(btn);
    });
  }
  
  function checkAnswer(selected) {
    const correct = questions[current].answer;
    if (selected === correct) {
      if (player === 1) score1++;
      else score2++;
    }
  
    // Update score
    document.getElementById("score1").textContent = score1;
    document.getElementById("score2").textContent = score2;
  
    // Switch player
    player = player === 1 ? 2 : 1;
    document.getElementById("turn").textContent = `Player ${player}'s Turn`;
  
    current++;
    setTimeout(loadQuestion, 500);
  }
  
  function showResult() {
    const result = document.getElementById("result");
    if (score1 > score2) result.textContent = "🎉 Player 1 Wins!";
    else if (score2 > score1) result.textContent = "🎉 Player 2 Wins!";
    else result.textContent = "🤝 It's a Draw!";
  }
  function showResult() {
    const result = document.getElementById("result");
  
    if (score1 > score2) result.textContent = "🎉 Player 1 Wins!";
    else if (score2 > score1) result.textContent = "🎉 Player 2 Wins!";
    else result.textContent = "🤝 It's a Draw!";
  
    // ⏱️ Auto-restart after 3 seconds
    setTimeout(() => {
      result.textContent += " 🔁 Restarting...";
      setTimeout(startGame, 2000);
    }, 3000);
  }
  
  window.onload = startGame;
  