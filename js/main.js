// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

// Reveal on scroll
document.querySelectorAll(".section h2").forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Active nav link on scroll
const navLinks = nav.querySelectorAll("a[href^='#']");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-50% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => sectionObserver.observe(s));

// Contact form — static site, so open the user's mail client.
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent(`${data.get("type")} enquiry from ${data.get("name")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
  window.location.href = `mailto:hello@rawkaki.art?subject=${subject}&body=${body}`;
  document.getElementById("form-note").textContent = "Thanks! Your email app should open to send the message.";
  e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
