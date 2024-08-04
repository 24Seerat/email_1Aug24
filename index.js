const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'email_sub'
});

const transporter=nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seerat1247@gmail.com',
    pass: 'qegr ytex wkhi vhpw'
  }
});

app.post('/subscribe',(req,res)=>{
  	const {email}=req.body;

  	db.query('SELECT * FROM users WHERE email=?',[email],(err,results)=>{
    		if (err) return res.status(500).send('Database error');
    		if (results.length > 0) 
		{
      			return res.status(400).send('You have already subscribed');
    		}

    	db.query('INSERT INTO users (email) VALUES (?)',[email],(err)=>{
      		if (err) return res.status(500).send('Database error');

      		const mailOptions={
        		from: 'seerat1247@gmail.com',
        		to: email,
        		subject: 'Congratulations!',
        		text: 'You have successfully subscribed to our newsletter.'
      		};

      		transporter.sendMail(mailOptions,(err)=>{
        		if (err) return res.status(500).send('Email send error');
        		res.send('Subscription successful');
      		});
    	});
  	});
});

app.post('/unsubscribe',(req,res)=>{
	const {email}=req.body;

  	db.query('SELECT * FROM users WHERE email=?',[email],(err, results)=>{
    		if (err) return res.status(500).send('Database error');
    		if (results.length===0) 
		{
      			return res.status(400).send('You are not subscribed');
    		}

    	db.query('DELETE FROM users WHERE email=?',[email],(err)=>{
      		if (err) return res.status(500).send('Database error');

      		const mailOptions={
        		from: 'seerat1247@gmail.com',
        		to: 'seerat1247@gmail.com',
        		subject: 'Sorry to see you go',
        		text: 'You have successfully unsubscribed from our newsletter.'
      		};

      		transporter.sendMail(mailOptions,(err)=>{
        		if (err) return res.status(500).send('Email send error');
        		res.send('Unsubscription successful');
      		});
    	});
  	});
});

app.listen(9000,()=>{console.log('Server is running on port 9000');});
