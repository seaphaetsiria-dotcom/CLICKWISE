/* =====================================================
   SAFE TECH WEBSITE
   script.js
===================================================== */


/* =====================================================
   GOOGLE SHEETS WEB APP
===================================================== */

const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbzw8Dtzx-7uAEsNGipRFUs828EXDXOHK0_pKZV4OeEBm-VBiaSHDNd2rSafGpQPGQi4iQ/exec";


/* =====================================================
   STUDENT
===================================================== */

function saveStudent() {

    const nameInput = document.getElementById("studentName");
    const numberInput = document.getElementById("studentNumber");
    const classInput = document.getElementById("studentClass");

    if (!nameInput || !numberInput || !classInput) {
        alert("ไม่พบช่องกรอกข้อมูลผู้เรียน");
        return;
    }

    const name = nameInput.value.trim();
    const number = numberInput.value.trim();
    const className = classInput.value.trim();

    if (!name || !number || !className) {
        alert("กรุณากรอกข้อมูลผู้เรียนให้ครบ");
        return;
    }

    const student = {
        name: name,
        number: number,
        className: className
    };

    localStorage.setItem(
        "studentData",
        JSON.stringify(student)
    );

    window.location.href = "guide.html";
}


function getStudent() {

    const data =
        localStorage.getItem("studentData");

    if (!data) {
        return null;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error(
            "อ่านข้อมูลผู้เรียนไม่ได้:",
            error
        );

        return null;
    }
}


function showStudent() {

    const student = getStudent();

    const box =
        document.getElementById("studentInfo");

    if (!box || !student) {
        return;
    }

 box.innerHTML = `
    <span class="student-name-with-avatar">

        <img
            src="ps.png"
            alt=""
            class="student-mini-avatar"
        >

        ${student.name}

    </span>

    <span>เลขที่ ${student.number}</span>

    <span>ชั้น ${student.className}</span>
`;
}


/* =====================================================
   LESSON
===================================================== */

