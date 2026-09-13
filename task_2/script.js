const screenButton = document.getElementById("screen-button");

screenButton.addEventListener("click", () => {
    alert(`Ширина экрана: ${screen.width}px\nВысота экрана: ${screen.height}px`);
});
