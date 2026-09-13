const button = document.getElementById("icon-button");
const iconContainer = document.getElementById("icon-container");

const icon01 = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
         class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/>
        <path fill-rule="evenodd"
              d="M5.854 11.354a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708l2.5-2.5a.5.5 0 1 1 .708.708L4.207 8H10.5a.5.5 0 0 1 0 1H4.207l1.647 1.646a.5.5 0 0 1 0 .708"/>
    </svg>
`;

const icon02 = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
         class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L2.5 7.5a.5.5 0 0 0 0 .708l2.146 2.146a.5.5 0 0 0 .708-.708L4.207 8.5H10.5a.5.5 0 0 0 0-1H4.207l1.147-1.146a.5.5 0 0 0 0-.708"/>
    </svg>
`;

let isFilled = false;

iconContainer.innerHTML = icon01;

button.addEventListener("click", () => {
    isFilled = !isFilled;
    iconContainer.innerHTML = isFilled ? icon02 : icon01;
});
