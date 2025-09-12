(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const v=[{id:"bw001",title:"3 Idiots",category:"Bollywood",points:2,hints:"Aamir engineering college friends"},{id:"bw002",title:"Sholay",category:"Bollywood",points:2,hints:"Amitabh Dharmendra dacoit Gabbar"},{id:"bw003",title:"Dilwale Dulhania Le Jayenge",category:"Bollywood",points:3,hints:"Shah Rukh Kajol train Europe"},{id:"bw004",title:"Lagaan",category:"Bollywood",points:3,hints:"Aamir cricket British tax"},{id:"bw005",title:"Mughal-E-Azam",category:"Bollywood",points:4,hints:"Dilip Kumar Madhubala Anarkali"},{id:"bw006",title:"Zindagi Na Milegi Dobara",category:"Bollywood",points:2,hints:"Three friends Spain adventure"},{id:"bw007",title:"Queen",category:"Bollywood",points:2,hints:"Kangana solo honeymoon Paris"},{id:"bw008",title:"Dangal",category:"Bollywood",points:2,hints:"Aamir daughters wrestling Haryana"},{id:"bw009",title:"Taare Zameen Par",category:"Bollywood",points:2,hints:"Aamir dyslexia child teacher"},{id:"bw010",title:"Gully Boy",category:"Bollywood",points:2,hints:"Ranveer rap Mumbai slums"},{id:"bw011",title:"Pink",category:"Bollywood",points:2,hints:"Amitabh lawyer consent women"},{id:"bw012",title:"Article 15",category:"Bollywood",points:3,hints:"Ayushmann police caste discrimination"},{id:"bw013",title:"Andhadhun",category:"Bollywood",points:3,hints:"Ayushmann blind pianist murder"},{id:"bw014",title:"Tumhari Sulu",category:"Bollywood",points:2,hints:"Vidya housewife radio jockey"},{id:"bw015",title:"Hindi Medium",category:"Bollywood",points:2,hints:"Irrfan admission English school"},{id:"bw016",title:"Piku",category:"Bollywood",points:2,hints:"Deepika Amitabh father daughter"},{id:"bw017",title:"Toilet Ek Prem Katha",category:"Bollywood",points:2,hints:"Akshay toilet sanitation village"},{id:"bw018",title:"Pad Man",category:"Bollywood",points:2,hints:"Akshay sanitary pads innovation"},{id:"bw019",title:"Super 30",category:"Bollywood",points:2,hints:"Hrithik mathematics IIT coaching"},{id:"bw020",title:"Badhaai Ho",category:"Bollywood",points:2,hints:"Ayushmann parents pregnancy surprise"},{id:"bw021",title:"Stree",category:"Bollywood",points:2,hints:"Rajkummar horror comedy ghost"},{id:"bw022",title:"Bareilly Ki Barfi",category:"Bollywood",points:2,hints:"Kriti Ayushmann Rajkummar triangle"},{id:"bw023",title:"Newton",category:"Bollywood",points:3,hints:"Rajkummar election officer jungle"},{id:"bw024",title:"Masaan",category:"Bollywood",points:3,hints:"Varanasi cremation ghat love"},{id:"bw025",title:"Court",category:"Bollywood",points:4,hints:"Marathi legal system folk singer"},{id:"bw026",title:"Rang De Basanti",category:"Bollywood",points:2,hints:"Aamir revolution documentary students"},{id:"bw027",title:"My Name Is Khan",category:"Bollywood",points:2,hints:"Shah Rukh autism America 9/11"},{id:"bw028",title:"Chak De India",category:"Bollywood",points:2,hints:"Shah Rukh hockey women team"},{id:"bw029",title:"Swades",category:"Bollywood",points:3,hints:"Shah Rukh NASA village electricity"},{id:"bw030",title:"Haider",category:"Bollywood",points:3,hints:"Shahid Kashmir Hamlet adaptation"},{id:"bw031",title:"Maqbool",category:"Bollywood",points:4,hints:"Irrfan Macbeth Mumbai underworld"},{id:"bw032",title:"Omkara",category:"Bollywood",points:3,hints:"Ajay Saif Othello adaptation"},{id:"bw033",title:"Gangs of Wasseypur",category:"Bollywood",points:3,hints:"Manoj coal mafia revenge"},{id:"bw034",title:"Tumko Na Bhool Paayenge",category:"Bollywood",points:2,hints:"Salman memory loss action"},{id:"bw035",title:"Krrish",category:"Bollywood",points:2,hints:"Hrithik superhero alien powers"},{id:"bw036",title:"Don",category:"Bollywood",points:2,hints:"Shah Rukh international criminal"},{id:"bw037",title:"Rock On",category:"Bollywood",points:2,hints:"Farhan band music friendship"},{id:"bw038",title:"Dil Chahta Hai",category:"Bollywood",points:2,hints:"Aamir Saif Akshaye friendship Goa"},{id:"bw039",title:"Kuch Kuch Hota Hai",category:"Bollywood",points:2,hints:"Shah Rukh Kajol Rani college"},{id:"bw040",title:"Kabhi Khushi Kabhie Gham",category:"Bollywood",points:2,hints:"Amitabh family drama reunion"},{id:"bw041",title:"Jab We Met",category:"Bollywood",points:2,hints:"Shahid Kareena train journey"},{id:"bw042",title:"Tanu Weds Manu",category:"Bollywood",points:2,hints:"Madhavan Kangana small town romance"},{id:"bw043",title:"Arjun Reddy",category:"Bollywood",points:3,hints:"Vijay surgeon anger self destruction"},{id:"bw044",title:"Raazi",category:"Bollywood",points:2,hints:"Alia spy Pakistan 1971 war"},{id:"bw045",title:"URI The Surgical Strike",category:"Bollywood",points:2,hints:"Vicky military operation revenge"},{id:"bw046",title:"Shershaah",category:"Bollywood",points:2,hints:"Sidharth Kargil war Param Veer"},{id:"bw047",title:"Sardar Udham",category:"Bollywood",points:3,hints:"Vicky freedom fighter Jallianwala"},{id:"bw048",title:"The Kashmir Files",category:"Bollywood",points:3,hints:"Anupam exodus 1990 documentary"},{id:"bw049",title:"Pushpa",category:"Bollywood",points:2,hints:"Allu Arjun red sandalwood smuggling"},{id:"bw050",title:"KGF Chapter 2",category:"Bollywood",points:2,hints:"Yash gold mines Rocky Bhai"},{id:"sp001",title:"Virat Kohli",category:"Sports",points:2,hints:"Cricket captain batting India"},{id:"sp002",title:"MS Dhoni",category:"Sports",points:2,hints:"Cricket wicket keeper captain helicopter"},{id:"sp003",title:"Sachin Tendulkar",category:"Sports",points:2,hints:"Cricket god master blaster"},{id:"sp004",title:"Kapil Dev",category:"Sports",points:3,hints:"Cricket world cup 1983 captain"},{id:"sp005",title:"Mary Kom",category:"Sports",points:3,hints:"Boxing woman Manipur Olympics"},{id:"sp006",title:"PV Sindhu",category:"Sports",points:2,hints:"Badminton Olympics silver medal"},{id:"sp007",title:"Saina Nehwal",category:"Sports",points:2,hints:"Badminton world number one"},{id:"sp008",title:"Sunil Chhetri",category:"Sports",points:3,hints:"Football captain goals record"},{id:"sp009",title:"Hima Das",category:"Sports",points:3,hints:"Athletics sprint golden girl"},{id:"sp010",title:"Neeraj Chopra",category:"Sports",points:2,hints:"Javelin throw Olympics gold"},{id:"sp011",title:"Bajrang Punia",category:"Sports",points:3,hints:"Wrestling freestyle bronze Olympics"},{id:"sp012",title:"Sushil Kumar",category:"Sports",points:3,hints:"Wrestling Olympics medals two"},{id:"sp013",title:"Yogeshwar Dutt",category:"Sports",points:3,hints:"Wrestling Olympics bronze London"},{id:"sp014",title:"Abhinav Bindra",category:"Sports",points:3,hints:"Shooting Olympics gold individual"},{id:"sp015",title:"Rajyavardhan Rathore",category:"Sports",points:4,hints:"Shooting Olympics silver Athens"},{id:"sp016",title:"Leander Paes",category:"Sports",points:3,hints:"Tennis doubles grand slam"},{id:"sp017",title:"Mahesh Bhupathi",category:"Sports",points:3,hints:"Tennis doubles Leander partner"},{id:"sp018",title:"Sania Mirza",category:"Sports",points:2,hints:"Tennis women doubles grand slam"},{id:"sp019",title:"Rohit Sharma",category:"Sports",points:2,hints:"Cricket opener captain Mumbai"},{id:"sp020",title:"Hardik Pandya",category:"Sports",points:2,hints:"Cricket all rounder Gujarat"},{id:"sp021",title:"Jasprit Bumrah",category:"Sports",points:2,hints:"Cricket fast bowler yorker"},{id:"sp022",title:"Ravindra Jadeja",category:"Sports",points:2,hints:"Cricket all rounder spin bowling"},{id:"sp023",title:"KL Rahul",category:"Sports",points:2,hints:"Cricket batsman wicket keeper"},{id:"sp024",title:"Rishabh Pant",category:"Sports",points:2,hints:"Cricket wicket keeper aggressive"},{id:"sp025",title:"Shikhar Dhawan",category:"Sports",points:2,hints:"Cricket opener left handed"},{id:"sp026",title:"Mohammed Shami",category:"Sports",points:2,hints:"Cricket fast bowler seam"},{id:"sp027",title:"Yuzvendra Chahal",category:"Sports",points:2,hints:"Cricket leg spin bowler"},{id:"sp028",title:"Bhuvneshwar Kumar",category:"Sports",points:2,hints:"Cricket swing bowler medium pace"},{id:"sp029",title:"Ajinkya Rahane",category:"Sports",points:2,hints:"Cricket batsman Test vice captain"},{id:"sp030",title:"Cheteshwar Pujara",category:"Sports",points:2,hints:"Cricket batsman Test specialist"},{id:"sp031",title:"Smriti Mandhana",category:"Sports",points:2,hints:"Cricket women opener left handed"},{id:"sp032",title:"Harmanpreet Kaur",category:"Sports",points:2,hints:"Cricket women captain all rounder"},{id:"sp033",title:"Mithali Raj",category:"Sports",points:3,hints:"Cricket women batsman runs record"},{id:"sp034",title:"Jhulan Goswami",category:"Sports",points:3,hints:"Cricket women fast bowler wickets"},{id:"sp035",title:"Kidambi Srikanth",category:"Sports",points:3,hints:"Badminton men singles ranking"},{id:"sp036",title:"HS Prannoy",category:"Sports",points:3,hints:"Badminton men singles Kerala"},{id:"sp037",title:"Lakshya Sen",category:"Sports",points:3,hints:"Badminton young men singles"},{id:"sp038",title:"Chirag Shetty",category:"Sports",points:3,hints:"Badminton men doubles pair"},{id:"sp039",title:"Satwiksairaj Rankireddy",category:"Sports",points:3,hints:"Badminton men doubles Chirag partner"},{id:"sp040",title:"Mirabai Chanu",category:"Sports",points:2,hints:"Weightlifting Olympics silver medal"},{id:"sp041",title:"Lovlina Borgohain",category:"Sports",points:3,hints:"Boxing Olympics bronze medal"},{id:"sp042",title:"Ravi Kumar Dahiya",category:"Sports",points:3,hints:"Wrestling Olympics silver medal"},{id:"sp043",title:"Deepak Punia",category:"Sports",points:3,hints:"Wrestling world championship bronze"},{id:"sp044",title:"Vinesh Phogat",category:"Sports",points:2,hints:"Wrestling women world championship"},{id:"sp045",title:"Sakshi Malik",category:"Sports",points:3,hints:"Wrestling Olympics bronze Rio"},{id:"sp046",title:"Geeta Phogat",category:"Sports",points:3,hints:"Wrestling women Commonwealth gold"},{id:"sp047",title:"Babita Kumari",category:"Sports",points:3,hints:"Wrestling women Commonwealth medals"},{id:"sp048",title:"Dutee Chand",category:"Sports",points:3,hints:"Athletics sprint 100m 200m"},{id:"sp049",title:"Anju Bobby George",category:"Sports",points:4,hints:"Athletics long jump world bronze"},{id:"sp050",title:"PT Usha",category:"Sports",points:3,hints:"Athletics sprint hurdles queen"},{id:"hf001",title:"Mahatma Gandhi",category:"Historical",points:1,hints:"Non-violence independence father"},{id:"hf002",title:"Subhas Chandra Bose",category:"Historical",points:2,hints:"Netaji Azad Hind Fauj"},{id:"hf003",title:"Jawaharlal Nehru",category:"Historical",points:2,hints:"First Prime Minister Chacha"},{id:"hf004",title:"Sardar Patel",category:"Historical",points:2,hints:"Iron Man unity statue"},{id:"hf005",title:"Dr. APJ Abdul Kalam",category:"Historical",points:2,hints:"Missile Man President scientist"},{id:"hf006",title:"Chandragupta Maurya",category:"Historical",points:3,hints:"Mauryan Empire founder ancient"},{id:"hf007",title:"Ashoka the Great",category:"Historical",points:2,hints:"Buddhist emperor pillars"},{id:"hf008",title:"Akbar",category:"Historical",points:2,hints:"Mughal emperor tolerance Din-i-Ilahi"},{id:"hf009",title:"Shivaji Maharaj",category:"Historical",points:2,hints:"Maratha empire mountain king"},{id:"hf010",title:"Rani Lakshmibai",category:"Historical",points:2,hints:"Jhansi queen 1857 revolt"},{id:"hf011",title:"Tipu Sultan",category:"Historical",points:3,hints:"Tiger of Mysore rockets"},{id:"hf012",title:"Maharana Pratap",category:"Historical",points:3,hints:"Mewar Rajput horse Chetak"},{id:"hf013",title:"Prithviraj Chauhan",category:"Historical",points:3,hints:"Last Hindu emperor Delhi"},{id:"hf014",title:"Aryabhata",category:"Historical",points:4,hints:"Ancient mathematician astronomer zero"},{id:"hf015",title:"Chandrashekhar Azad",category:"Historical",points:3,hints:"Revolutionary freedom fighter pistol"},{id:"hf016",title:"Bhagat Singh",category:"Historical",points:2,hints:"Young revolutionary martyr"},{id:"hf017",title:"Rani Padmavati",category:"Historical",points:3,hints:"Chittor beauty sacrifice jauhar"},{id:"hf018",title:"Swami Vivekananda",category:"Historical",points:3,hints:"Chicago speech Hindu philosophy"},{id:"hf019",title:"Raja Ram Mohan Roy",category:"Historical",points:4,hints:"Social reformer Brahmo Samaj"},{id:"hf020",title:"Sarojini Naidu",category:"Historical",points:3,hints:"Nightingale poet freedom fighter"},{id:"hf021",title:"Bal Gangadhar Tilak",category:"Historical",points:3,hints:"Lokmanya freedom fighter Swaraj"},{id:"hf022",title:"Lala Lajpat Rai",category:"Historical",points:3,hints:"Punjab Kesari freedom fighter"},{id:"hf023",title:"Gopal Krishna Gokhale",category:"Historical",points:4,hints:"Moderate leader political mentor"},{id:"hf024",title:"Maulana Abul Kalam Azad",category:"Historical",points:3,hints:"Education minister independence leader"},{id:"hf025",title:"Khan Abdul Ghaffar Khan",category:"Historical",points:4,hints:"Frontier Gandhi non-violence"},{id:"hf026",title:"Mangal Pandey",category:"Historical",points:3,hints:"1857 revolt sepoy mutiny"},{id:"hf027",title:"Tatya Tope",category:"Historical",points:4,hints:"1857 revolt military leader"},{id:"hf028",title:"Nana Saheb",category:"Historical",points:4,hints:"1857 revolt Kanpur leader"},{id:"hf029",title:"Begum Hazrat Mahal",category:"Historical",points:4,hints:"1857 revolt Lucknow leader"},{id:"hf030",title:"Kunwar Singh",category:"Historical",points:4,hints:"1857 revolt Bihar leader"},{id:"fd001",title:"Biryani",category:"Food",points:1,hints:"Rice meat spices layered"},{id:"fd002",title:"Butter Chicken",category:"Food",points:2,hints:"Creamy tomato curry chicken"},{id:"fd003",title:"Masala Dosa",category:"Food",points:2,hints:"South Indian crepe potato"},{id:"fd004",title:"Chole Bhature",category:"Food",points:2,hints:"Chickpea curry fried bread"},{id:"fd005",title:"Rajma Chawal",category:"Food",points:2,hints:"Kidney beans curry rice"},{id:"fd006",title:"Pani Puri",category:"Food",points:1,hints:"Street food water crispy"},{id:"fd007",title:"Vada Pav",category:"Food",points:2,hints:"Mumbai burger potato fritter"},{id:"fd008",title:"Samosa",category:"Food",points:1,hints:"Triangular fried snack"},{id:"fd009",title:"Tandoori Chicken",category:"Food",points:2,hints:"Clay oven red spiced"},{id:"fd010",title:"Palak Paneer",category:"Food",points:3,hints:"Spinach cottage cheese curry"},{id:"fd011",title:"Gulab Jamun",category:"Food",points:2,hints:"Sweet syrup soft balls"},{id:"fd012",title:"Jalebi",category:"Food",points:2,hints:"Spiral orange sweet crispy"},{id:"fd013",title:"Lassi",category:"Food",points:2,hints:"Yogurt drink sweet salty"},{id:"fd014",title:"Kheer",category:"Food",points:2,hints:"Rice pudding milk sweet"},{id:"fd015",title:"Dhokla",category:"Food",points:3,hints:"Gujarati steamed gram flour"},{id:"fd016",title:"Idli Sambhar",category:"Food",points:2,hints:"South Indian rice cakes"},{id:"fd017",title:"Aloo Gobi",category:"Food",points:2,hints:"Potato cauliflower dry curry"},{id:"fd018",title:"Kulfi",category:"Food",points:3,hints:"Traditional ice cream stick"},{id:"fd019",title:"Paratha",category:"Food",points:2,hints:"Layered flatbread stuffed"},{id:"fd020",title:"Dal Tadka",category:"Food",points:2,hints:"Lentil curry tempering"},{id:"fd021",title:"Poha",category:"Food",points:2,hints:"Flattened rice breakfast Maharashtra"},{id:"fd022",title:"Upma",category:"Food",points:2,hints:"Semolina breakfast South Indian"},{id:"fd023",title:"Medu Vada",category:"Food",points:3,hints:"Lentil donut South Indian"},{id:"fd024",title:"Rava Kesari",category:"Food",points:3,hints:"Semolina sweet saffron"},{id:"fd025",title:"Pongal",category:"Food",points:3,hints:"Rice lentil Tamil breakfast"},{id:"fd026",title:"Appam",category:"Food",points:3,hints:"Fermented rice pancake Kerala"},{id:"fd027",title:"Puttu",category:"Food",points:3,hints:"Steamed rice flour Kerala"},{id:"fd028",title:"Kozhukattai",category:"Food",points:4,hints:"Rice flour dumplings Tamil"},{id:"fd029",title:"Mysore Pak",category:"Food",points:3,hints:"Ghee sweet Karnataka"},{id:"fd030",title:"Rasgulla",category:"Food",points:2,hints:"Spongy white sweet Bengali"},{id:"tv001",title:"Kyunki Saas Bhi Kabhi Bahu Thi",category:"TV Shows",points:2,hints:"Ekta Kapoor family drama"},{id:"tv002",title:"Kaun Banega Crorepati",category:"TV Shows",points:1,hints:"Amitabh quiz show"},{id:"tv003",title:"Taarak Mehta Ka Ooltah Chashmah",category:"TV Shows",points:2,hints:"Gokuldham society comedy"},{id:"tv004",title:"CID",category:"TV Shows",points:2,hints:"ACP Pradyuman crime investigation"},{id:"tv005",title:"The Kapil Sharma Show",category:"TV Shows",points:2,hints:"Comedy talk show celebrities"},{id:"tv006",title:"Bigg Boss",category:"TV Shows",points:2,hints:"Reality show house contestants"},{id:"tv007",title:"Indian Idol",category:"TV Shows",points:2,hints:"Singing competition reality"},{id:"tv008",title:"Dance India Dance",category:"TV Shows",points:3,hints:"Dancing competition reality"},{id:"tv009",title:"Roadies",category:"TV Shows",points:3,hints:"Adventure reality youth show"},{id:"tv010",title:"Splitsvilla",category:"TV Shows",points:3,hints:"Dating reality show villa"},{id:"tv011",title:"Sarabhai vs Sarabhai",category:"TV Shows",points:3,hints:"Elite family comedy Monisha"},{id:"tv012",title:"Khichdi",category:"TV Shows",points:3,hints:"Parekh family comedy simple"},{id:"tv013",title:"Office Office",category:"TV Shows",points:3,hints:"Pankaj Kapoor bureaucracy satire"},{id:"tv014",title:"Yeh Rishta Kya Kehlata Hai",category:"TV Shows",points:4,hints:"Longest running family drama"},{id:"tv015",title:"Balika Vadhu",category:"TV Shows",points:3,hints:"Child marriage social issue"},{id:"tv016",title:"Anupamaa",category:"TV Shows",points:3,hints:"Housewife self-discovery journey"},{id:"tv017",title:"Mirzapur",category:"TV Shows",points:3,hints:"Crime web series Uttar Pradesh"},{id:"tv018",title:"Sacred Games",category:"TV Shows",points:3,hints:"Netflix Mumbai police thriller"},{id:"tv019",title:"Scam 1992",category:"TV Shows",points:4,hints:"Harshad Mehta stock market"},{id:"tv020",title:"The Family Man",category:"TV Shows",points:3,hints:"Intelligence officer family balance"},{id:"tv021",title:"Arya",category:"TV Shows",points:3,hints:"Hotstar crime thriller medical"},{id:"tv022",title:"Mumbai Diaries 26/11",category:"TV Shows",points:4,hints:"Terror attack hospital drama"},{id:"tv023",title:"Rocket Boys",category:"TV Shows",points:4,hints:"Scientists Homi Bhabha Vikram Sarabhai"},{id:"tv024",title:"Gullak",category:"TV Shows",points:3,hints:"Middle class family humor"},{id:"tv025",title:"Panchayat",category:"TV Shows",points:3,hints:"Village secretary comedy drama"},{id:"tv026",title:"Aspirants",category:"TV Shows",points:3,hints:"UPSC preparation friendship"},{id:"tv027",title:"Kota Factory",category:"TV Shows",points:3,hints:"Engineering coaching students"},{id:"tv028",title:"Permanent Roommates",category:"TV Shows",points:3,hints:"Long distance relationship comedy"},{id:"tv029",title:"Pitchers",category:"TV Shows",points:3,hints:"Startup friends entrepreneurship"},{id:"tv030",title:"Flames",category:"TV Shows",points:3,hints:"School romance teenage love"},{id:"ft001",title:"Diwali",category:"Festivals",points:1,hints:"Lights crackers sweets Lakshmi"},{id:"ft002",title:"Holi",category:"Festivals",points:1,hints:"Colors spring festival joy"},{id:"ft003",title:"Dussehra",category:"Festivals",points:2,hints:"Ravana effigy good over evil"},{id:"ft004",title:"Eid ul-Fitr",category:"Festivals",points:2,hints:"Ramadan end celebration feast"},{id:"ft005",title:"Christmas",category:"Festivals",points:1,hints:"Jesus birth tree gifts"},{id:"ft006",title:"Ganesh Chaturthi",category:"Festivals",points:2,hints:"Elephant god modak immersion"},{id:"ft007",title:"Navratri",category:"Festivals",points:2,hints:"Nine nights Durga dance"},{id:"ft008",title:"Karva Chauth",category:"Festivals",points:3,hints:"Wife husband fasting moon"},{id:"ft009",title:"Raksha Bandhan",category:"Festivals",points:2,hints:"Brother sister thread protection"},{id:"ft010",title:"Janmashtami",category:"Festivals",points:3,hints:"Krishna birth dahi handi"},{id:"ft011",title:"Onam",category:"Festivals",points:3,hints:"Kerala harvest Mahabali flowers"},{id:"ft012",title:"Pongal",category:"Festivals",points:3,hints:"Tamil harvest rice sugarcane"},{id:"ft013",title:"Baisakhi",category:"Festivals",points:3,hints:"Punjabi harvest Sikh new year"},{id:"ft014",title:"Durga Puja",category:"Festivals",points:2,hints:"Bengali goddess pandal immersion"},{id:"ft015",title:"Kumbh Mela",category:"Festivals",points:4,hints:"Largest religious gathering rivers"},{id:"ft016",title:"Pushkar Fair",category:"Festivals",points:4,hints:"Rajasthan camel fair sacred lake"},{id:"ft017",title:"Hornbill Festival",category:"Festivals",points:4,hints:"Nagaland tribal culture December"},{id:"ft018",title:"Thrissur Pooram",category:"Festivals",points:4,hints:"Kerala temple elephant procession"},{id:"ft019",title:"Kumbh Fair",category:"Festivals",points:3,hints:"Rajasthan desert festival camel"},{id:"ft020",title:"Bihu",category:"Festivals",points:3,hints:"Assamese new year spring harvest"}];function B(){const e=new Set(v.map(t=>t.category));return Array.from(e).sort()}function f(e){return v.filter(t=>e.includes(t.category))}function A(e,t){if(e.length===0)return{isValid:!1,message:"At least one category must be selected."};const a=f(e);if(a.length<t)return{isValid:!1,message:`Not enough cards available. Selected categories have ${a.length} cards, but ${t} are needed.`,availableCards:a.length};const i=e.length;return t<i?{isValid:!1,message:`Deck size must be at least ${i} to include 1 card from each selected category.`}:{isValid:!0,availableCards:a.length}}class L{constructor(){this.state={config:null,teams:[],playerOrder:[],deck:[],drawPile:[],discardPile:[],round:1,teamOrder:[],currentTeamIndex:0,turnActive:!1,history:[],guessedOnce:new Set,cardSelectionPhase:!1,currentPlayerSelectionIndex:0,currentPlayerCards:[],selectedCards:[],allShownCards:[],playerSelections:{},currentPlayerIndex:0,currentCard:null,timerSeconds:60,timerInterval:null,turnGuessedCards:[],turnSkippedCards:[],turnReshuffledCards:[],teamScores:[[],[]],lastTurnSummary:null},this.listeners=new Set}configure(t){this.state.config=t,this.state.teams=t.teams,this.state.teamOrder=this.state.teams.map(a=>a.id),this.state.currentTeamIndex=0,this.notifyListeners(),console.log("GameStore.configure completed with:",t)}buildDeck(){if(!this.state.config)throw new Error("Game must be configured before building deck");const{categories:t,deckSize:a}=this.state.config,i=A(t,a);if(!i.isValid)throw new Error(i.message);const s=f(t),r=[],n={};t.forEach(c=>{n[c]=s.filter(h=>h.category===c)}),t.forEach(c=>{if(n[c].length>0){const h=n[c][Math.floor(Math.random()*n[c].length)];r.push(h),n[c]=n[c].filter(y=>y.id!==h.id)}});const l={};t.forEach(c=>l[c]=1);const d=Object.values(n).flat();for(;r.length<a&&d.length>0;){const c=Math.floor(Math.random()*d.length),h=d[c];r.push(h),l[h.category]++,d.splice(c,1)}if(r.length<a)throw new Error("Cannot build deck: insufficient cards available");this.state.deck=this.shuffleArray(r),this.state.drawPile=this.state.deck.map(c=>c.id),this.state.discardPile=[],this.notifyListeners(),console.log("Deck built successfully:",{totalCards:this.state.deck.length,categories:t,cardsPerCategory:l})}generatePlayerOrder(){if(!this.state.teams||this.state.teams.length!==2)throw new Error("Teams must be configured before generating player order");const t=[...this.state.teams[0].players],a=[...this.state.teams[1].players],i=this.shuffleArray(t),s=this.shuffleArray(a),r=[],n=Math.max(i.length,s.length);for(let l=0;l<n;l++)l<i.length&&r.push(i[l]),l<s.length&&r.push(s[l]);this.state.playerOrder=r,this.notifyListeners(),console.log("Player order generated:",r)}startCardSelection(){if(!this.state.config)throw new Error("Game must be configured before starting card selection");if(!this.state.playerOrder||this.state.playerOrder.length===0)throw new Error("Player order must be generated before starting card selection");this.state.cardSelectionPhase=!0,this.state.currentPlayerSelectionIndex=0,this.state.selectedCards=[],this.state.allShownCards=[],this.state.playerSelections={},this.generateCardsForPlayer(),this.notifyListeners(),console.log("Card selection phase started")}generateCardsForPlayer(){const{categories:t}=this.state.config,a=f(t),i=new Set(this.state.allShownCards.map(n=>n.id)),s=a.filter(n=>!i.has(n.id));if(s.length<16)throw new Error("Not enough unused cards available for selection");const r=this.shuffleArray([...s]);this.state.currentPlayerCards=r.slice(0,16),this.state.allShownCards.push(...this.state.currentPlayerCards),this.notifyListeners(),console.log(`Generated 16 cards for player: ${this.getCurrentPlayerName()}`)}getCurrentPlayerName(){return this.state.cardSelectionPhase?this.state.playerOrder[this.state.currentPlayerSelectionIndex]:this.state.playerOrder[this.state.currentPlayerIndex]}selectCards(t){if(!this.state.cardSelectionPhase)throw new Error("Not in card selection phase");if(t.length!==8)throw new Error("Player must select exactly 8 cards");const a=new Set(this.state.currentPlayerCards.map(r=>r.id));if(t.filter(r=>!a.has(r.id)).length>0)throw new Error("Selected cards must be from the current player's options");const s=this.getCurrentPlayerName();this.state.playerSelections[s]=t,this.state.selectedCards.push(...t),console.log(`Player ${s} selected 8 cards`),this.state.currentPlayerSelectionIndex++,this.state.currentPlayerSelectionIndex>=this.state.playerOrder.length?this.finishCardSelection():this.generateCardsForPlayer(),this.notifyListeners()}finishCardSelection(){this.state.cardSelectionPhase=!1,this.state.deck=[...this.state.selectedCards],this.state.drawPile=this.state.deck.map(t=>t.id),this.state.discardPile=[],this.state.currentPlayerCards=[],this.state.allShownCards=[],this.state.currentPlayerSelectionIndex=0,this.notifyListeners(),console.log(`Card selection completed. Final deck has ${this.state.deck.length} cards`),console.log("Player selections:",this.state.playerSelections)}shuffleArray(t){for(let a=t.length-1;a>0;a--){const i=Math.floor(Math.random()*(a+1));[t[a],t[i]]=[t[i],t[a]]}return t}startRound(t){if(t<1||t>3)throw new Error("Round number must be 1, 2, or 3");this.state.round=t,this.state.turnActive=!1,this.state.currentCard=null,this.state.drawPile=this.state.deck.map(a=>a.id),this.state.discardPile=[],this.state.teams.forEach((a,i)=>{this.state.teamScores[i]||(this.state.teamScores[i]=[]),this.state.teamScores[i][t-1]||(this.state.teamScores[i][t-1]=0)}),this.notifyListeners(),console.log(`Round ${t} started`)}startTurn(){var t;if(this.state.turnActive)throw new Error("A turn is already active");if(this.state.drawPile.length===0)throw new Error("No cards left in draw pile");this.state.turnActive=!0,this.state.timerSeconds=((t=this.state.config)==null?void 0:t.timerSeconds)||60,this.state.turnGuessedCards=[],this.state.turnSkippedCards=[],this.state.turnReshuffledCards=[],this.state.lastTurnSummary=null,this.drawCard(),this.startTimer(),this.notifyListeners(),console.log(`Turn started for player: ${this.getCurrentPlayerName()}`)}endTurn(){var l;if(!this.state.turnActive)throw new Error("No active turn to end");this.stopTimer();const t=this.getCurrentPlayerName(),a=this.getTeamForPlayer(t),i={player:t,teamId:a.id,round:this.state.round,guessedCardIds:this.state.turnGuessedCards.map(d=>d.id),skippedCardIds:this.state.turnSkippedCards.map(d=>d.id),durationSec:Math.max(1,(((l=this.state.config)==null?void 0:l.timerSeconds)||60)-this.state.timerSeconds),timestamp:Date.now()};this.state.history.push(i);const s=this.state.turnGuessedCards.reduce((d,c)=>d+c.points,0),r=this.state.teams.findIndex(d=>d.id===a.id);if(r===-1)throw new Error(`Team not found for player ${t}. Team ID: ${a.id}`);this.state.teamScores[r]||(this.state.teamScores[r]=[]),this.state.teamScores[r][this.state.round-1]===void 0&&(this.state.teamScores[r][this.state.round-1]=0),this.state.teamScores[r][this.state.round-1]+=s,this.state.turnGuessedCards.forEach(d=>{this.state.guessedOnce.add(d.id)}),this.state.lastTurnSummary={playerName:t,teamName:a.name,guessedCount:this.state.turnGuessedCards.length,skippedCount:this.state.turnSkippedCards.length,points:s,guessedCards:[...this.state.turnGuessedCards],skippedCards:[...this.state.turnSkippedCards]};const n=[];if(this.state.turnSkippedCards.length>0&&n.push(...this.state.turnSkippedCards.map(d=>d.id)),this.state.currentCard&&n.push(this.state.currentCard.id),n.length>0){const d=n.filter(c=>!this.state.drawPile.includes(c));d.forEach(c=>{const h=Math.floor(Math.random()*(this.state.drawPile.length+1));this.state.drawPile.splice(h,0,c)}),d.length>0&&console.log(`Returned ${d.length} skipped cards to draw pile for future turns`)}this.state.turnActive=!1,this.state.currentCard=null,this.state.turnGuessedCards=[],this.state.turnSkippedCards=[],this.state.turnReshuffledCards=[],this.nextPlayer(),this.notifyListeners(),console.log(`Turn ended for player: ${t}, points earned: ${s}`)}guessCurrent(){if(!this.state.turnActive)throw new Error("No active turn");if(!this.state.currentCard)throw new Error("No current card to guess");this.state.turnGuessedCards.push(this.state.currentCard),console.log(`Card guessed: ${this.state.currentCard.title}`),this.state.timerSeconds>0?this.drawCard():this.state.currentCard=null,this.notifyListeners()}skipCurrent(){if(!this.state.turnActive)throw new Error("No active turn");if(!this.state.currentCard)throw new Error("No current card to skip");this.state.turnSkippedCards.push(this.state.currentCard),console.log(`Card skipped: ${this.state.currentCard.title}`),this.state.currentCard=null,this.drawCard(),this.notifyListeners()}nextTeam(){console.log("GameStore.nextTeam called")}nextPlayer(){this.state.currentPlayerIndex=(this.state.currentPlayerIndex+1)%this.state.playerOrder.length}getTeamForPlayer(t){return this.state.teams.find(a=>a.players.includes(t))}drawCard(){if(this.state.drawPile.length===0&&this.state.turnSkippedCards.length>0){const a=[...this.state.turnSkippedCards],i=a.map(s=>s.id);this.state.turnReshuffledCards.push(...a);for(let s=i.length-1;s>0;s--){const r=Math.floor(Math.random()*(s+1));[i[s],i[r]]=[i[r],i[s]]}this.state.drawPile.push(...i),this.state.turnSkippedCards=[],console.log(`Reshuffled ${i.length} cards back into draw pile`)}if(this.state.drawPile.length===0){this.state.currentCard=null;return}const t=this.state.drawPile.shift();this.state.currentCard=this.state.deck.find(a=>a.id===t)}startTimer(){this.stopTimer(),this.state.timerInterval=setInterval(()=>{this.state.timerSeconds--,this.state.timerSeconds<=0&&this.stopTimer(),this.notifyListeners()},1e3)}stopTimer(){this.state.timerInterval&&(clearInterval(this.state.timerInterval),this.state.timerInterval=null)}resetTimer(){var t;this.stopTimer(),this.state.timerSeconds=((t=this.state.config)==null?void 0:t.timerSeconds)||60,this.notifyListeners()}isRoundComplete(){return this.state.guessedOnce.size===this.state.deck.length}tallyRound(){const t=[0,0],a=this.state.history.filter(i=>i.round===this.state.round);for(const i of a){const s=i.player,r=this.getTeamForPlayer(s);if(!r){console.warn(`Could not find team for player: ${s}`);continue}const n=this.state.teams.findIndex(d=>d.id===r.id);if(n===-1){console.warn(`Could not find team index for team: ${r.id}`);continue}const l=i.guessedCardIds.reduce((d,c)=>{const h=this.state.deck.find(y=>y.id===c);return d+(h?h.points:0)},0);t[n]+=l}this.state.teams.forEach((i,s)=>{this.state.teamScores[s]||(this.state.teamScores[s]=[]),this.state.teamScores[s][this.state.round-1]=t[s]}),console.log(`Round ${this.state.round} tallied - Team scores: ${t.join(", ")}`),this.notifyListeners()}nextRound(){return this.state.round>=3?(console.log("Game complete - all rounds finished"),!1):(this.tallyRound(),this.state.turnGuessedCards=[],this.state.turnSkippedCards=[],this.state.turnActive=!1,this.state.currentCard=null,this.state.guessedOnce.clear(),this.startRound(this.state.round+1),console.log(`Advanced to Round ${this.state.round}`),!0)}reset(){this.stopTimer(),this.state={config:null,teams:[],playerOrder:[],deck:[],drawPile:[],discardPile:[],round:1,teamOrder:[],currentTeamIndex:0,turnActive:!1,history:[],guessedOnce:new Set,cardSelectionPhase:!1,currentPlayerSelectionIndex:0,currentPlayerCards:[],selectedCards:[],allShownCards:[],playerSelections:{},currentPlayerIndex:0,currentCard:null,timerSeconds:60,timerInterval:null,turnGuessedCards:[],turnSkippedCards:[],turnReshuffledCards:[],teamScores:[[],[]]},this.notifyListeners(),console.log("GameStore.reset called")}getState(){return this.state}subscribe(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}notifyListeners(){this.listeners.forEach(t=>{try{t(this.state)}catch(a){console.error("Error in state listener:",a)}})}}const o=new L,q="72c0828d86f7867e9f4abfa21fd1d40a3a736d2db8edbc624daaf5548e2cc2d1";async function M(e){const t=new TextEncoder().encode(e),a=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(a)).map(r=>r.toString(16).padStart(2,"0")).join("")}async function R(e){try{return await M(e)===q}catch(t){return console.error("Password validation error:",t),!1}}function E(){return sessionStorage.getItem("chhota-pandit-auth")==="true"}function w(e){e?sessionStorage.setItem("chhota-pandit-auth","true"):sessionStorage.removeItem("chhota-pandit-auth")}function x(){w(!1),location.reload()}let g=!1;document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#app");e&&(E()?C(e):V(e)),console.log("Chhota Pandit app initialized")});function V(e){e.innerHTML=`
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Chhota Pandit</h1>
          <p>Enter password to access the game</p>
        </div>

        <form id="loginForm" class="login-form">
          <div class="password-group">
            <input
              type="password"
              id="passwordInput"
              placeholder="Enter password"
              required
              autocomplete="off"
            >
          </div>

          <button type="submit" class="login-button">
            Access Game
          </button>

          <div id="loginError" class="login-error hidden">
            Incorrect password. Please try again.
          </div>
        </form>
      </div>
    </div>
  `,G()}function C(e){e.innerHTML=`
      <header>
        <h1>Chhota Pandit</h1>
        <p>Party Word-Guessing Game</p>
        <button type="button" id="logoutBtn" class="logout-btn">Logout</button>
      </header>

      <main>
        <!-- Setup View -->
        <section id="setupView" class="view">
          <h2>Game Setup</h2>

          <div class="setup-section">
            <h3>Team 1</h3>
            <div class="team-config">
              <div class="team-name">
                <label for="team1Name">Team Name:</label>
                <input type="text" id="team1Name" placeholder="Enter team 1 name" required>
              </div>
              <div class="team-players">
                <label>Players (3-6 required):</label>
                <div id="team1Players">
                  <input type="text" placeholder="Player 1 name" class="player-input" required>
                  <input type="text" placeholder="Player 2 name" class="player-input" required>
                  <input type="text" placeholder="Player 3 name" class="player-input" required>
                </div>
                <div class="player-controls">
                  <button type="button" class="add-player-btn" data-team="1">Add Player</button>
                  <button type="button" class="remove-player-btn" data-team="1">Remove Player</button>
                </div>
              </div>
            </div>
          </div>

          <div class="setup-section">
            <h3>Team 2</h3>
            <div class="team-config">
              <div class="team-name">
                <label for="team2Name">Team Name:</label>
                <input type="text" id="team2Name" placeholder="Enter team 2 name" required>
              </div>
              <div class="team-players">
                <label>Players (3-6 required):</label>
                <div id="team2Players">
                  <input type="text" placeholder="Player 1 name" class="player-input" required>
                  <input type="text" placeholder="Player 2 name" class="player-input" required>
                  <input type="text" placeholder="Player 3 name" class="player-input" required>
                </div>
                <div class="player-controls">
                  <button type="button" class="add-player-btn" data-team="2">Add Player</button>
                  <button type="button" class="remove-player-btn" data-team="2">Remove Player</button>
                </div>
              </div>
            </div>
          </div>

          <div class="setup-section">
            <h3>Categories</h3>
            <div id="categoryTiles" class="category-tiles">
              <div class="category-loading">Loading categories...</div>
            </div>
            <small>Select multiple categories for variety</small>
          </div>

          <div class="setup-section">
            <h3>Game Info</h3>
            <div class="game-info-display">
              <div class="info-item">
                <strong>Timer:</strong> 60 seconds per turn
              </div>
              <div class="info-item">
                <strong>Deck Size:</strong> <span id="deckSizeDisplay">Calculated based on players</span>
              </div>
              <div class="info-item">
                <strong>Cards per Player:</strong> 16 dealt, keep 8
              </div>
            </div>
          </div>

          <div id="setupValidation" class="validation-message hidden"></div>

          <!-- Quick Test Button (for development) -->
          <div class="quick-test-section">
            <button type="button" id="quickTestBtn" class="secondary-btn">🚀 Quick Test (Skip to Gameplay)</button>
            <p style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">
              Creates default teams and automatically selects cards for quick testing
            </p>
          </div>

          <button type="button" id="startGameBtn" class="primary-btn">Start Game</button>
        </section>

        <!-- Card Selection View -->
        <section id="cardSelectionView" class="view hidden">
          <h2>Card Selection</h2>

          <div class="selection-info">
            <h3>Current Player: <span id="currentPlayerName">Player</span></h3>
            <p>Select <strong>8 cards</strong> from the 16 cards below to include in the game.</p>
            <div class="selection-progress">
              <span id="selectionCount">0</span> / 8 cards selected
            </div>
          </div>

          <div id="cardGrid" class="card-grid">
            <!-- Cards will be populated here -->
          </div>

          <div class="selection-controls">
            <button type="button" id="confirmSelectionBtn" class="primary-btn" disabled>
              Confirm Selection
            </button>
            <button type="button" id="clearSelectionBtn" class="secondary-btn">
              Clear Selection
            </button>
          </div>

          <div class="selection-status">
            <div id="playersCompleted"></div>
          </div>
        </section>

        <!-- Game View -->
        <section id="gameView" class="view hidden">
          <h2>Round <span id="currentRound">1</span></h2>

          <div class="round-rules">
            <div id="roundHints" class="round-hints">
              <strong>Say Anything:</strong> Use any words or phrases to describe the card.
            </div>
          </div>

          <div class="game-info">
            <div class="current-player">
              <h3>Current Player: <span id="currentPlayerName">Player 1</span></h3>
              <div class="current-team">Team: <span id="currentTeamName">Team 1</span></div>
            </div>

            <div class="timer-display">
              <span id="timerDisplay">01:00</span>
            </div>
          </div>

          <!-- Pre-turn state -->
          <div id="preTurnState" class="pre-turn">
            <div class="turn-message">
              <h3>Ready to start your turn?</h3>
              <p>You have 60 seconds to get your team to guess as many cards as possible!</p>
            </div>
            <button type="button" id="startTurnBtn" class="primary-btn">Start Turn</button>
          </div>

          <!-- Active turn state -->
          <div id="activeTurnState" class="active-turn hidden">
            <div class="card-area">
              <div id="currentCardDisplay" class="card game-card">
                <div class="card-content">
                  <h3 id="cardTitle">Card will appear here</h3>
                  <div id="cardHints" class="card-hints"></div>
                  <div id="cardMeta" class="card-meta">
                    <span id="cardCategory" class="category"></span>
                    <span id="cardPoints" class="points"></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="game-controls">
              <button type="button" id="guessedBtn" class="success-btn" disabled>Guessed! ✓</button>
              <button type="button" id="skipBtn" class="neutral-btn" disabled>Skip</button>
            </div>

            <div class="turn-stats">
              <div class="stat">
                <span class="stat-label">Guessed:</span>
                <span id="guessedCount">0</span>
              </div>
              <div class="stat">
                <span class="stat-label">Skipped:</span>
                <span id="skippedCount">0</span>
              </div>
              <div class="stat">
                <span class="stat-label">Points this turn:</span>
                <span id="turnPoints">0</span>
              </div>
            </div>
          </div>

          <!-- Post-turn state -->
          <div id="postTurnState" class="post-turn hidden">
            <div class="turn-summary">
              <h3>Turn Complete!</h3>
              <div class="final-stats">
                <div>Cards guessed: <span id="finalGuessedCount">0</span></div>
                <div>Cards skipped: <span id="finalSkippedCount">0</span></div>
                <div>Points earned: <span id="finalTurnPoints">0</span></div>
              </div>
            </div>
            <button type="button" id="nextPlayerBtn" class="primary-btn">Next Player</button>
          </div>

          <!-- Live Scoreboard -->
          <div class="live-scoreboard">
            <h4>Live Scores</h4>
            <div id="liveScores" class="score-display">
              <!-- Dynamic score content -->
            </div>
          </div>

        </section>

        <!-- Score View -->
        <section id="scoreView" class="view hidden">
          <h2>Scoreboard</h2>

          <div class="score-tables">
            <div class="round-scores">
              <h3>Round Scores</h3>
              <table id="roundScoresTable">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Round 1</th>
                    <th>Round 2</th>
                    <th>Round 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Team 1</td>
                    <td>0</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Team 2</td>
                    <td>0</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="total-scores">
              <h3>Total Scores</h3>
              <table id="totalScoresTable">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Team 1</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Team 2</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Chhota Pandit - A party word-guessing game</p>
      </footer>

      <!-- Modal Container -->
      <div id="modalContainer" class="modal hidden">
        <div class="modal-content">
          <h3 id="modalTitle">Modal Title</h3>
          <p id="modalMessage">Modal message content</p>
          <div class="modal-actions">
            <button type="button" id="modalConfirm" class="primary-btn">OK</button>
            <button type="button" id="modalCancel" class="secondary-btn">Cancel</button>
          </div>
        </div>
      </div>
    `,H()}function H(){console.log("Chhota Pandit app initialized with layout"),console.log("Initial GameStore state:",o.getState()),F(),m(),O(),rt(),ht(),o.subscribe(t=>{const a=document.querySelector("#gameView");a&&!a.classList.contains("hidden")&&(p(),t.turnActive&&t.timerSeconds===0&&!g&&(g=!0,J()),t.turnActive||(g=!1))});const e=document.querySelector("#logoutBtn");e&&e.addEventListener("click",x)}function G(){const e=document.querySelector("#loginForm"),t=document.querySelector("#passwordInput"),a=document.querySelector("#loginError");e.addEventListener("submit",async i=>{i.preventDefault();const s=t.value.trim();if(!s)return;const r=e.querySelector('button[type="submit"]'),n=r.textContent;r.textContent="Checking...",r.disabled=!0;try{if(await R(s)){w(!0);const d=document.querySelector("#app");C(d)}else a.classList.remove("hidden"),t.value="",t.focus(),setTimeout(()=>{a.classList.add("hidden")},3e3)}catch(l){console.error("Login error:",l),a.textContent="An error occurred. Please try again.",a.classList.remove("hidden")}finally{r.textContent=n,r.disabled=!1}}),t.focus()}function F(){document.querySelectorAll(".add-player-btn").forEach(e=>{e.addEventListener("click",t=>{const a=t.target.dataset.team;N(a)})}),document.querySelectorAll(".remove-player-btn").forEach(e=>{e.addEventListener("click",t=>{const a=t.target.dataset.team;I(a)})}),document.addEventListener("input",e=>{e.target.classList.contains("player-input")&&m()})}function N(e){const t=document.querySelector(`#team${e}Players`),a=t.querySelectorAll(".player-input");if(a.length<6){const i=document.createElement("input");i.type="text",i.placeholder=`Player ${a.length+1} name`,i.className="player-input",i.required=!0,t.appendChild(i),m()}}function I(e){const t=document.querySelector(`#team${e}Players`),a=t.querySelectorAll(".player-input");a.length>3&&(t.removeChild(a[a.length-1]),m())}function m(){const e=document.querySelectorAll("#team1Players .player-input").length,t=document.querySelectorAll("#team2Players .player-input").length,a=e+t,i=a*8,s=document.querySelector("#deckSizeDisplay");s&&(s.textContent=`${i} cards (${a} players × 8 cards each)`);const r=document.querySelector("#setupValidation");Math.abs(e-t)>1?(r.textContent=`Team sizes must be within 1 player of each other. Current: Team 1 (${e}), Team 2 (${t})`,r.classList.remove("hidden"),r.classList.add("error")):(r.classList.add("hidden"),r.classList.remove("error"))}function O(){const e=document.querySelector("#startGameBtn"),t=document.querySelector("#quickTestBtn"),a=document.querySelector("#startTurnBtn"),i=document.querySelector("#guessedBtn"),s=document.querySelector("#skipBtn"),r=document.querySelector("#nextPlayerBtn");e&&e.addEventListener("click",U),t&&t.addEventListener("click",ut),a&&a.addEventListener("click",D),i&&i.addEventListener("click",K),s&&s.addEventListener("click",$),r&&r.addEventListener("click",j)}function D(){try{o.startTurn()}catch(e){console.error("Error starting turn:",e),alert(e.message)}}function K(){try{o.guessCurrent()}catch(e){console.error("Error marking card as guessed:",e),alert(e.message)}}function $(){try{o.skipCurrent()}catch(e){console.error("Error skipping card:",e),alert(e.message)}}function j(){try{o.getState().turnActive&&o.endTurn(),o.resetTimer();const t=o.getState();if(o.isRoundComplete())if(console.log(`Round ${t.round} complete!`),t.round<3){if(o.nextRound()){const i=o.getState();z(i.round)}}else o.tallyRound(),W();else p()}catch(e){console.error("Error handling next player:",e),alert(e.message)}}function z(e){const t={1:"Say Anything",2:"One Word Only",3:"Actions Only"},a={1:"Use any words or phrases to describe the card.",2:"You can only say ONE WORD per card. No gestures, sounds, or additional words!",3:"No words allowed! Use only gestures and actions to act out the card."};b(`Round ${e}: ${t[e]}`,`${a[e]}

