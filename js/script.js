var quizSolve = document.getElementById("quizSolve"),
    quizSolveCheck = document.getElementById(`quizSolveCheck`),
    quizSolveResult = document.getElementById(`quizSolveResult`),
    quizAdd = document.getElementById("quizAdd"),
    quizAddQuestion = document.getElementById(`quizAddQuestion`),
    quizAddAnswer = document.getElementById(`quizAddAnswer`),
    quizAddStart = document.getElementById(`quizAddStart`),
    quizID = 0,
    quizList = [];

quizAdd.addEventListener("submit", (event) => {
    event.preventDefault();

    if(!quizAddQuestion.value) quizAddQuestion.style.border = "1px solid #e92a2a";
    if(!quizAddAnswer.value) quizAddAnswer.style.border = "1px solid #e92a2a";
    if(!quizAddQuestion.value || !quizAddAnswer.value) return;

    quizList.push({
        "question": quizAddQuestion.value,
        "answer": quizAddAnswer.value
    });

    var span = document.createElement(`span`),
        input = document.createElement(`input`),
        button = document.createElement(`button`),
        div = document.createElement(`div`);

    span.innerHTML = `"${quizAddQuestion.value}"`;
    input.id = quizAddQuestion.value;
    input.placeholder = `OdpowiedŸ...`;
    input.autocomplete = `off`;
    button.id = quizID;
    button.innerHTML = `<i class="fa-solid fa-eye"></i>`;

    div.appendChild(span);
    div.appendChild(input);
    div.appendChild(button);
    quizSolve.appendChild(div);

    var sraka = document.getElementById(button.id);
    var placeholder = ``;

    $(sraka).mouseenter(() => {
        placeholder = input.placeholder;

        for(var i = 0; i < quizList.length; i++) {
            if(sraka.id == i) input.placeholder = quizList[i].answer[0] + quizList[i].answer.slice(1).replace(/.(?!$)/g, `*`);
        }
    }).mouseleave(() => {
        input.placeholder = placeholder;
    });

    quizAddQuestion.focus();
    if(quizAddQuestion.style.border != "1px solid #682ae9") quizAddQuestion.style.border = "1px solid #682ae9";
    quizAddQuestion.value = ``;
    if(quizAddAnswer.style.border != "1px solid #682ae9") quizAddAnswer.style.border = "1px solid #682ae9";
    quizAddAnswer.value = ``;

    quizID++;

    if(quizList.length != 0) {
        quizSolve.style.display = `flex`;
        quizAddStart.style.display = `block`;
    }
});

function startQuiz() {
    quizSolveCheck.style.display = `block`;
    quizAdd.style.display = `none`;
    quizAddStart.style.display = `none`;
}

function checkAnswers() {
    var quizPoints = 0;

    quizList.forEach(quiz => {
        var input = document.getElementById(quiz.question);

        if(quiz.answer != input.value) input.style.border = "1px solid #e92a2a";
        else {
            input.style.border = "1px solid #5ae92a";

            quizPoints++;
        }
    });

    quizSolveCheck.style.display = `none`;
    quizSolveResult.style.display = `block`;
    quizSolveResult.innerHTML = `Wynik: ${quizPoints}/${quizList.length} punktów`;
}