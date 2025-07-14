// import mongoose from 'mongoose';
// import connectDB from './config/db.js';
// import Project from './models/Project.js';

// const fixIndexes = async () => {
//     try {
//         await connectDB();
        
//         // Get the Project collection
//         const collection = Project.collection;
        
//         // List all indexes
//         console.log('Current indexes:');
//         const indexes = await collection.indexes();
//         indexes.forEach(index => {
//             console.log(index);
//         });
        
//         // Drop the problematic unique index on applicants if it exists
//         try {
//             await collection.dropIndex('applicants_1');
//             console.log('Successfully dropped applicants_1 index');
//         } catch (error) {
//             if (error.code === 26) {
//                 console.log('Index applicants_1 does not exist, skipping...');
//             } else {
//                 console.error('Error dropping index:', error);
//             }
//         }
        
//         // Create a new non-unique index on applicants if needed
//         await collection.createIndex({ applicants: 1 }, { unique: false });
//         console.log('Created new non-unique index on applicants field');
        
//         console.log('Index fix completed successfully!');
//         process.exit(0);
//     } catch (error) {
//         console.error('Error fixing indexes:', error);
//         process.exit(1);
//     }
// };

// fixIndexes(); 