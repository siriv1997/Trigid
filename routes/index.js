var express = require('express');
var router = express.Router();
var monk = require('monk');
var mailer=require('nodemailer');
var multer=require('multer');
var nodemon =require('nodemon');
var db=monk('localhost:27017/3d');
console.log('connected');
var Collection=db.get('data');
var signup=db.get('signup');
var contact=db.get('contact');
var printers=db.get('printers');
var filament=db.get('filament');
var fs = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploadimages/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var upload = multer({ storage: storage })
/* GET home page. */
router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Express' });
});
router.get('/miniorder', function(req, res, next) {
  res.render('miniorder', { title: 'Express' });
});
router.get('/keychainorder', function(req, res, next) {
  res.render('keychainorder', { title: 'Express' });
});
router.get('/portrait', function(req, res, next) {
  res.render('portrait', { title: 'Express' });
});
router.get('/silverorder', function(req, res, next) {
  res.render('silverorder', { title: 'Express' });
});
router.get('/filamentsorder', function(req, res, next) {
  res.render('filamentsorder', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/magic_frame', function(req, res, next) {
	var mail = req.param('username');
  res.render('magic_frame');
});
router.get('/gallery',function(req,res,next){
	res.render('gallery');
});
router.get('/about',function(req,res,next){
	res.render('about');
});
router.get('/contact',function(req,res,next){
	res.render('contact');
});
router.get('/testimonials',function(req,res,next){
	res.render('testimonials');
});
router.get('/3d',function(req,res,next){
	res.render('3d');
});
router.get('/order',function(req,res,next){
	res.render('order');
})
router.get('/filament',function(req,res){
	res.render('filament');
})
router.get('/printers',function(req,res){
	res.render('printers');
})
router.get('/order1',function(req,res){
	res.render('order1');
})
router.get('/filamentsorder',function(req,res){
	res.render('filamentsorder');
})
router.get('/filamentsorder1',function(req,res){
	res.render('filamentsorder1');
})

router.post('/signup',function(req,res,next){
	/*var name=req.body.name;
	var mail=req.body.mail;
	var password=req.body.password;
	var cnfrmpassword=req.body.cnfrmpassword;
	var phonenumber=req.body.phonenumber;
	console.log(name);
	console.log(mail);
	console.log(password);
	console.log(cnfrmpassword);
	console.log(phonenumber);*/
	var data={ 

		Name:req.body.name,
		username:req.body.mail,
		password:req.body.password,
		cnfrmpassword:req.body.cnfrmpassword,
		phonenumber:req.body.phonenumber,
	}
	signup.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	   res.redirect("/");
});	 
router.post('/login',function(req,res)
{
	
	var username=req.body.mail;
	var password=req.body.password;
	/*var role = req.body.Role;*/
	console.log(username);
	console.log(password);
	/*console.log(role);*/
	signup.findOne({"username":username,"password":password},function(err,docs)
	{
	console.log(docs);
		if(!docs)
		{
			console.log("mismatch");
			res.render('Login',{err:"Invalid username or Password"});

		}
		else if (docs) {
			delete docs.password
			/*req.session.user = docs;*/
			console.log("success");
			res.redirect("/")
		}
		else
		{
			console.log(err);
		}
	});

});	
router.post('/data',upload.single('image'),function(req,res)
{
	var data={ 

		Fname:req.body.name,
		Phnumber:req.body.phone,
		username:req.body.email,
		caption:req.body.caption,
		Colour:req.body.Colour,
		Stickies:req.body.stickies,
		stickiescolour:req.body.stickiescolour,
		Product_type:req.body.Producttype,
		address:req.body.Address,
	    img:req.file.originalname,

	}

	var transporter = mailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'siriv1997@gmail.com',
    pass: 'surendra@gmail',
  }
});
/*var img = fs.readFileSync(../pub);*/ 
  var mailOptions = {
  from: 'siriv1997@gmail.com',
  to: 'v.bharath39@gmail.com',
  subject: 'Order for Golden Magicframe',
  text:'Name:  '     +req.body.name + 
  	   ',Phnumber:  ' +req.body.phone+  
  	   ',Email: '     +req.body.email+ 
  	   ',caption:  '  +req.body.caption+
  	   ',Colour:   '  +req.body.Colour+
  	   ',Stickies:'  +req.body.stickies+
  	   ',stickiescolour:   '  +req.body.stickiescolour+
  	   ',Producttype:'  +req.body.Producttype+
  	   ',Address:  '  +req.body.Address+ 
  	   'Image:    '  +req.file.originalname,
  attachments: [{
  	filename: req.file.originalname,
  	content: fs.createReadStream('./public/uploadimages/'+req.file.originalname)
  }]
 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	Collection.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	res.redirect("magic_frame");
	/*Collection.insertOne(data);*/
});	 
router.post('/mini',upload.single('image'),function(req,res)
{
	var data={ 

		Fname:req.body.name,
		Phnumber:req.body.phone,
		username:req.body.email,
		caption:req.body.caption,
		Colour:req.body.Colour,
		Stickies:req.body.stickies,
		stickiescolour:req.body.stickiescolour,
		Producttype:  req.body.Producttype,
		address:req.body.Address,
	    img:req.file.originalname,

	}

	var transporter = mailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'siriv1997@gmail.com',
    pass: 'surendra@gmail',
  }
});
/*var img = fs.readFileSync(../pub);*/ 
  var mailOptions = {
  from: 'siriv1997@gmail.com',
  to: 'v.bharath39@gmail.com',
  subject: 'Order for Mini ',
  text:'Name:  '     +req.body.name + 
  	   ',Phnumber:  ' +req.body.phone+  
  	   ',Email: '     +req.body.email+ 
  	   ',caption:  '  +req.body.caption+
  	   ',Colour:   '  +req.body.Colour+
  	   ',Stickies:'  +req.body.stickies+
  	   ',stickiescolour:   '  +req.body.stickiescolour+
  	   ',Producttype:'  +req.body.Producttype+
  	   ',Address:  '  +req.body.Address+ 
  	   'Image:    '  +req.file.originalname,
  attachments: [{
  	filename: req.file.originalname,
  	content: fs.createReadStream('./public/uploadimages/'+req.file.originalname)
  }]
 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	Collection.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	res.redirect("magic_frame");
	/*Collection.insertOne(data);*/
});	 
router.post('/portrait',upload.single('image'),function(req,res)
{
	var data={ 

		Fname:req.body.name,
		Phnumber:req.body.phone,
		username:req.body.email,
		caption:req.body.caption,
		Colour:req.body.Colour,
		Stickies:req.body.stickies,
		stickiescolour:req.body.stickiescolour,
		Producttype:  req.body.Producttype,
		address:req.body.Address,
	    img:req.file.originalname,

	}

	var transporter = mailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'siriv1997@gmail.com',
    pass: 'surendra@gmail',
  }
});
/*var img = fs.readFileSync(../pub);*/ 
  var mailOptions = {
  from: 'siriv1997@gmail.com',
  to: 'v.bharath39@gmail.com',
  subject: 'Order from portrait',
  text:'Name:  '     +req.body.name + 
  	   ',Phnumber:  ' +req.body.phone+  
  	   ',Email: '     +req.body.email+ 
  	   ',caption:  '  +req.body.caption+
  	   ',Colour:   '  +req.body.Colour+
  	   ',Stickies:'  +req.body.stickies+
  	   ',stickiescolour:   '  +req.body.stickiescolour+
  	   ',Producttype:'  +req.body.Producttype+
  	   ',Address:  '  +req.body.Address+ 
  	   'Image:    '  +req.file.originalname,
  attachments: [{
  	filename: req.file.originalname,
  	content: fs.createReadStream('./public/uploadimages/'+req.file.originalname)
  }]
 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	Collection.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	res.redirect("magic_frame");
	/*Collection.insertOne(data);*/
});	 
router.post('/silver',upload.single('image'),function(req,res)
{
	var data={ 

		Fname:req.body.name,
		Phnumber:req.body.phone,
		username:req.body.email,
		caption:req.body.caption,
		Colour:req.body.Colour,
		Stickies:req.body.stickies,
		stickiescolour:req.body.stickiescolour,
		Producttype:  req.body.Producttype,
		address:req.body.Address,
	    img:req.file.originalname,

	}

	var transporter = mailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'siriv1997@gmail.com',
    pass: 'surendra@gmail',
  }
});
/*var img = fs.readFileSync(../pub);*/ 
  var mailOptions = {
  from: 'siriv1997@gmail.com',
  to:'v.bharath39@gmail.com',
  subject: 'Order from Silver magic_frames',
  text:'Name:  '     +req.body.name + 
  	   ',Phnumber:  ' +req.body.phone+  
  	   ',Email: '     +req.body.email+ 
  	   ',caption:  '  +req.body.caption+
  	   ',Colour:   '  +req.body.Colour+
  	   ',Stickies:'  +req.body.stickies+
  	   ',Stickiescolour:   '  +req.body.stickiescolour+
  	   ',Address:  '  +req.body.Address+ 
  	   'Image:    '  +req.file.originalname,
  attachments: [{
  	filename: req.file.originalname,
  	content: fs.createReadStream('./public/uploadimages/'+req.file.originalname)
  }]
 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	Collection.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	res.redirect("magic_frame");
	/*Collection.insertOne(data);*/
});	 
router.post('/contact',function(req,res)
{
	var Firstname=req.body.name;
	console.log(Firstname);
	var data={ 

		Firstname:req.body.name,
		Lastname:req.body.lastname,
		Phonenumber:req.body.phonenumber,
		Username:req.body.mail,
		Message:req.body.message,
	}

	var transporter = mailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'siriv1997@gmail.com',
    pass: 'surendra@gmail',
  }
});
/*var img = fs.readFileSync(../pub);*/ 
  var mailOptions1 = {
  from: 'siriv1997@gmail.com',
  to: 'v.bharath39@gmail.com',
  subject: `Message from Customer ${req.body.name}`,
  text:'Name:  '     +req.body.name + 
       'Lastname:'   +req.body.lastname+
  	   ',Phnumber:  ' +req.body.phonenumber+  
  	   'Email: '     +req.body.mail+ 
  	   'Message:  '  +req.body.message,
};

