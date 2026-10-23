// Örnek Tarif Veri Tabanı (Gerçek uygulamada recipes.json dosyasından yüklenecek)
const sampleRecipes = [
    { id: "R1", name: "Menemen", category: "Kahvaltı", calories: 350, ingredients: "Yumurta, domates, biber, zeytinyağı" },
    { id: "R2", name: "Yulaf Lapası", category: "Kahvaltı", calories: 300, ingredients: "Yulaf, süt, muz, tarçın" },
    { id: "R3", name: "Mercimek Çorbası", category: "Öğle", calories: 200, ingredients: "Kırmızı mercimek, soğan, un, zeytinyağı" },
    { id: "R4", name: "Izgara Tavuk Salatası", category: "Öğle", calories: 450, ingredients: "Tavuk göğsü, marul, domates, zeytinyağı" },
    { id: "R5", name: "Fırında Somon ve Sebze", category: "Akşam", calories: 600, ingredients: "Somon, patates, brokoli, zeytinyağı" },
    { id: "R6", name: "Zeytinyağlı Fasulye", category: "Akşam", categories: "Akşam", calories: 400, ingredients: "Taze fasulye, domates, soğan, zeytinyağı" }
];

function generateDailyPlan(targetCalories) {
    // Öğün rolleri (Kahvaltı %25, Öğle %35, Akşam %40 varsayılan dağılım)
    const breakfastTarget = targetCalories * 0.25;
    const lunchTarget = targetCalories * 0.35;
    const dinnerTarget = targetCalories * 0.40;

    // Kategoriye göre filtrele ve hedefe en yakın olanı seç
    const breakfast = findBestRecipe(sampleRecipes, "Kahvaltı", breakfastTarget);
    const lunch = findBestRecipe(sampleRecipes, "Öğle", lunchTarget);
    const dinner = findBestRecipe(sampleRecipes, "Akşam", dinnerTarget);

    return { breakfast, lunch, dinner };
}

function findBestRecipe(recipes, category, targetCal) {
    const filtered = recipes.filter(r => r.category === category);
    if (filtered.length === 0) return null;
    
    // Kalori farkına göre sırala ve en yakın olanı seç
    filtered.sort((a, b) => Math.abs(a.calories - targetCal) - Math.abs(b.calories - targetCal));
    return filtered[0];
}

function substituteRecipe(currentRecipeId, category) {
    const current = sampleRecipes.find(r => r.id === currentRecipeId);
    const alternatives = sampleRecipes.filter(r => r.category === category && r.id !== currentRecipeId);
    
    if (alternatives.length === 0) {
        alert("Bu öğüne uygun başka alternatif bulunamadı.");
        return null;
    }
    // Rastgele veya kaloriye en yakın alternatifi döndür
    return alternatives[0];
}
