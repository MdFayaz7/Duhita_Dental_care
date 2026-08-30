export const serviceGroups = [
  { id: 'endodontics', name: 'Endodontics', label: 'Saving the natural tooth', accent: '#64d2ff' },
  { id: 'prosthodontics', name: 'Prosthodontics', label: 'Rebuilding what is missing', accent: '#0a84ff' },
  { id: 'orthodontics', name: 'Orthodontics', label: 'Moving teeth into place', accent: '#a7e9ff' },
  { id: 'pedodontics', name: 'Pedodontics', label: 'Dentistry for children', accent: '#5ac8fa' },
  { id: 'periodontics', name: 'Periodontics', label: 'Gum and bone health', accent: '#64d2ff' },
  { id: 'surgery', name: 'Oral & Maxillofacial Surgery', label: 'Advanced surgical care', accent: '#3b9bff' },
  { id: 'medicine', name: 'Oral Medicine', label: 'Diagnosis and management', accent: '#5ac8fa' },
  { id: 'radiology', name: 'Radio Diagnosis', label: 'Seeing beneath the surface', accent: '#64d2ff' },
];

export const services = [
  {
    id: 'cosmetic-dentistry',
    group: 'endodontics',
    title: 'Cosmetic Dentistry',
    tagline: 'Detail you can see.',
    summary:
      'Bleaching, enamel bonding and reshaping that respects the natural anatomy of every tooth.',
    points: ['Professional whitening', 'Composite bonding', 'Tooth reshaping'],
    image: '/assets/services/cosmetic-dentistry.jpg',
    fit: 'contain',
  },
  {
    id: 'root-canals',
    group: 'endodontics',
    title: 'Root Canals',
    tagline: 'Painless, precise, predictable.',
    summary:
      'Rotary endodontics with apex location — infection removed, the natural tooth kept in place.',
    points: ['Single sitting RCT', 'Rotary instrumentation', 'Post-treatment crown planning'],
    image: '/assets/services/root-canals.jpg',
    fit: 'cover',
  },
  {
    id: 'crowns',
    group: 'endodontics',
    title: 'Crowns',
    tagline: 'Strength, restored.',
    summary:
      'Zirconia and metal-free caps milled to fit — protecting a weakened tooth for years of function.',
    points: ['Zirconia & E-max options', 'Precision shade matching', 'Minimal tooth preparation'],
    image: '/assets/services/crowns.png',
    fit: 'cover',
  },
  {
    id: 'fillings',
    group: 'endodontics',
    title: 'Fillings',
    tagline: 'Decay out. Structure in.',
    summary:
      'Tooth-coloured composite restorations that seal the cavity and disappear into the enamel.',
    points: ['Tooth-coloured composite', 'Caries excavation', 'Same-day appointment'],
    image: '/assets/services/fillings.png',
    fit: 'contain',
  },
  {
    id: 'laminates',
    group: 'endodontics',
    title: 'Laminates',
    tagline: 'Half a millimetre of perfect.',
    summary:
      'Ultra-thin ceramic veneers bonded to the front surface — correcting shape, gaps and colour at once.',
    points: ['0.3–0.5 mm ceramic shells', 'Gap and stain correction', 'Enamel-preserving prep'],
    image: '/assets/services/laminates.jpg',
    fit: 'cover',
  },
  {
    id: 'implants',
    group: 'prosthodontics',
    title: 'Implants',
    tagline: 'A new root. A real tooth.',
    summary:
      'Titanium fixtures placed into bone and restored with a crown that behaves like the original.',
    points: ['Guided implant placement', 'Titanium grade fixtures', '100+ implants placed'],
    image: '/assets/services/implants.jpg',
    fit: 'cover',
  },
  {
    id: 'dentures',
    group: 'prosthodontics',
    title: 'Dentures',
    tagline: 'Complete comfort.',
    summary:
      'Complete and partial dentures built on accurate impressions for stable bite and clear speech.',
    points: ['Complete & partial sets', 'Flexible and cast options', 'Implant-supported overdentures'],
    image: '/assets/services/dentures.png',
    fit: 'cover',
  },
  {
    id: 'bridges',
    group: 'prosthodontics',
    title: 'Bridges',
    tagline: 'Span the gap.',
    summary:
      'Fixed multi-unit restorations anchored on healthy neighbours or implants — no removal, ever.',
    points: ['Fixed multi-unit spans', 'Implant-supported bridges', 'Natural emergence profile'],
    image: '/assets/services/bridges.jpg',
    fit: 'cover',
  },
  {
    id: 'braces',
    group: 'orthodontics',
    title: 'Braces',
    tagline: 'Alignment, on schedule.',
    summary:
      'Metal, ceramic and self-ligating systems planned around your facial profile and growth pattern.',
    points: ['Metal & ceramic brackets', 'Self-ligating systems', 'Aligner consultation'],
    image: '/assets/services/braces.png',
    fit: 'cover',
  },
  {
    id: 'pedodontics',
    group: 'pedodontics',
    title: 'Pedodontics',
    tagline: 'Dentistry they look forward to.',
    summary:
      'Child-friendly preventive and restorative care — sealants, fluoride and habit correction.',
    points: ['Pit & fissure sealants', 'Fluoride application', 'Habit breaking appliances'],
    image: '/assets/services/pedodontics.jpg',
    fit: 'cover',
  },
  {
    id: 'periodontics',
    group: 'periodontics',
    title: 'Periodontics',
    tagline: 'Healthy gums hold everything.',
    summary:
      'Scaling, root planing and flap surgery to stop bone loss and re-anchor the teeth you have.',
    points: ['Ultrasonic scaling', 'Root planing & curettage', 'Flap & graft surgery'],
    image: '/assets/services/periodontics.avif',
    fit: 'cover',
  },
  {
    id: 'oral-surgery',
    group: 'surgery',
    title: 'Oral & Maxillofacial Surgery',
    tagline: 'Surgical precision.',
    summary:
      'Impacted third molars, cysts, jaw trauma and pre-prosthetic surgery, led by an M.D.S surgeon.',
    points: ['Impacted wisdom teeth', 'Cyst & tumour excision', 'Facial trauma management'],
    image: '/assets/services/oral-surgery.jpg',
    fit: 'cover',
  },
  {
    id: 'oral-medicine',
    group: 'medicine',
    title: 'Oral Medicine',
    tagline: 'Read the whole picture.',
    summary:
      'Diagnosis and management of ulcers, lesions, oral submucous fibrosis and orofacial pain.',
    points: ['Lesion screening', 'Orofacial pain management', 'Oral cancer screening'],
    image: '/assets/services/oral-medicine.jpg',
    fit: 'cover',
  },
  {
    id: 'radio-diagnosis',
    group: 'radiology',
    title: 'Radio Diagnosis',
    tagline: 'See beneath the surface.',
    summary:
      'Digital IOPA, OPG and CBCT interpretation for planning that leaves nothing to guesswork.',
    points: ['Digital IOPA & RVG', 'OPG panoramic imaging', 'CBCT-guided planning'],
    image: '/assets/services/radio-diagnosis.jpg',
    fit: 'cover',
  },
  {
    id: 'smile-designing',
    group: 'endodontics',
    title: 'Smile Designing',
    tagline: 'Your smile, engineered.',
    summary:
      'Digitally planned proportions, shade and midline — previewed before a single tooth is touched.',
    points: ['Digital smile preview', 'Shade and contour mapping', 'Trial mock-up before treatment'],
    image: '/assets/services/smile-designing.jpg',
    fit: 'cover',
  },
];

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));
