document.addEventListener("DOMContentLoaded", () => {
    const guestForm = document.getElementById("guestForm");
    const entriesList = document.getElementById("entriesList");

    function addEntryToList(name, email, rating, suggestions) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>ชื่อ:</strong> ${name}<br>
            <strong>อีเมล:</strong> ${email}<br>
            <strong>ความพึงพอใจ:</strong> ${rating}<br>
            <strong>ความคิดเห็น:</strong> ${suggestions}<br>
        `;
        entriesList.appendChild(listItem);
    }


    function loadEntries() {
        const storedEntries = JSON.parse(localStorage.getItem("guestEntries")) || [];
        storedEntries.forEach(entry => {
            addEntryToList(entry.name, entry.email, entry.rating, entry.suggestions);
        });
    }

   
    function saveEntry(name, email, rating, suggestions) {
        const storedEntries = JSON.parse(localStorage.getItem("guestEntries")) || [];
        storedEntries.push({ name, email, rating, suggestions });
        localStorage.setItem("guestEntries", JSON.stringify(storedEntries));
    }

    // โหลดคอมเมนต์เมื่อเปิดหน้า
    loadEntries();


    guestForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const formData = new FormData(guestForm);

        const name = formData.get("name");
        const email = formData.get("email");
        const rating = formData.get("rating");
        const suggestions = formData.get("suggestions");

    
        addEntryToList(name, email, rating, suggestions);
        saveEntry(name, email, rating, suggestions);

        guestForm.reset();
    });
});