transporter.sendMail(mailOptions1, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	contact.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	res.redirect("contact");
	/*Collection.insertOne(data);*/
});	 
router.post('/data1',function(req,res)
{
	var data={ 

		name:req.body.name,
		Phonenumber:req.body.phone,
		mail:req.body.email,
		Description:req.body.Description,
		Address:req.body.Address,
	}

	var transporter = mailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'siriv1997@gmail.com',
    pass: 'surendra@gmail',
  }
});
/*var img = fs.readFileSync(../pub);*/ 
  var mailOptions2 = {
  from: 'siriv1997@gmail.com',
  to: 'v.bharath39@gmail.com',
  subject: `Message from Customer ${req.body.name} for Printers`,
  text:'Name:  '     +req.body.name + 
  	   ',Phnumber:  ' +req.body.phone+  
  	   ',Email: '     +req.body.email+ 
  	   ',Description:' +req.body.Description+
  	   'Address:  '  +req.body.Address,
};

transporter.sendMail(mailOptions2, function(error, info){ 	
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	printers.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	res.redirect("printers");
	/*Collection.insertOne(data);*/
});	 
router.post('/data2',function(req,res)
{
	var data={ 

		name:req.body.name,
		Phonenumber:req.body.phone,
		mail:req.body.email,
		Description:req.body.Description,
		Colour:req.body.Colour,
		Address:req.body.Address,
		Quantity:req.body.points,
		Type_Of_Filament:req.body.Filament,
	}

	var transporter = mailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'siriv1997@gmail.com',
    pass: 'surendra@gmail',
  }
});
/*var img = fs.readFileSync(../pub);*/ 
  var mailOptions2 = {
  from: 'siriv1997@gmail.com',
  to: 'v.bharath39@gmail.com',
  subject: `Message from Customer ${req.body.name} for filaments`,
  text:'Name:  '     +req.body.name + 
  	   ',Phnumber:  ' +req.body.phone+  
  	   'Email: '     +req.body.email+ 
  	   ',Description:'+req.body.Description+
  	   ',Colour:' +req.body.Colour+
  	   'Address:  '  +req.body.Address+
  	   'Quantity:'  +req.body.points+
  	   'FilamentType:'+req.body.Filament,
};

