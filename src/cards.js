/**
 * Card database for Chhota Pandit game
 * Each card has: id, title, category, points (1-4), optional hints
 */

export const CARDS = [
  // Bollywood Movies (50 cards)
  { id: 'bw001', title: '3 Idiots', category: 'Bollywood', points: 2, hints: 'Aamir engineering college friends' },
  { id: 'bw002', title: 'Sholay', category: 'Bollywood', points: 2, hints: 'Amitabh Dharmendra dacoit Gabbar' },
  { id: 'bw003', title: 'Dilwale Dulhania Le Jayenge', category: 'Bollywood', points: 3, hints: 'Shah Rukh Kajol train Europe' },
  { id: 'bw004', title: 'Lagaan', category: 'Bollywood', points: 3, hints: 'Aamir cricket British tax' },
  { id: 'bw005', title: 'Mughal-E-Azam', category: 'Bollywood', points: 4, hints: 'Dilip Kumar Madhubala Anarkali' },
  { id: 'bw006', title: 'Zindagi Na Milegi Dobara', category: 'Bollywood', points: 2, hints: 'Three friends Spain adventure' },
  { id: 'bw007', title: 'Queen', category: 'Bollywood', points: 2, hints: 'Kangana solo honeymoon Paris' },
  { id: 'bw008', title: 'Dangal', category: 'Bollywood', points: 2, hints: 'Aamir daughters wrestling Haryana' },
  { id: 'bw009', title: 'Taare Zameen Par', category: 'Bollywood', points: 2, hints: 'Aamir dyslexia child teacher' },
  { id: 'bw010', title: 'Gully Boy', category: 'Bollywood', points: 2, hints: 'Ranveer rap Mumbai slums' },
  { id: 'bw011', title: 'Pink', category: 'Bollywood', points: 2, hints: 'Amitabh lawyer consent women' },
  { id: 'bw012', title: 'Article 15', category: 'Bollywood', points: 3, hints: 'Ayushmann police caste discrimination' },
  { id: 'bw013', title: 'Andhadhun', category: 'Bollywood', points: 3, hints: 'Ayushmann blind pianist murder' },
  { id: 'bw014', title: 'Tumhari Sulu', category: 'Bollywood', points: 2, hints: 'Vidya housewife radio jockey' },
  { id: 'bw015', title: 'Hindi Medium', category: 'Bollywood', points: 2, hints: 'Irrfan admission English school' },
  { id: 'bw016', title: 'Piku', category: 'Bollywood', points: 2, hints: 'Deepika Amitabh father daughter' },
  { id: 'bw017', title: 'Toilet Ek Prem Katha', category: 'Bollywood', points: 2, hints: 'Akshay toilet sanitation village' },
  { id: 'bw018', title: 'Pad Man', category: 'Bollywood', points: 2, hints: 'Akshay sanitary pads innovation' },
  { id: 'bw019', title: 'Super 30', category: 'Bollywood', points: 2, hints: 'Hrithik mathematics IIT coaching' },
  { id: 'bw020', title: 'Badhaai Ho', category: 'Bollywood', points: 2, hints: 'Ayushmann parents pregnancy surprise' },
  { id: 'bw021', title: 'Stree', category: 'Bollywood', points: 2, hints: 'Rajkummar horror comedy ghost' },
  { id: 'bw022', title: 'Bareilly Ki Barfi', category: 'Bollywood', points: 2, hints: 'Kriti Ayushmann Rajkummar triangle' },
  { id: 'bw023', title: 'Newton', category: 'Bollywood', points: 3, hints: 'Rajkummar election officer jungle' },
  { id: 'bw024', title: 'Masaan', category: 'Bollywood', points: 3, hints: 'Varanasi cremation ghat love' },
  { id: 'bw025', title: 'Court', category: 'Bollywood', points: 4, hints: 'Marathi legal system folk singer' },
  { id: 'bw026', title: 'Rang De Basanti', category: 'Bollywood', points: 2, hints: 'Aamir revolution documentary students' },
  { id: 'bw027', title: 'My Name Is Khan', category: 'Bollywood', points: 2, hints: 'Shah Rukh autism America 9/11' },
  { id: 'bw028', title: 'Chak De India', category: 'Bollywood', points: 2, hints: 'Shah Rukh hockey women team' },
  { id: 'bw029', title: 'Swades', category: 'Bollywood', points: 3, hints: 'Shah Rukh NASA village electricity' },
  { id: 'bw030', title: 'Haider', category: 'Bollywood', points: 3, hints: 'Shahid Kashmir Hamlet adaptation' },
  { id: 'bw031', title: 'Maqbool', category: 'Bollywood', points: 4, hints: 'Irrfan Macbeth Mumbai underworld' },
  { id: 'bw032', title: 'Omkara', category: 'Bollywood', points: 3, hints: 'Ajay Saif Othello adaptation' },
  { id: 'bw033', title: 'Gangs of Wasseypur', category: 'Bollywood', points: 3, hints: 'Manoj coal mafia revenge' },
  { id: 'bw034', title: 'Tumko Na Bhool Paayenge', category: 'Bollywood', points: 2, hints: 'Salman memory loss action' },
  { id: 'bw035', title: 'Krrish', category: 'Bollywood', points: 2, hints: 'Hrithik superhero alien powers' },
  { id: 'bw036', title: 'Don', category: 'Bollywood', points: 2, hints: 'Shah Rukh international criminal' },
  { id: 'bw037', title: 'Rock On', category: 'Bollywood', points: 2, hints: 'Farhan band music friendship' },
  { id: 'bw038', title: 'Dil Chahta Hai', category: 'Bollywood', points: 2, hints: 'Aamir Saif Akshaye friendship Goa' },
  { id: 'bw039', title: 'Kuch Kuch Hota Hai', category: 'Bollywood', points: 2, hints: 'Shah Rukh Kajol Rani college' },
  { id: 'bw040', title: 'Kabhi Khushi Kabhie Gham', category: 'Bollywood', points: 2, hints: 'Amitabh family drama reunion' },
  { id: 'bw041', title: 'Jab We Met', category: 'Bollywood', points: 2, hints: 'Shahid Kareena train journey' },
  { id: 'bw042', title: 'Tanu Weds Manu', category: 'Bollywood', points: 2, hints: 'Madhavan Kangana small town romance' },
  { id: 'bw043', title: 'Arjun Reddy', category: 'Bollywood', points: 3, hints: 'Vijay surgeon anger self destruction' },
  { id: 'bw044', title: 'Raazi', category: 'Bollywood', points: 2, hints: 'Alia spy Pakistan 1971 war' },
  { id: 'bw045', title: 'URI The Surgical Strike', category: 'Bollywood', points: 2, hints: 'Vicky military operation revenge' },
  { id: 'bw046', title: 'Shershaah', category: 'Bollywood', points: 2, hints: 'Sidharth Kargil war Param Veer' },
  { id: 'bw047', title: 'Sardar Udham', category: 'Bollywood', points: 3, hints: 'Vicky freedom fighter Jallianwala' },
  { id: 'bw048', title: 'The Kashmir Files', category: 'Bollywood', points: 3, hints: 'Anupam exodus 1990 documentary' },
  { id: 'bw049', title: 'Pushpa', category: 'Bollywood', points: 2, hints: 'Allu Arjun red sandalwood smuggling' },
  { id: 'bw050', title: 'KGF Chapter 2', category: 'Bollywood', points: 2, hints: 'Yash gold mines Rocky Bhai' },

  // Sports (50 cards)
  { id: 'sp001', title: 'Virat Kohli', category: 'Sports', points: 2, hints: 'Cricket captain batting India' },
  { id: 'sp002', title: 'MS Dhoni', category: 'Sports', points: 2, hints: 'Cricket wicket keeper captain helicopter' },
  { id: 'sp003', title: 'Sachin Tendulkar', category: 'Sports', points: 2, hints: 'Cricket god master blaster' },
  { id: 'sp004', title: 'Kapil Dev', category: 'Sports', points: 3, hints: 'Cricket world cup 1983 captain' },
  { id: 'sp005', title: 'Mary Kom', category: 'Sports', points: 3, hints: 'Boxing woman Manipur Olympics' },
  { id: 'sp006', title: 'PV Sindhu', category: 'Sports', points: 2, hints: 'Badminton Olympics silver medal' },
  { id: 'sp007', title: 'Saina Nehwal', category: 'Sports', points: 2, hints: 'Badminton world number one' },
  { id: 'sp008', title: 'Sunil Chhetri', category: 'Sports', points: 3, hints: 'Football captain goals record' },
  { id: 'sp009', title: 'Hima Das', category: 'Sports', points: 3, hints: 'Athletics sprint golden girl' },
  { id: 'sp010', title: 'Neeraj Chopra', category: 'Sports', points: 2, hints: 'Javelin throw Olympics gold' },
  { id: 'sp011', title: 'Bajrang Punia', category: 'Sports', points: 3, hints: 'Wrestling freestyle bronze Olympics' },
  { id: 'sp012', title: 'Sushil Kumar', category: 'Sports', points: 3, hints: 'Wrestling Olympics medals two' },
  { id: 'sp013', title: 'Yogeshwar Dutt', category: 'Sports', points: 3, hints: 'Wrestling Olympics bronze London' },
  { id: 'sp014', title: 'Abhinav Bindra', category: 'Sports', points: 3, hints: 'Shooting Olympics gold individual' },
  { id: 'sp015', title: 'Rajyavardhan Rathore', category: 'Sports', points: 4, hints: 'Shooting Olympics silver Athens' },
  { id: 'sp016', title: 'Leander Paes', category: 'Sports', points: 3, hints: 'Tennis doubles grand slam' },
  { id: 'sp017', title: 'Mahesh Bhupathi', category: 'Sports', points: 3, hints: 'Tennis doubles Leander partner' },
  { id: 'sp018', title: 'Sania Mirza', category: 'Sports', points: 2, hints: 'Tennis women doubles grand slam' },
  { id: 'sp019', title: 'Rohit Sharma', category: 'Sports', points: 2, hints: 'Cricket opener captain Mumbai' },
  { id: 'sp020', title: 'Hardik Pandya', category: 'Sports', points: 2, hints: 'Cricket all rounder Gujarat' },
  { id: 'sp021', title: 'Jasprit Bumrah', category: 'Sports', points: 2, hints: 'Cricket fast bowler yorker' },
  { id: 'sp022', title: 'Ravindra Jadeja', category: 'Sports', points: 2, hints: 'Cricket all rounder spin bowling' },
  { id: 'sp023', title: 'KL Rahul', category: 'Sports', points: 2, hints: 'Cricket batsman wicket keeper' },
  { id: 'sp024', title: 'Rishabh Pant', category: 'Sports', points: 2, hints: 'Cricket wicket keeper aggressive' },
  { id: 'sp025', title: 'Shikhar Dhawan', category: 'Sports', points: 2, hints: 'Cricket opener left handed' },
  { id: 'sp026', title: 'Mohammed Shami', category: 'Sports', points: 2, hints: 'Cricket fast bowler seam' },
  { id: 'sp027', title: 'Yuzvendra Chahal', category: 'Sports', points: 2, hints: 'Cricket leg spin bowler' },
  { id: 'sp028', title: 'Bhuvneshwar Kumar', category: 'Sports', points: 2, hints: 'Cricket swing bowler medium pace' },
  { id: 'sp029', title: 'Ajinkya Rahane', category: 'Sports', points: 2, hints: 'Cricket batsman Test vice captain' },
  { id: 'sp030', title: 'Cheteshwar Pujara', category: 'Sports', points: 2, hints: 'Cricket batsman Test specialist' },
  { id: 'sp031', title: 'Smriti Mandhana', category: 'Sports', points: 2, hints: 'Cricket women opener left handed' },
  { id: 'sp032', title: 'Harmanpreet Kaur', category: 'Sports', points: 2, hints: 'Cricket women captain all rounder' },
  { id: 'sp033', title: 'Mithali Raj', category: 'Sports', points: 3, hints: 'Cricket women batsman runs record' },
  { id: 'sp034', title: 'Jhulan Goswami', category: 'Sports', points: 3, hints: 'Cricket women fast bowler wickets' },
  { id: 'sp035', title: 'Kidambi Srikanth', category: 'Sports', points: 3, hints: 'Badminton men singles ranking' },
  { id: 'sp036', title: 'HS Prannoy', category: 'Sports', points: 3, hints: 'Badminton men singles Kerala' },
  { id: 'sp037', title: 'Lakshya Sen', category: 'Sports', points: 3, hints: 'Badminton young men singles' },
  { id: 'sp038', title: 'Chirag Shetty', category: 'Sports', points: 3, hints: 'Badminton men doubles pair' },
  { id: 'sp039', title: 'Satwiksairaj Rankireddy', category: 'Sports', points: 3, hints: 'Badminton men doubles Chirag partner' },
  { id: 'sp040', title: 'Mirabai Chanu', category: 'Sports', points: 2, hints: 'Weightlifting Olympics silver medal' },
  { id: 'sp041', title: 'Lovlina Borgohain', category: 'Sports', points: 3, hints: 'Boxing Olympics bronze medal' },
  { id: 'sp042', title: 'Ravi Kumar Dahiya', category: 'Sports', points: 3, hints: 'Wrestling Olympics silver medal' },
  { id: 'sp043', title: 'Deepak Punia', category: 'Sports', points: 3, hints: 'Wrestling world championship bronze' },
  { id: 'sp044', title: 'Vinesh Phogat', category: 'Sports', points: 2, hints: 'Wrestling women world championship' },
  { id: 'sp045', title: 'Sakshi Malik', category: 'Sports', points: 3, hints: 'Wrestling Olympics bronze Rio' },
  { id: 'sp046', title: 'Geeta Phogat', category: 'Sports', points: 3, hints: 'Wrestling women Commonwealth gold' },
  { id: 'sp047', title: 'Babita Kumari', category: 'Sports', points: 3, hints: 'Wrestling women Commonwealth medals' },
  { id: 'sp048', title: 'Dutee Chand', category: 'Sports', points: 3, hints: 'Athletics sprint 100m 200m' },
  { id: 'sp049', title: 'Anju Bobby George', category: 'Sports', points: 4, hints: 'Athletics long jump world bronze' },
  { id: 'sp050', title: 'PT Usha', category: 'Sports', points: 3, hints: 'Athletics sprint hurdles queen' },
  { id: 'sp051', title: 'BSNL Chauka', category: 'Sports', points: 4, hints: 'Cricket commentary catchphrase' },
  { id: 'sp052', title: 'Gilli Danda', category: 'Sports', points: 3, hints: 'Traditional Indian sport stick' },
  { id: 'sp053', title: 'Mumbai Indians', category: 'Sports', points: 1, hints: 'IPL cricket team Rohit' },
  { id: 'sp054', title: 'See you at the Gabba Mate', category: 'Sports', points: 4, hints: 'Tim Paine Rishabh Pant sledge' },
  { id: 'sp055', title: 'Natwest Series 2007', category: 'Sports', points: 2, hints: 'Cricket tournament England' },
  { id: 'sp056', title: 'Suryakumar Yadav', category: 'Sports', points: 2, hints: 'Cricket batsman Mumbai Indians' },
  { id: 'sp057', title: 'Jay Shah', category: 'Sports', points: 3, hints: 'Cricket administrator BCCI' },

  // Historical Figures (30 cards)
  { id: 'hf001', title: 'Mahatma Gandhi', category: 'Historical', points: 1, hints: 'Non-violence independence father' },
  { id: 'hf002', title: 'Subhas Chandra Bose', category: 'Historical', points: 2, hints: 'Netaji Azad Hind Fauj' },
  { id: 'hf003', title: 'Jawaharlal Nehru', category: 'Historical', points: 2, hints: 'First Prime Minister Chacha' },
  { id: 'hf004', title: 'Sardar Patel', category: 'Historical', points: 2, hints: 'Iron Man unity statue' },
  { id: 'hf005', title: 'Dr. APJ Abdul Kalam', category: 'Historical', points: 2, hints: 'Missile Man President scientist' },
  { id: 'hf006', title: 'Chandragupta Maurya', category: 'Historical', points: 3, hints: 'Mauryan Empire founder ancient' },
  { id: 'hf007', title: 'Ashoka the Great', category: 'Historical', points: 2, hints: 'Buddhist emperor pillars' },
  { id: 'hf008', title: 'Akbar', category: 'Historical', points: 2, hints: 'Mughal emperor tolerance Din-i-Ilahi' },
  { id: 'hf009', title: 'Shivaji Maharaj', category: 'Historical', points: 2, hints: 'Maratha empire mountain king' },
  { id: 'hf010', title: 'Rani Lakshmibai', category: 'Historical', points: 2, hints: 'Jhansi queen 1857 revolt' },
  { id: 'hf011', title: 'Tipu Sultan', category: 'Historical', points: 3, hints: 'Tiger of Mysore rockets' },
  { id: 'hf012', title: 'Maharana Pratap', category: 'Historical', points: 3, hints: 'Mewar Rajput horse Chetak' },
  { id: 'hf013', title: 'Prithviraj Chauhan', category: 'Historical', points: 3, hints: 'Last Hindu emperor Delhi' },
  { id: 'hf014', title: 'Aryabhata', category: 'Historical', points: 4, hints: 'Ancient mathematician astronomer zero' },
  { id: 'hf015', title: 'Chandrashekhar Azad', category: 'Historical', points: 3, hints: 'Revolutionary freedom fighter pistol' },
  { id: 'hf016', title: 'Bhagat Singh', category: 'Historical', points: 2, hints: 'Young revolutionary martyr' },
  { id: 'hf017', title: 'Rani Padmavati', category: 'Historical', points: 3, hints: 'Chittor beauty sacrifice jauhar' },
  { id: 'hf018', title: 'Swami Vivekananda', category: 'Historical', points: 3, hints: 'Chicago speech Hindu philosophy' },
  { id: 'hf019', title: 'Raja Ram Mohan Roy', category: 'Historical', points: 4, hints: 'Social reformer Brahmo Samaj' },
  { id: 'hf020', title: 'Sarojini Naidu', category: 'Historical', points: 3, hints: 'Nightingale poet freedom fighter' },
  { id: 'hf021', title: 'Bal Gangadhar Tilak', category: 'Historical', points: 3, hints: 'Lokmanya freedom fighter Swaraj' },
  { id: 'hf022', title: 'Lala Lajpat Rai', category: 'Historical', points: 3, hints: 'Punjab Kesari freedom fighter' },
  { id: 'hf023', title: 'Gopal Krishna Gokhale', category: 'Historical', points: 4, hints: 'Moderate leader political mentor' },
  { id: 'hf024', title: 'Maulana Abul Kalam Azad', category: 'Historical', points: 3, hints: 'Education minister independence leader' },
  { id: 'hf025', title: 'Khan Abdul Ghaffar Khan', category: 'Historical', points: 4, hints: 'Frontier Gandhi non-violence' },
  { id: 'hf026', title: 'Mangal Pandey', category: 'Historical', points: 3, hints: '1857 revolt sepoy mutiny' },
  { id: 'hf027', title: 'Tatya Tope', category: 'Historical', points: 4, hints: '1857 revolt military leader' },
  { id: 'hf028', title: 'Nana Saheb', category: 'Historical', points: 4, hints: '1857 revolt Kanpur leader' },
  { id: 'hf029', title: 'Begum Hazrat Mahal', category: 'Historical', points: 4, hints: '1857 revolt Lucknow leader' },
  { id: 'hf030', title: 'Kunwar Singh', category: 'Historical', points: 4, hints: '1857 revolt Bihar leader' },

  // Food Items (30 cards)
  { id: 'fd001', title: 'Biryani', category: 'Food', points: 1, hints: 'Rice meat spices layered' },
  { id: 'fd002', title: 'Butter Chicken', category: 'Food', points: 2, hints: 'Creamy tomato curry chicken' },
  { id: 'fd003', title: 'Masala Dosa', category: 'Food', points: 2, hints: 'South Indian crepe potato' },
  { id: 'fd004', title: 'Chole Bhature', category: 'Food', points: 2, hints: 'Chickpea curry fried bread' },
  { id: 'fd005', title: 'Rajma Chawal', category: 'Food', points: 2, hints: 'Kidney beans curry rice' },
  { id: 'fd006', title: 'Pani Puri', category: 'Food', points: 1, hints: 'Street food water crispy' },
  { id: 'fd007', title: 'Vada Pav', category: 'Food', points: 2, hints: 'Mumbai burger potato fritter' },
  { id: 'fd008', title: 'Samosa', category: 'Food', points: 1, hints: 'Triangular fried snack' },
  { id: 'fd009', title: 'Tandoori Chicken', category: 'Food', points: 2, hints: 'Clay oven red spiced' },
  { id: 'fd010', title: 'Palak Paneer', category: 'Food', points: 3, hints: 'Spinach cottage cheese curry' },
  { id: 'fd011', title: 'Gulab Jamun', category: 'Food', points: 2, hints: 'Sweet syrup soft balls' },
  { id: 'fd012', title: 'Jalebi', category: 'Food', points: 2, hints: 'Spiral orange sweet crispy' },
  { id: 'fd013', title: 'Lassi', category: 'Food', points: 2, hints: 'Yogurt drink sweet salty' },
  { id: 'fd014', title: 'Kheer', category: 'Food', points: 2, hints: 'Rice pudding milk sweet' },
  { id: 'fd015', title: 'Dhokla', category: 'Food', points: 3, hints: 'Gujarati steamed gram flour' },
  { id: 'fd016', title: 'Idli Sambhar', category: 'Food', points: 2, hints: 'South Indian rice cakes' },
  { id: 'fd017', title: 'Aloo Gobi', category: 'Food', points: 2, hints: 'Potato cauliflower dry curry' },
  { id: 'fd018', title: 'Kulfi', category: 'Food', points: 3, hints: 'Traditional ice cream stick' },
  { id: 'fd019', title: 'Paratha', category: 'Food', points: 2, hints: 'Layered flatbread stuffed' },
  { id: 'fd020', title: 'Dal Tadka', category: 'Food', points: 2, hints: 'Lentil curry tempering' },
  { id: 'fd021', title: 'Poha', category: 'Food', points: 2, hints: 'Flattened rice breakfast Maharashtra' },
  { id: 'fd022', title: 'Upma', category: 'Food', points: 2, hints: 'Semolina breakfast South Indian' },
  { id: 'fd023', title: 'Medu Vada', category: 'Food', points: 3, hints: 'Lentil donut South Indian' },
  { id: 'fd024', title: 'Rava Kesari', category: 'Food', points: 3, hints: 'Semolina sweet saffron' },
  { id: 'fd025', title: 'Pongal', category: 'Food', points: 3, hints: 'Rice lentil Tamil breakfast' },
  { id: 'fd026', title: 'Appam', category: 'Food', points: 3, hints: 'Fermented rice pancake Kerala' },
  { id: 'fd027', title: 'Puttu', category: 'Food', points: 3, hints: 'Steamed rice flour Kerala' },
  { id: 'fd028', title: 'Kozhukattai', category: 'Food', points: 4, hints: 'Rice flour dumplings Tamil' },
  { id: 'fd029', title: 'Mysore Pak', category: 'Food', points: 3, hints: 'Ghee sweet Karnataka' },
  { id: 'fd030', title: 'Rasgulla', category: 'Food', points: 2, hints: 'Spongy white sweet Bengali' },
  { id: 'fd031', title: '5 Star', category: 'Food', points: 3, hints: 'Chocolate bar Cadbury' },
  { id: 'fd032', title: 'Mattar Paneer', category: 'Food', points: 2, hints: 'Peas cottage cheese curry' },
  { id: 'fd033', title: 'Golgappe', category: 'Food', points: 3, hints: 'Street food crispy water' },
  { id: 'fd034', title: 'Bisi Belle Bhaat', category: 'Food', points: 4, hints: 'Karnataka rice lentil dish' },
  { id: 'fd035', title: 'Mango Bite', category: 'Food', points: 2, hints: 'Mango flavored candy' },
  { id: 'fd036', title: 'Paan ki Pichkaari', category: 'Food', points: 2, hints: 'Betel leaf water spray' },

  // TV Shows (30 cards)
  { id: 'tv001', title: 'Kyunki Saas Bhi Kabhi Bahu Thi', category: 'TV Shows', points: 2, hints: 'Ekta Kapoor family drama' },
  { id: 'tv002', title: 'Kaun Banega Crorepati', category: 'TV Shows', points: 1, hints: 'Amitabh quiz show' },
  { id: 'tv003', title: 'Taarak Mehta Ka Ooltah Chashmah', category: 'TV Shows', points: 2, hints: 'Gokuldham society comedy' },
  { id: 'tv004', title: 'CID', category: 'TV Shows', points: 2, hints: 'ACP Pradyuman crime investigation' },
  { id: 'tv005', title: 'The Kapil Sharma Show', category: 'TV Shows', points: 2, hints: 'Comedy talk show celebrities' },
  { id: 'tv006', title: 'Bigg Boss', category: 'TV Shows', points: 2, hints: 'Reality show house contestants' },
  { id: 'tv007', title: 'Indian Idol', category: 'TV Shows', points: 2, hints: 'Singing competition reality' },
  { id: 'tv008', title: 'Dance India Dance', category: 'TV Shows', points: 3, hints: 'Dancing competition reality' },
  { id: 'tv009', title: 'Roadies', category: 'TV Shows', points: 3, hints: 'Adventure reality youth show' },
  { id: 'tv010', title: 'Splitsvilla', category: 'TV Shows', points: 3, hints: 'Dating reality show villa' },
  { id: 'tv011', title: 'Sarabhai vs Sarabhai', category: 'TV Shows', points: 3, hints: 'Elite family comedy Monisha' },
  { id: 'tv012', title: 'Khichdi', category: 'TV Shows', points: 3, hints: 'Parekh family comedy simple' },
  { id: 'tv013', title: 'Office Office', category: 'TV Shows', points: 3, hints: 'Pankaj Kapoor bureaucracy satire' },
  { id: 'tv014', title: 'Yeh Rishta Kya Kehlata Hai', category: 'TV Shows', points: 4, hints: 'Longest running family drama' },
  { id: 'tv015', title: 'Balika Vadhu', category: 'TV Shows', points: 3, hints: 'Child marriage social issue' },
  { id: 'tv016', title: 'Anupamaa', category: 'TV Shows', points: 3, hints: 'Housewife self-discovery journey' },
  { id: 'tv017', title: 'Mirzapur', category: 'TV Shows', points: 3, hints: 'Crime web series Uttar Pradesh' },
  { id: 'tv018', title: 'Sacred Games', category: 'TV Shows', points: 3, hints: 'Netflix Mumbai police thriller' },
  { id: 'tv019', title: 'Scam 1992', category: 'TV Shows', points: 4, hints: 'Harshad Mehta stock market' },
  { id: 'tv020', title: 'The Family Man', category: 'TV Shows', points: 3, hints: 'Intelligence officer family balance' },
  { id: 'tv021', title: 'Arya', category: 'TV Shows', points: 3, hints: 'Hotstar crime thriller medical' },
  { id: 'tv022', title: 'Mumbai Diaries 26/11', category: 'TV Shows', points: 4, hints: 'Terror attack hospital drama' },
  { id: 'tv023', title: 'Rocket Boys', category: 'TV Shows', points: 4, hints: 'Scientists Homi Bhabha Vikram Sarabhai' },
  { id: 'tv024', title: 'Gullak', category: 'TV Shows', points: 3, hints: 'Middle class family humor' },
  { id: 'tv025', title: 'Panchayat', category: 'TV Shows', points: 3, hints: 'Village secretary comedy drama' },
  { id: 'tv026', title: 'Aspirants', category: 'TV Shows', points: 3, hints: 'UPSC preparation friendship' },
  { id: 'tv027', title: 'Kota Factory', category: 'TV Shows', points: 3, hints: 'Engineering coaching students' },
  { id: 'tv028', title: 'Permanent Roommates', category: 'TV Shows', points: 3, hints: 'Long distance relationship comedy' },
  { id: 'tv029', title: 'Pitchers', category: 'TV Shows', points: 3, hints: 'Startup friends entrepreneurship' },
  { id: 'tv030', title: 'Flames', category: 'TV Shows', points: 3, hints: 'School romance teenage love' },

  // Festivals (20 cards)
  { id: 'ft001', title: 'Diwali', category: 'Festivals', points: 1, hints: 'Lights crackers sweets Lakshmi' },
  { id: 'ft002', title: 'Holi', category: 'Festivals', points: 1, hints: 'Colors spring festival joy' },
  { id: 'ft003', title: 'Dussehra', category: 'Festivals', points: 2, hints: 'Ravana effigy good over evil' },
  { id: 'ft004', title: 'Eid ul-Fitr', category: 'Festivals', points: 2, hints: 'Ramadan end celebration feast' },
  { id: 'ft005', title: 'Christmas', category: 'Festivals', points: 1, hints: 'Jesus birth tree gifts' },
  { id: 'ft006', title: 'Ganesh Chaturthi', category: 'Festivals', points: 2, hints: 'Elephant god modak immersion' },
  { id: 'ft007', title: 'Navratri', category: 'Festivals', points: 2, hints: 'Nine nights Durga dance' },
  { id: 'ft008', title: 'Karva Chauth', category: 'Festivals', points: 3, hints: 'Wife husband fasting moon' },
  { id: 'ft009', title: 'Raksha Bandhan', category: 'Festivals', points: 2, hints: 'Brother sister thread protection' },
  { id: 'ft010', title: 'Janmashtami', category: 'Festivals', points: 3, hints: 'Krishna birth dahi handi' },
  { id: 'ft011', title: 'Onam', category: 'Festivals', points: 3, hints: 'Kerala harvest Mahabali flowers' },
  { id: 'ft012', title: 'Pongal', category: 'Festivals', points: 3, hints: 'Tamil harvest rice sugarcane' },
  { id: 'ft013', title: 'Baisakhi', category: 'Festivals', points: 3, hints: 'Punjabi harvest Sikh new year' },
  { id: 'ft014', title: 'Durga Puja', category: 'Festivals', points: 2, hints: 'Bengali goddess pandal immersion' },
  { id: 'ft015', title: 'Kumbh Mela', category: 'Festivals', points: 4, hints: 'Largest religious gathering rivers' },
  { id: 'ft016', title: 'Pushkar Fair', category: 'Festivals', points: 4, hints: 'Rajasthan camel fair sacred lake' },
  { id: 'ft017', title: 'Hornbill Festival', category: 'Festivals', points: 4, hints: 'Nagaland tribal culture December' },
  { id: 'ft018', title: 'Thrissur Pooram', category: 'Festivals', points: 4, hints: 'Kerala temple elephant procession' },
  { id: 'ft019', title: 'Kumbh Fair', category: 'Festivals', points: 3, hints: 'Rajasthan desert festival camel' },
  { id: 'ft020', title: 'Bihu', category: 'Festivals', points: 3, hints: 'Assamese new year spring harvest' },

  // Iconic Ads (20 cards)
  { id: 'ad001', title: 'Nirma', category: 'Iconic Ads', points: 2, hints: 'Washing powder detergent jingle' },
  { id: 'ad002', title: 'Ramesh Suresh', category: 'Iconic Ads', points: 4, hints: 'Fevicol adhesive brothers' },
  { id: 'ad003', title: 'Santoor', category: 'Iconic Ads', points: 4, hints: 'Soap brand mother daughter' },
  { id: 'ad004', title: 'Vicco Turmeric', category: 'Iconic Ads', points: 3, hints: 'Ayurvedic cream turmeric' },
  { id: 'ad005', title: 'Ambuja Cement', category: 'Iconic Ads', points: 3, hints: 'Cement brand construction' },
  { id: 'ad006', title: 'Vasmol', category: 'Iconic Ads', points: 2, hints: 'Hair oil brand grooming' },
  { id: 'ad007', title: 'Tide', category: 'Iconic Ads', points: 1, hints: 'Detergent brand washing' },
  { id: 'ad008', title: 'Feviquick', category: 'Iconic Ads', points: 2, hints: 'Adhesive glue instant' },
  { id: 'ad009', title: 'Daag Ache Hai', category: 'Iconic Ads', points: 2, hints: 'Ariel detergent stain removal' },
  { id: 'ad010', title: 'Dil Maange More', category: 'Iconic Ads', points: 3, hints: 'Pepsi cola brand slogan' },
  { id: 'ad011', title: 'Kaisi jeeb laplapaayi', category: 'Iconic Ads', points: 2, hints: 'Cadbury chocolate tongue' },
  { id: 'ad012', title: 'MRF ZLX', category: 'Iconic Ads', points: 2, hints: 'Tyre brand cricket sponsorship' },
  { id: 'ad013', title: 'Humara Bajaj', category: 'Iconic Ads', points: 4, hints: 'Bajaj scooter family transport' },

  // Misc (10 cards)
  { id: 'ms001', title: 'Danish Cookie Box', category: 'Misc', points: 3, hints: 'Tin box storage container' },
  { id: 'ms002', title: 'Aakashvaani', category: 'Misc', points: 2, hints: 'All India Radio broadcasting' },
  { id: 'ms003', title: 'Bhidu', category: 'Misc', points: 2, hints: 'Mumbai slang brother friend' },
  { id: 'ms004', title: 'Chomu', category: 'Misc', points: 3, hints: 'Slang term foolish person' },
  { id: 'ms005', title: 'Tube light', category: 'Misc', points: 2, hints: 'Fluorescent lighting bulb' },
  { id: 'ms006', title: 'Marine Drive', category: 'Misc', points: 3, hints: 'Mumbai coastline Queen Necklace' },

  // Additional Bollywood cards (need to be checked)
  { id: 'bw051', title: 'Chhota Pandit', category: 'Bollywood', points: 4, hints: 'Character comedy film' },
  { id: 'bw052', title: 'Uday Bhai', category: 'Bollywood', points: 2, hints: 'Character comedy film' },
  { id: 'bw053', title: 'Majnu Bhai', category: 'Bollywood', points: 2, hints: 'Character comedy film' },
  { id: 'bw054', title: 'Golmaal', category: 'Bollywood', points: 2, hints: 'Rohit Shetty comedy franchise' },
  { id: 'bw055', title: 'Tusshar Kapoor', category: 'Bollywood', points: 2, hints: 'Actor comedy roles' },
  { id: 'bw056', title: 'Hera Pheri', category: 'Bollywood', points: 1, hints: 'Comedy film Akshay Paresh' },
  { id: 'bw057', title: 'DK Malik', category: 'Bollywood', points: 4, hints: 'Character comedy film' },
  { id: 'bw058', title: 'Phir Hera Pheri', category: 'Bollywood', points: 1, hints: 'Comedy sequel Akshay Paresh' },
  { id: 'bw059', title: 'Rinkiya Ke Paapa', category: 'Bollywood', points: 4, hints: 'Character comedy film' },
  { id: 'bw060', title: 'PK', category: 'Bollywood', points: 1, hints: 'Aamir Khan alien comedy' },
  { id: 'bw061', title: 'Kahaani Ghar Ghar Ki', category: 'Bollywood', points: 2, hints: 'TV serial family drama' },
  { id: 'bw062', title: 'Kasauti Zindagi Ki', category: 'Bollywood', points: 2, hints: 'TV serial family drama' },
  { id: 'bw063', title: 'Salman Bhai', category: 'Bollywood', points: 2, hints: 'Actor nickname Bollywood' },
  { id: 'bw064', title: 'Himesh Reshamiaya', category: 'Bollywood', points: 1, hints: 'Singer actor music director' },
  { id: 'bw065', title: 'Chamach Ek Cheeni Do Baar', category: 'Bollywood', points: 3, hints: 'Character comedy film' },
  { id: 'bw066', title: 'Coolie No. 1', category: 'Bollywood', points: 2, hints: 'Govinda comedy film' },
  { id: 'bw067', title: 'Geet', category: 'Bollywood', points: 3, hints: 'Character comedy film' },
  { id: 'bw068', title: 'Bhool Bhulaiyya', category: 'Bollywood', points: 1, hints: 'Akshay Kumar horror comedy' },
  { id: 'bw069', title: 'Maaro Deekro', category: 'Bollywood', points: 4, hints: 'Character comedy film' },
  { id: 'bw070', title: 'Raghunandandas Govardhandas Vakavle', category: 'Bollywood', points: 3, hints: 'Character comedy film' },
  { id: 'bw071', title: 'Deja Chu', category: 'Bollywood', points: 4, hints: 'Character comedy film' },
  { id: 'bw072', title: 'Soni De Nakhre', category: 'Bollywood', points: 3, hints: 'Character comedy film' },
  { id: 'bw073', title: 'Ganpat', category: 'Bollywood', points: 2, hints: 'Character comedy film' },
  { id: 'bw074', title: 'Majnu Bhai Ki Painting', category: 'Bollywood', points: 2, hints: 'Character comedy film' },
  { id: 'bw075', title: 'Kuch Toh Gadbad Hai', category: 'Bollywood', points: 2, hints: 'Character comedy film' },
  { id: 'bw076', title: 'Daya Darwaaza Tod Do', category: 'Bollywood', points: 2, hints: 'Character comedy film' },
  { id: 'bw077', title: 'Jethalal Champaklal Gada', category: 'Bollywood', points: 1, hints: 'Taarak Mehta character' },
  { id: 'bw078', title: 'Kyun Thak Rahe Ho', category: 'Bollywood', points: 2, hints: 'Character comedy film' }
];

