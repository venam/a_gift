/*
 * Sweet script
 * https://www.dashingd3js.com/svg-paths-and-d3js
 */


function B1(t) { return t*t*t }
function B2(t) { return 3*t*t*(1-t) }
function B3(t) { return 3*t*(1-t)*(1-t) }
function B4(t) { return (1-t)*(1-t)*(1-t) }

function getBezier(percent,C1,C2,C3,C4) {
	var pos = {};
	pos.x = C1.x*B1(percent) + C2.x*B2(percent) + C3.x*B3(percent) + C4.x*B4(percent);
	pos.y = C1.y*B1(percent) + C2.y*B2(percent) + C3.y*B3(percent) + C4.y*B4(percent);
	return pos;
}


function draw_scroll() {
	var scroll = d3.select("#scroll")
		.append("svg")
		.attr("width", 320)
		.attr("height", 120);

	var original = "35px";
	var big = "40px";

	var down = scroll.append("text")
		.attr("transform", "translate(160,20)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("font-size", original)
		.style("text-anchor", "middle")
		.text("Scroll Down");

	scroll.append("text")
		.attr("transform", "translate(160,0)")
		.attr("dy", ".71em")
		.style("font-size", "15px")
		.style("text-anchor", "middle")
		.text("Slowly");

	window.scrollTo(0, 0);
	setInterval( function() {
		down.transition()
			.duration(500)
			.style("font-size", original)
			.style("font-weight", "normal")
			.transition()
			.duration(600)
			.style("font-weight", "bold")
			.style("font-size", big);
	}, 1300);
}

function dots_timer() {
	var distance_from_top = 100;
	d3.timer(function(){
		if (window.scrollY > 200){
			draw_dots();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_dots() {
	var dots = d3.select("#dots")
		.append("svg")
		.attr("width", 320)
		.attr("height", 400);

	var pos = 40;
	var delay = 300;
	var size = 30;
	for (var i=0; i< 4; i++) {
		dots.append("circle")
			.attr("cy", pos)
			.attr("cx", 160)
			.attr("r", 0)
			.transition()
			.delay(delay)
			.duration(500)
			.attr("r", size);
		delay += delay-100;
		pos += 100;
		size -= 7;
	}
}

function once_upon_timer() {
	d3.timer(function(){
		if (window.scrollY > 550){
			draw_once_upon();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_once_upon() {
	var box = d3.select("#upon")
		.append("svg")
		.attr("width", 320)
		.attr("height", 400);

	var data = [];
	var C1 = {x: 280,y: 66}; //start
	var C2 = {x: 170,y: 75}; //control
	var C3 = {x: 155,y: 100}; //control2
	var C4 = {x: 160,y: 150}; //end

	for (var i =0; i< 20; i++) {
		var pos = getBezier(i/20.0, C1, C2, C3, C4);
		data.push(
			{x: pos.x,  y: pos.y, w:4}
		);
	}
	data = data.reverse();

	var d = box.selectAll("circle")
		.data(data)
		.enter().append("circle")
		.attr("cy", function(d) { return d.y;})
		.attr("cx", function(d) { return d.x;})
		.attr("r", 0);
	
	d.transition()
		.delay(function(d,i){ return i*40+1500;})
		.duration(200)
		.attr("r", function(d){ return d.w;})
		.transition()
		.delay(function(d,i) { return i*40+300+1600; })
		.duration(1000)
		.style("opacity","0");

	var once = box.append("text")
		.attr("transform", "translate(40,550)")
		.attr("dy", ".71em")
		.style("font-size", "50px")
		.style("text-anchor", "left")
		.text("Once");

	var upon = box.append("text")
		.attr("transform", "translate(120,550)")
		.attr("dy", ".71em")
		.style("font-size", "50px")
		.style("text-anchor", "left")
		.text("Upon");

	var a_time = box.append("text")
		.attr("transform", "translate(200,550)")
		.attr("dy", ".71em")
		.style("font-size", "50px")
		.style("text-anchor", "left")
		.text("a Time");

	once.transition()
		.duration(1000)
		.delay(300)
		.ease('cubic-out')
		.attr("transform", "translate(40,20)");
	upon.transition()
		.duration(1000)
		.delay(2*300)
		.ease('cubic-out')
		.attr("transform", "translate(120,20)");
	a_time.transition()
		.duration(1000)
		.delay(3*300)
		.ease('cubic-out')
		.attr("transform", "translate(200,20)");

	box.transition()
		.delay(3.5*1000)
		.attr('height',160);
}

function there_was_timer() {
	d3.timer(function(){
		if (window.scrollY > 720){
			draw_there_was();
			return true; // stop timer to avoid reanimating
		}
	})
}

function letter_by_letter(t, text, s) {
	for (var i=0; i< text.length; i++) {
		draw_after_timeout(t,text[i], i*s);
	}
}

function draw_after_timeout(o, text, t) {
	window.setTimeout(function() {
		o.text(o.text()+text);
	}, t);
}

function draw_there_was() {
	var there = d3.select("#there")
		.append("svg")
		.attr("width", 320)
		.attr("height", 200);

	var t = there.append("text")
		.attr("transform", "translate(160,20)")
		.attr("dy", ".71em")
		.style("font-size", "50px")
		.style("text-anchor", "middle")
		.text("");

	var upon = d3.select("#upon svg")
		.append("g")
		.append("rect")
		.attr("x", 20)
		.attr("y", 150)
		.attr("height", "2")
		.attr("width", 0);

	upon.transition()
		.delay(1400)
		.duration(800)
		.attr("width", 280);


	letter_by_letter(t, "There was a beautiful", 45);

	var t2 = there.append("text")
		.attr("transform", "translate(160,70)")
		.attr("dy", ".71em")
		.style("font-size", "50px")
		.style("text-anchor", "middle")
		.text("");

	window.setTimeout( function() {
		letter_by_letter(t2, "young lady named", 45);
	}, 1300);

	var rect = there.append("g")
		.append("rect")
		.attr("x", 280)
		.attr("y", 150)
		.attr("height", "2")
		.attr("width", 0);

	rect.transition()
		.delay(1600)
		.duration(800)
		.attr('x', 20)
		.attr('width',280);
}

function her_name_timer() {
	d3.timer(function(){
		if (window.scrollY > 860){
			write_her_name();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_path_slowly(reine, path, delay, duration) {
	var path = reine.append("g")
		.append("path")
		.style({
			'fill': 'none',
			'stroke':'#ff6c5c',
			'stroke-width':'2',
			'stroke-linecap':'butt',
			'stroke-linejoin':'miter',
			'stroke-miterlimit':'4'
		})
		.attr('d',path);
	var totalLength = path.node().getTotalLength();
	path
		.attr("stroke-dasharray", totalLength + " " + totalLength)
		.attr("stroke-dashoffset", totalLength)
		.transition()
			.delay(delay)
			.duration(duration)
			.ease("linear")
			.attr("stroke-dashoffset", 0);
}

function write_her_name() {
	var reine = d3.select("#her_beautiful_name")
		.append("svg")
		.attr("width", 320)
		.attr("height", 180);

	var all_paths = [
	"m 40.911178,92.40855 c 38.181838,41.0943 19.953371,73.74391 -13.131983,71.72083 l 0,0.50508",
	"M 28.789348,105.54053 C 25.976855,85.977894 69.495032,88.99721 84.690373,98.990929 133.25568,130.93151 66.650895,140.98966 56.063466,130.79435 l -0.505076,-0.50508",
	"m 55.053314,131.29942 c 6.664582,-10.28452 26.595501,-7.33699 36.870568,-2.0203 8.745528,10.68919 -7.820779,21.62282 -3.752868,40.97594 1.516326,7.21394 17.920026,6.60559 26.481296,0.94539",
	"m 123.74369,164.12938 12.12183,-9.59645 c -6.00006,-1.61053 -11.04629,2.91532 -8.33376,7.70241 6.85535,7.36303 16.1452,5.25935 29.42069,-4.41942 l -1.26269,-0.7576 c -1.39469,6.32146 2.24312,15.21964 14.01587,9.59644",
	"m 184.35284,152.51263 -0.25254,11.99556 c 7.52539,-19.90049 24.69284,-16.78632 27.7792,-13.51079 -9.88482,29.85255 12.2944,22.34205 28.91561,17.29886 5.51409,-2.95038 5.48719,-7.99512 2.27285,-9.97526 -17.26796,11.08414 13.83247,19.08079 27.40038,9.34391 l 0,0 0,0 0,0 0,0",
	"m 164.76913,144.17027 c -0.69555,-0.60895 -1.06147,0.52049 -0.96497,-1.03892 0,0 0.52597,-1.55132 1.91013,0.0829 l -0.49425,1.2698 2.25829,1.75322 0.31568,0.44194"
	];

	for (var i =0; i< all_paths.length-1; i++) {
		draw_path_slowly(
			reine,
			all_paths[i],
			500+i*400,
			400
		);
	}
	draw_path_slowly(
		reine,
		all_paths[all_paths.length-1],
		500+(all_paths.length-1)*400,
		150
	);
}

function quite_timer() {
	var quite = d3.select("#quite")
		.append("svg")
		.attr("width",320)
		.attr("height", 400);

	d3.timer(function(){
		if (window.scrollY > 1080){
			draw_quite_like(quite, 10);
			return true; // stop timer to avoid reanimating
		}
	})
	d3.timer(function(){
		if (window.scrollY > 1200){
			draw_quite_like(quite, 140);
			return true; // stop timer to avoid reanimating
		}
	})
	d3.timer(function(){
		if (window.scrollY > 1320){
			draw_quite_like(quite, 350, true);
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_quite_like(quite, cy, keep) {
	var data = [{x:140, y:cy},{x:160, y:cy},{x:180, y:cy}];
	quite.selectAll("circle")
		.data(data)
		.attr("cy", function(d){return d.y;})
		.attr("cx", function(d) {return d.x;})
		.attr("r", 5)
		.style('opacity', 0)
		.transition()
		.delay(function(d,i) {return 500+i*100;})
		.duration(500)
		.style('opacity', 1)
		.each("end", function() {
			if (!keep) {
				d3.select(this)
					.transition()
					.delay(function(d,i) {return 500+i*100;})
					.duration(500)
					.style('opacity', 0);
			}
		});
	quite.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cy", function(d){return d.y;})
		.attr("cx", function(d) {return d.x;})
		.attr("r", 5)
		.style('opacity', 0)
		.transition()
		.delay(function(d,i) {return 300+i*100;})
		.duration(300)
		.style('opacity', 1)
		.each("end", function() {
			if (!keep) {
			d3.select(this)
				.transition()
				.delay(function(d,i) {return 200+i*100;})
				.duration(300)
				.style('opacity', 0);
			}
		});
}

function like_her_timer() {
	d3.timer(function(){
		if (window.scrollY > 1600){
			draw_like_her();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_like_her() {
	var data = [
		{'x':50,'text': "...and"},
		{'x':90,'text': " I "},
		{'x':130,'text': "quite"},
		{'x':180,'text': " like "},
		{'x':220,'text': "her "},
		{'x':260,'text': "!"}
	];
	var quite = d3.select("#like_her")
		.append("svg")
		.attr("width",320)
		.attr("height", 740);
	quite.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.text(function(d) {return d.text;})
		.attr("y", 250)
		.attr("x", 350)
		.style("font-size", '40px')
		.style("text-anchor", "middle")
		.attr("dy", ".71em")
		.transition()
			.delay(function(d,i) {return 100+i*100;})
			.duration(1000)
			.attr('y', 100)
			.attr('x', function(d) {return 20+d.x});
}

function a_lot_timer() {
	d3.timer(function(){
		if (window.scrollY > 1730){
			draw_a_lot();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_a_lot() {
	d3.selectAll("#like_her text")
	.transition()
	.delay(600)
	.duration(2200)
	.ease('elastic')
	.attr('y', 270)
	.attr('x', function(d) {
		if (d.x < 180) {
			return d.x - 22;
		}
		else {
			if (d.x == 220) {
				return 282;
			}
			else if (d.x == 180) {
				return 240;
			}
			else {
				return 302;
			}
		}
	});
	var a_lot = d3.select("#like_her svg")
		.append("text")
		.text("A LOT")
		.attr('id', 'LOOOOT')
		.attr('y', 650)
		.attr('x', 175)
		.style('font-weight', 'bold')
		.style("font-size", '40px')
		.style("text-anchor", "middle")
		.attr("dy", ".71em")
		.transition()
		.delay(650)
		.duration(2500)
		.ease('elastic')
		.attr('y', 270);
}

function so_much_timer() {
	d3.timer(function(){
		if (window.scrollY > 1945){
			draw_so_much();
			return true; // stop timer to avoid reanimating
		}
	})
}



function draw_so_much() {
	var mucho = d3.select("#like_her svg")
		.append("text")
		.text("So much")
		.attr('id', 'so_mucho')
		.attr('y', 430)
		.attr('x', 140)
		.style("font-size", '40px')
		.style("text-anchor", "middle")
		.attr("dy", ".71em")
		.style('opacity', 0)
		.transition()
		.delay(500)
		.duration(500)
		.style('opacity', 1)
		.each("end", function() {
			d3.select(this)
				.transition()
				.delay(700)
				.duration(500)
				.style('opacity', 0);
		});

	var dotos = d3.select("#like_her svg")
		.append("text")
		.text("...")
		.attr('y', 430)
		.attr('x', 190)
		.style("font-size", '40px')
		.style("text-anchor", "middle")
		.attr("dy", ".71em")
		.style('opacity', 0)
		.transition()
		.delay(500)
		.duration(500)
		.style('opacity', 1)
		.each("end", function() {
			d3.select(this)
				.transition()
				.delay(700)
				.duration(500)
				.style('opacity', 0);
		});
}

function so_much_continue_timer() {
	d3.timer(function(){
		if (window.scrollY > 2214){
			draw_so_much_continue();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_so_much_continue() {
	var mucho = d3.select("#so_mucho")
		.transition()
		.duration(500)
		.style('opacity', 1)
		.attr('y', 650)
		.attr('x', 160);

	d3.select("#like_her svg")
		.append("text")
		.text("I wrote her name on")
		.attr('y', 680)
		.attr('x', 160)
		.style('opacity',0)
		.style("font-size", '35px')
		.style("text-anchor", "middle")
		.attr("dy", ".71em")
		.transition()
		.delay(600+500)
		.duration(500)
		.style('opacity', 1);


	d3.select("#like_her svg")
		.append("text")
		.text("all the last pages of my book")
		.attr('y', 700)
		.attr('x', 160)
		.style('opacity',0)
		.style("font-size", '35px')
		.style("text-anchor", "middle")
		.attr("dy", ".71em")
		.transition()
		.delay(600+500*2)
		.duration(500)
		.style('opacity', 1);
}

function emoji_start_timer() {
	d3.timer(function(){
		if (window.scrollY > 2335){
			draw_emoji_start();
			return true; // stop timer to avoid reanimating
		}
	})
}



function draw_emoji_start() {
	var first_head =  "(^ ▽ ^)";
	var head = d3.select("#emoji")
		.append("svg")
		.attr("width",320)
		.attr("height", 600)
		.append("text")
		.text(first_head)
		.attr('transform', 'rotate(50)')
		.style("font-size", '20px')
		.style("text-anchor", "middle")
		.attr("dy", ".71em")
		.attr('x', -10)
		.attr('y', 250)
		.transition()
		.delay(10)
		.duration(1000)
		.attr('x', '160')
		.attr('y', '100')
		.attr('transform', 'rotate(5)');
	function rand_in_range() {
		var s_x = 0 ;
		if (Math.random() > 0.5) {
			s_x = Math.floor(Math.random()*(-20)+1);
		}
		else {
			s_x = Math.floor(Math.random()*10+320);
		}
		var s_y = Math.floor(Math.random()*550+30);
		var e_x = Math.floor(Math.random()*290+40);
		var e_y = Math.floor(Math.random()*550+30);
		return {
			'sx': s_x,
			'sy': s_y,
			'ex': e_x,
			'ey': e_y
		};
	}
	for (var i=0; i< 100; i++) {
		var pos = rand_in_range();
		d3.select("#emoji svg")
			.append("text")
			.text("Prisoner")
			.style("font-size", '20px')
			.style("text-anchor", "middle")
			.attr("dy", ".71em")
			.attr('x', pos.sx)
			.attr('y', pos.sy)
			.style('opacity', 0)
			.transition()
			.delay(function() {
				return (Math.random()*6000+1250);
			})
			.duration(300)
			.style('opacity', 0.2)
			.style('z-index', '-1')
			.attr('x', pos.ex)
			.attr('y', pos.ey);
	}
}

function emoji_middle_timer() {
	d3.timer(function(){
		if (window.scrollY > 2430){
			draw_emoji_middle();
			return true; // stop timer to avoid reanimating
		}
	})
}


function draw_emoji_middle() {
	d3.select("#emoji svg text")
		.transition()
		.delay(1)
		.duration(500)
		.attr('x', '-150')
		.attr('y', '290')
		.attr('transform', 'rotate(-90)');
}

function emoji_middle2_timer() {
	d3.timer(function(){
		if (window.scrollY > 2537){
			draw_emoji_middle2();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_emoji_middle2() {
	d3.select("#emoji svg text")
		.transition()
		.delay(1)
		.duration(500)
		.attr('x', '250')
		.attr('y', '-20')
		.attr('transform', 'rotate(90)');
}

function emoji_start_smile_timer() {
	d3.timer(function(){
		if (window.scrollY > 2646){
			draw_emoji_start_smile();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_emoji_start_smile() {
	var last_heart = "♡";
	var hearts = [
	{'y': '514', 'x':132, 't': "."},
	{'y': '514', 'x':132, 't': "."},
	{'y': '510', 'x':155, 't':"。"},
	{'y': '510', 'x':165, 't': "ｏ"},
	{'y': '505', 'x':190, 't': last_heart}
	];
	d3.select("#emoji svg text")
		.transition()
		.delay(1)
		.duration(500)
		.text("(´ ▽｀)")
		.attr('x', '80')
		.attr('y', '520')
		.attr('transform', 'rotate(0)');

	var emoji = d3.selectAll("#emoji svg");

	for (var i in hearts) {
		d3.select("#emoji svg")
			.append("text")
			.style("font-size", '30px')
			.style("text-anchor", "middle")
			.attr('id', 'heart'+i)
			.text(hearts[i].t)
			.attr("dy", ".71em")
			.attr('x', hearts[i].x)
			.attr('y', 550)
			.style('opacity', 0)
			.transition()
			.delay( 200+i*200)
			.duration(500)
			.attr('y', hearts[i].y)
			.style('opacity', 1);
	}
}

function emoji_tabbouleh_timer() {
	d3.timer(function(){
		if (window.scrollY > 2808){
			draw_emoji_tabbouleh();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_emoji_tabbouleh() {
	d3.select("#heart4")
		.transition()
		.delay(1)
		.duration(200)
		.attr('x', 210)
		.attr('y', 430)
		.style("font-size", "190px");
	d3.select("#emoji svg")
		.append("text")
		.style("font-size", '15px')
		.style("text-anchor", "middle")
		.attr('id', 'tabbouleh')
		.text("Tabbouleh")
		.attr("dy", ".71em")
		.attr('x', 210)
		.attr('y', 483)
		.style('opacity', 0)
		.transition()
		.delay(240)
		.duration(500)
		.style('opacity', 1);
}

function old_timer() {
	d3.timer(function(){
		if (window.scrollY > 2916){
			draw_older();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_older() {
	var old = d3.select("#old")
		.append("svg")
		.attr("width", 320)
		.attr('height', 400);
	var d = [
		{'t':'Today', 'sx':-10, 'sy':150, 'ex':70, 'ey':150, 'id':'today'},
		{'t':"she's", 'sx':130,'sy':300, 'ex':130, 'ey':150, 'id': 'she'},
		{'t':'a bit', 'sx':190,'sy':-10, 'ex':190, 'ey':150, 'id': 'bit'},
		{'t':'old', 'sx':350, 'sy':150, 'ex':245, 'ey':150, 'id': 'old'},
		{'t':'er', 'sx':350,'sy':150, 'ex':263, 'ey':150, 'id': 'er'}
	];
	old.selectAll("text")
		.data(d)
		.enter()
		.append('text')
		.style("font-size", '31px')
		.style("text-anchor", "middle")
		.attr('id', function(d){return 'old_'+d.id;})
		.text(function(d){return d.t;})
		.attr("dy", ".71em")
		.attr('x', function(d){return d.sx;})
		.attr('y', function(d){return d.sy;})
		.transition()
		.duration(600)
		.attr('x', function(d){return d.ex;})
		.attr('y', function(d){return d.ey;});
}

function old_next_timer() {
	d3.timer(function(){
		if (window.scrollY > 3132){
			draw_older_next();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_older_next() {
	var remove = ["#old_today", "#old_bit", "#old_er"];
	for (var i in remove) {
		d3.select(remove[i])
			.transition()
			.duration(500)
			.style('opacity', 0);
	}
	d3.select("#old_she")
		.transition()
		.duration(700)
		.attr('x',80)
		.attr('y',360);

	d3.select("#old_old")
		.transition()
		.duration(700)
		.attr('x',140)
		.attr('y',340);

	d3.select("#old svg")
		.append("text")
		.style("font-size", '22px')
		.style("text-anchor", "middle")
		.text("NOW  ヽ（´ー｀）┌")
		.attr("dy", ".71em")
		.attr('x', 500)
		.attr('y', 367)
		.transition()
		.delay(400)
		.duration(800)
		.ease('elastic')
		.attr('x', 205);
}

function happy_timer() {
	d3.timer(function(){
		if (window.scrollY > 3259){
			draw_happy();
			return true; // stop timer to avoid reanimating
		}
	})
}

function draw_happy() {
	var happy = d3.select("#happy")
		.append("svg")
		.attr('width', 320)
		.attr('height', 300);

	var t = happy.append("text")
		.attr("transform", "translate(140,120)")
		.attr("dy", ".71em")
		.style("font-size", "50px")
		.style("text-anchor", "middle")
		.text("");
	letter_by_letter(t, 'Happy Birz', 100);

	var d= [
		{'t':"H", 'x':120, 'y':205},
		{'t':"E", 'x':140, 'y':200},
		{'t':"Y", 'x':160, 'y':195},
		{'t':"!", 'x':180, 'y':190},
		{'t':"!", 'x':200, 'y':185},
		{'t':"!", 'x':220, 'y':180}
	];
	for (var i in d) {
		happy.append("text")
		.attr("dy", ".71em")
		.style("font-size", "50px")
		.style("text-anchor", "middle")
		.attr('transform', 'rotate(-90)')
		.attr('x',-200)
		.attr('y',390)
		.text(d[i].t)
		.transition()
		.delay(1000+50*i)
		.duration(250)
		.attr('transform', 'rotate(-30)')
		.attr('x',d[i].x)
		.attr('y',d[i].y);
	}
}


function main() {
	draw_scroll();
	dots_timer();
	once_upon_timer();
	there_was_timer();
	her_name_timer();
	quite_timer();
	like_her_timer();
	a_lot_timer();
	so_much_timer();
	so_much_continue_timer();
	emoji_start_timer();
	emoji_middle_timer();
	emoji_middle2_timer();
	emoji_start_smile_timer();
	emoji_tabbouleh_timer();
	old_timer();
	old_next_timer();
	happy_timer();
}


window.onload = function(){
	window.scrollTo(0, 0);
	var stage = function(sel, f){
		var bb = document.querySelector(sel).getBoundingClientRect();
		var trigger = bb.top + bb.height * 0.8;
		d3.timer(function(){
			if (window.scrollY + window.innerHeight > trigger){
				f();
				return true; // stop timer to avoid reanimating
			}
		})
	}
	//stage("svg.chart", main);
	main();
};