function openLesson(number, button = null) {

    const pages =
        document.querySelectorAll(".lesson-page");

    const buttons =
        document.querySelectorAll(".lesson-menu");

    // ซ่อนทุกบท
    pages.forEach(function (page) {
        page.classList.remove("active");
    });

    // เอา active ออกจากเมนูทั้งหมด
    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    // เปิดบทที่เลือก
    const target =
        document.getElementById("lesson" + number);

    if (target) {
        target.classList.add("active");
    }

    // ถ้ามาจากการกด Sidebar
    if (button) {

        button.classList.add("active");

    } else {

        // ถ้ามาจากปุ่ม ย้อนกลับ / บทต่อไป
        // หา sidebar ของบทนั้นให้อัตโนมัติ

        const sidebarButton =
            buttons[number - 1];

        if (sidebarButton) {
            sidebarButton.classList.add("active");
        }
    }

    // เลื่อนกลับไปด้านบนของบทเรียน
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =====================================================
   PRETEST QUESTIONS
===================================================== */

const preQuestions = [

    {
        q: "ข้อใดเป็นอันตรายที่อาจเกิดขึ้นจากการใช้งานอินเทอร์เน็ต",
        choices: [
            "การล่อลวงเยาวชน",
            "การวาดภาพ",
            "การอ่านหนังสือ",
            "การออกกำลังกาย"
        ],
        answer: 0
    },

    {
        q: "ข้อใดเป็นข้อมูลที่ไม่ควรเปิดเผยบนอินเทอร์เน็ตโดยง่าย",
        choices: [
            "สีที่ชอบ",
            "ข้อมูลส่วนตัว",
            "วิชาที่ชอบ",
            "งานอดิเรก"
        ],
        answer: 1
    },

    {
        q: "ฟิชชิงมีจุดประสงค์สำคัญอย่างไร",
        choices: [
            "ช่วยเพิ่มความเร็วอินเทอร์เน็ต",
            "หลอกให้ผู้ใช้เปิดเผยข้อมูล",
            "ช่วยสร้างรหัสผ่าน",
            "ป้องกันมัลแวร์"
        ],
        answer: 1
    },

    {
        q: "ข้อใดเป็นวิธีใช้อินเทอร์เน็ตอย่างปลอดภัย",
        choices: [
            "เปิดไฟล์ทุกไฟล์ที่ได้รับ",
            "บอกรหัสผ่านให้ผู้อื่น",
            "ไม่เปิดเผยข้อมูลส่วนตัวโดยง่าย",
            "เข้าเว็บไซต์ที่ไม่รู้จักเสมอ"
        ],
        answer: 2
    },

    {
        q: "รหัสผ่านที่เหมาะสมควรมีความยาวอย่างน้อยกี่ตัวอักษร",
        choices: [
            "4 ตัวอักษร",
            "5 ตัวอักษร",
            "6 ตัวอักษร",
            "8 ตัวอักษร"
        ],
        answer: 3
    },

    {
        q: "ข้อใดไม่ควรนำมาใช้เป็นรหัสผ่าน",
        choices: [
            "รูปแบบที่คาดเดายาก",
            "ตัวอักษรหลายลักษณะ",
            "12345",
            "ตัวพิมพ์ใหญ่และตัวพิมพ์เล็ก"
        ],
        answer: 2
    },

    {
        q: "โปรแกรมใดขัดขวางการเข้าถึงข้อมูลด้วยการเข้ารหัสและเรียกร้องค่าไถ่",
        choices: [
            "Adware",
            "Ransomware",
            "Worm",
            "Trojan"
        ],
        answer: 1
    },

    {
        q: "โปรแกรมโฆษณาเรียกว่าอะไร",
        choices: [
            "Adware",
            "Worm",
            "Ransomware",
            "Trojan"
        ],
        answer: 0
    },

    {
        q: "ข้อใดเป็นวิธีป้องกันมัลแวร์",
        choices: [
            "เปิดไฟล์แนบจากทุกอีเมล",
            "ไม่อัปเดตซอฟต์แวร์",
            "ติดตั้งซอฟต์แวร์ป้องกันมัลแวร์",
            "ใช้ Wi-Fi สาธารณะโดยไม่ระวัง"
        ],
        answer: 2
    },

    {
        q: "เมื่อพบการใช้งานอินเทอร์เน็ตที่ไม่เหมาะสมควรทำอย่างไร",
        choices: [
            "ส่งต่อให้เพื่อน",
            "แจ้งผู้ดูแล",
            "เปิดดูซ้ำ",
            "เผยแพร่ต่อ"
        ],
        answer: 1
    }

];


/* =====================================================
   POSTTEST QUESTIONS
===================================================== */

const postQuestions = [

    {
        q: "หากมีบุคคลทางอินเทอร์เน็ตขอข้อมูลส่วนตัว นักเรียนควรทำอย่างไร",
        choices: [
            "ส่งให้ทันที",
            "โพสต์ให้ทุกคนเห็น",
            "ไม่เปิดเผยข้อมูลส่วนตัว",
            "ส่งรหัสผ่านไปด้วย"
        ],
        answer: 2
    },

    {
        q: "ข้อใดอธิบายฟิชชิงได้เหมาะสมที่สุด",
        choices: [
            "การหลอกให้เปิดเผยข้อมูลส่วนตัว",
            "การสำรองข้อมูล",
            "การอัปเดตซอฟต์แวร์",
            "การติดตั้งโปรแกรมป้องกันไวรัส"
        ],
        answer: 0
    },

    {
        q: "ข้อใดเป็นลักษณะของรหัสผ่านที่เหมาะสม",
        choices: [
            "ใช้ 12345",
            "ใช้ชื่อของตนเอง",
            "มีอย่างน้อย 8 ตัวอักษรและคาดเดายาก",
            "ใช้คำว่า Password"
        ],
        answer: 2
    },

    {
        q: "เหตุใดจึงไม่ควรใช้ข้อมูลส่วนตัวเป็นรหัสผ่าน",
        choices: [
            "ทำให้พิมพ์เร็วเกินไป",
            "อาจถูกคาดเดาได้ง่าย",
            "ทำให้คอมพิวเตอร์ช้า",
            "ทำให้อินเทอร์เน็ตหยุดทำงาน"
        ],
        answer: 1
    },

    {
        q: "มัลแวร์ชนิดใดหลอกให้ผู้ใช้ติดตั้งก่อนสร้างปัญหา",
        choices: [
            "Trojan",
            "Adware",
            "Worm",
            "Ransomware"
        ],
        answer: 0
    },

    {
        q: "มัลแวร์ชนิดใดสามารถแพร่เข้าสู่คอมพิวเตอร์เครื่องอื่นในเครือข่าย",
        choices: [
            "Adware",
            "Worm",
            "Ransomware",
            "โปรแกรมโฆษณา"
        ],
        answer: 1
    },

    {
        q: "ข้อใดเป็นลักษณะของ Adware",
        choices: [
            "แสดงหรือดาวน์โหลดโฆษณา",
            "เรียกค่าไถ่จากข้อมูล",
            "ช่วยสำรองข้อมูล",
            "สร้างรหัสผ่าน"
        ],
        answer: 0
    },

    {
        q: "หากได้รับไฟล์แนบจากอีเมลที่ไม่รู้จักควรทำอย่างไร",
        choices: [
            "เปิดทันที",
            "ส่งต่อทันที",
            "หลีกเลี่ยงการเปิดไฟล์แนบ",
            "ดาวน์โหลดทุกไฟล์"
        ],
        answer: 2
    },

    {
        q: "ข้อใดช่วยลดความเสียหายหากข้อมูลมีปัญหา",
        choices: [
            "การสำรองไฟล์ข้อมูล",
            "การบอกรหัสผ่าน",
            "การเปิดไฟล์ไม่รู้จัก",
            "การใช้ Wi-Fi สาธารณะโดยไม่ระวัง"
        ],
        answer: 0
    },

    {
        q: "การป้องกันมัลแวร์ที่เหมาะสมคือข้อใด",
        choices: [
            "ไม่อัปเดตเครื่อง",
            "ติดตั้งโปรแกรมจากทุกแหล่ง",
            "อัปเดตคอมพิวเตอร์และซอฟต์แวร์สม่ำเสมอ",
            "ปิดโปรแกรมป้องกันมัลแวร์"
        ],
        answer: 2
    }

];


/* =====================================================
   QUIZ ENGINE
===================================================== */

let currentQuestion = 0;

let answers = [];


function startQuiz(type) {

    const student = getStudent();

    if (!student) {

        alert(
            "กรุณากรอกข้อมูลผู้เรียนก่อนทำแบบทดสอบ"
        );

        window.location.href =
            "student.html";

        return;
    }

    if (
        type !== "pretest" &&
        type !== "posttest"
    ) {

        console.error(
            "ประเภทแบบทดสอบไม่ถูกต้อง:",
            type
        );

        return;
    }

    window.quizType = type;

    window.questions =
        type === "pretest"
            ? preQuestions
            : postQuestions;

    currentQuestion = 0;

    answers =
        new Array(
            window.questions.length
        ).fill(null);

    showStudent();

    renderQuestion();
}


function renderQuestion() {

    if (
        !window.questions ||
        !window.questions.length
    ) {
        return;
    }

    const questions =
        window.questions;

    const item =
        questions[currentQuestion];

    const questionNumber =
        document.getElementById(
            "questionNumber"
        );

    const questionText =
        document.getElementById(
            "questionText"
        );

    const answersBox =
        document.getElementById(
            "answers"
        );

    const progressFill =
        document.getElementById(
            "progressFill"
        );

    const prevBtn =
        document.getElementById(
            "prevBtn"
        );

    const nextBtn =
        document.getElementById(
            "nextBtn"
        );


    if (questionNumber) {

        questionNumber.textContent =
            `ข้อ ${currentQuestion + 1} / ${questions.length}`;
    }


    if (questionText) {

        questionText.textContent =
            item.q;
    }


    if (answersBox) {

        answersBox.innerHTML = "";

        item.choices.forEach(
            (choice, index) => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "answer";

                if (
                    answers[currentQuestion] ===
                    index
                ) {

                    button.classList.add(
                        "selected"
                    );
                }


                button.innerHTML =
                    `<strong>${String.fromCharCode(
                        65 + index
                    )}.</strong> ${choice}`;


                button.addEventListener(
                    "click",
                    function () {

                        answers[
                            currentQuestion
                        ] = index;

                        renderQuestion();
                    }
                );


                answersBox.appendChild(
                    button
                );
            }
        );
    }


    const progress =
        (
            (currentQuestion + 1) /
            questions.length
        ) * 100;


    if (progressFill) {

        progressFill.style.width =
            progress + "%";
    }


    if (prevBtn) {

        prevBtn.style.visibility =
            currentQuestion === 0
                ? "hidden"
                : "visible";
    }


    if (nextBtn) {

        nextBtn.textContent =
            currentQuestion ===
            questions.length - 1
                ? "ส่งคำตอบ"
                : "ข้อต่อไป →";
    }
}