/**
 * Get all unique categories from the card database
 * @returns {string[]} Array of category names
 */
export function getCategories() {
  const categories = new Set(CARDS.map(card => card.category));
  return Array.from(categories).sort();
}

/**
 * Get cards filtered by categories
 * @param {string[]} categories - Categories to include
 * @returns {Card[]} Filtered cards
 */
export function getCardsByCategories(categories) {
  return CARDS.filter(card => categories.includes(card.category));
}

/**
 * Get cards by specific category
 * @param {string} category - Category name
 * @returns {Card[]} Cards in that category
 */
export function getCardsByCategory(category) {
  return CARDS.filter(card => card.category === category);
}

/**
 * Validate if deck constraints can be satisfied
 * @param {string[]} selectedCategories - Categories selected
 * @param {number} requiredDeckSize - Required deck size
 * @returns {{isValid: boolean, message?: string, availableCards?: number}}
 */
export function validateDeckConstraints(selectedCategories, requiredDeckSize) {
  if (selectedCategories.length === 0) {
    return { isValid: false, message: 'At least one category must be selected.' };
  }

  const availableCards = getCardsByCategories(selectedCategories);

  // Check if we have enough cards total
  if (availableCards.length < requiredDeckSize) {
    return {
      isValid: false,
      message: `Not enough cards available. Selected categories have ${availableCards.length} cards, but ${requiredDeckSize} are needed.`,
      availableCards: availableCards.length
    };
  }

  // Check if we can satisfy "at least 1 per category" constraint
  const minCardsNeeded = selectedCategories.length;
  if (requiredDeckSize < minCardsNeeded) {
    return {
      isValid: false,
      message: `Deck size must be at least ${minCardsNeeded} to include 1 card from each selected category.`
    };
  }

  // For deck building, we just need enough total cards and at least 1 per category
  // The 6-cards-per-category limit only applies during individual player turns
  return { isValid: true, availableCards: availableCards.length };
}
