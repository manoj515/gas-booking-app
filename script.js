
const form = document.getElementById("bookingForm");

let bookings = JSON.parse(
    localStorage.getItem("gasBookings") || "[]"
);

function displayBookings() {
    const list = document.getElementById("bookingList");

    list.innerHTML = "";

    bookings.forEach(booking => {
        const row = document.createElement("tr");

        [
            booking.id,
            booking.name,
            booking.provider,
            booking.cylinder,
            booking.status
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        list.appendChild(row);
    });

    document.getElementById("total").textContent =
        bookings.length;

    document.getElementById("pending").textContent =
        bookings.filter(b => b.status === "Pending").length;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const booking = {
        id: "GAS" + Date.now(),
        name: document.getElementById("name").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        address: document.getElementById("address").value.trim(),
        provider: document.getElementById("provider").value,
        cylinder: document.getElementById("cylinder").value,
        status: "Pending"
    };

    bookings.push(booking);

    localStorage.setItem(
        "gasBookings",
        JSON.stringify(bookings)
    );

    document.getElementById("message").textContent =
        "Booking submitted successfully! Booking ID: " + booking.id;

    form.reset();

    displayBookings();
});

displayBookings();