function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();
    }
}


function nextQuestion() {

    if (
        answers[currentQuestion] ===
        null
    ) {

        alert(
            "กรุณาเลือกคำตอบก่อน"
        );

        return;
    }


    if (
        currentQuestion <
        window.questions.length - 1
    ) {

        currentQuestion++;

        renderQuestion();

    } else {

        submitQuiz();
    }
}


/* =====================================================
   SUBMIT QUIZ
===================================================== */

let isSubmitting = false;


async function submitQuiz() {

    if (isSubmitting) {
        return;
    }


    const student = getStudent();

    if (!student) {

        alert(
            "ไม่พบข้อมูลผู้เรียน กรุณากรอกข้อมูลใหม่"
        );

        window.location.href =
            "student.html";

        return;
    }


    if (
        !window.questions ||
        !window.quizType
    ) {

        alert(
            "ไม่พบข้อมูลแบบทดสอบ"
        );

        return;
    }


    const unanswered =
        answers.some(
            answer => answer === null
        );


    if (unanswered) {

        alert(
            "กรุณาตอบคำถามให้ครบทุกข้อ"
        );

        return;
    }


    isSubmitting = true;


    let score = 0;


    window.questions.forEach(
        (question, index) => {

            if (
                answers[index] ===
                question.answer
            ) {

                score++;
            }
        }
    );


    const type =
        window.quizType;


    console.log(
        "กำลังส่งคะแนน",
        {
            type: type,
            score: score,
            student: student
        }
    );


    /*
       เก็บคะแนนไว้ในเครื่อง
    */

    localStorage.setItem(
        type + "Score",
        String(score)
    );


    /*
       ส่งคะแนนไป Google Sheet
    */

    const sent =
        await sendScoreToSheet(
            type,
            score
        );


    if (!sent) {

        isSubmitting = false;

        alert(
            "ส่งคะแนนไป Google Sheet ไม่สำเร็จ กรุณาลองอีกครั้ง"
        );

        return;
    }


    /*
       เมื่อส่ง request แล้วจึงเปลี่ยนหน้า
    */

    if (type === "pretest") {

        alert(
            `ทำแบบทดสอบก่อนเรียนเรียบร้อย\nคะแนน ${score}/10`
        );

        window.location.href =
            "lesson.html";

    } else {

        window.location.href =
            "result.html";
    }
}


/* =====================================================
   SEND SCORE TO GOOGLE SHEET
===================================================== */

async function sendScoreToSheet(
    testType,
    score
) {

    const student =
        getStudent();


    if (!student) {

        console.error(
            "ไม่พบข้อมูลผู้เรียน"
        );

        return false;
    }


    if (
        testType !== "pretest" &&
        testType !== "posttest"
    ) {

        console.error(
            "testType ไม่ถูกต้อง:",
            testType
        );

        return false;
    }


    const data = {

        name:
            String(student.name).trim(),

        number:
            String(student.number).trim(),

        className:
            String(student.className).trim(),

        testType:
            testType,

        score:
            Number(score),

        total:
            10
    };


    console.log(
        "ข้อมูลที่จะส่งไป Apps Script:",
        data
    );


    try {

        /*
           ใช้ text/plain เพื่อหลีกเลี่ยง
           CORS preflight กับ Apps Script
        */

        await fetch(
            WEB_APP_URL,
            {
                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify(data),

                cache:
                    "no-store"
            }
        );


        /*
           no-cors ไม่อนุญาตให้อ่าน response
           แต่ถ้า fetch ไม่ throw
           แปลว่า request ถูกส่งออกจาก browser แล้ว
        */

        console.log(
            "ส่ง request ไป Apps Script แล้ว"
        );


        return true;


    } catch (error) {

        console.error(
            "ส่งคะแนนไม่สำเร็จ:",
            error
        );


        return false;
    }
}


/* =====================================================
   RESULT
===================================================== */

function showResult() {

    showStudent();


    const pre =
        Number(
            localStorage.getItem(
                "pretestScore"
            ) || 0
        );


    const post =
        Number(
            localStorage.getItem(
                "posttestScore"
            ) || 0
        );


    const difference =
        post - pre;


    const preScore =
        document.getElementById(
            "preScore"
        );

    const postScore =
        document.getElementById(
            "postScore"
        );

    const differenceBox =
        document.getElementById(
            "difference"
        );

    const resultMessage =
        document.getElementById(
            "resultMessage"
        );


    if (preScore) {

        preScore.textContent =
            `${pre}/10`;
    }


    if (postScore) {

        postScore.textContent =
            `${post}/10`;
    }


    if (differenceBox) {

        differenceBox.textContent =
            difference > 0
                ? `+${difference}`
                : `${difference}`;
    }


    let message = "";


    if (difference > 0) {

        message =
            `คะแนนหลังเรียนเพิ่มขึ้น ${difference} คะแนน 🎉`;

    } else if (difference === 0) {

        message =
            "คะแนนก่อนเรียนและหลังเรียนเท่ากัน สามารถทบทวนบทเรียนเพิ่มเติมได้";

    } else {

        message =
            "ลองทบทวนบทเรียนและทำกิจกรรมอีกครั้ง เพื่อเสริมความเข้าใจ";
    }


    if (resultMessage) {

        resultMessage.textContent =
            message;
    }
}


/* =====================================================
   AUTO PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // แสดงข้อมูลผู้เรียน
        showStudent();

        // ถ้าเป็นหน้าผลการเรียน ให้แสดงคะแนน
        const resultPage =
            document.getElementById("resultMessage");

        if (resultPage) {
            showResult();
        }

    }
);
/* =========================================================
   SAFE TECH — INTERACTIVE PARTICLE NETWORK
========================================================= */

