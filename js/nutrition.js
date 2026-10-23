// Mifflin-St Jeor Denklemi ile BMR (Basal Metabolic Rate) Hesaplama
function calculateBMR(weight, height, age, gender) {
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }
    return bmr;
}

function calculateBMI(weight, heightM) {
    return weight / (heightM * heightM);
}

function getNutritionGoals(profile) {
    // Klinik Güvenlik Kapısı: 18 yaş altı kontrolü
    if (profile.age < 18) {
        throw new Error("18 yaş altı kullanıcılar için standart kilo verme planı oluşturulamaz.");
    }

    const heightM = profile.height / 100;
    const bmi = calculateBMI(profile.weight, heightM);
    const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
    const tdee = bmr * parseFloat(profile.activity);

    let targetCalories = tdee;
    if (profile.goal === 'lose') {
        targetCalories = tdee - 500;
        // Güvenlik sınırı: Çok düşük kalori koruması (Erkek min 1500, Kadın min 1200)
        const minLimit = profile.gender === 'male' ? 1500 : 1200;
        if (targetCalories < minLimit) {
            targetCalories = minLimit; 
        }
    } else if (profile.goal === 'gain') {
        targetCalories = tdee + 500;
    }

    return {
        bmi: bmi.toFixed(1),
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetCalories: Math.round(targetCalories)
    };
}
