import { connectMongo } from '../server/mongo.js';
import { EnquiryModel, AnalyticsModel } from '../server/models/index.js';

async function cleanDummy() {
  await connectMongo();
  console.log('✓ Connected to MongoDB Atlas');

  // 1. Delete dummy enquiries
  const deleteResult = await EnquiryModel.deleteMany({
    id: { $in: ['enq-101', 'enq-102', 'enq-103'] },
  });
  console.log(`✓ Removed ${deleteResult.deletedCount} dummy enquiries from MongoDB Atlas`);

  // Ensure Shivam's test enquiry is stored
  const existingShivam = await EnquiryModel.findOne({ email: 'shivamchy076@gmail.com' });
  if (!existingShivam) {
    await EnquiryModel.create({
      id: 'enq-1793900199419',
      name: 'Shivam Chaudhary',
      phone: '7667736039',
      email: 'shivamchy076@gmail.com',
      type: 'Silver Items',
      message: 'Hii',
      status: 'New',
      createdAt: new Date(),
    });
    console.log('✓ Kept real test enquiry for Shivam Chaudhary');
  }

  const remainingEnquiries = await EnquiryModel.find().lean();
  console.log('Remaining Enquiries in Atlas:', remainingEnquiries.map(e => `${e.name} (${e.phone})`));

  // 2. Reset Analytics to clean live zero
  await AnalyticsModel.deleteMany({});
  await AnalyticsModel.create({
    totalVisits: 0,
    uniqueVisitors: 0,
    cityBreakdown: [],
    deviceBreakdown: { mobile: 0, desktop: 0, tablet: 0 },
    dailyTrends: [],
    recentVisits: [],
    updatedAt: new Date(),
  });
  console.log('✓ Reset Visitor Analytics in MongoDB Atlas to clean real-time 0 visits');

  process.exit(0);
}

cleanDummy().catch(err => {
  console.error('Error cleaning dummy data:', err);
  process.exit(1);
});

