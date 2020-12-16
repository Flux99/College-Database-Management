const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const Sequelize = require("sequelize");
const cookieParser = require('cookie-parser');

//Authentication
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

const connection = new Sequelize("new", "root", "password", {
  dialect: 'sqlite',
  storage: 'database.sqlite'
});
sessionStore = new SequelizeStore({
    db: connection
  }),
  app.use(session({
    secret: 'abhisheksingh',
    resave: false,
    store: sessionStore,
  
    saveUninitialized: false,
 
  }));

app.use(passport.initialize());
app.use(passport.session());


var name;
var teachername;
var studentname;
passport.use('student-local', new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);


    User.findOne({
      where: {
        UserID: username
      }
    }).then(userFound => {
      var users = userFound.UserID;
      console.log("userFound" + users);
      if (users.length === 0) {
        done(null, false);
      } else
      if (userFound.studentId != null) {
        Student.findOne({
          where: {
            id: userFound.studentId
          }
        }).then(studentFound => {
          console.log("studentFound");
          studentname = studentFound.fullname;
          console.log("studentFound:" + studentname);
          console.log(userFound.Password.toString());
          const hash = userFound.Password.toString();
          bcrypt.compare(password, hash, function(err, result) {
            if (result == true) {
              return done(null, {
                user_id: userFound.id,
                studentId:userFound.studentId
              });
              //res.redirect("/student");
            } else {
              return done(null, false);
            }
          });
        });


      } else if (!userFound) {
        console.log("userNot Found");
        return done(null, false);
      }

    });
  }

));



passport.use('teacher-local', new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);

   
    User.findOne({
      where: {
        UserID: username
      }
    }).then(userFound => {
      var users = userFound.UserID;
      console.log("userFound" + users);
      if (users.length === 0) {
        done(null, false);
      } else if (userFound.teacherId != null) {
        Teacher.findOne({
          where: {
            id: userFound.teacherId
          }
        }).then(teacherFound => {
          teachername = teacherFound.fullname;
          console.log("name" + teachername);
        });
        console.log(userFound.Password.toString());
        const hash = userFound.Password.toString();
        bcrypt.compare(password, hash, function(err, result) {
          if (result == true) {

            return done(null, {
              user_id: userFound.id
            });
            
          } else {
            return done(null, false);
          }
        });

      } else if (!userFound) {
        return done(null, false);
      }




    });
  }
));
passport.use('admin-local', new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);

    // User.findOne({
    //   where: {
    //     UserID: username
    //   }
    // })
    User.findOne({
      where: {
        UserID: username
      }
    }).then(userFound => {
      var users = userFound.UserID;
      console.log("userFound" + users);
      if (users.length === 0) {
        done(null, false);
      } else if (userFound.username === "admin") {
        name = userFound.UserID;
        console.log(name);
        console.log(userFound.Password.toString());
        const hash = userFound.Password.toString();
        bcrypt.compare(password, hash, function(err, result) {
          if (result == true) {
            return done(null, {
              user_id: userFound.id
            });
            //res.redirect("/admin");
          } else {
            return done(null, false);
          }
        });

      } else if (!userFound) {
        return done(null, false);
      }




    });
  }
));


const Parent = connection.define('parent', {

  mothername: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mothernumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  motheremail: {
    type: Sequelize.STRING,

  },
  motheredu: {
    type: Sequelize.STRING,

  },
  motherincome: {
    type: Sequelize.STRING,

  },
  motheroccupation: {
    type: Sequelize.STRING,

  },
  fathername: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fathernumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fatheremail: {
    type: Sequelize.STRING,

  },
  fatheredu: {
    type: Sequelize.STRING,

  },
  fatherincome: {
    type: Sequelize.STRING,

  },
  fatheroccupation: {
    type: Sequelize.STRING,

  }

 
});


const Student = connection.define('student', {
 
  year: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  marksheetName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  aadharcard: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateofbirth: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  placeofbirth: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Maritalstatus: {
    type: Sequelize.STRING,
    allowNull: false
  },
  employmentstatus: {
    type: Sequelize.INTEGER
  },
  religion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mothertongue: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }

 
});