All cards are back in play. Ready to start Round ${e}?`,"Start Round",()=>{p()})}function W(){const e=o.getState(),t=e.teamScores[0].reduce((r,n)=>r+(n||0),0),a=e.teamScores[1].reduce((r,n)=>r+(n||0),0),i=t>a?e.teams[0].name:a>t?e.teams[1].name:"Tie",s=i==="Tie"?`Game Complete!

It's a tie! Both teams scored ${t} points.`:`Game Complete!

${i} wins with ${Math.max(t,a)} points!`;b("Game Complete!",s,"View Final Scores",()=>{document.querySelector("#gameView").classList.add("hidden"),document.querySelector("#scoreView").classList.remove("hidden"),st()})}function b(e,t,a,i){const s=document.createElement("div");s.className="modal-backdrop";const r=document.createElement("div");r.className="modal-content",r.innerHTML=`
    <h3>${e}</h3>
    <p>${t}</p>
    <div class="modal-actions">
      <button class="primary-btn modal-confirm-btn">${a}</button>
    </div>
  `,s.appendChild(r),document.body.appendChild(s),r.querySelector(".modal-confirm-btn").addEventListener("click",()=>{document.body.removeChild(s),i&&i()}),s.addEventListener("click",l=>{l.target===s&&(document.body.removeChild(s),i&&i())})}function J(){const e=o.getState();e.turnActive&&(console.log("Timer expired - handling last card"),e.currentCard&&(confirm(`Time's up! Was the last card "${e.currentCard.title}" guessed correctly?

