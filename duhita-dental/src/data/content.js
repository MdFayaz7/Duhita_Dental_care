export const site = {
  name: 'Duhita Dental',
  fullName: 'Duhita Multispeciality Dental Centre',
  tagline: 'Best Dentistry Services You Can Trust.',
  description:
    'Duhita Multispeciality Dental Centre in Benz Circle, Vijayawada is a top player in the category Dental Hospitals in the Vijayawada. This well-known establishment acts as a one-stop destination servicing customers both local and from other parts of Vijayawada.',
  established: 1997,
  phone: '9440313066',
  phoneDisplay: '944 031 3066',
  email: 'duhitadent@gmail.com',
  address:
    '1ST FLOOR, D.NO: 59, Shanthi Plaza, 14-2/1, above SBI NRI branch, Gayatri Nagar, Krishna Nagar, Vijayawada, Andhra Pradesh',
  hours: {
    morning: '09:00 AM – 01:00 PM',
    evening: '03:00 PM – 09:00 PM',
  },
  social: {
    facebook:
      'https://www.facebook.com/Duhitamultispecialitydentalcenter?mibextid=ZbWKwL',
    instagram: 'https://instagram.com/duhita.dent_1?igshid=ZGUzMzM3NWJiOQ==',
    google:
      'https://www.google.com/search?q=duhita+multispeciality+dental+centre#lrd=0x3a35fac77c6e3beb:0xd0670f3eed7f1f08,3,,,,',
    whatsapp: 'https://wa.me/9440313066',
  },
  mapEmbed:
    'https://maps.google.com/maps?q=Duhita+Multispeciality+Dental+Centre+Benz+Circle+Vijayawada&hl=en&z=15&output=embed',
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export const stats = [
  { value: 25, suffix: '+', label: 'Years of Experience' },
  { value: 10000, suffix: '+', label: 'Happy Patients' },
  { value: 100, suffix: '+', label: 'Dental Implants' },
];

export const services = [
  {
    title: 'Cosmetic Dentistry',
    description:
      'Need help with teeth bleaching, enamel bonding and more? You can count on us for the best cosmetic services.',
    image: 'https://www.duhitadental.in/wp-content/uploads/2021/05/service-1-1.jpg',
  },
  {
    title: 'Tooth Reshaping',
    description:
      'X-rays help us reach the root cause of trouble and that’s where we like to dig in and help you with the right treatment.',
    image: 'https://www.duhitadental.in/wp-content/uploads/2023/05/images.jpg',
  },
  {
    title: 'Root Canals',
    description:
      'Root canals can be painful. But, we assure the most painless and tension-free root canal treatments in town.',
    image: 'https://www.duhitadental.in/wp-content/uploads/2021/05/service-3.jpg',
  },
];

export const allServices = [
  'Endodontics',
  'Orthodontics',
  'Pedodontics',
  'Prosthodontics',
  'Periodontics',
  'Oral-Maxillo Facial Surgery',
  'Oral-Medicine',
  'Radio Diagnosis',
];

export const doctor = {
  name: 'Dr. Nalluru Sasidhar',
  qualification: 'M.D.S (OSM)',
  highlights: [
    '25+ Years of experience',
    'Highly Equipped Clinic',
    'Good quality care & service',
  ],
  image: '/assets/dr.jpeg',
  specialization: 'Oral & Maxillofacial Surgery',
  experienceYears: 28,
};

export const about = {
  eyebrow: 'About Us',
  title: 'Certified Dentists Committed to Excellence',
  body: 'Established in the year 1997, Duhita Multispeciality Dental Centre in Benz Circle, Vijayawada is a top player in the category Dental Hospitals in the Vijayawada. This well-known establishment acts as a one-stop destination servicing customers both local and from other parts of Vijayawada. Over the course of its journey, this business has established a firm foothold in its industry.',
};

export const whyChooseUs = {
  eyebrow: 'Why Choose Us',
  title: 'We Make Dental Treatments Fun!',
};

export const appointmentCta = {
  title: "Book an Appointment & You're Done!",
  description:
    'Looking for the best & quick dental treatments without a long waiting time? Simply reserve a time slot, walk in at the appointed time and get prioritized treatments at no extra cost.',
};

export const testimonials = [
  {
    name: 'CHAITHANYA',
    text: 'I highly recommend Dr. Sasidhar. I had sensitive teeth. I used to feel teeth pain whenever I had some sweets or cold drinks. I had gone to Apollo Dental in Bangalore and they had done three fillings to my teeth and they said it would fix my problem. But even after 9 months, my teeth remained sensitive like this.',
  },
  {
    name: 'SRINIVASA RAO ALAPATI',
    text: 'I am a regular patient of Dr.N.Sasidhar. Every visit to the hospital is really a great experience. I see a lot of discipline in every individual. I feel it is only due to Dr.Sasidhar. One more thing I have seen is the commitment and punctuality in the staff as well as Dr. Sasidhar.',
  },
  {
    name: 'JASMITH',
    text: 'Taking an appointment helped & I did not have to wait. Dr.Sasidhar explained the problem very clearly & the treatment was taken care of right away. The team of doctors are very good. I am very happy with the treatment & recommend Duhita Dental clinic.',
  },
];

/** Ready for Google Business Profile API / widget integration */
export const googleReviews = {
  placeName: 'Duhita Multispeciality Dental Centre',
  rating: 4.0,
  totalReviews: 4,
  profileUrl: site.social.google,
  reviews: [
    {
      id: 'review-1',
      authorName: 'CHAITHANYA',
      authorPhoto: null,
      rating: 5,
      relativeTime: '3 months ago',
      text: 'I highly recommend Dr. Sasidhar. Professional care, clear explanations, and excellent treatment for sensitive teeth.',
    },
    {
      id: 'review-2',
      authorName: 'SRINIVASA RAO ALAPATI',
      authorPhoto: null,
      rating: 5,
      relativeTime: '5 months ago',
      text: 'Every visit is a great experience. Discipline, punctuality, and commitment from Dr. Sasidhar and the entire staff.',
    },
    {
      id: 'review-3',
      authorName: 'JASMITH',
      authorPhoto: null,
      rating: 5,
      relativeTime: '2 months ago',
      text: 'Appointment booking was seamless. Dr. Sasidhar explained everything clearly and treatment was handled right away.',
    },
    {
      id: 'review-4',
      authorName: 'Google User',
      authorPhoto: null,
      rating: 4,
      relativeTime: '6 months ago',
      text: 'Quality dental care in Benz Circle. Modern clinic with experienced doctors and friendly staff.',
    },
  ],
};

export const faqs = [
  {
    question: 'Does Duhita Multispeciality Dental Centre provide 24x7 emergency services?',
    answer:
      'Duhita Multispeciality Dental Centre is known for providing timely intensive care to patients and you can get in touch with them to check what are the various emergency services offered by the hospital.',
  },
  {
    question: 'How can I book an appointment at Duhita Multispeciality Dental Centre?',
    answer:
      'You may be able to book an appointment online or via call. However, you can connect with the hospital helpline to fetch further details regarding their booking policy.',
  },
  {
    question: 'Is Duhita Multispeciality Dental Centre a speciality hospital?',
    answer:
      'Duhita Multispeciality Dental Centre is accredited for providing specialty treatments in Endosurgery, Dental Sealant, Laser Dentistry, Teeth Reshaping, Tooth Reshaping, etc.',
  },
  {
    question: 'How is Duhita Dental hospital rated?',
    answer: 'Duhita Dental hospital has 4 stars from 4 reviews.',
  },
  {
    question: 'What is the address of Duhita Dental Hospital?',
    answer:
      'The address of Duhita Multispeciality Dental Centre is 1ST FLOOR, D.NO: 59, Shanthi Plaza, 14-2/1, above SBI NRI branch, Gayatri Nagar, Krishna Nagar, Vijayawada, Andhra Pradesh.',
  },
];

export const galleryImages = [
  'https://www.duhitadental.in/wp-content/uploads/2024/08/1.jpg',
  'https://www.duhitadental.in/wp-content/uploads/2024/08/2.jpg',
  'https://www.duhitadental.in/wp-content/uploads/2024/08/3.jpg',
  'https://www.duhitadental.in/wp-content/uploads/2024/08/4.jpg',
  'https://www.duhitadental.in/wp-content/uploads/2024/08/5.jpg',
  'https://www.duhitadental.in/wp-content/uploads/2024/08/6.jpg',
  'https://www.duhitadental.in/wp-content/uploads/2024/08/7.jpg',
  'https://www.duhitadental.in/wp-content/uploads/2024/08/8.jpg',
  'https://www.duhitadental.in/wp-content/uploads/2024/08/9.jpg',
  'https://www.duhitadental.in/wp-content/uploads/2024/08/10.jpg',
];

export const beforeAfter = [
  {
    before: 'https://www.duhitadental.in/wp-content/uploads/2024/08/1-2.png',
    after: 'https://www.duhitadental.in/wp-content/uploads/2024/08/1-1.png',
  },
];

export const heroCopy = {
  eyebrow: 'Duhita Multispeciality Dental Centre',
  titleTop: 'Best Dentistry Services',
  titleBottom: 'You Can Trust.',
};

export const marquee = [
  'Digital Smile Design',
  'Guided Implantology',
  'Single-Sitting RCT',
  'Zirconia Crowns',
  'Self-Ligating Braces',
  'CBCT Planning',
  'Painless Extractions',
  'Paediatric Care',
];

export const pillars = [
  {
    title: 'Diagnose',
    body: 'Digital RVG, OPG and CBCT imaging map the problem before a plan is written.',
  },
  {
    title: 'Plan',
    body: 'Every case is simulated — proportions, occlusion and shade agreed with you first.',
  },
  {
    title: 'Treat',
    body: 'Rotary endodontics, guided implant surgery and sterile single-use protocols.',
  },
  {
    title: 'Maintain',
    body: 'Structured recalls, hygiene coaching and long-term monitoring of every restoration.',
  },
];

export const timeline = [
  { year: '1997', title: 'Founded', body: 'Duhita opens in Vijayawada as a single-chair practice.' },
  { year: '2008', title: 'Multispeciality', body: 'Endodontics, orthodontics and prosthodontics brought under one roof.' },
  { year: '2016', title: 'Digital shift', body: 'Digital radiography and rotary endodontics adopted across the clinic.' },
  { year: '2024', title: '10,000+ patients', body: 'Over 100 implants placed and thousands of smiles restored.' },
];

export const contactCards = [
  { label: 'Call the clinic', value: '944 031 3066', href: 'tel:9440313066' },
  { label: 'Email us', value: 'duhitadent@gmail.com', href: 'mailto:duhitadent@gmail.com' },
  { label: 'Morning hours', value: '09:00 AM – 01:00 PM' },
  { label: 'Evening hours', value: '03:00 PM – 09:00 PM' },
];
