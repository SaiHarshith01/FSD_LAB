const gradePoints = {
    S: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5,
    F: 0
};

function generateSubjects() {

    const count = Number(document.getElementById("subjectCount").value);
    const subjects = document.getElementById("subjects");

    subjects.innerHTML = "";

    for (let i = 1; i <= count; i++) {

        subjects.innerHTML += `
            <div>
                Subject ${i}

                <select class="grade">
                    <option value="">Grade</option>
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>

                <input type="number" class="credit" placeholder="Credits">
            </div>
        `;
    }
}

function calculate() {

    const prevCGPA = Number(document.getElementById("prevCGPA").value);
    const prevCredits = Number(document.getElementById("prevCredits").value);

    const grades = document.querySelectorAll(".grade");
    const credits = document.querySelectorAll(".credit");

    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {

        const grade = grades[i].value;
        const credit = Number(credits[i].value);

        totalPoints += gradePoints[grade] * credit;
        totalCredits += credit;
    }

    const sgpa = totalPoints / totalCredits;

    const newCGPA =
        ((prevCGPA * prevCredits) + (sgpa * totalCredits)) /
        (prevCredits + totalCredits);

    document.getElementById("result").innerHTML = `
        <p>SGPA: ${sgpa.toFixed(2)}</p>
        <p>New CGPA: ${newCGPA.toFixed(2)}</p>
    `;
}