const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { Novu } = require("@novu/node");
const db = require("./database");

const app = express();
const PORT = 4000;
const novu = new Novu("ccf2dbafc2e8657929713c9d62858c8d");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let code;

const generateID = () => Math.random().toString(36).substring(2, 10);
const generateCode = () => Math.random().toString(36).substring(2, 12);

const sendNovuNotification = async (recipient, verificationCode) => {
	try {
		let response = await novu.trigger('trigger', { 
			to: {
				subscriberId: recipient,
				phone: recipient,
			},
			payload: {
				code: verificationCode,
			},
		});
		console.log(response);
	} catch (err) {
		console.error(err.response ? err.response.data : err.message);
	}
};

app.post("/api/login", 
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ error_message: "Internal server error" });
            }
            if (!user || !await bcrypt.compare(password, user.password)) {
                return res.json({ error_message: "Incorrect credentials" });
            }
            code = generateCode();
            sendNovuNotification(user.tel, code);

            res.json({
                message: "Login successfully",
                data: {
                    username: user.username,
                },
            });
        });
    }
);

app.post("/api/register", 
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('tel').isMobilePhone(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, tel, username } = req.body;
        db.get("SELECT * FROM users WHERE email = ? OR tel = ?", [email, tel], async (err, user) => {
            if (err) {
                return res.status(500).json({ error_message: "Internal server error" });
            }
            if (user) {
                return res.json({ error_message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const id = generateID();
            db.run("INSERT INTO users (id, email, password, username, tel) VALUES (?, ?, ?, ?, ?)", [id, email, hashedPassword, username, tel], (err) => {
                if (err) {
                    return res.status(500).json({ error_message: "Internal server error" });
                }
                res.json({ message: "Account created successfully!" });
            });
        });
    }
);

app.post("/api/verification", (req, res) => {
    if (code === req.body.code) {
        return res.json({ message: "You're verified successfully" });
    }
    res.json({ error_message: "Incorrect credentials" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
