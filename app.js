    const express = require('express');
    const app = express();

    const { Client } = require('pg')
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'balrog',
        port: 5432,
        //postgres://postgres:5918afe7e06f5f9d5206287397fb227f3e9a78a5439015e8@postgres7.internal:5432
    })
        /*
    user:    'postgres',
    database: 'postgres',
    password:    "9e09be0bcdc90ba9b54e7cf5d1d3c50ad0ac83ac10c642c7",
    host:    "postgres77.internal",
    port: 5433
    })
        */

    client.connect()
        .then(() => {
            console.log("lol made it")
        })
        .catch((err) => {
            console.error('Error connecting: %s', err);
            console.log("lol failed")
        });


    //generic home
    //TODO
    app.get("/", (req, res) => {
        //res.send("get placeholder");
        res.redirect('/login')
    });
    app.get("/login", (req, res) => {
        //res.send("get placeholder");
        res.render("login.ejs", {
            user: '',
        });
    });
    app.get("/signUp", (req, res) => {
        res.render('signup.ejs',{
            signUpStatus: ''
        })
    });

    app.get("/home/:user", (req, res) => {
        let currentUser = sanitize(String(req.params.user));
        //res.send("get placeholder");
        client.query(//req.body
            "SELECT * FROM users" +
            " WHERE username = '" + currentUser + "'" +
            "" +
            ";",
            (err, result) => {
                client.query(//req.body
                    "SELECT * FROM users" +
                    " WHERE username = '" + currentUser + "'" +
                    "" +
                    ";",
                    (err, result1) => {
                        if (err) return console.log("Error: " + err);
                        console.log('lol')
                        client.query(//req.body
                            "SELECT * FROM locations" +
                            " WHERE username = '" + currentUser + "'" +
                            "" +
                            ";",
                            (err, result) => {
                                if (err) return console.log("Error: " + err);
                                    //IF MATCH
                                if( result1.rows.length == 0) {
                                    //IF ZERO
                                        res.render("form.ejs", {
                                            user: 'error',
                                            weather1: 'error',
                                            weather2: 'error',
                                            weather3: 'error',
                                            weather4: 'error',
                                            notifications1: 'error',
                                            notifications2: 'error',
                                        rows: result.rows,
                                    });
                                }else if( result1.rows.length > 0){
                                    //IF MATCH
                                    console.log("weather");
                                    console.log(result.rows);
                                    //user = un
                                    res.render("form.ejs", {
                                        user: currentUser,
                                        weather1: result1.rows[0].lowt,
                                        weather2: result1.rows[0].hight,
                                        weather3: result1.rows[0].precipmax,
                                        weather4: result1.rows[0].windmax,
                                        notifications2: result1.rows[0].email ,
                                        notifications1:  result1.rows[0].frequency,
                                        rows: result.rows,
                                    });
                                }
                            });
                    });
            });
    });
    app.get("/addLocation/:user", (req, res) => {
        let currentUser = sanitize(String(req.params.user));
        //res.send("get placeholder");
        client.query(//req.body
            "SELECT * FROM users" +
            " WHERE username = '" + currentUser + "'" +
            "" +
            ";",
            (err, result) => {
                if (err) return console.log("Error: " + err);
                if( result.rows.length == 0) {
                    //IF ZERO
                    console.log("no weather");
                    res.render("addLocation.ejs", {
                        user: 'error',
                        weather1: 'error',
                        weather2: 'error',
                        weather3: 'error',
                        weather4: 'error',
                        notifications1: 'error',
                        notifications2: 'error',
                    });
                }else if( result.rows.length > 0){
                    //IF MATCH
                    console.log("weather");
                    console.log(result.rows);
                    //user = un
                    res.render("addLocation.ejs", {
                        user: currentUser,
                        weather1: result.rows[0].lowt,
                        weather2: result.rows[0].hight,
                        weather3: result.rows[0].precip,
                        weather4: result.rows[0].wind,
                        notifications1: result.rows[0].email ,
                        notifications2:  result.rows[0].frequency,
                    });
                }
            });
    });
    app.get("/setPreferences/:user", (req, res) => {
        let currentUser = sanitize(String(req.params.user));
        //res.send("get placeholder");
        client.query(//req.body
            "SELECT * FROM users" +
            " WHERE username = '" + currentUser + "'" +
            "" +
            ";",
            (err, result) => {
                if (err) return console.log("Error: " + err);
                if( result.rows.length == 0) {
                    //IF ZERO
                    console.log("no weather");
                    res.render("setPreferences.ejs", {
                        user: 'error',
                        weather1: 'error',
                        weather2: 'error',
                        weather3: 'error',
                        weather4: 'error',
                        notifications1: 'error',
                        notifications2: 'error',
                    });
                }else if( result.rows.length > 0){
                    //IF MATCH
                    console.log("weather");
                    console.log(result.rows);
                    //user = un
                    res.render("setPreferences.ejs", {
                        user: currentUser,
                        weather1: result.rows[0].lowt,
                        weather2: result.rows[0].hight,
                        weather3: result.rows[0].precipmax,
                        weather4: result.rows[0].windmax,
                        notifications1: result.rows[0].email ,
                        notifications2:  result.rows[0].frequency,
                    });
                }
            });
    });
    app.get("/setNotices/:user", (req, res) => {
        let currentUser = sanitize(String(req.params.user));
        //res.send("get placeholder");
        client.query(//req.body
            "SELECT * FROM users" +
            " WHERE username = '" + currentUser + "'" +
            "" +
            ";",
            (err, result) => {
                if (err) return console.log("Error: " + err);
                if( result.rows.length == 0) {
                    //IF ZERO
                    console.log("no weather");
                    res.render("setNotice.ejs", {
                        user: 'error',
                        weather1: 'error',
                        weather2: 'error',
                        weather3: 'error',
                        weather4: 'error',
                        notifications1: 'error',
                        notifications2: 'error',
                    });
                }else if( result.rows.length > 0){
                    //IF MATCH
                    console.log("weather");
                    console.log(result.rows);
                    //user = un
                    res.render("setNotice.ejs", {
                        user: currentUser,
                        weather1: result.rows[0].lowt,
                        weather2: result.rows[0].hight,
                        weather3: result.rows[0].precip,
                        weather4: result.rows[0].wind,
                        notifications1: result.rows[0].email ,
                        notifications2:  result.rows[0].frequency,
                    });
                }
            });
    });
    app.get("/home/views/:user", (req, res) => {
        //666
        let currentUser = sanitize(String(req.params.user));
        client.query(//req.body
            "SELECT * FROM users" +
            " WHERE username = '" + currentUser + "'" +
            "" +
            ";",
            (err, result1) => {
                if (err) return console.log("Error: " + err);
                if( result1.rows.length == 0) {
                    //IF ZERO
                    console.log("no user weather");
                }else if( result1.rows.length > 0){
                    //IF MATCH

                }
                client.query(//req.body
                    "SELECT * FROM locations" +
                    " WHERE username = '" + currentUser + "'" +
                    "" +
                    ";",
                    (err, result) => {
                        if (err) return console.log("Error: " + err);
                        if( result.rows.length == 0) {
                            //IF ZERO
                            console.log("no weather");
                            res.render("view.ejs", {
                                user: currentUser,
                                high: currentUser,
                                low: currentUser,
                                windmax: currentUser,
                                precipmax: currentUser,
                                rows: result.rows,
                            });
                        }else if( result.rows.length > 0){
                            //IF MATCH
                            console.log("weather");
                            console.log(result.rows);
                            //user = un
                            res.render("view.ejs", {
                                user: currentUser,
                                high: result1.rows[0].hight,
                                low: result1.rows[0].lowt,
                                windmax: result1.rows[0].windmax,
                                precipmax: result1.rows[0].precipmax,
                                rows: result.rows,
                            });
                        }
                    });
            });
    });//todo wind rain etc

    //CREATE
    //TODO
    app.get("/show", (req, res) => {
        console.log(req.body);
        client.query(//req.body
            "INSERT INTO users(id, username, password)VALUES(1, 'username', 'password');",
            (err, result) => {
                if (err) return console.log("Error: " + err);
                console.log("Successfully saved to the database!");
                //res.redirect("/show");
                res.render("show.ejs");
            }
        );
    }); //ATD
    app.get("/createGenericAccount", (req, res) => {
        client.query(//req.body
            "INSERT INTO users(id, username, password)VALUES(12, 'un2', 'pw2');",
            (err, result) => {
                if (err) return console.log("Error: " + err);
                console.log("Successfully saved to the database!");
            }
        );
        client.query(//req.body
            "INSERT INTO users(id, username, password)VALUES(1, 'un', 'pw');",
            (err, result) => {
                if (err) return console.log("Error: " + err);
                console.log("Successfully saved to the database!");
            }
        );
        //res.redirect("/show");
        res.render("show.ejs");
    }); //ATD
    app.get("/select", (req, res) => {
        client.query(//req.body
            "SELECT * FROM users" +
            //" WHERE username = 'un'" +
            //" AND password = 'pw'" +
            //"" +
            ";"
            ,
            function (err, result) {
                if (err) throw err;
                console.log(result.rows);
                res.send(result.rows)
            });
    });//DTA //show all users

    //SIGNUP - ATD
    //111
    app.route("/create/:un/:pw/")
        .get((req, res) => {
            let un = sanitize(String(req.params.un));
            let id = 0
            let pw = sanitize(String(req.params.pw));
            let Qstring = "INSERT INTO users(id, username, password, lowT, highT,precipMax,windMax)VALUES("
                + id + ", '"
                + un + "', '"
                + pw + "', '"
                + '32' + "', '"//default low temp
                + '65' + "', '"//default low temp
                + '10' + "', '"//default rain
                + '10' +"');"; //default wind
            if(isAlphaNumeric(un) && isAlphaNumeric(pw)) {
                client.query(//req.body
                    "SELECT * FROM users" +
                    ";"
                    ,
                    function (err, result) {
                        console.log(result.rows.length);
                        if (result.rows.length > 0) {
                            id = result.rows.length
                        } else {
                            id = 0
                        }
                        client.query(//req.body
                            "INSERT INTO users(id, username, password, lowT, highT,precipMax,windMax, email, frequency)VALUES(" + id + ", '" + un + "', '" + pw + "', '" + '32' + "', '" + '65' + "', '" + '10' + "', '" + '10' + "', '" + 'email@.com' + "', '" + 'daily' + "');",

                            (err, result) => {
                                console.log(Qstring);
                                if (err) {
                                    res.render('signup.ejs', {
                                        signUpStatus: 'Sign up failed'
                                    })
                                    return console.log("Error: " + err);
                                } else {
                                    console.log("Successfully saved to the database!");
                                    res.render('signup.ejs', {
                                        signUpStatus: 'Sign up successful'
                                    })
                                }
                            }
                        ); //end insert user
                    }); //end select rowcount
            }else{
                res.render('signup.ejs', {
                    signUpStatus: 'Sign up failed'
                })
            }
        }); //end get
    let user =''
    //LOGIN
    //222
    app.route("/login/:un/:pw")
        .get((req, res) => {
            let un = sanitize(String(req.params.un));
            let pw = sanitize(String(req.params.pw));

            let Qstring =
                "SELECT * FROM users" +
                " WHERE username = '" + un + "'" +
                " AND password = '" + pw + "'" +
                "" +
                ";"

            if(isAlphaNumeric(un) && isAlphaNumeric(pw)) {
            //GET ROWS FOR UN AND PW
            client.query(//req.body
                "SELECT * FROM users" +
                " WHERE username = '" + un + "'" +
                " AND password = '" + pw + "'" +
                "" +
                ";",
                (err, result) => {
                    if (err) return console.log("Error: " + err);
                    console.log(Qstring);
                    if( result.rows.length == 0) {
                        //IF ZERO
                        console.log("no login found");
                        res.render("login.ejs", {
                            user: 'Error Login Wrong'
                        });
                    }else if( result.rows.length > 0){
                        //IF MATCH
                        console.log("login successful");
                        user = un
                        res.redirect('/home' + "/" + un);
                    }
                });
        }else{
        res.render("login.ejs", {
            user: 'Error Login Wrong'
        });
    }
        });
    //333
    app.route("/setTemp/:low/:high/:precipMax/:windMax")
        .get((req, res) => {
            let low = sanitize(String(req.params.low));
            let high = sanitize(String(req.params.high));
            let precipMax = sanitize(String(req.params.precipMax));
            let windMax = sanitize(String(req.params.windMax));

            let Qstring =
            "UPDATE users " +
            "SET lowt = '" + low + "'," + " hight = '" + high + "' " + "'," + " precipMax = '" + precipMax + "' " + "'," + " windMax = '" + windMax + "' " +
            "WHERE username = '" + user + "'" +
            "" +
            ";";

            if(isAlphaNumeric(low) && isAlphaNumeric(high)&& isAlphaNumeric(precipMax)&& isAlphaNumeric(windMax)) {
                //GET ROWS FOR UN AND PW
                client.query(//req.body
                    "UPDATE users " +
                    "SET lowt = '" + low + "'," + " hight = '" + high + "'," + " precipMax = '" + precipMax + "'," + " windMax = '" + windMax + "' " +
                    "WHERE username = '" + user + "'" +
                    "" +
                    ";",
                    (err, result) => {
                        console.log(Qstring);
                        if (err) return console.log("Error: " + err);

                        res.redirect('/home' + "/" + user);
                    });
            }else{
                res.redirect('/home' + "/" + user);

            }
        });
    //444
    app.route("/setNotice/:email/:freq")
        .get((req, res) => {
            let email = sanitize(String(req.params.email));
            let freq = sanitize(String(req.params.freq));

            let Qstring =
                "UPDATE users " +
                "SET email = '" + email + "'," + " frequency = '" + freq + "' " +
                "WHERE username = '" + user + "'" +
                "" +
                ";";
            if(isAlphaNumeric(email) && isAlphaNumeric(freq)) {
                //GET ROWS FOR UN AND PW
                    client.query(//req.body

                        "UPDATE users " +
                        "SET email = '" + email + "'," + " frequency = '" + freq + "' " +
                        "WHERE username = '" + user + "'" +
                        "" +
                        ";",
                    (err, result) => {
                        console.log(Qstring);
                        if (err) return console.log("Error: " + err);

                        res.redirect('/home' + "/" + user);
                    });
            }else{
                res.redirect('/home' + "/" + user);

            }
            //GET ROWS FOR UN AND PW
        });
    //555
    app.route("/addLocation/:user/:name/:lat/:long/:weather")
        .get((req, res) => {
            let locUser = sanitize(String(req.params.user));
            let name = sanitize(String(req.params.name));
            let lat = sanitize(String(req.params.lat));
            let long = sanitize(String(req.params.long));
            let weather = String(req.params.weather);
            let rain = "";
            let wind = "";


            if(name == "vantage"){
                weather = "46";
                rain = "5";
                wind = "8";
            }else if(name == "antarctica"){
                weather = "2";
                rain = "0";
                wind = "34";
            }else if(name == "seattle"){
                weather = "48";
                rain = "60";
                wind = "3";
            }else{
                weather = "46";
                rain = "5";
                wind = "8";
            }
            let Qstring = "INSERT INTO locations(username, name, latitude, longitude, precip, wind, temperature)VALUES('" +
                locUser + "', '" +
                name + "', '" +
                lat + "', '" +
                long + "', '" +
                rain + "', '" +
                wind + "', '" +
                weather +"');";
        if (isAlphaNumeric(rain)&& isAlphaNumeric(lat)
            && isAlphaNumeric(wind)&& isAlphaNumeric(long)
            && isAlphaNumeric(weather)&& isAlphaNumeric(name)){
        client.query(//req.body
            "INSERT INTO locations(username, name, latitude, longitude, precip, wind, temperature)VALUES('" +
            user + "', '" +
            name + "', '" +
            lat + "', '" +
            long + "', '" +
            rain + "', '" +
            wind + "', '" +
            weather + "');"
            ,
            function (err, result) {
                console.log(Qstring);
                if (err) return console.log("Error: " + err);
                res.redirect("/home/" + user + "/")
            }); //end select rowcount
    }else{
            res.redirect("/home/" + user + "/")
    }
        });

    //app.listen(8080);
    //app.set("view engine", "ejs");
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));

    client.query("DROP TABLE users", (err, res) => {
        console.log(err, res);
    });
    client.query("DROP TABLE locations", (err, res) => {
        console.log(err, res);
    });
    client.query("CREATE TABLE users(id SERIAL PRIMARY KEY, username TEXT, password TEXT, lowT TEXT, highT TEXT, precipMax TEXT, windMax TEXT, email TEXT, frequency TEXT);", (err, res) => {
        console.log(err, res);
    });
    client.query("CREATE TABLE locations(username TEXT, name TEXT, longitude TEXT, latitude TEXT, temperature TEXT, precip TEXT, wind TEXT);", (err, res) => {
        console.log(err, res);
    });

    function sanitize(str){
        var str2 = "1";
        let j = 1
        for(let i = 0; i < str.length; i++){
            if(str[i] != '/'
                && str[i] != "-"
                && str[i] != "^"
                && str[i] != "/"
                && str[i] != "\""
                && str[i] != "\\"
                && str[i] != "\n"
                && str[i] != "\'"
                && str[i] != "+"
                && str[i] != "="
                && str[i] != "*"
            ) {
                str2 = str2.replaceAt(i, str[i]);
            }else{
                j++
            }
        }
        return str2;
    }
    function isAlphaNumeric(str) {
        var code, i, len;

        for (i = 0, len = str.length; i < len; i++) {
            code = str.charCodeAt(i);
            if (!(code > 47 && code < 58) && // numeric (0-9)
                !(code > 63 && code < 91) && // upper alpha (A-Z) + @
                !(code > 45 && code < 47) && // period
                !(code > 96 && code < 123)) { // lower alpha (a-z)
                return false;
            }
        }
        return true;
    };
    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    //localhost:8080/
    //localhost:8080/edit/someIdValue/
    //localhost:8080/delete/someIdValue/
    //localhost:8080/api/playlists

    //http://localhost:3000/createGenericAccount?
    //http://localhost:3000/select
    //http://localhost:3000/show
    //http://localhost:3000/