function initParticleNetwork() {

    const canvas = document.getElementById("particleCanvas");
    const hero = document.querySelector(".home-hero");

    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let particles = [];

    const mouse = {
        x: null,
        y: null,
        radius: 280
    };


    /* =========================
       RESIZE
    ========================= */

    function resizeCanvas() {

        const rect = hero.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        createParticles();
    }


    /* =========================
       PARTICLE
    ========================= */

    class Particle {

        constructor() {

            this.baseX = Math.random() * width;
            this.baseY = Math.random() * height;

            this.x = this.baseX;
            this.y = this.baseY;

            this.vx = (Math.random() - 0.5) * 0.16;
            this.vy = (Math.random() - 0.5) * 0.16;

            this.offsetX = 0;
            this.offsetY = 0;

            this.radius = Math.random() * 1.6 + 1;

            this.alpha =
                Math.random() * 0.35 + 0.30;
        }


        update() {

    /* จุดเคลื่อนที่เอง */
    this.baseX += this.vx;
    this.baseY += this.vy;

    if (this.baseX <= 0 || this.baseX >= width) {
        this.vx *= -1;
    }

    if (this.baseY <= 0 || this.baseY >= height) {
        this.vy *= -1;
    }


    /* ตำแหน่งปกติ */
    let targetX = this.baseX;
    let targetY = this.baseY;


    /* =========================
       ขยับตามเมาส์
    ========================= */

    if (
        mouse.x !== null &&
        mouse.y !== null
    ) {

        const dx = mouse.x - this.baseX;
        const dy = mouse.y - this.baseY;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );


        if (distance < mouse.radius) {

            const force =
                (mouse.radius - distance) /
                mouse.radius;

            targetX =
                this.baseX +
                dx * force * 0.38;

            targetY =
                this.baseY +
                dy * force * 0.38;
        }
    }


    /* ทำให้เคลื่อนตามเมาส์แบบนุ่ม ๆ */
    this.x +=
        (targetX - this.x) * 0.16;

    this.y +=
        (targetY - this.y) * 0.16;
}
        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(73,166,169,${this.alpha})`;

            ctx.fill();
        }
    }


    /* =========================
       CREATE
    ========================= */

    function createParticles() {

        particles = [];

        let amount = 95;

        if (window.innerWidth < 600) {
            amount = 35;
        }

        else if (window.innerWidth < 1000) {
            amount = 60;
        }


        for (let i = 0; i < amount; i++) {

            particles.push(
                new Particle()
            );
        }
    }


    /* =========================
       PARTICLE CONNECTION
    ========================= */

    function connectParticles() {

        const maxDistance = 135;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const dx =
                    particles[i].x -
                    particles[j].x;

                const dy =
                    particles[i].y -
                    particles[j].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < maxDistance) {

                    const opacity =
                        1 -
                        distance /
                        maxDistance;


                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );


                    ctx.strokeStyle =
                        `rgba(
                            86,
                            169,
                            173,
                            ${opacity * 0.25}
                        )`;

                    ctx.lineWidth = 0.8;

                    ctx.stroke();
                }
            }
        }
    }


    /* =========================
       CONNECT TO MOUSE
    ========================= */

    function connectMouse() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {
            return;
        }


        particles.forEach(particle => {

            const dx =
                particle.x -
                mouse.x;

            const dy =
                particle.y -
                mouse.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < mouse.radius) {

                const opacity =
                    1 -
                    distance /
                    mouse.radius;


                ctx.beginPath();

                ctx.moveTo(
                    mouse.x,
                    mouse.y
                );

                ctx.lineTo(
                    particle.x,
                    particle.y
                );


                /*
                   Pink เดิมของ SAFE TECH
                */

                ctx.strokeStyle =
                    `rgba(
                        255,
                        174,
                        188,
                        ${opacity * 0.55}
                    )`;

                ctx.lineWidth = 1;

                ctx.stroke();
            }
        });
    }


    /* =========================
       ANIMATION
    ========================= */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(particle => {

            particle.update();
            particle.draw();

        });


        connectParticles();

        connectMouse();


        requestAnimationFrame(
            animate
        );
    }

/* =========================
   MOUSE POSITION
========================= */

window.addEventListener("mousemove", function (event) {

    const rect = hero.getBoundingClientRect();

    if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    ) {

        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;

    } else {

        mouse.x = null;
        mouse.y = null;
    }

});
      /* =========================
       RESIZE
    ========================= */

    let resizeTimer;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(
                    resizeCanvas,
                    150
                );
        }
    );


    /* START */

    resizeCanvas();

    animate();
}


/* เริ่ม Particle หลังหน้าเว็บโหลด */

document.addEventListener(
    "DOMContentLoaded",
    initParticleNetwork
);
/* =====================================================
   LESSON CHECK — ตรวจสอบความเข้าใจ
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const lessonChecks = document.querySelectorAll(".lesson-check");

    lessonChecks.forEach(function (quiz) {

        const correctAnswer = quiz.dataset.answer;
        const explanation = quiz.dataset.explain;

        const answers = quiz.querySelectorAll(".check-answer");
        const feedback = quiz.querySelector(".check-feedback");

        answers.forEach(function (button) {

            button.addEventListener("click", function () {

                const selectedAnswer = button.dataset.choice;

                // ล้างสถานะคำตอบเดิม
                answers.forEach(function (item) {
                    item.classList.remove("correct", "wrong");
                });

                feedback.classList.remove(
                    "show",
                    "success",
                    "error"
                );

                // ตอบถูก
                if (selectedAnswer === correctAnswer) {

                    button.classList.add("correct");

                    feedback.innerHTML =
                        "<strong>✓ ถูกต้อง!</strong><br>" +
                        explanation;

                    feedback.classList.add(
                        "show",
                        "success"
                    );

                } else {

                    // ตอบผิด
                    button.classList.add("wrong");

                    feedback.innerHTML =
                        "<strong>✕ ยังไม่ถูกต้อง ลองอีกครั้ง</strong><br>" +
                        "ลองทบทวนเนื้อหาในบทเรียน แล้วเลือกคำตอบใหม่อีกครั้ง";

                    feedback.classList.add(
                        "show",
                        "error"
                    );
                }

            });

        });

    });

});
/* =====================================================
   LOGOUT STUDENT
===================================================== */

function logoutStudent() {

    const confirmLogout = confirm(
        "ต้องการออกจากระบบใช่หรือไม่?\n\nข้อมูลผู้เรียนและคะแนนที่บันทึกไว้ในเครื่องจะถูกล้าง"
    );

    if (!confirmLogout) {
        return;
    }

    // ล้างข้อมูลผู้เรียน
    localStorage.removeItem("studentData");

    // ล้างคะแนนก่อนเรียน
    localStorage.removeItem("pretestScore");

    // ล้างคะแนนหลังเรียน
    localStorage.removeItem("posttestScore");

    // กลับหน้าแรก
    window.location.href = "student.html";
}
/* =====================================================
   INTERACTIVE ACTIVITY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const missions =
        document.querySelectorAll(".mission-card");

    if (!missions.length) {
        return;
    }

    let completedMissions = new Set();
    let score = 0;


    /* ===============================
       UPDATE PROGRESS
    =============================== */

    function updateMissionProgress() {

        const completed =
            completedMissions.size;

        const percent =
            (completed / 5) * 100;

        const progressText =
            document.getElementById(
                "missionProgressText"
            );

        const progressFill =
            document.getElementById(
                "missionProgressFill"
            );

        if (progressText) {
            progressText.textContent =
                completed + " / 5";
        }

        if (progressFill) {
            progressFill.style.width =
                percent + "%";
        }

    }


    /* ===============================
       COMPLETE MISSION
    =============================== */

    function completeMission(number) {

        if (!completedMissions.has(number)) {

            completedMissions.add(number);

            score++;

            updateMissionProgress();
        }

    }


    /* ===============================
       NORMAL QUESTIONS
    =============================== */

    document
        .querySelectorAll(
            ".mission-choice, .file-choice"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(
                            ".mission-card"
                        );

                    const feedback =
                        card.querySelector(
                            ".mission-feedback"
                        );

                    const nextButton =
                        card.querySelector(
                            ".mission-next, .finish-mission"
                        );

                    const missionNumber =
                        Number(
                            card.id.replace(
                                "mission",
                                ""
                            )
                        );


                    card
                        .querySelectorAll(
                            ".mission-choice, .file-choice"
                        )
                        .forEach(function (item) {

                            item.classList.remove(
                                "correct",
                                "wrong"
                            );

                        });


                    if (
                        button.dataset.correct
                        === "true"
                    ) {

                        button.classList.add(
                            "correct"
                        );

                        feedback.innerHTML =
                            "<strong>✓ ถูกต้อง!</strong><br>" +
                            getMissionExplanation(
                                missionNumber
                            );

                        feedback.className =
                            "mission-feedback show success";

                        if (nextButton) {
                            nextButton.disabled =
                                false;
                        }

                        completeMission(
                            missionNumber
                        );

                    } else {

                        button.classList.add(
                            "wrong"
                        );

                        feedback.innerHTML =
                            "<strong>✕ ยังไม่ถูกต้อง</strong><br>" +
                            "ลองคิดอีกครั้งจากหลักความปลอดภัยที่ได้เรียนมา";

                        feedback.className =
                            "mission-feedback show error";

                    }

                }
            );

        });


    /* ===============================
       EXPLANATIONS
    =============================== */

    function getMissionExplanation(number) {

        const explanations = {

            1:
                "ก่อนเชื่อหรือแชร์ข้อมูล ควรตรวจสอบแหล่งที่มา วันที่ และเปรียบเทียบกับแหล่งข้อมูลที่น่าเชื่อถือ",

            3:
                "ไม่ควรเปิดเผยชื่อ โรงเรียน เบอร์โทรศัพท์ หรือข้อมูลส่วนตัวแก่บุคคลที่รู้จักเฉพาะทางออนไลน์",

            4:
                "ไฟล์โปรแกรมจากเว็บไซต์ที่ไม่รู้จักอาจมีมัลแวร์ จึงไม่ควรดาวน์โหลดหรือเปิดไฟล์ทันที",

            5:
                "ข้อความที่เร่งให้กดลิงก์และกรอกรหัสผ่านอาจเป็นฟิชชิง ควรตรวจสอบผ่านช่องทางทางการ"

        };

        return explanations[number] || "";

    }


    /* ===============================
       NEXT MISSION
    =============================== */

    document
        .querySelectorAll(".mission-next")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const next =
                        button.dataset.next;

                    missions.forEach(
                        function (mission) {

                            mission.classList.remove(
                                "active"
                            );

                        }
                    );

                    const target =
                        document.getElementById(
                            "mission" + next
                        );

                    if (target) {

                        target.classList.add(
                            "active"
                        );

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* ===============================
       PASSWORD LAB
    =============================== */

    const passwordInput =
        document.getElementById(
            "passwordPractice"
        );

    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            function () {

                const value =
                    passwordInput.value;

                const rules = {

                    ruleLength:
                        value.length >= 8,

                    ruleUpper:
                        /[A-Z]/.test(value),

                    ruleLower:
                        /[a-z]/.test(value),

                    ruleNumber:
                        /[0-9]/.test(value),

                    ruleSymbol:
                        /[^A-Za-z0-9]/.test(value)

                };


                let passed = 0;


                Object.keys(rules)
                    .forEach(function (id) {

                        const element =
                            document.getElementById(
                                id
                            );

                        if (rules[id]) {

                            passed++;

                            element.classList.add(
                                "passed"
                            );

                            element.textContent =
                                "✓ " +
                                element.textContent
                                    .replace(
                                        /^[○✓]\s*/,
                                        ""
                                    );

                        } else {

                            element.classList.remove(
                                "passed"
                            );

                            element.textContent =
                                "○ " +
                                element.textContent
                                    .replace(
                                        /^[○✓]\s*/,
                                        ""
                                    );

                        }

                    });


                const percent =
                    passed * 20;


                const fill =
                    document.getElementById(
                        "strengthFill"
                    );

                const text =
                    document.getElementById(
                        "strengthText"
                    );

                const feedback =
                    document.getElementById(
                        "passwordFeedback"
                    );

                const next =
                    document.getElementById(
                        "passwordNext"
                    );


                fill.style.width =
                    percent + "%";


                if (passed <= 2) {

                    text.textContent =
                        "ยังไม่แข็งแรง";

                    fill.style.background =
                        "#FFAEBC";

                } else if (passed <= 4) {

                    text.textContent =
                        "เกือบแข็งแรงแล้ว";

                    fill.style.background =
                        "#FBE7C6";

                } else {

                    text.textContent =
                        "รหัสผ่านตัวอย่างแข็งแรง ✓";

                    fill.style.background =
                        "#B4F8C8";

                    feedback.innerHTML =
                        "<strong>✓ ภารกิจสำเร็จ!</strong><br>" +
                        "รหัสผ่านตัวอย่างมีความยาวและองค์ประกอบที่หลากหลาย";

                    feedback.className =
                        "mission-feedback show success";

                    next.disabled = false;

                    completeMission(2);

                }

            }
        );

    }


    /* ===============================
       FINISH
    =============================== */

    const finishButton =
        document.getElementById(
            "finishMission"
        );

    if (finishButton) {

        finishButton.addEventListener(
            "click",
            function () {

                missions.forEach(
                    function (mission) {

                        mission.classList.remove(
                            "active"
                        );

                    }
                );


                const result =
                    document.getElementById(
                        "missionResult"
                    );

                const scoreText =
                    document.getElementById(
                        "missionScore"
                    );


                if (scoreText) {
                    scoreText.textContent =
                        score + " / 5";
                }


                if (result) {

                    result.classList.add(
                        "show"
                    );

                    result.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }

});
/* =====================================================
   ACTIVITY : DIGITAL DETECTIVE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ทำงานเฉพาะหน้า activity.html
    const activityPage =
        document.querySelector(".activity-container");

    if (!activityPage) {
        return;
    }

    const missions =
        document.querySelectorAll(".mission-card");

    const progressText =
        document.getElementById("missionProgressText");

    const progressFill =
        document.getElementById("missionProgressFill");

    let completedMissions = new Set();
    let score = 0;


    /* =====================================================
       UPDATE PROGRESS
    ===================================================== */

    function updateMissionProgress() {

        const completed =
            completedMissions.size;

        if (progressText) {
            progressText.textContent =
                completed + " / 5";
        }

        if (progressFill) {
            progressFill.style.width =
                (completed / 5 * 100) + "%";
        }
    }


    /* =====================================================
       COMPLETE MISSION
    ===================================================== */

    function completeMission(mission) {

        if (!mission) {
            return;
        }

        const missionId =
            mission.id;

        if (!completedMissions.has(missionId)) {

            completedMissions.add(missionId);

            score++;

            updateMissionProgress();
        }
    }


    /* =====================================================
       MISSION 1, 3, 5
       เลือกคำตอบจากสถานการณ์
    ===================================================== */

    const missionChoices =
        document.querySelectorAll(".mission-choice");

    missionChoices.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const mission =
                    button.closest(".mission-card");

                if (!mission) {
                    return;
                }

                const choices =
                    mission.querySelectorAll(
                        ".mission-choice"
                    );

                const feedback =
                    mission.querySelector(
                        ".mission-feedback"
                    );

                const nextButton =
                    mission.querySelector(
                        ".mission-next"
                    );

                const finishButton =
                    mission.querySelector(
                        ".finish-mission"
                    );

                // ล้างสถานะเดิม
                choices.forEach(function (item) {

                    item.classList.remove(
                        "correct",
                        "wrong"
                    );

                });


                const isCorrect =
                    button.dataset.correct === "true";


                if (isCorrect) {

                    button.classList.add(
                        "correct"
                    );

                    if (feedback) {

                        feedback.innerHTML =
                            "✅ <strong>ถูกต้อง!</strong><br>" +
                            "เป็นการตัดสินใจที่ช่วยลดความเสี่ยงในการใช้งานเทคโนโลยี";

                        feedback.classList.add(
                            "show",
                            "success"
                        );

                        feedback.classList.remove(
                            "error"
                        );
                    }


                    // ปลดล็อกปุ่มถัดไป
                    if (nextButton) {

                        nextButton.disabled =
                            false;
                    }


                    // ภารกิจสุดท้าย
                    if (finishButton) {

                        finishButton.disabled =
                            false;
                    }


                    completeMission(mission);

                } else {

                    button.classList.add(
                        "wrong"
                    );

                    if (feedback) {

                        feedback.innerHTML =
                            "❌ <strong>ยังไม่ถูกต้อง</strong><br>" +
                            "ลองคิดถึงความปลอดภัยของข้อมูลและเลือกคำตอบใหม่อีกครั้ง";

                        feedback.classList.add(
                            "show",
                            "error"
                        );

                        feedback.classList.remove(
                            "success"
                        );
                    }
                }

            }
        );

    });


    /* =====================================================
       MISSION 2 : PASSWORD LAB
    ===================================================== */

    const passwordInput =
        document.getElementById(
            "passwordPractice"
        );

    const strengthFill =
        document.getElementById(
            "strengthFill"
        );

    const strengthText =
        document.getElementById(
            "strengthText"
        );

    const passwordFeedback =
        document.getElementById(
            "passwordFeedback"
        );

    const passwordNext =
        document.getElementById(
            "passwordNext"
        );


    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            function () {

                const password =
                    passwordInput.value;

                const rules = {

                    length:
                        password.length >= 8,

                    upper:
                        /[A-Z]/.test(password),

                    lower:
                        /[a-z]/.test(password),

                    number:
                        /[0-9]/.test(password),

                    symbol:
                        /[^A-Za-z0-9]/.test(password)

                };


                updatePasswordRule(
                    "ruleLength",
                    rules.length
                );

                updatePasswordRule(
                    "ruleUpper",
                    rules.upper
                );

                updatePasswordRule(
                    "ruleLower",
                    rules.lower
                );

                updatePasswordRule(
                    "ruleNumber",
                    rules.number
                );

                updatePasswordRule(
                    "ruleSymbol",
                    rules.symbol
                );


                const passed =
                    Object.values(rules)
                        .filter(Boolean)
                        .length;


                if (strengthFill) {

                    strengthFill.style.width =
                        (passed / 5 * 100) + "%";
                }


                if (strengthText) {

                    if (passed <= 2) {

                        strengthText.textContent =
                            "รหัสผ่านยังไม่แข็งแรง";

                    } else if (passed <= 4) {

                        strengthText.textContent =
                            "เกือบสำเร็จแล้ว";

                    } else {

                        strengthText.textContent =
                            "รหัสผ่านแข็งแรง ✓";
                    }
                }


                /* ผ่านครบทุกเงื่อนไข */

                if (passed === 5) {

                    if (passwordFeedback) {

                        passwordFeedback.innerHTML =
                            "✅ <strong>ยอดเยี่ยม!</strong> " +
                            "รหัสผ่านตัวอย่างผ่านเงื่อนไขความปลอดภัยครบแล้ว";

                        passwordFeedback.classList.add(
                            "show",
                            "success"
                        );
                    }


                    if (passwordNext) {

                        passwordNext.disabled =
                            false;
                    }


                    const mission2 =
                        document.getElementById(
                            "mission2"
                        );

                    completeMission(mission2);

                } else {

                    if (passwordNext) {

                        passwordNext.disabled =
                            true;
                    }

                    if (passwordFeedback) {

                        passwordFeedback.classList.remove(
                            "show",
                            "success"
                        );
                    }
                }

            }
        );

    }


    function updatePasswordRule(
        id,
        passed
    ) {

        const rule =
            document.getElementById(id);

        if (!rule) {
            return;
        }

        const text =
            rule.textContent
                .replace("✓", "")
                .replace("○", "")
                .trim();

        if (passed) {

            rule.innerHTML =
                "✓ " + text;

            rule.classList.add(
                "passed"
            );

        } else {

            rule.innerHTML =
                "○ " + text;

            rule.classList.remove(
                "passed"
            );
        }
    }


    /* =====================================================
       MISSION 4 : MALWARE
    ===================================================== */

    const fileChoices =
        document.querySelectorAll(
            ".file-choice"
        );


    fileChoices.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const mission =
                    button.closest(
                        ".mission-card"
                    );

                if (!mission) {
                    return;
                }

                const choices =
                    mission.querySelectorAll(
                        ".file-choice"
                    );

                const feedback =
                    mission.querySelector(
                        ".mission-feedback"
                    );

                const nextButton =
                    mission.querySelector(
                        ".mission-next"
                    );


                choices.forEach(function (item) {

                    item.classList.remove(
                        "correct",
                        "wrong"
                    );
                });


                const isCorrect =
                    button.dataset.correct ===
                    "true";


                if (isCorrect) {

                    button.classList.add(
                        "correct"
                    );

                    if (feedback) {

                        feedback.innerHTML =
                            "✅ <strong>ถูกต้อง!</strong><br>" +
                            "ไฟล์จากเว็บไซต์ที่ไม่รู้จัก โดยเฉพาะไฟล์โปรแกรม อาจมีมัลแวร์แฝงอยู่";

                        feedback.classList.add(
                            "show",
                            "success"
                        );

                        feedback.classList.remove(
                            "error"
                        );
                    }


                    if (nextButton) {

                        nextButton.disabled =
                            false;
                    }


                    completeMission(mission);

                } else {

                    button.classList.add(
                        "wrong"
                    );

                    if (feedback) {

                        feedback.innerHTML =
                            "❌ <strong>ลองอีกครั้ง</strong><br>" +
                            "พิจารณาทั้งชนิดของไฟล์และแหล่งที่มาของไฟล์";

                        feedback.classList.add(
                            "show",
                            "error"
                        );

                        feedback.classList.remove(
                            "success"
                        );
                    }
                }

            }
        );

    });


    /* =====================================================
       NEXT MISSION
    ===================================================== */

    const nextButtons =
        document.querySelectorAll(
            ".mission-next"
        );


    nextButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (button.disabled) {
                    return;
                }

                const nextNumber =
                    button.dataset.next;

                const currentMission =
                    button.closest(
                        ".mission-card"
                    );

                const nextMission =
                    document.getElementById(
                        "mission" + nextNumber
                    );


                if (currentMission) {

                    currentMission.classList.remove(
                        "active"
                    );
                }


                if (nextMission) {

                    nextMission.classList.add(
                        "active"
                    );

                    nextMission.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            }
        );

    });


    /* =====================================================
       FINISH MISSION
    ===================================================== */

    const finishMission =
        document.getElementById(
            "finishMission"
        );

    const missionResult =
        document.getElementById(
            "missionResult"
        );

    const missionScore =
        document.getElementById(
            "missionScore"
        );


    if (finishMission) {

        finishMission.addEventListener(
            "click",
            function () {

                if (finishMission.disabled) {
                    return;
                }


                if (missionScore) {

                    missionScore.textContent =
                        score + " / 5";
                }


                if (missions.length) {

                    missions.forEach(
                        function (mission) {

                            mission.classList.remove(
                                "active"
                            );

                        }
                    );
                }


                if (missionResult) {

                    missionResult.classList.add(
                        "show"
                    );

                    missionResult.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            }
        );

    }


    /* เริ่มต้น progress */

    updateMissionProgress();

});
/* =====================================================
   DIGITAL SAFETY SIMULATOR
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const simulator =
            document.querySelector(
                ".computer-shell"
            );

        // ถ้าไม่ใช่หน้า Activity
        // จะไม่ทำงาน
        if (!simulator) {
            return;
        }


        let completed = 0;

        const completedMissions =
            new Set();


        const progressText =
            document.getElementById(
                "simProgressText"
            );

        const progressFill =
            document.getElementById(
                "simProgressFill"
            );


        /* =====================================
           PROGRESS
        ===================================== */

        function updateProgress() {

            if (progressText) {

                progressText.textContent =
                    completed + " / 5";
            }


            if (progressFill) {

                progressFill.style.width =
                    (completed / 5 * 100)
                    + "%";
            }

        }


        function completeMission(number) {

            if (
                completedMissions.has(number)
            ) {
                return;
            }

            completedMissions.add(number);

            completed++;

            updateProgress();
        }



        /* =====================================
           NORMAL QUESTIONS
        ===================================== */

        const choices =
            document.querySelectorAll(
                ".sim-choice"
            );


        choices.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const windowBox =
                            button.closest(
                                ".sim-window"
                            );

                        if (!windowBox) {
                            return;
                        }


                        const allChoices =
                            windowBox
                            .querySelectorAll(
                                ".sim-choice"
                            );


                        const feedback =
                            windowBox
                            .querySelector(
                                ".sim-feedback"
                            );


                        const nextButton =
                            windowBox
                            .querySelector(
                                ".sim-next"
                            );


                        const finishButton =
                            windowBox
                            .querySelector(
                                ".sim-finish"
                            );


                        allChoices.forEach(
                            function (item) {

                                item.classList.remove(
                                    "correct",
                                    "wrong"
                                );

                            }
                        );


                        if (feedback) {

                            feedback.classList.remove(
                                "show",
                                "success",
                                "error"
                            );
                        }


                        const correct =
                            button.dataset.correct
                            === "true";


                        if (correct) {

                            button.classList.add(
                                "correct"
                            );


                            if (feedback) {

                                feedback.innerHTML =
                                    "✅ <strong>ตัดสินใจได้ปลอดภัย!</strong><br>" +
                                    "คำตอบนี้ช่วยลดความเสี่ยงและปกป้องข้อมูลของนักเรียน";

                                feedback.classList.add(
                                    "show",
                                    "success"
                                );
                            }


                            if (nextButton) {

                                nextButton.disabled =
                                    false;
                            }


                            if (finishButton) {

                                finishButton.disabled =
                                    false;
                            }


                            const missionNumber =
                                Number(
                                    windowBox.id
                                    .replace(
                                        "simMission",
                                        ""
                                    )
                                );


                            completeMission(
                                missionNumber
                            );

                        } else {

                            button.classList.add(
                                "wrong"
                            );


                            if (feedback) {

                                feedback.innerHTML =
                                    "⚠️ <strong>ยังไม่ปลอดภัย</strong><br>" +
                                    "ลองพิจารณาความเสี่ยงที่อาจเกิดขึ้น แล้วเลือกใหม่อีกครั้ง";

                                feedback.classList.add(
                                    "show",
                                    "error"
                                );
                            }

                        }

                    }
                );

            }
        );



        /* =====================================
           PASSWORD MISSION
        ===================================== */

        const password =
            document.getElementById(
                "simPassword"
            );


        const strengthFill =
            document.getElementById(
                "simStrengthFill"
            );


        const strengthText =
            document.getElementById(
                "simStrengthText"
            );


        const passwordFeedback =
            document.getElementById(
                "simPasswordFeedback"
            );


        const passwordNext =
            document.getElementById(
                "simPasswordNext"
            );


        function setRule(
            id,
            passed,
            text
        ) {

            const element =
                document.getElementById(id);

            if (!element) {
                return;
            }


            if (passed) {

                element.textContent =
                    "✓ " + text;

                element.classList.add(
                    "passed"
                );

            } else {

                element.textContent =
                    "○ " + text;

                element.classList.remove(
                    "passed"
                );

            }

        }


        if (password) {

            password.addEventListener(
                "input",
                function () {

                    const value =
                        password.value;


                    const rules = {

                        length:
                            value.length >= 8,

                        upper:
                            /[A-Z]/.test(
                                value
                            ),

                        lower:
                            /[a-z]/.test(
                                value
                            ),

                        number:
                            /[0-9]/.test(
                                value
                            ),

                        symbol:
                            /[^A-Za-z0-9]/
                            .test(value)

                    };


                    setRule(
                        "simRuleLength",
                        rules.length,
                        "อย่างน้อย 8 ตัวอักษร"
                    );


                    setRule(
                        "simRuleUpper",
                        rules.upper,
                        "มีตัวพิมพ์ใหญ่"
                    );


                    setRule(
                        "simRuleLower",
                        rules.lower,
                        "มีตัวพิมพ์เล็ก"
                    );


                    setRule(
                        "simRuleNumber",
                        rules.number,
                        "มีตัวเลข"
                    );


                    setRule(
                        "simRuleSymbol",
                        rules.symbol,
                        "มีสัญลักษณ์พิเศษ"
                    );


                    const passed =
                        Object
                        .values(rules)
                        .filter(Boolean)
                        .length;


                    if (strengthFill) {

                        strengthFill.style.width =
                            (passed / 5 * 100)
                            + "%";
                    }


                    if (strengthText) {

                        if (passed <= 1) {

                            strengthText.textContent =
                                "อ่อนมาก";

                        } else if (
                            passed <= 2
                        ) {

                            strengthText.textContent =
                                "ยังไม่ปลอดภัย";

                        } else if (
                            passed <= 4
                        ) {

                            strengthText.textContent =
                                "เกือบสำเร็จแล้ว";

                        } else {

                            strengthText.textContent =
                                "แข็งแรง ✓";
                        }

                    }


                    /* ผ่านครบ */

                    if (passed === 5) {

                        if (passwordFeedback) {

                            passwordFeedback.innerHTML =
                                "🔐 <strong>ยอดเยี่ยม!</strong><br>" +
                                "รหัสผ่านจำลองของคุณผ่านเงื่อนไขความปลอดภัยครบแล้ว";

                            passwordFeedback.classList.add(
                                "show",
                                "success"
                            );

                            passwordFeedback.classList.remove(
                                "error"
                            );
                        }


                        if (passwordNext) {

                            passwordNext.disabled =
                                false;
                        }


                        completeMission(2);

                    } else {

                        if (passwordNext) {

                            passwordNext.disabled =
                                true;
                        }


                        if (passwordFeedback) {

                            passwordFeedback
                                .classList
                                .remove(
                                    "show",
                                    "success"
                                );
                        }

                    }

                }
            );

        }



        /* =====================================
           NEXT MISSION
        ===================================== */

        const nextButtons =
            document.querySelectorAll(
                ".sim-next"
            );


        nextButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        if (
                            button.disabled
                        ) {
                            return;
                        }


                        const next =
                            button.dataset.next;


                        const current =
                            button.closest(
                                ".sim-window"
                            );


                        const nextWindow =
                            document.getElementById(
                                "simMission"
                                + next
                            );


                        if (current) {

                            current.classList.remove(
                                "active"
                            );
                        }


                        if (nextWindow) {

                            nextWindow.classList.add(
                                "active"
                            );
                        }


                        simulator.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );



        /* =====================================
           FINISH
        ===================================== */

        const finish =
            document.getElementById(
                "finishSimulator"
            );


        const completeScreen =
            document.getElementById(
                "simComplete"
            );


        if (finish) {

            finish.addEventListener(
                "click",
                function () {

                    if (
                        finish.disabled
                    ) {
                        return;
                    }


                    const current =
                        finish.closest(
                            ".sim-window"
                        );


                    if (current) {

                        current.classList.remove(
                            "active"
                        );
                    }


                    if (completeScreen) {

                        completeScreen.classList.add(
                            "show"
                        );
                    }


                    updateProgress();


                    simulator.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }


        updateProgress();

    }
);
function openReference() {
    const modal = document.getElementById("referenceModal");

    if (modal) {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}


function closeReference() {
    const modal = document.getElementById("referenceModal");

    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
}
/* =====================================================
   REFERENCE POPUP
===================================================== */

function openReference() {

    const modal =
        document.getElementById("referenceModal");

    if (!modal) return;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeReference() {

    const modal =
        document.getElementById("referenceModal");

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";
}


/* กด ESC เพื่อปิด Popup */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeReference();
    }

});