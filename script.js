const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
});

const roles = [
    "Software Engineer",
    "Aspiring Product Manager",
    "ML Enthusiast"
];

const roleElement = document.getElementById("changing-role");

let currentRole = 0;

setInterval(() => {

    roleElement.classList.add("role-enter");

    setTimeout(() => {

        currentRole = (currentRole + 1) % roles.length;

        roleElement.textContent = roles[currentRole];

        roleElement.classList.remove("role-enter");

    }, 300);

}, 2500);

document.querySelectorAll(".project-card, .skill-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 4;
        const rotateX = ((y / rect.height) - 0.5) * -4;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";
    });
});

const resumeSection = document.querySelector(".resume-heading");

const resumeObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            resumeSection.classList.add("animate");

        }
    });

},

{
    threshold:.5
}
);

resumeObserver.observe(resumeSection);