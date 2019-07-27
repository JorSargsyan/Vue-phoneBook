const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/src/app/assets')
    },
    filename: function (req, file, cb) {
        let temp;
        if (file.mimetype == "image/png") {
            temp = ".png"
        }
        else if (file.mimetype == "image/jpeg") {
            temp = ".jpg"
        }
        cb(null, file.fieldname + '-' + Date.now() + temp)
    }
})

let upload = multer({ storage: storage });



let app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded




app.get("/", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html")
})


app.get("/contacts", function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        const contacts = JSON.parse(data);
        res.send(contacts);
    });
})



app.post("/contacts", upload.array('avatar', 1), function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        let Items = JSON.parse(data);
        let AddedItem = req.body;
        let LastContactId;
        let LastEmailId;
        let LastNumberId;
        if (Items.length == 0) {
            LastContactId = 0;
        }
        else {
            LastContactId = Items[Items.length - 1].id;
        }


        if (LastContactId != 0) {
            if (Items[LastContactId - 1].emails.length == 0) {
                LastEmailId = 0;
            }
            else {
                LastEmailId = Items[LastContactId - 1].emails[0].emailid;
            }
        }
        else {
            LastEmailId = 0;
        }

        if (LastContactId != 0) {
            if (Items[LastContactId - 1].numbers.length == 0) {
                LastNumberId = 0;
            }
            else {
                LastNumberId = Items[Items.length - 1].numbers[0].numberid;
            }
        }
        else {
            LastNumberId = 0;
        }



        AddedItem.id = LastContactId + 1;
        AddedItem.emails[AddedItem.emails.length - 1].emailid = LastEmailId + 1;
        AddedItem.numbers[AddedItem.numbers.length - 1].numberid = LastNumberId + 1;
        AddedItem.mediaUploaded = false;
        Items.push(AddedItem);
        Items = JSON.stringify(Items);
        fs.writeFile("server-contact-data.json", Items, function (err, result) {
            if (err) console.log('error', err);
        });
        res.send(Items);
    })
})


app.post("/addemail", function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        let Items = JSON.parse(data);
        let ItemId = req.body.id;

        let EditableItem = Items.find((item) => {
            return item.id === ItemId;
        })
        let EmailId = EditableItem.emails[EditableItem.emails.length - 1].emailid + 1;
        let newEmail = {
            emailid: EmailId,
            emailtext: req.body.newEmail
        };
        EditableItem.emails.push(newEmail);



        Items = JSON.stringify(Items);
        fs.writeFile("server-contact-data.json", Items, function (err, result) {
            if (err) console.log('error', err);
        });
        res.send(Items);
    })
})

app.post("/addnumber", function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        let Items = JSON.parse(data);
        let ItemId = req.body.id;

        let EditableItem = Items.find((item) => {
            return item.id === ItemId;
        })

        let NumberId = EditableItem.numbers[EditableItem.numbers.length - 1].numberid + 1;

        let newNumber = {
            numberid: NumberId,
            numbertext: req.body.newNumber
        };

        EditableItem.numbers.push(newNumber);

        Items = JSON.stringify(Items);
        fs.writeFile("server-contact-data.json", Items, function (err, result) {
            if (err) console.log('error', err);
        });
        res.send(Items);
    })
})



app.post("/delete", function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        let Items = JSON.parse(data);
        let deletingItem = req.body
        for (var i = 0; i < Items.length; ++i) {
            if (Items[i].id == deletingItem.id) {
                Items.splice(i, 1);
            }
        }

        for (var i = 0; i < Items.length; ++i) {
            Items[i].id = i + 1;
        }
        Items = JSON.stringify(Items);
        // res.send(cartItems);
        fs.writeFile("server-contact-data.json", Items, function (err, result) {
            if (err) console.log('error', err);
        });
        res.send(Items);
    })
})

app.post("/deleteemail", function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        let Items = JSON.parse(data);
        let ReqItemId = req.body.contactId;
        let ReqMailId = req.body.ItemId;

        for (let i = 0; i < Items.length; i++) {
            if (Items[i].id === ReqItemId) {
                for (let j = 0; j < Items[i].emails.length; j++) {
                    if (Items[i].emails[j].emailid === ReqMailId) {
                        Items[i].emails.splice(j, 1);
                    }
                }
            }
        }

        Items = JSON.stringify(Items);
        fs.writeFile("server-contact-data.json", Items, function (err, result) {
            if (err) console.log('error', err);
        });
        res.send(Items);
    })
})


app.post("/deletenumber", function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        let Items = JSON.parse(data);
        let ReqItemId = req.body.contactId;
        let ReqNumberId = req.body.ItemId;

        for (let i = 0; i < Items.length; i++) {
            if (Items[i].id === ReqItemId) {
                for (let j = 0; j < Items[i].numbers.length; j++) {
                    if (Items[i].numbers[j].numberid === ReqNumberId) {
                        Items[i].numbers.splice(j, 1);
                    }
                }
            }
        }
        Items = JSON.stringify(Items);
        fs.writeFile("server-contact-data.json", Items, function (err, result) {
            if (err) console.log('error', err);
        });
        res.send(Items);
    })
})

app.post("/updateemail", function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        let Items = JSON.parse(data);
        let ReqItemId = req.body.contactId;
        let ReqMailId = req.body.ItemId;
        let NewEmailText = req.body.newEmail;

        for (let i = 0; i < Items.length; i++) {
            if (Items[i].id === ReqItemId) {
                for (let j = 0; j < Items[i].emails.length; j++) {
                    if (Items[i].emails[j].emailid === ReqMailId) {
                        Items[i].emails[j].emailtext = NewEmailText;
                    }
                }
            }
        }

        Items = JSON.stringify(Items);
        fs.writeFile("server-contact-data.json", Items, function (err, result) {
            if (err) console.log('error', err);
        });
        res.send(Items);
    })
})



app.post("/updatenumber", function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        let Items = JSON.parse(data);
        let ReqItemId = req.body.contactId;
        let ReqNumberId = req.body.ItemId;
        let NewNumberText = req.body.newNumber;

        for (let i = 0; i < Items.length; i++) {
            if (Items[i].id === ReqItemId) {
                for (let j = 0; j < Items[i].numbers.length; j++) {
                    if (Items[i].numbers[j].numberid === ReqNumberId) {
                        Items[i].numbers[j].numbertext = NewNumberText;
                    }
                }
            }
        }
        Items = JSON.stringify(Items);
        fs.writeFile("server-contact-data.json", Items, function (err, result) {
            if (err) console.log('error', err);
        });
        res.send(Items);
    })
})


app.post("/uploadpic", upload.any(), function (req, res) {
    fs.readFile("server-contact-data.json", function (err, data) {
        if (!req.files[0]) {
            console.log("No file received");
            return res.send({
                success: false
            });
        }
        else {
            console.log('file received');

            let Items = JSON.parse(data);
            const fileRes = req.files[0].path;
            const host = req.host;
            const ContactID = Number(req.body.id);
            let finalString = req.files[0].filename;

            for (let i = 0; i < Items.length; i++) {
                if (Items[i].id === ContactID) {
                    Items[i].media = finalString;
                    Items[i].mediaUploaded = true;
                }
            }

            Items = JSON.stringify(Items);
            fs.writeFile("server-contact-data.json", Items, function (err, result) {
                if (err) console.log('error', err);
            });
            res.send(Items);
        }
    })
})


app.listen(3000);