Click OK if YES, Cancel if NO.`)?o.guessCurrent():o.skipCurrent()),o.endTurn(),console.log("Turn ended due to timer expiration"))}function U(){const e=Y(),t=document.querySelector("#setupValidation");if(!e.isValid){t.textContent=e.message,t.classList.remove("hidden"),t.classList.add("error");return}t.classList.add("hidden"),t.classList.remove("error");const a=Q(),i=P();if(i.length===0){t.textContent="Please select at least one category.",t.classList.remove("hidden"),t.classList.add("error");return}const s={teamNames:a.map(r=>r.name),teams:a,categories:i,deckSize:a.flatMap(r=>r.players).length*8,timerSeconds:60};o.configure(s);try{o.buildDeck()}catch(r){t.textContent=r.message,t.classList.remove("hidden"),t.classList.add("error");return}o.generatePlayerOrder(),console.log("Game started with player order:",o.getState().playerOrder),o.startCardSelection(),document.querySelector("#setupView").classList.add("hidden"),document.querySelector("#cardSelectionView").classList.remove("hidden"),k()}function Y(){const e=document.querySelector("#team1Name").value.trim(),t=document.querySelector("#team2Name").value.trim();if(!e||!t)return{isValid:!1,message:"Both team names are required."};const a=Array.from(document.querySelectorAll("#team1Players .player-input")).map(l=>l.value.trim()).filter(l=>l!==""),i=Array.from(document.querySelectorAll("#team2Players .player-input")).map(l=>l.value.trim()).filter(l=>l!=="");if(a.length<3||i.length<3)return{isValid:!1,message:"Each team must have at least 3 players."};if(a.length>6||i.length>6)return{isValid:!1,message:"Each team can have at most 6 players."};if(Math.abs(a.length-i.length)>1)return{isValid:!1,message:"Team sizes must be within 1 player of each other."};const r=[...a,...i],n=new Set(r);return r.length!==n.size?{isValid:!1,message:"All player names must be unique."}:{isValid:!0}}function Q(){const e=document.querySelector("#team1Name").value.trim(),t=document.querySelector("#team2Name").value.trim(),a=Array.from(document.querySelectorAll("#team1Players .player-input")).map(s=>s.value.trim()).filter(s=>s!==""),i=Array.from(document.querySelectorAll("#team2Players .player-input")).map(s=>s.value.trim()).filter(s=>s!=="");return[{id:"team1",name:e,players:a},{id:"team2",name:t,players:i}]}function Z(){const e=o.getState();!e.turnActive&&e.round===1&&e.drawPile.length===0&&o.startRound(1),p()}function p(){const e=o.getState(),t=document.querySelector("#currentRound");t&&(t.textContent=e.round);const a=document.querySelector("#roundHints");if(a){const l={1:"<strong>Say Anything:</strong> Use any words or phrases to describe the card.",2:"<strong>One Word Only:</strong> You can only say ONE WORD per card. No gestures!",3:"<strong>Actions Only:</strong> No words allowed! Use only gestures and actions."};a.innerHTML=l[e.round]||l[1]}const i=e.playerOrder[e.currentPlayerIndex],s=o.getTeamForPlayer(i);document.querySelectorAll("#currentPlayerName").forEach(l=>{l&&(l.textContent=i)});const n=document.querySelector("#currentTeamName");n&&(n.textContent=s?s.name:"Unknown"),_(),X(),tt(),et(),it()}function _(){const e=o.getState(),t=document.querySelector("#timerDisplay");if(t){const a=Math.floor(e.timerSeconds/60),i=e.timerSeconds%60;t.textContent=`${a.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`,e.timerSeconds<=10&&e.turnActive?t.classList.add("warning"):t.classList.remove("warning")}}function X(){const e=o.getState(),t=document.querySelector("#preTurnState"),a=document.querySelector("#activeTurnState"),i=document.querySelector("#postTurnState");if(t==null||t.classList.add("hidden"),a==null||a.classList.add("hidden"),i==null||i.classList.add("hidden"),!e.turnActive&&e.timerSeconds>0)t==null||t.classList.remove("hidden");else if(e.turnActive){a==null||a.classList.remove("hidden");const s=document.querySelector("#guessedBtn"),r=document.querySelector("#skipBtn");if(s&&r){const n=e.currentCard!==null;s.disabled=!n,r.disabled=!n}}else e.timerSeconds===0&&(i==null||i.classList.remove("hidden"),at())}function tt(){const t=o.getState().currentCard,a=document.querySelector("#cardTitle"),i=document.querySelector("#cardHints"),s=document.querySelector("#cardCategory"),r=document.querySelector("#cardPoints");t?(a&&(a.textContent=t.title),i&&(i.textContent=t.hints||""),s&&(s.textContent=t.category),r&&(r.textContent=`${t.points} pts`)):(a&&(a.textContent="No more cards"),i&&(i.textContent=""),s&&(s.textContent=""),r&&(r.textContent=""))}function et(){const e=o.getState(),t=document.querySelector("#guessedCount"),a=document.querySelector("#skippedCount"),i=document.querySelector("#turnPoints");if(t&&(t.textContent=e.turnGuessedCards.length),a&&(a.textContent=e.turnSkippedCards.length),i){const s=e.turnGuessedCards.reduce((r,n)=>r+n.points,0);i.textContent=s}}function at(){const e=o.getState(),t=document.querySelector("#finalGuessedCount"),a=document.querySelector("#finalSkippedCount"),i=document.querySelector("#finalTurnPoints"),s=e.lastTurnSummary;if(s)t&&(t.textContent=s.guessedCount),a&&(a.textContent=s.skippedCount),i&&(i.textContent=s.points);else if(t&&(t.textContent=e.turnGuessedCards.length),a&&(a.textContent=e.turnSkippedCards.length),i){const r=e.turnGuessedCards.reduce((n,l)=>n+l.points,0);i.textContent=r}}function it(){const e=o.getState(),t=document.querySelector("#liveScores");if(!t||!e.teams.length)return;const a=e.teams.map((i,s)=>{const r=e.teamScores[s]||[],n=r[e.round-1]||0,l=r.reduce((d,c)=>d+(c||0),0);return`
      <div class="team-score">
        <div class="team-name">${i.name}</div>
        <div class="score-details">
          <span class="round-score">Round ${e.round}: ${n}</span>
          <span class="total-score">Total: ${l}</span>
        </div>
      </div>
    `}).join("");t.innerHTML=a}function st(){const e=o.getState(),t=document.querySelector("#roundScoresTable tbody");if(t&&e.teams.length>0){const i=e.teams.map((s,r)=>{const n=e.teamScores[r]||[];return`
        <tr>
          <td>${s.name}</td>
          <td>${n[0]||"-"}</td>
          <td>${n[1]||"-"}</td>
          <td>${n[2]||"-"}</td>
        </tr>
      `}).join("");t.innerHTML=i}const a=document.querySelector("#totalScoresTable tbody");if(a&&e.teams.length>0){const i=e.teams.map((s,r)=>{const l=(e.teamScores[r]||[]).reduce((d,c)=>d+(c||0),0);return`
        <tr>
          <td>${s.name}</td>
          <td>${l}</td>
        </tr>
      `}).join("");a.innerHTML=i}}function rt(){const e=document.querySelector("#categoryTiles");if(e){const t=B();e.innerHTML="";const a={Bollywood:"🎬",Sports:"⚽",Movies:"🍿",Music:"🎵",History:"📚",Science:"🔬",Technology:"💻",Food:"🍽️",Travel:"✈️",Art:"🎨"};t.forEach(i=>{const s=document.createElement("div");s.className="category-tile",s.dataset.category=i,s.innerHTML=`
        <div class="category-icon">${a[i]||"�"}</div>
        <div class="category-name">${i}</div>
      `,s.addEventListener("click",()=>{s.classList.toggle("selected")}),e.appendChild(s)}),console.log("Categories populated:",t)}}function P(){const e=document.querySelector("#categoryTiles");if(!e)return[];const t=e.querySelectorAll(".category-tile.selected");return Array.from(t).map(a=>a.dataset.category)}function k(){const e=o.getState(),t=document.querySelector("#currentPlayerName");t&&(t.textContent=e.playerOrder[e.currentPlayerSelectionIndex]),S(),nt(e.currentPlayerCards),lt(),console.log(`Card selection view updated for: ${e.playerOrder[e.currentPlayerSelectionIndex]}`)}function nt(e){const t=document.querySelector("#cardGrid");t&&(t.innerHTML="",e.forEach(a=>{const i=document.createElement("div");i.className="selection-card",i.dataset.cardId=a.id,i.innerHTML=`
      <div class="card-content">
        <h4>${a.title}</h4>
        ${a.hints?`<div class="card-hints">${a.hints}</div>`:""}
        <div class="card-meta">
          <span class="category">${a.category}</span>
          <span class="points">${a.points} pts</span>
        </div>
      </div>
      <div class="card-selection-indicator"></div>
    `,i.addEventListener("click",()=>ot(a.id)),t.appendChild(i)}))}const u=new Set;function ot(e){const t=document.querySelector(`[data-card-id="${e}"]`);t&&(u.has(e)?(u.delete(e),t.classList.remove("selected")):u.size<8&&(u.add(e),t.classList.add("selected")),S(),T())}function S(){const e=document.querySelector("#selectionCount");e&&(e.textContent=u.size)}function T(){const e=document.querySelector("#confirmSelectionBtn");e&&(e.disabled=u.size!==8)}function lt(){const e=o.getState(),t=document.querySelector("#playersCompleted");if(!t)return;const a=Object.keys(e.playerSelections).length,i=e.playerOrder.length;t.innerHTML=`
    <h4>Progress: ${a}/${i} players completed</h4>
    ${Object.keys(e.playerSelections).map(s=>`<div class="completed-player">✓ ${s}</div>`).join("")}
  `}function dt(){const t=o.getState().currentPlayerCards.filter(a=>u.has(a.id));try{o.selectCards(t),u.clear(),o.getState().cardSelectionPhase?k():(document.querySelector("#cardSelectionView").classList.add("hidden"),document.querySelector("#gameView").classList.remove("hidden"),Z())}catch(a){console.error("Error confirming selection:",a),alert(a.message)}}function ct(){u.clear(),document.querySelectorAll(".selection-card.selected").forEach(e=>{e.classList.remove("selected")}),S(),T()}function ht(){const e=document.querySelector("#confirmSelectionBtn"),t=document.querySelector("#clearSelectionBtn");e&&e.addEventListener("click",dt),t&&t.addEventListener("click",ct)}function ut(){console.log("Quick test mode activated!"),document.querySelector("#team1Name").value="Team A",document.querySelector("#team2Name").value="Team B";const e=document.querySelectorAll("#team1Players .player-input"),t=document.querySelectorAll("#team2Players .player-input");e.length>=3&&(e[0].value="P1",e[1].value="P2",e[2].value="P3"),t.length>=3&&(t[0].value="P4",t[1].value="P5",t[2].value="P6");const a=document.querySelector("#categoryTiles");a&&a.querySelectorAll(".category-tile").forEach(n=>{n.classList.add("selected")});const i=P();if(i.length===0){alert("No categories available for quick test");return}const s={teamNames:["Team A","Team B"],teams:[{id:"team1",name:"Team A",players:["P1","P2","P3"]},{id:"team2",name:"Team B",players:["P4","P5","P6"]}],categories:i,deckSize:48,timerSeconds:60};try{o.configure(s),o.generatePlayerOrder(),o.buildDeck(),o.startCardSelection(),o.getState().playerOrder.forEach(()=>{const d=o.getState().currentPlayerCards.slice(0,8);o.selectCards(d)}),document.querySelector("#setupView").classList.add("hidden"),document.querySelector("#cardSelectionView").classList.add("hidden"),document.querySelector("#gameView").classList.remove("hidden"),o.startRound(1),p(),console.log("Quick test setup complete - jumped straight to gameplay!")}catch(r){console.error("Quick test setup failed:",r),alert(`Quick test setup failed: ${r.message}`)}}
