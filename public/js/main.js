/**
 * clock and datetime
 */

function dateTimeElement() {
  const dateElements = document.getElementsByClassName("ss_date");
  const currentDate = new Date();

  // clock
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let amOrPm = "";

  // date
  function getMonthName(monthIndex) {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    return monthNames[monthIndex];
  }

  let days = currentDate.getDay();
  let monthIndex = currentDate.getMonth();
  let months = getMonthName(monthIndex);
  let date = currentDate.getDate();
  let years = currentDate.getFullYear();
  let weekdays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  // Format tanggal
  const formattedDate = `<span>${weekdays[days]}, ${date} ${months} ${years}</span>`;

  // Memperbarui elemen tanggal
  for (let i = 0; i < dateElements.length; i++) {
    let dateElement = dateElements[i];
    dateElement.innerHTML = formattedDate;
  }
}

// Memanggil fungsi dateTimeElement saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", dateTimeElement);

setInterval(dateTimeElement, 1000);

function clockAnalog() {
  const deg = 6;
  const hr = document.querySelector("#ss_hr");
  const mn = document.querySelector("#ss_mn");
  const sc = document.querySelector("#ss_sc");

  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * deg;
  let ss = day.getSeconds() * deg;

  hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  mn.style.transform = `rotateZ(${mm}deg)`;
  sc.style.transform = `rotateZ(${ss}deg)`;
}
setInterval(clockAnalog, 1000);

/**
 *
 * Icon Animation
 *
 */

/**
 *
 * Accordion
 *
 */
function accordion() {
  // Ambil semua elemen accordion
  const accordionItems = document.querySelectorAll(".ss_accordion_item");

  // Tambahkan event listener untuk setiap item accordion
  accordionItems.forEach((item) => {
    const accordionLabel = item.querySelector(".ss_accordion_label");

    accordionLabel.addEventListener("click", () => {
      // Cek apakah item sedang aktif
      const isActive = item.classList.contains("ss_active");

      // Jika item tidak aktif, tutup semua item dan buka item yang saat ini diklik
      if (!isActive) {
        accordionItems.forEach((accItem) => {
          accItem.classList.remove("ss_active");
        });
        item.classList.add("ss_active");
      }
    });
  });
}

accordion();

/**
 * =========================================================
 * ==========================POPUP==========================
 * =========================================================
 */

function openPopupFunc() {
  const popup = document.getElementById("ss_popup");
  if (!popup.classList.contains("ss_active")) {
    popup.classList.add("ss_active");
  }
  const form = document.getElementById("ss_contact_group");
  form.removeEventListener("submit", submitForm); // Hapus event listener setelah pengiriman berhasil
}

function closePopupFunc() {
  const popup = document.getElementById("ss_popup");
  if (popup.classList.contains("ss_active")) {
    popup.classList.remove("ss_active");
  }
}

function submitForm() {
  // Di sini Anda bisa menangani logika pengiriman formulir, misalnya mengirim data ke server
  // Jika pengiriman formulir berhasil, panggil fungsi openPopupFunc()
  // Anda dapat menambahkan logika Anda untuk menangani pengiriman formulir dan menampilkan popup sesuai kebutuhan
  openPopupFunc(); // Untuk tujuan demonstrasi, kami langsung memanggil fungsi tampilan popup di sini
  return false; // Mencegah perilaku default pengiriman formulir
}

/**
 * Animation on scroll or on loading
 */

class IntersectionObserverHandler {
  constructor() {
    // Membuat instance IntersectionObserver dengan menghubungkannya ke metode handleIntersection di kelas ini
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this));
  }

  observeElement(element) {
    // Memulai pengamatan terhadap elemen
    this.observer.observe(element);
  }

  unobserveElement(element) {
    // Menghentikan pengamatan terhadap elemen
    this.observer.unobserve(element);
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      // Menampilkan entri di konsol
      console.log(entry);
      if (entry.isIntersecting) {
        // Jika entri berinteraksi, tambahkan kelas CSS 'show' ke elemen target
        entry.target.classList.add("show");
        // Hentikan pengamatan terhadap elemen target
        this.unobserveElement(entry.target);
      } else {
        // Jika entri tidak berinteraksi, hapus kelas CSS 'show' dari elemen target
        entry.target.classList.remove("show");
      }
    });
  }
}

const observerHandler = new IntersectionObserverHandler();
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observerHandler.observeElement(element));

/**
 * Contact
 */

document.addEventListener("DOMContentLoaded", function () {
  const actionInfo = document.querySelector("#actionInfo");
  const contactInfo = document.getElementById("contactInfo");

  actionInfo.addEventListener("click", function (event) {
    event.stopPropagation(); // Mencegah event bubbling

    if (!contactInfo.classList.contains("ss_active")) {
      contactInfo.classList.add("ss_active");
    } else {
      contactInfo.classList.remove("ss_active");
    }
  });

  window.addEventListener("click", function (event) {
    if (!event.target.closest(".ss_contact_form") && event.target !== actionInfo) {
      contactInfo.classList.remove("ss_active");
    }
  });
});