Student.belongsTo(Parent);



const Academic = connection.define('academic', {
  Studentaadharcard: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Xthboard: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Xthpercentage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  XIIthboard: {
    type: Sequelize.STRING,
    allowNull: false
  },
  XIIthpercentage: {
    type: Sequelize.STRING,
    allowNull: false
  }

});
Student.belongsTo(Academic);

const User = connection.define('user', {
  UserID: {
    type: Sequelize.STRING,
    unique: true
  },
  Password: {
    type: Sequelize.STRING
  }
});
//connection.sync();




const Teacher = connection.define('teacher', {

  TeacherID: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Aadharcard: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateofbirth: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Semester = connection.define('semester', {
  aadharcard: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  fullname: {
    type: Sequelize.STRING
  },
  sem: {
    type: Sequelize.INTEGER
  },
  semCGPA: {
    type: Sequelize.FLOAT
  },
  semKT: {
    type: Sequelize.INTEGER
  }
});

const Sem = connection.define('sem', {
  Year: {
    type: Sequelize.STRING
  },
  Sem: {
    type: Sequelize.STRING
  },
  fullname: {
    type: Sequelize.STRING
  },
  teacherID: {
    type: Sequelize.STRING
  },
  subjectcode: {
    type: Sequelize.STRING
  },
  Marks: {
    type: Sequelize.STRING
  }
});

Sem.belongsTo(Student);
//connection.sync();

app.post("/substudent", function(req, res) {
  const year = req.body.year;
  const sem = req.body.sem;
  const fullName = req.body.fullname;
  const marks = req.body.marks;
  const subCode = req.body.subcode;
  const teacherId = req.body.teacherid;


  const newData = {
    teacherID: teacherId,
    Marks: marks
  }
  var user;

  Sem.findOne({
    where: {
      Year: year,
      Sem: sem,
      fullname: fullName,
      teacherID: teacherId,
      subjectcode: subCode
    }
  }).then(userFound => {

    if (userFound) {

      Sem.update(newData, {
          where: {
            Year: year,
            Sem: sem,
            fullname: fullName,
            teacherID: teacherId,
            subjectcode: subCode
          }
        })
        .then(updatedMax => {
          console.log(updatedMax);
          console.log("Studentfound and Updated!");
        });
    } else {

      console.log("Not Found");
      Student.findOne({
        where: {
          fullname: fullName,
          year: year
        }
      }).then(userFound => {
        if (userFound) {
          user = userFound;
          console.log(userFound);
          return Sem.create({
            Year: year,
            Sem: sem,
            fullname: fullName,
            teacherID: teacherId,
            subjectcode: subCode,
            Marks: marks
          }).then(sem => {
            sem.setStudent(user.id);
            console.log("Dude Its Done");
          });

        } else {
          console.log("Nananananana Not Found");
        }
      });
      console.log("Sem created");
    }
  });

});




const Attendance = connection.define('attendance', {
  fullname: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  teacherID: {
    type: Sequelize.STRING
  },
  Month: {
    type: Sequelize.STRING
  },
  Attendance: {
    type: Sequelize.STRING
  }

});


app.get("/teachersub", function(req, res) {
  Sem.findAll()
    .then(userData => {
      res.render("teachersub", {
        userData
      });
    });
});

app.post("/teacherdelete", function(req, res) {
  const name = req.body.fullname;

  Teacher.destroy({
    where: {
      fullname: name
    }
  }).then(deleted => {
    console.log(deleted);
    console.log("Studentfound and Deleted!");
  });
  res.render("teachersub");
});

Attendance.belongsTo(Student);
User.belongsTo(Student);
User.belongsTo(Teacher);


app.post("/att", function(req, res) {

  const fullName = req.body.fullname;
  const month = req.body.month;
  //const subjectCode = req.body.subjectcode;
  const attendance = req.body.attendance;
  const teacherId = req.body.empid;


  const newData = {
    Attendance: attendance
  }
  var user;
  //Start of att

  Attendance.findOne({
    where: {
      fullname: fullName,
      teacherID: teacherId,
      Month: month
    }
  }).then(userFound => {
    if (userFound) {
      Attendance.update(newData, {
          where: {
            fullname: fullName,
            teacherID: teacherId,
            Month: month
          }
        })
        .then(updatedMax => {
          console.log(updatedMax);
          console.log("Studentfound and Updated!");
        });
    } else {

      console.log("Not Found");
      Student.findOne({
        where: {
          fullname: fullName
        }
      }).then(userFound => {
        if (userFound) {
          user = userFound;
          console.log(userFound);
          return Attendance.create({
            fullname: fullName,
            teacherID: teacherId,
            Month: month,
            Attendance: attendance
          }).then(att => {
            att.setStudent(user.id);
            console.log("Dude Its Done");
          });

        } else {
          console.log("Nananananana Not Found");
        }
      });
      console.log("Sem created");
    }
  });


  //End of att
});


app.get("/att", function(req, res) {
  Attendance.findAll()
    .then(userData => {
      res.render("teacheratt", {
        userData
      });
    });
});





app.get("/register", function(req, res) {
 
  res.render("register");
});

app.get("/Logout", function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

var student_user;
app.post("/register", function(req, res) {
  console.log("post/register");

  const aadharcard = req.body.aadharnumber;
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    

    var user;
    Student.create({
      year: req.body.selectpickeryear,
      fullname: req.body.fullname,
      marksheetName: req.body.marksheetname,
      aadharcard: aadharcard,
      gender: req.body.gender2,
      dateofbirth: req.body.dateofbirth,
      placeofbirth: req.body.placeofbirth,
      nationality: req.body.nationality,
      phoneNumber: req.body.mobile,
      email: req.body.email,
      Maritalstatus: req.body.selectpicker,
      employmentstatus: req.body.employment,
      religion: req.body.religion,
      mothertongue: req.body.mothertongue,
      address: req.body.address,
     
    }).then(created => {
      console.log(created);
      user = created;
      return Parent.create({
        mothername: req.body.mothernamex,
        mothernumber: req.body.mothernumber,
        motheremail: req.body.motheremail,
        motheredu: req.body.motheredu,
        motherincome: req.body.motherincome,
        motheroccupation: req.body.fatherocc,
        fathername: req.body.fathername,
        fathernumber: req.body.fathernumber,
        fatheremail: req.body.fatheremail,
        fatheredu: req.body.fatheredu,
        fatherincome: req.body.fatherincome,
        fatheroccupation: req.body.fatherocc
      }).then(parent => {
        console.log(parent);
        user.setParent(parent.id);
        return Academic.create({
          Studentaadharcard: aadharcard,
          Xthboard: req.body.selectpickerx,
          Xthpercentage: req.body.percentagex,
          XIIthboard: req.body.selectpickerxx,
          XIIthpercentage: req.body.percentagexx
        }).then(academic => {
          user.setAcademic(academic.id);
          return User.create({
            UserID: req.body.email,
            Password: hash
          }).then(userAccount => {
            userAccount.setStudent(user.id);
          });
        });
      });

    });

    res.render("home");
    console.log("post/register Completed");



  });
});


app.post('/checkaadhar', function(req, res) {
  const aadharNumber = req.body.aadharnumber;
  console.log("uu" + aadharNumber);
  console.log("post/checkaadhar");
  Student.findOne({
    where: {
      aadharcard: aadharNumber
    }
  }).then(userFound => {
    if (userFound) {
     
      res.send("False");
      console.log("userFound Done!");
    } else {
      res.send("True");
      console.log(" user Not Done!");
    }
  });

});


app.get("/teacher", function(req, res) {
  console.log(name);
  res.render("teacher", {
    user: name
  });
  
});

var teacheruser_id;

app.get("/", function(req, res) {
  console.log(studentname);
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render("home");
});




//start of deleted

app.get("/studentdelete",passport.authenticate('student-local', function(req, res) {
  Student.destroy({
    where: {
      fullname: studentname //this will be your id that you want to delete
    }
  }).then(userFound => { // rowDeleted will return number of rows deleted
    console.log(userFound);
    if (userFound == 1) {
      console.log('userFound successfully');
      res.redirect("/student");
    } else {
      console.log("userFound error");
    }
  });
}));

//end of delete
app.get("/studentlogin", function(req, res) {

  res.render("studentlogin");
  
});
app.get("/editstudent", authenticationMiddleware(),function(req, res) {
  console.log(studentname);
  console.log(req.user);
  console.log(req.isAuthenticated());

  res.render("editstudent",
  {
    user: studentname
  });
  
});
app.get("/editteacher", authenticationMiddleware(),function(req, res) {

  res.render("editteacher");
  
});

app.post("/editstudent", authenticationMiddleware(), function(req, res){
  console.log(studentname);
  console.log(req.user);
  console.log(req.isAuthenticated());
  const aadharcard = req.body.aadharnumber;
  var studentmail;
  var userId;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  const newData = ({
    fullname: req.body.fullname,
    marksheetName: req.body.marksheetname,
    aadharcard: aadharcard,
    gender: req.body.gender2,
    dateofbirth: req.body.dateofbirth,
    placeofbirth: req.body.placeofbirth,
    nationality: req.body.nationality,
    phoneNumber: req.body.mobile,
    email: req.body.email,
    Maritalstatus: req.body.selectpicker,
    employmentstatus: req.body.employment,
    religion: req.body.religion,
    mothertongue: req.body.mothertongue,
    address: req.body.address,
  });
  const newMail = ({

    UserID: req.body.email,
    Password:hash
  });

  Student.findOne({
    where: {
      fullname: studentname
    }
  }).then(userFound=>{
    if(userFound){
    studentmail=userFound.email;

    Student.update(newData, {
        where: {
          fullname: studentname
        }
      })
      .then(updatedMax => {
        console.log(updatedMax);
        User.findOne({
          where: {
            UserID: studentmail
          }
        }).then(userFound=>{
          if(userFound){
            User.update(newMail, {
                where: {
                  UserID: req.body.email
                }
              })
              .then(updatedMax => {
                console.log(updatedMax);

              });
          }else{
            console.log("UseID NOt Found");
          }

        });
        
      });

    }else{
      console.log("Student User Not Found");
    }

  });
    });


});

