class Controls {
  constructor(type) {
    this.forward = false;
    this.right = false;
    this.left = false;
    this.reverse = false;

    switch(type) {
        case "KEYS":
          this.#addArrowListeners();
          break;
        case "DUMMY":
          this.forward = true;
    }
  }

  #addArrowListeners() {
    document.getElementById("upButton").addEventListener("click", () => {
      this.forward = true;
      this.reverse = false;
    });

    document.getElementById("downButton").addEventListener("click", () => {
      this.forward = false;
      this.reverse = true;
    });

    document.getElementById("leftButton").addEventListener("click", () => {
      this.left = true;
      this.right = false;
    });


document.getElementById("stopButton").addEventListener("click", () => {
  this.forward = false;
  this.reverse = false;
  this.left = false;
  this.right = false;
});   


document.getElementById("rightButton").addEventListener("click", () => {
      this.left = false;
      this.right = true;
    });
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
      }
      console.table(this);
    });
    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
      }
      console.table(this);

    });
  }
}