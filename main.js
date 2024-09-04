const parallels = document.getElementById("parallels");
const canvas = document.getElementById("canvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const traffic = generateTraffic();
let numberOfParallels;
if (localStorage.getItem("parallels")) {
    numberOfParallels = JSON.parse(localStorage.getItem(
        "parallels"
    )
    );
    localStorage.removeItem("parallels");

} else {
    numberOfParallels = 50;
}


const cars = generateCars(numberOfParallels);
let bestCar = cars[0];

if (localStorage.getItem("Slot2")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("Slot2")
        );
        if (i != 0) {
            if (i != 1) {
                if (i != 2) {
                    if (i != 3) {
                        if (i != 4) {
            NeuralNetwork.mutate(cars[i].brain, 0.2);
                        }
                    }
                }
            }
        }
    }
}
if (localStorage.getItem("Slot3")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("Slot3")
        );
        if (i != 0) {
            if (i != 1) {
                if (i != 2) {
                    if (i != 3) {
                        if (i != 4) {
            NeuralNetwork.mutate(cars[i].brain, 0.2);
                        }
                    }
                }
            }
        }
    }
}
if (localStorage.getItem("Slot4")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("Slot4")
        );
        if (i != 0) {
            if (i != 1) {
                if (i != 2) {
                    if (i != 3) {
                        if (i != 4) {
            NeuralNetwork.mutate(cars[i].brain, 0.2);
                        }
                    }
                }
            }
        }
    }
}
if (localStorage.getItem("Slot5")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("Slot5")
        );
        if (i != 0) {
            if (i != 1) {
                if (i != 2) {
                    if (i != 3) {
                        if (i != 4) {
            NeuralNetwork.mutate(cars[i].brain, 0.2);
                        }
                    }
                }
            }
        }
    }
}
if (localStorage.getItem("Slot1")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("Slot1")
        );
        if (i != 0) {
            if (i != 1) {
                if (i != 2) {
                    if (i != 3) {
                        if (i != 4) {
            NeuralNetwork.mutate(cars[i].brain, 0.2);
                        }
                    }
                }
            }
        }
    }
}
//Utility Functions

function lerp(A, B, t) {
    return A + (B - A) * t;
}

function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}

function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }
        }
    }

    return null;
}

function polysIntersect(poly1, poly2) {
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            const touch = getIntersection(
                poly1[i],
                poly1[(i + 1) % poly1.length],
                poly2[j],
                poly2[(j + 1) % poly2.length]
            );
            if (touch) {
                return true;
            }
        }
    }
    return false;
}

function test() {
    numberOfParallels = parallels.value;
    JSON.stringify(localStorage.setItem("parallels",
        numberOfParallels
    ));
    location.reload();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// End of Utility Functions


animate();



function save() {
    localStorage.setItem(
        "Slot1",
        JSON.stringify(bestCar.brain)
    );
    location.reload();
}

function discard() {
    localStorage.removeItem("Slot1");
    location.reload();
}

function generateCars(N) {
    const cars = [];
    for (let i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "NN", 3))
    }

    return cars;
}

function generateTraffic() {
    const traffic = [];
    const a = 100;

    for (let i = 1; i <= a; i++) {
        let laneOne = getRndInteger(0, 2);
        let laneTwo;
        if (laneOne == 0) {
            laneTwo = getRndInteger(1, 2);
        } else if (laneOne == 1) {
            let a = getRndInteger(0, 1);
            if (a === 0) {
                laneTwo = 0;
            } else {
                laneTwo = 2;
            }
        } else if (laneOne == 2) {
            laneTwo = getRndInteger(0, 1);
        }
        if (i % 2 !== 0) {
            traffic.push(new Car(road.getLaneCenter(laneOne), -i * 100, 30, 50, "DUMMY", 2));
            traffic.push(new Car(road.getLaneCenter(laneTwo), -i * 100, 30, 50, "DUMMY", 2));
        }
    }
    return traffic;
}

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        )
    );

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -bestCar.y + canvas.height * 0.7);

    road.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx);
    }

    ctx.globalAlpha = 0.5;
    
    for (let i = 1; i < cars.length; i++) {
        cars[i].draw(ctx, "blue");
    }

    ctx.globalAlpha = 1;
    bestCar.draw(ctx, "lightblue", true);
    cars[0].draw(ctx, "#d4af37");
    cars[1].draw(ctx, "#a9a9a9");
    cars[2].draw(ctx, "#d2b48c");
    cars[3].draw(ctx, "#9ACD32");
    cars[4].draw(ctx, "#6A5ACD");
    cars[0].sensor.color = "#d4af37";
    cars[1].sensor.color = "#a9a9a9";
    cars[2].sensor.color = "#d2b48c";
    cars[3].sensor.color = "#9ACD32";
    cars[4].sensor.color = "#6A5ACD";

    ctx.restore();
    requestAnimationFrame(animate);
}