app.post("/studentlogin", passport.authenticate('student-local', {
  successRedirect: "/student",
  failureRedirect: "/studentlogin"
}));

app.get("/student", authenticationMiddleware(), function(req, res) {
  console.log("studentname authenticationMiddleware"+studentname);
  console.log("studentId authenticationMiddleware"+req.user.studentId);
  var studentId=req.user.studentId;
  console.log(req.isAuthenticated());
 
  var student;
  Student.findOne({
    where: {
      id: studentId
    }
  }).then(userFound=>{
    if(!userFound){
      console.log("Not Found Student:");
    }else{
      studentname=userFound.fullname
    }

  });
  Semester.findOne({
    where: {
      fullname: studentname
    }
  }).then(studentFound => {
    student = studentFound;
    if (!studentFound) {
      console.log("Not Found");
    } else {
      console.log("Found");

    }
    res.render("student", {
      user: studentname,
      userData: student
    });
  });

  
});
app.get("/studentmarks", authenticationMiddleware(), function(req, res) {
  console.log(studentname);
  console.log(req.user);
  console.log(req.isAuthenticated());
  
  var student;
  Sem.findOne({
    where: {
      fullname: studentname
    }
  }).then(studentFound => {
    student = studentFound;
    if (!studentFound) {
      console.log("Not Found");
    } else {
      console.log("Found");
    }
  });
  res.render("studentmarks", {
    user: studentname,
    userData: student
  });
});

