import "./style.scss";

import faker from "faker";
import { TeleBoxCollector, TeleBoxManager, TeleBoxRect } from "../src";

const btns = document.querySelector(".btns")!;
const board = document.querySelector<HTMLDivElement>(".board")!;

const createBtn = (title: string): HTMLButtonElement => {
    const btn = document.createElement("button");
    btn.textContent = title;
    btns.appendChild(btn);
    return btn;
};

setBoardRect();

const manager = new TeleBoxManager({
    fence: false,
    root: board,
    containerRect: getBoardRect(),
    collector: new TeleBoxCollector({
        styles: {
            position: "absolute",
            bottom: "10px",
            right: "50px",
        },
    }).mount(board),
});

createBtn("Create").addEventListener("click", () => {
    const title = faker.datatype.boolean()
        ? faker.commerce.productName()
        : faker.random.words(50);
    const content = document.createElement("div");
    content.style.padding = "16px";
    content.style.background = "#fff";
    content.style.height = "1000px";
    content.textContent = `Content ${title}`;
    manager.create({
        minHeight: 0.1,
        minWidth: 0.1,
        title: title.slice(0, 50),
        focus: true,
        content,
    });
    if (manager.minimized) {
        manager.setMinimized(false);
    }
});

createBtn("Remove").addEventListener("click", () => {
    const boxes = manager.query();
    if (boxes.length > 0) {
        manager.remove(boxes[boxes.length - 1].id);
    }
});

createBtn(manager.readonly ? "Readonly" : "Writable").addEventListener(
    "click",
    (evt) => {
        manager.setReadonly(!manager.readonly);
        (evt.currentTarget as HTMLButtonElement).textContent = manager.readonly
            ? "Readonly"
            : "Writable";
    }
);

window.addEventListener("resize", () => {
    setBoardRect();
    manager.setContainerRect(getBoardRect());
});

function getBoardRect(): TeleBoxRect {
    const { width, height } = board.getBoundingClientRect();
    return { width, height, x: 0, y: 0 };
}

function setBoardRect(): void {
    const { innerWidth, innerHeight } = window;
    let width = innerWidth;
    let height = (innerWidth * 9) / 16;
    if (height > innerHeight) {
        width = (innerHeight * 16) / 9;
        height = innerHeight;
    }
    board.style.width = width + "px";
    board.style.height = height + "px";
}
