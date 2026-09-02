import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import Doctor from './models/Doctor.js';
import Research from './models/Research.js';
import HospitalGallery from './models/HospitalGallery.js';
import CampGallery from './models/CampGallery.js';
import Settings from './models/Settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB Atlas for Seeding!');

    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('ℹ️ No admin account found. Create one with: npm run rotate-admin');
    } else {
      console.log('ℹ️ Admin account already exists — use npm run rotate-admin to change credentials');
    }

    // Seed Doctor
    const doctorCount = await Doctor.countDocuments();
    if (doctorCount === 0) {
      await Doctor.create([
        {
          name: 'Dr. Nalluru Sasidhar',
          qualification: 'M.D.S (OSM)',
          specialization: 'Oral & Maxillofacial Surgery / Endodontics',
          experienceYears: 25,
          highlights: [
            '25+ Years of Clinical Experience',
            'Highly Equipped Advanced Clinic',
            'State-of-the-Art Dental Implants & Laser Dentistry',
          ],
          image: 'https://www.duhitadental.in/wp-content/uploads/2023/05/Untitled-design-300x300.png',
          phone: '9440313066',
          email: 'duhitadent@gmail.com',
          isDefault: true,
          isActive: true,
        },
      ]);
      console.log('✅ Default Doctor seeded');
    }

    // Seed Settings
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({});
      console.log('✅ Default Settings seeded');
    }

    // Seed Research Papers
    const researchCount = await Research.countDocuments();
    if (researchCount === 0) {
      await Research.create([
        {
          title: 'Advances in Painless Root Canal Therapy & Endodontics',
          description:
            'A comprehensive study on modern rotary endodontics and laser disinfection techniques reducing patient discomfort by 90%.',
          pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          coverImageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
          authors: 'Dr. Nalluru Sasidhar, M.D.S',
          publishDate: '2025-06-15',
          category: 'Endodontics',
        },
        {
          title: 'Immediate Loading Dental Implants: Clinical Outcomes',
          description:
            'Evaluating success rates of same-day implant placement using 3D CBCT guided surgical templates over a 5-year study.',
          pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          coverImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
          authors: 'Dr. Nalluru Sasidhar & Implantology Department',
          publishDate: '2024-11-20',
          category: 'Implantology',
        },
      ]);
      console.log('✅ Default Research Papers seeded');
    }

    // Seed Hospital Gallery
    const hospitalCount = await HospitalGallery.countDocuments();
    if (hospitalCount === 0) {
      await HospitalGallery.create([
        {
          title: 'Advanced Surgical Suite',
          description: 'Fully sterilized modern dental operation theatre',
          imageUrl: 'https://www.duhitadental.in/wp-content/uploads/2024/08/1.jpg',
          category: 'Operation Theatre',
        },
        {
          title: 'Patient Waiting Lounge',
          description: 'Comfortable & hygienic waiting area',
          imageUrl: 'https://www.duhitadental.in/wp-content/uploads/2024/08/2.jpg',
          category: 'Lounge',
        },
        {
          title: '3D Radio Diagnosis Lab',
          description: 'Digital X-ray & CBCT imaging station',
          imageUrl: 'https://www.duhitadental.in/wp-content/uploads/2024/08/3.jpg',
          category: 'Diagnostics',
        },
      ]);
      console.log('✅ Hospital Gallery seeded');
    }

    // Seed Camp Gallery
    const campCount = await CampGallery.countDocuments();
    if (campCount === 0) {
      await CampGallery.create([
        {
          title: 'Free Dental Screening Camp',
          description: 'Community outreach screening camp at Benz Circle',
          imageUrl: 'https://www.duhitadental.in/wp-content/uploads/2024/08/4.jpg',
          location: 'Benz Circle, Vijayawada',
          date: '2025-02-10',
        },
        {
          title: 'School Dental Awareness Program',
          description: 'Educating children on oral hygiene & cavity prevention',
          imageUrl: 'https://www.duhitadental.in/wp-content/uploads/2024/08/5.jpg',
          location: 'Gurunanak Nagar',
          date: '2025-04-18',
        },
        {
          title: 'Free Oral Health Checkup',
          description: 'Distributing dental kits and providing diagnostic checkups',
          imageUrl: 'https://www.duhitadental.in/wp-content/uploads/2024/08/6.jpg',
          location: 'KP Nagar, Vijayawada',
          date: '2025-05-22',
        },
      ]);
      console.log('✅ Camp Gallery seeded');
    }

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message || error);
    process.exit(1);
  }
};

seedData();