app.get("/studentattendance", authenticationMiddleware(), function(req, res) {
  console.log(studentname);
  console.log(req.user);
  console.log(req.isAuthenticated());

  var student;
  Attendance.findOne({
    where: {
      fullname: studentname
    }
  }).then(studentFound => {
    student = studentFound;
    if (!studentFound) {
      console.log("Not Found");
    } else {
      console.log("Found");
    }
  });
  res.render("studentattendance", {
    user: studentname,
    userData: student
  });
});


app.post("/teacherlogin", passport.authenticate("teacher-local", {
  successRedirect: "/teacher1",
  failureRedirect: "/login"
}));




app.post("/teacher", function(req, res) {
  console.log("postteacher kamini");
  var user;

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //console.log(hash);
    Teacher.create({
      TeacherID: req.body.empid,
      Aadharcard: req.body.aadharnumber,
      fullname: req.body.fullname,
      address: req.body.address,
      gender: req.body.gender2,
      dateofbirth: req.body.dateofbirth,
      phoneNumber: req.body.mobile,
      email: req.body.email,
    }).then(teacher => {
      console.log("Teachers" + user);
      user = teacher;
      return User.create({
        UserID: req.body.email,
        Password: hash
      }).then(userAccount => {
        console.log("User is made" + userAccount);
        userAccount.setTeacher(user.id);
        console.log("User_ID:" + userAccount.id);
        user_id = userAccount.id;
        req.login(user_id, err => {
          res.redirect("/");
        });

      });

    });
  });
  console.log("Completed");
  //res.send("Done!");
});
//start of edit
app.post("/editteacher", authenticationMiddleware(), function(req, res){
  console.log(teachername);
  console.log(req.user);
  console.log(req.isAuthenticated());
  const aadharcard = req.body.aadharnumber;
  var teachermail;
  var userId;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  const newData = ({
    TeacherID: req.body.empid,
    Aadharcard: req.body.aadharnumber,
    fullname: req.body.fullname,
    address: req.body.address,
    gender: req.body.gender2,
    dateofbirth: req.body.dateofbirth,
    phoneNumber: req.body.mobile,
    email: req.body.email,
  });
  const newMail = ({

    UserID: req.body.email,
    Password:hash
  });

  Teacher.findOne({
    where: {
      fullname: teachername
    }
  }).then(userFound=>{
    if(userFound){
    teachermail=userFound.email;

    Teacher.update(newData, {
        where: {
          fullname: teachername
        }
      })
      .then(updatedMax => {
        console.log(updatedMax);
        User.findOne({
          where: {
            UserID: teachermail
          }
        }).then(userFound=>{
          if(userFound){
            User.update(newMail, {
                where: {
                  UserID: req.body.email
                }
              })
              .then(updatedMax => {
                console.log(updatedMax);
                //res.send("Done!");

              });
          }else{
            console.log("UseID NOt Found");
          }

        });
        //res.send("Done!");
      });

    }else{
      console.log("Student User Not Found");
    }

  });
    });


});