transporter.sendMail(mailOptions2, function(error, info){ 	
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	filament.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	res.redirect("filament");
	/*Collection.insertOne(data);*/
});	 
router.post('/data3',function(req,res)
{
	var data={ 

		name:req.body.name,
		Phonenumber:req.body.phone,
		mail:req.body.email,
		Description:req.body.Description,
		Colour:req.body.Colour,
		Address:req.body.Address,
		Quantity:req.body.points,
		Type_Of_Filament:req.body.Filament,
	}

	var transporter = mailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'siriv1997@gmail.com',
    pass: 'surendra@gmail',
  }
});
/*var img = fs.readFileSync(../pub);*/ 
  var mailOptions2 = {
  from: 'siriv1997@gmail.com',
  to: 'v.bharath39@gmail.com',
  subject: `Message from Customer ${req.body.name} for filaments`,
  text:'Name:  '     +req.body.name + 
  	   ',Phnumber:  ' +req.body.phone+  
  	   'Email: '     +req.body.email+ 
  	   ',Description:'+req.body.Description+
  	   ',Colour:' +req.body.Colour+
  	   'Address:  '  +req.body.Address+
  	   'Quantity:'  +req.body.points+
  	   'FilamentType:'+req.body.Filament,
};

transporter.sendMail(mailOptions2, function(error, info){ 	
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	filament.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	res.redirect("filament");
	/*Collection.insertOne(data);*/
});	 
router.post('/keychain',upload.single('image'),function(req,res)
{
	var data={ 

		Fname:req.body.name,
		Phnumber:req.body.phone,
		username:req.body.email,
		Producttype:  req.body.Producttype,
		address:req.body.Address,
	    img:req.file.originalname,

	}

	var transporter = mailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'siriv1997@gmail.com',
    pass: 'surendra@gmail',
  }
});
/*var img = fs.readFileSync(../pub);*/ 
  var mailOptions = {
  from: 'siriv1997@gmail.com',
  to: 'siriv1997@gmail.com',
  subject: 'Order for Mini ',
  text:'Name:  '     +req.body.name + 
  	   ',Phnumber:  ' +req.body.phone+  
  	   ',Email: '     +req.body.email+ 
  	   ',Producttype:'  +req.body.Producttype+
  	   ',Address:  '  +req.body.Address+ 
  	   'Image:    '  +req.file.originalname,
  attachments: [{
  	filename: req.file.originalname,
  	content: fs.createReadStream('./public/uploadimages/'+req.file.originalname)
  }]
 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	Collection.insert(data,function(err,data)
	{
		if(err)
		{
			console.log("not sent");
		}
		else
		{
			console.log("send");
		}
	});
	res.redirect("magic_frame");
	/*Collection.insertOne(data);*/
});	 
module.exports = router;
