const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String
});

const User = mongoose.model('User', userSchema);

async function crudDemo() {
  await mongoose.connect('mongodb://localhost:27017/test');
  
  // Create
  const user = await User.create({ email: 'test@test.com' });
  console.log('Created:', user.email);
  
  // Read
  const found = await User.findOne({ email: 'test@test.com' });
  console.log('Found:', found.email);
  
  // Update
  await User.updateOne({ email: 'test@test.com' }, { verified: true });
  console.log('Updated');
  
  // Delete
  await User.deleteOne({ email: 'test@test.com' });
  console.log('Deleted');
  
  await mongoose.disconnect();
}

crudDemo().catch(console.error);