//end of update
app.get("/teacherdelete", authenticationMiddleware(), function(req, res) {
  console.log(teachername);
  console.log(req.user);
  console.log(req.isAuthenticated());
  Teacher.destroy({
    where: {
      fullname: teachername //this will be your id that you want to delete
    }
  }).then(userFound => { // rowDeleted will return number of rows deleted
    console.log(userFound);
    if (userFound == 1) {
      console.log('userFound successfully');
      res.redirect("/teacher1");
    } else {
      console.log("userFound error");
    }
  });
});
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);

});
app.get("/teacher1", authenticationMiddleware(), function(req, res) {
  console.log(teachername);
  res.render("teacher1", {
    user: teachername
  });
  
});

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }
}


app.post('/teachercheckaadhar', function(req, res) {
  const empid = req.body.empid;
  console.log("teachercheckaadhar" + empid);
  Teacher.findOne({
    where: {
      TeacherID: empid
    }
  }).then(userFound => {
    if (userFound) {
      res.jsonp("False");
      console.log("userFound Done!");
    } else {
      res.jsonp("True");
      console.log("user NotFound!");
    }
  });
});

app.get("/Editprofile", function(req, res) {

  res.render("login");
});




app.get("/teacherlogin", function(req, res) {
  //console.log(name);
  res.render("teacherlogin");
});

app.post("/login", function(req, res) {

  res.send("Done!");
});



app.get("/second", function(req, res) {

  res.render("second");
});


