const session = await mongoose.startSession();
session.startTransaction();

try {
    await User.create([{ email: 'user1@test.com' }], { session });
    await Order.create([{ userId: '...', amount: 100 }], { session });
    
    await session.commitTransaction();
} catch (error) {
    await session.abortTransaction();
    throw error;
} finally {
    session.endSession();
}