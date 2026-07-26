import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Duhita Dental' },
    fullName: { type: String, default: 'Duhita Multispeciality Dental Centre' },
    tagline: { type: String, default: 'Best Dentistry Services You Can Trust.' },
    description: {
      type: String,
      default:
        'Duhita Multispeciality Dental Centre in Benz Circle, Vijayawada is a top player in the category Dental Hospitals in Vijayawada.',
    },
    established: { type: Number, default: 1997 },
    phone: { type: String, default: '9440313066' },
    phoneDisplay: { type: String, default: '944 031 3066' },
    email: { type: String, default: 'duhitadent@gmail.com' },
    address: {
      type: String,
      default:
        '31c, NH 16 Service Rd, Gurunanak Nagar, K P Nagar, Benz Circle, Vijayawada, Andhra Pradesh, IN',
    },
    morningHours: { type: String, default: '09:00 AM – 02:00 PM' },
    eveningHours: { type: String, default: '05:00 PM – 09:00 PM' },
    googleMapsEmbedUrl: {
      type: String,
      default:
        'https://maps.google.com/maps?q=Duhita+Multispeciality+Dental+Centre+Benz+Circle+Vijayawada&hl=en&z=15&output=embed',
    },
    socialLinks: {
      facebook: {
        type: String,
        default: 'https://www.facebook.com/Duhitamultispecialitydentalcenter?mibextid=ZbWKwL',
      },
      instagram: {
        type: String,
        default: 'https://instagram.com/duhita.dent_1?igshid=ZGUzMzM3NWJiOQ==',
      },
      google: {
        type: String,
        default:
          'https://www.google.com/search?q=duhita+multispeciality+dental+centre#lrd=0x3a35fac77c6e3beb:0xd0670f3eed7f1f08,3,,,,',
      },
      whatsapp: { type: String, default: 'https://wa.me/9440313066' },
    },
    logoUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