app.post("/second", function(req, res) {

  Semester.create({
    aadharcard: req.body.aadharnumber,
    semIKT: req.body.selectpickerI,
    semICGPA: req.body.sem1cgpa,
    semIIKT: req.body.selectpickerII,
    semIICGPA: req.body.sem2cgpa
  });

  const newData = ({
    year: "2"
  });

  Student.update(newData, {
      where: {
        aadharcard: req.body.aadharnumber
      }
    })
    .then(updatedMax => {
      console.log(updatedMax);
      res.send("Done!");
    });

});




// Admin

app.get("/adminlogin", function(req, res) {

  res.render("index");
});

app.post("/announment", function(req, res) {
  
});
app.get("/admin", function(req, res) {
  console.log(name);
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render("index", {
    user: name
  });
  //res.render("index");
});

app.get("/adminstudent", function(req, res) {

  Student.findAll()
    .then(userData => {

      //res.render("adminteacher",{data:data});
      res.render("studentdetails", {
        userData
      });
    });

});

//connection.sync();
app.get("/student/:user", function(req, res) {
  const useraadharNumber = req.params.user;
  console.log(useraadharNumber);
  Student.destroy({
    where: {
      id: useraadharNumber //this will be your id that you want to delete
    }
  }).then(userFound => { // rowDeleted will return number of rows deleted
    console.log(userFound);
    if (userFound == 1) {
      console.log('userFound successfully');
      res.redirect("/adminstudent");
    } else {
      console.log("userFound error");
    }
  });
});
// studentsub
app.get("/studentsub", function(req, res) {


  Sem.findAll()
    .then(userData => {

      //res.render("adminteacher",{data:data});
      res.render("substudent", {
        userData
      });
    });

});

app.get("/studentsub/:user", function(req, res) {
  const user = req.params.user;
  console.log(user);
  Sem.destroy({
    where: {
      id: user //this will be your id that you want to delete
    }
  }).then(userFound => { // rowDeleted will return number of rows deleted
    console.log(userFound);
    if (userFound == 1) {
      console.log('userFound successfully');
      res.redirect("/studentsub");
    } else {
      console.log("userFound error");
    }
  });
});



app.get("/studentatt", function(req, res) {

  Attendance.findAll()
    .then(userData => {
      res.render("studentatt", {
        userData
      });
    });
});


app.get("/studentatt/:user", function(req, res) {
  const user = req.params.user;
  console.log(user);
  Sem.destroy({
    where: {
      id: user //this will be your id that you want to delete
    }
  }).then(userFound => { // rowDeleted will return number of rows deleted
    console.log(userFound);
    if (userFound == 1) {
      console.log('userFound successfully');
      res.redirect("/studentatt");
    } else {
      console.log("userFound error");
    }
  });
});
//studentatt


app.get("/adminteachersub", function(req, res) {


  Sem.findAll()
    .then(userData => {

      //res.render("adminteacher",{data:data});
      res.render("subteacher", {
        userData
      });
    });

});


app.get("/subject/:delete", function(req, res) {
  const deleteStudent = req.params.delete
  console.log(deleteStudent);
  Sem.destroy({
    where: {
      id: deleteStudent //this will be your id that you want to delete
    }
  }).then(function(rowDeleted) { // rowDeleted will return number of rows deleted
    if (rowDeleted === 1) {
      console.log('Deleted successfully');
      res.redirect("/adminteachersub");
    }
  }, function(err) {
    console.log(err);
  });


});




app.get("/adminteacher", function(req, res) {


  Teacher.findAll()
    .then(userData => {
      //res.render("adminteacher",{data:data});
      res.render("detailstaff", {
        userData
      });
    });



});

app.get("/user/:delete", function(req, res) {
  const deleteStudent = req.params.delete
  console.log(deleteStudent);
  Teacher.destroy({
    where: {
      TeacherID: deleteStudent //this will be your id that you want to delete
    }
  }).then(function(rowDeleted) { // rowDeleted will return number of rows deleted
    console.log(rowDeleted);
    if (rowDeleted === 1) {
      console.log('Deleted successfully');
      res.redirect("/adminteacher");
    }
  }, function(err) {
    console.log(err);
  });


});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
