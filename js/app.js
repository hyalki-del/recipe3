document.getElementById('generate-btn').addEventListener('click', () => {
    try {
        const profile = collectProfileData();
        const goals = getNutritionGoals(profile);

        // Özet kartını doldur
        document.getElementById('target-calories').textContent = goals.targetCalories;
        document.getElementById('bmi-value').textContent = goals.bmi;
        document.getElementById('bmi-status').textContent = getBmiStatus(goals.bmi);

        // Günlük planı oluştur
        const dailyPlan = generateDailyPlan(goals.targetCalories);
        renderMeals(dailyPlan);

        // Sonuç bölümünü göster
        document.getElementById('plan-section').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
});

function renderMeals(plan) {
    const container = document.getElementById('meals-container');
    container.innerHTML = '';

    const mealTypes = [
        { key: 'breakfast', title: 'Kahvaltı' },
        { key: 'lunch', title: 'Öğle Yemeği' },
        { key: 'dinner', title: 'Akşam Yemeği' }
    ];

    mealTypes.forEach(m => {
        const recipe = plan[m.key];
        if (!recipe) return;

        const card = document.createElement('div');
        card.className = 'meal-card';
        card.id = `meal-${m.key}`;
        card.innerHTML = `
            <h3>${m.title}: ${recipe.name} (${recipe.calories} kcal)</h3>
            <p><strong>Malzemeler:</strong> ${recipe.ingredients}</p>
            <button class="substitute-btn" onclick="handleSubstitution('${m.key}', '${recipe.id}', '${recipe.category}')">Değiştir</button>
        `;
        container.appendChild(card);
    });
}

function handleSubstitution(mealKey, currentId, category) {
    const newRecipe = substituteRecipe(currentId, category);
    if (!newRecipe) return;

    // Plan objesini veya DOM'u güncelleyebiliriz; basitçe kart içeriğini güncelleyelim:
    const card = document.getElementById(`meal-${mealKey}`);
    card.innerHTML = `
        <h3>${card.querySelector('h3').textContent.split(':')[0]}: ${newRecipe.name} (${newRecipe.calories} kcal)</h3>
        <p><strong>Malzemeler:</strong> ${newRecipe.ingredients}</p>
        <button class="substitute-btn" onclick="handleSubstitution('${mealKey}', '${newRecipe.id}', '${newRecipe.category}')">Değiştir</button>
    `;
}
