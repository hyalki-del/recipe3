function collectProfileData() {
    return {
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        height: parseFloat(document.getElementById('height').value),
        weight: parseFloat(document.getElementById('weight').value),
        activity: parseFloat(document.getElementById('activity').value),
        goal: document.getElementById('goal').value
    };
}

function getBmiStatus(bmi) {
    if (bmi < 18.5) return "Zayıf";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal Kilolu";
    if (bmi >= 25 && bmi < 29.9) return "Fazla Kilolu";
    return "Obez";
}
